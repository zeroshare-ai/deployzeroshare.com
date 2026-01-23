# Testing Guide for DeployZeroShare.com

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Test Structure

| File | Purpose | Tests |
|------|---------|-------|
| `smoke.spec.ts` | Critical functionality | 5 tests |
| `links.spec.ts` | Link validation | 6 tests |
| `forms.spec.ts` | All form functionality | 25 tests |
| `support-form.spec.ts` | Support form (legacy) | 7 tests |
| `api-health.spec.ts` | API endpoint checks | 10 tests |
| `pre-deployment.spec.ts` | Pre-deploy QA | 20 tests |
| `deployment.spec.ts` | Post-deploy verification | 8 tests |
| `chatbot.spec.ts` | Chatbot functionality | 5 tests |
| `screenshots.spec.ts` | Visual regression | 3 tests |

## Running Tests

### Local Development

```bash
# Install Playwright browsers (first time only)
npm run test:install

# Run all tests
npm run test

# Run specific test suites
npm run test:smoke      # Smoke tests only
npm run test:links      # Link validation only
npm run test:forms      # Form UI tests (submissions skipped)
npm run test:form       # Support form tests only
npm run test:api        # API health checks

# Run tests with UI
npm run test:ui
```

### Running Form Submission Tests (sends real emails)

Form submission tests are **SKIPPED by default** to avoid email spam.
To run them manually when needed:

```bash
# Run form tests including actual submissions
RUN_EMAIL_TESTS=true npm run test:forms

# Run API tests including real submissions
RUN_EMAIL_TESTS=true npm run test:api
```

### Testing Against Deployed Site

```bash
# Test the deployed site
BASE_URL=https://deployzeroshare.com npm run test:deployed

# Or use the script
./scripts/verify-deployment.sh
```

## Test Scripts

| Script | Description |
|--------|-------------|
| `npm run test` | Run all tests locally |
| `npm run test:smoke` | Smoke tests only |
| `npm run test:links` | Link validation tests |
| `npm run test:forms` | All form tests (NEW) |
| `npm run test:form` | Support form tests only |
| `npm run test:api` | API health checks |
| `npm run test:pre-deploy` | Pre-deployment QA |
| `npm run test:deployed` | Post-deployment verification |
| `npm run test:screenshots` | Visual regression tests |
| `npm run test:ui` | Tests with Playwright UI |
| `npm run test:install` | Install Playwright browsers |
| `npm run test:qa` | Full QA suite (pre-deploy + api + forms + smoke) |
| `npm run qa` | Build + full QA suite |

## CI/CD Integration

### GitHub Actions

Tests run automatically:
- On push to `main` branch
- Daily at 2 AM UTC (scheduled)
- Manually via workflow_dispatch

See `.github/workflows/verify-deployment.yml`

### AWS Amplify

Smoke tests run during build (if Playwright is available):
- Tests run in `postBuild` phase
- Failures don't block deployment (tests run post-deployment via GitHub Actions)

## What Gets Tested

### Smoke Tests
- ✅ Homepage loads correctly
- ✅ Navigation header button works
- ✅ Hero section marketplace button works
- ✅ Support form page loads
- ✅ Legal pages are accessible

### Link Validation
- ✅ Footer links work (Privacy, Terms, Compliance)
- ✅ Navigation links work (Features, Docs, Support)
- ✅ Support section links work
- ✅ External links have correct attributes (target="_blank", rel="noopener")
- ✅ No broken internal links

### Forms Tests (NEW - `forms.spec.ts`)

**Newsletter Subscription:**
- ✅ API endpoint is reachable
- ✅ API accepts valid subscription
- ✅ API rejects invalid email
- ✅ API rejects missing email
- ✅ Form is visible on blog page
- ✅ Form validates email format
- ✅ Form shows loading state
- ✅ Form submits without network errors
- ✅ Form shows feedback after submission
- ✅ Form handles duplicate subscription

**Support Case Form:**
- ✅ Page loads correctly
- ✅ Has all required fields
- ✅ Priority selector works
- ✅ Can be filled and submitted
- ✅ No network errors
- ✅ Shows feedback after submission

**Contact Sales Form:**
- ✅ Page loads correctly
- ✅ Has all required fields
- ✅ Team size selector works
- ✅ Can be filled and submitted
- ✅ No network errors
- ✅ Shows feedback after submission
- ✅ Captures UTM parameters

**Cross-Form Integration:**
- ✅ All forms use correct API endpoints
- ✅ No hardcoded wrong URLs

### Support Form (Legacy - `support-form.spec.ts`)
- ✅ Form displays correctly
- ✅ Form validation works
- ✅ Form can be filled out
- ✅ Form submission attempts API call
- ✅ Success/error messages display correctly

### Deployment Verification
- ✅ All critical pages return 200
- ✅ No console errors
- ✅ Images load correctly
- ✅ Navigation is functional
- ✅ Support form API endpoint is configured
- ✅ Legal pages are complete

## Troubleshooting

### Tests fail locally

1. Make sure the site is running: `npm run start`
2. Install browsers: `npm run test:install`
3. Check Playwright version: `npx playwright --version`

### Tests fail in CI

1. Check GitHub Actions logs
2. Verify BASE_URL is set correctly
3. Check if site is deployed and accessible

### Support form tests fail

The support form tests may fail if:
- API endpoint is not configured
- API is not accessible
- SES is in sandbox mode

This is expected and tests will continue-on-error in CI.

## Adding New Tests

1. Create a new test file in `tests/`
2. Follow existing test patterns
3. Add test script to `package.json` if needed
4. Update this README

## Best Practices

- Tests should be independent and idempotent
- Use descriptive test names
- Group related tests in `test.describe()` blocks
- Use `test.beforeEach()` for common setup
- Mock external APIs when possible
- Use `page.waitForLoadState()` for dynamic content
