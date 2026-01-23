# Configuring GitHub Copilot with ZeroShare Gateway

This guide explains how to route GitHub Copilot traffic through ZeroShare Gateway for automatic PII redaction and secrets blocking.

## Overview

GitHub Copilot can be configured to use ZeroShare Gateway through VS Code's proxy settings. This intercepts all Copilot requests for security scanning before they reach GitHub's servers.

---

## Prerequisites

- VS Code with GitHub Copilot extension installed
- Active GitHub Copilot subscription
- ZeroShare Gateway running and accessible
- TLS certificate trusted by your system

---

## Configuration Methods

### Method 1: VS Code Settings (Recommended)

1. Open VS Code Settings (`Cmd/Ctrl + ,`)
2. Search for "proxy"
3. Configure the following settings:

```json
{
  "http.proxy": "https://your-gateway.company.com:8443",
  "http.proxyStrictSSL": true,
  "http.proxySupport": "on"
}
```

Or edit `settings.json` directly:

**Location:**
- macOS: `~/Library/Application Support/Code/User/settings.json`
- Windows: `%APPDATA%\Code\User\settings.json`
- Linux: `~/.config/Code/User/settings.json`

### Method 2: Environment Variables

Set system-wide proxy environment variables before launching VS Code:

```bash
# Add to ~/.bashrc, ~/.zshrc, or ~/.profile
export HTTP_PROXY="http://your-gateway.company.com:8080"
export HTTPS_PROXY="https://your-gateway.company.com:8443"
export NO_PROXY="localhost,127.0.0.1"
```

Then restart VS Code:
```bash
source ~/.bashrc
code .
```

### Method 3: Launch with Proxy (Per-Session)

```bash
# macOS/Linux
HTTPS_PROXY="https://your-gateway.company.com:8443" code .

# Windows PowerShell
$env:HTTPS_PROXY="https://your-gateway.company.com:8443"; code .
```

---

## Enterprise Deployment

### MDM Configuration (macOS)

Deploy proxy settings via configuration profile:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>http.proxy</key>
    <string>https://ai-gateway.company.com:8443</string>
    <key>http.proxyStrictSSL</key>
    <true/>
    <key>http.proxySupport</key>
    <string>on</string>
</dict>
</plist>
```

### Group Policy (Windows)

Deploy via registry:

```reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Policies\Microsoft\VisualStudioCode]
"http.proxy"="https://ai-gateway.company.com:8443"
"http.proxySupport"="on"
```

### System-Wide Proxy (Linux)

Configure system proxy in `/etc/environment`:

```bash
HTTP_PROXY="http://gateway.company.com:8080"
HTTPS_PROXY="https://gateway.company.com:8443"
NO_PROXY="localhost,127.0.0.1,.company.com"
```

---

## TLS Certificate Setup

GitHub Copilot requires trusted TLS certificates. For corporate or self-signed CAs:

### Add CA to System Trust Store

**macOS:**
```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain /path/to/gateway-ca.crt
```

**Linux (Ubuntu/Debian):**
```bash
sudo cp gateway-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

**Windows:**
```powershell
Import-Certificate -FilePath gateway-ca.crt -CertStoreLocation Cert:\LocalMachine\Root
```

### VS Code Certificate Settings

If you can't modify system trust store:

```json
{
  "http.proxyStrictSSL": false
}
```

> **Warning:** Disabling SSL verification is not recommended for production.

---

## Verification

### Check Proxy is Active

1. Open VS Code Command Palette (`Cmd/Ctrl + Shift + P`)
2. Run "Developer: Show Running Extensions"
3. Look for "GitHub Copilot" - it should show as active

### Test with Intentional PII

1. Create a new file
2. Type a comment with test PII:
   ```python
   # Contact customer john.doe@example.com about order #12345
   ```
3. Trigger Copilot suggestion
4. Check ZeroShare Gateway logs for the redacted request

### View Gateway Logs

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "https://gateway:9090/api/v1/audit-logs?limit=5" | jq
```

---

## What Gets Intercepted

| Copilot Feature | Intercepted | Notes |
|-----------------|-------------|-------|
| Code completions | ✅ Yes | Main suggestion engine |
| Copilot Chat | ✅ Yes | Conversational AI |
| Code explanations | ✅ Yes | "Explain this code" |
| Test generation | ✅ Yes | "Generate tests" |
| Documentation | ✅ Yes | Docstring generation |

---

## Limitations

### Features That May Bypass Proxy

- **Copilot Voice**: May use direct connections
- **Background telemetry**: Some analytics may bypass proxy

### Ensuring Complete Coverage

For maximum security, combine with:
1. DNS-level blocking of direct GitHub Copilot endpoints
2. Firewall rules allowing only gateway egress
3. Network policies in Kubernetes environments

---

## Troubleshooting

### Copilot Not Activating

**Symptom:** Copilot shows as inactive or errors on startup

**Solutions:**
1. Verify proxy URL is correct
2. Check TLS certificate is trusted
3. Ensure gateway allows GitHub Copilot endpoints:
   ```
   copilot-proxy.githubusercontent.com
   api.github.com
   ```

### Slow Completions

**Symptom:** Suggestions take longer than usual

**Solutions:**
1. Check gateway latency: `curl -w "%{time_total}" https://gateway:8443/health`
2. Verify connection pooling is enabled
3. Check gateway resource utilization

### "Unable to Connect" Errors

**Symptom:** VS Code shows connection errors for Copilot

**Solutions:**
1. Test gateway connectivity:
   ```bash
   curl -x https://gateway:8443 https://api.github.com
   ```
2. Check firewall allows outbound on port 8443
3. Verify VS Code proxy settings are applied (restart VS Code)

### Authentication Failures

**Symptom:** GitHub authentication fails through proxy

**Solutions:**
1. Add GitHub domains to NO_PROXY:
   ```json
   {
     "http.proxyBypassList": ["github.com", "*.github.com"]
   }
   ```
   Then configure gateway to intercept only Copilot traffic.

---

## Support

- [ZeroShare Documentation](https://docs.deployzeroshare.com)
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [Support Portal](https://deployzeroshare.com/support)
