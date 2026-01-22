import { test, expect } from '@playwright/test';

/**
 * Post-deployment verification tests
 * These tests verify the site works correctly after deployment
 * Run with: BASE_URL=https://deployzeroshare.com npm run test:deployed
 */
test.describe('Post-Deployment Verification', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    await expect(page.locator('h1')).toContainText('Stop Data Leaks');
  });

  test('all critical pages return 200', async ({ page }) => {
    const pages = ['/', '/support', '/privacy', '/terms', '/compliance', '/docs'];
    
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors (like missing docs/index.json)
    const criticalErrors = errors.filter(err => 
      !err.includes('index.json') && 
      !err.includes('favicon') &&
      !err.includes('404')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('all images load correctly', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      if (src && !src.startsWith('data:')) {
        const response = await page.request.get(src);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('navigation is functional', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const navLinks = [
      { name: 'Features', url: '/#solution' },
      { name: 'Documentation', url: '/docs' },
      { name: 'Support', url: '/support' },
    ];
    
    for (const link of navLinks) {
      const navLink = page.locator('nav').getByRole('link', { name: link.name });
      await expect(navLink).toBeVisible();
      
      if (!link.url.includes('#')) {
        await navLink.click();
        await expect(page).toHaveURL(new RegExp(link.url));
        await page.goBack();
      }
    }
  });

  test('support form API endpoint is configured', async ({ page }) => {
    await page.goto('/support');
    
    // Check that the form exists
    await expect(page.locator('form')).toBeVisible();
    
    // Fill out form
    await page.fill('input[name="name"]', 'Deployment Test');
    await page.fill('input[name="email"]', 'test@deployzeroshare.com');
    await page.selectOption('select[name="priority"]', 'normal');
    await page.fill('input[name="subject"]', 'Deployment Verification');
    await page.fill('textarea[name="message"]', 'This is an automated deployment verification test.');
    
    // Intercept the API call
    let apiUrl = '';
    page.on('request', request => {
      const url = request.url();
      if (url.includes('support') || url.includes('execute-api')) {
        apiUrl = url;
      }
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Submit Support Case' }).click();
    
    // Wait for request
    await page.waitForTimeout(2000);
    
    // Verify API endpoint was called (even if it fails, the endpoint should be configured)
    // This test verifies the form is trying to reach the API
    expect(apiUrl).toBeTruthy();
  });

  test('legal pages are accessible and complete', async ({ page }) => {
    const legalPages = [
      { path: '/privacy', title: 'Privacy Policy' },
      { path: '/terms', title: 'Terms of Service' },
      { path: '/compliance', title: 'Compliance & Security' },
    ];
    
    for (const { path, title } of legalPages) {
      await page.goto(path);
      await expect(page.locator('h1')).toContainText(title);
      
      // Check that content exists (not just a header)
      const content = await page.locator('main').textContent();
      expect(content?.length).toBeGreaterThan(500); // Should have substantial content
    }
  });
});
