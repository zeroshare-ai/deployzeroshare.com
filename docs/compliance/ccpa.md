# CCPA Compliance Guide

## Overview

The California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), gives California residents rights over their personal information and imposes obligations on businesses that collect, use, or sell that information.

### Why CCPA Matters for ZeroShare

- **California market**: Must comply if serving California residents
- **Growing trend**: Similar laws in other states (Virginia, Colorado, etc.)
- **Foundation for privacy**: Builds privacy practices for other regulations
- **Relatively straightforward**: Less complex than GDPR

### CCPA vs CPRA

The CPRA (effective January 2023) amended and expanded CCPA:

| Feature | CCPA (Original) | CPRA (Current) |
|---------|-----------------|----------------|
| Enforcement | CA Attorney General | CA Privacy Protection Agency |
| Sensitive Data | Not defined | Special category |
| Correction Right | No | Yes |
| Opt-out Scope | Sale only | Sale AND sharing |
| Contractor Rules | Basic | Enhanced |
| Audit Rights | Limited | Expanded |

---

## Who Must Comply

### Business Threshold (Any One)

CCPA applies if you:
- Have annual gross revenue over $25 million, OR
- Buy, sell, or share personal information of 100,000+ California consumers, OR
- Derive 50%+ of annual revenue from selling/sharing California consumers' personal information

### ZeroShare Assessment

| Threshold | ZeroShare Status |
|-----------|------------------|
| $25M revenue | Check annual revenue |
| 100K consumers | Check California customer count |
| 50% from selling data | Not applicable (not selling data) |

**Even if thresholds not met:** Following CCPA best practices prepares you for growth and other state laws.

---

## Consumer Rights

| Right | Description | Response Time |
|-------|-------------|---------------|
| **Know** | What personal info is collected | 45 days |
| **Access** | Get a copy of personal info | 45 days |
| **Delete** | Request deletion of personal info | 45 days |
| **Correct** (CPRA) | Fix inaccurate personal info | 45 days |
| **Opt-Out** | Stop sale/sharing of personal info | 15 business days |
| **Limit** (CPRA) | Limit use of sensitive personal info | 15 business days |
| **Non-Discrimination** | Equal service regardless of rights exercise | N/A |

### Response Time Extensions

- 45-day extensions available with notice
- Total maximum: 90 days for most rights

---

## Requirements Checklist

### Notice Requirements

- [ ] Privacy Policy with required disclosures
- [ ] "Do Not Sell or Share My Personal Information" link
- [ ] "Limit the Use of My Sensitive Personal Information" link (if applicable)
- [ ] Notice at Collection (before or at time of collection)

### Consumer Rights Implementation

- [ ] Request submission methods (minimum 2, including toll-free number for certain businesses)
- [ ] Identity verification process
- [ ] Request tracking system
- [ ] Response procedures for each right type
- [ ] Non-discrimination policy

### Business Operations

- [ ] Personal information inventory
- [ ] Data flow mapping
- [ ] Vendor/contractor agreements
- [ ] Employee training
- [ ] Record retention (24 months)

---

## Implementation Process

### Step 1: Data Inventory (Weeks 1-3)

**Identify all personal information collected:**

```
Categories to Map:
□ Identifiers (name, email, account number, IP address)
□ Customer records (address, phone, payment info)
□ Protected classifications (age, gender)
□ Commercial information (purchase history)
□ Biometric information
□ Internet/network activity (browsing, search history)
□ Geolocation data
□ Sensory data (audio, video)
□ Professional/employment information
□ Education information
□ Inferences (profiles, predictions)
□ Sensitive personal information (SSN, financial, health, etc.)
```

**For each category document:**
- Source of collection
- Purpose of collection
- Whether sold or shared
- Categories of third parties receiving
- Retention period

### Step 2: Privacy Policy Updates (Weeks 2-4)

**Required Disclosures:**

```markdown
Privacy Policy Must Include:
1. Categories of personal information collected (past 12 months)
2. Sources of personal information
3. Business/commercial purpose for collection
4. Categories of third parties receiving information
5. Specific pieces of personal information collected
6. Whether personal information is sold or shared
7. Categories sold/shared (past 12 months)
8. Description of consumer rights
9. How to submit requests
10. Verification process
11. Financial incentive programs (if any)
12. How/when policy is updated
13. Effective date
```

**Privacy Policy Template Section:**

```markdown
## Your California Privacy Rights

If you are a California resident, you have the following rights:

**Right to Know and Access:** You may request, up to twice in a 12-month 
period, that we disclose to you the personal information we have collected, 
used, disclosed, and sold about you.

**Right to Delete:** You may request that we delete the personal information 
we have collected from you.

**Right to Correct:** You may request that we correct inaccurate personal 
information we maintain about you.

**Right to Opt-Out:** You may opt out of the sale or sharing of your 
personal information.

**Right to Non-Discrimination:** We will not discriminate against you for 
exercising any of your CCPA rights.

To exercise these rights, please [contact method].
```

### Step 3: Consumer Request Process (Weeks 3-5)

**Request Submission Methods:**

| Method | Requirement |
|--------|-------------|
| Website form | Recommended |
| Email address | privacy@company.com |
| Toll-free number | Required if offline collection |
| Physical mail | Optional |

**Request Handling Workflow:**

```
1. Receive Request
   └── Log in tracking system
   └── Send acknowledgment (within 10 days)

2. Verify Identity
   └── Match provided info to records
   └── May request additional verification
   └── Heightened verification for sensitive requests

3. Process Request
   └── Search all systems for consumer's data
   └── Compile response
   └── Prepare data in portable format if access request

4. Respond
   └── Within 45 days of receipt
   └── Deliver response via secure method
   └── Document response

5. Record Keeping
   └── Retain request records for 24 months
```

**Identity Verification:**

| Request Type | Verification Level |
|--------------|-------------------|
| Know (categories) | Reasonable |
| Know (specific pieces) | Reasonably high |
| Delete | Reasonable |
| Correct | Reasonably high |
| Opt-out | No verification required |

### Step 4: Opt-Out Implementation (Weeks 4-6)

**"Do Not Sell or Share" Link:**
- Must be clear and conspicuous
- On homepage (or all pages where data is collected)
- Link text: "Do Not Sell or Share My Personal Information"

**Opt-Out Mechanisms:**
- Website toggle/form
- Global Privacy Control (GPC) signal support
- Browser opt-out preferences

**GPC Implementation:**
```javascript
// Detect Global Privacy Control signal
if (navigator.globalPrivacyControl) {
  // Treat as opt-out of sale/sharing
  setOptOutStatus(true);
}
```

### Step 5: Vendor Management (Weeks 5-7)

**Contractor vs. Service Provider vs. Third Party:**

| Category | Definition | Contract Required |
|----------|------------|-------------------|
| Service Provider | Processes data for you under contract | Yes |
| Contractor | Similar to service provider (CPRA) | Yes, stricter |
| Third Party | Receives data for own purposes | N/A (would be "sharing") |

**Required Contract Terms (Service Providers/Contractors):**
- Prohibit selling/sharing data
- Prohibit use beyond contract scope
- Require confidentiality
- Require compliance assistance
- Allow data return/deletion

### Step 6: Training and Awareness (Weeks 6-8)

**Training Requirements:**
- All personnel handling consumer inquiries
- Privacy and data handling basics
- Request response procedures
- When to escalate

**Training Documentation:**
- Training materials
- Attendance records
- Periodic refreshers
- Updates when procedures change

### Step 7: Ongoing Compliance (Continuous)

- [ ] Annual privacy policy review
- [ ] Data inventory updates
- [ ] Request metrics tracking
- [ ] Vendor agreement reviews
- [ ] Training refreshers
- [ ] Monitor regulatory updates

---

## CI/CD Integration

### Automated Evidence Collection

```yaml
# Evidence artifacts generated for CCPA
ccpa_artifacts:
  - data-inventory.json            # Categories collected
  - data-flow-diagram.md           # How data moves
  - vendor-agreements.json         # SP/contractor list
  - request-log-sample.json        # DSR handling evidence
  - opt-out-mechanism.json         # Opt-out implementation
  - retention-audit.json           # Data retention compliance
  - training-records.json          # Staff training
```

### CCPA-Specific Checks

| Check | Frequency | Purpose |
|-------|-----------|---------|
| Privacy policy validation | Monthly | Ensure required disclosures |
| GPC signal handling | Daily | Verify opt-out mechanism |
| Vendor agreement status | Monthly | Track contract compliance |
| Data retention audit | Weekly | Verify retention policies |
| Request response time | Daily | Track response SLAs |

### Running Evidence Collection

```bash
# Generate all CCPA evidence
npm run compliance:ccpa

# Audit data inventory
npm run compliance:ccpa-inventory

# Check privacy policy compliance
npm run compliance:ccpa-policy-check

# Create auditor package
npm run compliance:auditor-package -- --certification=ccpa
```

---

## Costs & Timeline

### Typical Costs

| Item | Cost Range | Notes |
|------|------------|-------|
| Data Mapping | $2K-$8K | Often done internally |
| Legal Review | $3K-$10K | Privacy attorney |
| Policy Updates | $1K-$3K | Attorney review |
| Technical Implementation | $3K-$15K | Request system, opt-out |
| Training | $1K-$3K | Staff training |
| Ongoing Legal | $2K-$5K/year | Updates, reviews |

**Total First Year:** $12K-$45K
**Annual Ongoing:** $5K-$15K

### Timeline

```
Week 1-3:   Data inventory
Week 2-4:   Privacy policy updates
Week 3-5:   Consumer request process
Week 4-6:   Opt-out implementation
Week 5-7:   Vendor management
Week 6-8:   Training
Week 8+:    Ongoing compliance
```

**Timeline:** 8-12 weeks for initial compliance

---

## Penalties

### Civil Penalties

| Violation Type | Penalty |
|----------------|---------|
| Unintentional | Up to $2,500 per violation |
| Intentional | Up to $7,500 per violation |
| Violations involving minors | Up to $7,500 per violation |

### Private Right of Action

Consumers can sue directly for data breaches involving:
- Unencrypted or non-redacted personal information
- Unauthorized access, theft, or disclosure

**Statutory Damages:** $100-$750 per consumer per incident

---

## Multi-State Privacy Compliance

### Similar State Laws

| State | Law | Effective Date |
|-------|-----|----------------|
| Virginia | VCDPA | Jan 2023 |
| Colorado | CPA | July 2023 |
| Connecticut | CTDPA | July 2023 |
| Utah | UCPA | Dec 2023 |
| Oregon | OCPA | July 2024 |
| Texas | TDPSA | July 2024 |

### Harmonization Strategy

- Use CCPA as baseline (most comprehensive)
- Track state-specific differences
- Build flexible consent/opt-out mechanisms
- Maintain single privacy infrastructure

---

## ZeroShare's CCPA Value Proposition

**ZeroShare Gateway supports customer CCPA compliance:**

| CCPA Requirement | ZeroShare Feature |
|------------------|-------------------|
| Data Minimization | Prevents PII from reaching AI services |
| Security (Breach Protection) | Reduces breach risk from AI tools |
| Sensitive Data Protection | Detects and blocks sensitive PII |
| Privacy by Design | Built-in privacy controls |

**Marketing Message:** "ZeroShare Gateway helps organizations minimize personal information exposure to AI services, supporting CCPA compliance by preventing unauthorized disclosure of California consumers' data."

---

## Common Pitfalls

1. **Missing categories** - Inventory must be comprehensive
2. **Stale policies** - Annual updates required
3. **Slow responses** - 45-day deadline is strict
4. **GPC ignorance** - Must honor Global Privacy Control
5. **Vendor gaps** - Need contracts with all processors
6. **Records gaps** - 24-month retention required

---

## Resources

- [California AG CCPA Resources](https://oag.ca.gov/privacy/ccpa)
- [CA Privacy Protection Agency](https://cppa.ca.gov/)
- [CCPA Regulations](https://oag.ca.gov/privacy/ccpa/regs)
- [CPRA Full Text](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=1.81.5.&part=4.&chapter=&article=)

---

## Next Steps

1. [ ] Determine if CCPA thresholds are met
2. [ ] Complete personal information inventory
3. [ ] Update privacy policy
4. [ ] Implement consumer request process
5. [ ] Add opt-out mechanisms
6. [ ] Review vendor agreements
7. [ ] Train relevant staff

**Questions?** Contact compliance@zeroshare.io
