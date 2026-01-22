'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';

type Priority = 'general' | 'technical' | 'urgent';

const priorities: { id: Priority; label: string; description: string; icon: string }[] = [
  { id: 'general', label: 'General Inquiry', description: 'Questions about features or pricing', icon: '💬' },
  { id: 'technical', label: 'Technical Support', description: 'Help with setup or configuration', icon: '🔧' },
  { id: 'urgent', label: 'Urgent Issue', description: 'Production system affected', icon: '🚨' },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    priority: 'general' as Priority
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePriorityChange = (priority: Priority) => {
    setFormData({ ...formData, priority });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_SUPPORT_API_URL || 
        'https://deployzeroshare-support-api.execute-api.us-east-1.amazonaws.com/prod/support';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `[${formData.priority.toUpperCase()}] Support request from ${formData.name}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit support request');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px 60px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem'
          }}>
            How Can We Help?
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Our team responds within 24 hours. We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Support Form */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          padding: 'clamp(2rem, 5vw, 3rem)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2.5rem'
              }}>✓</div>
              <h2 style={{
                fontSize: '1.8rem',
                marginBottom: '1rem',
                color: '#1a1a1a',
                fontWeight: 700
              }}>
                Message Sent!
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.7'
              }}>
                Thanks for reaching out. We'll get back to you at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    message: '',
                    priority: 'general'
                  });
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Priority Selection - Modern Radio Cards */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '1rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '1rem'
                }}>
                  What can we help you with?
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem'
                }}>
                  {priorities.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePriorityChange(p.id)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: formData.priority === p.id 
                          ? '2px solid #667eea' 
                          : '2px solid #e9ecef',
                        background: formData.priority === p.id 
                          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)' 
                          : 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                      onMouseOver={(e) => {
                        if (formData.priority !== p.id) {
                          e.currentTarget.style.borderColor = '#667eea50';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (formData.priority !== p.id) {
                          e.currentTarget.style.borderColor = '#e9ecef';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {formData.priority === p.id && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '20px',
                          height: '20px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px'
                        }}>✓</div>
                      )}
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                      <div style={{
                        fontWeight: 600,
                        color: formData.priority === p.id ? '#667eea' : '#1a1a1a',
                        fontSize: '0.95rem',
                        marginBottom: '0.25rem'
                      }}>
                        {p.label}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#888'
                      }}>
                        {p.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontSize: '0.9rem'
                  }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e9ecef';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontSize: '0.9rem'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e9ecef';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Company (Optional) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.9rem'
                }}>
                  Company <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.9rem'
                }}>
                  How can we help?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us what you need help with..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    outline: 'none',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {status === 'error' && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}>
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  width: '100%',
                  background: status === 'submitting' 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '18px 32px',
                  borderRadius: '14px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: status === 'submitting' ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseOver={(e) => {
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = status === 'submitting' ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              <p style={{
                marginTop: '1.5rem',
                fontSize: '0.85rem',
                color: '#999',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                By submitting, you agree to our{' '}
                <a href="/privacy" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</a>
              </p>
            </form>
          )}
        </div>

        {/* Trust Indicators */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: '#888',
          fontSize: '0.9rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '1rem'
          }}>
            <span>🔒 Secure & Encrypted</span>
            <span>⚡ 24hr Response Time</span>
            <span>🌍 Enterprise Support</span>
          </div>
        </div>
      </section>
    </main>
  );
}
