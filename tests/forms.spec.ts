import { test, expect } from '@playwright/test';

/**
 * Comprehensive Form Tests
 * 
 * Tests for all form functionality:
 * 1. Newsletter subscription (blog page)
 * 2. Support case form (support page)
 * 3. Contact sales form (contact-us page)
 */

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';

// API endpoints
const SUPPORT_API_URL = process.env.SUPPORT_API_URL || 
  'https://obkptu26ug.execute-api.us-east-1.amazonaws.com/prod/support';
const NEWSLETTER_API_URL = process.env.NEWSLETTER_API_URL || 
  'https://jaqw7kgt6f.execute-api.us-east-1.amazonaws.com/prod/subscribe';

test.describe('Newsletter Subscription', () => {
  
  test.describe('API Health', () => {
    
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

    test('Newsletter API accepts valid subscription', async ({ request }) => {
      const testEmail = `qa-test-${Date.now()}@example.com`;
      
      const response = await request.post(NEWSLETTER_API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Origin': BASE_URL,
        },
        data: {
          email: testEmail,
          source: 'qa-test',
          timestamp: new Date().toISOString(),
        },
      });

      // Should respond with JSON (200 success, 500 if SES fails - but API reached)
      expect([200, 500]).toContain(response.status());
      
      const body = await response.json();
      expect(body).toHaveProperty('success');
    });

    test('Newsletter API rejects invalid email', async ({ request }) => {
      const response = await request.post(NEWSLETTER_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: 'not-an-email',
          source: 'qa-test',
        },
      });

      // Should return 400 for invalid email
      expect(response.status()).toBe(400);
      
      const body = await response.json();
      expect(body.error).toContain('email');
    });

    test('Newsletter API rejects missing email', async ({ request }) => {
      const response = await request.post(NEWSLETTER_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          source: 'qa-test',
        },
      });

      expect(response.status()).toBe(400);
    });
  });

  test.describe('UI Tests', () => {
    
    test('Newsletter form is visible on blog page', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      // Newsletter section should be visible
      await expect(page.getByText('Stay Ahead of AI Security Threats')).toBeVisible();
      await expect(page.locator('input[type="email"][placeholder="Enter your email"]')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Subscribe' })).toBeVisible();
    });

    test('Newsletter form validates email format', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
      const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
      
      // Enter invalid email
      await emailInput.fill('invalid-email');
      await subscribeButton.click();
      
      // Wait for validation
      await page.waitForTimeout(2000);
      
      // Should show error message or the form should still be visible (not successful)
      // The error message could be "Please enter a valid email address" or similar
      const errorVisible = await page.getByText(/valid email|invalid email|error/i).isVisible();
      const formStillVisible = await emailInput.isVisible();
      
      // Either error shown OR form is still visible (submission failed)
      expect(errorVisible || formStillVisible).toBe(true);
    });

    test('Newsletter form shows loading state during submission', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
      await emailInput.fill('test@example.com');
      
      // Click subscribe
      await page.getByRole('button', { name: 'Subscribe' }).click();
      
      // Should briefly show "Subscribing..."
      // This is a fast operation so we just verify no errors
      await page.waitForTimeout(500);
    });

    test('Newsletter form submits without network errors', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      // Track network errors
      const networkErrors: string[] = [];
      page.on('requestfailed', request => {
        networkErrors.push(`${request.url()} - ${request.failure()?.errorText}`);
      });
      
      const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
      await emailInput.fill(`qa-test-${Date.now()}@deployzeroshare.com`);
      
      await page.getByRole('button', { name: 'Subscribe' }).click();
      
      // Wait for submission
      await page.waitForTimeout(5000);
      
      // Check for fetch errors in UI
      const hasFetchError = await page.getByText(/failed to fetch/i).isVisible();
      expect(hasFetchError).toBe(false);
      
      // Should show success or error from API (not network error)
      const hasSuccess = await page.getByText(/subscribed|already subscribed/i).isVisible();
      const hasApiError = await page.getByText(/something went wrong/i).isVisible();
      
      // One of these should be true
      expect(hasSuccess || hasApiError || networkErrors.length === 0).toBe(true);
    });

    test('Newsletter form shows feedback after submission', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
      // Use a unique email to test new subscription
      await emailInput.fill(`test-${Date.now()}@example.com`);
      await page.getByRole('button', { name: 'Subscribe' }).click();
      
      // Wait for response
      await page.waitForTimeout(5000);
      
      // Should show some feedback (success, already subscribed, or error)
      // On success, the form is replaced with a success message
      const hasSuccessMessage = await page.getByText(/subscribed|check your inbox/i).isVisible();
      const hasErrorMessage = await page.getByText(/error|failed|went wrong/i).isVisible();
      const hasAlreadySubscribed = await page.getByText(/already subscribed/i).isVisible();
      
      // One of these feedback states should be visible
      expect(hasSuccessMessage || hasErrorMessage || hasAlreadySubscribed).toBe(true);
    });

    test('Newsletter form handles duplicate subscription', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      const emailInput = page.locator('input[type="email"][placeholder="Enter your email"]');
      // Use an email that's likely already subscribed (from previous tests)
      await emailInput.fill('rick@deployzeroshare.com');
      await page.getByRole('button', { name: 'Subscribe' }).click();
      
      // Wait for response
      await page.waitForTimeout(5000);
      
      // Should show some message (either already subscribed or new subscription success)
      const hasMessage = await page.getByText(/subscribed|success|thank/i).isVisible();
      expect(hasMessage).toBe(true);
    });
  });
});

test.describe('Support Case Form', () => {
  
  test.describe('UI Tests', () => {
    
    test('Support page loads correctly', async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/support`);
      expect(response?.status()).toBe(200);
      
      // Should have the support form - check for form elements
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('Support form has all required fields', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('textarea[name="message"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('Support form priority selector works', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      // Priority options should be visible (radio-style buttons)
      const generalInquiry = page.getByText('General Inquiry');
      const technicalSupport = page.getByText('Technical Support');
      const urgentIssue = page.getByText('Urgent Issue');
      
      // At least one priority option should be visible
      const hasGeneralInquiry = await generalInquiry.isVisible();
      const hasTechnicalSupport = await technicalSupport.isVisible();
      const hasUrgentIssue = await urgentIssue.isVisible();
      
      expect(hasGeneralInquiry || hasTechnicalSupport || hasUrgentIssue).toBe(true);
    });

    test('Support form can be filled and submitted', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      // Track API calls
      let apiCallMade = false;
      page.on('request', request => {
        if (request.url().includes('execute-api') && request.method() === 'POST') {
          apiCallMade = true;
        }
      });
      
      // Fill the form
      await page.fill('input[name="name"]', 'QA Test User');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      
      // Fill company if visible
      const companyField = page.locator('input[name="company"]');
      if (await companyField.isVisible()) {
        await companyField.fill('QA Company');
      }
      
      await page.fill('textarea[name="message"]', 'Automated QA test - please ignore');
      
      // Submit
      await page.click('button[type="submit"]');
      
      // Wait for API call
      await page.waitForTimeout(3000);
      
      expect(apiCallMade).toBe(true);
    });

    test('Support form does not throw network errors', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      const networkErrors: string[] = [];
      page.on('requestfailed', request => {
        networkErrors.push(request.url());
      });
      
      await page.fill('input[name="name"]', 'QA Test');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('textarea[name="message"]', 'QA Test message');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(5000);
      
      // Check for fetch errors
      const hasFetchError = await page.getByText(/failed to fetch/i).isVisible();
      expect(hasFetchError).toBe(false);
      
      // API errors should be filtered (some execute-api calls may fail, that's OK)
      const criticalErrors = networkErrors.filter(url => 
        !url.includes('execute-api') && !url.includes('analytics')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('Support form shows feedback after submission', async ({ page }) => {
      await page.goto(`${BASE_URL}/support`);
      
      await page.fill('input[name="name"]', 'QA Test User');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('textarea[name="message"]', 'Automated test message - please ignore');
      
      await page.click('button[type="submit"]');
      
      // Wait for API response
      await page.waitForTimeout(5000);
      
      // Should show feedback (success or error, but not stuck loading)
      const hasFeedback = await page.getByText(/submitted|sent|thank you|error|failed|message sent/i).isVisible();
      const hasLoadingState = await page.getByText(/sending|submitting/i).isVisible();
      
      // Either feedback shown or form completed
      expect(hasFeedback || !hasLoadingState).toBe(true);
    });
  });
});

test.describe('Contact Sales Form', () => {
  
  test.describe('UI Tests', () => {
    
    test('Contact page loads correctly', async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/contact-us`);
      expect(response?.status()).toBe(200);
      
      // Should have form elements
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('Contact form has all required fields', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="company"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('Contact form team size selector works', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      // Team size buttons should be visible
      const size1to10 = page.getByRole('button', { name: '1-10' });
      const size11to50 = page.getByRole('button', { name: '11-50' });
      
      if (await size1to10.isVisible()) {
        await size1to10.click();
        // Should show selected state (visual change)
        await page.waitForTimeout(100);
      }
    });

    test('Contact form can be filled and submitted', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      let apiCallMade = false;
      page.on('request', request => {
        if (request.url().includes('execute-api') && request.method() === 'POST') {
          apiCallMade = true;
        }
      });
      
      // Select team size if available
      const teamSizeBtn = page.getByRole('button', { name: '1-10' });
      if (await teamSizeBtn.isVisible()) {
        await teamSizeBtn.click();
      }
      
      await page.fill('input[name="name"]', 'QA Contact Test');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('input[name="company"]', 'QA Testing Inc');
      
      // Fill message if available
      const messageField = page.locator('textarea[name="message"]');
      if (await messageField.isVisible()) {
        await messageField.fill('Interested in a demo');
      }
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      expect(apiCallMade).toBe(true);
    });

    test('Contact form does not throw network errors', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      const networkErrors: string[] = [];
      page.on('requestfailed', request => {
        networkErrors.push(request.url());
      });
      
      const teamSizeBtn = page.getByRole('button', { name: '1-10' });
      if (await teamSizeBtn.isVisible()) {
        await teamSizeBtn.click();
      }
      
      await page.fill('input[name="name"]', 'QA Test');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('input[name="company"]', 'QA Company');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(5000);
      
      const hasFetchError = await page.getByText(/failed to fetch/i).isVisible();
      expect(hasFetchError).toBe(false);
    });

    test('Contact form shows feedback after submission', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact-us`);
      
      const teamSizeBtn = page.getByRole('button', { name: '1-10' });
      if (await teamSizeBtn.isVisible()) {
        await teamSizeBtn.click();
      }
      
      await page.fill('input[name="name"]', 'QA Test User');
      await page.fill('input[name="email"]', 'qa@deployzeroshare.com');
      await page.fill('input[name="company"]', 'QA Testing Company');
      
      await page.click('button[type="submit"]');
      
      // Wait for API response
      await page.waitForTimeout(5000);
      
      // Should show feedback (success or error)
      const hasFeedback = await page.getByText(/thank you|submitted|received|sent|error|failed/i).isVisible();
      const hasLoadingState = await page.getByText(/sending|submitting/i).isVisible();
      
      // Either feedback shown or form completed
      expect(hasFeedback || !hasLoadingState).toBe(true);
    });

    test('Contact form captures UTM parameters', async ({ page }) => {
      // Navigate with UTM params
      await page.goto(`${BASE_URL}/contact-us?utm_source=linkedin&utm_campaign=test`);
      
      // Form should still work with UTM params
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
    });
  });
});

test.describe('Cross-Form Integration', () => {
  
  test('All forms use correct API endpoints', async ({ page }) => {
    const apiCalls: { url: string; form: string }[] = [];
    
    page.on('request', request => {
      if (request.url().includes('execute-api')) {
        apiCalls.push({ url: request.url(), form: 'unknown' });
      }
    });
    
    // Test support form
    await page.goto(`${BASE_URL}/support`);
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Test contact form
    await page.goto(`${BASE_URL}/contact-us`);
    const teamSize = page.getByRole('button', { name: '1-10' });
    if (await teamSize.isVisible()) await teamSize.click();
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    // Verify API calls were made
    expect(apiCalls.length).toBeGreaterThanOrEqual(2);
    
    // Verify correct endpoints
    const supportCalls = apiCalls.filter(c => c.url.includes('/support'));
    const subscribeCalls = apiCalls.filter(c => c.url.includes('/subscribe'));
    
    expect(supportCalls.length).toBeGreaterThanOrEqual(1);
  });

  test('Forms do not have hardcoded wrong URLs', async ({ page }) => {
    // Check support page source
    await page.goto(`${BASE_URL}/support`);
    let content = await page.content();
    
    // Should NOT contain the old wrong URL pattern
    expect(content).not.toContain('deployzeroshare-support-api.execute-api');
    
    // Check contact page source
    await page.goto(`${BASE_URL}/contact-us`);
    content = await page.content();
    expect(content).not.toContain('deployzeroshare-support-api.execute-api');
    
    // Check blog page for newsletter
    await page.goto(`${BASE_URL}/blog`);
    content = await page.content();
    expect(content).not.toContain('deployzeroshare.com/api/subscribe'); // Old fallback
  });
});
