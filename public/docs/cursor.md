# Configuring Cursor IDE with ZeroShare Gateway

This guide explains how to configure Cursor IDE to route all AI requests through ZeroShare Gateway for automatic PII redaction and secrets blocking.

## Overview

Cursor IDE supports custom API endpoints through its settings. By configuring the OpenAI Base URL override, all AI requests will be routed through ZeroShare Gateway for security scanning.

---

## Prerequisites

- Cursor IDE installed (version 0.40+)
- ZeroShare Gateway running and accessible
- API key (OpenAI or ZeroShare-issued)

---

## Configuration Steps

### Step 1: Open Cursor Settings

1. Press `Cmd/Ctrl + ,` to open Settings
2. Or navigate to: **File** → **Preferences** → **Settings**

### Step 2: Navigate to Models Section

1. In the Settings panel, find **Models** in the left sidebar
2. Click to expand the Models settings

### Step 3: Configure API Key

1. Locate **OpenAI API Key** field
2. Enter your API key:
   - If using passthrough mode: Enter your OpenAI API key (`sk-...`)
   - If using gateway keys: Enter your ZeroShare API key (`zsk_...`)

### Step 4: Enable Base URL Override

1. Find **Override OpenAI Base URL** toggle
2. Turn it **ON**
3. Enter your ZeroShare Gateway URL:

```
https://your-gateway.company.com:8443/v1
```

### Step 5: Verify Configuration

1. Open a new file in Cursor
2. Try using AI features (Cmd/Ctrl + K for inline edit)
3. Check ZeroShare Gateway logs for the request

---

## Configuration via settings.json

You can also configure Cursor via the settings file:

```json
{
  "openai.apiKey": "sk-your-api-key-here",
  "openai.baseUrl": "https://your-gateway.company.com:8443/v1",
  "cursor.general.enableOpenAIOverride": true
}
```

**Location of settings.json:**
- **macOS**: `~/Library/Application Support/Cursor/User/settings.json`
- **Windows**: `%APPDATA%\Cursor\User\settings.json`
- **Linux**: `~/.config/Cursor/User/settings.json`

---

## Environment Variables (Alternative)

Cursor also respects environment variables. Add to your shell profile:

```bash
# ~/.bashrc or ~/.zshrc
export OPENAI_API_KEY="sk-your-api-key"
export OPENAI_API_BASE="https://your-gateway.company.com:8443/v1"
```

Then restart Cursor.

---

## Enterprise Deployment

For organization-wide deployment, use Cursor's enterprise configuration:

### MDM Configuration (macOS)

Create a configuration profile with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>openai.baseUrl</key>
    <string>https://ai-gateway.company.com:8443/v1</string>
    <key>cursor.general.enableOpenAIOverride</key>
    <true/>
</dict>
</plist>
```

### Group Policy (Windows)

Deploy via registry:

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Cursor]
"openai.baseUrl"="https://ai-gateway.company.com:8443/v1"
"cursor.general.enableOpenAIOverride"=dword:00000001
```

---

## Limitations

- **Tab Completion**: Custom base URLs currently work with chat models only. Tab completion continues using Cursor's built-in models and cannot be intercepted.
- **Cursor-Specific Features**: Some Cursor-specific features may bypass the custom endpoint.

---

## Verification

### Check Gateway Logs

```bash
# View recent requests through gateway
curl https://your-gateway.company.com:9090/api/v1/audit-logs?limit=10 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Test with Intentional PII

1. In Cursor, open a new file
2. Type: `// TODO: Contact john.doe@example.com about the project`
3. Use Cmd/Ctrl + K and ask AI to improve the comment
4. Check if the email was redacted in gateway logs

---

## Troubleshooting

### "Model not found" Error

**Cause**: The gateway URL path might be incorrect.

**Solution**: Ensure URL ends with `/v1`:
```
✅ https://gateway.company.com:8443/v1
❌ https://gateway.company.com:8443
❌ https://gateway.company.com:8443/v1/
```

### SSL Certificate Errors

**Cause**: Self-signed or corporate CA certificate not trusted.

**Solution**:
1. Add CA certificate to system trust store
2. Or set in Cursor settings: `"http.proxyStrictSSL": false` (not recommended for production)

### Requests Not Appearing in Gateway

**Cause**: Cursor might be caching or using fallback endpoints.

**Solution**:
1. Completely quit Cursor (check system tray)
2. Clear Cursor cache: Delete `~/.cursor/Cache`
3. Restart Cursor

---

## Support

If you encounter issues:
1. Check [ZeroShare Documentation](https://docs.deployzeroshare.com)
2. Open a [Support Case](https://deployzeroshare.com/support)
3. Include Cursor version, gateway version, and error messages
