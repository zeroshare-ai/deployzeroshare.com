# AWS Marketplace & Partner Certification Guide

This documentation covers everything needed to list ZeroShare Gateway on AWS Marketplace and achieve AWS Partner badges and certifications.

## Certification Roadmap

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AWS PARTNER JOURNEY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1: Foundation (Weeks 1-4)                                           │
│  ├── AWS Partner Network Registration                                       │
│  ├── AWS Marketplace Seller Registration                                    │
│  └── Basic Product Listing                                                  │
│                                                                             │
│  PHASE 2: Technical Validation (Weeks 5-12)                                │
│  ├── AWS Foundational Technical Review (FTR)                               │
│  ├── Well-Architected Review                                               │
│  └── Security Self-Assessment                                              │
│                                                                             │
│  PHASE 3: Badges & Competencies (Weeks 12-24)                              │
│  ├── AWS Software Path Validation                                          │
│  ├── AWS Security Competency                                               │
│  └── AWS ISV Accelerate Program                                            │
│                                                                             │
│  PHASE 4: Advanced (Weeks 24+)                                             │
│  ├── AWS ISV Partner Path                                                  │
│  ├── AWS Competency Program (Security)                                     │
│  └── AWS Public Sector Partner (if applicable)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Documentation Index

### AWS Marketplace
| Document | Purpose | Status |
|----------|---------|--------|
| [marketplace-listing.md](marketplace/marketplace-listing.md) | Product listing content | Required |
| [pricing-guide.md](marketplace/pricing-guide.md) | Pricing models and metering | Required |
| [deployment-guide.md](marketplace/deployment-guide.md) | Customer deployment instructions | Required |
| [eula.md](marketplace/eula.md) | End User License Agreement | Required |
| [support-guide.md](marketplace/support-guide.md) | Support tiers and SLAs | Required |

### AWS Partner Network
| Document | Purpose | Status |
|----------|---------|--------|
| [partner-registration.md](partner/partner-registration.md) | APN registration guide | Required |
| [software-path.md](partner/software-path.md) | Software Partner path requirements | Required |
| [isv-accelerate.md](partner/isv-accelerate.md) | ISV Accelerate program | Recommended |

### AWS Technical Reviews
| Document | Purpose | Status |
|----------|---------|--------|
| [ftr-checklist.md](technical/ftr-checklist.md) | Foundational Technical Review | Required |
| [well-architected-review.md](technical/well-architected-review.md) | Well-Architected Framework | Required |
| [security-review.md](technical/security-review.md) | Security best practices | Required |

### Architecture Documentation
| Document | Purpose | Status |
|----------|---------|--------|
| [architecture-overview.md](architecture/architecture-overview.md) | System architecture | Required |
| [infrastructure-as-code.md](architecture/infrastructure-as-code.md) | CloudFormation/Terraform | Required |
| [network-architecture.md](architecture/network-architecture.md) | VPC and networking | Required |
| [security-architecture.md](architecture/security-architecture.md) | Security controls | Required |

## Quick Start

1. **Register as AWS Partner**: [partner-registration.md](partner/partner-registration.md)
2. **Prepare Marketplace Listing**: [marketplace-listing.md](marketplace/marketplace-listing.md)
3. **Complete FTR Self-Assessment**: [ftr-checklist.md](technical/ftr-checklist.md)
4. **Submit for Review**: Follow the submission process in each guide

## AWS Badges Available

| Badge | Requirements | Benefits |
|-------|--------------|----------|
| **AWS Reviewed** | Pass FTR | Marketplace badge, customer trust |
| **AWS Qualified Software** | FTR + operational requirements | Co-sell opportunities |
| **AWS Security Competency** | FTR + security validation | Premium listing, AWS referrals |
| **AWS ISV Partner** | Full partner path completion | Full AWS partnership benefits |

## Timeline Estimate

| Milestone | Timeline | Dependencies |
|-----------|----------|--------------|
| APN Registration | Week 1 | None |
| Marketplace Listing Draft | Week 2-3 | APN Registration |
| FTR Self-Assessment | Week 4-6 | Architecture documentation |
| FTR Submission | Week 7 | Self-assessment complete |
| FTR Approval | Week 8-10 | AWS review |
| Badges Issued | Week 10-12 | FTR approval |
| Security Competency | Week 16-24 | Additional requirements |

## Contact

- AWS Partner Support: https://aws.amazon.com/partners/
- AWS Marketplace Seller Support: https://aws.amazon.com/marketplace/management/
- Internal: aws-partnership@zeroshare.io
