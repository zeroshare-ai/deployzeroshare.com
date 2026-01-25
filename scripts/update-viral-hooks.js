#!/usr/bin/env node
/**
 * Update all comic episode LinkedIn hooks with viral, neuroscience-based content
 * 
 * Viral principles applied:
 * - Curiosity gap (tease without revealing)
 * - Pattern interrupt (unexpected statements)
 * - Loss aversion (fear of losing something)
 * - Specificity (concrete numbers feel real)
 * - Incompleteness (brain craves closure)
 * - "You" personalization
 * - Emotional contrast
 */

const fs = require('fs');
const path = require('path');

const EPISODES_PATH = path.join(__dirname, '../docs/COMIC_EPISODES_DATA.json');
const data = JSON.parse(fs.readFileSync(EPISODES_PATH, 'utf-8'));

// Viral hooks - each one uses different psychological triggers
const VIRAL_HOOKS = {
  1: {
    hook: "I watched a sales rep paste a customer's SSN into ChatGPT. He had no idea what happened next.",
    caption: "I watched a sales rep paste a customer's SSN into ChatGPT.\n\nHe had no idea what happened next.\n\nSee it → {{URL}}\n\n#AISecurity #DataProtection #CISO"
  },
  2: {
    hook: "A developer just leaked AWS keys to Copilot. The keys vanished before they hit the cloud. Here's why.",
    caption: "A developer just leaked AWS keys to Copilot.\n\nThe keys vanished before they hit the cloud.\n\nHere's why → {{URL}}\n\n#DevSecOps #AISecurity #CloudSecurity"
  },
  3: {
    hook: "Support rep thinks she's great at prompting. She has no idea her PII is being stripped. Watch.",
    caption: "Support rep thinks she's great at prompting.\n\nShe has no idea her PII is being stripped.\n\nWatch → {{URL}}\n\n#CustomerService #AISecurity #DataPrivacy"
  },
  4: {
    hook: "He closed a $2M deal and pasted the whole contract into ChatGPT. This is what the engineers saw.",
    caption: "He closed a $2M deal and pasted the whole contract into ChatGPT.\n\nThis is what the engineers saw.\n\n→ {{URL}}\n\n#Sales #AISecurity #B2BSales"
  },
  5: {
    hook: "Marketing pasted 23 customer emails into AI for a campaign. Zero left the building. Here's the trick.",
    caption: "Marketing pasted 23 customer emails into AI for a campaign.\n\nZero left the building.\n\nHere's the trick → {{URL}}\n\n#Marketing #DataProtection #AISecurity"
  },
  6: {
    hook: "The CEO announced 'AI-first.' Two engineers in the back didn't clap. They were already 3 years ahead.",
    caption: "The CEO announced 'AI-first.'\n\nTwo engineers in the back didn't clap.\n\nThey were already 3 years ahead → {{URL}}\n\n#Leadership #AIStrategy #CISO"
  },
  7: {
    hook: "50+ PII patterns. One invisible system. Nobody at this company knows it's running. Except two people.",
    caption: "50+ PII patterns. One invisible system.\n\nNobody at this company knows it's running.\n\nExcept two people → {{URL}}\n\n#AISecurity #DataProtection #InfoSec"
  },
  8: {
    hook: "I found 47 blocked API keys in one day. The developers thought Copilot was 'being picky.'",
    caption: "I found 47 blocked API keys in one day.\n\nThe developers thought Copilot was 'being picky.'\n\n→ {{URL}}\n\n#DevSecOps #APIKeys #CyberSecurity"
  },
  9: {
    hook: "They deployed AI security with zero code changes. Users didn't notice. That was the point.",
    caption: "They deployed AI security with zero code changes.\n\nUsers didn't notice.\n\nThat was the point → {{URL}}\n\n#ZeroFriction #AISecurity #DevOps"
  },
  10: {
    hook: "The CISO presented her AI security concerns. She didn't know they were already solved. Watch her face.",
    caption: "The CISO presented her AI security concerns.\n\nShe didn't know they were already solved.\n\nWatch her face → {{URL}}\n\n#CISO #AISecurity #InfoSec"
  },
  11: {
    hook: "$4.45M. That's the average breach cost. This company pays $499/month instead. Here's their secret.",
    caption: "$4.45M. That's the average breach cost.\n\nThis company pays $499/month instead.\n\nHere's their secret → {{URL}}\n\n#CyberSecurity #ROI #CISO"
  },
  12: {
    hook: "CFO: 'What's the ROI?' Engineer: '$499 vs $4.45M.' CFO: 'That's not ROI, that's survival.'",
    caption: "CFO: 'What's the ROI?'\nEngineer: '$499 vs $4.45M.'\nCFO: 'That's not ROI, that's survival.'\n\n→ {{URL}}\n\n#ROI #CyberSecurity #CFO"
  },
  13: {
    hook: "98% of companies have shadow AI. This one does too. The difference? Two engineers who don't sleep.",
    caption: "98% of companies have shadow AI.\n\nThis one does too.\n\nThe difference? Two engineers who don't sleep → {{URL}}\n\n#ShadowAI #AISecurity #InfoSec"
  },
  14: {
    hook: "GDPR fine: €15M. HIPAA fine: $1.5M. Cost to prevent: $499/mo. Why do companies still gamble?",
    caption: "GDPR fine: €15M.\nHIPAA fine: $1.5M.\nCost to prevent: $499/mo.\n\nWhy do companies still gamble? → {{URL}}\n\n#GDPR #HIPAA #Compliance"
  },
  15: {
    hook: "Episode 15. Something changed. The engineers finally spoke. What they said shocked everyone.",
    caption: "Episode 15. Something changed.\n\nThe engineers finally spoke.\n\nWhat they said shocked everyone → {{URL}}\n\n#TheGateway #AISecurity #MustWatch"
  },
  16: {
    hook: "10 minutes. That's how long it took to deploy. Users noticed nothing. Attackers noticed everything.",
    caption: "10 minutes. That's how long it took to deploy.\n\nUsers noticed nothing.\nAttackers noticed everything.\n\n→ {{URL}}\n\n#DevOps #AISecurity #QuickDeploy"
  },
  17: {
    hook: "14 days free. All features. No credit card. What's the catch? There isn't one. Here's proof.",
    caption: "14 days free. All features. No credit card.\n\nWhat's the catch?\n\nThere isn't one. Here's proof → {{URL}}\n\n#FreeTrial #AISecurity #NoStrings"
  },
  18: {
    hook: "Zero code changes. Zero workflow disruption. Zero complaints from users. Maximum protection. How?",
    caption: "Zero code changes.\nZero workflow disruption.\nZero complaints from users.\nMaximum protection.\n\nHow? → {{URL}}\n\n#DevOps #AISecurity #Frictionless"
  },
  19: {
    hook: "Auditor: 'Show me your AI logs.' Engineer: 'All 2.3 million entries?' Auditor: *drops clipboard*",
    caption: "Auditor: 'Show me your AI logs.'\nEngineer: 'All 2.3 million entries?'\nAuditor: *drops clipboard*\n\n→ {{URL}}\n\n#Compliance #AuditReady #SOC2"
  },
  20: {
    hook: "SOC 2. HIPAA. GDPR. Three letters that keep CISOs up at night. Two engineers who don't.",
    caption: "SOC 2. HIPAA. GDPR.\n\nThree letters that keep CISOs up at night.\n\nTwo engineers who don't → {{URL}}\n\n#Compliance #CISO #Enterprise"
  },
  21: {
    hook: "Real-time alerts. 24/7 monitoring. Zero false positives. The intern asked: 'Do you ever sleep?'",
    caption: "Real-time alerts. 24/7 monitoring. Zero false positives.\n\nThe intern asked: 'Do you ever sleep?'\n\n→ {{URL}}\n\n#Monitoring #AISecurity #247"
  },
  22: {
    hook: "Custom rules. Custom patterns. Custom everything. The AI doesn't stand a chance.",
    caption: "Custom rules. Custom patterns. Custom everything.\n\nThe AI doesn't stand a chance.\n\n→ {{URL}}\n\n#CustomSecurity #AISecurity #Rules"
  },
  23: {
    hook: "SIEM integration took 15 minutes. Security team said it would take weeks. Engineers just smiled.",
    caption: "SIEM integration took 15 minutes.\n\nSecurity team said it would take weeks.\n\nEngineers just smiled → {{URL}}\n\n#SIEM #Integration #AISecurity"
  },
  24: {
    hook: "10,000 requests per second. Zero latency impact. The enterprise said 'impossible.' Then they saw it.",
    caption: "10,000 requests per second.\nZero latency impact.\n\nThe enterprise said 'impossible.'\n\nThen they saw it → {{URL}}\n\n#Enterprise #Scale #Performance"
  },
  25: {
    hook: "24/7 support. But they never call. The system just works. That's the best kind of support.",
    caption: "24/7 support.\n\nBut they never call.\n\nThe system just works. That's the best kind of support → {{URL}}\n\n#Support #AISecurity #Reliability"
  },
  26: {
    hook: "Every 39 seconds, a company is breached. This one wasn't. For 26 weeks straight. Here's week 26.",
    caption: "Every 39 seconds, a company is breached.\n\nThis one wasn't. For 26 weeks straight.\n\nHere's week 26 → {{URL}}\n\n#CyberSecurity #DataBreach #Protection"
  },
  27: {
    hook: "12,847 blocked attempts. Zero breaches. Zero headlines. Zero credit taken. Until now.",
    caption: "12,847 blocked attempts.\nZero breaches.\nZero headlines.\nZero credit taken.\n\nUntil now → {{URL}}\n\n#Unsung Heroes #AISecurity #Protection"
  },
  28: {
    hook: "They protected everyone. Silently. For months. Now it's your turn. Here's how.",
    caption: "They protected everyone. Silently. For months.\n\nNow it's your turn.\n\nHere's how → {{URL}}\n\n#AISecurity #YourTurn #Protection"
  },
  29: {
    hook: "Free trial ends never for small teams. Enterprise features for free. This isn't a typo.",
    caption: "Free trial ends never for small teams.\n\nEnterprise features for free.\n\nThis isn't a typo → {{URL}}\n\n#FreeTier #AISecurity #Startup"
  },
  30: {
    hook: "They knew. From day one. Every 'Huh.' Every shared look. They knew. And now, so do you.",
    caption: "They knew. From day one.\n\nEvery 'Huh.' Every shared look. They knew.\n\nAnd now, so do you → {{URL}}\n\n#TheGateway #BigReveal #Truth"
  },
  31: {
    hook: "Silent protection. Invisible heroism. No applause, no recognition. Just safety. Every Thursday.",
    caption: "Silent protection. Invisible heroism.\n\nNo applause, no recognition.\n\nJust safety. Every Thursday → {{URL}}\n\n#UnsungHeroes #AISecurity #Thursday"
  },
  32: {
    hook: "Two options: Hope your data doesn't leak. Or make sure it can't. One costs $0. One costs everything.",
    caption: "Two options:\n\n1. Hope your data doesn't leak.\n2. Make sure it can't.\n\nOne costs $0. One costs everything → {{URL}}\n\n#TheChoice #AISecurity #DataProtection"
  },
  33: {
    hook: "It's always Thursday for Alex and Jordan. Cold coffee. Silent typing. Protecting everyone. Again.",
    caption: "It's always Thursday for Alex and Jordan.\n\nCold coffee. Silent typing.\n\nProtecting everyone. Again → {{URL}}\n\n#Thursday #TheGateway #Ritual"
  },
  34: {
    hook: "Final episode. 34 weeks. 12M+ blocks. 0 breaches. This is how the story ends. Or begins.",
    caption: "Final episode.\n\n34 weeks. 12M+ blocks. 0 breaches.\n\nThis is how the story ends. Or begins → {{URL}}\n\n#TheGateway #Finale #StartYourStory"
  }
};

// Update each episode
data.episodes.forEach(ep => {
  const viral = VIRAL_HOOKS[ep.number];
  if (viral) {
    ep.linkedinHook = viral.hook;
    ep.linkedinCaption = viral.caption.replace('{{URL}}', `https://deployzeroshare.com/blog/${ep.slug}?utm_source=linkedin&utm_medium=comic&utm_campaign=episode${ep.number}`);
  }
});

// Write back
fs.writeFileSync(EPISODES_PATH, JSON.stringify(data, null, 2));

console.log('✅ Updated all 34 episodes with viral LinkedIn hooks');
console.log('\nSample hooks:');
console.log(`\nEp 1: "${VIRAL_HOOKS[1].hook}"`);
console.log(`\nEp 15: "${VIRAL_HOOKS[15].hook}"`);
console.log(`\nEp 34: "${VIRAL_HOOKS[34].hook}"`);
