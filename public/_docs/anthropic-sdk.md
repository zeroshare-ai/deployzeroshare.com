# Configuring Anthropic SDK with ZeroShare Gateway

This guide explains how to configure the official Anthropic Python SDK to route Claude requests through ZeroShare Gateway.

## Overview

The Anthropic SDK supports custom base URLs, allowing you to route all Claude API requests through ZeroShare Gateway for automatic PII redaction and secrets blocking.

---

## Installation

```bash
pip install anthropic
```

---

## Basic Configuration

### Python SDK

```python
from anthropic import Anthropic

client = Anthropic(
    api_key="sk-ant-your-anthropic-key",
    base_url="https://your-gateway.company.com:8443"
)

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(message.content[0].text)
```

### Environment Variables

```bash
export ANTHROPIC_API_KEY="sk-ant-your-key"
export ANTHROPIC_BASE_URL="https://gateway.company.com:8443"
```

```python
from anthropic import Anthropic

# Automatically reads from environment
client = Anthropic()

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## Async Client

```python
from anthropic import AsyncAnthropic
import asyncio

client = AsyncAnthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

async def main():
    message = await client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello!"}]
    )
    print(message.content[0].text)

asyncio.run(main())
```

---

## Streaming Responses

```python
from anthropic import Anthropic

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

with client.messages.stream(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Async Streaming

```python
from anthropic import AsyncAnthropic
import asyncio

client = AsyncAnthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

async def main():
    async with client.messages.stream(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Tell me a story"}]
    ) as stream:
        async for text in stream.text_stream:
            print(text, end="", flush=True)

asyncio.run(main())
```

---

## Claude Models

All Claude models work through the gateway:

```python
# Claude 3 Opus (most capable)
client.messages.create(
    model="claude-3-opus-20240229",
    ...
)

# Claude 3 Sonnet (balanced)
client.messages.create(
    model="claude-3-sonnet-20240229",
    ...
)

# Claude 3 Haiku (fastest)
client.messages.create(
    model="claude-3-haiku-20240307",
    ...
)

# Claude 2.1
client.messages.create(
    model="claude-2.1",
    ...
)
```

---

## Advanced Features

### System Prompts

```python
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    system="You are a helpful coding assistant. Always provide secure, best-practice code examples.",
    messages=[
        {"role": "user", "content": "How do I handle passwords in Python?"}
    ]
)
```

### Multi-turn Conversations

```python
messages = [
    {"role": "user", "content": "What is Python?"},
    {"role": "assistant", "content": "Python is a high-level programming language..."},
    {"role": "user", "content": "Show me a simple example"}
]

response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=messages
)
```

### Vision (Image Input)

```python
import base64

# Read image
with open("image.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": image_data
                    }
                },
                {
                    "type": "text",
                    "text": "Describe this image"
                }
            ]
        }
    ]
)
```

### Tool Use (Function Calling)

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state"
                }
            },
            "required": ["location"]
        }
    }
]

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather in San Francisco?"}
    ]
)
```

---

## Custom HTTP Client

For corporate TLS certificates:

```python
import httpx
from anthropic import Anthropic

# Custom SSL context
http_client = httpx.Client(
    verify="/path/to/company-ca.crt",
    timeout=120.0
)

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443",
    http_client=http_client
)
```

---

## Framework Integration

### FastAPI

```python
from fastapi import FastAPI
from anthropic import Anthropic

app = FastAPI()

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

@app.post("/chat")
async def chat(message: str):
    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[{"role": "user", "content": message}]
    )
    return {"response": response.content[0].text}
```

### Flask

```python
from flask import Flask, request, jsonify
from anthropic import Anthropic

app = Flask(__name__)

client = Anthropic(
    base_url="https://gateway.company.com:8443"
)

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json.get("message")
    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[{"role": "user", "content": message}]
    )
    return jsonify({"response": response.content[0].text})
```

### LangChain Integration

```python
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-3-opus-20240229",
    anthropic_api_key="sk-ant-your-key",
    anthropic_api_url="https://gateway.company.com:8443"
)

response = llm.invoke("Hello, Claude!")
```

---

## Error Handling

```python
from anthropic import Anthropic, APIError, RateLimitError, APIConnectionError

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

try:
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello"}]
    )
except APIConnectionError as e:
    print(f"Gateway connection failed: {e}")
except RateLimitError as e:
    print(f"Rate limited: {e}")
except APIError as e:
    if e.status_code == 403:
        print(f"Request blocked by ZeroShare: {e.message}")
    else:
        raise
```

---

## Testing

### Verify Gateway Routing

```python
from anthropic import Anthropic

client = Anthropic(
    api_key="sk-ant-your-key",
    base_url="https://gateway.company.com:8443"
)

# Test with intentional PII
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Send reminder to john.doe@example.com about meeting"
    }]
)

# Check gateway logs - email should be redacted
```

### Unit Testing

```python
import pytest
from unittest.mock import Mock, patch

def test_anthropic_call():
    with patch('anthropic.Anthropic') as mock_anthropic:
        mock_client = Mock()
        mock_anthropic.return_value = mock_client
        
        mock_message = Mock()
        mock_message.content = [Mock(text="Hello!")]
        mock_client.messages.create.return_value = mock_message
        
        # Your test code here
```

---

## Troubleshooting

### "Connection refused"

```python
# Verify gateway is accessible
import requests
response = requests.get("https://gateway.company.com:8443/health")
print(response.json())
```

### SSL Certificate Errors

```python
# Option 1: Environment variable
import os
os.environ['SSL_CERT_FILE'] = '/path/to/ca-bundle.crt'

# Option 2: Custom httpx client
import httpx
client = Anthropic(
    http_client=httpx.Client(verify="/path/to/ca.crt")
)
```

### Request Blocked (403)

ZeroShare detected sensitive data:

```python
try:
    message = client.messages.create(...)
except APIError as e:
    if e.status_code == 403:
        # Review request content for PII/secrets
        print("Sensitive data detected - sanitize input")
```

### Rate Limiting

```python
import time
from anthropic import RateLimitError

def call_with_retry(client, **kwargs):
    max_retries = 3
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise
```

---

## Support

- [Anthropic Python SDK](https://github.com/anthropics/anthropic-sdk-python)
- [Claude API Docs](https://docs.anthropic.com/)
- [ZeroShare Support](https://deployzeroshare.com/support)
