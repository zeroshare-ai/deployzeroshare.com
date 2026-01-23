# Incident Response Plan Template

**Company Name:** [COMPANY NAME]  
**Document Version:** 1.0  
**Effective Date:** [DATE]  
**Last Reviewed:** [DATE]  
**Document Owner:** [NAME/TITLE]

---

## 1. Purpose

This Incident Response Plan establishes procedures for detecting, responding to, and recovering from security incidents to minimize impact and ensure proper handling of events that could compromise [COMPANY NAME]'s information assets.

## 2. Scope

This plan covers:
- Security incidents affecting company systems, data, or operations
- Data breaches involving customer, employee, or company data
- Malware infections and cyber attacks
- Unauthorized access attempts
- Physical security incidents affecting IT assets
- Third-party security incidents affecting company data

## 3. Incident Response Team

### 3.1 Team Composition

| Role | Primary | Backup | Contact |
|------|---------|--------|---------|
| Incident Commander | [NAME] | [NAME] | [PHONE/EMAIL] |
| Security Lead | [NAME] | [NAME] | [PHONE/EMAIL] |
| IT/Engineering Lead | [NAME] | [NAME] | [PHONE/EMAIL] |
| Communications Lead | [NAME] | [NAME] | [PHONE/EMAIL] |
| Legal Counsel | [NAME] | [NAME] | [PHONE/EMAIL] |
| Executive Sponsor | [NAME] | [NAME] | [PHONE/EMAIL] |

### 3.2 Role Responsibilities

**Incident Commander**
- Overall incident coordination
- Resource allocation decisions
- Status reporting to executives
- Final decisions on response actions

**Security Lead**
- Technical investigation
- Evidence preservation
- Threat analysis
- Remediation guidance

**IT/Engineering Lead**
- System containment
- Technical remediation
- Recovery operations
- Infrastructure support

**Communications Lead**
- Internal communications
- External communications (customers, media)
- Notification coordination
- Documentation support

**Legal Counsel**
- Legal obligation assessment
- Regulatory notification guidance
- Law enforcement coordination
- Liability assessment

## 4. Incident Classification

### 4.1 Severity Levels

| Level | Name | Description | Response Time | Examples |
|-------|------|-------------|---------------|----------|
| 1 | Critical | Immediate threat to operations or data | Immediate | Active breach, ransomware, data exfiltration |
| 2 | High | Significant impact, contained threat | < 4 hours | Malware detected, unauthorized access |
| 3 | Medium | Limited impact, potential escalation | < 24 hours | Suspicious activity, phishing attempt |
| 4 | Low | Minimal impact, monitoring required | < 72 hours | Policy violation, failed attack |

### 4.2 Incident Categories

- **Malware**: Virus, ransomware, trojan, etc.
- **Unauthorized Access**: Compromised credentials, privilege escalation
- **Data Breach**: Unauthorized data access or exfiltration
- **Denial of Service**: System availability impact
- **Insider Threat**: Malicious or negligent insider activity
- **Physical**: Theft, unauthorized physical access
- **Third-Party**: Vendor or partner security incident

## 5. Incident Response Phases

### Phase 1: Preparation (Ongoing)

**Objectives:**
- Maintain incident response capability
- Ensure team readiness

**Activities:**
- [ ] Maintain updated contact lists
- [ ] Conduct regular training and exercises
- [ ] Review and update this plan annually
- [ ] Maintain incident response tools
- [ ] Ensure logging and monitoring is operational
- [ ] Review threat intelligence

### Phase 2: Detection & Analysis

**Objectives:**
- Identify potential incidents
- Determine scope and severity

**Activities:**
- [ ] Monitor security alerts and logs
- [ ] Receive and triage reports
- [ ] Verify incident occurrence
- [ ] Classify severity level
- [ ] Document initial findings
- [ ] Notify incident response team

**Detection Sources:**
- Security monitoring tools (SIEM, IDS/IPS)
- User reports
- Automated alerts
- Third-party notifications
- Threat intelligence

**Initial Assessment Questions:**
1. What systems/data are affected?
2. What is the nature of the incident?
3. When did it occur / is it ongoing?
4. What is the potential impact?
5. Who needs to be notified?

### Phase 3: Containment

**Objectives:**
- Limit damage and prevent spread
- Preserve evidence

**Short-Term Containment (Immediate):**
- [ ] Isolate affected systems
- [ ] Block malicious IPs/domains
- [ ] Disable compromised accounts
- [ ] Implement emergency firewall rules
- [ ] Preserve system state for forensics

**Long-Term Containment:**
- [ ] Apply temporary fixes
- [ ] Enhance monitoring
- [ ] Implement additional controls
- [ ] Plan for remediation

**Evidence Preservation:**
- [ ] Create forensic images
- [ ] Preserve logs
- [ ] Document chain of custody
- [ ] Secure physical evidence

### Phase 4: Eradication

**Objectives:**
- Remove threat from environment
- Identify root cause

**Activities:**
- [ ] Remove malware/malicious code
- [ ] Close vulnerability exploited
- [ ] Reset compromised credentials
- [ ] Patch affected systems
- [ ] Verify removal complete
- [ ] Document root cause

### Phase 5: Recovery

**Objectives:**
- Restore systems to normal operation
- Verify security

**Activities:**
- [ ] Restore from clean backups
- [ ] Rebuild systems if needed
- [ ] Validate system integrity
- [ ] Implement enhanced monitoring
- [ ] Gradual return to production
- [ ] Verify business operations

**Recovery Validation:**
- [ ] Security scans clean
- [ ] System functionality verified
- [ ] Monitoring operational
- [ ] User access restored appropriately

### Phase 6: Post-Incident

**Objectives:**
- Learn from incident
- Improve defenses

**Activities:**
- [ ] Conduct post-incident review (within 2 weeks)
- [ ] Document lessons learned
- [ ] Update procedures as needed
- [ ] Implement improvements
- [ ] Complete final documentation
- [ ] Close incident

**Post-Incident Review Questions:**
1. What happened and when?
2. How was it detected?
3. How effective was the response?
4. What could be improved?
5. What controls should be added?

## 6. Communication

### 6.1 Internal Communication

| Audience | Timing | Method | Content |
|----------|--------|--------|---------|
| IRT | Immediate | Phone/Slack | Activation, status |
| Executive | Within 1 hour | Phone/Email | Summary, impact |
| IT Staff | As needed | Email/Slack | Technical guidance |
| All Staff | After containment | Email | Awareness, instructions |

### 6.2 External Communication

| Audience | Timing | Trigger | Owner |
|----------|--------|---------|-------|
| Customers | Per legal/contract | Data breach | Communications + Legal |
| Regulators | Per regulation | Reportable breach | Legal |
| Law Enforcement | As needed | Criminal activity | Legal |
| Media | If needed | Public incident | Communications + Legal |

### 6.3 Notification Templates

**Customer Notification (Data Breach):**
```
Subject: Important Security Notice from [COMPANY NAME]

Dear [Customer Name],

We are writing to inform you of a security incident that may have affected 
your personal information.

What Happened: [Brief description]

What Information Was Involved: [Types of data]

What We Are Doing: [Actions taken]

What You Can Do: [Recommended steps]

For More Information: [Contact details]

We sincerely apologize for any concern this may cause.

[Signature]
```

## 7. Legal and Regulatory

### 7.1 Notification Requirements

| Regulation | Requirement | Timeline |
|------------|-------------|----------|
| GDPR | Supervisory authority + individuals | 72 hours |
| HIPAA | HHS + individuals + media (if >500) | 60 days |
| PCI DSS | Card brands + acquiring bank | Immediately |
| CCPA | California AG + individuals | Expeditiously |
| State Breach Laws | Varies by state | Varies |

### 7.2 Documentation Requirements

Maintain records of:
- Incident timeline
- Actions taken
- Decisions made
- Notifications sent
- Evidence collected

Retain documentation for minimum 6 years.

## 8. Tools and Resources

### 8.1 Incident Response Tools

| Tool | Purpose | Location/Access |
|------|---------|-----------------|
| SIEM | Log analysis | [LINK] |
| EDR | Endpoint investigation | [LINK] |
| Forensic Tools | Evidence collection | [LINK] |
| Communication | Team coordination | [SLACK/TEAMS] |
| Documentation | Incident tracking | [LINK] |

### 8.2 External Resources

| Resource | Contact | When to Engage |
|----------|---------|----------------|
| Forensic Firm | [CONTACT] | Major breaches |
| Legal Counsel | [CONTACT] | All breaches |
| Cyber Insurance | [CONTACT] | Covered incidents |
| Law Enforcement | FBI/Local | Criminal activity |

## 9. Training and Testing

### 9.1 Training Requirements

- All IRT members: Annual incident response training
- All employees: Security awareness (incident reporting)
- New IRT members: Onboarding within 30 days

### 9.2 Testing Schedule

| Exercise Type | Frequency | Participants |
|---------------|-----------|--------------|
| Tabletop | Quarterly | IRT |
| Simulation | Annually | IRT + IT |
| Full Exercise | Annually | Organization-wide |

## 10. Plan Maintenance

- Review and update annually
- Update after significant incidents
- Update when team changes
- Test and validate regularly

## Appendices

### A. Incident Report Form

```
INCIDENT REPORT

Date/Time Reported: ________________
Reported By: ______________________
Contact: __________________________

INCIDENT DETAILS
Date/Time Discovered: ______________
Affected Systems: _________________
Description: ______________________
________________________________
________________________________

CLASSIFICATION
Severity: [ ] Critical  [ ] High  [ ] Medium  [ ] Low
Category: [ ] Malware  [ ] Unauthorized Access  [ ] Data Breach
          [ ] DoS  [ ] Insider  [ ] Physical  [ ] Other

INITIAL ACTIONS TAKEN
________________________________
________________________________

ASSIGNED TO: _____________________
```

### B. Contact List

[INSERT EMERGENCY CONTACT LIST]

### C. Escalation Matrix

| Condition | Escalate To | Timeline |
|-----------|-------------|----------|
| Severity 1 | Executive + Legal | Immediate |
| Data Breach Confirmed | Legal | Immediate |
| Customer Data | Communications | Within 4 hours |
| Media Inquiry | Communications + Legal | Immediate |
| Regulatory | Legal + Executive | Immediate |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [NAME] | Initial release |
