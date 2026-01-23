# Configuring LiteLLM with ZeroShare Gateway

This guide explains how to configure LiteLLM to route all LLM requests through ZeroShare Gateway.

## Overview

LiteLLM is a unified interface for 100+ LLM providers. It can be configured to route all requests through ZeroShare Gateway, providing a single point of security control for multi-provider deployments.

---

## Installation

```bash
pip install litellm
```

---

## Basic Configuration

### Direct API Calls

```python
import litellm

# Set global API base
litellm.api_base = "https://gateway.company.com:8443/v1"

# OpenAI models
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Anthropic models (with different base)
response = litellm.completion(
    model="claude-3-opus-20240229",
    messages=[{"role": "user", "content": "Hello!"}],
    api_base="https://gateway.company.com:8443"
)
```

### Environment Variables

```bash
export OPENAI_API_KEY="sk-your-key"
export OPENAI_API_BASE="https://gateway.company.com:8443/v1"

export ANTHROPIC_API_KEY="sk-ant-your-key"
export ANTHROPIC_API_BASE="https://gateway.company.com:8443"
```

```python
import litellm

# Uses environment variables automatically
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## LiteLLM Proxy Server

LiteLLM can run as a proxy server, which can then route through ZeroShare Gateway.

### Configuration File

Create `litellm_config.yaml`:

```yaml
model_list:
  - model_name: gpt-4
    litellm_params:
      model: gpt-4
      api_key: sk-your-key
      api_base: https://gateway.company.com:8443/v1
      
  - model_name: gpt-3.5-turbo
    litellm_params:
      model: gpt-3.5-turbo
      api_key: sk-your-key
      api_base: https://gateway.company.com:8443/v1
      
  - model_name: claude-3-opus
    litellm_params:
      model: claude-3-opus-20240229
      api_key: sk-ant-your-key
      api_base: https://gateway.company.com:8443
      
  - model_name: claude-3-sonnet
    litellm_params:
      model: claude-3-sonnet-20240229
      api_key: sk-ant-your-key
      api_base: https://gateway.company.com:8443

general_settings:
  master_key: sk-litellm-master-key

litellm_settings:
  drop_params: true
  set_verbose: false
```

### Start LiteLLM Proxy

```bash
litellm --config litellm_config.yaml --port 4000
```

### Use LiteLLM Proxy

```python
import openai

client = openai.OpenAI(
    api_key="sk-litellm-master-key",
    base_url="http://localhost:4000/v1"
)

response = client.chat.completions.create(
    model="gpt-4",  # Uses model_name from config
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## Multi-Provider Configuration

### All Providers Through Gateway

```python
import litellm
import os

# Configure all providers to use gateway
os.environ["OPENAI_API_BASE"] = "https://gateway.company.com:8443/v1"
os.environ["ANTHROPIC_API_BASE"] = "https://gateway.company.com:8443"
os.environ["AZURE_API_BASE"] = "https://gateway.company.com:8443"

# Now all calls go through gateway
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

response = litellm.completion(
    model="claude-3-opus-20240229",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Per-Call Override

```python
import litellm

# Override for specific call
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}],
    api_base="https://gateway.company.com:8443/v1"
)
```

---

## Router Configuration

Use LiteLLM's router for load balancing and fallbacks:

```python
from litellm import Router

router = Router(
    model_list=[
        {
            "model_name": "gpt-4",
            "litellm_params": {
                "model": "gpt-4",
                "api_key": "sk-key-1",
                "api_base": "https://gateway.company.com:8443/v1"
            }
        },
        {
            "model_name": "gpt-4",  # Same name = load balancing
            "litellm_params": {
                "model": "gpt-4",
                "api_key": "sk-key-2",
                "api_base": "https://gateway.company.com:8443/v1"
            }
        },
        {
            "model_name": "claude-fallback",
            "litellm_params": {
                "model": "claude-3-opus-20240229",
                "api_key": "sk-ant-key",
                "api_base": "https://gateway.company.com:8443"
            }
        }
    ],
    fallbacks=[
        {"gpt-4": ["claude-fallback"]}
    ]
)

response = router.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## Streaming

```python
import litellm

litellm.api_base = "https://gateway.company.com:8443/v1"

response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Async Streaming

```python
import litellm
import asyncio

async def stream_response():
    response = await litellm.acompletion(
        model="gpt-4",
        messages=[{"role": "user", "content": "Tell me a story"}],
        stream=True,
        api_base="https://gateway.company.com:8443/v1"
    )
    
    async for chunk in response:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)

asyncio.run(stream_response())
```

---

## Embeddings

```python
import litellm

response = litellm.embedding(
    model="text-embedding-ada-002",
    input=["Hello world", "How are you?"],
    api_base="https://gateway.company.com:8443/v1"
)

print(response.data[0].embedding[:5])  # First 5 dimensions
```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.11-slim

RUN pip install litellm

COPY litellm_config.yaml /app/config.yaml

WORKDIR /app

EXPOSE 4000

CMD ["litellm", "--config", "config.yaml", "--port", "4000"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  litellm:
    build: .
    ports:
      - "4000:4000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    volumes:
      - ./litellm_config.yaml:/app/config.yaml
```

---

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: litellm-proxy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: litellm
  template:
    metadata:
      labels:
        app: litellm
    spec:
      containers:
      - name: litellm
        image: ghcr.io/berriai/litellm:main-latest
        ports:
        - containerPort: 4000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: llm-secrets
              key: openai-key
        - name: OPENAI_API_BASE
          value: "https://gateway.company.com:8443/v1"
        volumeMounts:
        - name: config
          mountPath: /app/config.yaml
          subPath: config.yaml
      volumes:
      - name: config
        configMap:
          name: litellm-config
```

---

## Caching

LiteLLM supports caching, which still routes through the gateway:

```python
import litellm
from litellm import Cache

# Enable Redis caching
litellm.cache = Cache(
    type="redis",
    host="localhost",
    port=6379
)

# Requests still go through gateway, but responses are cached
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}],
    api_base="https://gateway.company.com:8443/v1",
    caching=True
)
```

---

## Callbacks and Logging

```python
import litellm
from litellm.integrations.custom_logger import CustomLogger

class SecurityLogger(CustomLogger):
    def log_success_event(self, kwargs, response_obj, start_time, end_time):
        print(f"Request to {kwargs.get('api_base')} succeeded")
        
    def log_failure_event(self, kwargs, response_obj, start_time, end_time):
        print(f"Request failed: {response_obj}")

litellm.callbacks = [SecurityLogger()]

response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}],
    api_base="https://gateway.company.com:8443/v1"
)
```

---

## Error Handling

```python
import litellm
from litellm.exceptions import (
    AuthenticationError,
    RateLimitError,
    ServiceUnavailableError
)

try:
    response = litellm.completion(
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello!"}],
        api_base="https://gateway.company.com:8443/v1"
    )
except RateLimitError:
    print("Rate limited - retry later")
except AuthenticationError:
    print("Invalid API key")
except ServiceUnavailableError:
    print("Gateway unavailable")
except Exception as e:
    if "403" in str(e):
        print("Request blocked by ZeroShare")
    raise
```

---

## Testing

```python
import litellm

# Test gateway connection
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Say 'Gateway works!'"}],
    api_base="https://gateway.company.com:8443/v1"
)

print(response.choices[0].message.content)

# Test PII detection
response = litellm.completion(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": "Help me email john.doe@example.com"
    }],
    api_base="https://gateway.company.com:8443/v1"
)
# Check gateway logs for redaction
```

---

## Support

- [LiteLLM Documentation](https://docs.litellm.ai/)
- [ZeroShare Support](https://deployzeroshare.com/support)
