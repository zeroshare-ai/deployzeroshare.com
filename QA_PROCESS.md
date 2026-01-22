# QA Process & Testing Guidelines

## Overview

This document outlines the QA process for DeployZeroShare.com. Every change MUST pass QA checks before deployment to production.

## The Incident That Created This Process

On January 22, 2026, a support form was deployed with an incorrect API URL, causing all form submissions to fail with "Failed to fetch" errors. This was caught by users, not by automated tests.

**Root Cause:** Hardcoded API URL was wrong, and existing tests didn't verify API endpoint reachability.

**Solution:** Comprehensive QA process with multiple layers of testing.

---

## Test Layers

### Layer 1: Static Analysis (Pre-Build)
- TypeScript type checking
- ESLint rules
- Pattern scanning for known bad URLs

### Layer 2: API Health Checks
- Verify all API endpoints are reachable
- Test CORS configuration
- Validate response formats

### Layer 3: E2E Tests
- Critical user journeys
- Form submissions
- Navigation flows
- Error handling

### Layer 4: Visual Verification
- Screenshots of key pages
- Mobile responsiveness
- Interactive states

---

## Running Tests

### Quick QA Check (Before Any Push)
```bash
npm run qa
```
This runs build + all QA tests.

### Individual Test Suites

```bash
# All tests
npm run test:all

# Pre-deployment critical tests
npm run test:pre-deploy

# API health checks
npm run test:api

# Smoke tests
npm run test:smoke

# Form submission tests
npm run test:form

# Screenshot capture
npm run test:screenshots

# Against production
npm run test:deployed
```

### Interactive Test Development
```bash
npm run test:ui
```

---

## Test Files

| File | Purpose | Critical |
|------|---------|----------|
| `pre-deployment.spec.ts` | Critical path validation | ✅ MUST PASS |
| `api-health.spec.ts` | API endpoint health | ✅ MUST PASS |
| `smoke.spec.ts` | Basic functionality | ✅ MUST PASS |
| `support-form.spec.ts` | Form functionality | ✅ MUST PASS |
| `links.spec.ts` | Link validation | ⚠️ Should pass |
| `screenshots.spec.ts` | Visual capture | For review |

---

## CI/CD Pipeline

### GitHub Actions Workflow

Every push to `main` triggers:

1. **Build Check**
   - Type checking
   - Lint
   - Build
   - Bad URL pattern scanning

2. **API Health Check**
   - Support API reachability
   - CORS validation
   - Response format check

3. **E2E Tests**
   - Pre-deployment tests
   - API health tests
   - Smoke tests

4. **Visual Check**
   - Screenshot capture
   - Uploaded as artifacts

### Deployment Gate

❌ **DO NOT DEPLOY** if any of the following fail:
- Build
- API health checks
- Pre-deployment tests
- Smoke tests

---

## QA Checklist (Manual)

Before any release, verify:

### Forms
- [ ] Support form loads
- [ ] Support form submits (no network errors)
- [ ] Contact form loads
- [ ] Contact form submits (no network errors)

### Navigation
- [ ] All nav links work
- [ ] Footer links work
- [ ] CTA buttons work

### Pages
- [ ] Homepage loads
- [ ] Pricing page loads
- [ ] Blog page loads
- [ ] Blog posts load
- [ ] Docs page loads
- [ ] Privacy page loads
- [ ] Terms page loads

### Mobile
- [ ] Responsive on mobile
- [ ] Forms usable on mobile
- [ ] Navigation works on mobile

### Console
- [ ] No critical console errors
- [ ] No failed network requests

---

## Adding New Tests

When adding new functionality:

1. **Write tests FIRST** (TDD when possible)
2. Tests MUST cover:
   - Happy path
   - Error states
   - Edge cases
3. Form tests MUST verify:
   - Form renders
   - Form accepts input
   - Form submits without network errors
   - Error states display correctly

### Test Template

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://deployzeroshare.com';

test.describe('Feature Name', () => {
  test('happy path', async ({ page }) => {
    // Test implementation
  });

  test('error handling', async ({ page }) => {
    // Test error states
  });

  test('edge cases', async ({ page }) => {
    // Test edge cases
  });
});
```

---

## Exploratory Testing

Before major releases, perform exploratory testing:

### Session 1: New User Journey
1. Land on homepage
2. Explore features section
3. Navigate to pricing
4. Go to contact sales
5. Submit demo request

### Session 2: Support Flow
1. Navigate to support
2. Fill out support form
3. Submit form
4. Verify success message

### Session 3: Content Verification
1. Check all blog posts load
2. Check docs are readable
3. Verify legal pages are complete

### Session 4: Mobile Testing
1. Test all above on mobile device/emulator
2. Check touch interactions
3. Verify responsive design

---

## Reporting Issues

When you find a bug:

1. **Document it immediately**
   - Screenshot/recording
   - Steps to reproduce
   - Browser/device info

2. **Create a test case**
   - Add failing test that catches the bug
   - This prevents regression

3. **Fix the bug**

4. **Verify the test passes**

---

## Known Patterns to Check

### Bad URL Patterns
The following patterns should NEVER appear in production code:

```
❌ deployzeroshare-support-api.execute-api
❌ placeholder-api
❌ localhost:3000 (in production builds)
❌ example.com (in API calls)
```

### Good URL Patterns
```
✅ obkptu26ug.execute-api.us-east-1.amazonaws.com
✅ deployzeroshare.com
✅ Environment variable references (process.env.*)
```

---

## Monitoring in Production

Even with tests, monitor production:

### Health Checks
- API endpoint availability
- Page load times
- Error rates

### Alerts
- Set up alerts for:
  - API failures
  - High error rates
  - Form submission failures

### User Feedback
- Monitor support inbox
- Check for form submission complaints

---

## Continuous Improvement

After each incident:

1. Write tests that would have caught it
2. Update this document
3. Add to CI/CD pipeline
4. Review with team

---

## Contact

QA Issues: Open a GitHub issue with label `qa`
Urgent: Contact via support form (if it works 😅)
