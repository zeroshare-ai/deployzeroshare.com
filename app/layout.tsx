import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deploy ZeroShare - On-Premise AI Security Gateway',
  description: 'Deploy ZeroShare Gateway: Protect sensitive data with PII redaction and secrets blocking for your AI applications.',
  keywords: 'AI security, PII redaction, secrets blocking, on-premise AI gateway, ZeroShare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
