# AWS Foundational Technical Review (FTR) Checklist

## Overview

The AWS Foundational Technical Review (FTR) is required for AWS Partner badges and competencies. This checklist helps prepare for and pass the FTR.

### What is FTR?

FTR validates that your solution follows AWS best practices across:
- Security
- Reliability
- Operational excellence
- Performance efficiency
- Cost optimization

### FTR Benefits

- ✅ AWS Reviewed badge on Marketplace listing
- ✅ Eligibility for AWS competencies
- ✅ Co-sell opportunities with AWS
- ✅ Customer confidence

---

## FTR Requirements Checklist

### 1. Security

#### 1.1 Identity and Access Management

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Use IAM roles instead of long-term credentials | ⬜ | Task role policy |
| Implement least privilege access | ⬜ | IAM policy documents |
| No hardcoded credentials in code | ⬜ | Code scan results |
| Support customer IAM integration | ⬜ | Documentation |
| MFA support for administrative access | ⬜ | Configuration guide |

**ZeroShare Implementation:**
```json
// Task Role - Least Privilege
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "arn:aws:bedrock:*:*:foundation-model/*"
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*"
    }
  ]
}
```

#### 1.2 Data Protection

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Encrypt data at rest | ⬜ | EBS/S3 encryption config |
| Encrypt data in transit (TLS 1.2+) | ⬜ | ALB/NLB config |
| Use AWS KMS for key management | ⬜ | KMS key policies |
| No sensitive data in logs | ⬜ | Log samples |
| Support customer-managed keys | ⬜ | Documentation |

**ZeroShare Implementation:**
- All traffic uses TLS 1.2+ via ALB
- ECS tasks use encrypted EBS volumes
- Secrets stored in AWS Secrets Manager
- Audit logs contain hashed values only, no raw PII

#### 1.3 Network Security

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Deploy in VPC | ⬜ | Architecture diagram |
| Use security groups (least privilege) | ⬜ | SG configurations |
| Private subnets for workloads | ⬜ | Network diagram |
| No direct internet access to compute | ⬜ | Route table config |
| Use VPC endpoints where applicable | ⬜ | Endpoint configuration |

**Security Group Configuration:**
```hcl
# ALB Security Group
ingress {
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]  # Or customer-specific
}

# Task Security Group
ingress {
  from_port       = 8080
  to_port         = 8080
  protocol        = "tcp"
  security_groups = [alb_security_group_id]
}

egress {
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]  # For AI provider access
}
```

#### 1.4 Logging and Monitoring

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Enable CloudWatch Logs | ⬜ | Log group configuration |
| Enable CloudTrail | ⬜ | Trail configuration |
| Implement health checks | ⬜ | ALB/ECS health config |
| Create CloudWatch alarms | ⬜ | Alarm definitions |
| Support customer monitoring integration | ⬜ | Metrics documentation |

**CloudWatch Alarm Example:**
```yaml
HighCPUAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: ZeroShare-HighCPU
    MetricName: CPUUtilization
    Namespace: AWS/ECS
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 80
    ComparisonOperator: GreaterThanThreshold
    Dimensions:
      - Name: ClusterName
        Value: !Ref ECSCluster
      - Name: ServiceName
        Value: !GetAtt ECSService.Name
```

---

### 2. Reliability

#### 2.1 High Availability

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Multi-AZ deployment | ⬜ | Architecture diagram |
| Auto-scaling configuration | ⬜ | ASG/ECS scaling config |
| Load balancer configuration | ⬜ | ALB config |
| Health checks with automatic recovery | ⬜ | Health check config |
| Graceful degradation | ⬜ | Failover documentation |

**Multi-AZ Architecture:**
```
Region: us-east-1
├── AZ: us-east-1a
│   ├── Public Subnet (NAT Gateway, ALB)
│   └── Private Subnet (ECS Tasks)
├── AZ: us-east-1b
│   ├── Public Subnet (NAT Gateway, ALB)
│   └── Private Subnet (ECS Tasks)
└── AZ: us-east-1c
    ├── Public Subnet (NAT Gateway, ALB)
    └── Private Subnet (ECS Tasks)
```

#### 2.2 Backup and Recovery

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Automated backups | ⬜ | Backup configuration |
| Documented recovery procedures | ⬜ | Runbook |
| Tested recovery process | ⬜ | Test results |
| RTO/RPO defined | ⬜ | SLA documentation |

**ZeroShare Recovery:**
- **RTO**: 15 minutes (container restart)
- **RPO**: 0 (stateless application)
- Configuration backed up to S3
- Audit logs shipped to customer's storage

#### 2.3 Failure Handling

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Circuit breaker implementation | ⬜ | Code/config |
| Retry with exponential backoff | ⬜ | Code |
| Timeout configuration | ⬜ | Configuration |
| Graceful shutdown handling | ⬜ | Code |

---

### 3. Operational Excellence

#### 3.1 Infrastructure as Code

| Requirement | Status | Evidence |
|-------------|--------|----------|
| CloudFormation or Terraform templates | ⬜ | IaC templates |
| Parameterized templates | ⬜ | Parameter definitions |
| Version controlled | ⬜ | Git repository |
| Documented deployment process | ⬜ | Deployment guide |

**CloudFormation Provided:**
- `zeroshare-ecs.yaml` - Full ECS deployment
- `zeroshare-network.yaml` - VPC and networking
- `zeroshare-monitoring.yaml` - CloudWatch dashboards

#### 3.2 Deployment

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Blue/green or rolling deployment | ⬜ | Deployment config |
| Rollback capability | ⬜ | Procedure documentation |
| Zero-downtime updates | ⬜ | Test results |
| Deployment documentation | ⬜ | Deployment guide |

#### 3.3 Operations

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Runbooks for common operations | ⬜ | Runbook documentation |
| Incident response procedures | ⬜ | Incident playbook |
| On-call procedures (if applicable) | ⬜ | On-call documentation |
| Change management process | ⬜ | Process documentation |

---

### 4. Performance Efficiency

#### 4.1 Compute Selection

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Right-sized instances | ⬜ | Sizing documentation |
| Performance testing results | ⬜ | Test reports |
| Scaling thresholds documented | ⬜ | Scaling configuration |

**Recommended Sizing:**
| Workload | Instance Type | vCPU | Memory |
|----------|--------------|------|--------|
| Development | t3.small | 2 | 2 GB |
| Production (small) | t3.medium | 2 | 4 GB |
| Production (standard) | m5.large | 2 | 8 GB |
| High-throughput | m5.xlarge | 4 | 16 GB |

#### 4.2 Performance Monitoring

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Latency metrics | ⬜ | CloudWatch metrics |
| Throughput metrics | ⬜ | CloudWatch metrics |
| Resource utilization | ⬜ | Dashboard |
| Performance baselines | ⬜ | Benchmark results |

**Key Metrics:**
- Request latency (p50, p95, p99)
- Requests per second
- PII detection time
- AI provider response time
- CPU/Memory utilization

---

### 5. Cost Optimization

#### 5.1 Cost Awareness

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Cost estimates provided | ⬜ | Pricing documentation |
| Resource tagging | ⬜ | Tag strategy |
| Cost monitoring | ⬜ | Cost allocation tags |
| Right-sizing guidance | ⬜ | Sizing guide |

**Cost Tags Required:**
```yaml
Tags:
  - Key: Application
    Value: ZeroShare
  - Key: Environment
    Value: Production
  - Key: CostCenter
    Value: CustomerDefined
  - Key: Owner
    Value: CustomerDefined
```

#### 5.2 Cost Efficiency

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Auto-scaling (scale to zero if appropriate) | ⬜ | Scaling config |
| Spot instance support (if applicable) | ⬜ | Documentation |
| Reserved capacity guidance | ⬜ | Cost guide |

---

## FTR Documentation Package

### Required Documents

| Document | Description | Location |
|----------|-------------|----------|
| Architecture Diagram | System architecture | `docs/aws/architecture/` |
| Deployment Guide | Step-by-step deployment | `docs/aws/marketplace/deployment-guide.md` |
| Security Documentation | Security controls | `docs/aws/technical/security-review.md` |
| IAM Policies | All IAM policies used | `docs/aws/architecture/iam-policies.md` |
| CloudFormation Templates | IaC templates | `cloudformation/` |
| Operations Guide | Day-2 operations | `docs/aws/operations/` |
| Troubleshooting Guide | Common issues | `docs/aws/troubleshooting.md` |

### Self-Assessment Questionnaire

Complete the AWS FTR self-assessment questionnaire:
https://aws.amazon.com/partners/programs/ftr/

---

## FTR Submission Process

### Step 1: Self-Assessment
1. Complete this checklist
2. Gather all evidence
3. Complete AWS self-assessment questionnaire
4. Identify and remediate gaps

### Step 2: Documentation Review
1. Submit documentation to AWS
2. AWS reviews within 2-4 weeks
3. Address any feedback

### Step 3: Technical Validation
1. AWS may request demo or deep dive
2. Demonstrate key controls
3. Answer technical questions

### Step 4: Approval
1. Receive FTR approval
2. Badge added to Marketplace listing
3. Eligible for competency programs

---

## Common FTR Failures

| Issue | Cause | Solution |
|-------|-------|----------|
| Hardcoded credentials | Secrets in code/config | Use Secrets Manager |
| No encryption | Missing TLS/encryption | Enable encryption everywhere |
| Single AZ | No HA | Deploy multi-AZ |
| No logging | Missing CloudWatch | Enable comprehensive logging |
| Overprivileged IAM | Broad permissions | Implement least privilege |
| No IaC | Manual deployment | Provide CloudFormation |
| Missing documentation | Incomplete guides | Complete all required docs |

---

## FTR Timeline

| Week | Activity |
|------|----------|
| 1-2 | Self-assessment and gap analysis |
| 3-4 | Remediation of identified gaps |
| 5 | Documentation preparation |
| 6 | Self-assessment submission |
| 7-8 | AWS review |
| 9-10 | Address feedback (if any) |
| 10-12 | Approval and badge |

---

## Resources

- [AWS FTR Program](https://aws.amazon.com/partners/programs/ftr/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Security Best Practices](https://aws.amazon.com/security/security-resources/)
- [AWS Partner Central](https://partnercentral.awspartner.com/)

---

## FTR Checklist Summary

### Must Have (Blockers)
- [ ] No hardcoded credentials
- [ ] Encryption at rest and in transit
- [ ] VPC deployment with security groups
- [ ] CloudWatch logging
- [ ] Multi-AZ capability
- [ ] Infrastructure as Code
- [ ] Deployment documentation

### Should Have (Recommended)
- [ ] Auto-scaling
- [ ] CloudWatch alarms
- [ ] Health checks
- [ ] Cost tagging
- [ ] Operations runbooks

### Nice to Have (Differentiators)
- [ ] Blue/green deployment
- [ ] Spot instance support
- [ ] Customer-managed encryption keys
- [ ] Advanced monitoring dashboards
