import { test, expect } from '@playwright/test';

/**
 * Support form functionality tests
 * Verifies the support form works correctly
 */
test.describe('Support Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/support');
  });

  test('form displays correctly', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('select[name="priority"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit Support Case' })).toBeVisible();
  });

  test('form validation works', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: 'Submit Support Case' }).click();
    
    // HTML5 validation should prevent submission
    // Check that required fields are marked
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    
    // Check HTML5 validation
    const nameValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    const emailValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    expect(nameValid).toBe(false);
    expect(emailValid).toBe(false);
  });

  test('form can be filled out', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.selectOption('select[name="priority"]', 'normal');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the support form.');
    
    // Verify fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="company"]')).toHaveValue('Test Company');
    await expect(page.locator('select[name="priority"]')).toHaveValue('normal');
    await expect(page.locator('input[name="subject"]')).toHaveValue('Test Subject');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('This is a test message for the support form.');
  });

  test('form submission attempts API call', async ({ page }) => {
    // Intercept API calls
    let apiCallMade = false;
    let apiUrl = '';
    
    page.on('request', request => {
      if (request.url().includes('/support') || request.url().includes('execute-api')) {
        apiCallMade = true;
        apiUrl = request.url();
      }
    });
    
    // Fill out form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="priority"]', 'normal');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Submit form
    await page.getByRole('button', { name: 'Submit Support Case' }).click();
    
    // Wait a bit for the request
    await page.waitForTimeout(1000);
    
    // Verify API call was attempted (may fail if API is not available, but that's OK for smoke test)
    // The important thing is that the form tried to submit
    expect(apiCallMade).toBe(true);
    expect(apiUrl).toBeTruthy();
  });

  test('form shows success message after submission', async ({ page, request }) => {
    // Mock successful API response
    await page.route('**/support*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Fill out and submit form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="priority"]', 'normal');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.getByRole('button', { name: 'Submit Support Case' }).click();
    
    // Wait for success message
    await expect(page.getByText('Support Case Submitted')).toBeVisible({ timeout: 5000 });
  });

  test('form shows error message on API failure', async ({ page }) => {
    // Mock failed API response
    await page.route('**/support*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    
    // Fill out and submit form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="priority"]', 'normal');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.getByRole('button', { name: 'Submit Support Case' }).click();
    
    // Wait for error message
    await expect(page.getByText(/error|failed/i)).toBeVisible({ timeout: 5000 });
  });
});
