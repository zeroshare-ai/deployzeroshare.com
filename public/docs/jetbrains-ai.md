# Configuring JetBrains AI with ZeroShare Gateway

This guide explains how to configure JetBrains AI Assistant to route requests through ZeroShare Gateway.

## Overview

JetBrains AI Assistant is integrated into IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs. It can be configured to use ZeroShare Gateway through proxy settings.

---

## Prerequisites

- JetBrains IDE (IntelliJ, PyCharm, WebStorm, etc.) version 2023.2+
- JetBrains AI Assistant plugin installed
- Active JetBrains AI subscription
- ZeroShare Gateway running and accessible

---

## Configuration Methods

### Method 1: IDE Proxy Settings

1. Open your JetBrains IDE
2. Go to **Settings/Preferences** (`Cmd/Ctrl + ,`)
3. Navigate to **Appearance & Behavior** → **System Settings** → **HTTP Proxy**
4. Select **Manual proxy configuration**
5. Configure:
   - **Host**: `your-gateway.company.com`
   - **Port**: `8443`
   - **Proxy type**: `HTTPS`
6. Click **Check connection** to verify
7. Click **OK** to save

### Method 2: JVM Options

Add proxy settings to JetBrains IDE JVM options:

**Location of vmoptions file:**
- **macOS**: `~/Library/Application Support/JetBrains/<IDE>/idea.vmoptions`
- **Linux**: `~/.config/JetBrains/<IDE>/idea.vmoptions`
- **Windows**: `%APPDATA%\JetBrains\<IDE>\idea.vmoptions`

Add these lines:

```
-Dhttps.proxyHost=gateway.company.com
-Dhttps.proxyPort=8443
-Dhttp.proxyHost=gateway.company.com
-Dhttp.proxyPort=8080
```

### Method 3: Environment Variables

Set before launching IDE:

```bash
# Linux/macOS
export HTTPS_PROXY="https://gateway.company.com:8443"
export HTTP_PROXY="http://gateway.company.com:8080"
export NO_PROXY="localhost,127.0.0.1"

# Launch IDE
/path/to/idea.sh
```

**Windows (PowerShell):**
```powershell
$env:HTTPS_PROXY = "https://gateway.company.com:8443"
$env:HTTP_PROXY = "http://gateway.company.com:8080"
& "C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe"
```

---

## TLS Certificate Configuration

### Add CA to JetBrains Truststore

1. Go to **Settings** → **Tools** → **Server Certificates**
2. Click **+** to add certificate
3. Import your gateway CA certificate
4. Check **Accept non-trusted certificates automatically** (for testing only)

### Add CA to Java Truststore

```bash
# Find JetBrains JRE
JETBRAINS_JRE="/path/to/jetbrains/jbr"

# Import CA certificate
$JETBRAINS_JRE/bin/keytool -import \
  -alias zeroshare-gateway \
  -file /path/to/gateway-ca.crt \
  -keystore $JETBRAINS_JRE/lib/security/cacerts \
  -storepass changeit
```

### JVM Option for Custom Truststore

```
-Djavax.net.ssl.trustStore=/path/to/custom-truststore.jks
-Djavax.net.ssl.trustStorePassword=password
```

---

## Proxy Authentication

If your gateway requires authentication:

### Method 1: IDE Settings

1. In **HTTP Proxy** settings
2. Check **Proxy authentication**
3. Enter username and password

### Method 2: JVM Options

```
-Dhttps.proxyUser=username
-Dhttps.proxyPassword=password
```

### Method 3: Proxy URL with Credentials

```bash
export HTTPS_PROXY="https://username:password@gateway.company.com:8443"
```

---

## Per-IDE Configuration

### IntelliJ IDEA

File location: `~/Library/Application Support/JetBrains/IntelliJIdea2024.1/idea.vmoptions`

### PyCharm

File location: `~/Library/Application Support/JetBrains/PyCharm2024.1/pycharm.vmoptions`

### WebStorm

File location: `~/Library/Application Support/JetBrains/WebStorm2024.1/webstorm.vmoptions`

### All IDEs (Toolbox App)

If using JetBrains Toolbox, configure via:
1. Open Toolbox
2. Click gear icon for your IDE
3. Go to **Configuration** → **Edit JVM options**

---

## Enterprise Deployment

### Silent Configuration

Create a properties file for deployment:

```properties
# idea.properties or equivalent
idea.http.proxy.host=gateway.company.com
idea.http.proxy.port=8443
idea.https.proxy.host=gateway.company.com
idea.https.proxy.port=8443
```

### MDM Deployment (macOS)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>JVMOptions</key>
    <array>
        <string>-Dhttps.proxyHost=gateway.company.com</string>
        <string>-Dhttps.proxyPort=8443</string>
    </array>
</dict>
</plist>
```

### Group Policy (Windows)

Deploy via registry or GPO to set environment variables system-wide.

---

## Verification

### Check Proxy is Active

1. Open IDE
2. Go to **Help** → **Diagnostic Tools** → **Debug Log Settings**
3. Add: `#com.intellij.util.net`
4. Restart IDE
5. Check logs for proxy connections

### Test AI Assistant

1. Open a code file
2. Use AI Assistant (press shortcut or select text)
3. Check ZeroShare Gateway logs for the request

### View Gateway Logs

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://gateway:9090/api/v1/audit-logs?limit=5" | jq
```

---

## What Gets Intercepted

| Feature | Intercepted | Notes |
|---------|-------------|-------|
| AI Chat | ✅ Yes | Main conversation |
| Code completion | ✅ Yes | Inline suggestions |
| Code explanation | ✅ Yes | "Explain code" feature |
| Code generation | ✅ Yes | Generate from prompt |
| Refactoring suggestions | ✅ Yes | AI-powered refactoring |
| Documentation generation | ✅ Yes | Generate docs |

---

## Troubleshooting

### AI Assistant Not Connecting

**Symptoms:** AI features don't work, timeout errors

**Solutions:**
1. Verify proxy settings in **Settings** → **HTTP Proxy**
2. Test proxy connection using **Check connection** button
3. Check firewall allows IDE to reach gateway
4. Verify gateway is running: `curl https://gateway:8443/health`

### Certificate Errors

**Symptoms:** SSL/TLS handshake failures

**Solutions:**
1. Import CA certificate to IDE truststore
2. Or add JVM option: `-Djavax.net.ssl.trustStore=/path/to/truststore`
3. For testing: `-Djavax.net.ssl.trustStoreType=Windows-ROOT` (Windows)

### Slow Performance

**Symptoms:** AI responses take long time

**Solutions:**
1. Check gateway latency
2. Increase timeout in IDE settings
3. Add JVM option: `-Dsun.net.client.defaultConnectTimeout=30000`

### Proxy Authentication Failing

**Symptoms:** 407 Proxy Authentication Required

**Solutions:**
1. Verify credentials in IDE proxy settings
2. Check username/password encoding for special characters
3. Try URL-encoded credentials in environment variable

### Some Requests Bypassing Proxy

**Symptoms:** Some AI features work without gateway logs

**Solutions:**
1. Ensure all proxy settings are configured (HTTP and HTTPS)
2. Check NO_PROXY doesn't include JetBrains domains
3. Configure both IDE settings AND JVM options

---

## Limitations

- **Cloud IDE features**: Code With Me may use direct connections
- **Plugin updates**: May bypass proxy for JetBrains servers
- **Telemetry**: Some analytics may not route through proxy

### Ensuring Complete Coverage

For maximum security:
1. Block direct access to JetBrains AI endpoints at firewall
2. Only allow outbound traffic through gateway
3. Configure DNS to resolve AI endpoints to gateway

---

## Support

- [JetBrains AI Assistant Docs](https://www.jetbrains.com/ai/)
- [ZeroShare Support](https://deployzeroshare.com/support)
