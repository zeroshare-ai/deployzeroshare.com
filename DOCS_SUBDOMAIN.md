# Docs Subdomain Configuration

## ✅ Completed

1. **Added docs subdomain to Amplify:**
   - `docs.deployzeroshare.com` added to domain association
   - Points to same CloudFront distribution as main site

2. **Added DNS CNAME record:**
   - `docs.deployzeroshare.com` → `d3ou18wir7m8py.cloudfront.net`
   - DNS record created in Route53

3. **Configured Amplify rewrites:**
   - `/docs<*>` routes to `/docs/index.html`
   - `/*` routes to `/index.html` (catch-all)

## 📋 How It Works

Since `docs.deployzeroshare.com` is a subdomain pointing to the same static site:

- **docs.deployzeroshare.com** → Shows homepage (same as deployzeroshare.com)
- **docs.deployzeroshare.com/docs** → Shows documentation page
- **deployzeroshare.com/docs** → Shows documentation page

## 🔧 Options for docs.deployzeroshare.com Root

Currently, visiting `docs.deployzeroshare.com` shows the homepage. To make it show docs directly:

### Option 1: Use /docs path (Current)
- Users visit: `docs.deployzeroshare.com/docs`
- Simple and works immediately

### Option 2: Add CloudFront Function (Advanced)
- Create a CloudFront function to redirect `docs.deployzeroshare.com` → `/docs`
- Requires CloudFront configuration

### Option 3: Separate Amplify App (Most Flexible)
- Create a separate Amplify app just for docs
- Full control over routing
- More complex setup

## 📝 Current Status

- ✅ DNS configured
- ✅ Subdomain added to Amplify
- ✅ Documentation page accessible at `/docs`
- ⏳ SSL certificate provisioning (automatic, ~5-15 minutes)

## 🔍 Verify

Once DNS propagates and SSL is provisioned:
- `https://docs.deployzeroshare.com/docs` should work
- `https://deployzeroshare.com/docs` should work

The documentation is part of this application and reads markdown files from `public/docs/`.
