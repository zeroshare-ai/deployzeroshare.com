# ZeroShare Gateway - Support Guide

## Support Overview

ZeroShare provides tiered support to meet the needs of organizations of all sizes. This document outlines support options, SLAs, and escalation procedures.

---

## Support Tiers

### Tier Comparison

| Feature | Community (Free) | Standard (Team) | Priority (Business) | Enterprise |
|---------|------------------|-----------------|---------------------|------------|
| **Channels** | GitHub Issues | Email | Email + Portal | All + Phone |
| **Hours** | Community | Business hours | Extended hours | 24/7/365 |
| **Response Time** | Best effort | 24 hours | 4 hours | 1 hour |
| **Resolution Time** | N/A | 5 business days | 2 business days | Same day |
| **Named Contact** | No | No | Yes | Yes |
| **Onboarding** | Docs only | Email guidance | Video call | Dedicated |
| **Health Checks** | No | Annual | Quarterly | Monthly |
| **Training** | Docs only | Webinar access | Custom session | Unlimited |

---

## Contact Methods

### Community Support (Free Tier)

- **GitHub Issues**: https://github.com/zeroshare/gateway/issues
- **GitHub Discussions**: https://github.com/zeroshare/gateway/discussions
- **Documentation**: https://docs.zeroshare.io

### Email Support (Team, Business)

- **Email**: support@zeroshare.io
- **Response**: Within SLA per tier
- **Include**: License ID, error logs, reproduction steps

### Support Portal (Business, Enterprise)

- **URL**: https://support.zeroshare.io
- **Features**: Ticket tracking, knowledge base, downloads
- **Login**: Use AWS Marketplace credentials

### Phone Support (Enterprise)

- **Hotline**: +1-XXX-XXX-XXXX
- **Available**: 24/7/365
- **For**: Critical issues (Severity 1)

### Emergency Contact (Enterprise)

- **PagerDuty**: enterprise-support@zeroshare.pagerduty.com
- **For**: Production down situations only

---

## Severity Levels

### Severity Definitions

| Severity | Definition | Examples | Response SLA |
|----------|------------|----------|--------------|
| **1 - Critical** | Production down, no workaround | Complete outage, security breach | 1 hour |
| **2 - High** | Major feature impaired | Detection failing, performance degraded | 4 hours |
| **3 - Medium** | Minor feature impaired | Dashboard issue, non-critical bug | 1 business day |
| **4 - Low** | General inquiry | Feature request, documentation | 2 business days |

### Severity Assignment

| Condition | Severity |
|-----------|----------|
| Production environment completely unavailable | 1 |
| Production environment severely degraded | 1 |
| PII/secrets detection completely failing | 1 |
| Security vulnerability discovered | 1 |
| Major feature not working, workaround exists | 2 |
| Performance significantly degraded | 2 |
| Minor feature not working | 3 |
| Non-critical bug | 3 |
| Feature request | 4 |
| General question | 4 |

---

## Service Level Agreements (SLA)

### Response Time SLA

| Severity | Community | Standard | Priority | Enterprise |
|----------|-----------|----------|----------|------------|
| 1 - Critical | N/A | 4 hours | 1 hour | 15 minutes |
| 2 - High | N/A | 8 hours | 4 hours | 1 hour |
| 3 - Medium | N/A | 24 hours | 8 hours | 4 hours |
| 4 - Low | N/A | 48 hours | 24 hours | 8 hours |

### Resolution Time SLA

| Severity | Standard | Priority | Enterprise |
|----------|----------|----------|------------|
| 1 - Critical | 1 business day | 4 hours | 2 hours |
| 2 - High | 3 business days | 1 business day | 4 hours |
| 3 - Medium | 5 business days | 3 business days | 1 business day |
| 4 - Low | 10 business days | 5 business days | 3 business days |

### Uptime SLA (Enterprise)

- **Target**: 99.99% monthly uptime
- **Measurement**: ZeroShare infrastructure (not customer deployment)
- **Credits**: Pro-rated for downtime exceeding SLA

---

## Support Processes

### Ticket Lifecycle

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Created   │───▶│  Assigned   │───▶│ In Progress │───▶│  Resolved   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │  Escalated  │
                                      └─────────────┘
```

### Creating a Support Ticket

**Required Information:**

1. **Account Information**
   - AWS Marketplace subscription ID
   - License ID (found in dashboard)
   - Company name

2. **Environment Details**
   - Deployment type (ECS, EKS, Docker)
   - AWS region
   - Version number
   - Infrastructure specs

3. **Issue Description**
   - Clear summary
   - Steps to reproduce
   - Expected vs actual behavior
   - When it started

4. **Supporting Data**
   - Error messages (sanitized)
   - Relevant logs (sanitized)
   - Screenshots if applicable

**Template:**

```
Subject: [Severity X] Brief description

Account Information:
- Subscription ID: 
- License ID: 
- Company: 

Environment:
- Deployment: ECS / EKS / Docker
- Region: 
- Version: 
- Instance type: 

Issue Description:
[Describe the issue]

Steps to Reproduce:
1. 
2. 
3. 

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Error Messages:
[Paste sanitized errors]

Logs:
[Attach or paste relevant logs - REMOVE SENSITIVE DATA]

Additional Context:
[Any other relevant information]
```

---

## Escalation Procedures

### Customer Escalation

If you feel your issue is not being addressed appropriately:

1. **Level 1**: Reply to ticket requesting escalation
2. **Level 2**: Email support-escalation@zeroshare.io
3. **Level 3**: Email support-management@zeroshare.io
4. **Level 4**: Contact your Account Manager (Enterprise)

### Internal Escalation Matrix

| Time in Status | Action |
|----------------|--------|
| > 1x SLA | Auto-escalate to Senior Engineer |
| > 2x SLA | Auto-escalate to Team Lead |
| > 3x SLA | Auto-escalate to Support Manager |
| Customer escalation | Immediate management review |

---

## Maintenance and Updates

### Scheduled Maintenance

- **Notification**: 7 days advance notice
- **Window**: Weekends, off-peak hours
- **Duration**: Typically < 2 hours
- **Impact**: License verification may be temporarily unavailable

### Emergency Maintenance

- **Notification**: As soon as possible
- **Reason**: Security patches, critical fixes
- **Communication**: Email, status page, in-app notification

### Updates and Upgrades

| Update Type | Frequency | Notification | Required |
|-------------|-----------|--------------|----------|
| Security patches | As needed | Immediate | Yes (within 30 days) |
| Bug fixes | Monthly | 1 week | Recommended |
| Minor versions | Quarterly | 2 weeks | Recommended |
| Major versions | Annual | 1 month | Optional |

---

## Self-Service Resources

### Documentation

| Resource | URL | Description |
|----------|-----|-------------|
| Quick Start | docs.zeroshare.io/quickstart | Get started in 15 minutes |
| Admin Guide | docs.zeroshare.io/admin | Full administration guide |
| API Reference | docs.zeroshare.io/api | API documentation |
| FAQ | docs.zeroshare.io/faq | Common questions |

### Knowledge Base

- URL: support.zeroshare.io/kb
- Searchable articles
- Troubleshooting guides
- Best practices

### Community

- GitHub Discussions: github.com/zeroshare/gateway/discussions
- Community Slack: zeroshare-community.slack.com
- Monthly webinars

### Training

| Training | Availability | Duration |
|----------|--------------|----------|
| Getting Started (Video) | All tiers | 30 minutes |
| Admin Deep Dive (Webinar) | Team+ | 60 minutes |
| Custom Training | Enterprise | Flexible |
| Certification | Enterprise | 1 day |

---

## Feedback and Improvement

### Product Feedback

- Feature requests: feedback@zeroshare.io
- Product roadmap: zeroshare.io/roadmap
- Beta programs: beta@zeroshare.io

### Support Feedback

After ticket resolution, you'll receive a satisfaction survey. Your feedback helps us improve.

### Monthly Reviews (Enterprise)

Enterprise customers receive monthly support reviews including:
- Ticket summary
- SLA performance
- Improvement recommendations
- Roadmap preview

---

## Contact Summary

| Need | Contact |
|------|---------|
| General support | support@zeroshare.io |
| Critical issues (Enterprise) | +1-XXX-XXX-XXXX |
| Escalation | support-escalation@zeroshare.io |
| Sales | sales@zeroshare.io |
| Security issues | security@zeroshare.io |
| Feature requests | feedback@zeroshare.io |
| Documentation issues | docs@zeroshare.io |

---

## Hours of Operation

### Standard Support (Team)
- Monday-Friday: 9 AM - 6 PM EST
- Excluding US holidays

### Extended Support (Business)
- Monday-Friday: 6 AM - 10 PM EST
- Saturday: 9 AM - 5 PM EST
- Excluding major US holidays

### 24/7 Support (Enterprise)
- Available 24 hours, 7 days a week
- 365 days per year
- Including all holidays
