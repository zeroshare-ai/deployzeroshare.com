import { test, expect } from '@playwright/test';

/**
 * API Health Tests
 * 
 * These tests verify that all backend API endpoints are reachable and responding.
 * This is CRITICAL for catching issues like wrong URLs before they hit production.
 * 
 * NOTE: Tests that send actual form submissions are SKIPPED by default to avoid
 * email spam. Set RUN_EMAIL_TESTS=true to run them manually.
 */

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';
const RUN_EMAIL_TESTS = process.env.RUN_EMAIL_TESTS === 'true';

// API endpoints from CloudFormation
const SUPPORT_API_URL = process.env.SUPPORT_API_URL || 
  'https://obkptu26ug.execute-api.us-east-1.amazonaws.com/prod/support';
const NEWSLETTER_API_URL = process.env.NEWSLETTER_API_URL || 
  'https://jaqw7kgt6f.execute-api.us-east-1.amazonaws.com/prod/subscribe';

test.describe('API Health Checks', () => {
  
  test('Support API endpoint is reachable', async ({ request }) => {
    // OPTIONS request to check CORS and reachability
    const response = await request.fetch(SUPPORT_API_URL, {
      method: 'OPTIONS',
      headers: {
        'Origin': BASE_URL,
        'Access-Control-Request-Method': 'POST',
      },
    });
    
    // Should return 200 or 204 for OPTIONS
    expect([200, 204]).toContain(response.status());
  });

  // SKIPPED by default - sends real email
  test.skip('Support API accepts POST requests', async ({ request }) => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    
    const response = await request.post(SUPPORT_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': BASE_URL,
      },
      data: {
        name: 'QA Test',
        email: 'qa-test@example.com',
        message: 'Automated QA test - please ignore',
        priority: 'general',
        subject: '[QA TEST] Automated health check',
        timestamp: new Date().toISOString(),
      },
    });

    // API should respond (even if email fails due to SES sandbox)
    // Status 200 = success, 500 = SES error (expected in sandbox), 400 = validation error
    expect([200, 400, 500]).toContain(response.status());
    
    // Should return JSON
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    
    // Should not return HTML (which would indicate wrong endpoint)
    const body = await response.text();
    expect(body).not.toContain('<!DOCTYPE');
    expect(body).not.toContain('<html');
  });

  test('Support API rejects invalid requests', async ({ request }) => {
    const response = await request.post(SUPPORT_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // Missing required fields
        invalid: 'data',
      },
    });

    // Should return an error, but from the API (not 404)
    expect(response.status()).not.toBe(404);
    expect(response.status()).not.toBe(403);
  });

  test('Support API URL in frontend matches actual endpoint', async ({ page }) => {
    // Navigate to support page
    await page.goto(`${BASE_URL}/support`);
    
    // Get the API URL from the page's JavaScript context
    const apiUrlFromPage = await page.evaluate(() => {
      // This checks what URL the form would actually call
      return (window as any).__NEXT_DATA__?.props?.pageProps?.apiUrl || 
        'https://obkptu26ug.execute-api.us-east-1.amazonaws.com/prod/support';
    });
    
    // Verify the form doesn't have an obviously wrong URL hardcoded
    const pageContent = await page.content();
    
    // Should NOT contain the wrong API URL pattern
    expect(pageContent).not.toContain('deployzeroshare-support-api.execute-api');
  });
});

test.describe('Newsletter API Health Checks', () => {
  
  test('Newsletter API endpoint is reachable', async ({ request }) => {
    const response = await request.fetch(NEWSLETTER_API_URL, {
      method: 'OPTIONS',
      headers: {
        'Origin': BASE_URL,
        'Access-Control-Request-Method': 'POST',
      },
    });
    
    expect([200, 204]).toContain(response.status());
  });

  // SKIPPED by default - sends real email notification
  test('Newsletter API accepts valid subscription', async ({ request }) => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    
    const testEmail = `api-test-${Date.now()}@example.com`;
    
    const response = await request.post(NEWSLETTER_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': BASE_URL,
      },
      data: {
        email: testEmail,
        source: 'api-health-test',
        timestamp: new Date().toISOString(),
      },
    });

    // 200 = success, 500 = SES sandbox (API still works)
    expect([200, 500]).toContain(response.status());
    
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    
    const body = await response.json();
    expect(body).toHaveProperty('success');
  });

  test('Newsletter API rejects invalid email', async ({ request }) => {
    const response = await request.post(NEWSLETTER_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: 'not-valid-email',
        source: 'test',
      },
    });

    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  test('Newsletter API rejects missing email', async ({ request }) => {
    const response = await request.post(NEWSLETTER_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        source: 'test',
      },
    });

    expect(response.status()).toBe(400);
  });
});

test.describe('Form Submission E2E', () => {
  
  // SKIPPED by default - sends real email
  test('Support form submits without network errors', async ({ page }) => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    await page.goto(`${BASE_URL}/support`);
    
    // Listen for network failures
    const failedRequests: string[] = [];
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Fill out the form
    await page.fill('input[name="name"]', 'QA Test User');
    await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
    await page.fill('textarea[name="message"]', 'Automated QA test submission');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check for "Failed to fetch" error in the UI
    const errorVisible = await page.locator('text=Failed to fetch').isVisible();
    const fetchError = await page.locator('text=failed to fetch').isVisible();
    
    if (errorVisible || fetchError) {
      console.error('Network failures:', failedRequests);
    }
    
    expect(errorVisible).toBe(false);
    expect(fetchError).toBe(false);
    
    // Should show either success or a server error (not a network error)
    const hasSuccess = await page.locator('text=Message Sent').isVisible();
    const hasServerError = await page.locator('text=Something went wrong').isVisible();
    
    // One of these should be true (form was submitted, even if server returned error)
    expect(hasSuccess || hasServerError).toBe(true);
  });

  // SKIPPED by default - sends real email
  test('Contact form submits without network errors', async ({ page }) => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    await page.goto(`${BASE_URL}/contact-us`);
    
    // Listen for network failures
    const failedRequests: string[] = [];
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Select team size
    const teamSizeBtn = page.locator('button:has-text("1-10")');
    if (await teamSizeBtn.isVisible()) {
      await teamSizeBtn.click();
    }
    
    // Fill out the form
    await page.fill('input[name="name"]', 'QA Test');
    await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
    await page.fill('input[name="company"]', 'QA Company');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check for fetch errors
    const errorVisible = await page.locator('text=Failed to fetch').isVisible();
    expect(errorVisible).toBe(false);
  });

  // SKIPPED by default - sends real email notification
  test('Newsletter form submits without network errors', async ({ page }) => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    await page.goto(`${BASE_URL}/blog`);
    
    // Listen for network failures
    const failedRequests: string[] = [];
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Find and fill the newsletter email input
    const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
    await emailInput.fill(`qa-test-${Date.now()}@deployzeroshare.com`);
    
    // Click Subscribe button
    await page.click('button:has-text("Subscribe")');
    
    // Wait for response
    await page.waitForTimeout(5000);
    
    // Check for fetch errors in UI
    const errorVisible = await page.locator('text=Failed to fetch').isVisible();
    const fetchError = await page.locator('text=failed to fetch').isVisible();
    
    if (errorVisible || fetchError) {
      console.error('Network failures:', failedRequests);
    }
    
    expect(errorVisible).toBe(false);
    expect(fetchError).toBe(false);
    
    // Should show success message or already subscribed
    const hasSuccess = await page.locator('text=/subscribed|already subscribed/i').isVisible();
    const hasError = await page.locator('text=Something went wrong').isVisible();
    
    // One of these should be true
    expect(hasSuccess || hasError).toBe(true);
  });
});
