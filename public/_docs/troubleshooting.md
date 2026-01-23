# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with ZeroShare Gateway.

## Quick Diagnostics

Before diving into specific issues, run these basic checks:

```bash
# 1. Check if gateway is running
curl -s https://your-gateway:9090/api/v1/health | jq

# 2. Check proxy endpoint
curl -s -o /dev/null -w "%{http_code}" https://your-gateway:8443/health

# 3. Check logs
docker-compose logs gateway --tail=100

# 4. Check resource usage
docker stats zeroshare-gateway
```

---

## Connection Issues

### Gateway Not Responding

**Symptoms:**
- `Connection refused` errors
- Timeouts when connecting to gateway
- Services can't reach the proxy

**Solutions:**

1. **Verify the gateway is running:**
```bash
docker-compose ps
# or
kubectl get pods -n zeroshare
```

2. **Check port bindings:**
```bash
netstat -tlnp | grep -E '8080|8443|9090|3000'
```

3. **Verify firewall rules:**
```bash
# Allow gateway ports
sudo ufw allow 8443/tcp
sudo ufw allow 9090/tcp
```

4. **Check container logs for startup errors:**
```bash
docker-compose logs gateway | head -50
```

### TLS Certificate Errors

**Symptoms:**
- `unable to verify the first certificate`
- `certificate signed by unknown authority`
- `SSL_ERROR_BAD_CERT_DOMAIN`

**Solutions:**

1. **Add CA certificate to system trust store:**

**macOS:**
```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain /path/to/gateway-ca.crt
```

**Linux:**
```bash
sudo cp gateway-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

2. **Set environment variables for specific tools:**
```bash
export SSL_CERT_FILE="/path/to/ca-bundle.crt"
export NODE_EXTRA_CA_CERTS="/path/to/gateway-ca.crt"
```

3. **Verify certificate chain:**
```bash
openssl s_client -connect gateway:8443 -showcerts
```

### Proxy Authentication Failed

**Symptoms:**
- `401 Unauthorized` errors
- `403 Forbidden` responses
- `Proxy authentication required`

**Solutions:**

1. **Verify API key is correct:**
```bash
# Test with curl
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://gateway:9090/api/v1/health
```

2. **Check if API key has correct permissions:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://gateway:9090/api/v1/users/me
```

3. **Regenerate API key if corrupted:**
```bash
curl -X POST -H "Authorization: Bearer ADMIN_TOKEN" \
  https://gateway:9090/api/v1/users/YOUR_USER_ID/regenerate-key
```

---

## Detection Issues

### False Positives

**Symptoms:**
- Legitimate data being blocked or redacted
- Too many warnings for non-sensitive content
- Business operations disrupted by overly aggressive detection

**Solutions:**

1. **Review detection rules:**
```bash
curl -H "Authorization: Bearer TOKEN" \
  https://gateway:9090/api/v1/rules | jq
```

2. **Add exception patterns:**
```bash
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://gateway:9090/api/v1/rules \
  -d '{
    "name": "allow_test_emails",
    "type": "exception",
    "pattern": ".*@example\\.com$",
    "action": "allow"
  }'
```

3. **Adjust sensitivity:**
Update `config.yaml`:
```yaml
detection:
  pii:
    sensitivity: medium  # low, medium, high
```

### Missing Detections

**Symptoms:**
- Known sensitive data not being detected
- PII or secrets passing through undetected
- Audit logs not showing expected findings

**Solutions:**

1. **Verify detection is enabled:**
```bash
curl -H "Authorization: Bearer TOKEN" \
  https://gateway:9090/api/v1/config | jq '.detection'
```

2. **Test detection patterns:**
```bash
# Use the test endpoint
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://gateway:9090/api/v1/detection/test \
  -d '{"content": "My SSN is 123-45-6789"}'
```

3. **Add custom patterns:**
```yaml
detection:
  pii:
    custom_patterns:
      - name: internal_id
        regex: 'INT-\d{8}'
        action: redact
```

### Requests Not Being Intercepted

**Symptoms:**
- AI tools working but requests not appearing in gateway logs
- Detection not triggering despite sensitive data
- Audit logs empty

**Solutions:**

1. **Verify traffic is routing through gateway:**
```bash
# Check if request reaches gateway
curl -v -x https://gateway:8443 https://api.openai.com/v1/models
```

2. **Check client proxy configuration:**
```bash
# Verify environment variables
echo $HTTPS_PROXY
echo $OPENAI_API_BASE
```

3. **Restart client application** to pick up new proxy settings

4. **Check for NO_PROXY overrides:**
```bash
echo $NO_PROXY  # Should not include AI service domains
```

---

## Performance Issues

### High Latency

**Symptoms:**
- AI responses taking longer than expected
- Timeout errors
- Slow request processing

**Solutions:**

1. **Check gateway metrics:**
```bash
curl https://gateway:9090/api/v1/metrics | grep latency
```

2. **Verify resource allocation:**
```yaml
# docker-compose.yml
services:
  gateway:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2'
```

3. **Enable connection pooling:**
```yaml
# config.yaml
upstream:
  openai:
    connection_pool_size: 100
    keep_alive: true
```

4. **Check network latency to upstream:**
```bash
ping api.openai.com
curl -o /dev/null -s -w 'Total: %{time_total}s\n' https://api.openai.com/v1/models
```

### High Memory Usage

**Symptoms:**
- Container being OOM killed
- Slow response times
- Memory warnings in logs

**Solutions:**

1. **Increase memory limits:**
```yaml
# docker-compose.yml
services:
  gateway:
    deploy:
      resources:
        limits:
          memory: 4G
```

2. **Enable streaming mode** for large payloads:
```yaml
# config.yaml
proxy:
  streaming:
    enabled: true
    buffer_size: 64KB
```

3. **Reduce audit log retention:**
```yaml
logging:
  audit:
    retention_days: 30  # Reduce from 90
```

### Connection Pool Exhaustion

**Symptoms:**
- `too many open connections` errors
- Requests failing under load
- Intermittent timeouts

**Solutions:**

1. **Increase connection pool size:**
```yaml
upstream:
  openai:
    connection_pool_size: 200
    max_idle_connections: 50
```

2. **Check for connection leaks:**
```bash
netstat -an | grep 8443 | wc -l
```

3. **Enable connection reuse:**
```yaml
proxy:
  keep_alive:
    enabled: true
    timeout: 30s
```

---

## Database Issues

### PostgreSQL Connection Failed

**Symptoms:**
- `connection refused` to database
- `FATAL: password authentication failed`
- Gateway won't start

**Solutions:**

1. **Verify database is running:**
```bash
docker-compose ps postgres
```

2. **Check connection string:**
```bash
echo $DATABASE_URL
# Format: postgres://user:password@host:5432/database
```

3. **Test database connection:**
```bash
psql $DATABASE_URL -c "SELECT 1"
```

4. **Check database logs:**
```bash
docker-compose logs postgres
```

### Redis Connection Failed

**Symptoms:**
- `Connection refused` to Redis
- Cache misses increasing
- Slow performance without cache

**Solutions:**

1. **Verify Redis is running:**
```bash
docker-compose ps redis
redis-cli -h localhost ping
```

2. **Check Redis memory:**
```bash
redis-cli info memory
```

3. **Gateway can operate without Redis** (optional component):
```yaml
# config.yaml
cache:
  enabled: false  # Disable if Redis unavailable
```

---

## Client-Specific Issues

### Cursor IDE Not Using Gateway

See the full [Cursor Configuration Guide](./cursor.md).

**Quick fixes:**
1. Ensure "Override OpenAI Base URL" is enabled
2. Verify URL ends with `/v1`
3. Restart Cursor completely

### Claude Code CLI Not Routing Through Proxy

See the full [Claude Code Configuration Guide](./claude-code.md).

**Quick fixes:**
1. Set `HTTPS_PROXY` environment variable
2. Reload shell: `source ~/.bashrc`
3. Verify with: `echo $HTTPS_PROXY`

---

## Logging and Debugging

### Enable Debug Logging

```yaml
# config.yaml
logging:
  level: debug
```

Or via environment variable:
```bash
export LOG_LEVEL=debug
docker-compose restart gateway
```

### View Real-time Logs

```bash
# Docker
docker-compose logs -f gateway

# Kubernetes
kubectl logs -f deployment/zeroshare-gateway -n zeroshare
```

### Export Logs for Support

```bash
# Collect logs from last 24 hours
docker-compose logs --since 24h gateway > gateway-logs.txt

# Include system info
docker-compose ps >> gateway-logs.txt
docker stats --no-stream >> gateway-logs.txt
```

---

## Getting Help

If you can't resolve your issue:

1. **Check the FAQ** on our website
2. **Search existing issues** in our support portal
3. **Open a support ticket** with:
   - Gateway version
   - Error messages
   - Steps to reproduce
   - Relevant logs (sanitized of secrets)

**Contact:**
- Email: support@deployzeroshare.com
- Portal: [https://deployzeroshare.com/support](https://deployzeroshare.com/support)
