import { test, expect } from '@playwright/test';
import { execSync, exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

/**
 * Email Automation Script Tests
 * 
 * Tests for scripts/email-logs.js and scripts/email-blog-report.js
 * 
 * NOTE: Tests that actually send emails are SKIPPED by default.
 * Set RUN_EMAIL_TESTS=true to run them manually.
 */

const ROOT = path.resolve(__dirname, '..');
const RUN_EMAIL_TESTS = process.env.RUN_EMAIL_TESTS === 'true';

test.describe('Email Logs Script', () => {
  const scriptPath = path.join(ROOT, 'scripts/email-logs.js');

  test('script file exists and is executable', async () => {
    expect(fs.existsSync(scriptPath)).toBe(true);
    
    // Check it's valid JavaScript (syntax check)
    const result = execSync(`node --check "${scriptPath}" 2>&1 || true`, { encoding: 'utf-8' });
    expect(result).not.toContain('SyntaxError');
  });

  test('displays usage when called without arguments', async () => {
    const { stdout } = await execAsync(`node "${scriptPath}"`, { cwd: ROOT });
    
    expect(stdout).toContain('Usage:');
    expect(stdout).toContain('--all');
    expect(stdout).toContain('--daily');
    expect(stdout).toContain('Available logs:');
    expect(stdout).toContain('post');
    expect(stdout).toContain('generate');
    expect(stdout).toContain('crosspost');
  });

  test('lists all expected log types', async () => {
    const { stdout } = await execAsync(`node "${scriptPath}"`, { cwd: ROOT });
    
    // LinkedIn logs
    expect(stdout).toContain('post');
    expect(stdout).toContain('generate');
    expect(stdout).toContain('comic');
    expect(stdout).toContain('report');
    expect(stdout).toContain('blog');
    
    // Twitter logs
    expect(stdout).toContain('crosspost');
  });

  test('handles unknown log name gracefully', async () => {
    try {
      await execAsync(`node "${scriptPath}" nonexistent-log`, { cwd: ROOT });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.stderr || error.stdout).toContain('Log not found');
    }
  });

  test('correctly identifies log paths', async () => {
    // Read the script and verify log paths
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    expect(scriptContent).toContain('tools/linkedin/logs/post.log');
    expect(scriptContent).toContain('tools/linkedin/logs/generate.log');
    expect(scriptContent).toContain('tools/linkedin/logs/comic-release.log');
    expect(scriptContent).toContain('tools/twitter/logs/crosspost.log');
  });

  test('uses correct email addresses', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    expect(scriptContent).toContain("TO_EMAIL = 'rick@deployzeroshare.com'");
    expect(scriptContent).toContain("FROM_EMAIL = 'no-reply@deployzeroshare.com'");
  });

  // SKIPPED by default - actually sends email
  test('sends daily digest email', async () => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    
    const { stdout, stderr } = await execAsync(`node "${scriptPath}" --daily`, { cwd: ROOT });
    
    // Should indicate email was sent
    expect(stdout + stderr).toContain('Email sent');
  });
});

test.describe('Email Blog Report Script', () => {
  const scriptPath = path.join(ROOT, 'scripts/email-blog-report.js');

  test('script file exists and is executable', async () => {
    expect(fs.existsSync(scriptPath)).toBe(true);
    
    // Check it's valid JavaScript (syntax check)
    const result = execSync(`node --check "${scriptPath}" 2>&1 || true`, { encoding: 'utf-8' });
    expect(result).not.toContain('SyntaxError');
  });

  test('displays usage when called without arguments', async () => {
    const { stdout } = await execAsync(`node "${scriptPath}"`, { cwd: ROOT });
    
    expect(stdout).toContain('Usage:');
    expect(stdout).toContain('--slug');
    expect(stdout).toContain('--title');
    expect(stdout).toContain('--linkedin');
    expect(stdout).toContain('--twitter');
  });

  test('displays Thunderbird filter instructions', async () => {
    const { stdout } = await execAsync(`node "${scriptPath}"`, { cwd: ROOT });
    
    expect(stdout).toContain('Thunderbird Filter Rule');
    expect(stdout).toContain('[Blog Post Report]');
    expect(stdout).toContain('Marketing/Blog Posts');
  });

  test('uses correct subject format for Thunderbird filtering', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Subject should be "[Blog Post Report] <title>" for filtering
    expect(scriptContent).toContain('[Blog Post Report]');
  });

  test('uses correct email addresses', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    expect(scriptContent).toContain("TO_EMAIL = 'rick@deployzeroshare.com'");
    expect(scriptContent).toContain("FROM_EMAIL = 'no-reply@deployzeroshare.com'");
  });

  test('handles missing slug gracefully', async () => {
    try {
      await execAsync(`node "${scriptPath}" --slug nonexistent-blog-slug`, { cwd: ROOT });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.stderr || error.stdout).toContain('No published LinkedIn post found');
    }
  });

  test('references correct posts.json file', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    expect(scriptContent).toContain('tools/linkedin/content/posts.json');
  });

  // SKIPPED by default - actually sends email
  test('sends blog report email with direct input', async () => {
    test.skip(!RUN_EMAIL_TESTS, 'Skipped to avoid email spam. Set RUN_EMAIL_TESTS=true to run.');
    
    const { stdout, stderr } = await execAsync(
      `node "${scriptPath}" --title "Test Blog Post" --linkedin "Test LinkedIn content" --twitter "Test tweet" --url "https://deployzeroshare.com/blog/test"`,
      { cwd: ROOT }
    );
    
    expect(stdout + stderr).toContain('Email sent');
  });
});

test.describe('Post-Next Integration', () => {
  const scriptPath = path.join(ROOT, 'tools/linkedin/post-next.js');

  test('post-next.js includes blog report integration', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Should import execSync for calling email script
    expect(scriptContent).toContain('execSync');
    
    // Should have the sendBlogPostReport function
    expect(scriptContent).toContain('sendBlogPostReport');
    
    // Should reference the email-blog-report script
    expect(scriptContent).toContain('email-blog-report.js');
  });

  test('blog report is called after successful publish', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Should call sendBlogPostReport after publishing
    expect(scriptContent).toContain('sendBlogPostReport(nextPost');
  });

  test('blog report only triggers for posts with blogSlug', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Should check for blogSlug before sending
    expect(scriptContent).toContain('if (!post.blogSlug)');
  });
});

test.describe('Cron Setup Integration', () => {
  const scriptPath = path.join(ROOT, 'scripts/setup-marketing-cron.sh');

  test('cron setup includes daily email digest', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Should have daily email digest cron entry
    expect(scriptContent).toContain('email-logs.js');
    expect(scriptContent).toContain('--daily');
    
    // Should run at 7 AM
    expect(scriptContent).toContain('0 7 * * *');
  });

  test('cron setup creates log directory for email logs', async () => {
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    
    // Should reference email-logs.log
    expect(scriptContent).toContain('email-logs.log');
  });
});

test.describe('Documentation', () => {
  test('Thunderbird mail rules documentation exists', async () => {
    const docPath = path.join(ROOT, 'docs/THUNDERBIRD_MAIL_RULES.md');
    expect(fs.existsSync(docPath)).toBe(true);
    
    const content = fs.readFileSync(docPath, 'utf-8');
    
    // Should have filter instructions
    expect(content).toContain('[Blog Post Report]');
    expect(content).toContain('Marketing/Blog Posts');
    expect(content).toContain('Message Filters');
  });

  test('email logs README exists', async () => {
    const docPath = path.join(ROOT, 'scripts/EMAIL_LOGS_README.md');
    expect(fs.existsSync(docPath)).toBe(true);
    
    const content = fs.readFileSync(docPath, 'utf-8');
    
    expect(content).toContain('npm run logs:email');
    expect(content).toContain('AWS SES');
  });

  test('cron documentation includes email digest', async () => {
    const docPath = path.join(ROOT, 'docs/CRON_AND_AUTOMATION.md');
    const content = fs.readFileSync(docPath, 'utf-8');
    
    expect(content).toContain('Daily 7 AM');
    expect(content).toContain('email');
  });
});

test.describe('NPM Scripts', () => {
  test('package.json has email-related scripts', async () => {
    const packagePath = path.join(ROOT, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    
    expect(packageJson.scripts['logs:email']).toBeDefined();
    expect(packageJson.scripts['logs:email:all']).toBeDefined();
    expect(packageJson.scripts['blog:report']).toBeDefined();
    
    // Verify script commands are correct
    expect(packageJson.scripts['logs:email']).toContain('email-logs.js');
    expect(packageJson.scripts['blog:report']).toContain('email-blog-report.js');
  });
});
