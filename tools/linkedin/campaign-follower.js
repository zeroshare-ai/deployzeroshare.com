#!/usr/bin/env node
/**
 * LinkedIn Follower Campaign - Aggressive Growth
 * 
 * Creates targeted follower ad campaigns to grow ZeroShare's LinkedIn presence.
 * Targets security professionals, CISOs, compliance managers, and DevSecOps engineers.
 * 
 * Usage:
 *   node campaign-follower.js --preview     # See what would be created
 *   node campaign-follower.js --create      # Create the campaign (requires LINKEDIN_LIVE_MODE=true)
 *   node campaign-follower.js --status      # Check campaign status
 */

import { config, requireAccessToken, requireLiveMode } from './config.js';

const API_BASE = 'https://api.linkedin.com/rest';
const COMPANY_URN = `urn:li:organization:${config.companyId}`;

// =============================================================================
// AGGRESSIVE TARGETING - Security Decision Makers
// =============================================================================

const TARGETING = {
  // Job Titles - The people who buy security software
  jobTitles: [
    'Chief Information Security Officer',
    'CISO',
    'VP of Security',
    'Director of Security',
    'Head of Security',
    'Security Architect',
    'Security Engineer',
    'DevSecOps Engineer',
    'Application Security Engineer',
    'Cloud Security Engineer',
    'Compliance Manager',
    'Compliance Officer',
    'Chief Compliance Officer',
    'Data Protection Officer',
    'DPO',
    'Privacy Officer',
    'IT Security Manager',
    'Information Security Manager',
    'Cybersecurity Manager',
    'Security Operations Manager',
    'SOC Manager',
    'GRC Manager',
    'Risk Manager',
    'IT Director',
    'CTO',
    'VP of Engineering',
    'Director of Engineering',
    'Platform Engineer',
    'Infrastructure Engineer',
  ],

  // Job Functions
  jobFunctions: [
    'Information Technology',
    'Engineering',
    'Operations',
    'Legal',
  ],

  // Seniority Levels - Decision makers only
  seniorities: [
    'Director',
    'VP',
    'CXO',
    'Partner',
    'Owner',
    'Manager',
    'Senior',
  ],

  // Industries that need AI security
  industries: [
    'Financial Services',
    'Banking',
    'Insurance',
    'Healthcare',
    'Hospital & Health Care',
    'Pharmaceuticals',
    'Biotechnology',
    'Information Technology and Services',
    'Computer Software',
    'Computer & Network Security',
    'Internet',
    'Legal Services',
    'Law Practice',
    'Government Administration',
    'Defense & Space',
    'Telecommunications',
    'Utilities',
    'Oil & Energy',
    'Retail',
    'E-Learning',
    'Higher Education',
  ],

  // Company Sizes - Mid-market to Enterprise
  companySizes: [
    '51-200',
    '201-500',
    '501-1000',
    '1001-5000',
    '5001-10000',
    '10001+',
  ],

  // Geographic - English-speaking markets first
  locations: [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'Singapore',
    'Israel',
  ],

  // Skills - People who work with AI
  skills: [
    'Artificial Intelligence',
    'Machine Learning',
    'ChatGPT',
    'Large Language Models',
    'LLM',
    'Natural Language Processing',
    'Data Security',
    'Information Security',
    'Cybersecurity',
    'Cloud Security',
    'Data Privacy',
    'GDPR',
    'HIPAA',
    'SOC 2',
    'Compliance',
    'Risk Management',
    'DevSecOps',
    'Application Security',
  ],

  // Interests/Groups
  interests: [
    'Cybersecurity',
    'Data Privacy',
    'Artificial Intelligence',
    'Enterprise Software',
    'Cloud Computing',
    'Digital Transformation',
  ],
};

// =============================================================================
// CAMPAIGN CONFIGURATIONS
// =============================================================================

// Budget tiers - set LINKEDIN_AD_BUDGET in .env (default: starter)
const BUDGET_TIER = process.env.LINKEDIN_AD_BUDGET || 'starter';

const BUDGET_CONFIGS = {
  // $10/day = $300/month - Good starting point
  starter: {
    daily: 10,
    campaigns: [
      { name: 'Security Decision Makers', budget: 10, bid: 8 },
    ],
  },
  // $20/day = $600/month - More reach
  growth: {
    daily: 20,
    campaigns: [
      { name: 'CISOs & Leaders', budget: 10, bid: 10 },
      { name: 'Security Engineers', budget: 10, bid: 6 },
    ],
  },
  // $50/day = $1500/month - Aggressive
  scale: {
    daily: 50,
    campaigns: [
      { name: 'CISOs & Leaders', budget: 20, bid: 12 },
      { name: 'Compliance & Privacy', budget: 15, bid: 8 },
      { name: 'Security Engineers', budget: 15, bid: 6 },
    ],
  },
};

const CAMPAIGNS = BUDGET_TIER === 'starter' ? [
  {
    name: 'ZeroShare Followers - Security Decision Makers',
    description: 'Target security leaders, compliance managers, and engineers',
    dailyBudget: 10, // $300/month
    targeting: {
      titles: TARGETING.jobTitles,
      seniorities: ['Manager', 'Director', 'VP', 'CXO'],
      industries: ['Financial Services', 'Healthcare', 'Computer Software', 'Computer & Network Security'],
      companySizes: ['201-500', '501-1000', '1001-5000', '5001-10000'],
      locations: ['United States'],
    },
    bidAmount: 8,
  },
] : BUDGET_TIER === 'growth' ? [
  {
    name: 'ZeroShare Followers - CISOs & Security Leaders',
    description: 'Target C-level security executives and directors',
    dailyBudget: 10,
    targeting: {
      titles: TARGETING.jobTitles.filter(t => 
        t.includes('Chief') || t.includes('CISO') || t.includes('VP') || 
        t.includes('Director') || t.includes('Head')
      ),
      seniorities: ['CXO', 'VP', 'Director'],
      industries: TARGETING.industries.slice(0, 10),
      companySizes: ['501-1000', '1001-5000', '5001-10000', '10001+'],
      locations: ['United States', 'United Kingdom'],
    },
    bidAmount: 10,
  },
  {
    name: 'ZeroShare Followers - Security Engineers',
    description: 'Target security engineers and DevSecOps professionals',
    dailyBudget: 10,
    targeting: {
      titles: TARGETING.jobTitles.filter(t =>
        t.includes('Engineer') || t.includes('Architect') || t.includes('DevSecOps')
      ),
      seniorities: ['Senior', 'Manager'],
      skills: TARGETING.skills.filter(s => 
        s.includes('Security') || s.includes('DevSecOps')
      ),
      companySizes: ['201-500', '501-1000', '1001-5000'],
      locations: ['United States'],
    },
    bidAmount: 6,
  },
] : [
  // Scale tier - original aggressive config
  {
    name: 'ZeroShare Followers - CISOs & Security Leaders',
    description: 'Target C-level security executives and directors',
    dailyBudget: 20,
    targeting: {
      titles: TARGETING.jobTitles.filter(t => 
        t.includes('Chief') || t.includes('CISO') || t.includes('VP') || 
        t.includes('Director') || t.includes('Head')
      ),
      seniorities: ['CXO', 'VP', 'Director'],
      industries: TARGETING.industries,
      companySizes: ['501-1000', '1001-5000', '5001-10000', '10001+'],
      locations: ['United States', 'United Kingdom', 'Canada'],
    },
    bidAmount: 12,
  },
  {
    name: 'ZeroShare Followers - Compliance & Privacy',
    description: 'Target compliance managers, DPOs, and privacy officers',
    dailyBudget: 15,
    targeting: {
      titles: TARGETING.jobTitles.filter(t =>
        t.includes('Compliance') || t.includes('Privacy') || 
        t.includes('DPO') || t.includes('GRC') || t.includes('Risk')
      ),
      seniorities: ['Manager', 'Director', 'Senior'],
      industries: ['Financial Services', 'Healthcare', 'Legal Services', 'Banking', 'Insurance'],
      companySizes: TARGETING.companySizes,
      locations: TARGETING.locations,
    },
    bidAmount: 8,
  },
  {
    name: 'ZeroShare Followers - Security Engineers',
    description: 'Target security engineers and DevSecOps professionals',
    dailyBudget: 15,
    targeting: {
      titles: TARGETING.jobTitles.filter(t =>
        t.includes('Engineer') || t.includes('Architect') || t.includes('DevSecOps')
      ),
      seniorities: ['Senior', 'Manager'],
      skills: TARGETING.skills.filter(s => 
        s.includes('Security') || s.includes('DevSecOps') || s.includes('AI') || s.includes('LLM')
      ),
      companySizes: ['201-500', '501-1000', '1001-5000', '5001-10000'],
      locations: ['United States', 'Canada', 'United Kingdom'],
    },
    bidAmount: 6,
  },
];

// =============================================================================
// API HELPERS
// =============================================================================

async function linkedInAPI(endpoint, method = 'GET', body = null) {
  const token = requireAccessToken();
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': config.apiVersion,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const text = await response.text();
  
  if (!response.ok) {
    throw new Error(`LinkedIn API Error ${response.status}: ${text}`);
  }
  
  return text ? JSON.parse(text) : null;
}

// Get ad account ID
async function getAdAccount() {
  try {
    const response = await linkedInAPI('/adAccounts?q=search');
    if (response.elements && response.elements.length > 0) {
      return response.elements[0];
    }
    throw new Error('No ad account found');
  } catch (error) {
    console.error('Error fetching ad account:', error.message);
    return null;
  }
}

// =============================================================================
// CAMPAIGN OPERATIONS
// =============================================================================

async function previewCampaigns() {
  console.log('\n🎯 AGGRESSIVE FOLLOWER GROWTH CAMPAIGN PREVIEW\n');
  console.log('═'.repeat(60));
  
  let totalDailyBudget = 0;
  
  for (const campaign of CAMPAIGNS) {
    console.log(`\n📢 ${campaign.name}`);
    console.log(`   ${campaign.description}`);
    console.log(`   💰 Daily Budget: $${campaign.dailyBudget}`);
    console.log(`   💵 Bid per Follower: $${campaign.bidAmount}`);
    console.log(`   📊 Est. Daily Followers: ${Math.floor(campaign.dailyBudget / campaign.bidAmount)}-${Math.floor(campaign.dailyBudget / campaign.bidAmount * 1.5)}`);
    
    if (campaign.targeting.titles) {
      console.log(`   🎯 Titles: ${campaign.targeting.titles.slice(0, 3).join(', ')}...`);
    }
    if (campaign.targeting.industries) {
      console.log(`   🏢 Industries: ${campaign.targeting.industries.slice(0, 3).join(', ')}...`);
    }
    if (campaign.targeting.skills) {
      console.log(`   🛠️  Skills: ${campaign.targeting.skills.slice(0, 3).join(', ')}...`);
    }
    
    totalDailyBudget += campaign.dailyBudget;
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log(`\n💰 TOTAL DAILY BUDGET: $${totalDailyBudget}`);
  console.log(`💰 MONTHLY BUDGET: $${totalDailyBudget * 30}`);
  console.log(`📈 ESTIMATED MONTHLY FOLLOWERS: ${Math.floor(totalDailyBudget * 30 / 10)}-${Math.floor(totalDailyBudget * 30 / 6)}`);
  console.log('\n' + '═'.repeat(60));
  
  console.log('\n📋 FULL TARGETING CRITERIA:\n');
  console.log('Job Titles:');
  TARGETING.jobTitles.forEach(t => console.log(`   • ${t}`));
  console.log('\nIndustries:');
  TARGETING.industries.forEach(i => console.log(`   • ${i}`));
  console.log('\nSkills:');
  TARGETING.skills.forEach(s => console.log(`   • ${s}`));
  console.log('\nLocations:');
  TARGETING.locations.forEach(l => console.log(`   • ${l}`));
  
  console.log('\n⚠️  To create these campaigns, run: node campaign-follower.js --create');
  console.log('   (Requires LINKEDIN_LIVE_MODE=true in .env)\n');
}

async function createCampaigns() {
  if (!requireLiveMode()) {
    console.log('Set LINKEDIN_LIVE_MODE=true to create campaigns.');
    return;
  }
  
  console.log('\n🚀 CREATING FOLLOWER CAMPAIGNS...\n');
  
  const adAccount = await getAdAccount();
  if (!adAccount) {
    console.error('❌ Could not find ad account. Make sure your LinkedIn app has Ads API access.');
    console.error('   Visit: https://www.linkedin.com/developers/apps/228538213/products');
    return;
  }
  
  console.log(`✅ Found ad account: ${adAccount.id}`);
  console.log(`   Name: ${adAccount.name}`);
  console.log(`   Status: ${adAccount.status}\n`);
  
  // Note: Full campaign creation requires additional API setup
  // For now, we'll output the campaign specs that can be created in Campaign Manager
  
  console.log('═'.repeat(60));
  console.log('\n📋 CAMPAIGN SPECIFICATIONS FOR LINKEDIN CAMPAIGN MANAGER\n');
  console.log('Go to: https://www.linkedin.com/campaignmanager/accounts\n');
  
  for (const campaign of CAMPAIGNS) {
    console.log(`\n📢 Campaign: ${campaign.name}`);
    console.log('─'.repeat(50));
    console.log(`Objective: FOLLOWERS`);
    console.log(`Daily Budget: $${campaign.dailyBudget}.00`);
    console.log(`Bid Strategy: Maximum delivery`);
    console.log(`Bid Amount: $${campaign.bidAmount}.00 per result`);
    console.log(`\nTargeting:`);
    
    if (campaign.targeting.titles) {
      console.log(`  Job Titles:`);
      campaign.targeting.titles.forEach(t => console.log(`    - ${t}`));
    }
    if (campaign.targeting.seniorities) {
      console.log(`  Seniority: ${campaign.targeting.seniorities.join(', ')}`);
    }
    if (campaign.targeting.industries) {
      console.log(`  Industries:`);
      campaign.targeting.industries.forEach(i => console.log(`    - ${i}`));
    }
    if (campaign.targeting.skills) {
      console.log(`  Skills:`);
      campaign.targeting.skills.forEach(s => console.log(`    - ${s}`));
    }
    if (campaign.targeting.companySizes) {
      console.log(`  Company Sizes: ${campaign.targeting.companySizes.join(', ')}`);
    }
    if (campaign.targeting.locations) {
      console.log(`  Locations: ${campaign.targeting.locations.join(', ')}`);
    }
    console.log('');
  }
  
  console.log('═'.repeat(60));
  console.log('\n✅ Copy these specs into LinkedIn Campaign Manager to launch.\n');
}

async function checkStatus() {
  console.log('\n📊 CHECKING CAMPAIGN STATUS...\n');
  
  try {
    const adAccount = await getAdAccount();
    if (!adAccount) {
      console.log('No ad account found.');
      return;
    }
    
    console.log(`Ad Account: ${adAccount.name} (${adAccount.id})`);
    console.log(`Status: ${adAccount.status}`);
    console.log(`Currency: ${adAccount.currency}`);
    
    // Get campaigns
    const campaigns = await linkedInAPI(`/adAccounts/${adAccount.id}/adCampaigns`);
    
    if (campaigns.elements && campaigns.elements.length > 0) {
      console.log(`\nActive Campaigns: ${campaigns.elements.length}`);
      for (const c of campaigns.elements) {
        console.log(`  • ${c.name} - ${c.status}`);
      }
    } else {
      console.log('\nNo active campaigns found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// =============================================================================
// MAIN
// =============================================================================

const args = process.argv.slice(2);

if (args.includes('--preview') || args.length === 0) {
  previewCampaigns();
} else if (args.includes('--create')) {
  createCampaigns();
} else if (args.includes('--status')) {
  checkStatus();
} else {
  console.log('Usage:');
  console.log('  node campaign-follower.js --preview   # Preview campaigns');
  console.log('  node campaign-follower.js --create    # Create campaigns');
  console.log('  node campaign-follower.js --status    # Check status');
}
