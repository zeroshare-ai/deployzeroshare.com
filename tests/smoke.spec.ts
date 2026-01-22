import { test, expect } from '@playwright/test';

/**
 * Smoke tests - Critical functionality that must work
 * These tests verify the core user journey and critical features
 */
test.describe('Smoke Tests', () => {
  test('homepage loads and displays main content', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Stop Data Leaks Before They Reach AI');
    
    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check CTA buttons are present
    await expect(page.getByText('Deploy on AWS Marketplace')).toBeVisible();
    await expect(page.getByText('Learn How It Works')).toBeVisible();
  });

  test('navigation header button works', async ({ page }) => {
    await page.goto('/');
    
    // Find the Marketplace button in navigation
    const navButton = page.locator('nav').getByText('Deploy on AWS Marketplace');
    await expect(navButton).toBeVisible();
    
    // Click and verify alert appears (since it's a placeholder)
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('AWS Marketplace listing coming soon');
      dialog.accept();
    });
    
    await navButton.click();
  });

  test('hero section marketplace button works', async ({ page }) => {
    await page.goto('/');
    
    // Find the hero CTA button
    const heroButton = page.getByText('Deploy on AWS Marketplace').first();
    await expect(heroButton).toBeVisible();
    
    // Click and verify alert appears
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('AWS Marketplace listing coming soon');
      dialog.accept();
    });
    
    await heroButton.click();
  });

  test('support form page loads', async ({ page }) => {
    await page.goto('/support');
    
    await expect(page.locator('h1')).toContainText('Open a Support Case');
    await expect(page.locator('form')).toBeVisible();
    
    // Check form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('legal pages are accessible', async ({ page }) => {
    // Privacy Policy
    await page.goto('/privacy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Terms of Service
    await page.goto('/terms');
    await expect(page.locator('h1')).toContainText('Terms of Service');
    
    // Compliance
    await page.goto('/compliance');
    await expect(page.locator('h1')).toContainText('Compliance & Security');
  });
});
