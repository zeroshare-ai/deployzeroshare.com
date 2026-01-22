'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Doc {
  title: string;
  content: string;
  path: string;
}

export default function DocsPage() {
  const [docIndex, setDocIndex] = useState<{ title: string; path: string; file: string }[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch documentation index
    fetch('/docs/index.json')
      .then(res => res.json())
      .then(data => {
        setDocIndex(data);
        if (data.length > 0) {
          setSelectedDoc(data[0].path);
          loadDoc(data[0].file);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load docs:', err);
        setError('Documentation not available. Please check back later.');
        setLoading(false);
      });
  }, []);

  const loadDoc = (filename: string) => {
    setLoading(true);
    fetch(`/docs/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error('Document not found');
        return res.text();
      })
      .then(text => {
        setDocContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load doc:', err);
        setError('Failed to load document');
        setLoading(false);
      });
  };

  const handleDocSelect = (path: string, file: string) => {
    setSelectedDoc(path);
    loadDoc(file);
  };

  if (loading && docIndex.length === 0) {
    return (
      <main style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Inter', sans-serif", padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading documentation...</p>
        </div>
      </main>
    );
  }

  const currentDoc = docIndex.find(d => d.path === selectedDoc);

  return (
    <main style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px 40px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem'
          }}>
            Documentation
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95
          }}>
            Complete guides and reference documentation for ZeroShare Gateway
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 300px) 1fr',
        gap: '2rem'
      }}>
        {/* Sidebar */}
        <aside style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          height: 'fit-content',
          position: 'sticky',
          top: '20px'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Documentation
          </h2>
          <nav>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {docIndex.map((doc) => (
                <li key={doc.path} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => handleDocSelect(doc.path, doc.file)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      background: selectedDoc === doc.path ? '#f0f4ff' : 'transparent',
                      color: selectedDoc === doc.path ? '#667eea' : '#555',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: selectedDoc === doc.path ? 600 : 400,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (selectedDoc !== doc.path) {
                        e.currentTarget.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedDoc !== doc.path) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <article style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          minHeight: '600px'
        }}>
          {error ? (
            <div style={{ color: '#d32f2f', padding: '2rem', textAlign: 'center' }}>
              <p>{error}</p>
            </div>
          ) : currentDoc ? (
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                fontWeight: 700,
                color: '#1a1a1a',
                borderBottom: '2px solid #e9ecef',
                paddingBottom: '1rem'
              }}>
                {currentDoc.title}
              </h1>
              <div style={{
                lineHeight: '1.8',
                color: '#333'
              }}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 700 }} {...props} />,
                      h2: ({node, ...props}) => <h2 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: 700, color: '#667eea' }} {...props} />,
                      h3: ({node, ...props}) => <h3 style={{ fontSize: '1.25rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }} {...props} />,
                      p: ({node, ...props}) => <p style={{ marginBottom: '1rem' }} {...props} />,
                      code: ({node, inline, ...props}: any) => 
                        inline ? (
                          <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }} {...props} />
                        ) : (
                          <code style={{ display: 'block', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', overflow: 'auto', marginBottom: '1rem' }} {...props} />
                        ),
                      ul: ({node, ...props}) => <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }} {...props} />,
                      ol: ({node, ...props}) => <ol style={{ marginLeft: '2rem', marginBottom: '1rem' }} {...props} />,
                      li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                      a: ({node, ...props}) => <a style={{ color: '#667eea', textDecoration: 'underline' }} {...props} />,
                      blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '4px solid #667eea', paddingLeft: '1rem', marginLeft: 0, fontStyle: 'italic', color: '#666' }} {...props} />,
                    }}
                  >
                    {docContent}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ) : (
            <p style={{ color: '#666' }}>Select a document from the sidebar</p>
          )}
        </article>
      </section>
    </main>
  );
}
