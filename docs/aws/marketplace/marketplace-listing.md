# AWS Marketplace Product Listing

## Product Overview

### Product Name
**ZeroShare Gateway** - Enterprise AI Security Gateway

### Short Description (200 characters max)
On-premise AI security gateway that prevents PII and secrets from leaking to AI services. Protects Copilot, Cursor, ChatGPT, and enterprise AI tools.

### Long Description (2000 characters max)

ZeroShare Gateway is an enterprise-grade, on-premise security solution that intercepts AI traffic and automatically detects and redacts sensitive information before it reaches external AI services.

**The Problem:**
Organizations adopting AI coding assistants and chatbots face significant data security risks. Developers inadvertently send proprietary code, API keys, customer PII, and trade secrets to external AI providers, creating compliance violations and security breaches.

**The Solution:**
ZeroShare Gateway deploys within your infrastructure as a transparent proxy between your users and AI services. Using advanced pattern matching and Microsoft Presidio NLP, it:

• Detects and redacts 50+ PII patterns (SSN, credit cards, emails, phone numbers)
• Blocks 200+ secret patterns (AWS keys, API tokens, private keys)
• Supports dual-lane processing: Standard users (PII focus) and Developers (secrets focus)
• Routes cleaned requests to your choice of AI backend (Azure OpenAI, AWS Bedrock)
• Provides complete audit logging for compliance evidence

**Key Features:**
• On-premise deployment - data never leaves your infrastructure
• Sub-second latency - transparent to end users
• Role-based access control with SSO/SAML integration
• Real-time monitoring dashboard
• Docker-based deployment for easy scaling
• Supports GitHub Copilot, Cursor, VS Code, JetBrains, and more

**Compliance Support:**
Helps organizations maintain compliance with SOC 2, HIPAA, GDPR, PCI DSS, and CCPA by preventing unauthorized disclosure of sensitive data to AI services.

**Deployment:**
Deploy in minutes using Docker Compose. No complex infrastructure required. Scales horizontally to handle enterprise traffic volumes.

### Product Logo
- File: `zeroshare-gateway-logo.png`
- Size: 120x120 pixels minimum, 500x500 recommended
- Format: PNG with transparent background
- Location: `/public/aws-marketplace/logo.png`

### Product Icon
- File: `zeroshare-gateway-icon.png`  
- Size: 80x80 pixels
- Format: PNG
- Location: `/public/aws-marketplace/icon.png`

### Screenshots (3-6 required)

1. **Dashboard Overview**
   - File: `screenshot-dashboard.png`
   - Description: "Real-time monitoring dashboard showing request volume, redaction rates, and security alerts"

2. **PII Detection in Action**
   - File: `screenshot-pii-detection.png`
   - Description: "Live view of PII detection and redaction protecting sensitive customer data"

3. **Secrets Blocking**
   - File: `screenshot-secrets.png`
   - Description: "Automatic blocking of API keys and credentials before they reach AI services"

4. **Configuration Panel**
   - File: `screenshot-config.png`
   - Description: "Easy configuration interface for detection patterns and routing rules"

5. **Audit Log**
   - File: `screenshot-audit.png`
   - Description: "Comprehensive audit logging for compliance and security investigations"

6. **Architecture Diagram**
   - File: `screenshot-architecture.png`
   - Description: "Deployment architecture showing integration with enterprise AI tools"

---

## Product Categories

### Primary Category
**Security** > **Data Protection**

### Secondary Categories
- **Developer Tools** > **Code Development**
- **Machine Learning** > **ML Solutions**

### Search Keywords
```
AI security, data loss prevention, DLP, PII protection, secrets detection,
GitHub Copilot security, AI data leakage, enterprise AI security,
code security, API key protection, HIPAA AI, SOC 2 AI, GDPR AI compliance,
on-premise AI gateway, AI proxy, sensitive data protection
```

---

## Pricing

### Pricing Model
**Contract Pricing** with Free Tier

### Pricing Tiers

| Tier | Users | Price | Billing |
|------|-------|-------|---------|
| Free | Up to 5 | $0/month | N/A |
| Team | Up to 25 | $499/month | Monthly or Annual |
| Business | Up to 100 | $1,499/month | Monthly or Annual |
| Enterprise | Unlimited | Custom | Annual |

### Free Trial
- **Duration:** 14 days
- **Includes:** Full functionality, up to 25 users
- **No credit card required** for trial

### Annual Discount
15% discount for annual commitment

### Metering Dimensions (if usage-based)

| Dimension | Unit | Description |
|-----------|------|-------------|
| ActiveUsers | User/month | Monthly active users |
| APIRequests | 1000 requests | AI requests processed |
| DataScanned | GB | Data volume scanned |

---

## Delivery Method

### Fulfillment Option
**Container Product** (Docker)

### Delivery Mechanism
- Amazon ECR (Elastic Container Registry)
- Docker Hub (public registry)
- Customer download

### Container Images

| Image | Tag | Purpose |
|-------|-----|---------|
| `zeroshare/gateway` | `latest`, `v1.x.x` | Main gateway service |
| `zeroshare/dashboard` | `latest`, `v1.x.x` | Monitoring dashboard |

### Supported Deployment Platforms
- Amazon ECS (Elastic Container Service)
- Amazon EKS (Elastic Kubernetes Service)
- Self-managed Docker/Kubernetes
- Amazon EC2 with Docker

---

## Technical Requirements

### Minimum System Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| vCPU | 2 | 4+ |
| Memory | 4 GB | 8 GB+ |
| Storage | 20 GB | 50 GB+ |
| Network | 100 Mbps | 1 Gbps |

### Supported AWS Regions
All commercial AWS regions

### Supported Operating Systems
- Amazon Linux 2
- Amazon Linux 2023
- Ubuntu 20.04+
- RHEL 8+
- Any Docker-compatible OS

### Network Requirements
- Outbound HTTPS (443) to AI providers
- Inbound from client workstations (configurable port)
- No inbound internet access required

---

## Support Information

### Support Tiers

| Tier | Response Time | Channels | Included In |
|------|---------------|----------|-------------|
| Community | Best effort | GitHub Issues | Free |
| Standard | 24 hours | Email, Portal | Team, Business |
| Premium | 4 hours | Email, Portal, Phone | Enterprise |
| 24/7 | 1 hour | All + dedicated | Enterprise+ |

### Support Contact
- Email: support@zeroshare.io
- Portal: https://support.zeroshare.io
- Documentation: https://docs.zeroshare.io

### Documentation Links
- Quick Start: https://docs.zeroshare.io/quickstart
- Admin Guide: https://docs.zeroshare.io/admin
- API Reference: https://docs.zeroshare.io/api
- Troubleshooting: https://docs.zeroshare.io/troubleshooting

---

## Legal & Compliance

### EULA
See [eula.md](eula.md) for full End User License Agreement

### Refund Policy
30-day money-back guarantee for first-time customers

### Data Processing
- No customer data stored by ZeroShare
- All processing occurs in customer's infrastructure
- Logs remain on customer systems
- GDPR Data Processing Agreement available

### Compliance Certifications
- SOC 2 Type II (in progress)
- ISO 27001 (planned)
- HIPAA Business Associate Agreement available

---

## Seller Information

### Company Name
ZeroShare, Inc.

### Company Website
https://zeroshare.io

### Company Description
ZeroShare provides enterprise security solutions for AI-powered development workflows. Our mission is to enable organizations to safely adopt AI tools without compromising data security or compliance.

### AWS Partner Status
AWS Partner Network (APN) Member

### Contact Information
- Sales: sales@zeroshare.io
- Support: support@zeroshare.io
- Security: security@zeroshare.io

---

## Version Information

### Current Version
1.0.0

### Release Notes
See [CHANGELOG.md](/CHANGELOG.md) for detailed release notes

### Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2024-XX-XX | Initial marketplace release |

---

## AWS Marketplace Checklist

### Before Submission
- [ ] Product logo (500x500 PNG)
- [ ] Product icon (80x80 PNG)
- [ ] 3-6 screenshots
- [ ] Short description (200 chars)
- [ ] Long description (2000 chars)
- [ ] Pricing configured
- [ ] EULA finalized
- [ ] Support documentation
- [ ] Container images published to ECR
- [ ] Deployment tested on AWS
- [ ] FTR self-assessment complete

### AWS Review Requirements
- [ ] Product functions as described
- [ ] No security vulnerabilities
- [ ] Clean installation/uninstallation
- [ ] Accurate pricing
- [ ] Responsive support
- [ ] Professional presentation
