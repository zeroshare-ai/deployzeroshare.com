# Configuring OpenAI SDK with ZeroShare Gateway

This guide explains how to configure the official OpenAI Python and Node.js SDKs to route requests through ZeroShare Gateway.

## Overview

The OpenAI SDK supports custom base URLs, making it straightforward to route all API requests through ZeroShare Gateway for PII redaction and secrets blocking.

---

## Python SDK

### Installation

```bash
pip install openai
```

### Basic Configuration

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-openai-key",
    base_url="https://your-gateway.company.com:8443/v1"
)

# All requests now route through ZeroShare Gateway
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello, how can you help me?"}
    ]
)

print(response.choices[0].message.content)
```

### Environment Variables

```bash
# Set in your environment
export OPENAI_API_KEY="sk-your-key"
export OPENAI_BASE_URL="https://gateway.company.com:8443/v1"
```

```python
from openai import OpenAI

# SDK automatically reads from environment
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Async Client

```python
from openai import AsyncOpenAI
import asyncio

client = AsyncOpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1"
)

async def main():
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello!"}]
    )
    print(response.choices[0].message.content)

asyncio.run(main())
```

### Streaming Responses

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1"
)

stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### All API Endpoints

The gateway supports all OpenAI endpoints:

```python
# Chat Completions
response = client.chat.completions.create(...)

# Completions (legacy)
response = client.completions.create(...)

# Embeddings
response = client.embeddings.create(
    model="text-embedding-ada-002",
    input="Hello world"
)

# Images
response = client.images.generate(
    prompt="A sunset over mountains",
    n=1,
    size="1024x1024"
)

# Audio
response = client.audio.transcriptions.create(
    model="whisper-1",
    file=open("audio.mp3", "rb")
)

# Files
response = client.files.create(
    file=open("data.jsonl", "rb"),
    purpose="fine-tune"
)

# Fine-tuning
response = client.fine_tuning.jobs.create(
    training_file="file-abc123",
    model="gpt-3.5-turbo"
)
```

### Custom HTTP Client

For advanced TLS configuration:

```python
import httpx
from openai import OpenAI

# Custom SSL context
http_client = httpx.Client(
    verify="/path/to/company-ca.crt",
    timeout=120.0
)

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1",
    http_client=http_client
)
```

---

## Node.js SDK

### Installation

```bash
npm install openai
```

### Basic Configuration

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'sk-your-key',
    baseURL: 'https://gateway.company.com:8443/v1'
});

async function main() {
    const response = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Hello!' }]
    });
    
    console.log(response.choices[0].message.content);
}

main();
```

### Environment Variables

```bash
export OPENAI_API_KEY="sk-your-key"
export OPENAI_BASE_URL="https://gateway.company.com:8443/v1"
```

```javascript
import OpenAI from 'openai';

// Automatically reads from environment
const client = new OpenAI();
```

### Streaming in Node.js

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'sk-your-key',
    baseURL: 'https://gateway.company.com:8443/v1'
});

async function main() {
    const stream = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Tell me a story' }],
        stream: true
    });
    
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
}

main();
```

### TypeScript Support

```typescript
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://gateway.company.com:8443/v1'
});

async function chat(messages: ChatCompletionMessageParam[]) {
    const response = await client.chat.completions.create({
        model: 'gpt-4',
        messages
    });
    
    return response.choices[0].message;
}
```

### Custom Fetch (for TLS)

```javascript
import OpenAI from 'openai';
import https from 'https';
import fetch from 'node-fetch';

// Custom agent for corporate CA
const agent = new https.Agent({
    ca: fs.readFileSync('/path/to/company-ca.crt')
});

const client = new OpenAI({
    apiKey: 'sk-your-key',
    baseURL: 'https://gateway.company.com:8443/v1',
    fetch: (url, init) => fetch(url, { ...init, agent })
});
```

---

## Framework Integration

### FastAPI

```python
from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1"
)

@app.post("/chat")
async def chat(message: str):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": message}]
    )
    return {"response": response.choices[0].message.content}
```

### Express.js

```javascript
import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://gateway.company.com:8443/v1'
});

app.post('/chat', async (req, res) => {
    const response = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: req.body.message }]
    });
    
    res.json({ response: response.choices[0].message.content });
});

app.listen(3000);
```

### Django

```python
# views.py
from django.http import JsonResponse
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL", "https://gateway.company.com:8443/v1")
)

def chat_view(request):
    message = request.POST.get("message")
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": message}]
    )
    return JsonResponse({"response": response.choices[0].message.content})
```

---

## Error Handling

```python
from openai import OpenAI, APIError, RateLimitError, APIConnectionError

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1"
)

try:
    response = client.chat.completions.create(
        model="gpt-4",
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
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://gateway.company.com:8443/v1"
)

# Test with intentional PII
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "user", 
        "content": "Help me email john.doe@example.com about SSN 123-45-6789"
    }]
)

# Check gateway logs for redaction
```

### Unit Testing with Mock

```python
import pytest
from unittest.mock import Mock, patch

def test_chat_function():
    with patch('openai.OpenAI') as mock_openai:
        mock_client = Mock()
        mock_openai.return_value = mock_client
        mock_client.chat.completions.create.return_value = Mock(
            choices=[Mock(message=Mock(content="Hello!"))]
        )
        
        # Your test code here
```

---

## Troubleshooting

### "Connection refused"

```python
# Verify gateway URL
import requests
response = requests.get("https://gateway.company.com:8443/health")
print(response.json())
```

### SSL Certificate Errors

```python
# Option 1: Add CA certificate
import os
os.environ['SSL_CERT_FILE'] = '/path/to/ca-bundle.crt'

# Option 2: Use httpx with custom verify
import httpx
client = OpenAI(
    http_client=httpx.Client(verify="/path/to/ca.crt")
)
```

### Request Blocked (403)

This means ZeroShare detected sensitive data:
```python
try:
    response = client.chat.completions.create(...)
except APIError as e:
    if e.status_code == 403:
        print("Sensitive data detected - review and sanitize input")
```

---

## Support

- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- [ZeroShare Support](https://deployzeroshare.com/support)
