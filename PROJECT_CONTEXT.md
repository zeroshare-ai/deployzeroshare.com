# Project Context: DeployZeroShare.com

## Strategic Vision
We are pivoting from a generic open-source tool landing page to a dedicated sales page for the **AWS Marketplace**.

**The Mandate:**
> "I want to run 1 offer to solve 1 problem set to 1 target audience for 1 year."

## The Offer
**ZeroShare Gateway:** A middleware that sits between your code/employees and public AI APIs (like OpenAI).

## The Problem
Companies are afraid to use public AI because:
1.  **PII Leaks:** Employees accidentally pasting customer emails/SSNs into ChatGPT.
2.  **Secret Leaks:** Developers pasting code with API keys or DB credentials into Copilot/Cursor.

## The Solution
- **PII Redaction:** Automatically detects and masks sensitive data before it leaves the premise.
- **Secrets Blocking:** Hard blocks requests containing known secret patterns.

## Target Audience
- CTOs/CISOs who blocked ChatGPT but want to enable it safely.
- Engineering Managers worried about IP leakage.

## Implementation Details
- **Current State:** Single page app (`app/page.tsx`).
- **Deployment:** AWS Amplify.
- **Critical CTA:** All buttons must link to the AWS Marketplace listing (currently a placeholder).
- **Design:** Clean, "Stripe-like" aesthetic using the 'Inter' font.
