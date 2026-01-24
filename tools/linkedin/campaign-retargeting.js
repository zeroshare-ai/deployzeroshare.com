#!/usr/bin/env node
/**
 * LinkedIn Retargeting Campaign Setup
 * 
 * $1/day retargeting campaign that shows ads to people who:
 * - Visited deployzeroshare.com
 * - Engaged with LinkedIn posts
 * - Are warm leads ready to convert
 * 
 * This is the highest-ROI ad spend because you're targeting
 * people who already know about you.
 * 
 * Usage: node campaign-retargeting.js
 */

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║          LINKEDIN RETARGETING CAMPAIGN - $1/DAY                  ║
║                  Highest ROI Ad Spend                            ║
╚══════════════════════════════════════════════════════════════════╝

This campaign targets people who have ALREADY shown interest:
• Visited your website
• Engaged with your posts
• Viewed your company page

Cost: $1/day = $30/month
Expected: 500-2000 impressions/day to warm leads
ROI: Typically 5-10x better than cold targeting

══════════════════════════════════════════════════════════════════

SETUP INSTRUCTIONS
══════════════════

Step 1: Create Matched Audiences (One-time setup)
─────────────────────────────────────────────────

Go to: https://www.linkedin.com/campaignmanager/accounts

Navigate: Plan → Audiences → Create audience

Create these 3 audiences:

┌─────────────────────────────────────────────────────────────────┐
│ AUDIENCE 1: Website Visitors                                    │
├─────────────────────────────────────────────────────────────────┤
│ Type: Website Retargeting                                       │
│ Name: "ZeroShare - All Website Visitors"                        │
│ Match: People who visited any page                              │
│ URL: deployzeroshare.com/*                                      │
│ Lookback: 90 days                                               │
│                                                                 │
│ Note: LinkedIn Insight Tag must be installed (you have it)      │
│ Partner ID: 519048716                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ AUDIENCE 2: High-Intent Pages                                   │
├─────────────────────────────────────────────────────────────────┤
│ Type: Website Retargeting                                       │
│ Name: "ZeroShare - Pricing/Docs Visitors (Hot)"                │
│ Match: People who visited specific pages                        │
│ URLs:                                                           │
│   - deployzeroshare.com/pricing*                                │
│   - deployzeroshare.com/docs*                                   │
│   - deployzeroshare.com/contact*                                │
│ Lookback: 30 days                                               │
│                                                                 │
│ These are your HOTTEST leads - they looked at pricing!          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ AUDIENCE 3: Post Engagers                                       │
├─────────────────────────────────────────────────────────────────┤
│ Type: Company Page Engagement                                   │
│ Name: "ZeroShare - Post Engagers"                               │
│ Match: People who engaged with your posts                       │
│ Engagement: Likes, comments, shares, clicks                     │
│ Lookback: 90 days                                               │
└─────────────────────────────────────────────────────────────────┘


Step 2: Create Retargeting Campaign
───────────────────────────────────

Go to: Campaign Manager → Create Campaign

Campaign Settings:
┌─────────────────────────────────────────────────────────────────┐
│ CAMPAIGN CONFIGURATION                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Campaign Group: ZeroShare Retargeting                           │
│ Campaign Name: "$1/Day - Website Retargeting"                   │
│                                                                 │
│ Objective: Brand Awareness (cheapest for retargeting)           │
│   OR: Website Visits (if you want clicks)                       │
│                                                                 │
│ Audience:                                                       │
│   ✓ Include: "ZeroShare - All Website Visitors"                 │
│   ✓ Include: "ZeroShare - Post Engagers"                        │
│   ✗ Exclude: (none - we want all warm leads)                    │
│                                                                 │
│ Locations: United States (or your target markets)               │
│                                                                 │
│ Budget:                                                         │
│   Daily budget: $1.00                                           │
│   Schedule: Run continuously                                    │
│   Bid: Automated (let LinkedIn optimize)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


Step 3: Create Ad Creative
──────────────────────────

Ad Format: Single Image Ad (simplest, most effective)

┌─────────────────────────────────────────────────────────────────┐
│ AD CREATIVE 1: Awareness Reminder                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Headline (70 chars):                                            │
│   "Still thinking about AI security?"                           │
│                                                                 │
│ Description (200 chars):                                        │
│   "ZeroShare Gateway blocks sensitive data before it reaches    │
│    ChatGPT, Copilot, and other AI tools. Free tier available." │
│                                                                 │
│ Image: Use /public/og-image.png (1200x627)                      │
│                                                                 │
│ CTA Button: "Learn More"                                        │
│ Destination: https://deployzeroshare.com?utm_source=linkedin    │
│              &utm_medium=retargeting&utm_campaign=awareness     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ AD CREATIVE 2: Free Trial Push                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Headline (70 chars):                                            │
│   "Try ZeroShare Free - No Credit Card Required"                │
│                                                                 │
│ Description (200 chars):                                        │
│   "Block PII and secrets from reaching AI tools. Deploy in     │
│    minutes. Free tier for small teams."                         │
│                                                                 │
│ Image: Use /public/og-image.png                                 │
│                                                                 │
│ CTA Button: "Sign Up"                                           │
│ Destination: https://deployzeroshare.com/pricing?utm_source=    │
│              linkedin&utm_medium=retargeting&utm_campaign=trial │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


Step 4: Create Hot Lead Campaign (Optional - $0.50/day extra)
─────────────────────────────────────────────────────────────

For people who viewed pricing (hottest leads):

Campaign Name: "Hot Leads - Pricing Page Visitors"

Audience: "ZeroShare - Pricing/Docs Visitors (Hot)"

Ad Creative:
┌─────────────────────────────────────────────────────────────────┐
│ Headline: "Ready to secure your AI usage?"                      │
│ Description: "You looked at our pricing. Start your free trial │
│              today - deploys in 10 minutes on AWS."             │
│ CTA: "Start Free Trial"                                         │
│ URL: https://deployzeroshare.com/pricing?utm_campaign=hot_lead  │
└─────────────────────────────────────────────────────────────────┘

══════════════════════════════════════════════════════════════════

EXPECTED RESULTS ($30/month spend)
══════════════════════════════════

Retargeting typically performs 5-10x better than cold ads:

• Impressions: 15,000-60,000/month
• Clicks: 150-600/month  
• CTR: 1-2% (vs 0.3% for cold)
• Cost per click: $0.05-0.20 (vs $2-5 for cold)

The goal isn't immediate conversion.

It's staying top-of-mind so when they're ready to buy,
they think of ZeroShare first.

══════════════════════════════════════════════════════════════════

TRACKING SETUP (Already Done)
═════════════════════════════

Your LinkedIn Insight Tag is already installed:
• Partner ID: 519048716
• Tracking: Page views, form submissions, CTA clicks

Conversion events configured in Analytics.tsx:
• aws_marketplace_click
• contact_form_submit  
• demo_request
• pricing_view

These will show in Campaign Manager under Conversions.

══════════════════════════════════════════════════════════════════

AUTOMATION
══════════

Once set up, this runs forever on autopilot:

• LinkedIn serves ads to warm leads
• Spend is capped at $1/day
• No management needed
• Check results monthly in Campaign Manager

══════════════════════════════════════════════════════════════════

LAUNCH CHECKLIST
════════════════

□ Create "All Website Visitors" audience
□ Create "Pricing/Docs Visitors" audience  
□ Create "Post Engagers" audience
□ Wait 24-48 hours for audiences to populate
□ Create retargeting campaign ($1/day)
□ Create 2 ad creatives
□ Launch campaign
□ Check results after 7 days

══════════════════════════════════════════════════════════════════

Ready to set up? Go to:
https://www.linkedin.com/campaignmanager/accounts

`);
