# ZeroShare Gateway - Configuration Guides

This directory contains detailed configuration guides for integrating ZeroShare Gateway with various AI tools and services.

## Quick Start

Before configuring any client, ensure your ZeroShare Gateway is running and accessible:

```bash
# Verify gateway is running
curl https://your-gateway.company.com:8443/health

# Expected response
{"status": "healthy", "version": "1.0.0"}
```

## Configuration Guides

### IDE Extensions & Desktop Apps

| Tool | Guide | Difficulty |
|------|-------|------------|
| [Cursor IDE](./cursor.md) | Full guide | Easy |
| [VS Code + Continue](./continue.md) | Full guide | Easy |
| [GitHub Copilot](./copilot.md) | Full guide | Medium |
| [JetBrains AI](./jetbrains.md) | Full guide | Medium |

### CLI Tools

| Tool | Guide | Difficulty |
|------|-------|------------|
| [Claude Code CLI](./claude-code.md) | Full guide | Easy |
| [aider](./aider.md) | Full guide | Easy |
| [Gemini CLI](./gemini-cli.md) | Full guide | Easy |
| [GitHub Copilot CLI](./copilot-cli.md) | Full guide | Easy |

### SDKs & Libraries

| Tool | Guide | Difficulty |
|------|-------|------------|
| [OpenAI Python/Node](./openai-sdk.md) | Full guide | Easy |
| [Anthropic SDK](./anthropic-sdk.md) | Full guide | Easy |
| [LangChain](./langchain.md) | Full guide | Easy |
| [LiteLLM](./litellm.md) | Full guide | Easy |

### Enterprise Integration

| Tool | Guide | Difficulty |
|------|-------|------------|
| [Amazon Q Developer](./amazon-q.md) | Full guide | Advanced |
| [System-Wide Proxy](./system-proxy.md) | Full guide | Medium |

## Common Configuration

### Gateway URL Format

```
https://<gateway-host>:<port>/v1
```

Examples:
- Local development: `https://localhost:8443/v1`
- Docker: `https://zeroshare-gateway:8443/v1`
- Production: `https://ai-gateway.company.com/v1`

### Authentication

Most configurations require an API key. You can use:

1. **Passthrough Mode**: Use your existing OpenAI/Anthropic API keys
2. **Gateway Keys**: Use ZeroShare-issued API keys for additional control

```bash
# Environment variable (recommended)
export ZEROSHARE_API_KEY="zsk_your_api_key_here"

# Or use your existing provider key
export OPENAI_API_KEY="sk-your_openai_key"
```

### TLS Certificates

For self-signed certificates in development:

```bash
# Add gateway CA to system trust store (macOS)
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain gateway-ca.crt

# Add gateway CA to system trust store (Linux)
sudo cp gateway-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates

# Or disable TLS verification (NOT recommended for production)
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

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

## Need Help?

- [Full Documentation](https://docs.deployzeroshare.com)
- [Support](https://deployzeroshare.com/support)
- [Community Forum](https://community.deployzeroshare.com)
