# System-Wide Proxy Configuration

This guide explains how to configure ZeroShare Gateway as a system-wide proxy to intercept all AI traffic from any application.

## Overview

System-wide proxy configuration ensures that all applications—including those without explicit proxy support—route traffic through ZeroShare Gateway. This provides comprehensive protection across your entire environment.

---

## Configuration by Operating System

### macOS

#### Method 1: System Preferences (GUI)

1. Open **System Settings** (or System Preferences on older macOS)
2. Go to **Network**
3. Select your active network connection
4. Click **Details** (or **Advanced**)
5. Go to **Proxies** tab
6. Enable **Secure Web Proxy (HTTPS)**
7. Enter:
   - **Server**: `gateway.company.com`
   - **Port**: `8443`
8. Enable **Web Proxy (HTTP)** with same settings for port `8080`
9. Click **OK** and **Apply**

#### Method 2: Command Line

```bash
# Set HTTPS proxy
networksetup -setsecurewebproxy "Wi-Fi" gateway.company.com 8443

# Set HTTP proxy
networksetup -setwebproxy "Wi-Fi" gateway.company.com 8080

# Enable proxies
networksetup -setsecurewebproxystate "Wi-Fi" on
networksetup -setwebproxystate "Wi-Fi" on

# Set bypass domains
networksetup -setproxybypassdomains "Wi-Fi" "localhost" "127.0.0.1" "*.local"
```

#### Method 3: PAC File

Create a PAC file for granular control:

```javascript
// proxy.pac
function FindProxyForURL(url, host) {
    // AI service endpoints - route through gateway
    if (shExpMatch(host, "*.openai.com") ||
        shExpMatch(host, "*.anthropic.com") ||
        shExpMatch(host, "*.github.com") ||
        shExpMatch(host, "api.openai.com") ||
        shExpMatch(host, "api.anthropic.com")) {
        return "HTTPS gateway.company.com:8443";
    }
    
    // Local addresses - direct connection
    if (isPlainHostName(host) ||
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "192.168.*")) {
        return "DIRECT";
    }
    
    // Everything else - direct (or through gateway for full coverage)
    return "DIRECT";
}
```

Configure in System Settings:
1. Go to **Network** → **Proxies**
2. Enable **Automatic Proxy Configuration**
3. Enter URL: `file:///path/to/proxy.pac` or `https://config.company.com/proxy.pac`

---

### Linux

#### Method 1: Environment Variables

Add to `/etc/environment` for system-wide:

```bash
HTTP_PROXY="http://gateway.company.com:8080"
HTTPS_PROXY="https://gateway.company.com:8443"
http_proxy="http://gateway.company.com:8080"
https_proxy="https://gateway.company.com:8443"
NO_PROXY="localhost,127.0.0.1,.local"
no_proxy="localhost,127.0.0.1,.local"
```

Or add to `/etc/profile.d/proxy.sh`:

```bash
#!/bin/bash
export HTTP_PROXY="http://gateway.company.com:8080"
export HTTPS_PROXY="https://gateway.company.com:8443"
export NO_PROXY="localhost,127.0.0.1"
```

#### Method 2: GNOME (Ubuntu/Fedora)

```bash
# Command line
gsettings set org.gnome.system.proxy mode 'manual'
gsettings set org.gnome.system.proxy.https host 'gateway.company.com'
gsettings set org.gnome.system.proxy.https port 8443
gsettings set org.gnome.system.proxy.http host 'gateway.company.com'
gsettings set org.gnome.system.proxy.http port 8080
gsettings set org.gnome.system.proxy ignore-hosts "['localhost', '127.0.0.1']"
```

Or via GUI:
1. Open **Settings** → **Network**
2. Click **Network Proxy**
3. Select **Manual**
4. Enter proxy details

#### Method 3: KDE (Kubuntu)

1. Open **System Settings** → **Network Settings**
2. Go to **Proxy**
3. Select **Use manually specified proxy configuration**
4. Enter gateway details

#### Method 4: Transparent Proxy (iptables)

For complete traffic interception:

```bash
# Redirect all HTTPS traffic to gateway
iptables -t nat -A OUTPUT -p tcp --dport 443 -j REDIRECT --to-port 8443

# Except for gateway itself
iptables -t nat -I OUTPUT -p tcp -d gateway.company.com -j ACCEPT
```

---

### Windows

#### Method 1: Settings GUI

1. Open **Settings** → **Network & Internet**
2. Go to **Proxy**
3. Under **Manual proxy setup**, enable **Use a proxy server**
4. Enter:
   - **Address**: `gateway.company.com`
   - **Port**: `8443`
5. Add exceptions: `localhost;127.0.0.1;*.local`
6. Click **Save**

#### Method 2: Command Line

```cmd
:: Set proxy
netsh winhttp set proxy gateway.company.com:8443 "localhost;127.0.0.1"

:: View current proxy
netsh winhttp show proxy

:: Reset proxy
netsh winhttp reset proxy
```

#### Method 3: PowerShell

```powershell
# Set system proxy
$proxyServer = "gateway.company.com:8443"
$bypassList = "localhost;127.0.0.1;*.local"

Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -Name ProxyServer -Value $proxyServer
Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -Name ProxyEnable -Value 1
Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -Name ProxyOverride -Value $bypassList

# Refresh settings
[System.Net.WebRequest]::DefaultWebProxy = New-Object System.Net.WebProxy($proxyServer)
```

#### Method 4: Group Policy

For enterprise deployment:

1. Open **Group Policy Management**
2. Navigate to **User Configuration** → **Preferences** → **Windows Settings** → **Registry**
3. Add registry entries for:
   - `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ProxyServer`
   - `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ProxyEnable`

---

## TLS Certificate Installation

### macOS

```bash
# Add CA to system keychain
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain gateway-ca.crt
```

### Linux

```bash
# Ubuntu/Debian
sudo cp gateway-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates

# RHEL/CentOS
sudo cp gateway-ca.crt /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust

# Fedora
sudo cp gateway-ca.crt /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust extract
```

### Windows

```powershell
# Import to trusted root
Import-Certificate -FilePath gateway-ca.crt -CertStoreLocation Cert:\LocalMachine\Root
```

Or via GUI:
1. Double-click certificate file
2. Click **Install Certificate**
3. Select **Local Machine**
4. Choose **Place all certificates in the following store**
5. Select **Trusted Root Certification Authorities**
6. Finish wizard

---

## Docker Configuration

### Docker Desktop

1. Open Docker Desktop Settings
2. Go to **Resources** → **Proxies**
3. Enable **Manual proxy configuration**
4. Enter HTTP and HTTPS proxy URLs
5. Apply & Restart

### Docker Daemon

Edit `/etc/docker/daemon.json`:

```json
{
  "proxies": {
    "http-proxy": "http://gateway.company.com:8080",
    "https-proxy": "https://gateway.company.com:8443",
    "no-proxy": "localhost,127.0.0.1"
  }
}
```

Restart Docker:
```bash
sudo systemctl restart docker
```

### Docker Build

```bash
docker build \
  --build-arg HTTP_PROXY=http://gateway.company.com:8080 \
  --build-arg HTTPS_PROXY=https://gateway.company.com:8443 \
  -t myimage .
```

---

## Kubernetes Configuration

### Pod-Level Proxy

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ai-app
spec:
  containers:
  - name: app
    image: myapp
    env:
    - name: HTTP_PROXY
      value: "http://gateway.company.com:8080"
    - name: HTTPS_PROXY
      value: "https://gateway.company.com:8443"
    - name: NO_PROXY
      value: "localhost,127.0.0.1,.cluster.local"
```

### Cluster-Wide (Istio)

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: ai-apis
spec:
  hosts:
  - api.openai.com
  - api.anthropic.com
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  resolution: DNS
  location: MESH_EXTERNAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: ai-apis-proxy
spec:
  host: "*.openai.com"
  trafficPolicy:
    connectionPool:
      http:
        http1MaxPendingRequests: 100
```

---

## Verification

### Test Proxy Configuration

```bash
# Test HTTPS proxy
curl -x https://gateway.company.com:8443 https://api.openai.com/v1/models

# Test with verbose output
curl -v -x https://gateway.company.com:8443 https://httpbin.org/ip

# Check environment variables
env | grep -i proxy
```

### Verify Traffic Routing

```bash
# Monitor gateway logs
curl -H "Authorization: Bearer $TOKEN" \
  "https://gateway:9090/api/v1/audit-logs?limit=10" | jq
```

---

## Troubleshooting

### Some Apps Not Using Proxy

**Cause:** Application uses its own network stack

**Solutions:**
- Configure app-specific proxy settings
- Use transparent proxy (iptables/firewall)
- Use network-level interception

### Certificate Errors

**Cause:** CA not trusted by application

**Solutions:**
- Install CA to system trust store
- Configure app-specific certificate trust
- Use environment variables: `SSL_CERT_FILE`, `NODE_EXTRA_CA_CERTS`

### Proxy Bypass

**Cause:** NO_PROXY set incorrectly

**Solutions:**
- Review NO_PROXY/no_proxy settings
- Ensure AI domains not in bypass list

---

## Security Considerations

### Bypass Prevention

1. **Firewall rules**: Block direct connections to AI APIs
2. **DNS**: Resolve AI domains to gateway IP
3. **Network segmentation**: Route AI traffic through proxy subnet

### Monitoring

1. Monitor for proxy bypass attempts
2. Alert on direct connections to AI endpoints
3. Regular audit of proxy configuration

---

## Support

- [ZeroShare Documentation](https://docs.deployzeroshare.com)
- [Support Portal](https://deployzeroshare.com/support)
