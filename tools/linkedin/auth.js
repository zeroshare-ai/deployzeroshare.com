#!/usr/bin/env node
/**
 * LinkedIn OAuth 2.0 Authentication Flow
 * 
 * Usage: npm run auth
 * 
 * This script:
 * 1. Opens browser to LinkedIn authorization page
 * 2. Starts local server to receive callback
 * 3. Exchanges code for access token
 * 4. Saves token to .env file
 */

import { createServer } from 'http';
import { URL } from 'url';
import { config, validateConfig } from './config.js';
import open from 'open';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

validateConfig();

const PORT = 8888;
const CALLBACK_PATH = '/callback';

// Build authorization URL
const authUrl = new URL(config.endpoints.authorize);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', config.clientId);
authUrl.searchParams.set('redirect_uri', config.redirectUri);
authUrl.searchParams.set('scope', config.scopes.join(' '));
authUrl.searchParams.set('state', 'zeroshare_' + Date.now());

console.log('🔐 LinkedIn OAuth Authentication\n');
console.log('Starting authentication flow...\n');

// Create server to receive callback
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  if (url.pathname !== CALLBACK_PATH) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');
  
  if (error) {
    console.error(`❌ Authorization failed: ${error}`);
    console.error(`   ${errorDescription}`);
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body style="font-family: system-ui; padding: 40px; text-align: center;">
          <h1 style="color: #dc2626;">❌ Authorization Failed</h1>
          <p>${errorDescription || error}</p>
          <p>You can close this window.</p>
        </body>
      </html>
    `);
    server.close();
    process.exit(1);
  }
  
  if (!code) {
    res.writeHead(400);
    res.end('No authorization code received');
    return;
  }
  
  console.log('✅ Authorization code received');
  console.log('   Exchanging for access token...\n');
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch(config.endpoints.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || tokenData.error || 'Token exchange failed');
    }
    
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;
    
    console.log('✅ Access token obtained');
    console.log(`   Expires in: ${Math.floor(expiresIn / 86400)} days\n`);
    
    // Save token to .env file
    const envPath = join(__dirname, '.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
      // Update existing token
      if (envContent.includes('LINKEDIN_ACCESS_TOKEN=')) {
        envContent = envContent.replace(
          /LINKEDIN_ACCESS_TOKEN=.*/,
          `LINKEDIN_ACCESS_TOKEN=${accessToken}`
        );
      } else {
        envContent += `\nLINKEDIN_ACCESS_TOKEN=${accessToken}`;
      }
    } else {
      // Create new .env from example
      const examplePath = join(__dirname, 'env.example');
      if (fs.existsSync(examplePath)) {
        envContent = fs.readFileSync(examplePath, 'utf-8');
        envContent = envContent.replace(
          'LINKEDIN_ACCESS_TOKEN=',
          `LINKEDIN_ACCESS_TOKEN=${accessToken}`
        );
      } else {
        envContent = `LINKEDIN_ACCESS_TOKEN=${accessToken}`;
      }
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Token saved to .env file');
    
    // Success response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body style="font-family: system-ui; padding: 40px; text-align: center;">
          <h1 style="color: #10b981;">✅ Authentication Successful!</h1>
          <p>Access token has been saved to your .env file.</p>
          <p>You can close this window and return to the terminal.</p>
          <p style="margin-top: 40px; color: #666; font-size: 14px;">
            Token expires in ${Math.floor(expiresIn / 86400)} days.
          </p>
        </body>
      </html>
    `);
    
    console.log('\n🎉 Authentication complete!');
    console.log('\nNext steps:');
    console.log('  1. Run "npm run generate" to create content from blog posts');
    console.log('  2. Run "npm run preview" to preview posts (dry run)');
    console.log('  3. When ready, set LINKEDIN_LIVE_MODE=true and run "node post.js --live"\n');
    
  } catch (err) {
    console.error(`❌ Token exchange failed: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body style="font-family: system-ui; padding: 40px; text-align: center;">
          <h1 style="color: #dc2626;">❌ Token Exchange Failed</h1>
          <p>${err.message}</p>
          <p>Please try again.</p>
        </body>
      </html>
    `);
  }
  
  server.close();
  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`📡 Callback server listening on http://localhost:${PORT}`);
  console.log(`\n🌐 Opening browser to LinkedIn authorization page...\n`);
  console.log(`   If browser doesn't open, visit:\n   ${authUrl.toString()}\n`);
  
  // Open browser
  open(authUrl.toString());
});

// Handle errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Stop other servers and try again.`);
  } else {
    console.error(`❌ Server error: ${err.message}`);
  }
  process.exit(1);
});

// Timeout after 5 minutes
setTimeout(() => {
  console.error('\n❌ Authentication timed out. Please try again.');
  server.close();
  process.exit(1);
}, 5 * 60 * 1000);
