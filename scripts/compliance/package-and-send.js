#!/usr/bin/env node

/**
 * Compliance Report Packager and Email Sender
 * 
 * This script:
 * 1. Generates compliance evidence artifacts
 * 2. Packages them into organized ZIP files
 * 3. Uploads to S3 with expiring pre-signed URLs
 * 4. Sends email with download links
 * 
 * Usage:
 *   npm run compliance:send-report                    # Send all reports
 *   npm run compliance:send-report -- --cert=soc2    # Send SOC 2 only
 *   npm run compliance:send-report -- --email=x@y.com # Override recipient
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

// Try to load AWS SDK (optional - falls back to local-only mode)
let AWS;
try {
  AWS = require('aws-sdk');
} catch (e) {
  console.log('AWS SDK not installed. Running in local-only mode.');
  AWS = null;
}

// Configuration
const CONFIG = {
  s3Bucket: process.env.COMPLIANCE_S3_BUCKET || 'zeroshare-compliance-reports',
  s3Region: process.env.AWS_REGION || 'us-east-1',
  emailFrom: process.env.COMPLIANCE_EMAIL_FROM || 'compliance@zeroshare.io',
  emailTo: process.env.COMPLIANCE_EMAIL_TO || 'compliance@zeroshare.io',
  linkExpiryDays: 7,
  outputDir: path.join(process.cwd(), 'compliance-artifacts'),
};

// Parse command line arguments
const args = process.argv.slice(2);
const certFilter = args.find(a => a.startsWith('--cert='))?.split('=')[1] || 'all';
const emailOverride = args.find(a => a.startsWith('--email='))?.split('=')[1];
const localOnly = args.includes('--local');

if (emailOverride) {
  CONFIG.emailTo = emailOverride;
}

// Certification packages
const CERT_PACKAGES = {
  soc2: {
    name: 'SOC 2 Type II',
    files: [
      'docs/compliance/soc2.md',
      'docs/compliance/templates/security-policy.md',
      'docs/compliance/templates/incident-response-plan.md',
      'docs/compliance/evidence/technical-controls.md',
      'docs/compliance/evidence/administrative-controls.md',
    ],
    artifacts: ['security-scan', 'code-quality', 'access-control', 'encryption', 'change-log'],
  },
  iso27001: {
    name: 'ISO 27001',
    files: [
      'docs/compliance/iso27001.md',
      'docs/compliance/templates/security-policy.md',
      'docs/compliance/templates/vendor-assessment.md',
      'docs/compliance/evidence/technical-controls.md',
      'docs/compliance/evidence/administrative-controls.md',
    ],
    artifacts: ['security-scan', 'code-quality', 'access-control', 'encryption', 'change-log', 'asset-inventory'],
  },
  gdpr: {
    name: 'GDPR',
    files: [
      'docs/compliance/gdpr.md',
      'docs/compliance/templates/data-processing-agreement.md',
      'docs/compliance/evidence/administrative-controls.md',
    ],
    artifacts: ['data-flow', 'encryption', 'access-control', 'data-retention'],
  },
  hipaa: {
    name: 'HIPAA',
    files: [
      'docs/compliance/hipaa.md',
      'docs/compliance/templates/security-policy.md',
      'docs/compliance/templates/incident-response-plan.md',
      'docs/compliance/evidence/technical-controls.md',
    ],
    artifacts: ['encryption', 'access-control', 'audit-log', 'backup-verification'],
  },
  pci: {
    name: 'PCI DSS',
    files: [
      'docs/compliance/pci-dss.md',
      'docs/compliance/templates/security-policy.md',
      'docs/compliance/evidence/technical-controls.md',
    ],
    artifacts: ['security-scan', 'encryption', 'access-control', 'vulnerability-scan'],
  },
  ccpa: {
    name: 'CCPA',
    files: [
      'docs/compliance/ccpa.md',
      'docs/compliance/templates/data-processing-agreement.md',
      'docs/compliance/evidence/administrative-controls.md',
    ],
    artifacts: ['data-flow', 'data-inventory', 'data-retention'],
  },
  aws: {
    name: 'AWS Marketplace & Certifications',
    files: [
      'docs/aws/AWS_CERTIFICATION_ROADMAP.md',
      'docs/aws/README.md',
      'docs/aws/technical/ftr-checklist.md',
      'docs/aws/technical/well-architected-review.md',
      'docs/aws/technical/security-review.md',
      'docs/aws/architecture/architecture-overview.md',
      'docs/aws/architecture/iam-policies.md',
      'docs/aws/marketplace/marketplace-listing.md',
      'docs/aws/marketplace/deployment-guide.md',
      'docs/aws/marketplace/pricing-guide.md',
      'docs/aws/marketplace/eula.md',
      'docs/aws/marketplace/support-guide.md',
      'docs/aws/partner/partner-registration.md',
      'cloudformation/zeroshare-complete.yaml',
    ],
    artifacts: [],
  },
};

/**
 * Generate compliance artifacts
 */
async function generateArtifacts(certKey) {
  console.log(`\nGenerating artifacts for ${certKey}...`);
  
  const cert = CERT_PACKAGES[certKey];
  if (!cert.artifacts.length) {
    console.log('  No runtime artifacts needed for this certification');
    return;
  }
  
  try {
    // Run the evidence generator
    execSync(`node scripts/compliance/generate-evidence.js --cert=${certKey}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (e) {
    console.log(`  Warning: Could not generate some artifacts: ${e.message}`);
  }
}

/**
 * Create a ZIP package for a certification
 */
async function createPackage(certKey) {
  const cert = CERT_PACKAGES[certKey];
  const timestamp = new Date().toISOString().split('T')[0];
  const zipName = `${certKey}-compliance-package-${timestamp}.zip`;
  const zipPath = path.join(CONFIG.outputDir, zipName);
  
  console.log(`\nCreating package: ${zipName}`);
  
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      console.log(`  Package created: ${archive.pointer()} bytes`);
      resolve({ zipPath, zipName, size: archive.pointer() });
    });
    
    archive.on('error', reject);
    archive.pipe(output);
    
    // Add documentation files
    console.log('  Adding documentation files...');
    for (const file of cert.files) {
      const fullPath = path.join(process.cwd(), file);
      if (fs.existsSync(fullPath)) {
        archive.file(fullPath, { name: `documentation/${path.basename(file)}` });
      } else {
        console.log(`    Warning: File not found: ${file}`);
      }
    }
    
    // Add generated artifacts
    const artifactsDir = path.join(CONFIG.outputDir, 'latest');
    if (fs.existsSync(artifactsDir)) {
      console.log('  Adding generated artifacts...');
      archive.directory(artifactsDir, 'evidence');
    }
    
    // Add README for the package
    const readme = generatePackageReadme(certKey, cert);
    archive.append(readme, { name: 'README.md' });
    
    // Add manifest
    const manifest = {
      certification: cert.name,
      generated: new Date().toISOString(),
      files: cert.files,
      artifacts: cert.artifacts,
      generator: 'ZeroShare Compliance Reporter',
      version: '1.0.0',
    };
    archive.append(JSON.stringify(manifest, null, 2), { name: 'manifest.json' });
    
    archive.finalize();
  });
}

/**
 * Generate README for package
 */
function generatePackageReadme(certKey, cert) {
  return `# ${cert.name} Compliance Package

Generated: ${new Date().toISOString()}

## Contents

### Documentation
${cert.files.map(f => `- ${path.basename(f)}`).join('\n')}

### Evidence Artifacts
${cert.artifacts.length ? cert.artifacts.map(a => `- ${a}`).join('\n') : 'No runtime artifacts included'}

## Usage

1. Review the documentation files for compliance requirements
2. Use the evidence artifacts for audit preparation
3. Follow the checklists and templates provided

## Support

For questions about this compliance package:
- Email: compliance@zeroshare.io
- Documentation: https://docs.zeroshare.io/compliance

---
Generated by ZeroShare Compliance Reporter
`;
}

/**
 * Upload to S3 and get pre-signed URL
 */
async function uploadToS3(zipPath, zipName) {
  if (!AWS || localOnly) {
    console.log('  Skipping S3 upload (local mode or AWS SDK not available)');
    return null;
  }
  
  console.log(`\nUploading to S3: ${zipName}`);
  
  const s3 = new AWS.S3({ region: CONFIG.s3Region });
  const key = `compliance-reports/${new Date().getFullYear()}/${zipName}`;
  
  try {
    // Upload file
    await s3.upload({
      Bucket: CONFIG.s3Bucket,
      Key: key,
      Body: fs.createReadStream(zipPath),
      ContentType: 'application/zip',
      ServerSideEncryption: 'AES256',
    }).promise();
    
    console.log(`  Uploaded to s3://${CONFIG.s3Bucket}/${key}`);
    
    // Generate pre-signed URL
    const url = s3.getSignedUrl('getObject', {
      Bucket: CONFIG.s3Bucket,
      Key: key,
      Expires: CONFIG.linkExpiryDays * 24 * 60 * 60, // Convert days to seconds
    });
    
    console.log(`  Pre-signed URL generated (expires in ${CONFIG.linkExpiryDays} days)`);
    
    return { url, key, expiresIn: CONFIG.linkExpiryDays };
  } catch (e) {
    console.log(`  S3 upload failed: ${e.message}`);
    return null;
  }
}

/**
 * Send email with download links
 */
async function sendEmail(packages) {
  if (!AWS || localOnly) {
    console.log('\nSkipping email (local mode or AWS SDK not available)');
    console.log('Email would have been sent to:', CONFIG.emailTo);
    return;
  }
  
  console.log(`\nSending email to: ${CONFIG.emailTo}`);
  
  const ses = new AWS.SES({ region: CONFIG.s3Region });
  
  const emailBody = generateEmailBody(packages);
  const emailHtml = generateEmailHtml(packages);
  
  try {
    await ses.sendEmail({
      Source: CONFIG.emailFrom,
      Destination: {
        ToAddresses: [CONFIG.emailTo],
      },
      Message: {
        Subject: {
          Data: `ZeroShare Compliance Reports - ${new Date().toLocaleDateString()}`,
        },
        Body: {
          Text: { Data: emailBody },
          Html: { Data: emailHtml },
        },
      },
    }).promise();
    
    console.log('  Email sent successfully');
  } catch (e) {
    console.log(`  Email failed: ${e.message}`);
  }
}

/**
 * Generate plain text email body
 */
function generateEmailBody(packages) {
  let body = `ZeroShare Compliance Reports
Generated: ${new Date().toISOString()}

Your compliance documentation packages are ready for download.

`;

  for (const pkg of packages) {
    body += `
${pkg.certName}
${'='.repeat(pkg.certName.length)}
Package: ${pkg.zipName}
Size: ${(pkg.size / 1024).toFixed(1)} KB
`;
    if (pkg.s3) {
      body += `Download: ${pkg.s3.url}
(Link expires in ${pkg.s3.expiresIn} days)
`;
    } else {
      body += `Download: Available in GitHub Actions artifacts
`;
    }
  }

  body += `

---
This is an automated message from the ZeroShare Compliance System.
For questions, contact compliance@zeroshare.io
`;

  return body;
}

/**
 * Generate HTML email body
 */
function generateEmailHtml(packages) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 10px 0 0 0; opacity: 0.9; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .package { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
    .package h3 { margin: 0 0 10px 0; color: #667eea; }
    .package p { margin: 5px 0; color: #666; }
    .download-btn { display: inline-block; background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px; }
    .download-btn:hover { background: #5a6fd6; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px; }
    .badge { display: inline-block; background: #e9ecef; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Compliance Reports Ready</h1>
    <p>Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
  
  <div class="content">
    <p>Your compliance documentation packages are ready for download.</p>
    
    ${packages.map(pkg => `
    <div class="package">
      <h3>${pkg.certName} <span class="badge">${(pkg.size / 1024).toFixed(1)} KB</span></h3>
      <p><strong>Package:</strong> ${pkg.zipName}</p>
      ${pkg.s3 ? `
      <p><strong>Expires:</strong> ${pkg.s3.expiresIn} days</p>
      <a href="${pkg.s3.url}" class="download-btn">Download Package</a>
      ` : `
      <p><strong>Note:</strong> Available in GitHub Actions artifacts</p>
      `}
    </div>
    `).join('')}
    
    <div class="footer">
      <p>This is an automated message from the ZeroShare Compliance System.</p>
      <p>For questions, contact <a href="mailto:compliance@zeroshare.io">compliance@zeroshare.io</a></p>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('ZeroShare Compliance Report Generator');
  console.log('='.repeat(60));
  console.log(`Certification filter: ${certFilter}`);
  console.log(`Email recipient: ${CONFIG.emailTo}`);
  console.log(`Local only: ${localOnly}`);
  console.log('');
  
  // Determine which certifications to process
  let certsToProcess = [];
  if (certFilter === 'all') {
    certsToProcess = Object.keys(CERT_PACKAGES);
  } else if (CERT_PACKAGES[certFilter]) {
    certsToProcess = [certFilter];
  } else {
    console.error(`Unknown certification: ${certFilter}`);
    process.exit(1);
  }
  
  const results = [];
  
  for (const certKey of certsToProcess) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Processing: ${CERT_PACKAGES[certKey].name}`);
    console.log(`${'─'.repeat(50)}`);
    
    try {
      // Generate artifacts
      await generateArtifacts(certKey);
      
      // Create package
      const pkg = await createPackage(certKey);
      
      // Upload to S3
      const s3Result = await uploadToS3(pkg.zipPath, pkg.zipName);
      
      results.push({
        certKey,
        certName: CERT_PACKAGES[certKey].name,
        ...pkg,
        s3: s3Result,
      });
    } catch (e) {
      console.error(`  Error processing ${certKey}: ${e.message}`);
    }
  }
  
  // Send email
  if (results.length > 0) {
    await sendEmail(results);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Packages created: ${results.length}`);
  console.log(`Output directory: ${CONFIG.outputDir}`);
  console.log('\nGenerated packages:');
  for (const r of results) {
    console.log(`  - ${r.zipName} (${(r.size / 1024).toFixed(1)} KB)`);
    if (r.s3) {
      console.log(`    URL: ${r.s3.url.substring(0, 80)}...`);
    }
  }
}

main().catch(console.error);
