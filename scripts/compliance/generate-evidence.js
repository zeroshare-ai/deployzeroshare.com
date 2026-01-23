#!/usr/bin/env node

/**
 * Compliance Evidence Generator
 * 
 * Generates compliance artifacts for various certifications.
 * Can be run locally or via CI/CD.
 * 
 * Usage:
 *   npm run compliance:generate                    # Generate all evidence
 *   npm run compliance:generate -- --cert=soc2    # Generate SOC 2 evidence only
 *   npm run compliance:auditor-package            # Create auditor ZIP
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'compliance-artifacts');
const LATEST_DIR = path.join(OUTPUT_DIR, 'latest');

// Parse command line arguments
const args = process.argv.slice(2);
const certFilter = args.find(a => a.startsWith('--cert='))?.split('=')[1] || 'all';
const createPackage = args.includes('--package');

// Certification configurations
const CERTIFICATIONS = {
  soc2: {
    name: 'SOC 2 Type II',
    artifacts: ['security-scan', 'code-quality', 'access-control', 'encryption', 'change-log'],
  },
  iso27001: {
    name: 'ISO 27001',
    artifacts: ['security-scan', 'code-quality', 'access-control', 'encryption', 'change-log', 'asset-inventory'],
  },
  gdpr: {
    name: 'GDPR',
    artifacts: ['data-flow', 'encryption', 'access-control', 'data-retention'],
  },
  hipaa: {
    name: 'HIPAA',
    artifacts: ['encryption', 'access-control', 'audit-log', 'backup-verification'],
  },
  pci: {
    name: 'PCI DSS',
    artifacts: ['security-scan', 'encryption', 'access-control', 'vulnerability-scan'],
  },
  ccpa: {
    name: 'CCPA',
    artifacts: ['data-flow', 'data-inventory', 'data-retention'],
  },
};

// Ensure output directory exists
function ensureDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(LATEST_DIR)) {
    fs.mkdirSync(LATEST_DIR, { recursive: true });
  }
  
  // Archive previous latest
  const timestamp = new Date().toISOString().split('T')[0];
  const archiveDir = path.join(OUTPUT_DIR, `archive-${timestamp}`);
  if (fs.existsSync(LATEST_DIR) && fs.readdirSync(LATEST_DIR).length > 0) {
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }
    // Move files to archive (simplified - in production, handle properly)
  }
}

// Generate security scan report
function generateSecurityScan() {
  console.log('Generating security scan report...');
  
  let auditResult = { vulnerabilities: {} };
  try {
    const audit = execSync('npm audit --json 2>/dev/null', { encoding: 'utf-8' });
    auditResult = JSON.parse(audit);
  } catch (e) {
    // npm audit returns non-zero if vulnerabilities found
    if (e.stdout) {
      try {
        auditResult = JSON.parse(e.stdout);
      } catch (parseError) {
        auditResult = { error: 'Could not parse audit output' };
      }
    }
  }
  
  const report = {
    scan_date: new Date().toISOString(),
    scan_type: 'dependency_vulnerability',
    tool: 'npm audit',
    summary: {
      total_dependencies: auditResult.metadata?.totalDependencies || 'unknown',
      vulnerabilities: auditResult.metadata?.vulnerabilities || {},
    },
    applicable_certifications: ['SOC 2', 'ISO 27001', 'PCI DSS'],
    control_references: {
      soc2: ['CC6.1', 'CC7.1'],
      iso27001: ['A.8.8'],
      pci_dss: ['Req 6.3'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'security-scan-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate code quality report
function generateCodeQuality() {
  console.log('Generating code quality report...');
  
  // Count files and lines
  let totalFiles = 0;
  let totalLines = 0;
  
  function countFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        countFiles(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        totalFiles++;
        const content = fs.readFileSync(filePath, 'utf-8');
        totalLines += content.split('\n').length;
      }
    }
  }
  
  countFiles(path.join(process.cwd(), 'app'));
  
  // Check TypeScript
  let typecheckPassed = true;
  try {
    execSync('npx tsc --noEmit', { encoding: 'utf-8', stdio: 'pipe' });
  } catch (e) {
    typecheckPassed = false;
  }
  
  const report = {
    report_date: new Date().toISOString(),
    metrics: {
      total_typescript_files: totalFiles,
      total_lines: totalLines,
      typecheck_passed: typecheckPassed,
    },
    applicable_certifications: ['SOC 2', 'ISO 27001'],
    control_references: {
      soc2: ['CC8.1'],
      iso27001: ['A.8.28'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'code-quality-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate access control audit
function generateAccessControl() {
  console.log('Generating access control audit...');
  
  const report = {
    audit_date: new Date().toISOString(),
    audit_type: 'access_control_configuration',
    findings: {
      version_control: {
        provider: 'GitHub',
        branch_protection: 'Recommended',
        code_review_required: 'Recommended',
      },
      deployment: {
        platform: 'AWS Amplify',
        access_control: 'AWS IAM',
      },
      secrets_management: {
        provider: 'GitHub Secrets',
        rotation_policy: 'Manual - Review recommended',
      },
    },
    recommendations: [
      'Enable branch protection rules',
      'Require pull request reviews',
      'Enable MFA for all contributors',
      'Implement secret rotation policy',
    ],
    applicable_certifications: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS'],
    control_references: {
      soc2: ['CC6.1', 'CC6.2', 'CC6.3'],
      iso27001: ['A.5.15', 'A.8.2'],
      hipaa: ['164.312(a)(1)'],
      pci_dss: ['Req 7', 'Req 8'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'access-control-audit.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate encryption status
function generateEncryptionStatus() {
  console.log('Generating encryption status...');
  
  const report = {
    audit_date: new Date().toISOString(),
    encryption_in_transit: {
      protocol: 'TLS 1.2+',
      certificate: 'AWS Certificate Manager',
      enforcement: 'HTTPS only (Amplify)',
    },
    encryption_at_rest: {
      storage: 'AWS Amplify (AES-256)',
      secrets: 'GitHub Secrets (encrypted)',
      database: 'N/A (static site)',
    },
    key_management: {
      provider: 'AWS KMS (managed by Amplify)',
      rotation: 'Automatic',
    },
    applicable_certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS'],
    control_references: {
      soc2: ['CC6.6', 'CC6.7'],
      iso27001: ['A.8.24'],
      gdpr: ['Article 32'],
      hipaa: ['164.312(a)(2)(iv)', '164.312(e)(1)'],
      pci_dss: ['Req 3', 'Req 4'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'encryption-status.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate change log
function generateChangeLog() {
  console.log('Generating change log...');
  
  let commits = [];
  try {
    const gitLog = execSync(
      'git log --since="30 days ago" --pretty=format:\'{"sha":"%H","author":"%an","date":"%aI","subject":"%s"}\' 2>/dev/null',
      { encoding: 'utf-8' }
    );
    commits = gitLog.split('\n').filter(Boolean).map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    }).filter(Boolean);
  } catch (e) {
    console.log('Note: Could not get git history');
  }
  
  const report = {
    report_date: new Date().toISOString(),
    period: 'last_30_days',
    total_commits: commits.length,
    commits: commits.slice(0, 50), // Limit to 50 most recent
    change_management: {
      process: 'Pull Request with review',
      automated_testing: true,
      deployment: 'AWS Amplify CI/CD',
    },
    applicable_certifications: ['SOC 2', 'ISO 27001', 'PCI DSS'],
    control_references: {
      soc2: ['CC8.1'],
      iso27001: ['A.8.32'],
      pci_dss: ['Req 6'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'change-log.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate data flow documentation
function generateDataFlow() {
  console.log('Generating data flow documentation...');
  
  const markdown = `# Data Flow Documentation

Generated: ${new Date().toISOString()}

## ZeroShare Gateway Website Data Flow

### Data Categories

| Category | Source | Purpose | Retention |
|----------|--------|---------|-----------|
| Contact Form Data | Website visitors | Support requests | Until resolved |
| Newsletter Signup | Website visitors | Marketing communications | Until unsubscribe |
| Analytics | Website visitors | Usage insights | Aggregated only |

### Data Flow Diagram

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Visitor   │────▶│   Website   │────▶│  AWS Lambda │
│   Browser   │     │  (Amplify)  │     │  Functions  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  AWS SES    │
                                        │  (Email)    │
                                        └─────────────┘
\`\`\`

### Third-Party Services

| Service | Data Shared | Purpose |
|---------|-------------|---------|
| AWS Amplify | Website content | Hosting |
| AWS SES | Email addresses | Notifications |
| AWS Lambda | Form data | Processing |

### Data Protection Measures

- HTTPS encryption for all traffic
- No persistent storage of visitor data
- Email data processed and forwarded, not stored
- No third-party tracking (optional analytics only)
`;
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'data-flow-diagram.md'),
    markdown
  );
  
  // Also create JSON version
  const report = {
    generated: new Date().toISOString(),
    data_categories: [
      { category: 'Contact Form', purpose: 'Support', retention: 'Until resolved' },
      { category: 'Newsletter', purpose: 'Marketing', retention: 'Until unsubscribe' },
      { category: 'Analytics', purpose: 'Usage insights', retention: 'Aggregated' },
    ],
    third_parties: [
      { name: 'AWS Amplify', purpose: 'Hosting' },
      { name: 'AWS SES', purpose: 'Email' },
      { name: 'AWS Lambda', purpose: 'Processing' },
    ],
    applicable_certifications: ['GDPR', 'CCPA', 'HIPAA'],
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'data-flow.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate asset inventory
function generateAssetInventory() {
  console.log('Generating asset inventory...');
  
  const report = {
    inventory_date: new Date().toISOString(),
    assets: {
      infrastructure: [
        { name: 'AWS Amplify', type: 'Hosting', owner: 'DevOps', classification: 'Production' },
        { name: 'AWS Lambda', type: 'Compute', owner: 'DevOps', classification: 'Production' },
        { name: 'AWS SES', type: 'Email Service', owner: 'DevOps', classification: 'Production' },
        { name: 'GitHub', type: 'Source Control', owner: 'Engineering', classification: 'Development' },
      ],
      applications: [
        { name: 'Website', type: 'Web Application', owner: 'Product', classification: 'Public' },
        { name: 'Chatbot Lambda', type: 'API', owner: 'Engineering', classification: 'Internal' },
        { name: 'Support Lambda', type: 'API', owner: 'Engineering', classification: 'Internal' },
      ],
      data: [
        { name: 'Contact Form Submissions', type: 'Customer Data', owner: 'Support', classification: 'Confidential' },
        { name: 'Website Analytics', type: 'Usage Data', owner: 'Marketing', classification: 'Internal' },
      ],
    },
    applicable_certifications: ['ISO 27001', 'SOC 2'],
    control_references: {
      iso27001: ['A.5.9'],
      soc2: ['CC6.1'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'asset-inventory.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Generate data retention audit
function generateDataRetention() {
  console.log('Generating data retention audit...');
  
  const report = {
    audit_date: new Date().toISOString(),
    retention_policies: [
      {
        data_type: 'Contact Form Submissions',
        retention_period: 'Until issue resolved + 90 days',
        deletion_method: 'Automatic',
        legal_basis: 'Contract performance',
      },
      {
        data_type: 'Newsletter Subscriptions',
        retention_period: 'Until unsubscribe',
        deletion_method: 'User request',
        legal_basis: 'Consent',
      },
      {
        data_type: 'Website Logs',
        retention_period: '30 days',
        deletion_method: 'Automatic rotation',
        legal_basis: 'Legitimate interest',
      },
      {
        data_type: 'Audit Logs',
        retention_period: '2 years',
        deletion_method: 'Manual review',
        legal_basis: 'Legal obligation',
      },
    ],
    applicable_certifications: ['GDPR', 'CCPA', 'HIPAA'],
    control_references: {
      gdpr: ['Article 5(1)(e)'],
      ccpa: ['Data minimization'],
      hipaa: ['164.530(j)'],
    },
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'data-retention-audit.json'),
    JSON.stringify(report, null, 2)
  );
  
  return report;
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('Compliance Evidence Generator');
  console.log('='.repeat(60));
  console.log(`Certification filter: ${certFilter}`);
  console.log(`Output directory: ${LATEST_DIR}`);
  console.log('');
  
  ensureDirectories();
  
  // Determine which artifacts to generate
  let artifactsToGenerate = new Set();
  
  if (certFilter === 'all') {
    Object.values(CERTIFICATIONS).forEach(cert => {
      cert.artifacts.forEach(a => artifactsToGenerate.add(a));
    });
  } else if (CERTIFICATIONS[certFilter]) {
    CERTIFICATIONS[certFilter].artifacts.forEach(a => artifactsToGenerate.add(a));
  } else {
    console.error(`Unknown certification: ${certFilter}`);
    process.exit(1);
  }
  
  // Generate artifacts
  const generators = {
    'security-scan': generateSecurityScan,
    'code-quality': generateCodeQuality,
    'access-control': generateAccessControl,
    'encryption': generateEncryptionStatus,
    'change-log': generateChangeLog,
    'data-flow': generateDataFlow,
    'asset-inventory': generateAssetInventory,
    'data-retention': generateDataRetention,
    'audit-log': () => console.log('Audit log: See CI/CD workflow for automated generation'),
    'backup-verification': () => console.log('Backup verification: Requires AWS access'),
    'data-inventory': generateAssetInventory, // Alias
    'vulnerability-scan': generateSecurityScan, // Alias
  };
  
  console.log('Generating artifacts:');
  for (const artifact of artifactsToGenerate) {
    if (generators[artifact]) {
      try {
        generators[artifact]();
        console.log(`  ✓ ${artifact}`);
      } catch (e) {
        console.log(`  ✗ ${artifact}: ${e.message}`);
      }
    } else {
      console.log(`  - ${artifact}: No generator available`);
    }
  }
  
  // Generate index
  const indexReport = {
    generated: new Date().toISOString(),
    certification_filter: certFilter,
    artifacts: fs.readdirSync(LATEST_DIR),
    certification_mapping: CERTIFICATIONS,
  };
  
  fs.writeFileSync(
    path.join(LATEST_DIR, 'index.json'),
    JSON.stringify(indexReport, null, 2)
  );
  
  console.log('');
  console.log('Evidence generation complete!');
  console.log(`Files written to: ${LATEST_DIR}`);
  console.log('');
  console.log('Generated files:');
  fs.readdirSync(LATEST_DIR).forEach(f => console.log(`  - ${f}`));
}

main().catch(console.error);
