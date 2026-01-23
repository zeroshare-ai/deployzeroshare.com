# ZeroShare Compliance & AWS Certification Playbook

> **Your single source of truth for compliance and AWS marketplace certification.**
> 
> Update this document as you progress. Check boxes, add notes, track costs.
> Come back to this whenever you need to know what's next.

---

## Quick Status Dashboard

| Track | Status | Current Phase | Next Milestone |
|-------|--------|---------------|----------------|
| **AWS Marketplace** | ⬜ Not Started | Phase 1 | Partner registration |
| **SOC 2** | ⬜ Not Started | Phase 1 | Gap assessment |
| **ISO 27001** | ⬜ Not Started | Phase 1 | Gap assessment |
| **GDPR** | ⬜ Not Started | Phase 1 | Data mapping |
| **HIPAA** | ⬜ Not Started | Phase 1 | Applicability review |
| **PCI DSS** | ⬜ Not Started | Phase 1 | Scope definition |
| **CCPA** | ⬜ Not Started | Phase 1 | Data inventory |

**Last Updated:** _____________

---

## Budget Tracker

### Planned vs Actual Spending

| Category | Budgeted | Committed | Spent | Remaining |
|----------|----------|-----------|-------|-----------|
| **Auditor Fees** | $ | $ | $ | $ |
| **Legal Review** | $ | $ | $ | $ |
| **Penetration Test** | $ | $ | $ | $ |
| **Compliance Platform** | $ | $ | $ | $ |
| **Consulting** | $ | $ | $ | $ |
| **Training** | $ | $ | $ | $ |
| **Other** | $ | $ | $ | $ |
| **TOTAL** | $ | $ | $ | $ |

### Vendor Decisions

| Need | Vendor Chosen | Cost | Contract Date | Notes |
|------|---------------|------|---------------|-------|
| SOC 2 Auditor | | $ | | |
| ISO 27001 Cert Body | | $ | | |
| Penetration Tester | | $ | | |
| Privacy Attorney | | $ | | |
| Compliance Platform | | $ | | |

---

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Setup & Registration

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Read `COMPLIANCE_CERTIFICATIONS.md` | | | ⬜ | |
| Read `docs/aws/AWS_CERTIFICATION_ROADMAP.md` | | | ⬜ | |
| Register at AWS Partner Central | | | ⬜ | |
| Create AWS Marketplace seller account | | | ⬜ | |
| Run `./scripts/setup-compliance-s3.sh` | | | ⬜ | |
| Set up GitHub secrets for compliance reports | | | ⬜ | |
| Decide which certifications to pursue | | | ⬜ | |

**Decisions Made:**
- Certifications we're pursuing: _______________________
- Target timeline: _______________________
- Budget allocated: $_______________________

### Week 2: Gap Assessment

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Complete FTR self-assessment checklist | | | ⬜ | `docs/aws/technical/ftr-checklist.md` |
| Review SOC 2 requirements | | | ⬜ | `docs/compliance/soc2.md` |
| Identify policy gaps | | | ⬜ | |
| Identify technical gaps | | | ⬜ | |
| Create remediation priority list | | | ⬜ | |

**Gap Assessment Summary:**
```
Critical Gaps:
1. 
2. 
3. 

High Priority:
1. 
2. 
3. 

Medium Priority:
1. 
2. 
3. 
```

### Week 3-4: Policy Foundation

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Customize security policy template | | | ⬜ | `docs/compliance/templates/security-policy.md` |
| Customize incident response plan | | | ⬜ | `docs/compliance/templates/incident-response-plan.md` |
| Create access control policy | | | ⬜ | |
| Create data retention policy | | | ⬜ | |
| Have legal review policies | | | ⬜ | |
| Get executive sign-off on policies | | | ⬜ | |

**Policies Completed:**
- [ ] Information Security Policy
- [ ] Access Control Policy
- [ ] Incident Response Plan
- [ ] Data Retention Policy
- [ ] Acceptable Use Policy
- [ ] Vendor Management Policy
- [ ] Change Management Policy
- [ ] Business Continuity Plan

---

## Phase 2: AWS Marketplace (Weeks 5-12)

### Listing Preparation

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Write product descriptions | | | ⬜ | See `docs/aws/marketplace/marketplace-listing.md` |
| Create product logo (500x500) | | | ⬜ | |
| Create 3-6 screenshots | | | ⬜ | |
| Finalize pricing tiers | | | ⬜ | See `docs/aws/marketplace/pricing-guide.md` |
| Legal review of EULA | | | ⬜ | See `docs/aws/marketplace/eula.md` |
| Complete support documentation | | | ⬜ | See `docs/aws/marketplace/support-guide.md` |
| Test CloudFormation deployment | | | ⬜ | `cloudformation/zeroshare-complete.yaml` |

### FTR Submission

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Complete all FTR checklist items | | | ⬜ | |
| Prepare architecture documentation | | | ⬜ | |
| Verify IAM least privilege | | | ⬜ | `docs/aws/architecture/iam-policies.md` |
| Document security controls | | | ⬜ | `docs/aws/technical/security-review.md` |
| Submit FTR via Partner Central | | | ⬜ | |
| Address FTR feedback | | | ⬜ | |

### Milestones

| Milestone | Target Date | Actual Date | Notes |
|-----------|-------------|-------------|-------|
| Listing submitted | | | |
| FTR submitted | | | |
| Listing approved | | | |
| FTR approved | | | |
| "AWS Reviewed" badge received | | | |

---

## Phase 3: SOC 2 Certification (Months 3-15)

### Auditor Selection

| Auditor | Proposal Received | Cost | Timeline | Decision |
|---------|-------------------|------|----------|----------|
| | | $ | | |
| | | $ | | |
| | | $ | | |

**Selected Auditor:** _______________________
**Engagement Start:** _______________________
**Expected Completion:** _______________________

### SOC 2 Checklist

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Select auditor | | | ⬜ | |
| Complete gap assessment | | | ⬜ | |
| Remediate critical gaps | | | ⬜ | |
| Implement monitoring | | | ⬜ | |
| Begin observation period | | | ⬜ | |
| Conduct internal audit | | | ⬜ | |
| Type II audit begins | | | ⬜ | |
| Address audit findings | | | ⬜ | |
| Receive SOC 2 report | | | ⬜ | |

### Evidence Collection Schedule

| Evidence Type | Frequency | Last Collected | Next Due |
|---------------|-----------|----------------|----------|
| Access reviews | Quarterly | | |
| Vulnerability scans | Weekly | | |
| Change logs | Continuous | | |
| Training records | Per hire + annual | | |
| Incident logs | Continuous | | |
| Backup verification | Weekly | | |

---

## Phase 4: Additional Certifications

### ISO 27001

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Define ISMS scope | | | ⬜ | |
| Complete risk assessment | | | ⬜ | |
| Create Statement of Applicability | | | ⬜ | |
| Implement Annex A controls | | | ⬜ | |
| Conduct internal audit | | | ⬜ | |
| Management review | | | ⬜ | |
| Stage 1 audit | | | ⬜ | |
| Stage 2 audit | | | ⬜ | |
| Certification received | | | ⬜ | |

### GDPR (If applicable)

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Complete data mapping | | | ⬜ | |
| Document lawful bases | | | ⬜ | |
| Update privacy policy | | | ⬜ | |
| Implement DSR process | | | ⬜ | |
| Review vendor DPAs | | | ⬜ | |
| Appoint DPO (if required) | | | ⬜ | |
| Establish breach procedures | | | ⬜ | |

### HIPAA (If applicable)

| Task | Owner | Due | Done | Notes |
|------|-------|-----|------|-------|
| Conduct risk analysis | | | ⬜ | |
| Implement security rule controls | | | ⬜ | |
| Create BAA template | | | ⬜ | |
| Train workforce | | | ⬜ | |
| Document policies | | | ⬜ | |
| Test contingency plan | | | ⬜ | |

---

## Recurring Tasks

### Weekly
- [ ] Review security alerts
- [ ] Check vulnerability scan results
- [ ] Review access logs

### Monthly
- [ ] Run `npm run compliance:generate`
- [ ] Review compliance dashboard
- [ ] Update this playbook

### Quarterly
- [ ] Conduct access reviews
- [ ] Review vendor security
- [ ] Update risk register
- [ ] Management review meeting

### Annually
- [ ] Penetration test
- [ ] Policy reviews
- [ ] Security training refresh
- [ ] Business continuity test
- [ ] SOC 2 audit
- [ ] ISO 27001 surveillance audit

---

## Key Commands

```bash
# Generate compliance evidence
npm run compliance:generate

# Send compliance reports to email
npm run compliance:send-all

# Send specific certification package
npm run compliance:send-report -- --cert=soc2 --email=auditor@firm.com

# Generate locally (no AWS)
npm run compliance:local

# Run all QA tests
npm run qa
```

---

## Documentation Quick Links

### Compliance Guides
- [Master Compliance Guide](COMPLIANCE_CERTIFICATIONS.md)
- [SOC 2 Guide](docs/compliance/soc2.md)
- [ISO 27001 Guide](docs/compliance/iso27001.md)
- [GDPR Guide](docs/compliance/gdpr.md)
- [HIPAA Guide](docs/compliance/hipaa.md)
- [PCI DSS Guide](docs/compliance/pci-dss.md)
- [CCPA Guide](docs/compliance/ccpa.md)

### AWS Guides
- [AWS Certification Roadmap](docs/aws/AWS_CERTIFICATION_ROADMAP.md)
- [FTR Checklist](docs/aws/technical/ftr-checklist.md)
- [Marketplace Listing](docs/aws/marketplace/marketplace-listing.md)
- [Security Review](docs/aws/technical/security-review.md)

### Templates
- [Security Policy](docs/compliance/templates/security-policy.md)
- [Incident Response Plan](docs/compliance/templates/incident-response-plan.md)
- [Data Processing Agreement](docs/compliance/templates/data-processing-agreement.md)
- [Vendor Assessment](docs/compliance/templates/vendor-assessment.md)

### Evidence Guides
- [Technical Controls](docs/compliance/evidence/technical-controls.md)
- [Administrative Controls](docs/compliance/evidence/administrative-controls.md)
- [Report Delivery Setup](docs/compliance/REPORT_DELIVERY_SETUP.md)

---

## Notes & Decisions Log

Use this space to record important decisions and context:

### Date: ___________
**Topic:**
**Decision:**
**Rationale:**

---

### Date: ___________
**Topic:**
**Decision:**
**Rationale:**

---

### Date: ___________
**Topic:**
**Decision:**
**Rationale:**

---

## Contacts

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Internal Compliance Lead | | | |
| SOC 2 Auditor Contact | | | |
| ISO Certification Body | | | |
| Privacy Attorney | | | |
| Penetration Tester | | | |
| AWS Partner Manager | | | |

---

## Emergency Procedures

### If You Discover a Breach
1. Contain immediately
2. Notify: _______________ (incident response lead)
3. Follow: `docs/compliance/templates/incident-response-plan.md`
4. Document everything
5. Legal notification deadlines:
   - GDPR: 72 hours to authority
   - HIPAA: 60 days to individuals
   - State laws: Varies

### If Auditor Finds Critical Issue
1. Don't panic
2. Document the finding
3. Create remediation plan
4. Discuss timeline with auditor
5. Implement fix
6. Request re-test

---

*Last reviewed: ___________*
*Next review due: ___________*
