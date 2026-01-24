#!/usr/bin/env node
/**
 * LinkedIn Company Profile Manager
 * 
 * Manages the ZeroShare company page profile via LinkedIn API.
 * Requires: rw_organization_admin scope (Community Management API)
 * 
 * Usage:
 *   node company-profile.js --get      # Fetch current profile
 *   node company-profile.js --preview  # Preview what would be updated
 *   node company-profile.js --update   # Update profile via API
 */

import fetch from 'node-fetch';
import { config, requireAccessToken } from './config.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════════════════
// COMPANY PROFILE CONTENT - Edit this section to update your LinkedIn page
// ═══════════════════════════════════════════════════════════════════════════

const companyProfile = {
  // Localized name (cannot be changed via API)
  localizedName: 'ZeroShare',
  
  // Tagline - shows below company name (120 chars max)
  // NOTE: Tagline cannot be updated via API, must be done manually
  localizedTagline: 'Stop AI Data Leaks Before They Start | Enable ChatGPT, Copilot & Claude Safely',
  
  // About section - shows on company page (2000 chars max)
  description: {
    localized: {
      en_US: `Your employees are using AI. The question is: do you have visibility?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE PROBLEM

65% of employees have shared sensitive data with ChatGPT, Copilot, or Claude—without authorization.

Every prompt is a potential breach:
• Customer SSNs pasted into support chats
• API keys shared in code reviews
• Medical records summarized for reports
• Financial data analyzed for trends

Once it's sent, it's in their training data. Forever.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE SOLUTION

ZeroShare Gateway is the security layer between your employees and AI.

Deploy on-premise. Maintain complete control. Enable productivity without risk.

✓ Automatic PII detection (50+ patterns)
✓ Secrets blocking (API keys, credentials, tokens)
✓ Complete audit logging for compliance
✓ Works with ChatGPT, Copilot, Claude, Cursor & more
✓ Sub-5ms latency—users won't notice

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY ZEROSHARE

• On-premise: Your data never leaves your network
• Instant visibility: See every AI request in real-time
• Compliance-ready: SOC 2, HIPAA, GDPR aligned
• Fast deployment: Live in hours, not months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET STARTED

Free tier available for teams up to 5 users.
Deploy from AWS Marketplace in minutes.

🔗 deployzeroshare.com
📧 support@deployzeroshare.com`
    },
    preferredLocale: {
      country: 'US',
      language: 'en'
    }
  },
  
  // Website URL
  website: {
    localized: {
      en_US: 'https://deployzeroshare.com'
    },
    preferredLocale: {
      country: 'US',
      language: 'en'
    }
  },
  
  // Specialties (keywords for search)
  specialties: {
    tags: [
      'AI Security',
      'Data Loss Prevention',
      'PII Protection',
      'Secrets Management',
      'Enterprise Security',
      'Compliance Automation',
      'HIPAA',
      'SOC 2',
      'GDPR',
      'ChatGPT Security',
      'GitHub Copilot Security',
      'LLM Security',
      'Cloud Security',
      'Zero Trust',
      'DevSecOps'
    ]
  },

  // Staff count range
  staffCountRange: 'SIZE_2_TO_10',

  // Industry URN (Computer & Network Security = 118)
  industries: ['urn:li:industry:118']
};

// ═══════════════════════════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

const API_BASE = 'https://api.linkedin.com/rest';

async function fetchCurrentProfile() {
  const token = requireAccessToken();
  
  const url = `${API_BASE}/organizations/${config.companyId}`;
  
  console.log(`📥 Fetching profile for organization: ${config.companyId}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': config.apiVersion,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error (${response.status}): ${error}`);
  }

  return await response.json();
}

async function updateProfile() {
  const token = requireAccessToken();
  
  const url = `${API_BASE}/organizations/${config.companyId}`;
  
  // Build the patch payload - only include fields that can be updated via API
  const patchPayload = {
    patch: {
      $set: {
        description: companyProfile.description,
        website: companyProfile.website,
        specialties: companyProfile.specialties,
        staffCountRange: companyProfile.staffCountRange,
        industries: companyProfile.industries
      }
    }
  };

  console.log(`📤 Updating profile for organization: ${config.companyId}`);
  console.log('\nPayload preview:');
  console.log(JSON.stringify(patchPayload, null, 2));
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'X-Restli-Method': 'PARTIAL_UPDATE',
      'LinkedIn-Version': config.apiVersion,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patchPayload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error (${response.status}): ${error}`);
  }

  // 204 No Content means success for PARTIAL_UPDATE
  if (response.status === 204) {
    return { success: true, message: 'Profile updated successfully' };
  }

  return await response.json();
}

async function uploadLogo(imagePath) {
  const token = requireAccessToken();
  
  console.log(`📸 Uploading logo from: ${imagePath}`);
  
  // Step 1: Register the upload
  const registerUrl = `${API_BASE}/images?action=initializeUpload`;
  
  const registerResponse = await fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': config.apiVersion,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: `urn:li:organization:${config.companyId}`
      }
    })
  });

  if (!registerResponse.ok) {
    const error = await registerResponse.text();
    throw new Error(`Failed to register upload: ${error}`);
  }

  const { value } = await registerResponse.json();
  const uploadUrl = value.uploadUrl;
  const imageUrn = value.image;

  // Step 2: Upload the image
  const imageData = fs.readFileSync(imagePath);
  
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/octet-stream'
    },
    body: imageData
  });

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text();
    throw new Error(`Failed to upload image: ${error}`);
  }

  console.log(`✅ Logo uploaded: ${imageUrn}`);
  
  // Step 3: Update the organization with the new logo
  const patchPayload = {
    patch: {
      $set: {
        logoV2: {
          original: imageUrn,
          cropped: imageUrn,
          cropInfo: { x: 0, y: 0, width: 0, height: 0 }
        }
      }
    }
  };

  const updateResponse = await fetch(`${API_BASE}/organizations/${config.companyId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'X-Restli-Method': 'PARTIAL_UPDATE',
      'LinkedIn-Version': config.apiVersion,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patchPayload)
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.text();
    throw new Error(`Failed to update logo: ${error}`);
  }

  return { success: true, imageUrn };
}

// ═══════════════════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🏢 LinkedIn Company Profile Manager\n');
  console.log(`Company ID: ${config.companyId}`);
  
  const args = process.argv.slice(2);
  const action = args[0] || '--preview';

  console.log(`Action: ${action.replace('--', '')}\n`);

  try {
    if (action === '--get') {
      // Fetch and display current profile
      const profile = await fetchCurrentProfile();
      console.log('\n📋 Current Profile:');
      console.log(JSON.stringify(profile, null, 2));
      
    } else if (action === '--preview') {
      // Preview what would be updated
      console.log('📋 Profile Preview (what would be sent to LinkedIn):\n');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`\n📛 Name: ${companyProfile.localizedName}`);
      console.log(`\n💬 Tagline: ${companyProfile.localizedTagline}`);
      console.log(`   ⚠️  (Tagline requires manual update in LinkedIn admin)`);
      console.log(`\n🔗 Website: ${companyProfile.website.localized.en_US}`);
      console.log(`\n👥 Staff: ${companyProfile.staffCountRange}`);
      console.log(`\n🏭 Industry: ${companyProfile.industries.join(', ')}`);
      console.log(`\n🏷️  Specialties (${companyProfile.specialties.tags.length}):`);
      companyProfile.specialties.tags.forEach(s => console.log(`   • ${s}`));
      console.log('\n📝 Description:');
      console.log('───────────────────────────────────────────────────────────');
      console.log(companyProfile.description.localized.en_US);
      console.log('═══════════════════════════════════════════════════════════');
      console.log('\n✅ To apply these changes, run: npm run profile:update');
      
    } else if (action === '--update') {
      // Update profile via API
      console.log('🔄 Updating profile via LinkedIn API...\n');
      
      const result = await updateProfile();
      
      if (result.success) {
        console.log('\n✅ Profile updated successfully!');
        console.log('\n📋 Fields updated:');
        console.log('   • Description');
        console.log('   • Website');
        console.log('   • Specialties');
        console.log('   • Staff count range');
        console.log('   • Industry');
        console.log('\n⚠️  Manual updates still required for:');
        console.log('   • Tagline (LinkedIn admin panel)');
        console.log('   • Logo (use: npm run profile:logo)');
        console.log('   • Cover image (LinkedIn admin panel)');
        console.log('\n🔗 View your page: https://www.linkedin.com/company/' + config.companyId);
      } else {
        console.log('Result:', result);
      }
      
    } else if (action === '--logo') {
      // Upload logo
      const logoPath = args[1] || join(__dirname, '../../public/logo_150x150.png');
      
      if (!fs.existsSync(logoPath)) {
        console.error(`❌ Logo file not found: ${logoPath}`);
        process.exit(1);
      }
      
      const result = await uploadLogo(logoPath);
      console.log('\n✅ Logo uploaded and applied successfully!');
      console.log(`   Image URN: ${result.imageUrn}`);
      
    } else {
      console.log('Usage:');
      console.log('  --get       Fetch current profile from LinkedIn');
      console.log('  --preview   Preview what would be updated');
      console.log('  --update    Update profile via API');
      console.log('  --logo [path]  Upload logo (default: public/logo_150x150.png)');
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    
    if (error.message.includes('Not enough permissions')) {
      console.log('\n💡 You need the "rw_organization_admin" scope.');
      console.log('   Request "Community Management API" access at:');
      console.log('   https://www.linkedin.com/developers/apps/228538213/products');
      console.log('\n   After approval, re-run: npm run auth');
    }
    
    process.exit(1);
  }
}

main();
