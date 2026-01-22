'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // API endpoint is automatically set by Amplify build process
      // It reads from CloudFormation stack outputs and injects as environment variable
      const apiEndpoint = process.env.NEXT_PUBLIC_SUPPORT_API_URL || 
        'https://deployzeroshare-support-api.execute-api.us-east-1.amazonaws.com/prod/support';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit support request');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Inter', sans-serif" }}>
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
            Open a Support Case
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            We're here to help. Submit a support request and we'll respond within 2 business days.
          </p>
        </div>
      </section>

      {/* Support Form */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
        }}>
          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>✓</div>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                color: '#667eea',
                fontWeight: 700
              }}>
                Support Case Submitted
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.7'
              }}>
                Thank you for contacting us. We've received your support request and will respond 
                to <strong>{formData.email}</strong> within 2 business days.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    subject: '',
                    message: '',
                    priority: 'normal'
                  });
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="normal">Normal - Standard support request</option>
                  <option value="high">High - Urgent issue affecting operations</option>
                  <option value="critical">Critical - System down or security issue</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your issue"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: '0.95rem'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Please provide details about your issue, including any error messages, steps to reproduce, and your environment details."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e9ecef'}
                />
              </div>

              {status === 'error' && (
                <div style={{
                  background: '#fee',
                  border: '2px solid #fcc',
                  color: '#c33',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}>
                  {errorMessage || 'An error occurred. Please try again or contact support@zeroshare.com directly.'}
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
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  opacity: status === 'submitting' ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Support Case'}
              </button>

              <p style={{
                marginTop: '1.5rem',
                fontSize: '0.9rem',
                color: '#888',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                By submitting this form, you agree to our{' '}
                <a href="/privacy" style={{ color: '#667eea', textDecoration: 'underline' }}>
                  Privacy Policy
                </a>
                {' '}and{' '}
                <a href="/terms" style={{ color: '#667eea', textDecoration: 'underline' }}>
                  Terms of Service
                </a>
                .
              </p>
            </form>
          )}
        </div>

        {/* Additional Support Options */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 700
            }}>
              Email Support
            </h3>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              For direct inquiries
            </p>
            <a
              href="mailto:support@zeroshare.com"
              style={{
                color: '#667eea',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              support@zeroshare.com →
            </a>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 700
            }}>
              Documentation
            </h3>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              Self-service guides
            </p>
            <a
              href="https://docs.zeroshare.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#667eea',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              View Docs →
            </a>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 700
            }}>
              Community
            </h3>
            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              Join discussions
            </p>
            <a
              href="https://github.com/zeroshare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#667eea',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
