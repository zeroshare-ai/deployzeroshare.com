const AWS = require('aws-sdk');

// Get region from environment or default to us-east-1
const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const ses = new AWS.SES({ region });

exports.handler = async (event) => {
  // Handle CORS
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
    const { name, email, company, subject, message, priority, timestamp } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Prepare email content
    const priorityLabels = {
      low: 'Low',
      normal: 'Normal',
      high: 'High',
      critical: 'Critical'
    };

    const emailSubject = `[Support Case] ${subject} - ${priorityLabels[priority] || 'Normal'}`;
    
    const emailBody = `
New support case submitted from deployzeroshare.com

Priority: ${priorityLabels[priority] || 'Normal'}
Submitted: ${timestamp || new Date().toISOString()}

Contact Information:
- Name: ${name}
- Email: ${email}
${company ? `- Company: ${company}` : ''}

Subject: ${subject}

Message:
${message}

---
This is an automated message from the ZeroShare Gateway support form.
Please respond directly to ${email}.
    `.trim();

    const emailBodyHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #667eea;">New Support Case</h2>
          <p><strong>Priority:</strong> ${priorityLabels[priority] || 'Normal'}</p>
          <p><strong>Submitted:</strong> ${timestamp || new Date().toISOString()}</p>
          
          <h3>Contact Information</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          </ul>
          
          <h3>Subject</h3>
          <p>${subject}</p>
          
          <h3>Message</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">
            This is an automated message from the ZeroShare Gateway support form.<br>
            Please respond directly to <a href="mailto:${email}">${email}</a>.
          </p>
        </body>
      </html>
    `;

    // Send email via SES
    const params = {
      Source: process.env.FROM_EMAIL || 'no-reply@deployzeroshare.com',
      Destination: {
        ToAddresses: [process.env.TO_EMAIL || 'support@deployzeroshare.com']
      },
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: 'UTF-8'
          },
          Html: {
            Data: emailBodyHtml,
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [email]
    };

    await ses.sendEmail(params).promise();

    // Send confirmation email to user
    const confirmationParams = {
      Source: process.env.FROM_EMAIL || 'no-reply@deployzeroshare.com',
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: `Support Case Received: ${subject}`,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: `
Thank you for contacting ZeroShare Gateway support.

We've received your support case and will respond within 2 business days.

Case Details:
- Subject: ${subject}
- Priority: ${priorityLabels[priority] || 'Normal'}

Your message:
${message}

If you have any urgent concerns, please contact us directly at support@deployzeroshare.com.

Best regards,
ZeroShare Gateway Support Team
            `.trim(),
            Charset: 'UTF-8'
          },
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #667eea;">Support Case Received</h2>
                  <p>Thank you for contacting ZeroShare Gateway support.</p>
                  <p>We've received your support case and will respond within <strong>2 business days</strong>.</p>
                  
                  <h3>Case Details</h3>
                  <ul>
                    <li><strong>Subject:</strong> ${subject}</li>
                    <li><strong>Priority:</strong> ${priorityLabels[priority] || 'Normal'}</li>
                  </ul>
                  
                  <h3>Your Message</h3>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
                  
                  <p style="margin-top: 30px;">
                    If you have any urgent concerns, please contact us directly at 
                    <a href="mailto:support@deployzeroshare.com">support@deployzeroshare.com</a>.
                  </p>
                  
                  <p>Best regards,<br>ZeroShare Gateway Support Team</p>
                </body>
              </html>
            `,
            Charset: 'UTF-8'
          }
        }
      }
    };

    await ses.sendEmail(confirmationParams).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Support case submitted successfully'
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: error.message
      })
    };
  }
};
