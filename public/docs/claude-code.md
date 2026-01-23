# Configuring Claude Code CLI with ZeroShare Gateway

This guide explains how to configure the Claude Code CLI (Anthropic's coding assistant) to route requests through ZeroShare Gateway for automatic security scanning.

## Overview

Claude Code CLI supports proxy configuration through standard environment variables. All requests to Anthropic's API will be routed through ZeroShare Gateway for security scanning.

---

## Prerequisites

- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code` or via pip)
- ZeroShare Gateway running and accessible
- Anthropic API key

---

## Configuration Methods

### Method 1: Environment Variables (Recommended)

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.profile`):

```bash
# HTTPS proxy (recommended)
export HTTPS_PROXY="https://your-gateway.company.com:8443"

# HTTP proxy (fallback)
export HTTP_PROXY="http://your-gateway.company.com:8080"

# Anthropic API key
export ANTHROPIC_API_KEY="sk-ant-your-api-key"
```

Reload your shell:
```bash
source ~/.bashrc  # or ~/.zshrc
```

### Method 2: With Authentication

If your gateway requires authentication:

```bash
export HTTPS_PROXY="https://username:password@your-gateway.company.com:8443"
```

Or using URL-encoded special characters:
```bash
# If password contains special characters like @ or :
export HTTPS_PROXY="https://username:p%40ssw%3Ard@your-gateway.company.com:8443"
```

### Method 3: Claude Code settings.json

Create or edit `~/.claude-code/settings.json`:

```json
{
  "proxy": {
    "https": "https://your-gateway.company.com:8443",
    "http": "http://your-gateway.company.com:8080"
  },
  "api": {
    "anthropic_api_key": "sk-ant-your-api-key"
  }
}
```

### Method 4: Per-Command Override

```bash
HTTPS_PROXY="https://gateway.company.com:8443" claude-code chat "Hello"
```

---

## Bypassing Proxy for Specific Hosts

If you need to bypass the proxy for certain domains:

```bash
# Space-separated list
export NO_PROXY="localhost 127.0.0.1 internal.company.com"

# Or comma-separated
export NO_PROXY="localhost,127.0.0.1,internal.company.com"
```

---

## TLS Configuration

### Custom CA Certificate

If using a corporate CA or self-signed certificate:

```bash
# Point to your CA bundle
export SSL_CERT_FILE="/path/to/company-ca-bundle.crt"

# Or for Node.js-based installations
export NODE_EXTRA_CA_CERTS="/path/to/company-ca.crt"
```

### Mutual TLS (mTLS)

For environments requiring client certificates:

```bash
# Client certificate
export SSL_CLIENT_CERT="/path/to/client.crt"
export SSL_CLIENT_KEY="/path/to/client.key"
```

---

## Verification

### Test Connection

```bash
# Simple test
claude-code chat "Say hello"

# Verify in gateway logs
curl https://your-gateway.company.com:9090/api/v1/audit-logs?limit=5 \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq
```

### Test PII Detection

```bash
# This should trigger redaction
claude-code chat "Help me write an email to john.doe@example.com about SSN 123-45-6789"

# Check gateway logs for redaction
```

---

## Docker Configuration

```dockerfile
FROM node:20-alpine

# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code

# Configure proxy
ENV HTTPS_PROXY="https://gateway.company.com:8443"
ENV ANTHROPIC_API_KEY="sk-ant-xxx"

# Add CA certificate
COPY company-ca.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

CMD ["claude-code", "daemon"]
```

---

## Integration with CI/CD

### GitHub Actions

```yaml
jobs:
  ai-assisted-review:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Claude Code
        env:
          HTTPS_PROXY: ${{ secrets.ZEROSHARE_PROXY_URL }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npm install -g @anthropic-ai/claude-code
          claude-code review ./src
```

### GitLab CI

```yaml
ai-review:
  image: node:20
  variables:
    HTTPS_PROXY: "${ZEROSHARE_PROXY_URL}"
    ANTHROPIC_API_KEY: "${ANTHROPIC_API_KEY}"
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude-code review ./src
```

---

## Common Issues

### SOCKS Proxy Not Supported

Claude Code does **not** support SOCKS proxies. Use HTTP/HTTPS proxies only.

**Workaround**: Use a SOCKS-to-HTTP proxy converter like `privoxy`:

```bash
# Install privoxy
apt-get install privoxy

# Configure privoxy to forward to SOCKS
echo "forward-socks5 / 127.0.0.1:1080 ." >> /etc/privoxy/config

# Use privoxy as HTTP proxy
export HTTPS_PROXY="http://127.0.0.1:8118"
```

### Connection Timeout

```
Error: ETIMEDOUT connecting to proxy
```

**Solution**:
1. Verify gateway is accessible: `curl -I https://gateway.company.com:8443/health`
2. Check firewall rules
3. Verify proxy URL format is correct

### Certificate Verification Failed

```
Error: unable to verify the first certificate
```

**Solution**:
1. Add CA certificate to system trust store
2. Set `SSL_CERT_FILE` environment variable
3. For testing only: `export NODE_TLS_REJECT_UNAUTHORIZED=0` (not for production)

---

## Support

For issues specific to ZeroShare Gateway integration:
- [ZeroShare Documentation](https://docs.deployzeroshare.com)
- [Support Portal](https://deployzeroshare.com/support)

For Claude Code CLI issues:
- [Anthropic Documentation](https://docs.anthropic.com/claude-code)
