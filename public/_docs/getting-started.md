# Getting Started with ZeroShare Gateway

Welcome to ZeroShare Gateway! This guide will help you get up and running quickly with enterprise-grade AI security.

## What is ZeroShare Gateway?

ZeroShare Gateway is an on-premise AI security solution that protects your organization from accidental data leaks when employees use AI tools like ChatGPT, Copilot, Cursor, Claude, and other generative AI services.

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Your      │────▶│   ZeroShare     │────▶│   AI APIs    │
│   Users     │     │   Gateway       │     │  (OpenAI,    │
│             │◀────│  • Scan         │◀────│   Anthropic, │
│             │     │  • Redact/Block │     │   etc.)      │
└─────────────┘     └─────────────────┘     └──────────────┘
```

---

## Key Features

### PII Redaction
Automatically detects and masks sensitive personal information:
- Email addresses
- Phone numbers
- Social Security Numbers
- Credit card numbers
- Health information (PHI)
- Physical addresses

### Secret Blocking
Prevents accidental exposure of credentials:
- AWS/Azure/GCP keys
- API keys (OpenAI, Stripe, Twilio, etc.)
- Database connection strings
- Private keys and certificates
- OAuth tokens

### On-Premise Deployment
Complete control over your data:
- Runs entirely within your network
- No data sent to third parties
- Your infrastructure, your rules
- Full audit logging

### Zero Latency Impact
Transparent proxy with minimal overhead:
- Sub-millisecond scanning
- Streaming support for large payloads
- Connection pooling
- No workflow disruption

---

## Quick Start

### Option 1: AWS Marketplace (Fastest)

1. Visit the [ZeroShare Gateway listing](https://aws.amazon.com/marketplace) on AWS Marketplace
2. Click "Subscribe" and accept terms
3. Launch the CloudFormation stack
4. Configure your AI tools to use the gateway

### Option 2: Docker Compose (Development)

```bash
# 1. Create project directory
mkdir zeroshare && cd zeroshare

# 2. Download docker-compose.yml
curl -O https://raw.githubusercontent.com/zeroshare/gateway/main/docker-compose.yml

# 3. Set environment variables
export LICENSE_KEY="your-license-key"

# 4. Start services
docker-compose up -d

# 5. Verify
curl http://localhost:9090/api/v1/health
```

---

## Configure Your First AI Tool

Once the gateway is running, configure your AI tools to route through it.

### Example: Cursor IDE

1. Open Cursor Settings (`Cmd/Ctrl + ,`)
2. Navigate to **Models**
3. Enable **Override OpenAI Base URL**
4. Enter: `https://your-gateway:8443/v1`
5. Test by using any AI feature

### Example: OpenAI Python SDK

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://your-gateway:8443/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Example: Claude Code CLI

```bash
export HTTPS_PROXY="https://your-gateway:8443"
export ANTHROPIC_API_KEY="sk-ant-your-key"

claude-code chat "Hello!"
```

---

## Verify Protection

Test that ZeroShare is detecting sensitive data:

1. **Access the Admin Console**
   ```
   https://your-gateway:9090
   ```

2. **Send a Test Request**
   Include intentional PII in an AI request:
   ```
   "Please help me format this customer data: john@example.com, SSN 123-45-6789"
   ```

3. **Check Audit Logs**
   The gateway should show:
   - Email detected and redacted
   - SSN detected and blocked

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Network                              │
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                │
│  │ Cursor   │   │ Copilot  │   │ Claude   │                │
│  │  IDE     │   │          │   │  Code    │                │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘                │
│       │              │              │                       │
│       └──────────────┼──────────────┘                       │
│                      ▼                                      │
│          ┌───────────────────────┐                         │
│          │   ZeroShare Gateway   │                         │
│          │                       │                         │
│          │  • PII Detection      │                         │
│          │  • Secret Blocking    │                         │
│          │  • Audit Logging      │                         │
│          └───────────┬───────────┘                         │
│                      │                                      │
└──────────────────────┼──────────────────────────────────────┘
                       │
                       ▼
           ┌──────────────────────┐
           │   External AI APIs    │
           │   (Data is clean)     │
           └──────────────────────┘
```

---

## What's Next?

1. **[Installation Guide](./installation)** - Detailed deployment instructions
2. **[Configuration](./configuration)** - Configure all your AI tools
3. **[Detection Patterns](./detection-patterns)** - Understand what's detected
4. **[API Reference](./api-reference)** - Admin API documentation
5. **[Troubleshooting](./troubleshooting)** - Common issues and solutions

---

## Support

- **Documentation**: You're here!
- **Support Portal**: [deployzeroshare.com/support](https://deployzeroshare.com/support)
- **Email**: support@deployzeroshare.com

---

## Security Compliance

ZeroShare Gateway helps you meet compliance requirements:

| Framework | How ZeroShare Helps |
|-----------|---------------------|
| **HIPAA** | Blocks PHI from reaching AI services |
| **GDPR** | Prevents PII export to third parties |
| **SOC 2** | Complete audit logging |
| **PCI-DSS** | Blocks credit card data |
| **CCPA** | Controls personal data sharing |
