# Configuring aider with ZeroShare Gateway

This guide explains how to configure aider (AI pair programming tool) to route all AI requests through ZeroShare Gateway.

## Overview

aider is a powerful CLI tool for AI-assisted coding that supports multiple LLM providers. It can be configured to use ZeroShare Gateway through environment variables or command-line flags.

---

## Prerequisites

- aider installed (`pip install aider-chat`)
- ZeroShare Gateway running and accessible
- API key for your LLM provider (OpenAI, Anthropic, etc.)

---

## Configuration Methods

### Method 1: Environment Variables (Recommended)

Set environment variables in your shell profile:

```bash
# ~/.bashrc or ~/.zshrc

# OpenAI configuration
export OPENAI_API_KEY="sk-your-openai-key"
export OPENAI_API_BASE="https://your-gateway.company.com:8443/v1"

# Or for Anthropic
export ANTHROPIC_API_KEY="sk-ant-your-anthropic-key"
export ANTHROPIC_API_BASE="https://your-gateway.company.com:8443"
```

Reload your shell:
```bash
source ~/.bashrc
```

Then run aider normally:
```bash
aider
```

### Method 2: Command-Line Flags

Pass the gateway URL directly:

```bash
# OpenAI models
aider --openai-api-base https://gateway.company.com:8443/v1

# Anthropic models
aider --model claude-3-opus-20240229 \
      --anthropic-api-base https://gateway.company.com:8443
```

### Method 3: Configuration File

Create `~/.aider.conf.yml`:

```yaml
# OpenAI configuration
openai-api-base: https://gateway.company.com:8443/v1
openai-api-key: sk-your-key

# Or Anthropic configuration
# model: claude-3-opus-20240229
# anthropic-api-base: https://gateway.company.com:8443
# anthropic-api-key: sk-ant-your-key
```

### Method 4: Project-Level Configuration

Create `.aider.conf.yml` in your project root:

```yaml
openai-api-base: https://gateway.company.com:8443/v1
model: gpt-4
auto-commits: false
```

---

## Provider-Specific Configuration

### OpenAI (GPT-4, GPT-3.5)

```bash
export OPENAI_API_KEY="sk-..."
export OPENAI_API_BASE="https://gateway.company.com:8443/v1"

aider --model gpt-4
```

### Anthropic (Claude)

```bash
export ANTHROPIC_API_KEY="sk-ant-..."

aider --model claude-3-opus-20240229 \
      --anthropic-api-base https://gateway.company.com:8443
```

### Azure OpenAI

```bash
export AZURE_API_KEY="your-azure-key"
export AZURE_API_BASE="https://gateway.company.com:8443"
export AZURE_API_VERSION="2024-02-15-preview"

aider --model azure/your-deployment-name
```

### Local Models (Ollama)

If using local models but want audit logging:

```bash
aider --model ollama/llama2 \
      --openai-api-base https://gateway.company.com:8443/v1
```

---

## Security Best Practices

### Git Integration

aider can auto-commit changes. For security, consider:

```yaml
# .aider.conf.yml
auto-commits: false        # Disable auto-commits
dirty-commits: false       # Don't commit if repo is dirty
```

### Message Logging

aider creates `.aider.chat.history.md` files. Configure location:

```bash
aider --chat-history-file /secure/location/history.md
```

### Input Files

Be selective about files you add to aider context:

```bash
# Good - specific files
aider src/main.py src/utils.py

# Risky - entire directories with potential secrets
aider .  # May include .env files
```

---

## Complete Configuration Example

### ~/.bashrc or ~/.zshrc

```bash
# ZeroShare Gateway Configuration for aider
export OPENAI_API_KEY="sk-your-key"
export OPENAI_API_BASE="https://ai-gateway.company.com:8443/v1"

# Anthropic (if using Claude)
export ANTHROPIC_API_KEY="sk-ant-your-key"

# SSL Certificate (if using corporate CA)
export SSL_CERT_FILE="/etc/ssl/certs/company-ca-bundle.crt"

# Alias for convenience
alias aider-secure="aider --openai-api-base https://ai-gateway.company.com:8443/v1"
```

### ~/.aider.conf.yml

```yaml
# Model configuration
model: gpt-4
openai-api-base: https://ai-gateway.company.com:8443/v1

# Safety settings
auto-commits: false
dirty-commits: false
attribute-author: false
attribute-committer: false

# Performance
stream: true
map-tokens: 1024

# Output
dark-mode: true
pretty: true
```

---

## Verification

### Test Connection

```bash
# Simple test
aider --message "Say hello" --yes

# Check gateway received request
curl -H "Authorization: Bearer $TOKEN" \
  "https://gateway:9090/api/v1/audit-logs?limit=1" | jq
```

### Test PII Detection

```bash
# Create test file
echo "# Customer: john@example.com" > test.py

# Add to aider and ask for help
aider test.py --message "Improve this comment"

# Check if email was redacted in gateway logs
```

### Verify All Traffic Routes Through Gateway

```bash
# Monitor gateway logs in real-time
curl -N "https://gateway:9090/api/v1/audit-logs/stream" \
  -H "Authorization: Bearer $TOKEN"

# In another terminal, run aider
aider --message "Hello"
```

---

## CI/CD Integration

### GitHub Actions

```yaml
jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install aider
        run: pip install aider-chat
      
      - name: Run AI Code Review
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          OPENAI_API_BASE: ${{ secrets.ZEROSHARE_GATEWAY_URL }}
        run: |
          aider --message "Review changes in this PR" \
                --yes --no-auto-commits
```

### GitLab CI

```yaml
ai-review:
  image: python:3.11
  variables:
    OPENAI_API_BASE: "${ZEROSHARE_GATEWAY_URL}"
  script:
    - pip install aider-chat
    - aider --message "Review this code" --yes
```

---

## Troubleshooting

### "API Error: Connection refused"

**Cause:** Gateway URL incorrect or unreachable

**Solutions:**
```bash
# Test gateway directly
curl https://gateway:8443/health

# Verify environment variable
echo $OPENAI_API_BASE

# Check for typos in URL
```

### "SSL Certificate Error"

**Cause:** Self-signed or corporate CA not trusted

**Solutions:**
```bash
# Add CA certificate
export SSL_CERT_FILE="/path/to/ca-bundle.crt"

# Or for testing only (not recommended)
export REQUESTS_CA_BUNDLE=""
```

### "Model not found"

**Cause:** Model name doesn't match gateway configuration

**Solutions:**
```bash
# Check available models
curl https://gateway:8443/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Use correct model name
aider --model gpt-4-turbo-preview
```

### Slow Response Times

**Cause:** Gateway or network latency

**Solutions:**
```bash
# Enable streaming for faster perceived response
aider --stream

# Check gateway latency
time curl https://gateway:8443/health
```

---

## Common Workflows

### Code Review

```bash
aider --message "Review this code for security issues and best practices"
```

### Refactoring

```bash
aider src/legacy.py --message "Refactor to use modern Python patterns"
```

### Test Generation

```bash
aider src/utils.py --message "Generate comprehensive unit tests"
```

### Documentation

```bash
aider src/api.py --message "Add detailed docstrings to all functions"
```

---

## Support

- [aider Documentation](https://aider.chat/docs)
- [ZeroShare Support](https://deployzeroshare.com/support)
