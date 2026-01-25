#!/usr/bin/env node
/**
 * Generate All 34 "The Gateway" Comic Episodes
 * 
 * Creates complete episode data following the ONE APPROACH:
 * - Same format (3 panels: Problem → Solution → Outcome)
 * - Same CTA (from seriesInfo.ctaBlock)
 * - Same LinkedIn ending ("See how they fix it → [blog URL]")
 * - Same hashtags (#AISecurity #DataProtection #CISO)
 * 
 * Usage:
 *   node scripts/generate-all-comic-episodes.js
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, '../docs/COMIC_EPISODES_DATA.json');

// Episode themes (conversion-focused)
const EPISODE_THEMES = [
  // Episodes 1-5: Problem Awareness
  { number: 1, title: 'The SSN Leak', theme: 'PII Protection - Customer SSN', department: 'Sales', leak: 'SSN', tool: 'ChatGPT' },
  { number: 2, title: 'The API Key', theme: 'Secrets Blocking - AWS Credentials', department: 'Development', leak: 'AWS API key', tool: 'Copilot' },
  { number: 3, title: 'The Customer Email', theme: 'PII Redaction - Support Responses', department: 'Support', leak: 'customer email with PII', tool: 'AI assistant' },
  { number: 4, title: 'The Deal Terms', theme: 'Sensitive Data Blocking - Sales Information', department: 'Sales', leak: 'deal terms', tool: 'AI tool' },
  { number: 5, title: 'The Marketing Data', theme: 'Content Sanitization - Customer Data', department: 'Marketing', leak: 'customer data', tool: 'AI for campaigns' },
  
  // Episodes 6-10: Solution Education
  { number: 6, title: 'The Gateway', theme: 'Gateway Architecture', department: 'Engineering', leak: 'general', tool: 'all AI tools' },
  { number: 7, title: 'PII Patterns', theme: '50+ PII Patterns Detected', department: 'All', leak: 'multiple PII types', tool: 'ChatGPT' },
  { number: 8, title: 'Secret Patterns', theme: '200+ Secret Patterns Blocked', department: 'Development', leak: 'various secrets', tool: 'Copilot' },
  { number: 9, title: 'Zero Friction', theme: 'Works with Existing Tools', department: 'All', leak: 'general', tool: 'existing workflows' },
  { number: 10, title: 'The Dashboard', theme: 'Visibility - See All AI Usage', department: 'Security', leak: 'general', tool: 'all tools' },
  
  // Episodes 11-15: Urgency Building
  { number: 11, title: 'The Cost', theme: '$4.45M Average Breach Cost', department: 'Finance', leak: 'general', tool: 'all AI' },
  { number: 12, title: 'The ROI', theme: '$499/month vs $4.45M Breach', department: 'Finance', leak: 'general', tool: 'all AI' },
  { number: 13, title: 'Shadow AI', theme: '98% Have Unsanctioned AI', department: 'All', leak: 'general', tool: 'shadow tools' },
  { number: 14, title: 'Compliance Risk', theme: 'HIPAA/GDPR Violations = Fines', department: 'Compliance', leak: 'PII', tool: 'ChatGPT' },
  { number: 15, title: 'The Reveal', theme: 'AI Has Taken Over', department: 'All', leak: 'general', tool: 'all AI' },
  
  // Episodes 16-25: Trust Building
  { number: 16, title: 'Easy Setup', theme: 'Deploy in 10 Minutes', department: 'Engineering', leak: 'general', tool: 'all AI' },
  { number: 17, title: 'Free Trial', theme: '14 Days Free, All Features', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 18, title: 'No Code Changes', theme: 'Works Transparently', department: 'Development', leak: 'general', tool: 'existing tools' },
  { number: 19, title: 'Audit Logs', theme: 'Compliance Ready', department: 'Compliance', leak: 'general', tool: 'all AI' },
  { number: 20, title: 'Enterprise Grade', theme: 'SOC 2, HIPAA Ready', department: 'Security', leak: 'general', tool: 'all AI' },
  { number: 21, title: 'The Monitoring', theme: 'Real-Time Alerts', department: 'Security', leak: 'general', tool: 'all AI' },
  { number: 22, title: 'The Rules', theme: 'Custom Detection Rules', department: 'Engineering', leak: 'organization-specific', tool: 'all AI' },
  { number: 23, title: 'The Integration', theme: 'SIEM Integration', department: 'Security', leak: 'general', tool: 'all AI' },
  { number: 24, title: 'The Scale', theme: 'Handles Enterprise Load', department: 'Engineering', leak: 'general', tool: 'all AI' },
  { number: 25, title: 'The Support', theme: '24/7 Support Available', department: 'All', leak: 'general', tool: 'all AI' },
  
  // Episodes 26-34: Action Driving
  { number: 26, title: 'Time is Running Out', theme: 'Breaches Happening Now', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 27, title: 'They Protected Everyone', theme: 'Success Story', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 28, title: 'You Can Too', theme: 'Direct Call to Action', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 29, title: 'Free Trial Reminder', theme: '14-Day Trial Available', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 30, title: 'The Truth', theme: 'They Knew From Day 1', department: 'Engineering', leak: 'general', tool: 'all AI' },
  { number: 31, title: 'The Protection', theme: 'Silent Heroism', department: 'Engineering', leak: 'general', tool: 'all AI' },
  { number: 32, title: 'The Choice', theme: 'Protect or Risk', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 33, title: 'The Thursday', theme: 'Always Thursday', department: 'All', leak: 'general', tool: 'all AI' },
  { number: 34, title: 'The Final', theme: 'Start Protecting Today', department: 'All', leak: 'general', tool: 'all AI' },
];

// Character mapping by department
const DEPARTMENT_CHARACTERS = {
  'Sales': { name: 'MARCUS THOMPSON', desc: 'mid-30s, Black male, polished button-down, enthusiastic' },
  'Development': { name: 'Developer', desc: 'guest character, young, enthusiastic, hoodie' },
  'Support': { name: 'LISA PARK', desc: 'late 20s, Asian-American, headset, friendly smile' },
  'Marketing': { name: 'TOM WILSON', desc: 'mid-30s, company hoodie, creative' },
  'Engineering': { name: 'ALEX CHEN', desc: 'early 30s, Asian-American, gray hoodie, round glasses' },
  'Security': { name: 'RACHEL FOSTER', desc: 'early 40s, CISO, professional, tablet' },
  'Finance': { name: 'Finance Team', desc: 'guest character, professional' },
  'Compliance': { name: 'RACHEL FOSTER', desc: 'early 40s, CISO, professional' },
  'All': { name: 'Random Employee', desc: 'guest character, varies' },
};

// Generate panel descriptions (same format every time)
function generatePanels(episode) {
  const char = DEPARTMENT_CHARACTERS[episode.department] || DEPARTMENT_CHARACTERS['All'];
  
  const panel1 = `Photorealistic office scene. ${char.name} (${char.desc}) at ${episode.department.toLowerCase()} desk, pasting ${episode.leak} into ${episode.tool}. Screen shows ${episode.leak} visible. ${char.name} looks ${episode.department === 'Development' ? 'productive' : 'helpful'}, unaware of security risk. Background: Modern tech office, open floor plan, calendar on wall shows 'THURSDAY' clearly visible. Clock shows 9:47 AM.`;

  const panel2 = `ALEX CHEN (early 30s, Asian-American, gray hoodie, round glasses, neutral expression) and JORDAN MARTINEZ (late 20s, Latinx, button-down untucked, slight smirk) at their desks side by side. Jordan's security dashboard shows alert: '${episode.leak.toUpperCase()} DETECTED - BLOCKED' (visible in corner). Jordan types rapidly, dismisses alert. Alex glances at alert, then back to his code. Text bubble from Alex: 'Huh.' Text bubble from Jordan: 'Yeah.' Both have neutral expressions. Background: Their screens show code and security logs, small 'ZeroShare Gateway' logo visible on Jordan's screen (subtle).`;

  const panel3 = `${char.name}'s screen shows ${episode.tool} error message (looks like normal AI error). ${char.name} shrugs, moves on to next task. Text bubble from ${char.name}: 'AI doesn't like that.' Background: Office continues normally, other employees working. Alex and Jordan visible in far background, both have subtle satisfied smirks (very subtle). Calendar still shows Thursday. Clock shows same time.`;

  return { panel1, panel2, panel3 };
}

// Generate LinkedIn hook and caption
function generateLinkedInContent(episode, blogUrl) {
  const hook = `Your ${episode.department.toLowerCase()} team is pasting ${episode.leak} into ${episode.tool} right now. See how to stop it.`;
  const caption = `Your ${episode.department.toLowerCase()} team is pasting ${episode.leak} into ${episode.tool} right now. See how they fix it → ${blogUrl}\n\n#AISecurity #DataProtection #CISO`;
  
  return { linkedinHook: hook, linkedinCaption: caption };
}

// Generate all episodes
function generateAllEpisodes() {
  const seriesInfo = {
    title: "The Gateway",
    subtitle: "An AI Security Office Comedy",
    description: "Two engineers protect their entire organization from AI data leaks. Dry humor. Silent heroism. Every Thursday.",
    totalEpisodes: 34,
    postingSchedule: "Every Thursday 8 AM ET",
    startDate: "2026-01-30",
    awsMarketplaceUrl: "https://aws.amazon.com/marketplace/pp/prodview-zeroshare",
    blogBaseUrl: "https://deployzeroshare.com/blog",
    pricing: {
      free: "Free for 5 users",
      team: "$499/month for 25 users",
      trial: "14-day free trial, all features"
    },
    linkedinCaptionFormula: "[Problem hook]. See how they fix it → [blog URL]\n\n#AISecurity #DataProtection #CISO",
    ctaBlock: {
      headline: "Protect your team like Alex and Jordan.",
      body: "ZeroShare Gateway blocks PII and secrets automatically.",
      pricing: "Free for 5 users · $499/mo for 25 · 14-day free trial",
      button: "Start Free Trial → AWS Marketplace"
    }
  };

  const episodes = EPISODE_THEMES.map(ep => {
    const slug = `the-gateway-episode-${String(ep.number).padStart(2, '0')}-${ep.title.toLowerCase().replace(/\s+/g, '-')}`;
    const blogUrl = `${seriesInfo.blogBaseUrl}/${slug}`;
    const panels = generatePanels(ep);
    const linkedin = generateLinkedInContent(ep, blogUrl);

    return {
      number: ep.number,
      title: ep.title,
      slug: slug,
      theme: ep.theme,
      linkedinHook: linkedin.linkedinHook,
      linkedinCaption: linkedin.linkedinCaption,
      panel1: panels.panel1,
      panel2: panels.panel2,
      panel3: panels.panel3,
      ctaHeadline: seriesInfo.ctaBlock.headline,
      ctaBody: seriesInfo.ctaBlock.body,
      ctaPricing: seriesInfo.ctaBlock.pricing,
      ctaButton: seriesInfo.ctaBlock.button
    };
  });

  return {
    episodes,
    seriesInfo
  };
}

// Main
const data = generateAllEpisodes();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`✅ Generated ${data.episodes.length} episodes`);
console.log(`📁 Saved to: ${OUTPUT_FILE}`);
