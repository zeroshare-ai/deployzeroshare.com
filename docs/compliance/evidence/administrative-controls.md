# Administrative Controls Evidence Collection Guide

This guide explains how to collect evidence for administrative and policy-based controls required by various compliance certifications.

---

## Policy Documentation Evidence

### Required Policies

| Policy | Description | Certifications |
|--------|-------------|----------------|
| Information Security Policy | Overall security framework | All |
| Access Control Policy | User access management | All |
| Data Classification Policy | Data handling by sensitivity | SOC 2, ISO 27001, GDPR |
| Acceptable Use Policy | Appropriate system usage | SOC 2, ISO 27001 |
| Incident Response Policy | Security incident handling | All |
| Business Continuity Policy | Continuity and DR | SOC 2, ISO 27001, HIPAA |
| Data Retention Policy | Data lifecycle management | GDPR, CCPA, HIPAA |
| Vendor Management Policy | Third-party security | All |
| Change Management Policy | System changes | SOC 2, ISO 27001, PCI DSS |
| Privacy Policy | Personal data handling | GDPR, CCPA, HIPAA |

### Evidence Requirements

For each policy, document:
- Current version number
- Effective date
- Last review date
- Approval signatures
- Distribution method
- Employee acknowledgments

### Templates Location

Templates are available in `docs/compliance/templates/`:
- `security-policy.md` - Information Security Policy
- `incident-response-plan.md` - Incident Response
- `data-processing-agreement.md` - DPA template
- `vendor-assessment.md` - Vendor assessment questionnaire

---

## Risk Assessment Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Risk assessment | Identification of risks | Annual | All |
| Risk register | Tracked risks and treatment | Ongoing | ISO 27001, SOC 2 |
| Risk treatment plan | How risks are addressed | Annual | ISO 27001 |
| Risk acceptance | Approved risk acceptances | As needed | All |

### Risk Assessment Process

1. **Identify Assets**
   - Information assets
   - System assets
   - Human assets
   - Physical assets

2. **Identify Threats**
   - External threats (hackers, malware)
   - Internal threats (errors, malicious insiders)
   - Environmental threats (disasters)

3. **Identify Vulnerabilities**
   - Technical vulnerabilities
   - Process weaknesses
   - Human factors

4. **Assess Risk**
   - Likelihood (1-5 scale)
   - Impact (1-5 scale)
   - Risk score = Likelihood × Impact

5. **Treat Risk**
   - Mitigate (implement controls)
   - Transfer (insurance, outsourcing)
   - Accept (document acceptance)
   - Avoid (eliminate the risk)

### Risk Register Template

| ID | Risk | Category | Likelihood | Impact | Score | Treatment | Owner | Status |
|----|------|----------|------------|--------|-------|-----------|-------|--------|
| R001 | Data breach from AI tools | Technical | 3 | 5 | 15 | Mitigate (ZeroShare Gateway) | Security | Open |
| R002 | Vendor security incident | Third-party | 2 | 4 | 8 | Transfer (DPA, insurance) | Legal | Open |

---

## Training Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Training materials | Content of training | Annual update | All |
| Training records | Who completed what | Per training | All |
| Acknowledgments | Signed acceptance | Annual | All |
| Role-specific training | Specialized training | As needed | All |

### Training Topics

**Security Awareness (All Employees):**
- Phishing recognition
- Password security
- Social engineering
- Data handling
- Incident reporting
- Physical security
- Mobile/remote security

**Role-Specific Training:**
- Developers: Secure coding
- Administrators: System security
- Managers: Risk management
- HR: Personnel security

### Training Record Template

| Employee | Training | Completion Date | Score | Acknowledgment |
|----------|----------|-----------------|-------|----------------|
| [Name] | Security Awareness 2024 | [Date] | 95% | Signed |
| [Name] | Secure Coding | [Date] | 88% | Signed |

### Training Platforms

- KnowBe4 - Security awareness
- Curricula - Compliance training
- Internal LMS - Custom content
- LinkedIn Learning - Professional development

---

## Vendor Management Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Vendor inventory | List of all vendors | Ongoing | All |
| Risk assessments | Vendor security evaluations | Annual/onboarding | All |
| Contracts | Agreements with security terms | Per vendor | All |
| DPAs/BAAs | Data processing agreements | Per vendor | GDPR, HIPAA |
| Compliance evidence | SOC 2 reports, certificates | Annual | All |
| Access reviews | Vendor access verification | Quarterly | All |

### Vendor Inventory Template

| Vendor | Service | Data Access | Risk Level | DPA | Last Review |
|--------|---------|-------------|------------|-----|-------------|
| AWS | Cloud hosting | Yes | High | Yes | [Date] |
| GitHub | Source control | Yes | Medium | Yes | [Date] |
| Stripe | Payments | No | Low | N/A | [Date] |

### Vendor Risk Tiers

| Tier | Criteria | Review Frequency | Requirements |
|------|----------|------------------|--------------|
| Critical | Handles sensitive data, critical service | Quarterly | SOC 2, full assessment |
| High | Handles data, important service | Semi-annual | SOC 2 or ISO 27001 |
| Medium | Limited data access | Annual | Security questionnaire |
| Low | No data access | Every 2 years | Basic verification |

---

## Incident Management Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Incident log | Record of all incidents | Ongoing | All |
| Root cause analyses | Investigation findings | Per incident | All |
| Corrective actions | Remediation taken | Per incident | All |
| Post-mortems | Lessons learned | Per significant incident | SOC 2, ISO 27001 |
| Tabletop exercises | IRP testing | Annual | SOC 2, ISO 27001 |

### Incident Log Template

| ID | Date | Category | Severity | Description | Status | Resolution Date |
|----|------|----------|----------|-------------|--------|-----------------|
| INC-001 | [Date] | Malware | Medium | Phishing email clicked | Resolved | [Date] |
| INC-002 | [Date] | Access | Low | Failed login attempts | Resolved | [Date] |

### Post-Incident Review Template

```markdown
# Post-Incident Review: [Incident ID]

## Summary
- **Incident Date:** 
- **Detection Date:**
- **Resolution Date:**
- **Severity:**
- **Category:**

## Timeline
- [Time]: Event 1
- [Time]: Event 2
- [Time]: Resolution

## Impact
- Systems affected:
- Data affected:
- Users affected:
- Business impact:

## Root Cause
[Description of underlying cause]

## Response Evaluation
- What went well:
- What could be improved:

## Corrective Actions
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| | | | |

## Lessons Learned
1. 
2. 
3. 
```

---

## Business Continuity Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| BCP/DRP | Documented plans | Annual review | All |
| BIA | Business impact analysis | Annual | SOC 2, ISO 27001 |
| Test results | DR test documentation | Annual | All |
| Contact lists | Emergency contacts | Quarterly | All |
| Recovery procedures | Step-by-step recovery | Annual | All |

### DR Test Documentation

```markdown
# Disaster Recovery Test Report

## Test Details
- **Date:** 
- **Type:** [Tabletop / Simulation / Full]
- **Scenario:** 
- **Participants:**

## Objectives
1. Verify backup restoration
2. Validate communication procedures
3. Test recovery time objectives

## Results

| Objective | Target | Actual | Pass/Fail |
|-----------|--------|--------|-----------|
| RTO | 4 hours | 3.5 hours | Pass |
| RPO | 24 hours | 12 hours | Pass |
| Communication | All notified | 98% | Pass |

## Findings
1. 
2. 

## Recommendations
1. 
2. 

## Sign-off
- [Name, Role, Signature, Date]
```

---

## Access Review Evidence

### Required Evidence

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| User access reviews | Verification of access appropriateness | Quarterly | All |
| Privileged access reviews | Admin account verification | Monthly | All |
| Terminated user reviews | Confirmation of access removal | Per termination | All |
| Role reviews | RBAC appropriateness | Annual | All |

### Access Review Template

```markdown
# Access Review Report

## Review Period: [Start Date] to [End Date]
## Reviewer: [Name]
## Review Date: [Date]

## Scope
- Systems reviewed:
- User population:

## Findings

| User | Role | Access Appropriate | Action Needed |
|------|------|-------------------|---------------|
| | | Yes/No | None/Remove/Modify |

## Summary
- Total users reviewed: 
- Access appropriate: 
- Access modified:
- Access removed:

## Attestation
I certify that I have reviewed the access rights listed above and the indicated actions have been completed.

Reviewer: ____________________
Date: _______________________
```

---

## Management Review Evidence

### Required Evidence (ISO 27001 Specific)

| Evidence | Description | Frequency | Certifications |
|----------|-------------|-----------|----------------|
| Management review minutes | Meeting documentation | Annual minimum | ISO 27001 |
| Security metrics | KPIs and performance | Monthly/Quarterly | ISO 27001, SOC 2 |
| Audit results | Internal/external audits | Per audit | All |
| Improvement actions | ISMS improvements | Ongoing | ISO 27001 |

### Management Review Agenda (ISO 27001)

Required inputs:
1. Status of previous actions
2. Changes affecting ISMS
3. Feedback from interested parties
4. Nonconformities and corrective actions
5. Audit results
6. Security objectives fulfillment
7. Risk assessment/treatment status
8. Opportunities for improvement

### Security Metrics Dashboard

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Open vulnerabilities | <5 critical | 2 | ↓ |
| Mean time to patch (critical) | <7 days | 3 days | ↓ |
| Security incidents | <5/month | 2 | → |
| Training completion | 100% | 98% | ↑ |
| Access reviews completed | 100% | 100% | → |
| Backup success rate | 100% | 99.9% | → |

---

## Document Control

### Requirements

- Unique document identifiers
- Version numbering
- Approval records
- Change history
- Distribution lists
- Review schedules

### Document Register Template

| Doc ID | Title | Version | Owner | Review Date | Status |
|--------|-------|---------|-------|-------------|--------|
| POL-001 | Information Security Policy | 2.0 | CISO | [Date] | Active |
| POL-002 | Access Control Policy | 1.5 | IT Director | [Date] | Active |
| PROC-001 | Incident Response Procedure | 1.2 | Security | [Date] | Active |

---

## Evidence Storage

### Organization

```
evidence/
├── policies/
│   ├── current/
│   └── archived/
├── risk-management/
│   ├── assessments/
│   └── register/
├── training/
│   ├── materials/
│   └── records/
├── vendors/
│   ├── assessments/
│   ├── contracts/
│   └── compliance/
├── incidents/
│   ├── logs/
│   └── post-mortems/
├── business-continuity/
│   ├── plans/
│   └── test-results/
├── access-reviews/
│   └── quarterly/
└── management-reviews/
    └── annual/
```

### Retention Requirements

| Evidence Type | Minimum Retention |
|---------------|------------------|
| Policies | Current + 3 years historical |
| Risk assessments | 5 years |
| Training records | Employment + 3 years |
| Vendor contracts | Contract term + 7 years |
| Incident records | 5 years |
| Access reviews | 3 years |
| Audit reports | 7 years |
