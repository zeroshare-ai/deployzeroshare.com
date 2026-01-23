#!/usr/bin/env node
/**
 * LinkedIn Company Page Profile Manager
 * 
 * Updates and enhances the ZeroShare LinkedIn company page.
 * 
 * Usage:
 *   node company-profile.js --get          # Get current profile
 *   node company-profile.js --update       # Update profile
 *   node company-profile.js --preview      # Preview changes (dry run)
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config, validateConfig, requireAccessToken } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse arguments
const args = process.argv.slice(2);
const action = args.includes('--get') ? 'get' 
             : args.includes('--update') ? 'update'
             : args.includes('--preview') ? 'preview'
             : 'preview';

// Company profile data - edit this to update your page
const companyProfile = {
  // Basic Info
  localizedName: 'ZeroShare',
  
  // Tagline (120 chars max)
  localizedTagline: 'Stop Data Leaks Before They Reach AI | On-Premise Security Gateway',
  
  // Description (2000 chars max)
  localizedDescription: `ZeroShare Gateway is the enterprise security layer for AI adoption.

THE PROBLEM
Your employees are using ChatGPT, Copilot, Claude, and other AI tools—whether you've approved them or not. Every prompt is a potential data leak.

Research shows:
• 22% of files uploaded to AI tools contain sensitive data
• 65% of employees have shared sensitive data with AI without authorization
• $4.45M average cost of a data breach (IBM 2023)

THE SOLUTION
ZeroShare Gateway deploys on-premise as a transparent proxy between your users and AI services. It automatically:

✓ Detects PII (emails, SSNs, credit cards, health data)
✓ Blocks secrets (API keys, credentials, connection strings)
✓ Logs everything for compliance audits
✓ Works with ChatGPT, Copilot, Cursor, Claude & more

No code changes. Deploy in minutes. Sub-millisecond latency.

COMPLIANCE READY
• SOC 2 Type II aligned
• HIPAA compliant
• GDPR ready
• Complete audit logging

GET STARTED
Available now on AWS Marketplace with 1-click deployment.

🔗 Learn more: https://deployzeroshare.com
📧 Contact: support@deployzeroshare.com`,

  // Website
  localizedWebsite: 'https://deployzeroshare.com',
  
  // Specialties (up to 20)
  specialties: [
    'AI Security',
    'Data Loss Prevention',
    'PII Protection',
    'Secrets Management',
    'Enterprise Security',
    'Compliance',
    'HIPAA',
    'SOC 2',
    'GDPR',
    'ChatGPT Security',
    'Copilot Security',
    'LLM Security',
    'On-Premise Security',
    'API Security',
    'Cloud Security'
  ],
  
  // Industry
  industries: ['Computer & Network Security'],
  
  // Company size
  staffCountRange: '2-10',
  
  // Locations
  locations: [
    {
      country: 'US',
      city: 'Remote',
      description: 'Headquarters',
      isHeadquarters: true
    }
  ]
};

// Get current company profile
async function getCompanyProfile() {
  const response = await fetch(
    `https://api.linkedin.com/rest/organizations/${config.companyId}`,
    {
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': config.apiVersion,
      },
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Update company profile
async function updateCompanyProfile(profileData) {
  const response = await fetch(
    `https://api.linkedin.com/rest/organizations/${config.companyId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': config.apiVersion,
        'X-RestLi-Method': 'PARTIAL_UPDATE',
      },
      body: JSON.stringify({
        patch: {
          $set: profileData
        }
      }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return true;
}

// Get organization admin info
async function getOrganizationAdminInfo() {
  const response = await fetch(
    `https://api.linkedin.com/rest/organizationAcls?q=roleAssignee`,
    {
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': config.apiVersion,
      },
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

async function main() {
  console.log('🏢 LinkedIn Company Profile Manager\n');
  
  validateConfig();
  requireAccessToken();
  
  console.log(`Company ID: ${config.companyId}`);
  console.log(`Action: ${action}\n`);
  
  try {
    if (action === 'get') {
      console.log('📥 Fetching current profile...\n');
      const profile = await getCompanyProfile();
      console.log(JSON.stringify(profile, null, 2));
      
    } else if (action === 'preview') {
      console.log('👁️ Preview - Profile to be set:\n');
      console.log('─'.repeat(60));
      console.log(`Name: ${companyProfile.localizedName}`);
      console.log(`Tagline: ${companyProfile.localizedTagline}`);
      console.log(`Website: ${companyProfile.localizedWebsite}`);
      console.log(`\nDescription:\n${companyProfile.localizedDescription.substring(0, 500)}...`);
      console.log(`\nSpecialties: ${companyProfile.specialties.join(', ')}`);
      console.log('─'.repeat(60));
      console.log('\n⚠️ DRY RUN - No changes made');
      console.log('Run with --update to apply changes');
      
    } else if (action === 'update') {
      console.log('📤 Updating company profile...\n');
      
      // Note: LinkedIn API may not allow all fields to be updated
      // Some fields require manual update in LinkedIn admin
      const updateData = {
        localizedDescription: companyProfile.localizedDescription,
        localizedWebsite: companyProfile.localizedWebsite,
      };
      
      await updateCompanyProfile(updateData);
      console.log('✅ Profile updated successfully');
      console.log('\n⚠️ Note: Some fields (name, tagline, logo) may need manual update in LinkedIn admin');
    }
    
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    
    if (err.message.includes('403') || err.message.includes('ACCESS_DENIED')) {
      console.log('\n💡 Tip: Make sure your app has rw_organization_admin scope');
      console.log('   You may need to re-authenticate with: npm run auth');
    }
    
    process.exit(1);
  }
}

main();
