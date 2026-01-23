# Technical Controls Evidence Collection Guide

This guide explains how to collect evidence for technical security controls required by various compliance certifications.

---

## Access Control Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| User access list | All users and their roles | Quarterly | SOC 2, ISO 27001, HIPAA, PCI DSS |
| Access reviews | Documentation of periodic reviews | Quarterly | SOC 2, ISO 27001, HIPAA |
| Terminated user removal | Proof of timely deprovisioning | Per occurrence | All |
| MFA configuration | Proof MFA is enabled | Monthly | All |
| Privileged access list | Admin/elevated access users | Monthly | All |

### Collection Methods

#### User Access List

**Automated (CI/CD):**
```bash
# GitHub repository collaborators
gh api repos/{owner}/{repo}/collaborators --jq '.[] | {login, role: .role_name}'

# AWS IAM users (if applicable)
aws iam list-users --query 'Users[*].[UserName,CreateDate]'
```

**Manual:**
1. Export user list from identity provider (Okta, Auth0, etc.)
2. Export from GitHub organization settings
3. Export from AWS IAM console

#### MFA Verification

**GitHub:**
```bash
# Check org MFA enforcement
gh api orgs/{org} --jq '.two_factor_requirement_enabled'
```

**AWS:**
```bash
# Check for users without MFA
aws iam generate-credential-report
aws iam get-credential-report --query 'Content' --output text | base64 -d
```

---

## Encryption Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| TLS configuration | Cipher suites, protocol versions | Monthly | All |
| Certificate status | Valid certificates | Weekly | All |
| Encryption at rest | Storage encryption configuration | Monthly | All |
| Key management | Key rotation, access controls | Quarterly | SOC 2, ISO 27001, PCI DSS |

### Collection Methods

#### TLS/HTTPS Verification

**Automated (CI/CD):**
```bash
# Check TLS configuration
echo | openssl s_client -connect deployzeroshare.com:443 2>/dev/null | openssl x509 -noout -dates -subject

# SSL Labs API (if available)
curl "https://api.ssllabs.com/api/v3/analyze?host=deployzeroshare.com"
```

**Manual:**
1. Use SSL Labs (ssllabs.com/ssltest)
2. Export certificate details
3. Document cipher suite configuration

#### Encryption at Rest

**AWS Amplify:**
- Amplify automatically encrypts at rest
- Document: AWS Amplify uses AES-256 encryption

**Screenshot Evidence:**
1. AWS Console → Amplify → App settings
2. Capture encryption configuration

---

## Logging and Monitoring Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Log configuration | What is logged | Monthly | All |
| Log samples | Sample log entries | Monthly | SOC 2, ISO 27001, PCI DSS |
| Log retention | Retention period proof | Quarterly | All |
| Alert configuration | Security alerting setup | Monthly | SOC 2, ISO 27001 |
| Log reviews | Evidence of review | Weekly/Monthly | All |

### Collection Methods

#### Log Configuration

**GitHub Actions:**
```yaml
# Workflow logs are retained automatically
# Document: GitHub Actions logs retained for 90 days
```

**AWS CloudWatch (if applicable):**
```bash
# List log groups
aws logs describe-log-groups

# Get retention settings
aws logs describe-log-groups --query 'logGroups[*].[logGroupName,retentionInDays]'
```

#### Log Samples

**Sanitized samples showing:**
- Authentication events
- Authorization decisions
- Configuration changes
- Error conditions

**Important:** Redact any PII or sensitive data from samples.

---

## Vulnerability Management Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Vulnerability scans | Scan reports | Weekly/Monthly | All |
| Dependency audit | Package vulnerabilities | Daily/Weekly | SOC 2, ISO 27001, PCI DSS |
| Penetration tests | Annual pentest report | Annual | SOC 2, ISO 27001, PCI DSS |
| Remediation tracking | Fix timelines | Per occurrence | All |

### Collection Methods

#### Dependency Scanning

**Automated (CI/CD):**
```bash
# npm audit
npm audit --json > vulnerability-report.json

# GitHub Dependabot
gh api repos/{owner}/{repo}/vulnerability-alerts
```

#### Penetration Testing

1. Engage third-party penetration testing firm
2. Define scope (external, internal, application)
3. Conduct test
4. Receive report
5. Remediate findings
6. Obtain retest confirmation

**Required for:**
- SOC 2 (annual)
- ISO 27001 (recommended)
- PCI DSS (annual + after significant changes)

---

## Change Management Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Change requests | PRs, tickets | Per change | SOC 2, ISO 27001, PCI DSS |
| Approval records | PR reviews, approvals | Per change | All |
| Deployment logs | CI/CD deployment records | Per deployment | All |
| Rollback procedures | Documented procedures | Annual | SOC 2, ISO 27001 |

### Collection Methods

#### Pull Request Evidence

**Automated (CI/CD):**
```bash
# List merged PRs
gh pr list --state merged --limit 100 --json number,title,author,mergedAt,reviews

# Get specific PR details
gh pr view {number} --json reviews,commits,mergedAt
```

#### Deployment Logs

**AWS Amplify:**
- Amplify console → App → Build history
- Export build/deployment logs

**GitHub Actions:**
- Actions tab → Workflow runs
- Download logs for specific runs

---

## Backup and Recovery Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Backup configuration | What/when/where | Monthly | All |
| Backup verification | Proof backups completed | Weekly | All |
| Recovery testing | DR test results | Annual | SOC 2, ISO 27001, HIPAA |
| RTO/RPO documentation | Recovery objectives | Annual | All |

### Collection Methods

#### Backup Verification

**AWS (if applicable):**
```bash
# S3 versioning status
aws s3api get-bucket-versioning --bucket {bucket-name}

# List recent backups
aws s3 ls s3://{backup-bucket}/ --recursive
```

#### Recovery Testing

1. Schedule annual DR test
2. Document test plan
3. Execute test (restore from backup)
4. Verify data integrity
5. Document results and timing
6. Note any issues and remediation

---

## Network Security Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Network diagram | Architecture documentation | Annual + changes | All |
| Firewall rules | Security group/firewall config | Quarterly | SOC 2, ISO 27001, PCI DSS |
| Segmentation | Network isolation proof | Annual | PCI DSS |

### Collection Methods

#### Network Diagram

Create/update diagram showing:
- Internet-facing components
- Internal components
- Data flows
- Security boundaries
- Third-party connections

**Tools:** draw.io, Lucidchart, or architecture-as-code

#### Firewall/Security Group Configuration

**AWS (if applicable):**
```bash
# List security groups
aws ec2 describe-security-groups --query 'SecurityGroups[*].[GroupId,GroupName,Description]'

# Get specific security group rules
aws ec2 describe-security-groups --group-ids {sg-id}
```

---

## Artifact Generation Script

The following script generates technical control evidence:

```bash
#!/bin/bash
# Generate technical control evidence

OUTPUT_DIR="compliance-artifacts/technical-controls"
mkdir -p $OUTPUT_DIR

# Date stamp
DATE=$(date +%Y-%m-%d)

# TLS Check
echo "Checking TLS configuration..."
echo | openssl s_client -connect deployzeroshare.com:443 2>/dev/null | \
  openssl x509 -noout -text > "$OUTPUT_DIR/tls-certificate-$DATE.txt"

# npm audit
echo "Running dependency audit..."
npm audit --json > "$OUTPUT_DIR/npm-audit-$DATE.json" 2>&1 || true

# Git log
echo "Collecting change log..."
git log --since="30 days ago" --pretty=format:'%H|%an|%ae|%aI|%s' > "$OUTPUT_DIR/git-log-$DATE.txt"

# PR list (requires gh CLI)
echo "Collecting PR history..."
gh pr list --state merged --limit 50 --json number,title,author,mergedAt > "$OUTPUT_DIR/pr-history-$DATE.json" 2>/dev/null || echo "GitHub CLI not available"

echo "Evidence collection complete. Files in: $OUTPUT_DIR"
```

---

## Evidence Retention

| Evidence Type | Minimum Retention | Recommended |
|---------------|------------------|-------------|
| Access logs | 1 year | 2 years |
| Change records | 1 year | 3 years |
| Audit reports | 3 years | 7 years |
| Vulnerability scans | 1 year | 3 years |
| Penetration tests | 3 years | 5 years |
| Training records | 3 years | 5 years |

---

## Evidence Organization

Organize evidence by:
```
compliance-artifacts/
├── access-control/
│   ├── user-lists/
│   ├── access-reviews/
│   └── mfa-verification/
├── encryption/
│   ├── tls-certificates/
│   └── encryption-config/
├── logging/
│   ├── log-config/
│   ├── log-samples/
│   └── alert-config/
├── vulnerability/
│   ├── scans/
│   ├── audits/
│   └── pentests/
├── change-management/
│   ├── prs/
│   └── deployments/
├── backup/
│   ├── config/
│   └── test-results/
└── network/
    ├── diagrams/
    └── firewall-rules/
```

---

## Automation Recommendations

1. **Daily:** Dependency scans, backup verification
2. **Weekly:** Access log samples, vulnerability scans
3. **Monthly:** Full evidence collection, access reviews
4. **Quarterly:** Comprehensive audit package
5. **Annual:** Penetration test, DR test, full audit
