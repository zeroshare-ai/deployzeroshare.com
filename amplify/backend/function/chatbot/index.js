const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { buildSystemPrompt } = require('./knowledge-base');

// Initialize Bedrock client
const region = process.env.AWS_REGION || 'us-east-1';
const bedrockClient = new BedrockRuntimeClient({ region });

// Model configuration - Claude 3.5 Sonnet v2 via US inference profile
// Using inference profile ID (required for newer Claude models on Bedrock)
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'us.anthropic.claude-3-5-sonnet-20241022-v2:0';
const MAX_TOKENS = 1024;

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { messages, sessionId } = body;

    // Validate required fields
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Messages array is required' })
      };
    }

    // Build the system prompt with all ZeroShare knowledge
    const systemPrompt = buildSystemPrompt();

    // Format messages for Claude
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Prepare the request for Bedrock (Claude Messages API format)
    const requestBody = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: formattedMessages
    };

    // Call Bedrock
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(requestBody)
    });

    const response = await bedrockClient.send(command);
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const assistantMessage = responseBody.content[0].text;

    // Log conversation for analytics (optional - can be sent to CloudWatch)
    console.log(JSON.stringify({
      type: 'chatbot_conversation',
      sessionId: sessionId || 'anonymous',
      userMessage: messages[messages.length - 1].content,
      assistantMessage: assistantMessage,
      timestamp: new Date().toISOString()
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: assistantMessage,
        sessionId: sessionId
      })
    };

  } catch (error) {
    console.error('Chatbot error:', error);

    // Check for specific Bedrock errors
    if (error.name === 'AccessDeniedException') {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'AI service temporarily unavailable',
          message: 'Please try again later or contact support.',
          fallback: true
        })
      };
    }

    if (error.name === 'ThrottlingException') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too many requests',
          message: 'Please wait a moment and try again.',
          fallback: true
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process message',
        message: 'Something went wrong. Please try again or contact support.',
        fallback: true
      })
    };
  }
};
