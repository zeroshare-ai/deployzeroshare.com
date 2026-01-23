# ZeroShare Gateway - Technical Architecture

## Overview

ZeroShare Gateway is designed as a high-performance, low-latency security proxy optimized for AI/LLM traffic. This document describes the system architecture, components, and deployment options.

---

## System Architecture

```
                                    ┌─────────────────────────────────────────┐
                                    │           ZeroShare Gateway             │
                                    │                                         │
┌──────────────┐                    │  ┌─────────────────────────────────┐   │
│   Cursor     │───────┐            │  │         Proxy Engine            │   │
└──────────────┘       │            │  │  ┌───────────┐  ┌───────────┐   │   │
                       │            │  │  │ Request   │  │ Response  │   │   │
┌──────────────┐       │    HTTPS   │  │  │ Scanner   │  │ Scanner   │   │   │
│ Claude Code  │───────┼───────────▶│  │  └───────────┘  └───────────┘   │   │
└──────────────┘       │   :8443    │  │         │              │        │   │
                       │            │  │  ┌──────▼──────────────▼─────┐  │   │
┌──────────────┐       │            │  │  │    Detection Engine       │  │   │
│   aider      │───────┤            │  │  │  ┌─────┐ ┌─────┐ ┌─────┐  │  │   │
└──────────────┘       │            │  │  │  │ PII │ │Secrt│ │Cust │  │  │   │
                       │            │  │  │  └─────┘ └─────┘ └─────┘  │  │   │
┌──────────────┐       │            │  │  └───────────────────────────┘  │   │
│ Chat Portal  │───────┘            │  └─────────────────────────────────┘   │
│   Users      │                    │                                         │
└──────────────┘                    │  ┌─────────────────────────────────┐   │
        │                           │  │         Chat Portal             │   │
        │    :3000                  │  │    (Built-in AI Interface)      │   │
        └──────────────────────────▶│  └─────────────────────────────────┘   │
                                    │                                         │
                                    │  ┌─────────────────────────────────┐   │
                                    │  │          Admin API              │   │
                :9090               │  │   (Config, Logs, Metrics)       │   │
        ┌──────────────────────────▶│  └─────────────────────────────────┘   │
        │                           │                                         │
┌───────┴──────┐                    └──────────────┬──────────────────────────┘
│    Admin     │                                   │
│   Console    │                                   │ Outbound
└──────────────┘                                   │
                                                   ▼
                            ┌──────────────────────────────────────────────┐
                            │              External AI APIs                 │
                            │                                              │
                            │  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
                            │  │ OpenAI  │  │Anthropic│  │ Google  │     │
                            │  │   API   │  │   API   │  │   API   │     │
                            │  └─────────┘  └─────────┘  └─────────┘     │
                            │                                              │
                            └──────────────────────────────────────────────┘
```

---

## Core Components

### 1. Proxy Engine

The proxy engine is the heart of ZeroShare Gateway, responsible for intercepting, inspecting, and routing all AI traffic.

#### Key Features
- **Protocol Support**: HTTP/1.1, HTTP/2, WebSocket
- **TLS Termination**: Supports TLS 1.2/1.3 with configurable cipher suites
- **Connection Pooling**: Maintains persistent connections to upstream services
- **Load Balancing**: Round-robin, least-connections, or weighted routing

#### Request Flow
```
1. Client connects to proxy (TLS handshake)
2. Request received and parsed
3. Request body streamed through Detection Engine
4. If PASS: Forward to upstream AI service
   If BLOCK: Return error response
   If REDACT: Modify request, forward modified version
5. Response received from upstream
6. Response streamed back to client
7. Audit log entry created
```

### 2. Detection Engine

The detection engine performs real-time scanning of request and response content.

#### Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Detection Engine                          │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │ PII Detector  │  │Secret Detector│  │Custom Rules   │   │
│  │               │  │               │  │               │   │
│  │ • Regex       │  │ • Regex       │  │ • CEL/Rego    │   │
│  │ • Checksum    │  │ • Entropy     │  │ • Lua Scripts │   │
│  │ • ML Model    │  │ • Context     │  │ • Webhooks    │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│           │                │                  │             │
│           └────────────────┼──────────────────┘             │
│                            ▼                                │
│                   ┌───────────────┐                         │
│                   │ Action Router │                         │
│                   │               │                         │
│                   │ BLOCK │ REDACT │ WARN │ ALLOW           │
│                   └───────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

#### Detection Methods

| Method | Use Case | Performance |
|--------|----------|-------------|
| Regex Patterns | Known formats (SSN, CC) | < 0.1ms |
| Checksum Validation | Credit cards, IBANs | < 0.1ms |
| Entropy Analysis | Random secrets, API keys | < 0.5ms |
| Context Analysis | Ambiguous patterns | < 1ms |
| ML Classification | Complex PII, code | < 5ms |

### 3. Chat Portal

The built-in chat portal provides a secure, branded interface for end users.

#### Features
- **Multi-Provider**: OpenAI, Anthropic, Google, and custom models
- **Conversation Management**: History, search, export
- **Team Collaboration**: Shared workspaces, templates
- **Admin Controls**: Usage limits, model restrictions

#### Technology Stack
- Frontend: React with TypeScript
- State: Redux with persistence
- Real-time: WebSocket for streaming responses
- Auth: OAuth 2.0 / SAML SSO

### 4. Admin API

RESTful API for configuration and management.

#### Endpoints
```
GET    /api/v1/config              # Get current configuration
PUT    /api/v1/config              # Update configuration
GET    /api/v1/rules               # List detection rules
POST   /api/v1/rules               # Create custom rule
GET    /api/v1/audit-logs          # Query audit logs
GET    /api/v1/metrics             # Prometheus metrics
GET    /api/v1/health              # Health check
```

---

## Performance Optimization

### Latency Budget

| Component | Target | Measured p99 |
|-----------|--------|--------------|
| TLS Handshake | < 10ms | 8ms |
| Request Parsing | < 1ms | 0.5ms |
| Detection Scan | < 5ms | 3ms |
| Upstream Connection | < 5ms | 4ms |
| Response Streaming | 0ms | 0ms (passthrough) |
| **Total Overhead** | **< 20ms** | **15ms** |

### Scaling Guidelines

| Concurrent Users | Gateway Instances | PostgreSQL | Redis |
|------------------|-------------------|------------|-------|
| < 100 | 1 | db.t3.small | cache.t3.micro |
| 100 - 1,000 | 2-3 | db.t3.medium | cache.t3.small |
| 1,000 - 10,000 | 5-10 | db.r5.large | cache.r5.large |
| > 10,000 | 10+ (autoscale) | db.r5.xlarge (Multi-AZ) | cache.r5.xlarge (cluster) |

---

## Security Considerations

### Network Security
- All traffic encrypted with TLS 1.3
- mTLS support for client authentication
- Network policies for pod-to-pod isolation
- Private subnets for database/cache

### Data Security
- No persistent storage of request/response bodies by default
- Encryption at rest for audit logs
- Key rotation support
- Secrets management integration (Vault, AWS Secrets Manager)

### Access Control
- API key authentication
- OAuth 2.0 / OIDC support
- SAML SSO for enterprise
- Role-based access control (RBAC)

---

## Monitoring & Observability

### Metrics (Prometheus)
```
# Request metrics
zeroshare_requests_total{status, upstream}
zeroshare_request_duration_seconds{quantile}
zeroshare_tokens_processed_total{direction}

# Detection metrics
zeroshare_detections_total{type, action}
zeroshare_false_positives_total{type}

# System metrics
zeroshare_connections_active
zeroshare_memory_bytes
zeroshare_goroutines
```

### Logging (Structured JSON)
```json
{
  "timestamp": "2026-01-22T18:30:00Z",
  "level": "info",
  "request_id": "abc123",
  "event": "request_processed",
  "user_id": "user@company.com",
  "upstream": "openai",
  "model": "gpt-4",
  "tokens_in": 1500,
  "tokens_out": 500,
  "latency_ms": 1234,
  "detections": [
    {"type": "email", "action": "redact", "count": 2}
  ]
}
```

### Tracing (OpenTelemetry)
- Distributed tracing across proxy hops
- Integration with Jaeger, Zipkin, Datadog
- Automatic span creation for key operations
