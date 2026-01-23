# Configuring Continue.dev with ZeroShare Gateway

This guide explains how to configure the Continue.dev VS Code extension to route AI requests through ZeroShare Gateway.

## Overview

Continue.dev is an open-source AI coding assistant that supports multiple LLM providers. It can be easily configured to use ZeroShare Gateway as a proxy, ensuring all AI requests are scanned for PII and secrets.

---

## Prerequisites

- VS Code with Continue extension installed
- ZeroShare Gateway running and accessible
- API key for your chosen LLM provider

---

## Configuration

Continue.dev uses a `config.json` file for configuration. This is the recommended method for ZeroShare integration.

### Locate Configuration File

The config file is located at:
- **macOS/Linux:** `~/.continue/config.json`
- **Windows:** `%USERPROFILE%\.continue\config.json`

### Configure with ZeroShare Gateway

Edit `config.json` to point your models at the gateway:

```json
{
  "models": [
    {
      "title": "GPT-4 (via ZeroShare)",
      "provider": "openai",
      "model": "gpt-4",
      "apiBase": "https://your-gateway.company.com:8443/v1",
      "apiKey": "sk-your-openai-key"
    },
    {
      "title": "Claude 3 (via ZeroShare)", 
      "provider": "anthropic",
      "model": "claude-3-opus-20240229",
      "apiBase": "https://your-gateway.company.com:8443",
      "apiKey": "sk-ant-your-anthropic-key"
    },
    {
      "title": "GPT-3.5 Turbo (via ZeroShare)",
      "provider": "openai",
      "model": "gpt-3.5-turbo",
      "apiBase": "https://your-gateway.company.com:8443/v1",
      "apiKey": "sk-your-openai-key"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Autocomplete (via ZeroShare)",
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "apiBase": "https://your-gateway.company.com:8443/v1",
    "apiKey": "sk-your-openai-key"
  },
  "embeddingsProvider": {
    "provider": "openai",
    "model": "text-embedding-ada-002",
    "apiBase": "https://your-gateway.company.com:8443/v1",
    "apiKey": "sk-your-openai-key"
  }
}
```

---

## Provider-Specific Configuration

### OpenAI Models

```json
{
  "title": "GPT-4 Turbo",
  "provider": "openai",
  "model": "gpt-4-turbo-preview",
  "apiBase": "https://gateway.company.com:8443/v1",
  "apiKey": "sk-..."
}
```

### Anthropic Claude

```json
{
  "title": "Claude 3 Sonnet",
  "provider": "anthropic",
  "model": "claude-3-sonnet-20240229",
  "apiBase": "https://gateway.company.com:8443",
  "apiKey": "sk-ant-..."
}
```

### Azure OpenAI

```json
{
  "title": "Azure GPT-4",
  "provider": "openai",
  "model": "gpt-4",
  "apiBase": "https://gateway.company.com:8443/v1",
  "apiKey": "your-azure-key",
  "apiType": "azure",
  "apiVersion": "2024-02-15-preview",
  "engine": "your-deployment-name"
}
```

### Google Gemini

```json
{
  "title": "Gemini Pro",
  "provider": "google-palm",
  "model": "gemini-pro",
  "apiBase": "https://gateway.company.com:8443",
  "apiKey": "your-google-key"
}
```

### Local Models (Ollama)

For local models, you may not need the gateway, but if you want logging:

```json
{
  "title": "Local Llama (via ZeroShare)",
  "provider": "ollama",
  "model": "llama2",
  "apiBase": "https://gateway.company.com:8443"
}
```

---

## Environment Variables

You can also use environment variables for API keys:

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiBase": "https://gateway.company.com:8443/v1"
    }
  ]
}
```

Then set:
```bash
export OPENAI_API_KEY="sk-your-key"
export ANTHROPIC_API_KEY="sk-ant-your-key"
```

---

## Tab Autocomplete Configuration

Configure tab autocomplete to use the gateway:

```json
{
  "tabAutocompleteModel": {
    "title": "Fast Autocomplete",
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "apiBase": "https://gateway.company.com:8443/v1",
    "apiKey": "sk-..."
  },
  "tabAutocompleteOptions": {
    "useCopyBuffer": false,
    "maxPromptTokens": 1024,
    "debounceDelay": 500
  }
}
```

---

## Context Providers

Configure context providers that may send code to AI:

```json
{
  "contextProviders": [
    {
      "name": "code",
      "params": {}
    },
    {
      "name": "docs",
      "params": {}
    },
    {
      "name": "diff",
      "params": {}
    }
  ]
}
```

All context is sent through your configured model's `apiBase`, which routes through ZeroShare.

---

## Slash Commands

Slash commands use your configured models:

```json
{
  "slashCommands": [
    {
      "name": "edit",
      "description": "Edit selected code"
    },
    {
      "name": "comment",
      "description": "Add comments to code"
    },
    {
      "name": "share",
      "description": "Export conversation"
    }
  ]
}
```

---

## Custom System Prompts

Add security reminders to system prompts:

```json
{
  "systemMessage": "You are a helpful coding assistant. Note: All requests are monitored for security compliance. Do not include real customer data, API keys, or credentials in your responses."
}
```

---

## Complete Example Configuration

```json
{
  "models": [
    {
      "title": "GPT-4 (Secure)",
      "provider": "openai",
      "model": "gpt-4",
      "apiBase": "https://ai-gateway.company.com:8443/v1",
      "apiKey": "sk-your-key",
      "contextLength": 8192,
      "completionOptions": {
        "temperature": 0.7,
        "maxTokens": 2048
      }
    },
    {
      "title": "Claude 3 Opus (Secure)",
      "provider": "anthropic",
      "model": "claude-3-opus-20240229",
      "apiBase": "https://ai-gateway.company.com:8443",
      "apiKey": "sk-ant-your-key",
      "contextLength": 200000
    }
  ],
  "tabAutocompleteModel": {
    "title": "Fast Complete",
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "apiBase": "https://ai-gateway.company.com:8443/v1",
    "apiKey": "sk-your-key"
  },
  "embeddingsProvider": {
    "provider": "openai",
    "model": "text-embedding-ada-002",
    "apiBase": "https://ai-gateway.company.com:8443/v1",
    "apiKey": "sk-your-key"
  },
  "systemMessage": "You are a secure coding assistant.",
  "allowAnonymousTelemetry": false
}
```

---

## Verification

### Test Configuration

1. Open VS Code with Continue extension
2. Open the Continue panel (`Cmd/Ctrl + L`)
3. Send a test message: "Hello, can you help me with coding?"
4. Verify response comes through successfully

### Check Gateway Logs

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://gateway:9090/api/v1/audit-logs?limit=5" | jq '.logs[] | {user: .user_id, model: .model, action: .action_taken}'
```

### Test PII Detection

Send a message with test PII:
```
Help me write an email to john.doe@example.com about the project
```

The gateway should log the email as redacted.

---

## Troubleshooting

### "Model not found" Error

**Cause:** Incorrect `apiBase` URL format

**Solution:** Ensure URL includes `/v1` for OpenAI:
```json
"apiBase": "https://gateway:8443/v1"  // Correct
"apiBase": "https://gateway:8443"     // Wrong for OpenAI
```

### Connection Timeout

**Cause:** Gateway unreachable or TLS issues

**Solution:**
1. Test gateway: `curl https://gateway:8443/health`
2. Check TLS certificate trust
3. Verify firewall allows port 8443

### Autocomplete Not Working

**Cause:** Separate autocomplete model not configured

**Solution:** Ensure `tabAutocompleteModel` is configured with gateway URL

---

## Support

- [Continue.dev Documentation](https://continue.dev/docs)
- [ZeroShare Support](https://deployzeroshare.com/support)
