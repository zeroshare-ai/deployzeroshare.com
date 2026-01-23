# IAM Policies for ZeroShare Gateway

This document contains all IAM policies required for deploying and operating ZeroShare Gateway on AWS.

---

## Overview

ZeroShare Gateway uses the principle of least privilege. Each role has only the minimum permissions required for its function.

### Roles Summary

| Role | Purpose | Trust |
|------|---------|-------|
| Task Execution Role | ECS task startup, secrets | ecs-tasks.amazonaws.com |
| Task Role | Application runtime | ecs-tasks.amazonaws.com |
| CI/CD Role | Deployment automation | GitHub Actions / CI system |
| Admin Role | Management operations | IAM users |

---

## Task Execution Role

Used by ECS to start tasks, pull images, and retrieve secrets.

### Trust Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Permissions Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ECRAccess",
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ECRImagePull",
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage"
      ],
      "Resource": [
        "arn:aws:ecr:*:*:repository/zeroshare/*",
        "arn:aws:ecr:*:*:repository/zeroshare-gateway"
      ]
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*:*"
    },
    {
      "Sid": "SecretsAccess",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:*:*:secret:zeroshare/*",
        "arn:aws:secretsmanager:*:*:secret:*/zeroshare/*"
      ]
    },
    {
      "Sid": "KMSDecrypt",
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "secretsmanager.*.amazonaws.com"
        }
      }
    }
  ]
}
```

---

## Task Role

Used by the application during runtime for accessing AWS services.

### Trust Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Permissions Policy - Bedrock Access

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockInvokeModel",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-3-sonnet-*",
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-3-haiku-*",
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-v2*",
        "arn:aws:bedrock:*::foundation-model/amazon.titan-text-*",
        "arn:aws:bedrock:*::foundation-model/amazon.titan-embed-*"
      ],
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": [
            "us-east-1",
            "us-west-2",
            "eu-west-1"
          ]
        }
      }
    }
  ]
}
```

### Permissions Policy - CloudWatch

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*:*"
    },
    {
      "Sid": "CloudWatchMetrics",
      "Effect": "Allow",
      "Action": [
        "cloudwatch:PutMetricData"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "cloudwatch:namespace": "ZeroShare/Gateway"
        }
      }
    }
  ]
}
```

### Combined Task Role Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockInvokeModel",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-*",
        "arn:aws:bedrock:*::foundation-model/amazon.titan-*"
      ]
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*:*"
    },
    {
      "Sid": "CloudWatchMetrics",
      "Effect": "Allow",
      "Action": [
        "cloudwatch:PutMetricData"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "cloudwatch:namespace": "ZeroShare/Gateway"
        }
      }
    }
  ]
}
```

---

## CI/CD Deployment Role

Used by GitHub Actions or other CI/CD systems to deploy updates.

### Trust Policy (GitHub Actions OIDC)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:zeroshare/gateway:*"
        }
      }
    }
  ]
}
```

### Permissions Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ECRLogin",
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ECRPush",
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "arn:aws:ecr:*:*:repository/zeroshare-gateway"
    },
    {
      "Sid": "ECSDeployment",
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:DescribeTasks",
        "ecs:ListTasks",
        "ecs:RegisterTaskDefinition",
        "ecs:UpdateService"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ecs:cluster": "arn:aws:ecs:*:*:cluster/zeroshare-*"
        }
      }
    },
    {
      "Sid": "ECSTaskDefinition",
      "Effect": "Allow",
      "Action": [
        "ecs:RegisterTaskDefinition",
        "ecs:DescribeTaskDefinition"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PassRole",
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::*:role/zeroshare-*-execution-role",
        "arn:aws:iam::*:role/zeroshare-*-task-role"
      ]
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*"
    }
  ]
}
```

---

## Admin Role

For administrative operations and troubleshooting.

### Permissions Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ECSFullAccess",
      "Effect": "Allow",
      "Action": [
        "ecs:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "ecs:cluster": "arn:aws:ecs:*:*:cluster/zeroshare-*"
        }
      }
    },
    {
      "Sid": "CloudWatchAccess",
      "Effect": "Allow",
      "Action": [
        "logs:*",
        "cloudwatch:*"
      ],
      "Resource": [
        "arn:aws:logs:*:*:log-group:/ecs/zeroshare-*",
        "arn:aws:cloudwatch:*:*:alarm:zeroshare-*"
      ]
    },
    {
      "Sid": "SecretsManagement",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "secretsmanager:PutSecretValue",
        "secretsmanager:UpdateSecret",
        "secretsmanager:DescribeSecret"
      ],
      "Resource": "arn:aws:secretsmanager:*:*:secret:zeroshare/*"
    },
    {
      "Sid": "ALBAccess",
      "Effect": "Allow",
      "Action": [
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:ModifyTargetGroup*",
        "elasticloadbalancing:RegisterTargets",
        "elasticloadbalancing:DeregisterTargets"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Service-Linked Roles

These are created automatically by AWS when using certain services.

### ECS Service-Linked Role

```
Role: AWSServiceRoleForECS
ARN: arn:aws:iam::*:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS
Purpose: Allows ECS to manage resources on your behalf
```

### Auto Scaling Service-Linked Role

```
Role: AWSServiceRoleForApplicationAutoScaling_ECSService
ARN: arn:aws:iam::*:role/aws-service-role/ecs.application-autoscaling.amazonaws.com/AWSServiceRoleForApplicationAutoScaling_ECSService
Purpose: Allows Auto Scaling to manage ECS services
```

---

## Permission Boundaries (Optional)

For organizations requiring additional control:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowZeroShareResources",
      "Effect": "Allow",
      "Action": "*",
      "Resource": [
        "arn:aws:ecs:*:*:*zeroshare*",
        "arn:aws:ecr:*:*:repository/zeroshare*",
        "arn:aws:logs:*:*:log-group:/ecs/zeroshare*",
        "arn:aws:secretsmanager:*:*:secret:zeroshare*",
        "arn:aws:elasticloadbalancing:*:*:*zeroshare*"
      ]
    },
    {
      "Sid": "DenyPrivilegeEscalation",
      "Effect": "Deny",
      "Action": [
        "iam:CreateUser",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Resource Tagging Policy

All resources should be tagged for cost allocation and management:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireTags",
      "Effect": "Deny",
      "Action": [
        "ecs:CreateCluster",
        "ecs:CreateService",
        "ec2:RunInstances"
      ],
      "Resource": "*",
      "Condition": {
        "Null": {
          "aws:RequestTag/Application": "true",
          "aws:RequestTag/Environment": "true"
        }
      }
    }
  ]
}
```

### Required Tags

| Tag | Required | Example |
|-----|----------|---------|
| Application | Yes | ZeroShare |
| Environment | Yes | production, staging, development |
| Owner | Recommended | team-name |
| CostCenter | Recommended | cost-center-code |

---

## Security Best Practices

### Do's ✅

- Use IAM roles, not access keys
- Apply least privilege
- Use conditions to restrict scope
- Enable CloudTrail for audit
- Rotate credentials regularly
- Use resource-based policies where possible

### Don'ts ❌

- Don't use root account
- Don't share credentials
- Don't hardcode credentials
- Don't use `*` for resources without conditions
- Don't disable MFA
- Don't ignore IAM Access Analyzer findings

---

## Validation

### Check Policies with IAM Access Analyzer

```bash
# Validate policy
aws accessanalyzer validate-policy \
  --policy-document file://policy.json \
  --policy-type IDENTITY_POLICY

# Check for unused access
aws accessanalyzer list-findings \
  --analyzer-arn arn:aws:access-analyzer:region:account:analyzer/name
```

### Test Permissions

```bash
# Simulate policy
aws iam simulate-principal-policy \
  --policy-source-arn arn:aws:iam::account:role/zeroshare-task-role \
  --action-names bedrock:InvokeModel \
  --resource-arns arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet
```

---

## CloudFormation IAM Resources

See `cloudformation/zeroshare-complete.yaml` for IAM resources defined in CloudFormation.

Key resources:
- `TaskExecutionRole`
- `TaskRole`
- Associated policies

---

## Policy Updates

When updating policies:

1. Test in development environment first
2. Use IAM Access Analyzer to validate
3. Apply changes during maintenance window
4. Monitor CloudTrail for authorization failures
5. Document changes in changelog
