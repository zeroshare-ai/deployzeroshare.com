import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Pricing Consistency Tests
 * 
 * These tests ensure pricing information is consistent across:
 * - Website pricing page
 * - Chatbot knowledge base
 * - AWS Marketplace docs
 * - Marketing materials
 * 
 * Source of truth: docs/aws/marketplace/pricing-guide.md
 */

// Official pricing tiers (source of truth)
const OFFICIAL_PRICING = {
  tiers: [
    { name: 'Free', users: 5, price: 0 },
    { name: 'Team', users: 25, price: 499 },
    { name: 'Business', users: 100, price: 1499 },
    { name: 'Enterprise', users: Infinity, price: null }, // Custom
  ]
};

test.describe('Pricing Consistency', () => {
  
  test('pricing page shows correct tier names', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check all tier names are present
    for (const tier of OFFICIAL_PRICING.tiers) {
      const tierElement = page.locator(`h3:has-text("${tier.name}")`);
      await expect(tierElement).toBeVisible();
    }
  });

  test('pricing page shows correct user limits', async ({ page }) => {
    await page.goto('/pricing');
    
    // Free tier: 5 users
    await expect(page.locator('text=Up to 5 users')).toBeVisible();
    
    // Team tier: 25 users
    await expect(page.locator('text=Up to 25 users')).toBeVisible();
    
    // Business tier: 100 users
    await expect(page.locator('text=Up to 100 users')).toBeVisible();
    
    // Enterprise tier: Unlimited
    await expect(page.locator('text=Unlimited users')).toBeVisible();
  });

  test('pricing page shows correct prices', async ({ page }) => {
    await page.goto('/pricing');
    
    // Free tier
    await expect(page.locator('text=Free').first()).toBeVisible();
    
    // Team tier: $499
    await expect(page.locator('text=$499')).toBeVisible();
    
    // Business tier: $1,499
    await expect(page.locator('text=$1,499')).toBeVisible();
    
    // Enterprise: Custom
    await expect(page.locator('text=Custom').first()).toBeVisible();
  });

  test('pricing page has exactly 4 tiers', async ({ page }) => {
    await page.goto('/pricing');
    
    // Count pricing cards (each tier has h3 with tier name)
    const tierCards = page.locator('h3').filter({ 
      hasText: /^(Free|Team|Business|Enterprise)$/ 
    });
    
    await expect(tierCards).toHaveCount(4);
  });

  test('chatbot knowledge base matches pricing', async () => {
    const knowledgeBasePath = path.join(
      __dirname, 
      '../amplify/backend/function/chatbot/knowledge-base.js'
    );
    
    const content = fs.readFileSync(knowledgeBasePath, 'utf-8');
    
    // Check tier names
    expect(content).toContain('"name": "Free"');
    expect(content).toContain('"name": "Team"');
    expect(content).toContain('"name": "Business"');
    expect(content).toContain('"name": "Enterprise"');
    
    // Check prices
    expect(content).toContain('$499/month');
    expect(content).toContain('$1,499/month');
    
    // Check user limits
    expect(content).toContain('Up to 5 users');
    expect(content).toContain('Up to 25 users');
    expect(content).toContain('Up to 100 users');
    expect(content).toContain('Unlimited users');
    
    // Should NOT contain old incorrect values
    expect(content).not.toContain('Up to 50 users');
    expect(content).not.toContain('$299/month');
    expect(content).not.toContain('"name": "Startup"');
    expect(content).not.toContain('"name": "Professional"');
  });

  test('AWS marketplace pricing guide is source of truth', async () => {
    const pricingGuidePath = path.join(
      __dirname, 
      '../docs/aws/marketplace/pricing-guide.md'
    );
    
    const content = fs.readFileSync(pricingGuidePath, 'utf-8');
    
    // Verify source of truth has correct values
    expect(content).toContain('Up to 5 Users');
    expect(content).toContain('Up to 25 Users');
    expect(content).toContain('Up to 100 Users');
    expect(content).toContain('Unlimited Users');
    
    expect(content).toContain('$499');
    expect(content).toContain('$1,499');
  });

  test('cursorrules has correct pricing reference', async () => {
    const cursorrrulesPath = path.join(__dirname, '../.cursorrules');
    
    const content = fs.readFileSync(cursorrrulesPath, 'utf-8');
    
    // Check pricing table exists with correct values
    expect(content).toContain('| **Free** | 5 |');
    expect(content).toContain('| **Team** | 25 | $499');
    expect(content).toContain('| **Business** | 100 | $1,499');
    expect(content).toContain('| **Enterprise** | Unlimited |');
  });
});

test.describe('Pricing Anti-Regression', () => {
  
  test('no files contain old incorrect pricing', async () => {
    const filesToCheck = [
      'app/pricing/page.tsx',
      'amplify/backend/function/chatbot/knowledge-base.js',
      '.cursorrules',
      'docs/MULTI_PROJECT_ARCHITECTURE.md',
    ];
    
    const incorrectPatterns = [
      /Up to 50 users/i,           // Old Professional tier
      /\$299.*month/i,              // Old Professional price
      /"Startup"/,                  // Old tier name
      /"Professional"/,             // Old tier name  
    ];
    
    for (const file of filesToCheck) {
      const filePath = path.join(__dirname, '..', file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        for (const pattern of incorrectPatterns) {
          expect(
            content, 
            `File ${file} contains outdated pricing: ${pattern}`
          ).not.toMatch(pattern);
        }
      }
    }
  });
});
