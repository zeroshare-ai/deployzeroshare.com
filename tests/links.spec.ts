import { test, expect } from '@playwright/test';

/**
 * Link validation tests
 * Ensures all internal and external links work correctly
 */
test.describe('Link Validation', () => {
  test('all footer links work', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test Privacy Policy link
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLink).toBeVisible();
    await privacyLink.click();
    await expect(page).toHaveURL(/.*\/privacy/);
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Go back and test Terms
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const termsLink = page.getByRole('link', { name: 'Terms of Service' });
    await expect(termsLink).toBeVisible();
    await termsLink.click();
    await expect(page).toHaveURL(/.*\/terms/);
    await expect(page.locator('h1')).toContainText('Terms of Service');
    
    // Go back and test Compliance
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const complianceLink = page.getByRole('link', { name: 'Compliance' });
    await expect(complianceLink).toBeVisible();
    await complianceLink.click();
    await expect(page).toHaveURL(/.*\/compliance/);
    await expect(page.locator('h1')).toContainText('Compliance');
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Test Features link (anchor link)
    const featuresLink = page.locator('nav').getByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await featuresLink.click();
    // Should scroll to solution section
    await page.waitForTimeout(500); // Wait for scroll
    
    // Test Documentation link
    await page.goto('/');
    const docsLink = page.locator('nav').getByRole('link', { name: 'Documentation' });
    await expect(docsLink).toBeVisible();
    await docsLink.click();
    await expect(page).toHaveURL(/.*\/docs/);
    
    // Test Support link
    await page.goto('/');
    const supportLink = page.locator('nav').getByRole('link', { name: 'Support' });
    await expect(supportLink).toBeVisible();
    await supportLink.click();
    await expect(page).toHaveURL(/.*\/support/);
  });

  test('support section links work', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to support section
    const supportLink = page.getByRole('link', { name: 'Open Support Case' });
    await supportLink.scrollIntoViewIfNeeded();
    await expect(supportLink).toBeVisible();
    await supportLink.click();
    await expect(page).toHaveURL(/.*\/support/);
  });

  test('external links have correct attributes', async ({ page }) => {
    await page.goto('/');
    
    // Check GitHub link
    const githubLink = page.getByRole('link', { name: /GitHub/ }).first();
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
  });

  test('no broken internal links', async ({ page }) => {
    await page.goto('/');
    
    // Get all internal links
    const links = page.locator('a[href^="/"], a[href^="#"]');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('/')) {
        // Skip anchor links for now
        if (!href.includes('#')) {
          const response = await page.request.get(href);
          expect(response.status()).toBeLessThan(400);
        }
      }
    }
  });
});
