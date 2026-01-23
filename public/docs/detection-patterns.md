# Detection Patterns

ZeroShare Gateway includes comprehensive detection capabilities for PII (Personally Identifiable Information) and secrets/credentials. This document details all built-in patterns and how to create custom rules.

---

## Overview

The detection engine supports:
- **50+ PII patterns** for personal data
- **200+ secret patterns** for credentials and API keys
- **Custom patterns** for organization-specific data
- **ML-enhanced detection** for context-aware scanning

---

## PII Detection Patterns

### Personal Identifiers

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `email` | Email addresses | `john@example.com` | Redact |
| `phone_us` | US phone numbers | `(555) 123-4567` | Redact |
| `phone_intl` | International phones | `+44 20 7946 0958` | Redact |
| `ssn` | Social Security Numbers | `123-45-6789` | Block |
| `drivers_license` | Driver's license numbers | Varies by state | Redact |
| `passport` | Passport numbers | `AB1234567` | Block |

### Financial Data

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `credit_card` | Credit card numbers | `4111-1111-1111-1111` | Block |
| `credit_card_visa` | Visa cards | `4XXX-XXXX-XXXX-XXXX` | Block |
| `credit_card_mastercard` | Mastercard | `5XXX-XXXX-XXXX-XXXX` | Block |
| `credit_card_amex` | American Express | `3XXX-XXXXXX-XXXXX` | Block |
| `bank_account` | Bank account numbers | `12345678901234` | Block |
| `iban` | International Bank Account | `GB82 WEST 1234 5698 7654 32` | Block |
| `routing_number` | ABA routing numbers | `021000021` | Redact |

### Health Information (PHI)

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `medical_record` | Medical record numbers | `MRN-12345678` | Block |
| `health_insurance_id` | Insurance IDs | Various formats | Block |
| `icd10_code` | ICD-10 diagnosis codes | `J18.9` | Warn |
| `npi` | National Provider ID | `1234567890` | Redact |
| `dea_number` | DEA registration | `AB1234567` | Block |

### Location Data

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `address_us` | US street addresses | `123 Main St, City, ST 12345` | Redact |
| `zipcode` | US ZIP codes | `12345` or `12345-6789` | Redact |
| `gps_coordinates` | GPS lat/long | `40.7128° N, 74.0060° W` | Redact |
| `ip_address` | IPv4 addresses | `192.168.1.1` | Redact |
| `ip_address_v6` | IPv6 addresses | `2001:0db8:85a3::8a2e:0370:7334` | Redact |

### Dates and Demographics

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `date_of_birth` | Birth dates | `01/15/1990` | Redact |
| `age` | Age references | `45 years old` | Warn |
| `gender` | Gender references | Context-based | Warn |
| `ethnicity` | Ethnicity references | Context-based | Warn |

---

## Secrets Detection Patterns

### Cloud Provider Credentials

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `aws_access_key` | AWS Access Key ID | `AKIA...` (20 chars) | Block |
| `aws_secret_key` | AWS Secret Access Key | `wJalrXUtnFEMI...` | Block |
| `azure_client_id` | Azure Client ID | UUID format | Block |
| `azure_client_secret` | Azure Client Secret | Various | Block |
| `gcp_service_key` | GCP Service Account | JSON key file | Block |
| `gcp_api_key` | GCP API Key | `AIza...` | Block |
| `digitalocean_token` | DigitalOcean API Token | `dop_v1_...` | Block |

### API Keys

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `openai_api_key` | OpenAI API Key | `sk-...` | Block |
| `anthropic_api_key` | Anthropic API Key | `sk-ant-...` | Block |
| `stripe_api_key` | Stripe Keys | `sk_live_...`, `sk_test_...` | Block |
| `stripe_restricted_key` | Stripe Restricted | `rk_live_...` | Block |
| `twilio_api_key` | Twilio API Key | `SK...` | Block |
| `twilio_auth_token` | Twilio Auth Token | 32 hex chars | Block |
| `sendgrid_api_key` | SendGrid API Key | `SG....` | Block |
| `mailchimp_api_key` | Mailchimp API Key | `...-us1` | Block |

### Version Control

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `github_token` | GitHub PAT | `ghp_...`, `gho_...` | Block |
| `github_oauth` | GitHub OAuth | `ghu_...`, `ghr_...` | Block |
| `gitlab_token` | GitLab Token | `glpat-...` | Block |
| `bitbucket_token` | Bitbucket Token | Various | Block |

### Database Credentials

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `postgres_url` | PostgreSQL Connection | `postgres://user:pass@host/db` | Block |
| `mysql_url` | MySQL Connection | `mysql://user:pass@host/db` | Block |
| `mongodb_url` | MongoDB Connection | `mongodb://user:pass@host/db` | Block |
| `redis_url` | Redis Connection | `redis://:pass@host:6379` | Block |

### Certificates and Keys

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `private_key_rsa` | RSA Private Key | `-----BEGIN RSA PRIVATE KEY-----` | Block |
| `private_key_ec` | EC Private Key | `-----BEGIN EC PRIVATE KEY-----` | Block |
| `private_key_openssh` | OpenSSH Private Key | `-----BEGIN OPENSSH PRIVATE KEY-----` | Block |
| `pgp_private_key` | PGP Private Key | `-----BEGIN PGP PRIVATE KEY BLOCK-----` | Block |
| `x509_certificate` | X.509 Certificate | `-----BEGIN CERTIFICATE-----` | Warn |

### Authentication Tokens

| Pattern | Description | Example | Action |
|---------|-------------|---------|--------|
| `jwt_token` | JSON Web Token | `eyJ...` (3 base64 parts) | Warn |
| `bearer_token` | Bearer tokens | `Bearer ...` | Warn |
| `oauth_token` | OAuth tokens | Various formats | Block |
| `session_token` | Session tokens | Various formats | Block |
| `slack_token` | Slack API Token | `xox[baprs]-...` | Block |

---

## Custom Patterns

### Creating Custom Rules

Add custom patterns via the API or configuration file:

**Via API:**
```bash
curl -X POST https://gateway:9090/api/v1/rules \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "employee_id",
    "type": "custom",
    "pattern": "EMP-\\d{6}",
    "action": "redact",
    "description": "Internal employee ID format",
    "enabled": true
  }'
```

**Via Configuration:**
```yaml
detection:
  custom_patterns:
    - name: employee_id
      regex: 'EMP-\d{6}'
      action: redact
      
    - name: internal_project_code
      regex: 'PROJ-[A-Z]{3}-\d{4}'
      action: warn
      
    - name: customer_account
      regex: 'CUST-\d{8}'
      action: redact
```

### Pattern Syntax

Patterns use standard regex syntax with these features:

| Feature | Syntax | Example |
|---------|--------|---------|
| Literal match | `abc` | Matches "abc" |
| Character class | `[a-z]` | Matches any lowercase letter |
| Digit | `\d` | Matches any digit |
| Word character | `\w` | Matches `[a-zA-Z0-9_]` |
| Whitespace | `\s` | Matches space, tab, newline |
| Quantifiers | `{n}`, `{n,m}`, `*`, `+`, `?` | Repetition |
| Groups | `(abc)` | Grouping |
| Alternation | `a\|b` | Match a or b |
| Anchors | `^`, `$` | Start/end of string |
| Boundaries | `\b` | Word boundary |

### Advanced Pattern Options

```yaml
custom_patterns:
  - name: complex_pattern
    regex: '(?i)confidential:\s*([^,]+)'  # Case insensitive
    action: block
    context_required: true  # Require surrounding context
    min_entropy: 3.5        # Minimum entropy score
    max_length: 100         # Maximum match length
```

---

## Actions

Each detection can trigger one of these actions:

| Action | Description | HTTP Response |
|--------|-------------|---------------|
| `allow` | Let request through with logging | 200 OK |
| `warn` | Let through with warning logged | 200 OK |
| `redact` | Replace detected data with placeholder | 200 OK |
| `block` | Reject the request entirely | 403 Forbidden |

### Redaction Formats

Configure how redacted data appears:

```yaml
detection:
  redaction:
    format: "[REDACTED:{type}]"  # Default
    # Results in: [REDACTED:email], [REDACTED:ssn], etc.
```

Alternative formats:
- `"***"` - Simple asterisks
- `"[{type}]"` - Type only: `[email]`
- `"XXXX"` - X placeholders
- Custom format with `{type}`, `{length}` variables

---

## ML-Enhanced Detection

For ambiguous patterns, ZeroShare uses ML classification:

### Enabled By Default For:
- Names in context (e.g., "Contact John Smith at...")
- Addresses without clear format
- Medical terminology
- Code containing potential secrets

### Confidence Thresholds

```yaml
detection:
  ml:
    enabled: true
    confidence_threshold: 0.85  # Minimum confidence (0-1)
    models:
      - pii_classifier
      - code_scanner
```

---

## Testing Patterns

### Test Endpoint

```bash
curl -X POST https://gateway:9090/api/v1/detection/test \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Contact me at john@example.com or 555-123-4567",
    "patterns": ["email", "phone_us"]
  }'
```

**Response:**
```json
{
  "findings": [
    {
      "type": "email",
      "value": "john@example.com",
      "position": [14, 30],
      "confidence": 1.0,
      "action": "redact"
    },
    {
      "type": "phone_us",
      "value": "555-123-4567",
      "position": [34, 46],
      "confidence": 1.0,
      "action": "redact"
    }
  ],
  "redacted_content": "Contact me at [REDACTED:email] or [REDACTED:phone]"
}
```

---

## Best Practices

### 1. Start with Warn Mode
For new patterns, start with `warn` action to evaluate false positive rates before escalating to `block`.

### 2. Use Specific Patterns
Prefer specific patterns over broad ones:
```yaml
# Good - specific
- name: aws_access_key
  regex: 'AKIA[0-9A-Z]{16}'

# Bad - too broad
- name: generic_key
  regex: '[A-Z0-9]{20}'
```

### 3. Add Context Requirements
For patterns that might match innocently:
```yaml
- name: ssn_with_context
  regex: '\d{3}-\d{2}-\d{4}'
  context_required: true
  context_patterns:
    - 'ssn'
    - 'social security'
    - 'tax id'
```

### 4. Regular Review
Periodically review:
- False positive logs
- Blocked request reasons
- New pattern requirements

---

## Compliance Mapping

| Regulation | Required Patterns |
|------------|-------------------|
| **GDPR** | email, phone, address, name, date_of_birth |
| **HIPAA** | All PHI patterns, medical_record, health_insurance_id |
| **PCI-DSS** | credit_card, bank_account, cvv |
| **SOC 2** | All secrets patterns, audit logging enabled |
| **CCPA** | email, phone, address, ip_address |
