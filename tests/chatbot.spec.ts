import { test, expect } from '@playwright/test';

/**
 * Chatbot functionality tests
 * Verifies the AI chatbot widget works correctly
 */
test.describe('Chatbot Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('chat button is visible on page load', async ({ page }) => {
    // The chat bubble should be visible in the bottom-right corner
    const chatButton = page.locator('button[aria-label="Open chat"]');
    await expect(chatButton).toBeVisible();
  });

  test('clicking chat button opens chat window', async ({ page }) => {
    // Click the chat button
    await page.locator('button[aria-label="Open chat"]').click();
    
    // Wait for chat window to appear (client-side render)
    await page.waitForTimeout(500);
    
    // Chat window should appear with header
    await expect(page.getByText('ZeroShare Assistant')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('AI Security Expert')).toBeVisible();
  });

  test('chat window shows welcome message', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Welcome message should be displayed
    await expect(page.getByText(/ZeroShare assistant/i)).toBeVisible({ timeout: 10000 });
  });

  test('chat window has input field and send button', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Input field should be visible
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    
    // Send button should exist (svg-based button)
    const sendButton = page.locator('button svg path[d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"]');
    await expect(sendButton).toBeVisible();
  });

  test('quick action buttons are displayed initially', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Quick action buttons should be visible
    await expect(page.getByRole('button', { name: 'What is ZeroShare?' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Pricing' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'How to deploy' })).toBeVisible();
  });

  test('can type message in input field', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Type a message
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('What is ZeroShare Gateway?');
    
    // Verify input has the message
    await expect(input).toHaveValue('What is ZeroShare Gateway?');
  });

  test('chat window can be minimized', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    await expect(page.getByText('ZeroShare Assistant')).toBeVisible({ timeout: 10000 });
    
    // Click minimize button
    await page.locator('button[aria-label="Minimize chat"]').click();
    await page.waitForTimeout(300);
    
    // Chat window should be hidden, but chat button should still be visible
    await expect(page.getByText('ZeroShare Assistant')).not.toBeVisible();
    await expect(page.locator('button[aria-label="Open chat"]')).toBeVisible();
  });

  test('chat window can be closed via X button', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    await expect(page.getByText('ZeroShare Assistant')).toBeVisible({ timeout: 10000 });
    
    // Click close button (the main toggle becomes close when open)
    await page.locator('button[aria-label="Close chat"]').click();
    await page.waitForTimeout(300);
    
    // Chat window should be hidden
    await expect(page.getByText('ZeroShare Assistant')).not.toBeVisible();
  });

  test('bot disclosure is shown at bottom of chat', async ({ page }) => {
    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Bot disclosure should be visible
    await expect(page.getByText('AI assistant powered by AWS Bedrock')).toBeVisible({ timeout: 10000 });
  });

  test('sending message shows user message in chat', async ({ page }) => {
    // Mock API to avoid actual API calls
    await page.route('**/chat*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'ZeroShare Gateway is an AI security proxy that protects your organization from data leaks.' 
        }),
      });
    });

    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Type and send message
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('What is ZeroShare?');
    await input.press('Enter');
    
    // User message should appear in chat
    await expect(page.getByText('What is ZeroShare?')).toBeVisible({ timeout: 5000 });
  });

  test('sending message shows loading indicator', async ({ page }) => {
    // Mock API with delay
    await page.route('**/chat*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Test response' }),
      });
    });

    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Type and send message
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('Test question');
    await input.press('Enter');
    
    // Loading indicator should appear (the div with bouncing dots)
    // Look for the loading dots container
    await expect(page.locator('span[style*="animation"]').first()).toBeVisible({ timeout: 3000 });
  });

  test('API response shows assistant message', async ({ page }) => {
    // Mock API response
    await page.route('**/chat*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'ZeroShare Gateway blocks PII and secrets from reaching AI services.' 
        }),
      });
    });

    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Type and send message
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('Tell me about ZeroShare');
    await input.press('Enter');
    
    // Wait for response
    await expect(page.getByText('ZeroShare Gateway blocks PII and secrets from reaching AI services.')).toBeVisible({ timeout: 10000 });
  });

  test('API error shows fallback message', async ({ page }) => {
    // Mock API error
    await page.route('**/chat*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error', fallback: true }),
      });
    });

    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Type and send message
    const input = page.locator('input[placeholder="Ask about ZeroShare..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('Test question');
    await input.press('Enter');
    
    // Fallback message should appear with links to support/docs
    await expect(page.getByText(/support|documentation/i)).toBeVisible({ timeout: 10000 });
  });

  test('quick action button sends message', async ({ page }) => {
    // Mock API response
    await page.route('**/chat*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'Here are our pricing plans...' 
        }),
      });
    });

    // Open chat
    await page.locator('button[aria-label="Open chat"]').click();
    await page.waitForTimeout(500);
    
    // Click pricing quick action
    await expect(page.getByRole('button', { name: 'Pricing' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Pricing' }).click();
    
    // Should see the pricing question in chat
    await expect(page.getByText('What are the pricing plans?')).toBeVisible({ timeout: 5000 });
  });

  test('chat is available on other pages', async ({ page }) => {
    // Check on pricing page
    await page.goto('/pricing');
    await expect(page.locator('button[aria-label="Open chat"]')).toBeVisible({ timeout: 10000 });
    
    // Check on docs page
    await page.goto('/docs');
    await expect(page.locator('button[aria-label="Open chat"]')).toBeVisible({ timeout: 10000 });
    
    // Check on support page
    await page.goto('/support');
    await expect(page.locator('button[aria-label="Open chat"]')).toBeVisible({ timeout: 10000 });
  });
});
