# ZeroShare Compliance & AWS Certification Playbook

> **Your single source of truth for compliance and AWS marketplace certification.**
> 
> Update this document as you progress. Check boxes, add notes, track costs.
> Come back to this whenever you need to know what's next.

---

## CURRENT STATUS (Updated Jan 24, 2026)

### Completed
- [x] Security Trust Page deployed at `/security`
- [x] Container image built and pushed to ECR (`zeroshare-gateway:v1.0.0`)
- [x] CI/CD pipeline configured (GitHub Actions + AWS OIDC)
- [x] Release process documented
- [x] AWS Seller Profile active (AUTOMATED MERCHANDISING, LLC / ZeroShare)

### Pending
- [ ] AWS Payment Verification (support ticket open - passport docs submitted)
- [ ] Fill out Marketplace product listing (blocked until verification)
- [ ] Sign up for TrustCloud free tier

### Blocked
- [ ] Paid product listing (waiting for AWS payment verification)

---

## DO NEXT

### While Waiting for AWS Verification

1. **Sign up for TrustCloud** (15 min)
   - Go to https://trustcloud.ai
   - Free tier gets you SOC 2 readiness tracking
   - Connect GitHub and AWS for automated evidence

2. **Test the Container Locally**
   ```bash
   cd ~/checkout/zeroshare-gateway
   docker-compose up -d
   curl http://localhost:8000/health
   ```

3. **Prepare Marketplace Screenshots**
   - Dashboard view
   - PII redaction example
   - Configuration screen

### When AWS Verification Clears

1. Complete Marketplace product listing in AWS Console
2. Submit for review
3. Publish free tier immediately

---

## Your Situation

| Factor | Reality |
|--------|---------|
| **Team** | 1 person (you) |
| **Budget** | ~$2,000-5,000 |
| **Timeline** | ASAP - first mover advantage |
| **Target Market** | All (Enterprise, SMB, Government, Healthcare, Finance) |
| **Company Type** | AI-first, breaking new ground |

---

## The Bootstrap Strategy

> **Key Insight:** 92% of enterprise buyers require SOC 2, BUT you don't need full certification to start selling. You need *credible progress toward certification*.

### Priority Order (Optimized for $0 Budget First)

| Priority | Track | Cost | Time | Why |
|----------|-------|------|------|-----|
| **1** | AWS Marketplace | $0 | 2-4 weeks | Revenue channel, credibility, badges |
| **2** | Trust/Security Page | $0 | 1 day | Answers "are you secure?" immediately |
| **3** | Free Compliance Platform | $0 | 1 week | Shows SOC 2 progress, automates evidence |
| **4** | SOC 2 Type I | $5-8K | 3-6 months | First paying customers fund this |
| **5** | SOC 2 Type II | $10-15K | 12 months | Once you have revenue |

### The "Compliance Bridge" Strategy

You can't afford SOC 2 today. But you CAN do this:

1. **Day 1**: Create public trust page showing security controls
2. **Week 1**: Sign up for free compliance platform (evidence collection)
3. **Week 2-4**: Get on AWS Marketplace (instant credibility)
4. **Ongoing**: Tell prospects "SOC 2 in progress, here's our trust portal"
5. **With first revenue**: Fund actual SOC 2 audit

**This works because:** Buyers want to see you take security seriously. A trust portal + "in progress" + AWS badges often gets you past procurement.

---

## Quick Status Dashboard

| Track | Status | Current Phase | Next Milestone |
|-------|--------|---------------|----------------|
| **AWS Marketplace** | ⬜ Not Started | Phase 1 | Partner registration |
| **Trust Portal** | ⬜ Not Started | Phase 1 | Create page |
| **SOC 2 Readiness** | ⬜ Not Started | Phase 1 | Free platform signup |
| **SOC 2 Type I** | 🔒 Blocked | - | Need $5K+ revenue first |
| **ISO 27001** | 🔒 Blocked | - | After SOC 2 Type II |
| **HIPAA** | 🔒 Blocked | - | When healthcare customers pay |
| **GDPR** | ⬜ Not Started | Phase 1 | Self-attestation (free) |

**Last Updated:** _____________

---

## Budget Tracker

### Bootstrap Budget: $2,000-5,000

| Phase | Item | Cost | When to Spend |
|-------|------|------|---------------|
| **Now ($0)** | AWS Marketplace listing | $0 | Now |
| **Now ($0)** | Trust portal page | $0 | Now |
| **Now ($0)** | TrustCloud free tier | $0 | Now |
| **Now ($0)** | GDPR self-attestation | $0 | Now |
| **With Revenue** | SOC 2 Type I audit | $5,000-8,000 | After first $10K revenue |
| **With Revenue** | Penetration test | $2,000-5,000 | Before SOC 2 audit |
| **Later** | SOC 2 Type II | $10,000-15,000 | Year 2 |
| **Later** | ISO 27001 | $15,000-25,000 | Year 2-3 |

### Current Spending

| Item | Budgeted | Spent | Notes |
|------|----------|-------|-------|
| Compliance platform | $0 | $ | Using free tier |
| Domain/hosting | $ | $ | |
| Legal (future) | $ | $ | |
| **TOTAL** | $ | $ | |

### Free Tools to Use Now

| Tool | What It Does | Sign Up |
|------|--------------|---------|
| **TrustCloud** | Free SOC 2 readiness, trust portal | https://trustcloud.ai |
| **Vanta Free Assessment** | Gap analysis | https://vanta.com |
| **AWS Partner Central** | Marketplace listing | https://partnercentral.awspartner.com |
| **GitHub Security** | Dependabot, secret scanning | Already have |

### Vendor Decisions (When You Have Budget)

| Need | Options to Research | Budget | Decision |
|------|---------------------|--------|----------|
| SOC 2 Auditor | Johanson Group, Prescient Assurance, A-LIGN | $5-15K | |
| Pen Test | Cobalt, HackerOne, Bugcrowd | $2-5K | |
| Compliance Platform | TrustCloud → Vanta/Drata | $0 → $10K/yr | |

---

## Phase 1: Get to Market FAST (Week 1-2) - $0 Cost

> **Goal:** Establish market presence and basic credibility immediately.

### Day 1-2: Immediate Actions

| Task | Time | Done | Notes |
|------|------|------|-------|
| Register at AWS Partner Central | 30 min | ⬜ | https://partnercentral.awspartner.com |
| Start AWS Marketplace seller application | 30 min | ⬜ | |
| Sign up for TrustCloud free tier | 15 min | ⬜ | https://trustcloud.ai |
| Connect GitHub to TrustCloud | 15 min | ⬜ | Auto-evidence collection |
| Connect AWS to TrustCloud | 15 min | ⬜ | |

### Day 3-5: Trust Portal (Your "Are You Secure?" Answer)

| Task | Time | Done | Notes |
|------|------|------|-------|
| Create `/security` or `/trust` page on website | 2 hrs | ⬜ | I'll help you build this |
| List your security controls | 1 hr | ⬜ | Encryption, access control, etc. |
| Add "SOC 2 in progress" badge | 15 min | ⬜ | TrustCloud provides this |
| Link to your trust portal | 15 min | ⬜ | TrustCloud hosted page |

### Week 1-2: AWS Marketplace Submission

| Task | Time | Done | Notes |
|------|------|------|-------|
| Complete product listing content | 2 hrs | ⬜ | Use `docs/aws/marketplace/marketplace-listing.md` |
| Create logo (500x500 PNG) | 1 hr | ⬜ | |
| Take 3-6 screenshots | 1 hr | ⬜ | |
| Test CloudFormation template | 2 hrs | ⬜ | `cloudformation/zeroshare-complete.yaml` |
| Submit listing for review | 30 min | ⬜ | |
| Complete FTR self-assessment | 2 hrs | ⬜ | `docs/aws/technical/ftr-checklist.md` |

**Decisions Made:**
- Primary certification track: **SOC 2** (industry standard)
- Strategy: Trust portal now → SOC 2 Type I when revenue allows
- Budget for Phase 1: **$0**

### What You Can Tell Customers NOW

> "We're currently in the SOC 2 certification process. You can view our security controls and compliance status on our trust portal at [link]. We're also an AWS Partner with our product available on AWS Marketplace. Happy to walk you through our security architecture."

This is **honest** and **professional**. Most startups are in exactly this position.

---

## Phase 2: Build Credibility (Weeks 3-8) - $0 Cost

### Automated Evidence Collection

| Task | Time | Done | Notes |
|------|------|------|-------|
| Run `npm run compliance:generate` | 5 min | ⬜ | Test it works |
| Set up weekly compliance reports | 15 min | ⬜ | GitHub Actions already configured |
| Review gap report from TrustCloud | 1 hr | ⬜ | |
| Fix critical gaps identified | Varies | ⬜ | |

### Documentation (Do These When You Have Time)

| Task | Priority | Done | Notes |
|------|----------|------|-------|
| Customize security policy | High | ⬜ | `docs/compliance/templates/security-policy.md` |
| Customize incident response plan | High | ⬜ | `docs/compliance/templates/incident-response-plan.md` |
| Create privacy policy | High | ⬜ | Required for GDPR |
| Document data flows | Medium | ⬜ | |
| Create employee handbook section | Low | ⬜ | When you hire |

### AWS Marketplace Progress

| Milestone | Target | Actual | Notes |
|-----------|--------|--------|-------|
| Listing submitted | Week 2 | | |
| Listing approved | Week 4 | | |
| FTR submitted | Week 6 | | |
| FTR approved | Week 8 | | |
| First customer! | Week ? | | 🎉 |

---

## Phase 3: SOC 2 Type I (When Revenue Allows) - ~$5,000-8,000

> **Trigger:** Start this when you have ~$10K in revenue or funding

### Pre-Audit Preparation

| Task | Done | Notes |
|------|------|-------|
| 3+ months of evidence in TrustCloud | ⬜ | Let it collect automatically |
| All critical gaps remediated | ⬜ | |
| Security policy signed | ⬜ | |
| Incident response plan tested | ⬜ | |
| Get 3 auditor quotes | ⬜ | |
| Select auditor | ⬜ | |
| Schedule readiness assessment | ⬜ | |

### Auditor Selection

| Auditor | Contact | Quote | Timeline | Notes |
|---------|---------|-------|----------|-------|
| Johanson Group | | $ | | Startup-friendly |
| Prescient Assurance | | $ | | Fast, tech-focused |
| A-LIGN | | $ | | Larger, established |

**Selected:** _______________
**Start Date:** _______________
**Expected Completion:** _______________

---

## Phase 4: SOC 2 Type II + Scale (Year 2) - ~$15,000-25,000

> **Trigger:** After SOC 2 Type I, with consistent revenue

| Task | Done | Notes |
|------|------|-------|
| 12 months of SOC 2 Type I controls operating | ⬜ | |
| Schedule Type II audit | ⬜ | |
| Complete Type II audit | ⬜ | |
| Receive SOC 2 Type II report | ⬜ | 🎉 Enterprise-ready |

---

## Future Certifications (When Customers Require Them)

> **Don't pursue these until a paying customer requires it.** Let customer contracts fund the certification.

### ISO 27001 - When European enterprise customers require it

| Trigger | A €100K+ deal requires it |
|---------|---------------------------|
| Cost | $15,000-25,000 |
| Timeline | 6-12 months |
| Guide | `docs/compliance/iso27001.md` |

### HIPAA - When healthcare customers require it

| Trigger | A healthcare deal requires BAA |
|---------|-------------------------------|
| Cost | $10,000-20,000 (included if you have SOC 2) |
| Timeline | 3-6 months additional |
| Guide | `docs/compliance/hipaa.md` |

### GDPR - Do the free parts now

| Task | Cost | Done | Notes |
|------|------|------|-------|
| Privacy policy on website | $0 | ⬜ | Required anyway |
| Data processing documentation | $0 | ⬜ | In TrustCloud |
| Cookie consent banner | $0 | ⬜ | If you have EU traffic |
| DPA template ready | $0 | ⬜ | `docs/compliance/templates/data-processing-agreement.md` |

### FedRAMP - Only if you get government contracts

| Trigger | Federal agency wants to buy |
|---------|----------------------------|
| Cost | $250,000-500,000+ |
| Timeline | 12-18 months |
| Reality | Not for bootstrapped startups |

---

## Recurring Tasks (One-Person Edition)

### Weekly (15 minutes)
- [ ] Check GitHub Dependabot alerts
- [ ] Review any security notifications
- [ ] Glance at TrustCloud dashboard

### Monthly (1 hour)
- [ ] Run `npm run compliance:generate`
- [ ] Update this playbook status
- [ ] Review any customer security questions

### Quarterly (2 hours)
- [ ] Review and update policies if needed
- [ ] Export compliance evidence snapshot
- [ ] Check for new certification requirements from customers

### When You Get Your First Employee
- [ ] Create onboarding security checklist
- [ ] Document access provisioning process
- [ ] Set up security awareness training (free: KnowBe4 has a free tier)

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

## Contacts & Resources

### Your Network (Fill in as you go)

| Role | Name | Contact | Notes |
|------|------|---------|-------|
| AWS Partner Manager | (Assigned after registration) | | |
| TrustCloud Support | support@trustcloud.ai | | Free tier support |
| Potential Auditor | | | Get quotes when ready |
| Startup Lawyer | | | Find one for later |

### Free Resources

| Resource | URL | Use For |
|----------|-----|---------|
| TrustCloud | https://trustcloud.ai | Free SOC 2 readiness |
| AWS Partner Central | https://partnercentral.awspartner.com | Marketplace, badges |
| AICPA SOC 2 Guide | https://www.aicpa.org | Official requirements |
| Y Combinator Library | https://www.ycombinator.com/library | Startup compliance advice |
| r/cybersecurity | Reddit | Community advice |

### Startup-Friendly Auditors (When Ready)

| Firm | Why | Typical Cost |
|------|-----|--------------|
| Johanson Group | Known for startups | $5-10K |
| Prescient Assurance | Fast, tech-focused | $7-12K |
| Sensiba | Startup programs | $8-15K |

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

---

## Release Discipline

> **Every requirement change triggers ALL of these. No exceptions.**

### The Release Chain

```
PRD Change → Code (with tests) → Docs → Marketing → Content → Deploy
```

### Checklist for Every Release

| Step | Required | Notes |
|------|----------|-------|
| **Tests** | All pass, 70%+ coverage | `pytest tests/ --cov-fail-under=70` |
| **Documentation** | Updated | Manual must be perfect |
| **Marketing** | Claims match PRD | No exaggerations |
| **Content** | Release notes | Blog post if major |
| **Deploy** | Staging → Production | Verify both |

### Source of Truth

| What | Where |
|------|-------|
| Product capabilities | `zeroshare-gateway/PRD.md` |
| Marketing claims | Must reference PRD |
| Release process | `zeroshare-gateway/RELEASE_PROCESS.md` |
| Agent rules | `.cursor/rules/release-discipline.mdc` |

### Verify Production

```bash
# Check ECR images
aws ecr list-images --repository-name zeroshare-gateway

# Check Marketplace status
aws marketplace-catalog describe-entity \
  --catalog AWSMarketplace \
  --entity-id prod-p7etizzvknoge

# Check seller status
aws marketplace-catalog describe-entity \
  --catalog AWSMarketplace \
  --entity-id seller-4q3mn3dkihdg6
```

---

## How to Use This Playbook + AI

### Coming Back to This Document

1. **Open `COMPLIANCE_PLAYBOOK.md`** at the start of each work session
2. **Find your current phase** in the status dashboard
3. **Work through checklist items** one by one
4. **Check boxes and add notes** as you complete things
5. **Update status dashboard** when you finish a phase

### When to Start a New Chat with AI

| Situation | What to Say |
|-----------|-------------|
| Stuck on a task | "I'm working on [task from playbook] and need help with [specific issue]" |
| Customer security question | "A customer asked [question]. Help me respond." |
| Need a document created | "Create a [policy/template/document] for ZeroShare" |
| Auditor prep | "Help me prepare evidence for [certification] audit" |
| Technical implementation | "How do I implement [security control] in my setup?" |
| Review something | "Review this [policy/response/document] for me" |

### Your Key Files

| Purpose | File |
|---------|------|
| **This playbook** | `COMPLIANCE_PLAYBOOK.md` |
| **Certification overview** | `COMPLIANCE_CERTIFICATIONS.md` |
| **AWS roadmap** | `docs/aws/AWS_CERTIFICATION_ROADMAP.md` |
| **Security page** | `app/security/page.tsx` |
| **Evidence generator** | `scripts/compliance/generate-evidence.js` |

### Pro Tips for AI Conversations

1. **Reference the playbook** - "I'm on Phase 2, Week 3 of the playbook..."
2. **Be specific** - "Help me fill out the SOC 2 auditor selection table"
3. **Share context** - "A prospect from healthcare asked about HIPAA..."
4. **Ask for drafts** - "Draft an email response to this security questionnaire"

---

*Last reviewed: ___________*
*Next review due: ___________*
