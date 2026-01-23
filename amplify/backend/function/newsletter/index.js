const AWS = require('aws-sdk');

// Get region from environment or default to us-east-1
const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const ses = new AWS.SES({ region });
const dynamodb = new AWS.DynamoDB.DocumentClient({ region });

const TABLE_NAME = process.env.TABLE_NAME || 'zeroshare-newsletter-subscribers';

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
    const { email, source } = body;

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email is required' })
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

    const timestamp = new Date().toISOString();
    const subscriberId = Buffer.from(email.toLowerCase()).toString('base64');

    // Check if already subscribed
    let isNewSubscriber = true;
    try {
      const existing = await dynamodb.get({
        TableName: TABLE_NAME,
        Key: { subscriberId }
      }).promise();
      
      if (existing.Item) {
        isNewSubscriber = false;
      }
    } catch (dbError) {
      // Table might not exist yet, that's okay - continue as new subscriber
      console.log('DynamoDB check skipped:', dbError.message);
    }

    // Store subscriber in DynamoDB (if table exists)
    try {
      await dynamodb.put({
        TableName: TABLE_NAME,
        Item: {
          subscriberId,
          email: email.toLowerCase(),
          subscribedAt: timestamp,
          source: source || 'blog',
          status: 'active'
        }
      }).promise();
    } catch (dbError) {
      // Log but don't fail - email notification is the priority
      console.log('DynamoDB storage skipped:', dbError.message);
    }

    // Send notification email to admin
    const notifyEmail = process.env.NOTIFY_EMAIL || 'rick@deployzeroshare.com';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@deployzeroshare.com';

    const emailSubject = isNewSubscriber 
      ? `[Newsletter] New Subscriber: ${email}`
      : `[Newsletter] Returning Subscriber: ${email}`;
    
    const emailBody = `
${isNewSubscriber ? 'New newsletter subscription!' : 'Returning subscriber (already on list)'}

Email: ${email}
Source: ${source || 'blog'}
Timestamp: ${timestamp}
${!isNewSubscriber ? '\nNote: This email was already on the list.' : ''}

---
ZeroShare Gateway Newsletter System
    `.trim();

    const emailBodyHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #667eea;">${isNewSubscriber ? '🎉 New Newsletter Subscriber!' : '🔄 Returning Subscriber'}</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Source:</strong> ${source || 'blog'}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            ${!isNewSubscriber ? '<p style="color: #888;">Note: This email was already on the subscriber list.</p>' : ''}
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">
            ZeroShare Gateway Newsletter System
          </p>
        </body>
      </html>
    `;

    // Send admin notification (this should always work if domain is verified)
    try {
      const adminParams = {
        Source: fromEmail,
        Destination: {
          ToAddresses: [notifyEmail]
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
        }
      };

      await ses.sendEmail(adminParams).promise();
      console.log('Admin notification sent successfully');
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError.message);
      // Continue anyway - subscription still successful
    }

    // Send welcome email to subscriber (only for new subscribers)
    // Note: This may fail in SES sandbox mode for unverified recipients
    if (isNewSubscriber) {
      try {
        const welcomeParams = {
          Source: fromEmail,
          Destination: {
            ToAddresses: [email]
          },
          Message: {
            Subject: {
              Data: 'Welcome to ZeroShare Security Insights',
              Charset: 'UTF-8'
            },
            Body: {
              Text: {
                Data: `
Welcome to ZeroShare Security Insights!

Thank you for subscribing to our newsletter. You'll receive:

• Weekly AI security insights and best practices
• Compliance updates and regulatory news
• Exclusive content and early access to resources

Visit our blog anytime: https://deployzeroshare.com/blog

If you didn't subscribe, you can ignore this email or contact us at support@deployzeroshare.com.

Best regards,
The ZeroShare Team
                `.trim(),
                Charset: 'UTF-8'
              },
              Html: {
                Data: `
                  <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">🛡️ ZeroShare</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Security Insights</p>
                      </div>
                      
                      <div style="padding: 30px 20px;">
                        <h2 style="color: #667eea;">Welcome to the Newsletter!</h2>
                        <p>Thank you for subscribing. You'll receive:</p>
                        
                        <ul style="padding-left: 20px;">
                          <li><strong>Weekly AI security insights</strong> and best practices</li>
                          <li><strong>Compliance updates</strong> and regulatory news</li>
                          <li><strong>Exclusive content</strong> and early access to resources</li>
                        </ul>
                        
                        <div style="text-align: center; margin: 30px 0;">
                          <a href="https://deployzeroshare.com/blog" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                            Read Latest Articles →
                          </a>
                        </div>
                        
                        <p style="color: #888; font-size: 14px; margin-top: 30px;">
                          If you didn't subscribe, you can ignore this email or contact us at 
                          <a href="mailto:support@deployzeroshare.com">support@deployzeroshare.com</a>.
                        </p>
                      </div>
                      
                      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                        <p>ZeroShare Gateway - AI Security for Enterprise</p>
                        <p>
                          <a href="https://deployzeroshare.com" style="color: #667eea;">Website</a> · 
                          <a href="https://deployzeroshare.com/blog" style="color: #667eea;">Blog</a> · 
                          <a href="https://deployzeroshare.com/privacy" style="color: #667eea;">Privacy</a>
                        </p>
                      </div>
                    </body>
                  </html>
                `,
                Charset: 'UTF-8'
              }
            }
          }
        };

        await ses.sendEmail(welcomeParams).promise();
        console.log('Welcome email sent to subscriber');
      } catch (welcomeError) {
        // Welcome email failed (likely SES sandbox mode)
        // This is not a fatal error - subscription is still successful
        console.log('Welcome email skipped (SES sandbox mode):', welcomeError.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: isNewSubscriber 
          ? 'Successfully subscribed to newsletter' 
          : 'You\'re already subscribed!',
        isNewSubscriber
      })
    };

  } catch (error) {
    console.error('Error processing subscription:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process subscription',
        message: error.message
      })
    };
  }
};
