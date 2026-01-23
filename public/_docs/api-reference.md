# API Reference

ZeroShare Gateway provides a RESTful Admin API for configuration, monitoring, and management.

## Base URL

```
https://your-gateway.company.com:9090/api/v1
```

## Authentication

All API requests require authentication via Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://gateway:9090/api/v1/health
```

---

## Endpoints

### Health Check

Check if the gateway is running and healthy.

```http
GET /api/v1/health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": "72h15m30s",
  "components": {
    "proxy": "healthy",
    "database": "healthy",
    "cache": "healthy"
  }
}
```

---

### Configuration

#### Get Current Configuration

```http
GET /api/v1/config
```

**Response:**
```json
{
  "server": {
    "proxy_port": 8080,
    "proxy_tls_port": 8443,
    "admin_port": 9090
  },
  "security": {
    "default_action": "redact"
  },
  "detection": {
    "pii": {
      "enabled": true,
      "patterns": ["email", "phone", "ssn", "credit_card"]
    },
    "secrets": {
      "enabled": true,
      "block_on_detection": true
    }
  }
}
```

#### Update Configuration

```http
PUT /api/v1/config
Content-Type: application/json
```

**Request Body:**
```json
{
  "security": {
    "default_action": "block"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Configuration updated",
  "restart_required": false
}
```

---

### Detection Rules

#### List All Rules

```http
GET /api/v1/rules
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Filter by type: `pii`, `secret`, `custom` |
| `enabled` | boolean | Filter by enabled status |
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Results per page (default: 50) |

**Response:**
```json
{
  "rules": [
    {
      "id": "uuid-1234",
      "name": "email_address",
      "type": "pii",
      "pattern": "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      "action": "redact",
      "enabled": true,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 50
}
```

#### Create Custom Rule

```http
POST /api/v1/rules
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "employee_id",
  "type": "custom",
  "pattern": "EMP-\\d{6}",
  "action": "redact",
  "description": "Internal employee ID numbers",
  "enabled": true
}
```

**Response:**
```json
{
  "id": "uuid-5678",
  "name": "employee_id",
  "type": "custom",
  "pattern": "EMP-\\d{6}",
  "action": "redact",
  "enabled": true,
  "created_at": "2026-01-22T10:30:00Z"
}
```

#### Update Rule

```http
PUT /api/v1/rules/{rule_id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "enabled": false
}
```

#### Delete Rule

```http
DELETE /api/v1/rules/{rule_id}
```

---

### Audit Logs

#### Query Audit Logs

```http
GET /api/v1/audit-logs
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `start_time` | ISO 8601 | Start of time range |
| `end_time` | ISO 8601 | End of time range |
| `user_id` | string | Filter by user |
| `action` | string | Filter by action: `allow`, `block`, `redact`, `warn` |
| `upstream` | string | Filter by upstream service |
| `page` | integer | Page number |
| `limit` | integer | Results per page (max: 1000) |

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid-9999",
      "timestamp": "2026-01-22T10:30:00Z",
      "request_id": "req-1234",
      "user_id": "user@company.com",
      "client_ip": "192.168.1.100",
      "upstream_service": "openai",
      "model": "gpt-4",
      "action_taken": "redact",
      "findings": [
        {"type": "email", "count": 2, "action": "redact"},
        {"type": "phone", "count": 1, "action": "redact"}
      ],
      "tokens_in": 1500,
      "tokens_out": 500,
      "latency_ms": 1234
    }
  ],
  "total": 10000,
  "page": 1,
  "limit": 100
}
```

#### Export Audit Logs

```http
GET /api/v1/audit-logs/export
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Export format: `csv`, `json`, `parquet` |
| `start_time` | ISO 8601 | Start of time range |
| `end_time` | ISO 8601 | End of time range |

**Response:** File download

---

### Users

#### List Users

```http
GET /api/v1/users
```

**Response:**
```json
{
  "users": [
    {
      "id": "uuid-user-1",
      "email": "admin@company.com",
      "role": "admin",
      "created_at": "2026-01-01T00:00:00Z",
      "last_active": "2026-01-22T10:00:00Z"
    }
  ]
}
```

#### Create User

```http
POST /api/v1/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "developer@company.com",
  "role": "user",
  "password": "secure-password"
}
```

#### Update User Role

```http
PUT /api/v1/users/{user_id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "role": "admin"
}
```

---

### Metrics

#### Get Prometheus Metrics

```http
GET /api/v1/metrics
```

**Response:** Prometheus text format
```
# HELP zeroshare_requests_total Total number of requests processed
# TYPE zeroshare_requests_total counter
zeroshare_requests_total{status="success",upstream="openai"} 12345
zeroshare_requests_total{status="blocked",upstream="openai"} 234

# HELP zeroshare_detections_total Total number of detections
# TYPE zeroshare_detections_total counter
zeroshare_detections_total{type="pii",action="redact"} 5678
zeroshare_detections_total{type="secret",action="block"} 123
```

#### Get Dashboard Statistics

```http
GET /api/v1/stats
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | Time period: `hour`, `day`, `week`, `month` |

**Response:**
```json
{
  "period": "day",
  "requests": {
    "total": 50000,
    "allowed": 48000,
    "blocked": 500,
    "redacted": 1500
  },
  "detections": {
    "pii": {
      "email": 2500,
      "phone": 800,
      "ssn": 50,
      "credit_card": 25
    },
    "secrets": {
      "aws_key": 100,
      "api_key": 350,
      "database_url": 25
    }
  },
  "top_users": [
    {"user_id": "dev1@company.com", "requests": 5000},
    {"user_id": "dev2@company.com", "requests": 4500}
  ],
  "latency_p99_ms": 15
}
```

---

### Webhooks

#### List Webhooks

```http
GET /api/v1/webhooks
```

#### Create Webhook

```http
POST /api/v1/webhooks
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["detection.block", "detection.redact"],
  "secret": "webhook-signing-secret"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {
      "field": "pattern",
      "reason": "Invalid regex syntax"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/api/v1/*` | 1000 requests/minute |
| `/api/v1/audit-logs/export` | 10 requests/hour |

---

## SDKs

Official SDKs are available for common languages:

- **Python**: `pip install zeroshare-sdk`
- **Node.js**: `npm install @zeroshare/sdk`
- **Go**: `go get github.com/zeroshare/sdk-go`

### Python Example

```python
from zeroshare import ZeroShareClient

client = ZeroShareClient(
    base_url="https://gateway:9090",
    api_key="your-admin-token"
)

# Get health
health = client.health()

# List audit logs
logs = client.audit_logs.list(
    start_time="2026-01-01T00:00:00Z",
    limit=100
)

# Create custom rule
rule = client.rules.create(
    name="custom_pattern",
    pattern="SECRET-\\d+",
    action="block"
)
```
