import { test, expect } from '@playwright/test';

/**
 * Pre-Deployment QA Checklist
 * 
 * These tests MUST pass before any deployment to production.
 * They cover critical user journeys and functionality.
 */

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';

test.describe('Critical Path Tests - MUST PASS BEFORE DEPLOYMENT', () => {

  test.describe('Homepage', () => {
    test('homepage loads successfully', async ({ page }) => {
      const response = await page.goto(BASE_URL);
      expect(response?.status()).toBe(200);
    });

    test('homepage has correct title', async ({ page }) => {
      await page.goto(BASE_URL);
      const title = await page.title();
      expect(title).toContain('ZeroShare');
    });

    test('navigation is visible and functional', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check nav exists
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Check key links exist
      await expect(page.locator('nav a[href="/pricing"]')).toBeVisible();
      await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
    });

    test('CTA buttons are visible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // At least one CTA should be visible
      const ctaButtons = page.locator('a:has-text("Get a Demo"), a:has-text("Deploy on AWS")');
      const count = await ctaButtons.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Support Form - CRITICAL', () => {
    test('support page loads', async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/support`);
      expect(response?.status()).toBe(200);
    });

    test('support form renders correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      // Form elements must exist
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('textarea[name="message"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('support form can be filled out', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@test.com');
      await page.fill('textarea[name="message"]', 'Test message');
      
      // Verify values are set
      expect(await page.inputValue('input[name="name"]')).toBe('Test User');
      expect(await page.inputValue('input[name="email"]')).toBe('test@test.com');
    });

    test('support form submission does not throw network error', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      // Track network errors
      let networkError = false;
      page.on('requestfailed', () => {
        networkError = true;
      });
      
      // Fill and submit
      await page.fill('input[name="name"]', 'QA Test');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('textarea[name="message"]', 'Pre-deployment QA test');
      
      await page.click('button[type="submit"]');
      
      // Wait for network activity
      await page.waitForTimeout(5000);
      
      // Check for "Failed to fetch" in the page
      const pageContent = await page.content();
      const hasFetchError = pageContent.toLowerCase().includes('failed to fetch');
      
      expect(hasFetchError).toBe(false);
      expect(networkError).toBe(false);
    });
  });

  test.describe('Contact Sales Form - CRITICAL', () => {
    test('contact page loads', async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/contact-us`);
      expect(response?.status()).toBe(200);
    });

    test('contact form renders correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });
  });

  test.describe('Key Pages Load', () => {
    const pages = [
      { path: '/pricing', title: 'Pricing' },
      { path: '/blog', title: 'Blog' },
      { path: '/docs', title: 'Documentation' },
      { path: '/privacy', title: 'Privacy' },
      { path: '/terms', title: 'Terms' },
    ];

    for (const pageInfo of pages) {
      test(`${pageInfo.path} loads successfully`, async ({ page }) => {
        const response = await page.goto(`${BASE_URL}${pageInfo.path}`);
        expect(response?.status()).toBe(200);
        
        // Should not show homepage content (routing error)
        const title = await page.title();
        expect(title.toLowerCase()).toContain(pageInfo.title.toLowerCase());
      });
    }
  });

  test.describe('No Console Errors', () => {
    test('homepage has no critical console errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(BASE_URL);
      await page.waitForTimeout(2000);
      
      // Filter out known non-critical errors
      const criticalErrors = errors.filter(e => 
        !e.includes('favicon') && 
        !e.includes('analytics') &&
        !e.includes('gtag')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });

    test('support page has no critical console errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(`${BASE_URL}/support`);
      await page.waitForTimeout(2000);
      
      const criticalErrors = errors.filter(e => 
        !e.includes('favicon') && 
        !e.includes('analytics') &&
        !e.includes('gtag')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('homepage is mobile-friendly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto(BASE_URL);
      
      // Page should not have horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // Small tolerance
    });
  });
});

test.describe('Regression Tests', () => {
  
  test('all navigation links work', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const navLinks = page.locator('nav a[href^="/"]');
    const count = await navLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.includes('#')) {
        const response = await page.goto(`${BASE_URL}${href}`);
        expect(response?.status()).toBe(200);
      }
    }
  });

  test('footer links work', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check a sample of footer links
    const footerLinks = ['/support', '/privacy', '/terms'];
    
    for (const link of footerLinks) {
      const response = await page.goto(`${BASE_URL}${link}`);
      expect(response?.status()).toBe(200);
    }
  });
});
