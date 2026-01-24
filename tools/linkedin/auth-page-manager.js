#!/usr/bin/env node
/**
 * LinkedIn Page Manager OAuth Authentication
 * 
 * Authenticates with the Community Management API app
 * for editing company page profile (logo, description, etc.)
 * 
 * Usage: node auth-page-manager.js
 */

import http from 'http';
import open from 'open';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_FILE = join(__dirname, '.env.page-manager');

// Load page manager env
dotenv.config({ path: ENV_FILE });

const config = {
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:8888/callback',
};

// Community Management API scopes
const SCOPES = [
  'r_organization_admin',
  'rw_organization_admin',
  'w_organization_social',
  'r_organization_social',
];

const PORT = 8888;

console.log('🔐 LinkedIn Page Manager Authentication\n');
console.log(`Client ID: ${config.clientId}`);
console.log(`Redirect URI: ${config.redirectUri}`);
console.log(`Scopes: ${SCOPES.join(', ')}\n`);

if (!config.clientId || !config.clientSecret) {
  console.error('❌ Missing credentials in .env.page-manager');
  process.exit(1);
}

// Build authorization URL
const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', config.clientId);
authUrl.searchParams.set('redirect_uri', config.redirectUri);
authUrl.searchParams.set('scope', SCOPES.join(' '));
authUrl.searchParams.set('state', 'pagemanager' + Date.now());

// Start local server to catch callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    
    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<h1>❌ Error: ${error}</h1><p>${url.searchParams.get('error_description')}</p>`);
      server.close();
      process.exit(1);
    }
    
    if (code) {
      console.log('✅ Authorization code received');
      console.log('📤 Exchanging for access token...\n');
      
      try {
        // Exchange code for token
        const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: config.redirectUri,
            client_id: config.clientId,
            client_secret: config.clientSecret,
          }),
        });
        
        const tokenData = await tokenResponse.json();
        
        if (tokenData.access_token) {
          console.log('✅ Access token received!');
          console.log(`   Expires in: ${Math.round(tokenData.expires_in / 86400)} days\n`);
          
          // Update .env.page-manager file
          let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
          envContent = envContent.replace(
            /LINKEDIN_ACCESS_TOKEN=.*/,
            `LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`
          );
          fs.writeFileSync(ENV_FILE, envContent);
          
          console.log('💾 Token saved to .env.page-manager');
          
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: system-ui; padding: 40px; text-align: center;">
                <h1>✅ Page Manager Authenticated!</h1>
                <p>You can now close this window and manage your LinkedIn company page via API.</p>
                <p style="color: #666;">Token saved to .env.page-manager</p>
              </body>
            </html>
          `);
        } else {
          throw new Error(tokenData.error_description || 'Failed to get token');
        }
      } catch (err) {
        console.error('❌ Token exchange failed:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Error</h1><p>${err.message}</p>`);
      }
      
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 1000);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`🌐 Callback server listening on port ${PORT}`);
  console.log('🔗 Opening browser for authorization...\n');
  console.log(`If browser doesn't open, visit:\n${authUrl.toString()}\n`);
  open(authUrl.toString());
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is in use. Close other apps using it.`);
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});
