import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Screenshot Tests
 * 
 * Captures screenshots of key pages for visual review.
 * These are NOT automated visual regression tests, but provide
 * artifacts for manual review before deployment.
 */

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';

// Ensure screenshot directory exists
const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'support', path: '/support' },
  { name: 'contact-us', path: '/contact-us' },
  { name: 'pricing', path: '/pricing' },
  { name: 'blog', path: '/blog' },
  { name: 'docs', path: '/docs' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

test.describe('Visual Screenshots', () => {
  
  for (const pageInfo of pages) {
    for (const viewport of viewports) {
      test(`${pageInfo.name} - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`${BASE_URL}${pageInfo.path}`);
        
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000); // Extra time for animations
        
        const screenshotPath = path.join(screenshotDir, `${pageInfo.name}-${viewport.name}.png`);
        await page.screenshot({ 
          path: screenshotPath, 
          fullPage: true 
        });
        
        // Verify screenshot was created
        expect(fs.existsSync(screenshotPath)).toBe(true);
      });
    }
  }
});

test.describe('Form State Screenshots', () => {
  
  test('support form - empty state', async ({ page }) => {
    await page.goto(`${BASE_URL}/support`);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: path.join(screenshotDir, 'support-form-empty.png'),
      fullPage: true,
    });
  });

  test('support form - filled state', async ({ page }) => {
    await page.goto(`${BASE_URL}/support`);
    await page.waitForLoadState('networkidle');
    
    // Fill form
    await page.fill('input[name="name"]', 'John Smith');
    await page.fill('input[name="email"]', 'john@company.com');
    await page.fill('textarea[name="message"]', 'This is a test message for visual verification.');
    
    await page.screenshot({
      path: path.join(screenshotDir, 'support-form-filled.png'),
      fullPage: true,
    });
  });

  test('support form - error state', async ({ page }) => {
    await page.goto(`${BASE_URL}/support`);
    await page.waitForLoadState('networkidle');
    
    // Try to submit empty form to trigger validation
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: path.join(screenshotDir, 'support-form-validation.png'),
      fullPage: true,
    });
  });
});

test.describe('Interactive Element Screenshots', () => {
  
  test('navigation hover states', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Hover over nav item
    await page.hover('nav a[href="/pricing"]');
    await page.waitForTimeout(300);
    
    await page.screenshot({
      path: path.join(screenshotDir, 'nav-hover.png'),
    });
  });

  test('button hover states', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Find and hover over CTA button
    const ctaButton = page.locator('a:has-text("Get a Demo")').first();
    await ctaButton.hover();
    await page.waitForTimeout(300);
    
    await page.screenshot({
      path: path.join(screenshotDir, 'cta-hover.png'),
    });
  });
});
