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

## Data Flow

### Token Transaction Processing

ZeroShare Gateway is optimized for large token windows (up to 10 million tokens):

```
┌─────────────────────────────────────────────────────────────┐
│                    Token Processing Pipeline                 │
│                                                             │
│   Input Stream        Chunked Processing      Output Stream │
│   ───────────▶       ─────────────────▶      ──────────────▶│
│                                                             │
│   ┌─────────┐        ┌─────────────────┐    ┌─────────┐    │
│   │ Request │───────▶│  64KB Chunks    │───▶│ Forward │    │
│   │  Body   │        │  Parallel Scan  │    │   to    │    │
│   │ (Stream)│        │  (4 workers)    │    │ Upstream│    │
│   └─────────┘        └─────────────────┘    └─────────┘    │
│                              │                              │
│                              ▼                              │
│                      ┌───────────────┐                      │
│                      │ Findings      │                      │
│                      │ Aggregator    │                      │
│                      └───────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

#### Memory Management
- Streaming processing (no full body buffering)
- Chunk-based scanning with overlap for boundary detection
- Memory-mapped files for large payloads
- Garbage collection tuning for low-latency

---

## Persistence Layer

### PostgreSQL Schema

```sql
-- Core tables
CREATE TABLE rules (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'pii', 'secret', 'custom'
    pattern TEXT,
    action VARCHAR(20) NOT NULL, -- 'block', 'redact', 'warn', 'allow'
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    request_id UUID NOT NULL,
    user_id VARCHAR(255),
    client_ip INET,
    upstream_service VARCHAR(100),
    model VARCHAR(100),
    action_taken VARCHAR(20),
    findings JSONB,
    tokens_in INTEGER,
    tokens_out INTEGER,
    latency_ms INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    api_key_hash VARCHAR(255),
    settings JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action_taken);
```

### Redis Data Structures

```
# Rate limiting
RATE:{user_id}:{window} = counter (TTL: window duration)

# Session management  
SESSION:{session_id} = JSON (TTL: session timeout)

# Token counting cache
TOKENS:{request_hash} = {in: N, out: M} (TTL: 1 hour)

# Request deduplication
DEDUP:{request_hash} = 1 (TTL: 5 seconds)

# Configuration cache
CONFIG:rules = JSON (TTL: 60 seconds)
```

---

## Deployment Options

### Option 1: Docker Compose (Development/Small Teams)

```yaml
version: '3.8'
services:
  gateway:
    image: zeroshare/gateway:latest
    ports:
      - "8080:8080"
      - "8443:8443"
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://zeroshare:password@postgres/zeroshare
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=zeroshare
      - POSTGRES_USER=zeroshare
      - POSTGRES_PASSWORD=password
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```

### Option 2: Kubernetes (Enterprise)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zeroshare-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zeroshare-gateway
  template:
    metadata:
      labels:
        app: zeroshare-gateway
    spec:
      containers:
      - name: gateway
        image: zeroshare/gateway:latest
        ports:
        - containerPort: 8443
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: zeroshare-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: zeroshare-secrets
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 9090
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 9090
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: zeroshare-gateway
spec:
  type: LoadBalancer
  ports:
  - name: proxy
    port: 443
    targetPort: 8443
  - name: portal
    port: 3000
    targetPort: 3000
  selector:
    app: zeroshare-gateway
```

### Option 3: AWS (Production)

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Architecture                         │
│                                                                 │
│  ┌───────────┐     ┌─────────────┐     ┌───────────────────┐  │
│  │    ALB    │────▶│   ECS/EKS   │────▶│     RDS           │  │
│  │(TLS Term) │     │  Fargate    │     │  (PostgreSQL)     │  │
│  └───────────┘     │             │     └───────────────────┘  │
│                    │  ZeroShare  │                             │
│                    │   Gateway   │────▶┌───────────────────┐  │
│                    │             │     │   ElastiCache     │  │
│                    └─────────────┘     │   (Redis)         │  │
│                          │             └───────────────────┘  │
│                          │                                     │
│                          ▼                                     │
│                    ┌─────────────┐                             │
│                    │ CloudWatch  │                             │
│                    │   Logs      │                             │
│                    └─────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
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

---

## Disaster Recovery

### Backup Strategy
- **PostgreSQL**: Daily automated backups, 30-day retention
- **Configuration**: GitOps with version control
- **Audit Logs**: Export to S3/GCS for long-term retention

### High Availability
- Multi-AZ deployment for all components
- Automatic failover for database
- Health check-based traffic routing
- Zero-downtime deployments

### Recovery Objectives
- **RPO** (Recovery Point Objective): 1 hour
- **RTO** (Recovery Time Objective): 15 minutes
