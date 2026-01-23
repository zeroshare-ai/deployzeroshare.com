# PCI DSS Compliance Guide

## Overview

The Payment Card Industry Data Security Standard (PCI DSS) is a set of security requirements designed to ensure that all companies that process, store, or transmit credit card information maintain a secure environment.

### Why PCI DSS Matters for ZeroShare

- **Payment processing**: Required if handling credit card data
- **Customer trust**: Demonstrates security commitment
- **Reduced liability**: Limits breach-related fines
- **Product alignment**: ZeroShare detects credit card numbers in AI prompts

### PCI DSS Compliance Levels

Compliance requirements vary by transaction volume:

| Level | Annual Transactions | Requirements |
|-------|---------------------|--------------|
| 1 | 6M+ | Annual QSA audit, quarterly ASV scans |
| 2 | 1M - 6M | Annual SAQ, quarterly ASV scans |
| 3 | 20K - 1M | Annual SAQ, quarterly ASV scans |
| 4 | <20K | Annual SAQ, ASV scan may be required |

**ZeroShare Status:** Likely Level 4 (as software vendor, not payment processor)

---

## PCI DSS 4.0 Overview

PCI DSS 4.0 (released March 2022, mandatory March 2025) includes 12 requirements organized into 6 goals:

### Goals and Requirements

| Goal | Requirement |
|------|-------------|
| **Build and Maintain Secure Network** | 1. Install and maintain network security controls |
| | 2. Apply secure configurations |
| **Protect Account Data** | 3. Protect stored account data |
| | 4. Protect cardholder data during transmission |
| **Maintain Vulnerability Management** | 5. Protect against malicious software |
| | 6. Develop and maintain secure systems |
| **Implement Strong Access Control** | 7. Restrict access by need to know |
| | 8. Identify users and authenticate access |
| | 9. Restrict physical access |
| **Monitor and Test Networks** | 10. Log and monitor access |
| | 11. Test security regularly |
| **Maintain Information Security Policy** | 12. Support security with policies and programs |

---

## Requirements Checklist

### Requirement 1: Network Security Controls

- [ ] Firewall configuration standards
- [ ] Network diagram documentation
- [ ] Cardholder data environment (CDE) defined
- [ ] Firewall rules reviewed bi-annually
- [ ] Traffic restricted to business-justified connections

### Requirement 2: Secure Configurations

- [ ] Vendor defaults changed
- [ ] Unnecessary services disabled
- [ ] Security features enabled
- [ ] System hardening standards
- [ ] Non-console admin access encrypted

### Requirement 3: Protect Stored Data

- [ ] Data retention policy
- [ ] Minimize cardholder data storage
- [ ] Mask PAN when displayed (show only last 4)
- [ ] Strong cryptography for stored PAN
- [ ] Key management procedures

### Requirement 4: Encryption in Transit

- [ ] Strong cryptography for transmission
- [ ] No unprotected PANs via messaging
- [ ] TLS 1.2+ for all cardholder data
- [ ] Certificate management procedures

### Requirement 5: Malware Protection

- [ ] Anti-malware deployed on all systems
- [ ] Anti-malware kept current
- [ ] Scans performed regularly
- [ ] Audit logs maintained

### Requirement 6: Secure Development

- [ ] Security in development process
- [ ] Public-facing web apps protected
- [ ] Security patches applied promptly
- [ ] Change control procedures
- [ ] Code review for custom applications

### Requirement 7: Access Restriction

- [ ] Access limited by job function
- [ ] Access control system implemented
- [ ] Default deny for access
- [ ] Access reviews performed

### Requirement 8: Authentication

- [ ] Unique user IDs for all users
- [ ] Strong authentication mechanisms
- [ ] MFA for remote and admin access
- [ ] Password policies enforced
- [ ] Inactivity timeout

### Requirement 9: Physical Security

- [ ] Physical access controls
- [ ] Visitor management
- [ ] Media protection
- [ ] POS device security

### Requirement 10: Logging and Monitoring

- [ ] Audit trails for all access
- [ ] Time synchronization
- [ ] Log protection
- [ ] Log review procedures
- [ ] File integrity monitoring

### Requirement 11: Security Testing

- [ ] Wireless scanning
- [ ] Quarterly vulnerability scans (ASV)
- [ ] Internal vulnerability scans
- [ ] Penetration testing annually
- [ ] Change detection mechanisms

### Requirement 12: Security Policies

- [ ] Information security policy
- [ ] Risk assessment process
- [ ] Security awareness program
- [ ] Incident response plan
- [ ] Service provider management

---

## Implementation Process

### Step 1: Scope Definition (Weeks 1-2)

**Define the Cardholder Data Environment (CDE):**

```
Questions to Answer:
1. Where does cardholder data enter our systems?
2. Where is cardholder data stored?
3. Where does cardholder data flow?
4. Which systems process cardholder data?
5. Which systems connect to the CDE?
```

**Scope Reduction Strategies:**
- Tokenization (replace PAN with token)
- Point-to-point encryption (P2PE)
- Network segmentation
- Outsource to PCI-compliant processor

**ZeroShare Approach:** 
- Use Stripe/payment processor for all payments
- Never store cardholder data directly
- CDE is minimal or non-existent

### Step 2: Gap Assessment (Weeks 3-5)

**Compare current state to each requirement:**

| Requirement | Current State | Gap | Remediation |
|-------------|--------------|-----|-------------|
| 1.1 Firewall | Firewall exists | Documentation missing | Create documentation |
| 3.4 PAN protection | Not applicable | N/A | Document exclusion |
| 8.3 MFA | MFA on admin | Need MFA everywhere | Expand MFA deployment |
| ... | ... | ... | ... |

### Step 3: Remediation (Weeks 6-16)

**Priority Order:**

1. **High Priority (Data Protection)**
   - Encryption at rest and in transit
   - Key management
   - Data minimization

2. **Medium Priority (Access Control)**
   - MFA implementation
   - Access reviews
   - User provisioning

3. **Standard Priority (Operations)**
   - Logging and monitoring
   - Vulnerability management
   - Change management

### Step 4: Self-Assessment Questionnaire (Weeks 14-18)

**SAQ Types:**

| SAQ | Applies To |
|-----|------------|
| SAQ A | Card-not-present, fully outsourced |
| SAQ A-EP | E-commerce with website impacts |
| SAQ B | Imprint or dial-out terminal only |
| SAQ B-IP | IP-connected terminals |
| SAQ C | Payment application systems |
| SAQ C-VT | Virtual terminal only |
| SAQ D | Everyone else / Service Providers |

**ZeroShare Likely SAQ:** SAQ A (if payments fully outsourced to Stripe)

### Step 5: ASV Scanning (Quarterly)

**Approved Scanning Vendor (ASV) Requirements:**

- Quarterly external vulnerability scans
- Must pass (no high vulnerabilities)
- Required for all but SAQ A/A-EP

**ASV Providers:**
- Qualys
- Trustwave
- SecurityMetrics
- Tenable

**Cost:** $500-$2,000/quarter

### Step 6: Penetration Testing (Annual)

**Required for:**
- All Level 1 merchants
- Some Level 2+ merchants
- Service providers

**Scope:**
- External penetration test
- Internal penetration test (if applicable)
- Segmentation testing

**Cost:** $5,000-$30,000 depending on scope

### Step 7: Validation (Ongoing)

**Maintain Evidence:**
- Completed SAQ
- ASV scan reports (passing)
- Penetration test reports
- Policy documentation
- Training records
- Incident response tests

---

## Service Provider Requirements

If ZeroShare is a service provider (handles cardholder data for customers):

### Additional Requirements

- [ ] Acknowledge responsibility for cardholder data
- [ ] Written agreement with customers
- [ ] PCI DSS compliance program
- [ ] Provide compliance evidence to customers

### Service Provider Levels

| Level | Annual Transactions | Requirements |
|-------|---------------------|--------------|
| 1 | 300K+ | Annual QSA audit, quarterly ASV |
| 2 | <300K | Annual SAQ-D, quarterly ASV |

### Attestation of Compliance (AOC)

Service providers should provide:
- Annual AOC to customers
- Evidence of compliance
- Description of services in scope

---

## CI/CD Integration

### Automated Evidence Collection

```yaml
# Evidence artifacts generated for PCI DSS
pci_artifacts:
  - network-diagram.md             # Req 1
  - security-configuration.json    # Req 2
  - encryption-status.json         # Req 3, 4
  - security-scan-report.json      # Req 5, 6, 11
  - access-control-audit.json      # Req 7, 8
  - audit-log-sample.json         # Req 10
  - vulnerability-scan.json        # Req 11
  - policy-index.json             # Req 12
```

### PCI-Specific Checks

| Check | Frequency | PCI Requirement |
|-------|-----------|-----------------|
| Encryption verification | Daily | 3, 4 |
| Vulnerability scan | Weekly | 6, 11 |
| Access control audit | Weekly | 7, 8 |
| Log integrity check | Daily | 10 |
| Anti-malware status | Daily | 5 |
| Patch status | Weekly | 6 |

### Running Evidence Collection

```bash
# Generate all PCI DSS evidence
npm run compliance:pci

# Check encryption status
npm run compliance:pci-encryption

# Run internal vulnerability scan
npm run compliance:pci-vuln-scan

# Create auditor package
npm run compliance:auditor-package -- --certification=pci
```

---

## Costs & Timeline

### Typical Costs (Level 4 Merchant)

| Item | Cost Range | Notes |
|------|------------|-------|
| Gap Assessment | $3K-$10K | Often internal |
| Remediation | $5K-$30K | Depends on gaps |
| SAQ Completion | $0-$5K | Internal or consultant |
| ASV Scanning | $2K-$8K/year | Quarterly scans |
| Penetration Test | $5K-$20K/year | If required |
| Compliance Tools | $2K-$10K/year | Optional automation |

**Total First Year:** $15K-$75K
**Annual Ongoing:** $10K-$40K

### Level 1 Costs (QSA Required)

| Item | Cost Range |
|------|------------|
| QSA Audit | $50K-$200K |
| Remediation | $50K-$500K |
| Ongoing Compliance | $50K-$150K/year |

### Timeline

```
Week 1-2:   Scope definition
Week 3-5:   Gap assessment
Week 6-16:  Remediation
Week 14-18: SAQ completion
Week 18+:   Ongoing compliance
```

**Timeline:** 4-6 months for initial compliance (Level 4)

---

## PCI DSS 4.0 New Requirements

Key changes in PCI DSS 4.0 (mandatory March 2025):

### New Requirements

| Requirement | Description | Impact |
|-------------|-------------|--------|
| 3.3.3 | SAD not stored after authorization | Low (if not storing) |
| 5.3.3 | Anti-malware for removable media | Low |
| 5.4.1 | Phishing protection | Medium |
| 6.3.2 | Software inventory | Medium |
| 6.4.2 | Web app attacks via WAF | Medium |
| 8.3.6 | Password complexity | Low |
| 8.4.2 | MFA for CDE access | Medium |
| 12.3.1 | Targeted risk analysis | Medium |

### Customized Approach

PCI DSS 4.0 allows "customized approach":
- Meet control objectives differently
- Requires additional documentation
- Needs assessor approval

---

## ZeroShare's PCI Value Proposition

**ZeroShare Gateway supports customer PCI compliance:**

| PCI Requirement | ZeroShare Feature |
|-----------------|-------------------|
| Req 3 (Protect Stored Data) | Detects PANs before AI transmission |
| Req 4 (Protect in Transit) | Prevents PAN exposure to AI services |
| Req 6 (Secure Systems) | Adds DLP layer to AI tools |
| Req 7 (Restrict Access) | Prevents accidental PAN disclosure |

**Marketing Message:** "ZeroShare Gateway automatically detects and blocks credit card numbers and other payment data from being sent to AI services, helping maintain PCI DSS compliance."

---

## Common Pitfalls

1. **Scope creep** - Not properly defining CDE boundaries
2. **Shared hosting** - Compliance complications
3. **Third-party scripts** - On payment pages
4. **Paper records** - Often overlooked
5. **Test data** - Using real PANs in test environments
6. **Legacy systems** - Unsupported software in CDE

---

## Resources

- [PCI Security Standards Council](https://www.pcisecuritystandards.org/)
- [PCI DSS 4.0 Documents](https://www.pcisecuritystandards.org/document_library)
- [SAQ Instructions](https://www.pcisecuritystandards.org/document_library?category=saqs)
- [ASV Program Guide](https://www.pcisecuritystandards.org/assessors_and_solutions/approved_scanning_vendors)

---

## Next Steps

1. [ ] Determine if PCI DSS applies
2. [ ] Define cardholder data environment scope
3. [ ] Consider scope reduction (tokenization)
4. [ ] Conduct gap assessment
5. [ ] Implement remediation
6. [ ] Select ASV for quarterly scans
7. [ ] Complete appropriate SAQ

**Questions?** Contact compliance@zeroshare.io
