# Configuration Overview

This guide covers all configuration options for ZeroShare Gateway and how to connect various AI tools.

## Quick Start

Before configuring any client, ensure your ZeroShare Gateway is running and accessible:

```bash
# Verify gateway is running
curl https://your-gateway.company.com:8443/health

# Expected response
{"status": "healthy", "version": "1.0.0"}
```

---

## Gateway URL Format

```
https://<gateway-host>:<port>/v1
```

Examples:
- Local development: `https://localhost:8443/v1`
- Docker: `https://zeroshare-gateway:8443/v1`
- Production: `https://ai-gateway.company.com/v1`

---

## Authentication

Most configurations require an API key. You can use:

### 1. Passthrough Mode
Use your existing OpenAI/Anthropic API keys. The gateway forwards them to the upstream provider.

```bash
export OPENAI_API_KEY="sk-your_openai_key"
```

### 2. Gateway Keys
Use ZeroShare-issued API keys for additional control and user tracking.

```bash
export ZEROSHARE_API_KEY="zsk_your_api_key_here"
```

---

## TLS Certificates

### For Production (Trusted CA)

Use certificates from a trusted Certificate Authority. No additional configuration needed on clients.

### For Development (Self-Signed)

Add the gateway CA to your system trust store:

**macOS:**
```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain gateway-ca.crt
```

**Linux:**
```bash
sudo cp gateway-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

**Windows:**
```powershell
Import-Certificate -FilePath gateway-ca.crt -CertStoreLocation Cert:\LocalMachine\Root
```

---

## Supported AI Tools

### Category 1: Fully Supported (Proxy Endpoint Configuration)

These tools support custom API endpoints and can be configured to route through ZeroShare Gateway:

| Tool | Type | Configuration Method | Guide |
|------|------|---------------------|-------|
| OpenAI Python/Node SDK | Library | `base_url` parameter | [Link](#openai-sdk) |
| Anthropic Python SDK | Library | `base_url` parameter | [Link](#anthropic-sdk) |
| Cursor IDE | Desktop App | Settings > OpenAI Base URL | [Full Guide](./cursor.md) |
| Claude Code CLI | CLI | `HTTPS_PROXY` env var | [Full Guide](./claude-code.md) |
| aider | CLI | `--openai-api-base` flag | [Link](#aider) |
| Continue.dev | VS Code Extension | `config.yaml` | [Link](#continue) |
| LiteLLM | Proxy | Upstream configuration | [Link](#litellm) |
| LangChain | Library | Base URL configuration | [Link](#langchain) |

### Category 2: Supported via System Proxy

These tools respect system proxy settings or environment variables:

| Tool | Type | Configuration Method |
|------|------|---------------------|
| GitHub Copilot | VS Code Extension | VS Code proxy settings |
| GitHub Copilot CLI | CLI | `HTTPS_PROXY` env var |
| Codeium | IDE Extension | System proxy |
| Tabnine | IDE Extension | System proxy |

### Category 3: Chat Portal Recommended

For these services, we recommend using the ZeroShare Chat Portal instead:

| Tool | Reason | Alternative |
|------|--------|-------------|
| ChatGPT Web | No proxy support | ZeroShare Chat Portal |
| Claude Web | No proxy support | ZeroShare Chat Portal |
| Gemini Web | No proxy support | ZeroShare Chat Portal |

---

## Configuration Examples

### OpenAI SDK {#openai-sdk}

**Python:**
```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://your-gateway.company.com:8443/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**Node.js:**
```javascript
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'sk-your-key',
    baseURL: 'https://your-gateway.company.com:8443/v1'
});

const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }]
});
```

### Anthropic SDK {#anthropic-sdk}

**Python:**
```python
from anthropic import Anthropic

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://your-gateway.company.com:8443"
)

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### aider {#aider}

```bash
# Set environment variables
export OPENAI_API_BASE="https://your-gateway.company.com:8443/v1"
export OPENAI_API_KEY="sk-your-key"

# Or use command line flag
aider --openai-api-base https://your-gateway.company.com:8443/v1
```

### Continue.dev {#continue}

Edit `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "GPT-4 (via ZeroShare)",
      "provider": "openai",
      "model": "gpt-4",
      "apiBase": "https://your-gateway.company.com:8443/v1",
      "apiKey": "sk-your-key"
    }
  ]
}
```

### LiteLLM {#litellm}

```python
import litellm

litellm.api_base = "https://your-gateway.company.com:8443/v1"

response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### LangChain {#langchain}

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_key="sk-your-key",
    openai_api_base="https://your-gateway.company.com:8443/v1"
)

response = llm.invoke("Hello!")
```

---

## Environment Variables Reference

Set these environment variables to configure AI tools:

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `OPENAI_API_BASE` | OpenAI base URL | `https://gateway:8443/v1` |
| `ANTHROPIC_API_KEY` | Anthropic API key | `sk-ant-...` |
| `HTTPS_PROXY` | HTTPS proxy URL | `https://gateway:8443` |
| `HTTP_PROXY` | HTTP proxy URL | `http://gateway:8080` |
| `NO_PROXY` | Hosts to bypass proxy | `localhost,127.0.0.1` |
| `SSL_CERT_FILE` | Custom CA bundle | `/path/to/ca-bundle.crt` |
| `NODE_EXTRA_CA_CERTS` | Node.js CA certs | `/path/to/ca.crt` |

---

## Gateway Configuration File

The gateway itself is configured via `/etc/zeroshare/config.yaml`:

```yaml
server:
  proxy_port: 8080
  proxy_tls_port: 8443
  admin_port: 9090
  chat_portal_port: 3000

security:
  default_action: redact  # redact | block | warn | allow
  
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

upstream:
  openai:
    base_url: https://api.openai.com/v1
    timeout: 120s
  anthropic:
    base_url: https://api.anthropic.com
    timeout: 120s

logging:
  level: info
  audit:
    enabled: true
    retention_days: 90
```

---

## Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:8443
```
**Solution**: Verify gateway is running and port is correct.

### Certificate Errors
```
Error: unable to verify the first certificate
```
**Solution**: Add gateway CA certificate to system trust store or configure client to trust it.

### Authentication Failed
```
Error: 401 Unauthorized
```
**Solution**: Verify API key is correct and has required permissions.

### Request Blocked
```
Error: 403 Forbidden - PII detected in request
```
**Solution**: This means ZeroShare is working! Review the blocked content and remove sensitive data.

---

## Need Help?

- [Full Documentation](https://docs.deployzeroshare.com)
- [Support Portal](https://deployzeroshare.com/support)
- [Contact Us](https://deployzeroshare.com/contact-us)
