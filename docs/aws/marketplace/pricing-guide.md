# AWS Marketplace Pricing Guide

## Pricing Strategy

### Pricing Model Selection

AWS Marketplace supports several pricing models. ZeroShare Gateway uses **Contract Pricing** with a **Free Tier**.

| Model | Description | Best For | ZeroShare |
|-------|-------------|----------|-----------|
| Free | No charge | Lead generation | ✅ Free tier |
| BYOL | Bring Your Own License | Existing customers | ❌ |
| Hourly | Pay per hour running | Variable usage | ❌ |
| Monthly | Fixed monthly fee | Predictable pricing | ✅ Primary |
| Annual | Yearly subscription | Enterprise | ✅ Discounted |
| Usage-Based | Pay per consumption | Variable workloads | ⚠️ Future |
| Contract | Upfront commitment | Enterprise deals | ✅ Enterprise |

---

## Pricing Tiers

### Tier Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ZEROSHARE GATEWAY PRICING                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FREE TIER                          TEAM                                    │
│  ┌─────────────────────┐           ┌─────────────────────┐                 │
│  │ Up to 5 Users       │           │ Up to 25 Users      │                 │
│  │ $0/month            │           │ $499/month          │                 │
│  │ Community Support   │    ──►    │ Email Support       │                 │
│  │ Basic Features      │           │ All Features        │                 │
│  └─────────────────────┘           └─────────────────────┘                 │
│                                             │                               │
│                                             ▼                               │
│  BUSINESS                           ENTERPRISE                              │
│  ┌─────────────────────┐           ┌─────────────────────┐                 │
│  │ Up to 100 Users     │           │ Unlimited Users     │                 │
│  │ $1,499/month        │           │ Custom Pricing      │                 │
│  │ Priority Support    │    ──►    │ 24/7 Support        │                 │
│  │ SSO/SAML           │           │ Dedicated Support   │                 │
│  │ Advanced Analytics  │           │ Custom Integration  │                 │
│  └─────────────────────┘           └─────────────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Detailed Tier Comparison

| Feature | Free | Team | Business | Enterprise |
|---------|------|------|----------|------------|
| **Users** | 5 | 25 | 100 | Unlimited |
| **Monthly Price** | $0 | $499 | $1,499 | Custom |
| **Annual Price** | $0 | $5,090 | $15,290 | Custom |
| **Per User/Month** | $0 | ~$20 | ~$15 | Negotiated |
| **PII Detection** | ✅ | ✅ | ✅ | ✅ |
| **Secrets Blocking** | ✅ | ✅ | ✅ | ✅ |
| **Audit Logging** | 7 days | 30 days | 90 days | Custom |
| **Dashboard** | Basic | Full | Full | Custom |
| **SSO/SAML** | ❌ | ❌ | ✅ | ✅ |
| **API Access** | Limited | Full | Full | Full |
| **Custom Rules** | ❌ | 10 | 50 | Unlimited |
| **AI Backends** | 1 | 2 | 5 | Unlimited |
| **Support** | Community | Email (24h) | Priority (4h) | 24/7 (1h) |
| **SLA** | None | 99.5% | 99.9% | 99.99% |

---

## AWS Marketplace Pricing Configuration

### Contract Dimensions

Define pricing dimensions in AWS Marketplace Management Portal:

```json
{
  "ProductId": "prod-zeroshare-gateway",
  "PricingModel": "Contract",
  "ContractDimensions": [
    {
      "Name": "FreeUsers",
      "Description": "Free tier users (up to 5)",
      "Type": "Quantity",
      "Unit": "Users",
      "RateCard": {
        "1Month": { "USD": "0.00" },
        "12Months": { "USD": "0.00" }
      }
    },
    {
      "Name": "TeamSubscription",
      "Description": "Team subscription (up to 25 users)",
      "Type": "Subscription",
      "RateCard": {
        "1Month": { "USD": "499.00" },
        "12Months": { "USD": "5090.00" }
      }
    },
    {
      "Name": "BusinessSubscription",
      "Description": "Business subscription (up to 100 users)",
      "Type": "Subscription",
      "RateCard": {
        "1Month": { "USD": "1499.00" },
        "12Months": { "USD": "15290.00" }
      }
    },
    {
      "Name": "EnterpriseSubscription",
      "Description": "Enterprise subscription (unlimited users)",
      "Type": "Subscription",
      "RateCard": {
        "Custom": true
      }
    }
  ]
}
```

### Usage-Based Metering (Future)

For future usage-based pricing options:

```json
{
  "UsageDimensions": [
    {
      "Name": "RequestsProcessed",
      "Description": "AI requests processed",
      "Type": "Quantity",
      "Unit": "1000 Requests",
      "RateCard": {
        "USD": "0.10"
      }
    },
    {
      "Name": "DataScanned",
      "Description": "Data volume scanned",
      "Type": "Quantity",
      "Unit": "GB",
      "RateCard": {
        "USD": "0.05"
      }
    }
  ]
}
```

---

## Metering Integration

### AWS Marketplace Metering Service

To report usage to AWS Marketplace, integrate with the Metering Service:

```python
# metering.py - AWS Marketplace Metering Integration

import boto3
from datetime import datetime, timezone
import os

class MarketplaceMeter:
    def __init__(self):
        self.client = boto3.client('meteringmarketplace')
        self.product_code = os.environ.get('AWS_MARKETPLACE_PRODUCT_CODE')
    
    def register_usage(self, dimension: str, quantity: int):
        """
        Report usage to AWS Marketplace.
        
        Args:
            dimension: The pricing dimension (e.g., 'RequestsProcessed')
            quantity: The quantity to report
        """
        try:
            response = self.client.meter_usage(
                ProductCode=self.product_code,
                Timestamp=datetime.now(timezone.utc),
                UsageDimension=dimension,
                UsageQuantity=quantity,
                DryRun=False
            )
            return response
        except Exception as e:
            # Log error but don't fail the request
            print(f"Metering error: {e}")
            return None
    
    def batch_meter_usage(self, usage_records: list):
        """
        Report batch usage to AWS Marketplace.
        
        Args:
            usage_records: List of {dimension, quantity, timestamp} dicts
        """
        try:
            response = self.client.batch_meter_usage(
                ProductCode=self.product_code,
                UsageRecords=[
                    {
                        'Timestamp': record['timestamp'],
                        'CustomerIdentifier': record['customer_id'],
                        'Dimension': record['dimension'],
                        'Quantity': record['quantity']
                    }
                    for record in usage_records
                ]
            )
            return response
        except Exception as e:
            print(f"Batch metering error: {e}")
            return None
    
    def resolve_customer(self, registration_token: str):
        """
        Resolve customer from marketplace registration token.
        
        Called when customer subscribes through AWS Marketplace.
        """
        try:
            response = self.client.resolve_customer(
                RegistrationToken=registration_token
            )
            return {
                'customer_id': response['CustomerIdentifier'],
                'product_code': response['ProductCode']
            }
        except Exception as e:
            print(f"Customer resolution error: {e}")
            return None
```

### Entitlement Verification

```python
# entitlement.py - Check customer entitlements

import boto3

class EntitlementChecker:
    def __init__(self):
        self.client = boto3.client('marketplace-entitlement')
    
    def get_entitlements(self, customer_id: str, product_code: str):
        """
        Get customer entitlements from AWS Marketplace.
        """
        try:
            response = self.client.get_entitlements(
                ProductCode=product_code,
                Filter={
                    'CUSTOMER_IDENTIFIER': [customer_id]
                }
            )
            return response.get('Entitlements', [])
        except Exception as e:
            print(f"Entitlement check error: {e}")
            return []
    
    def check_feature_entitlement(self, customer_id: str, feature: str):
        """
        Check if customer is entitled to a specific feature.
        """
        entitlements = self.get_entitlements(
            customer_id, 
            os.environ.get('AWS_MARKETPLACE_PRODUCT_CODE')
        )
        
        for ent in entitlements:
            if ent.get('Dimension') == feature:
                return {
                    'entitled': True,
                    'value': ent.get('Value', {}).get('IntegerValue', 0),
                    'expiration': ent.get('ExpirationDate')
                }
        
        return {'entitled': False}
```

---

## Free Trial Implementation

### Trial Configuration

```yaml
# trial-config.yaml
trial:
  enabled: true
  duration_days: 14
  features:
    - all_pii_detection
    - all_secrets_blocking
    - full_dashboard
    - api_access
  limits:
    max_users: 25
    max_requests_per_day: 10000
    audit_log_retention_days: 14
  
  conversion:
    reminder_days: [7, 3, 1]
    grace_period_days: 3
```

### Trial Management Code

```python
# trial.py - Free trial management

from datetime import datetime, timedelta
from dataclasses import dataclass

@dataclass
class TrialStatus:
    is_trial: bool
    started: datetime
    expires: datetime
    days_remaining: int
    converted: bool

class TrialManager:
    TRIAL_DURATION_DAYS = 14
    GRACE_PERIOD_DAYS = 3
    
    def start_trial(self, customer_id: str) -> TrialStatus:
        """Start a new trial for customer."""
        started = datetime.utcnow()
        expires = started + timedelta(days=self.TRIAL_DURATION_DAYS)
        
        # Store trial info
        self._store_trial(customer_id, started, expires)
        
        return TrialStatus(
            is_trial=True,
            started=started,
            expires=expires,
            days_remaining=self.TRIAL_DURATION_DAYS,
            converted=False
        )
    
    def check_trial(self, customer_id: str) -> TrialStatus:
        """Check trial status for customer."""
        trial = self._get_trial(customer_id)
        
        if not trial:
            return TrialStatus(
                is_trial=False,
                started=None,
                expires=None,
                days_remaining=0,
                converted=False
            )
        
        now = datetime.utcnow()
        days_remaining = (trial['expires'] - now).days
        
        return TrialStatus(
            is_trial=True,
            started=trial['started'],
            expires=trial['expires'],
            days_remaining=max(0, days_remaining),
            converted=trial.get('converted', False)
        )
    
    def is_trial_valid(self, customer_id: str) -> bool:
        """Check if trial is still valid."""
        status = self.check_trial(customer_id)
        
        if not status.is_trial:
            return False
        
        if status.converted:
            return False  # No longer on trial
        
        # Include grace period
        grace_expires = status.expires + timedelta(days=self.GRACE_PERIOD_DAYS)
        return datetime.utcnow() < grace_expires
```

---

## Revenue Reporting

### AWS Marketplace Reports

AWS provides these reports in the Seller Portal:

| Report | Content | Frequency |
|--------|---------|-----------|
| Daily Business Report | Subscriptions, revenue | Daily |
| Monthly Revenue Report | Detailed financials | Monthly |
| Customer Subscriber Report | Customer list | Daily |
| Usage Report | Metered usage | Daily |
| Disbursement Report | Payouts | Monthly |

### Key Metrics to Track

```python
# metrics.py - Revenue and usage metrics

@dataclass
class RevenueMetrics:
    period: str
    gross_revenue: float
    aws_fee: float  # Typically 15-20%
    net_revenue: float
    subscriptions: int
    trials: int
    conversions: int
    churn: int
    mrr: float  # Monthly Recurring Revenue
    arr: float  # Annual Recurring Revenue

def calculate_metrics(period: str) -> RevenueMetrics:
    """Calculate revenue metrics for period."""
    # Implementation would pull from AWS reports
    pass
```

---

## Pricing Best Practices

### 1. Value-Based Pricing
- Price based on value delivered, not cost
- Enterprise customers pay premium for advanced features
- Free tier generates leads and trials

### 2. Simple Tier Structure
- Clear differentiation between tiers
- Easy for customers to understand
- Natural upgrade path

### 3. Annual Incentives
- 15-20% discount for annual commitment
- Reduces churn
- Improves cash flow

### 4. Enterprise Flexibility
- Custom pricing for large deals
- Volume discounts
- Multi-year agreements

### 5. Competitive Positioning
| Competitor | Pricing | ZeroShare Position |
|------------|---------|-------------------|
| Generic DLP | $50-100/user/month | More affordable, AI-focused |
| Enterprise DLP | $100k+/year | Better value, easier deploy |
| No solution | $0 (risk of breach) | ROI from breach prevention |

---

## AWS Fee Structure

### Standard Fees
- **AWS Marketplace Fee:** 15-20% of gross revenue
- **Payment Processing:** Included in AWS fee
- **Listing Fee:** None

### Fee Reduction Programs
- **AWS ISV Accelerate:** Reduced fees for qualified partners
- **Volume Tiers:** Negotiable at scale
- **Private Offers:** Custom terms available

### Example Revenue Calculation

```
Monthly Subscription: $1,499 (Business tier)
AWS Fee (20%):       -$299.80
Net Revenue:          $1,199.20

Annual Subscription: $15,290
AWS Fee (15%*):      -$2,293.50
Net Revenue:         $12,996.50

* Reduced fee for annual commitments in some programs
```

---

## Marketplace Listing Pricing Checklist

- [ ] Define pricing tiers
- [ ] Configure free tier limits
- [ ] Set up trial duration
- [ ] Configure annual discounts
- [ ] Implement metering integration
- [ ] Set up entitlement checking
- [ ] Test subscription flow
- [ ] Test trial conversion
- [ ] Verify revenue reporting
- [ ] Document pricing publicly
