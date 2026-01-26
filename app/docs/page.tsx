'use client';

import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navigation } from '../components/Navigation';

interface DocItem {
  title: string;
  path: string;
  file: string;
  category: string;
  icon: string;
  description: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

// Icon components
const Icons: { [key: string]: JSX.Element } = {
  rocket: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  download: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  diagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  cursor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/>
    </svg>
  ),
  terminal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  help: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

export default function DocsPage() {
  const [docIndex, setDocIndex] = useState<DocItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Group documents by category
  const groupedDocs = useMemo(() => {
    const groups: { [key: string]: DocItem[] } = {};
    const filteredDocs = docIndex.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    filteredDocs.forEach(doc => {
      if (!groups[doc.category]) {
        groups[doc.category] = [];
      }
      groups[doc.category].push(doc);
    });
    return groups;
  }, [docIndex, searchQuery]);

  // Extract table of contents from markdown
  const extractTOC = (content: string): TableOfContentsItem[] => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const toc: TableOfContentsItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].replace(/`/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, text, level });
    }
    
    return toc;
  };

  useEffect(() => {
    fetch('/_docs/index.json')
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
        setLoading(false);
      });
  }, []);

  const loadDoc = (filename: string) => {
    setLoading(true);
    fetch(`/_docs/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error('Document not found');
        return res.text();
      })
      .then(text => {
        setDocContent(text);
        setTableOfContents(extractTOC(text));
        setLoading(false);
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => {
        console.error('Failed to load doc:', err);
        setDocContent('# Document Not Found\n\nThe requested documentation could not be loaded.');
        setTableOfContents([]);
        setLoading(false);
      });
  };

  const handleDocSelect = (path: string, file: string) => {
    setSelectedDoc(path);
    loadDoc(file);
    setMobileMenuOpen(false);
  };

  const currentDoc = docIndex.find(d => d.path === selectedDoc);

  if (loading && docIndex.length === 0) {
    return (
      <main style={{ minHeight: '100vh', background: '#0f1117', fontFamily: "'Inter', sans-serif" }}>
        <Navigation />
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '80vh' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #333',
              borderTopColor: '#667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: '#888' }}>Loading documentation...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0f1117', 
      fontFamily: "'Inter', sans-serif",
      color: '#e4e4e7'
    }}>
      <Navigation />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="mobile-menu-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '280px 1fr 220px',
        maxWidth: '1600px',
        margin: '0 auto',
        gap: '0'
      }} className="docs-grid">
        
        {/* Left Sidebar - Navigation */}
        <aside 
          style={{
            borderRight: '1px solid #27272a',
            height: 'calc(100vh - 70px)',
            position: 'sticky',
            top: '70px',
            overflowY: 'auto',
            padding: '1.5rem 0'
          }}
          className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}
        >
          {/* Search */}
          <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem 0.625rem 2.5rem',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  color: '#e4e4e7',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#71717a" 
                strokeWidth="2"
                style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>

          {/* Navigation Categories */}
          <nav>
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#71717a',
                  padding: '0 1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {category}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {docs.map((doc) => (
                    <li key={doc.path}>
                      <button
                        onClick={() => handleDocSelect(doc.path, doc.file)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.625rem 1.5rem',
                          background: selectedDoc === doc.path ? 'linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%)' : 'transparent',
                          border: 'none',
                          borderLeft: selectedDoc === doc.path ? '2px solid #667eea' : '2px solid transparent',
                          color: selectedDoc === doc.path ? '#fff' : '#a1a1aa',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          if (selectedDoc !== doc.path) {
                            e.currentTarget.style.color = '#e4e4e7';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedDoc !== doc.path) {
                            e.currentTarget.style.color = '#a1a1aa';
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <span style={{ 
                          color: selectedDoc === doc.path ? '#667eea' : '#52525b',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {Icons[doc.icon] || Icons.code}
                        </span>
                        {doc.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <article style={{
          padding: '2rem 3rem',
          minHeight: 'calc(100vh - 70px)',
          maxWidth: '900px'
        }} className="docs-content">
          {currentDoc && (
            <>
              {/* Breadcrumb */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                color: '#71717a'
              }}>
                <span>Docs</span>
                <span>/</span>
                <span style={{ color: '#667eea' }}>{currentDoc.category}</span>
                <span>/</span>
                <span style={{ color: '#a1a1aa' }}>{currentDoc.title}</span>
              </div>

              {/* Page Title */}
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ 
                  color: '#71717a', 
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem' 
                }}>
                  {currentDoc.description}
                </p>
              </div>
            </>
          )}

          {/* Markdown Content */}
          <div className="markdown-content" style={{ lineHeight: '1.75' }}>
            {loading ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '4rem 0'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #333',
                  borderTopColor: '#667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <h1 
                        id={id}
                        style={{ 
                          fontSize: '2.25rem', 
                          fontWeight: 700, 
                          color: '#fff',
                          marginTop: '0',
                          marginBottom: '1.5rem',
                          lineHeight: 1.2
                        }} 
                        {...props}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <h2 
                        id={id}
                        style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 600, 
                          color: '#fff',
                          marginTop: '2.5rem',
                          marginBottom: '1rem',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid #27272a'
                        }} 
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <h3 
                        id={id}
                        style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 600, 
                          color: '#e4e4e7',
                          marginTop: '2rem',
                          marginBottom: '0.75rem'
                        }} 
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children, ...props }) => (
                    <h4 
                      style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        color: '#e4e4e7',
                        marginTop: '1.5rem',
                        marginBottom: '0.5rem'
                      }} 
                      {...props}
                    >
                      {children}
                    </h4>
                  ),
                  p: ({ children, ...props }) => (
                    <p 
                      style={{ 
                        marginBottom: '1rem',
                        color: '#a1a1aa'
                      }} 
                      {...props}
                    >
                      {children}
                    </p>
                  ),
                  code: ({ inline, className, children, ...props }: any) => {
                    if (inline) {
                      return (
                        <code 
                          style={{ 
                            background: '#27272a', 
                            padding: '0.125rem 0.375rem', 
                            borderRadius: '4px', 
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            fontSize: '0.875em',
                            color: '#f472b6'
                          }} 
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code 
                        style={{ 
                          display: 'block',
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          fontSize: '0.875rem',
                          lineHeight: 1.7
                        }} 
                        className={className}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children, ...props }) => (
                    <pre 
                      style={{ 
                        background: '#18181b', 
                        border: '1px solid #27272a',
                        padding: '1rem 1.25rem', 
                        borderRadius: '8px', 
                        overflow: 'auto',
                        marginBottom: '1.5rem',
                        marginTop: '0.5rem'
                      }} 
                      {...props}
                    >
                      {children}
                    </pre>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul 
                      style={{ 
                        marginLeft: '1.5rem', 
                        marginBottom: '1rem',
                        color: '#a1a1aa'
                      }} 
                      {...props}
                    >
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol 
                      style={{ 
                        marginLeft: '1.5rem', 
                        marginBottom: '1rem',
                        color: '#a1a1aa'
                      }} 
                      {...props}
                    >
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li 
                      style={{ 
                        marginBottom: '0.5rem',
                        paddingLeft: '0.25rem'
                      }} 
                      {...props}
                    >
                      {children}
                    </li>
                  ),
                  a: ({ children, href, ...props }) => (
                    <a 
                      href={href}
                      style={{ 
                        color: '#818cf8', 
                        textDecoration: 'none',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderBottomColor = '#818cf8';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote 
                      style={{ 
                        borderLeft: '3px solid #667eea', 
                        paddingLeft: '1rem',
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: '1rem',
                        color: '#a1a1aa',
                        fontStyle: 'italic'
                      }} 
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  table: ({ children, ...props }) => (
                    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                      <table 
                        style={{ 
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '0.875rem'
                        }} 
                        {...props}
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children, ...props }) => (
                    <thead 
                      style={{ 
                        background: '#18181b'
                      }} 
                      {...props}
                    >
                      {children}
                    </thead>
                  ),
                  th: ({ children, ...props }) => (
                    <th 
                      style={{ 
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#e4e4e7',
                        borderBottom: '1px solid #27272a'
                      }} 
                      {...props}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td 
                      style={{ 
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #27272a',
                        color: '#a1a1aa'
                      }} 
                      {...props}
                    >
                      {children}
                    </td>
                  ),
                  hr: ({ ...props }) => (
                    <hr 
                      style={{ 
                        border: 'none',
                        borderTop: '1px solid #27272a',
                        margin: '2rem 0'
                      }} 
                      {...props}
                    />
                  ),
                  strong: ({ children, ...props }) => (
                    <strong 
                      style={{ 
                        color: '#e4e4e7',
                        fontWeight: 600
                      }} 
                      {...props}
                    >
                      {children}
                    </strong>
                  ),
                }}
              >
                {docContent}
              </ReactMarkdown>
            )}
          </div>

          {/* Footer Navigation */}
          {currentDoc && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid #27272a'
            }}>
              {(() => {
                const currentIndex = docIndex.findIndex(d => d.path === selectedDoc);
                const prevDoc = currentIndex > 0 ? docIndex[currentIndex - 1] : null;
                const nextDoc = currentIndex < docIndex.length - 1 ? docIndex[currentIndex + 1] : null;
                
                return (
                  <>
                    {prevDoc ? (
                      <button
                        onClick={() => handleDocSelect(prevDoc.path, prevDoc.file)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '1rem',
                          background: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'border-color 0.15s ease',
                          textAlign: 'left'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#667eea';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#27272a';
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>
                          ← Previous
                        </span>
                        <span style={{ color: '#e4e4e7', fontWeight: 500 }}>
                          {prevDoc.title}
                        </span>
                      </button>
                    ) : <div />}
                    
                    {nextDoc ? (
                      <button
                        onClick={() => handleDocSelect(nextDoc.path, nextDoc.file)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          padding: '1rem',
                          background: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'border-color 0.15s ease',
                          textAlign: 'right'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#667eea';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#27272a';
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>
                          Next →
                        </span>
                        <span style={{ color: '#e4e4e7', fontWeight: 500 }}>
                          {nextDoc.title}
                        </span>
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          )}
        </article>

        {/* Right Sidebar - Table of Contents */}
        <aside 
          style={{
            borderLeft: '1px solid #27272a',
            height: 'calc(100vh - 70px)',
            position: 'sticky',
            top: '70px',
            overflowY: 'auto',
            padding: '1.5rem'
          }}
          className="toc-sidebar"
        >
          {tableOfContents.length > 0 && (
            <>
              <h4 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#71717a',
                marginBottom: '1rem'
              }}>
                On this page
              </h4>
              <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {tableOfContents.filter(item => item.level <= 3).map((item, index) => (
                    <li key={index}>
                      <a
                        href={`#${item.id}`}
                        style={{
                          display: 'block',
                          padding: '0.375rem 0',
                          paddingLeft: item.level === 2 ? '0' : item.level === 3 ? '0.75rem' : '0',
                          fontSize: '0.8125rem',
                          color: '#71717a',
                          textDecoration: 'none',
                          transition: 'color 0.15s ease',
                          lineHeight: 1.4
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#e4e4e7';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#71717a';
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </aside>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1200px) {
          .docs-grid {
            grid-template-columns: 280px 1fr !important;
          }
          .toc-sidebar {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .docs-grid {
            grid-template-columns: 1fr !important;
          }
          .sidebar {
            display: none !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            background: #0f1117 !important;
            z-index: 999 !important;
            padding-top: 70px !important;
          }
          .sidebar-open {
            display: block !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .docs-content {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}
