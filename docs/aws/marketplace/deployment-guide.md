# ZeroShare Gateway - AWS Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying ZeroShare Gateway on AWS infrastructure. The deployment is designed to be simple, secure, and scalable.

## Deployment Options

| Option | Complexity | Best For | Time |
|--------|------------|----------|------|
| [Docker Compose](#docker-compose-deployment) | Low | Small teams, PoC | 15 min |
| [Amazon ECS](#amazon-ecs-deployment) | Medium | Production, managed | 30 min |
| [Amazon EKS](#amazon-eks-deployment) | High | Large scale, K8s teams | 45 min |
| [EC2 Direct](#ec2-direct-deployment) | Medium | Full control | 30 min |

---

## Prerequisites

### AWS Account Requirements
- Active AWS account
- IAM user with administrative access (or specific permissions below)
- AWS CLI configured locally

### Required IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "ecs:*",
        "ecr:*",
        "elasticloadbalancing:*",
        "logs:*",
        "secretsmanager:*",
        "kms:*",
        "iam:PassRole",
        "iam:CreateServiceLinkedRole"
      ],
      "Resource": "*"
    }
  ]
}
```

### Network Requirements
- VPC with private and public subnets
- NAT Gateway for outbound internet (private subnets)
- Security groups allowing required traffic

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AWS CLOUD                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            VPC (10.0.0.0/16)                          │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────┐    ┌─────────────────────────┐          │  │
│  │  │   Public Subnet A       │    │   Public Subnet B       │          │  │
│  │  │   (10.0.1.0/24)        │    │   (10.0.2.0/24)        │          │  │
│  │  │                         │    │                         │          │  │
│  │  │  ┌─────────────────┐   │    │  ┌─────────────────┐   │          │  │
│  │  │  │  NAT Gateway    │   │    │  │  NAT Gateway    │   │          │  │
│  │  │  └─────────────────┘   │    │  └─────────────────┘   │          │  │
│  │  │                         │    │                         │          │  │
│  │  └─────────────────────────┘    └─────────────────────────┘          │  │
│  │                                                                        │  │
│  │              ┌──────────────────────────────────┐                     │  │
│  │              │   Application Load Balancer      │                     │  │
│  │              │   (Internet-facing, HTTPS)       │                     │  │
│  │              └──────────────────────────────────┘                     │  │
│  │                              │                                         │  │
│  │  ┌─────────────────────────┐│   ┌─────────────────────────┐          │  │
│  │  │   Private Subnet A      ││   │   Private Subnet B      │          │  │
│  │  │   (10.0.10.0/24)       ││   │   (10.0.20.0/24)       │          │  │
│  │  │                         ││   │                         │          │  │
│  │  │  ┌─────────────────┐   ││   │  ┌─────────────────┐   │          │  │
│  │  │  │ ECS Task        │◄──┘└──►│  │ ECS Task        │   │          │  │
│  │  │  │ ZeroShare GW    │        │  │ ZeroShare GW    │   │          │  │
│  │  │  └─────────────────┘        │  └─────────────────┘   │          │  │
│  │  │                              │                         │          │  │
│  │  └─────────────────────────────┘─────────────────────────┘          │  │
│  │                              │                                         │  │
│  │                              ▼                                         │  │
│  │              ┌──────────────────────────────────┐                     │  │
│  │              │   Amazon Bedrock / External AI   │                     │  │
│  │              └──────────────────────────────────┘                     │  │
│  │                                                                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Secrets Manager │  │ CloudWatch Logs │  │ AWS KMS         │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Docker Compose Deployment

### Quick Start (Development/PoC)

**1. Launch EC2 Instance**

```bash
# Using AWS CLI
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxxxxx \
  --subnet-id subnet-xxxxxxxx \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=zeroshare-gateway}]'
```

**2. Connect and Install Docker**

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@<instance-ip>

# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Re-login to apply group changes
exit
ssh -i your-key.pem ec2-user@<instance-ip>
```

**3. Deploy ZeroShare Gateway**

```bash
# Create deployment directory
mkdir -p /opt/zeroshare
cd /opt/zeroshare

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  gateway:
    image: zeroshare/gateway:latest
    ports:
      - "8080:8080"
    environment:
      - ZEROSHARE_LICENSE_KEY=${ZEROSHARE_LICENSE_KEY}
      - AI_BACKEND=bedrock
      - AWS_REGION=${AWS_REGION}
      - LOG_LEVEL=INFO
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  dashboard:
    image: zeroshare/dashboard:latest
    ports:
      - "8501:8501"
    environment:
      - GATEWAY_URL=http://gateway:8080
    depends_on:
      - gateway
    restart: unless-stopped

volumes:
  config:
  logs:
EOF

# Create environment file
cat > .env << 'EOF'
ZEROSHARE_LICENSE_KEY=your-license-key
AWS_REGION=us-east-1
EOF

# Start services
docker-compose up -d

# Verify deployment
docker-compose ps
curl http://localhost:8080/health
```

---

## Amazon ECS Deployment

### CloudFormation Template

```yaml
# zeroshare-ecs.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'ZeroShare Gateway ECS Deployment'

Parameters:
  VpcId:
    Type: AWS::EC2::VPC::Id
    Description: VPC for deployment
  
  SubnetIds:
    Type: List<AWS::EC2::Subnet::Id>
    Description: Private subnets for ECS tasks
  
  PublicSubnetIds:
    Type: List<AWS::EC2::Subnet::Id>
    Description: Public subnets for ALB
  
  LicenseKey:
    Type: String
    Description: ZeroShare license key
    NoEcho: true
  
  DesiredCount:
    Type: Number
    Default: 2
    Description: Number of ECS tasks

Resources:
  # ECS Cluster
  ECSCluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: zeroshare-gateway
      ClusterSettings:
        - Name: containerInsights
          Value: enabled
      Tags:
        - Key: Application
          Value: ZeroShare

  # Task Execution Role
  TaskExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: zeroshare-task-execution-role
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
      Policies:
        - PolicyName: SecretsAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - secretsmanager:GetSecretValue
                Resource: !Ref LicenseSecret

  # Task Role (for application)
  TaskRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: zeroshare-task-role
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: BedrockAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - bedrock:InvokeModel
                  - bedrock:InvokeModelWithResponseStream
                Resource: '*'
        - PolicyName: CloudWatchLogs
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - logs:CreateLogStream
                  - logs:PutLogEvents
                Resource: !GetAtt LogGroup.Arn

  # License Secret
  LicenseSecret:
    Type: AWS::SecretsManager::Secret
    Properties:
      Name: zeroshare/license-key
      Description: ZeroShare Gateway license key
      SecretString: !Ref LicenseKey

  # CloudWatch Log Group
  LogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: /ecs/zeroshare-gateway
      RetentionInDays: 30

  # Task Definition
  TaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: zeroshare-gateway
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      Cpu: '1024'
      Memory: '2048'
      ExecutionRoleArn: !GetAtt TaskExecutionRole.Arn
      TaskRoleArn: !GetAtt TaskRole.Arn
      ContainerDefinitions:
        - Name: gateway
          Image: zeroshare/gateway:latest
          Essential: true
          PortMappings:
            - ContainerPort: 8080
              Protocol: tcp
          Environment:
            - Name: AI_BACKEND
              Value: bedrock
            - Name: AWS_REGION
              Value: !Ref AWS::Region
            - Name: LOG_LEVEL
              Value: INFO
          Secrets:
            - Name: ZEROSHARE_LICENSE_KEY
              ValueFrom: !Ref LicenseSecret
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-group: !Ref LogGroup
              awslogs-region: !Ref AWS::Region
              awslogs-stream-prefix: gateway
          HealthCheck:
            Command:
              - CMD-SHELL
              - curl -f http://localhost:8080/health || exit 1
            Interval: 30
            Timeout: 5
            Retries: 3
            StartPeriod: 60

  # Security Group for ECS Tasks
  TaskSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for ZeroShare Gateway ECS tasks
      VpcId: !Ref VpcId
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 8080
          ToPort: 8080
          SourceSecurityGroupId: !Ref ALBSecurityGroup
      SecurityGroupEgress:
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0

  # Security Group for ALB
  ALBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for ZeroShare Gateway ALB
      VpcId: !Ref VpcId
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
      SecurityGroupEgress:
        - IpProtocol: tcp
          FromPort: 8080
          ToPort: 8080
          DestinationSecurityGroupId: !Ref TaskSecurityGroup

  # Application Load Balancer
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: zeroshare-gateway-alb
      Type: application
      Scheme: internet-facing
      SecurityGroups:
        - !Ref ALBSecurityGroup
      Subnets: !Ref PublicSubnetIds

  # Target Group
  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: zeroshare-gateway-tg
      Port: 8080
      Protocol: HTTP
      VpcId: !Ref VpcId
      TargetType: ip
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3

  # HTTPS Listener (requires certificate)
  # HTTPSListener:
  #   Type: AWS::ElasticLoadBalancingV2::Listener
  #   Properties:
  #     LoadBalancerArn: !Ref ApplicationLoadBalancer
  #     Port: 443
  #     Protocol: HTTPS
  #     Certificates:
  #       - CertificateArn: !Ref CertificateArn
  #     DefaultActions:
  #       - Type: forward
  #         TargetGroupArn: !Ref TargetGroup

  # HTTP Listener (redirect to HTTPS in production)
  HTTPListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref ApplicationLoadBalancer
      Port: 80
      Protocol: HTTP
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref TargetGroup

  # ECS Service
  ECSService:
    Type: AWS::ECS::Service
    DependsOn: HTTPListener
    Properties:
      ServiceName: zeroshare-gateway
      Cluster: !Ref ECSCluster
      TaskDefinition: !Ref TaskDefinition
      DesiredCount: !Ref DesiredCount
      LaunchType: FARGATE
      NetworkConfiguration:
        AwsvpcConfiguration:
          AssignPublicIp: DISABLED
          SecurityGroups:
            - !Ref TaskSecurityGroup
          Subnets: !Ref SubnetIds
      LoadBalancers:
        - ContainerName: gateway
          ContainerPort: 8080
          TargetGroupArn: !Ref TargetGroup
      DeploymentConfiguration:
        MinimumHealthyPercent: 50
        MaximumPercent: 200

  # Auto Scaling
  AutoScalingTarget:
    Type: AWS::ApplicationAutoScaling::ScalableTarget
    Properties:
      MaxCapacity: 10
      MinCapacity: 2
      ResourceId: !Sub service/${ECSCluster}/${ECSService.Name}
      RoleARN: !Sub arn:aws:iam::${AWS::AccountId}:role/aws-service-role/ecs.application-autoscaling.amazonaws.com/AWSServiceRoleForApplicationAutoScaling_ECSService
      ScalableDimension: ecs:service:DesiredCount
      ServiceNamespace: ecs

  AutoScalingPolicy:
    Type: AWS::ApplicationAutoScaling::ScalingPolicy
    Properties:
      PolicyName: zeroshare-cpu-scaling
      PolicyType: TargetTrackingScaling
      ScalingTargetId: !Ref AutoScalingTarget
      TargetTrackingScalingPolicyConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ECSServiceAverageCPUUtilization
        TargetValue: 70.0
        ScaleInCooldown: 300
        ScaleOutCooldown: 60

Outputs:
  LoadBalancerDNS:
    Description: DNS name of the load balancer
    Value: !GetAtt ApplicationLoadBalancer.DNSName
  
  ClusterName:
    Description: ECS Cluster name
    Value: !Ref ECSCluster
  
  ServiceName:
    Description: ECS Service name
    Value: !GetAtt ECSService.Name
```

### Deploy with CloudFormation

```bash
# Deploy the stack
aws cloudformation create-stack \
  --stack-name zeroshare-gateway \
  --template-body file://zeroshare-ecs.yaml \
  --parameters \
    ParameterKey=VpcId,ParameterValue=vpc-xxxxxxxx \
    ParameterKey=SubnetIds,ParameterValue="subnet-aaaa,subnet-bbbb" \
    ParameterKey=PublicSubnetIds,ParameterValue="subnet-cccc,subnet-dddd" \
    ParameterKey=LicenseKey,ParameterValue=your-license-key \
  --capabilities CAPABILITY_NAMED_IAM

# Monitor deployment
aws cloudformation describe-stacks --stack-name zeroshare-gateway

# Get outputs
aws cloudformation describe-stacks \
  --stack-name zeroshare-gateway \
  --query 'Stacks[0].Outputs'
```

---

## Amazon EKS Deployment

### Kubernetes Manifests

```yaml
# zeroshare-k8s.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: zeroshare

---
apiVersion: v1
kind: Secret
metadata:
  name: zeroshare-secrets
  namespace: zeroshare
type: Opaque
stringData:
  license-key: "your-license-key"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zeroshare-gateway
  namespace: zeroshare
  labels:
    app: zeroshare-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zeroshare-gateway
  template:
    metadata:
      labels:
        app: zeroshare-gateway
    spec:
      serviceAccountName: zeroshare-gateway
      containers:
        - name: gateway
          image: zeroshare/gateway:latest
          ports:
            - containerPort: 8080
          env:
            - name: AI_BACKEND
              value: "bedrock"
            - name: AWS_REGION
              valueFrom:
                fieldRef:
                  fieldPath: metadata.annotations['eks.amazonaws.com/region']
            - name: ZEROSHARE_LICENSE_KEY
              valueFrom:
                secretKeyRef:
                  name: zeroshare-secrets
                  key: license-key
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: zeroshare-gateway
  namespace: zeroshare
spec:
  selector:
    app: zeroshare-gateway
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: zeroshare-gateway
  namespace: zeroshare
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/healthcheck-path: /health
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: zeroshare-gateway
                port:
                  number: 80

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: zeroshare-gateway
  namespace: zeroshare
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: zeroshare-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### Deploy to EKS

```bash
# Apply manifests
kubectl apply -f zeroshare-k8s.yaml

# Verify deployment
kubectl get pods -n zeroshare
kubectl get svc -n zeroshare
kubectl get ingress -n zeroshare

# Check logs
kubectl logs -f deployment/zeroshare-gateway -n zeroshare
```

---

## Post-Deployment Configuration

### 1. Configure AI Backend

```bash
# For Amazon Bedrock
aws bedrock list-foundation-models --region us-east-1

# Update configuration
curl -X POST http://<gateway-url>/admin/config \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ai_backend": "bedrock",
    "bedrock_model": "anthropic.claude-3-sonnet-20240229-v1:0",
    "bedrock_region": "us-east-1"
  }'
```

### 2. Configure Detection Rules

```bash
# Enable all PII detection
curl -X POST http://<gateway-url>/admin/detection \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pii_detection": true,
    "secrets_detection": true,
    "custom_patterns": [
      {
        "name": "internal_project_codes",
        "pattern": "PROJ-[A-Z]{3}-\\d{4}",
        "action": "redact"
      }
    ]
  }'
```

### 3. Configure Users

```bash
# Add user
curl -X POST http://<gateway-url>/admin/users \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "developer1",
    "role": "developer",
    "email": "dev1@company.com"
  }'
```

---

## Verification Checklist

- [ ] Gateway responds to health check: `curl http://<url>/health`
- [ ] PII detection working: Test with sample PII
- [ ] Secrets blocking working: Test with sample API key
- [ ] Audit logs being generated
- [ ] Metrics visible in CloudWatch
- [ ] Auto-scaling configured
- [ ] SSL/TLS certificate installed
- [ ] DNS configured (optional)

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Health check fails | Container not ready | Check logs, increase startup time |
| 502 Bad Gateway | Target not healthy | Check security groups, task status |
| Slow response | Resource constraints | Increase CPU/memory |
| License error | Invalid key | Verify license in Secrets Manager |
| Bedrock access denied | IAM permissions | Check task role policy |

### Useful Commands

```bash
# ECS logs
aws logs tail /ecs/zeroshare-gateway --follow

# ECS task status
aws ecs describe-tasks --cluster zeroshare-gateway --tasks <task-arn>

# Force new deployment
aws ecs update-service --cluster zeroshare-gateway --service zeroshare-gateway --force-new-deployment
```

---

## Support

- Documentation: https://docs.zeroshare.io
- Support: support@zeroshare.io
- AWS Issues: Check CloudWatch Logs first
