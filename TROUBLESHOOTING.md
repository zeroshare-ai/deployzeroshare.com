# Troubleshooting: Why deployzeroshare.com is Down

## 🔍 Root Cause

**The site is showing 404 because AWS Amplify is NOT running build commands with manual ZIP deployments.**

When you deploy via manual ZIP upload, Amplify doesn't reliably execute the build phases in `amplify.yml`. The deployment shows "SUCCEED" but no actual Next.js build happens, so there are no files to serve.

## ✅ Verified Status

- ✅ DNS Records: Correctly configured in Route53
  - Apex domain A record → CloudFront ✓
  - www CNAME → CloudFront ✓
  - Certificate verification CNAME ✓
- ✅ Domain Association: AVAILABLE in Amplify
- ✅ Deployment Jobs: All showing SUCCEED
- ❌ Domain Verification: Subdomains still not verified (0/2)
- ❌ Site Access: All URLs return 404 (even default Amplify domain)

## 🛠️ The Fix

**Connect the Amplify app to a GitHub repository.** This enables automatic builds on every deployment.

### Steps:

1. **Create GitHub Repository** (requires org admin):
   ```bash
   # Go to: https://github.com/organizations/zeroshare/repositories/new
   # Repository name: deployzeroshare.com
   # Make it Public
   ```

2. **Push Code**:
   ```bash
   cd /home/rick/checkout/deployzeroshare.com
   git remote add origin https://github.com/zeroshare/deployzeroshare.com.git
   git push -u origin main
   ```

3. **Connect Amplify to GitHub**:
   - Go to AWS Amplify Console
   - Select app `d27qp6qcouw49r`
   - App Settings → General → Edit Repository
   - Connect GitHub account
   - Select `zeroshare/deployzeroshare.com`
   - Select branch: `main`
   - Save

4. **Enable Auto-Build**:
   ```bash
   aws amplify update-branch \
     --app-id d27qp6qcouw49r \
     --branch-name main \
     --enable-auto-build
   ```

5. **Trigger First Build**:
   - After connecting to GitHub, Amplify will automatically trigger a build
   - OR push a commit to trigger auto-build

## 📋 Current Configuration

- **App ID**: `d27qp6qcouw49r`
- **Repository**: None (Manual Deploy)
- **Auto Build**: False
- **Build Config**: `amplify.yml` configured correctly
- **Next.js Config**: Static export configured

## ⚠️ Why Manual Deployments Don't Work

AWS Amplify's manual ZIP deployment feature is designed for pre-built static sites. When you upload source code, it may:
1. Not execute build commands reliably
2. Not install dependencies (`npm install`)
3. Not run the build script (`npm run build`)
4. Deploy the ZIP as-is without processing

**Git-based deployments trigger the full build pipeline automatically.**

## ✅ After GitHub Connection

Once connected to GitHub:
- ✅ Builds will run automatically on every push
- ✅ `npm install` and `npm run build` will execute
- ✅ Next.js static export will generate `out/` directory
- ✅ Files will be deployed correctly
- ✅ Site will be accessible
- ✅ Domain verification should complete automatically

## 🔍 Verification Commands

After connecting to GitHub and triggering a build:

```bash
# Check build status
aws amplify list-jobs --app-id d27qp6qcouw49r --branch-name main

# Check domain status
aws amplify get-domain-association --app-id d27qp6qcouw49r --domain-name deployzeroshare.com

# Test site
curl -I https://d27qp6qcouw49r.amplifyapp.com
curl -I https://deployzeroshare.com
```

## 📝 Summary

**Problem**: Manual ZIP deployments don't build Next.js apps  
**Solution**: Connect to GitHub repository for automatic builds  
**Status**: All DNS/Amplify config is correct - just needs GitHub connection

Last updated: $(date)
