# Testing Guide for DeployZeroShare.com

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Test Structure

- **`tests/smoke.spec.ts`** - Critical functionality tests (homepage, navigation, buttons, legal pages)
- **`tests/links.spec.ts`** - Link validation tests (internal/external links, navigation)
- **`tests/support-form.spec.ts`** - Support form functionality tests
- **`tests/deployment.spec.ts`** - Post-deployment verification tests

## Running Tests

### Local Development

```bash
# Install Playwright browsers (first time only)
npm run test:install

# Run all tests (requires local server)
npm run test

# Run specific test suites
npm run test:smoke      # Smoke tests only
npm run test:links     # Link validation only
npm run test:form      # Support form tests only

# Run tests with UI
npm run test:ui
```

### Testing Against Deployed Site

```bash
# Test the deployed site
BASE_URL=https://deployzeroshare.com npm run test:deployed

# Or use the script
./scripts/verify-deployment.sh
```

## Test Scripts

- `npm run test` - Run all tests locally
- `npm run test:smoke` - Run smoke tests only
- `npm run test:links` - Run link validation tests
- `npm run test:form` - Run support form tests
- `npm run test:deployed` - Run deployment verification tests
- `npm run test:ui` - Run tests with Playwright UI
- `npm run test:install` - Install Playwright browsers

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

### Support Form
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
