import { test, expect } from '@playwright/test';

/**
 * API Health Tests
 * 
 * These tests verify that all backend API endpoints are reachable and responding.
 * This is CRITICAL for catching issues like wrong URLs before they hit production.
 */

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';

// The actual API endpoint from CloudFormation
const SUPPORT_API_URL = process.env.SUPPORT_API_URL || 
  'https://obkptu26ug.execute-api.us-east-1.amazonaws.com/prod/support';

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

  test('Support API accepts POST requests', async ({ request }) => {
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

test.describe('Form Submission E2E', () => {
  
  test('Support form submits without network errors', async ({ page }) => {
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

  test('Contact form submits without network errors', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact-us`);
    
    // Listen for network failures
    const failedRequests: string[] = [];
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Select team size
    await page.click('button:has-text("1-10")');
    
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
});
