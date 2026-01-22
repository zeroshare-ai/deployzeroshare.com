# ZeroShare Gateway - Product Requirements Document

## Document Information
- **Version:** 1.0
- **Last Updated:** January 2026
- **Status:** Living Document

---

## Executive Summary

ZeroShare Gateway is an enterprise-grade AI security proxy that protects organizations from accidental data leaks when employees use AI tools like ChatGPT, Claude, GitHub Copilot, Cursor, and other generative AI services.

### Core Value Proposition
> "Enable your team to use AI safely. Block PII and secrets before they leave your network."

---

## Problem Statement

### The Risk
Organizations face significant security and compliance risks when employees use AI tools:

1. **PII (Personally Identifiable Information) Leaks**
   - Customer emails, phone numbers, addresses
   - Social Security Numbers, credit card numbers
   - Health information (PHI)
   - Employee personal data

2. **Secrets and Credentials Exposure**
   - API keys (AWS, Stripe, Twilio, etc.)
   - Database connection strings
   - Private keys and certificates
   - OAuth tokens and session keys

3. **Proprietary Information Disclosure**
   - Source code and algorithms
   - Business strategies and financial data
   - Customer lists and contracts

### The Scale
- 65% of employees have shared sensitive data with AI tools without authorization
- Average cost of a data breach: $4.45M (IBM, 2023)
- Regulatory fines for PII exposure: Up to 4% of annual revenue (GDPR)

---

## Solution Overview

### What ZeroShare Gateway Does

ZeroShare Gateway acts as a transparent security proxy between your users and external AI services:

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Users     │────▶│  ZeroShare      │────▶│   AI APIs    │
│  (Clients)  │     │  Gateway        │     │  (OpenAI,    │
│             │◀────│  - Scan         │◀────│   Anthropic, │
│             │     │  - Redact/Block │     │   etc.)      │
│             │     │  - Log          │     │              │
└─────────────┘     └─────────────────┘     └──────────────┘
```

### Key Capabilities

1. **Intelligent Detection**
   - 50+ PII pattern types
   - 200+ secret/credential patterns
   - Custom pattern definitions
   - ML-enhanced detection for context-aware scanning

2. **Flexible Response Actions**
   - **Redact**: Replace sensitive data with placeholders
   - **Block**: Reject requests containing high-risk data
   - **Warn**: Allow with logging and alerting
   - **Allow**: Passthrough with audit logging

3. **Zero-Latency Design**
   - Sub-millisecond scanning overhead
   - Async processing for non-blocking operations
   - Connection pooling and keep-alive

4. **Enterprise Compliance**
   - Complete audit logging
   - SOC 2 Type II ready
   - GDPR, HIPAA, CCPA compliant
   - Data residency controls

---

## Technical Requirements

### Architecture

#### Deployment Model
ZeroShare Gateway is delivered as a Docker container for on-premise or private cloud deployment.

```yaml
# docker-compose.yml
version: '3.8'
services:
  zeroshare-gateway:
    image: zeroshare/gateway:latest
    ports:
      - "8080:8080"      # Proxy endpoint
      - "8443:8443"      # Proxy endpoint (TLS)
      - "3000:3000"      # Chat Portal UI
      - "9090:9090"      # Admin API
    environment:
      - DATABASE_URL=postgres://user:pass@postgres:5432/zeroshare
      - REDIS_URL=redis://redis:6379
      - LICENSE_KEY=${LICENSE_KEY}
    volumes:
      - ./config:/etc/zeroshare
      - ./logs:/var/log/zeroshare
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_DB=zeroshare
      - POSTGRES_USER=zeroshare
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

#### Components

| Component | Purpose | Optional |
|-----------|---------|----------|
| Gateway Core | Request interception, scanning, routing | Required |
| Chat Portal | Built-in AI chat interface for end users | Included |
| Admin API | Configuration and management | Included |
| PostgreSQL | Persistent storage (config, audit logs) | Optional* |
| Redis | High-volume transaction caching | Optional* |

*Can use external managed services (RDS, ElastiCache, etc.)

#### Performance Specifications

| Metric | Specification |
|--------|---------------|
| Token Window | Up to 10 million tokens per transaction |
| Latency Overhead | < 5ms p99 |
| Throughput | 10,000+ requests/second |
| Concurrent Connections | 100,000+ |
| Memory Footprint | ~512MB base, scales with load |

### External Persistence Options

#### PostgreSQL / Amazon RDS
- Stores configuration, rules, user settings
- Audit log persistence
- Supports PostgreSQL 13+
- Recommended: RDS with Multi-AZ for production

#### Redis / Amazon ElastiCache
- Session management
- Rate limiting counters
- Request deduplication
- Token counting cache
- Recommended for > 1,000 req/sec

---

## Chat Portal

### Overview
ZeroShare Gateway includes a built-in chat portal that provides a secure, branded interface for end users to interact with AI models. This eliminates the need for users to access ChatGPT, Claude, or other AI frontends directly.

### Features
- **Multi-Model Support**: Switch between OpenAI, Anthropic, Google, and other providers
- **Conversation History**: Secure, encrypted storage of chat history
- **Team Workspaces**: Shared conversations and templates
- **Custom Branding**: White-label with your company logo and colors
- **Access Controls**: SSO integration, role-based permissions
- **Usage Analytics**: Track usage per user, team, department

### Benefits
- All AI interactions go through the security proxy by default
- No need to trust employees with direct API keys
- Centralized billing and cost management
- Consistent user experience across AI providers

---

## Supported AI Tools & Clients

### Category 1: Fully Supported (Proxy Endpoint Configuration)

These tools support custom API endpoints and can be configured to route through ZeroShare Gateway:

| Tool | Type | Configuration Method | Status |
|------|------|---------------------|--------|
| OpenAI Python/Node SDK | Library | `base_url` parameter | ✅ Supported |
| Anthropic Python SDK | Library | `base_url` parameter | ✅ Supported |
| Cursor IDE | Desktop App | Settings > OpenAI Base URL | ✅ Supported |
| Cursor CLI | CLI | Environment variable | ✅ Supported |
| Claude Code CLI | CLI | `HTTPS_PROXY` env var | ✅ Supported |
| aider | CLI | `--openai-api-base` flag | ✅ Supported |
| Continue.dev | VS Code Extension | `config.yaml` | ✅ Supported |
| LiteLLM | Proxy | Upstream configuration | ✅ Supported |
| LangChain | Library | Base URL configuration | ✅ Supported |
| Semantic Kernel | Library | Endpoint configuration | ✅ Supported |
| Gemini CLI | CLI | Proxy environment variables | ✅ Supported |

### Category 2: Supported via System Proxy

These tools respect system proxy settings or environment variables:

| Tool | Type | Configuration Method | Status |
|------|------|---------------------|--------|
| GitHub Copilot | VS Code Extension | VS Code proxy settings | ✅ Supported |
| GitHub Copilot CLI | CLI | `HTTPS_PROXY` env var | ✅ Supported |
| Codeium | IDE Extension | System proxy | ✅ Supported |
| Tabnine | IDE Extension | System proxy | ✅ Supported |

### Category 3: Requires Plugin/Extension

These tools require a custom plugin to intercept requests:

| Tool | Type | Plugin Status | Notes |
|------|------|---------------|-------|
| Amazon Q Developer | IDE Extension | 🔄 Planned | Requires AWS PrivateLink or plugin |
| JetBrains AI | IDE Extension | 🔄 Planned | Plugin in development |
| Windsurf | Desktop App | 🔄 Planned | Plugin in development |

### Category 4: Chat Portal Recommended

For these services, we recommend using the ZeroShare Chat Portal instead:

| Tool | Reason | Alternative |
|------|--------|-------------|
| ChatGPT Web | No proxy support | ZeroShare Chat Portal |
| Claude Web | No proxy support | ZeroShare Chat Portal |
| Gemini Web | No proxy support | ZeroShare Chat Portal |
| Perplexity | No proxy support | ZeroShare Chat Portal |

---

## Detection Patterns

### PII Detection (50+ Types)

#### Personal Identifiers
- Email addresses
- Phone numbers (international formats)
- Social Security Numbers (SSN)
- Driver's license numbers
- Passport numbers
- National ID numbers (per country)

#### Financial Data
- Credit card numbers (Visa, MC, Amex, Discover)
- Bank account numbers
- IBAN numbers
- Routing numbers

#### Health Information (PHI)
- Medical record numbers
- Health insurance IDs
- Diagnosis codes (ICD-10)
- Prescription information

#### Location Data
- Physical addresses
- GPS coordinates
- IP addresses

### Secrets Detection (200+ Patterns)

#### Cloud Provider Keys
- AWS Access Key ID / Secret Access Key
- Azure Client ID / Secret
- GCP Service Account Keys
- DigitalOcean API Tokens

#### API Keys
- OpenAI API Keys
- Anthropic API Keys
- Stripe API Keys
- Twilio Account SID / Auth Token
- SendGrid API Keys
- Slack Tokens
- GitHub Personal Access Tokens

#### Database Credentials
- PostgreSQL connection strings
- MySQL connection strings
- MongoDB connection strings
- Redis connection strings

#### Certificates & Keys
- Private RSA/EC keys
- SSL/TLS certificates
- SSH private keys
- PGP private keys

#### Authentication Tokens
- JWT tokens
- OAuth access/refresh tokens
- Session tokens
- Bearer tokens

---

## Configuration

### Global Configuration

```yaml
# /etc/zeroshare/config.yaml
server:
  proxy_port: 8080
  proxy_tls_port: 8443
  admin_port: 9090
  chat_portal_port: 3000

security:
  default_action: redact  # redact | block | warn | allow
  log_level: info
  
detection:
  pii:
    enabled: true
    patterns:
      - email
      - phone
      - ssn
      - credit_card
      - address
    custom_patterns:
      - name: employee_id
        regex: 'EMP-\d{6}'
        action: redact
        
  secrets:
    enabled: true
    patterns:
      - aws_keys
      - api_keys
      - database_urls
      - private_keys
    block_on_detection: true
    
  custom_rules:
    - name: block_source_code
      condition: "content.contains('class ') && content.contains('def ')"
      action: block
      message: "Source code detected - blocked for review"

upstream:
  openai:
    base_url: https://api.openai.com/v1
    timeout: 120s
  anthropic:
    base_url: https://api.anthropic.com
    timeout: 120s
  google:
    base_url: https://generativelanguage.googleapis.com
    timeout: 120s

logging:
  audit:
    enabled: true
    retention_days: 90
    include_request_body: false  # Set true for compliance
    include_response_body: false
  
persistence:
  database_url: ${DATABASE_URL}
  redis_url: ${REDIS_URL}
```

---

## Compliance Requirements

### SOC 2 Type II
- [ ] Access control logging
- [ ] Change management audit trail
- [ ] Encryption at rest and in transit
- [ ] Incident response procedures
- [ ] Vendor management documentation

### GDPR
- [ ] Data subject request support
- [ ] Right to erasure (audit log redaction)
- [ ] Data processing records
- [ ] Cross-border transfer controls
- [ ] Privacy impact assessment

### HIPAA
- [ ] PHI detection and blocking
- [ ] Audit logging for all PHI access
- [ ] Encryption requirements
- [ ] Business associate agreement support
- [ ] Breach notification support

### CCPA
- [ ] California resident data handling
- [ ] Opt-out mechanisms
- [ ] Data inventory support

---

## Roadmap

### Phase 1: Core Proxy (Current)
- [x] HTTP/HTTPS proxy functionality
- [x] PII detection engine
- [x] Secrets detection engine
- [x] Audit logging
- [x] Chat Portal
- [x] Docker deployment

### Phase 2: Enterprise Features (Q2 2026)
- [ ] SSO/SAML integration
- [ ] SCIM user provisioning
- [ ] Role-based access control
- [ ] Custom detection rule builder UI
- [ ] Webhook integrations

### Phase 3: Advanced Detection (Q3 2026)
- [ ] ML-based PII detection
- [ ] Code pattern analysis
- [ ] Natural language context understanding
- [ ] False positive reduction

### Phase 4: Platform Plugins (Q4 2026)
- [ ] JetBrains IDE plugin
- [ ] Amazon Q integration
- [ ] Windsurf plugin
- [ ] Browser extension

---

## Success Metrics

### Technical KPIs
- **Detection Accuracy**: > 99.5% true positive rate
- **False Positive Rate**: < 0.1%
- **Latency Impact**: < 5ms p99
- **Uptime**: 99.99% availability

### Business KPIs
- **Blocked Incidents**: Number of PII/secret leaks prevented
- **User Adoption**: % of AI traffic routed through gateway
- **Compliance Score**: Audit findings resolved
- **Time to Value**: < 1 day deployment

---

## Appendix

### Glossary
- **PII**: Personally Identifiable Information
- **PHI**: Protected Health Information
- **DLP**: Data Loss Prevention
- **CASB**: Cloud Access Security Broker
- **Zero Trust**: Security model assuming no implicit trust

### References
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OWASP Top 10](https://owasp.org/Top10/)
- [GDPR Full Text](https://gdpr-info.eu/)
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
