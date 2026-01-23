# Configuring LangChain with ZeroShare Gateway

This guide explains how to configure LangChain to route all LLM requests through ZeroShare Gateway for automatic security scanning.

## Overview

LangChain is a popular framework for building LLM applications. It supports custom endpoints for all major providers, making it easy to integrate with ZeroShare Gateway.

---

## Installation

```bash
pip install langchain langchain-openai langchain-anthropic
```

---

## OpenAI Models

### ChatOpenAI

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_key="sk-your-key",
    openai_api_base="https://gateway.company.com:8443/v1"
)

response = llm.invoke("Hello, how can you help me?")
print(response.content)
```

### With Environment Variables

```bash
export OPENAI_API_KEY="sk-your-key"
export OPENAI_API_BASE="https://gateway.company.com:8443/v1"
```

```python
from langchain_openai import ChatOpenAI

# Automatically uses environment variables
llm = ChatOpenAI(model="gpt-4")
```

### OpenAI Embeddings

```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002",
    openai_api_key="sk-your-key",
    openai_api_base="https://gateway.company.com:8443/v1"
)

vectors = embeddings.embed_documents(["Hello world", "Goodbye world"])
```

---

## Anthropic Models

### ChatAnthropic

```python
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-3-opus-20240229",
    anthropic_api_key="sk-ant-your-key",
    anthropic_api_url="https://gateway.company.com:8443"
)

response = llm.invoke("Hello, Claude!")
print(response.content)
```

---

## Azure OpenAI

```python
from langchain_openai import AzureChatOpenAI

llm = AzureChatOpenAI(
    deployment_name="your-deployment",
    azure_endpoint="https://gateway.company.com:8443",
    api_key="your-azure-key",
    api_version="2024-02-15-preview"
)
```

---

## Chains

### Simple Chain

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{input}")
])

chain = prompt | llm

response = chain.invoke({"input": "What is LangChain?"})
```

### Conversation Chain

```python
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

conversation = ConversationChain(
    llm=llm,
    memory=ConversationBufferMemory()
)

response1 = conversation.predict(input="Hi, my name is Alice")
response2 = conversation.predict(input="What's my name?")
```

---

## Agents

### ReAct Agent

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

# Define tools
tools = [
    Tool(
        name="Calculator",
        func=lambda x: eval(x),
        description="Useful for math calculations"
    )
]

# Get prompt from hub
prompt = hub.pull("hwchase17/react")

# Create agent
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

response = agent_executor.invoke({"input": "What is 25 * 4?"})
```

### OpenAI Functions Agent

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant"),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools)
```

---

## RAG (Retrieval Augmented Generation)

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

# Configure LLM with gateway
llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

# Configure embeddings with gateway
embeddings = OpenAIEmbeddings(
    openai_api_base="https://gateway.company.com:8443/v1"
)

# Load and split documents
loader = TextLoader("document.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

# Create vector store
db = Chroma.from_documents(texts, embeddings)

# Create retrieval chain
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever()
)

response = qa.invoke({"query": "What is this document about?"})
```

---

## Streaming

```python
from langchain_openai import ChatOpenAI
from langchain_core.callbacks import StreamingStdOutCallbackHandler

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1",
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)

response = llm.invoke("Tell me a story")
```

### Async Streaming

```python
from langchain_openai import ChatOpenAI
import asyncio

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

async def stream_response():
    async for chunk in llm.astream("Tell me a story"):
        print(chunk.content, end="", flush=True)

asyncio.run(stream_response())
```

---

## LCEL (LangChain Expression Language)

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

prompt = ChatPromptTemplate.from_template("Tell me about {topic}")
output_parser = StrOutputParser()

chain = prompt | llm | output_parser

response = chain.invoke({"topic": "AI security"})
```

---

## Multiple Providers

Use different providers for different tasks:

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# Fast model for simple tasks
fast_llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    openai_api_base="https://gateway.company.com:8443/v1"
)

# Powerful model for complex tasks
powerful_llm = ChatAnthropic(
    model="claude-3-opus-20240229",
    anthropic_api_url="https://gateway.company.com:8443"
)

# Route based on task complexity
def get_llm(complexity: str):
    if complexity == "simple":
        return fast_llm
    return powerful_llm
```

---

## Custom TLS Configuration

```python
import httpx
from langchain_openai import ChatOpenAI

# Custom HTTP client for corporate CA
http_client = httpx.Client(
    verify="/path/to/company-ca.crt",
    timeout=120.0
)

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1",
    http_client=http_client
)
```

---

## Error Handling

```python
from langchain_openai import ChatOpenAI
from openai import APIError, RateLimitError

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

try:
    response = llm.invoke("Hello")
except RateLimitError:
    print("Rate limited - retry later")
except APIError as e:
    if e.status_code == 403:
        print("Request blocked by ZeroShare - sensitive data detected")
    else:
        raise
```

---

## Testing

### Verify Gateway Routing

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4",
    openai_api_base="https://gateway.company.com:8443/v1"
)

# Test with intentional PII
response = llm.invoke("Help me contact john.doe@example.com")

# Check gateway logs for redaction
```

### Mock for Unit Tests

```python
from unittest.mock import Mock, patch

def test_langchain_call():
    with patch('langchain_openai.ChatOpenAI') as mock_llm:
        mock_instance = Mock()
        mock_llm.return_value = mock_instance
        mock_instance.invoke.return_value = Mock(content="Hello!")
        
        # Your test code here
```

---

## Troubleshooting

### "Connection refused"

```python
# Test gateway directly
import requests
response = requests.get("https://gateway.company.com:8443/health")
print(response.status_code)
```

### SSL Errors

```python
import os
os.environ['SSL_CERT_FILE'] = '/path/to/ca-bundle.crt'
```

### Request Blocked

ZeroShare detected sensitive data. Review your prompts and remove PII/secrets.

---

## Support

- [LangChain Documentation](https://python.langchain.com/)
- [ZeroShare Support](https://deployzeroshare.com/support)
