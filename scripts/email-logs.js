#!/usr/bin/env node
/**
 * Email Cron Logs
 * 
 * Sends cron log files to rick@deployzeroshare.com via AWS SES.
 * Can send individual log or all logs as digest.
 * 
 * Usage:
 *   node scripts/email-logs.js [log-name]     # Send specific log
 *   node scripts/email-logs.js --all          # Send all logs as digest
 *   node scripts/email-logs.js --daily        # Daily digest (all logs)
 * 
 * Requires: AWS credentials configured (AWS CLI or env vars)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TO_EMAIL = 'rick@deployzeroshare.com';
const FROM_EMAIL = 'no-reply@deployzeroshare.com';
const REGION = 'us-east-1';

const LOGS = {
  linkedin: {
    post: 'tools/linkedin/logs/post.log',
    generate: 'tools/linkedin/logs/generate.log',
    comic: 'tools/linkedin/logs/comic-release.log',
    report: 'tools/linkedin/logs/report.log',
    blog: 'tools/linkedin/logs/blog-generate.log',
  },
  twitter: {
    crosspost: 'tools/twitter/logs/crosspost.log',
  },
};

function readLog(file) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) return null;
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (e) {
    return `Error reading log: ${e.message}`;
  }
}

function getLastNLines(content, n = 100) {
  if (!content) return '';
  const lines = content.split('\n');
  return lines.slice(-n).join('\n');
}

function sendEmail(subject, body) {
  // Use AWS CLI with proper JSON escaping
  const emailJson = {
    Source: FROM_EMAIL,
    Destination: { ToAddresses: [TO_EMAIL] },
    Message: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: {
        Text: { Data: body, Charset: 'UTF-8' },
      },
    },
  };

  const jsonFile = path.join(ROOT, '.email-temp.json');
  fs.writeFileSync(jsonFile, JSON.stringify(emailJson), 'utf-8');

  try {
    execSync(`aws ses send-email --cli-input-json file://${jsonFile} --region ${REGION}`, {
      stdio: 'inherit',
      encoding: 'utf-8',
    });
    fs.unlinkSync(jsonFile);
    console.log(`✅ Email sent to ${TO_EMAIL}`);
  } catch (e) {
    if (fs.existsSync(jsonFile)) fs.unlinkSync(jsonFile);
    console.error(`❌ Failed to send email: ${e.message}`);
    console.error('   Ensure AWS CLI is configured and SES is set up.');
    console.error('   Run: aws configure');
    process.exit(1);
  }
}

function sendSingleLog(name, logPath) {
  const content = readLog(logPath);
  if (!content) {
    console.log(`⚠️  Log not found: ${logPath}`);
    return;
  }

  const last100 = getLastNLines(content, 100);
  const subject = `ZeroShare Cron Log: ${name}`;
  const body = `ZeroShare Marketing Automation - ${name}\n\n${'='.repeat(60)}\n\n${last100}\n\n${'='.repeat(60)}\n\nFull log: ${logPath}`;

  sendEmail(subject, body);
}

function sendDigest() {
  const parts = [];
  parts.push('ZeroShare Marketing Automation - Log Digest');
  parts.push('='.repeat(60));
  parts.push('');

  for (const [platform, logs] of Object.entries(LOGS)) {
    parts.push(`\n📊 ${platform.toUpperCase()}`);
    parts.push('-'.repeat(60));
    
    for (const [name, logPath] of Object.entries(logs)) {
      const content = readLog(logPath);
      if (content) {
        const last50 = getLastNLines(content, 50);
        parts.push(`\n${name}:`);
        parts.push(last50);
        parts.push('');
      } else {
        parts.push(`\n${name}: (log not found)`);
      }
    }
  }

  parts.push('\n' + '='.repeat(60));
  parts.push(`Generated: ${new Date().toISOString()}`);

  const subject = `ZeroShare Cron Logs Digest - ${new Date().toLocaleDateString()}`;
  sendEmail(subject, parts.join('\n'));
}

const args = process.argv.slice(2);

if (args.includes('--all') || args.includes('--daily')) {
  sendDigest();
} else if (args[0]) {
  // Find log by name
  let found = false;
  for (const [platform, logs] of Object.entries(LOGS)) {
    for (const [name, logPath] of Object.entries(logs)) {
      if (name === args[0] || logPath.includes(args[0])) {
        sendSingleLog(name, logPath);
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    console.error(`❌ Log not found: ${args[0]}`);
    console.log('\nAvailable logs:');
    for (const [platform, logs] of Object.entries(LOGS)) {
      for (const name of Object.keys(logs)) {
        console.log(`  ${name}`);
      }
    }
    process.exit(1);
  }
} else {
  console.log('Usage:');
  console.log('  node scripts/email-logs.js [log-name]     # Send specific log');
  console.log('  node scripts/email-logs.js --all          # Send all logs as digest');
  console.log('  node scripts/email-logs.js --daily        # Daily digest');
  console.log('\nAvailable logs:');
  for (const [platform, logs] of Object.entries(LOGS)) {
    for (const name of Object.keys(logs)) {
      console.log(`  ${name}`);
    }
  }
}
