# Installation Guide

This guide walks you through deploying ZeroShare Gateway in your environment.

## Deployment Options

ZeroShare Gateway supports multiple deployment methods:

| Method | Best For | Complexity |
|--------|----------|------------|
| AWS Marketplace | Fastest deployment | Easy |
| Docker Compose | Development, Small Teams | Easy |
| Kubernetes | Enterprise, High Availability | Medium |
| Manual Installation | Custom environments | Advanced |

---

## Option 1: AWS Marketplace (Recommended)

The fastest way to deploy ZeroShare Gateway is through AWS Marketplace.

### Prerequisites
- AWS Account with appropriate permissions
- VPC with private subnets
- EC2 or ECS capacity

### Steps

1. **Visit AWS Marketplace**
   - Navigate to the [ZeroShare Gateway listing](https://aws.amazon.com/marketplace)
   - Click "Continue to Subscribe"

2. **Configure Subscription**
   - Select your preferred pricing tier
   - Accept the terms and conditions
   - Click "Continue to Configuration"

3. **Launch the Product**
   - Select your region
   - Choose deployment method (EC2 or Container)
   - Configure networking settings
   - Launch the stack

4. **Access the Gateway**
   - Once deployed, access the admin console at `https://<instance-ip>:9090`
   - Default credentials are provided in CloudFormation outputs

---

## Option 2: Docker Compose

Perfect for development environments or small teams.

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum
- 10GB disk space

### Quick Start

1. **Create a project directory**
```bash
mkdir zeroshare && cd zeroshare
```

2. **Create docker-compose.yml**
```yaml
version: '3.8'
services:
  gateway:
    image: zeroshare/gateway:latest
    ports:
      - "8080:8080"      # HTTP Proxy
      - "8443:8443"      # HTTPS Proxy
      - "3000:3000"      # Chat Portal
      - "9090:9090"      # Admin API
    environment:
      - DATABASE_URL=postgres://zeroshare:password@postgres:5432/zeroshare
      - REDIS_URL=redis://redis:6379
      - LICENSE_KEY=${LICENSE_KEY}
    volumes:
      - ./config:/etc/zeroshare
      - ./logs:/var/log/zeroshare
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
    command: redis-server --appendonly yes
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

3. **Set your license key**
```bash
export LICENSE_KEY="your-license-key-here"
```

4. **Start the services**
```bash
docker-compose up -d
```

5. **Verify deployment**
```bash
curl http://localhost:9090/health
# Expected: {"status": "healthy", "version": "1.0.0"}
```

### Configuration

Create a configuration file at `./config/config.yaml`:

```yaml
server:
  proxy_port: 8080
  proxy_tls_port: 8443
  admin_port: 9090
  chat_portal_port: 3000

security:
  default_action: redact

detection:
  pii:
    enabled: true
    patterns:
      - email
      - phone
      - ssn
      - credit_card
  secrets:
    enabled: true
    block_on_detection: true

logging:
  level: info
  audit:
    enabled: true
    retention_days: 90
```

---

## Option 3: Kubernetes

For enterprise deployments requiring high availability and scalability.

### Prerequisites
- Kubernetes 1.25+
- Helm 3.0+
- kubectl configured
- Persistent storage provisioner

### Helm Installation

1. **Add the ZeroShare Helm repository**
```bash
helm repo add zeroshare https://charts.zeroshare.io
helm repo update
```

2. **Create a values file**
```yaml
# values.yaml
replicaCount: 3

image:
  repository: zeroshare/gateway
  tag: latest

config:
  licenseKey: "your-license-key"
  
postgresql:
  enabled: true
  auth:
    database: zeroshare
    username: zeroshare
    password: "secure-password"

redis:
  enabled: true
  auth:
    enabled: false

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: ai-gateway.company.com
      paths:
        - path: /
          pathType: Prefix

resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "2000m"
```

3. **Install the chart**
```bash
helm install zeroshare zeroshare/gateway \
  --namespace zeroshare \
  --create-namespace \
  -f values.yaml
```

4. **Verify deployment**
```bash
kubectl get pods -n zeroshare
kubectl get svc -n zeroshare
```

---

## Post-Installation Steps

### 1. Generate TLS Certificates

For production deployments, configure proper TLS certificates:

```bash
# Using Let's Encrypt with certbot
certbot certonly --standalone -d ai-gateway.company.com

# Copy certificates to gateway
cp /etc/letsencrypt/live/ai-gateway.company.com/fullchain.pem ./config/tls/
cp /etc/letsencrypt/live/ai-gateway.company.com/privkey.pem ./config/tls/
```

### 2. Configure Authentication

Set up user authentication via the admin API:

```bash
curl -X POST https://localhost:9090/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "role": "admin",
    "password": "secure-password"
  }'
```

### 3. Test the Proxy

Verify the gateway is intercepting requests:

```bash
# Set proxy environment variable
export HTTPS_PROXY=https://localhost:8443

# Make a test request
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### 4. Configure Client Tools

See our [Configuration Guides](/docs) to set up:
- [Cursor IDE](./cursor.md)
- [Claude Code CLI](./claude-code.md)
- [Other tools](./configuration.md)

---

## Troubleshooting Installation

### Container Won't Start

Check the logs:
```bash
docker-compose logs gateway
```

Common issues:
- **Port already in use**: Change port mappings in docker-compose.yml
- **Database connection failed**: Ensure PostgreSQL is healthy first
- **Invalid license key**: Verify your LICENSE_KEY environment variable

### Cannot Access Admin Console

1. Verify the service is running:
```bash
curl http://localhost:9090/health
```

2. Check firewall rules allow port 9090

3. If using Docker, ensure port is mapped correctly

### Performance Issues

- Increase container memory limits
- Enable Redis for caching
- Check network latency to upstream AI services

---

## Next Steps

- [Configure client tools](/docs/configuration)
- [Set up detection rules](/docs/api-reference)
- [Review security best practices](/docs/troubleshooting)
