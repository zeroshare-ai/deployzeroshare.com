/**
 * Compliance Report Email Lambda
 * 
 * This Lambda function sends compliance report emails with S3 download links.
 * Triggered by S3 events when new compliance packages are uploaded.
 * 
 * Environment Variables:
 * - EMAIL_FROM: Sender email address
 * - EMAIL_TO: Default recipient email
 * - S3_BUCKET: Compliance reports bucket
 */

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

const LINK_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    // Handle different event types
    if (event.Records && event.Records[0].eventSource === 'aws:s3') {
      // S3 trigger
      return await handleS3Event(event);
    } else if (event.httpMethod) {
      // API Gateway trigger
      return await handleApiEvent(event);
    } else if (event.packages) {
      // Direct invocation with packages
      return await sendReportEmail(event.packages, event.recipient);
    }
    
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unknown event type' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

/**
 * Handle S3 upload events
 */
async function handleS3Event(event) {
  const packages = [];
  
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    
    // Only process ZIP files in compliance-reports folder
    if (!key.startsWith('compliance-reports/') || !key.endsWith('.zip')) {
      continue;
    }
    
    // Generate pre-signed URL
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(s3, command, { expiresIn: LINK_EXPIRY_SECONDS });
    
    // Extract certification name from filename
    const filename = key.split('/').pop();
    const certMatch = filename.match(/^(\w+)-compliance-package/);
    const certName = getCertificationName(certMatch ? certMatch[1] : 'unknown');
    
    packages.push({
      certName,
      filename,
      url,
      size: record.s3.object.size,
      uploadedAt: new Date().toISOString(),
    });
  }
  
  if (packages.length > 0) {
    await sendReportEmail(packages, process.env.EMAIL_TO);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Processed ${packages.length} packages` }),
  };
}

/**
 * Handle API Gateway events (manual trigger)
 */
async function handleApiEvent(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }
  
  const { packages, recipient } = body;
  
  if (!packages || !Array.isArray(packages)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'packages array required' }),
    };
  }
  
  await sendReportEmail(packages, recipient || process.env.EMAIL_TO);
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Email sent successfully' }),
  };
}

/**
 * Send compliance report email
 */
async function sendReportEmail(packages, recipient) {
  const htmlBody = generateHtmlEmail(packages);
  const textBody = generateTextEmail(packages);
  
  const command = new SendEmailCommand({
    Source: process.env.EMAIL_FROM || 'compliance@zeroshare.io',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: `ZeroShare Compliance Reports - ${new Date().toLocaleDateString()}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
      },
    },
  });
  
  const result = await ses.send(command);
  console.log('Email sent:', result.MessageId);
  return result;
}

/**
 * Generate HTML email
 */
function generateHtmlEmail(packages) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compliance Reports</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 30px;
    }
    .intro {
      color: #666;
      margin-bottom: 30px;
    }
    .package {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      border-left: 4px solid #667eea;
    }
    .package h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 18px;
    }
    .package-meta {
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .package-meta span {
      display: inline-block;
      margin-right: 15px;
    }
    .download-btn {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
    .expiry-notice {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 6px;
      padding: 15px;
      margin-top: 30px;
      font-size: 14px;
    }
    .footer {
      padding: 20px 30px;
      background: #f8f9fa;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .footer a {
      color: #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Compliance Reports Ready</h1>
      <p>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    
    <div class="content">
      <p class="intro">
        Your compliance documentation packages have been generated and are ready for download.
        Each package contains documentation, templates, and evidence artifacts.
      </p>
      
      ${packages.map(pkg => `
      <div class="package">
        <h3>${pkg.certName}</h3>
        <div class="package-meta">
          <span>📦 ${pkg.filename}</span>
          <span>📊 ${formatBytes(pkg.size)}</span>
        </div>
        <a href="${pkg.url}" class="download-btn">Download Package</a>
      </div>
      `).join('')}
      
      <div class="expiry-notice">
        ⚠️ <strong>Important:</strong> These download links will expire in 7 days.
        Please download and store the files securely for your records.
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated message from ZeroShare Compliance System</p>
      <p>Questions? Contact <a href="mailto:compliance@zeroshare.io">compliance@zeroshare.io</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text email
 */
function generateTextEmail(packages) {
  let text = `ZEROSHARE COMPLIANCE REPORTS
Generated: ${new Date().toISOString()}

Your compliance documentation packages are ready for download.

`;

  for (const pkg of packages) {
    text += `
${pkg.certName}
${'─'.repeat(40)}
File: ${pkg.filename}
Size: ${formatBytes(pkg.size)}
Download: ${pkg.url}

`;
  }

  text += `
IMPORTANT: Download links expire in 7 days.

---
ZeroShare Compliance System
compliance@zeroshare.io
`;

  return text;
}

/**
 * Get friendly certification name
 */
function getCertificationName(key) {
  const names = {
    soc2: 'SOC 2 Type II',
    iso27001: 'ISO 27001',
    gdpr: 'GDPR',
    hipaa: 'HIPAA',
    pci: 'PCI DSS',
    ccpa: 'CCPA',
    aws: 'AWS Marketplace & Certifications',
  };
  return names[key] || key.toUpperCase();
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
