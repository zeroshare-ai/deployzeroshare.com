'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Generate a simple session ID
const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substring(2, 15);
};

// Get or create session ID from sessionStorage
const getSessionId = () => {
  if (typeof window === 'undefined') return generateSessionId();
  let sessionId = sessionStorage.getItem('chatbot_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('chatbot_session_id', sessionId);
  }
  return sessionId;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>('');

  // Initialize session ID
  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Hide pulse after first interaction
  useEffect(() => {
    if (hasInteracted) {
      setShowPulse(false);
    }
  }, [hasInteracted]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: "Hey, I'm the ZeroShare assistant. I can help you understand how ZeroShare Gateway protects your organization from AI data leaks, answer technical questions, or help you figure out if it's the right fit for your team. What brings you here?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setHasInteracted(true);

    try {
      // Get API URL from environment or use default
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || '/api/chat';
      
      // Prepare messages for API (exclude welcome message ID formatting)
      const apiMessages = [...messages, userMessage]
        .filter(m => m.id !== 'welcome' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          sessionId: sessionIdRef.current
        })
      });

      const data = await response.json();

      if (data.success && data.message) {
        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else if (data.fallback) {
        // Fallback response when API is unavailable
        const fallbackMessage: Message = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting right now. You can reach our team directly at [support](/support) or check out our [documentation](/docs) in the meantime.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: "I'm having some technical difficulties. For immediate help, visit our [support page](/support) or check the [documentation](/docs).",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Parse markdown-style links in messages
  const parseContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          style={{
            color: '#667eea',
            textDecoration: 'underline'
          }}
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  // Quick action buttons
  const quickActions = [
    { label: 'What is ZeroShare?', message: 'What is ZeroShare Gateway and what does it do?' },
    { label: 'Pricing', message: 'What are the pricing plans?' },
    { label: 'How to deploy', message: 'How do I deploy ZeroShare Gateway?' }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
        }}
      >
        {/* Pulse animation */}
        {showPulse && !isOpen && (
          <span style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'rgba(102, 126, 234, 0.4)',
            animation: 'chatPulse 2s ease-out infinite'
          }} />
        )}
        
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
            <circle cx="8" cy="10" r="1.5"/>
            <circle cx="12" cy="10" r="1.5"/>
            <circle cx="16" cy="10" r="1.5"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '550px',
            maxHeight: 'calc(100vh - 140px)',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9998,
            animation: 'chatSlideUp 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>ZeroShare Assistant</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>AI Security Expert</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Minimize chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f8f9fa'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: message.role === 'user' 
                    ? '16px 16px 4px 16px' 
                    : '16px 16px 16px 4px',
                  background: message.role === 'user' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'white',
                  color: message.role === 'user' ? 'white' : '#333',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {parseContent(message.content)}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'chatBounce 1.4s ease-in-out infinite',
                    animationDelay: '0s'
                  }} />
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'chatBounce 1.4s ease-in-out infinite',
                    animationDelay: '0.2s'
                  }} />
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'chatBounce 1.4s ease-in-out infinite',
                    animationDelay: '0.4s'
                  }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (only show at start) */}
          {messages.length === 1 && !isLoading && (
            <div style={{
              padding: '0 16px 12px',
              background: '#f8f9fa',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    setInputValue(action.message);
                    setTimeout(() => sendMessage(), 0);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid #e0e0e0',
                    background: 'white',
                    color: '#555',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.color = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.color = '#555';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #e9ecef',
            background: 'white',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about ZeroShare..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid #e0e0e0',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: inputValue.trim() && !isLoading
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#e0e0e0',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>

          {/* Bot Disclosure */}
          <div style={{
            padding: '8px 16px',
            background: '#f8f9fa',
            borderTop: '1px solid #e9ecef',
            textAlign: 'center',
            fontSize: '0.7rem',
            color: '#888'
          }}>
            AI assistant powered by AWS Bedrock
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes chatSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes chatBounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes chatPulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
