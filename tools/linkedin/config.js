/**
 * LinkedIn API Configuration
 * App ID: 228538213 (Advertising API - Development Tier)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

export const config = {
  // OAuth Credentials
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/callback',
  
  // Company Page
  companyId: process.env.LINKEDIN_COMPANY_ID || '110457262',
  
  // Access Token (after OAuth)
  accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
  
  // SAFETY: Must be explicitly set to "true" to post live
  liveMode: process.env.LINKEDIN_LIVE_MODE === 'true',
  
  // API Endpoints
  endpoints: {
    authorize: 'https://www.linkedin.com/oauth/v2/authorization',
    token: 'https://www.linkedin.com/oauth/v2/accessToken',
    posts: 'https://api.linkedin.com/rest/posts',
    images: 'https://api.linkedin.com/rest/images',
    adAccounts: 'https://api.linkedin.com/rest/adAccounts',
    campaigns: 'https://api.linkedin.com/rest/adCampaigns',
  },
  
  // Required OAuth Scopes
  scopes: [
    'openid',
    'profile',
    'w_member_social',           // Post as member
    'w_organization_social',     // Post as company page
    'r_organization_social',     // Read company page
    'rw_ads',                    // Manage ads
    'r_ads_reporting',           // Read ad analytics
  ],
  
  // API Version Header
  apiVersion: '202501',
};

// Validate config
export function validateConfig() {
  const missing = [];
  
  if (!config.clientId) missing.push('LINKEDIN_CLIENT_ID');
  if (!config.clientSecret) missing.push('LINKEDIN_CLIENT_SECRET');
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(v => console.error(`  - ${v}`));
    console.error('\nCopy .env.example to .env and fill in your credentials.');
    console.error('Get credentials from: https://www.linkedin.com/developers/apps/228538213/auth');
    process.exit(1);
  }
  
  return true;
}

export function requireAccessToken() {
  if (!config.accessToken) {
    console.error('No access token found. Run "npm run auth" first to authenticate.');
    process.exit(1);
  }
  return config.accessToken;
}

export function requireLiveMode() {
  if (!config.liveMode) {
    console.log('\n⚠️  DRY RUN MODE - Nothing will be posted to LinkedIn');
    console.log('To post live, set LINKEDIN_LIVE_MODE=true in .env\n');
    return false;
  }
  console.log('\n🔴 LIVE MODE - Posts will be published to LinkedIn\n');
  return true;
}

export default config;
