#!/usr/bin/env node
/**
 * Content Quality Review & Scoring
 * 
 * Reviews all draft posts for:
 * - Technical accuracy
 * - Viral potential
 * - Brand alignment
 * 
 * Usage: node review-content.js [--audit | --score | --sort]
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = join(__dirname, 'content/posts.json');

// Viral scoring rubric
function scoreVirality(post) {
  const content = post.content || '';
  const scores = {
    hookStrength: 0,      // 25%
    relatability: 0,      // 20%
    unexpectedInsight: 0, // 20%
    shareability: 0,      // 15%
    emotionalTrigger: 0,  // 10%
    actionable: 0,        // 10%
  };

  // Hook strength - first line impact
  const firstLine = content.split('\n')[0];
  if (firstLine.length < 50 && firstLine.length > 10) scores.hookStrength += 3;
  if (/[?!]/.test(firstLine)) scores.hookStrength += 2;
  if (/^(My|Your|The|Why|How|What|True|Unpopular)/.test(firstLine)) scores.hookStrength += 2;
  if (/^\d+%|\$[\d,]+|^\d{1,3}(,\d{3})*/.test(firstLine)) scores.hookStrength += 3;
  scores.hookStrength = Math.min(10, scores.hookStrength);

  // Relatability - personal pronouns, common experiences
  const youCount = (content.match(/\byou\b/gi) || []).length;
  const weCount = (content.match(/\bwe\b/gi) || []).length;
  scores.relatability = Math.min(10, youCount + weCount);

  // Unexpected insight - contrarian markers
  if (/unpopular opinion|here's (what|why)|the (real|actual|truth)/i.test(content)) scores.unexpectedInsight += 4;
  if (/isn't|aren't|doesn't|don't.*work/i.test(content)) scores.unexpectedInsight += 3;
  if (/but here's|plot twist|the kicker/i.test(content)) scores.unexpectedInsight += 3;
  scores.unexpectedInsight = Math.min(10, scores.unexpectedInsight);

  // Shareability - list format, quotable lines
  const bulletPoints = (content.match(/^[→•\-✓✗]/gm) || []).length;
  scores.shareability = Math.min(10, bulletPoints + 2);
  if (content.length < 1500) scores.shareability += 2;
  if (/\n\n/.test(content)) scores.shareability += 2;

  // Emotional trigger
  if (/terrif|scar|shock|alarm|concern|risk|danger|threat/i.test(content)) scores.emotionalTrigger += 4;
  if (/embarrass|fired|fail|mistake|wrong/i.test(content)) scores.emotionalTrigger += 3;
  if (/success|win|solve|fix|protect/i.test(content)) scores.emotionalTrigger += 3;
  scores.emotionalTrigger = Math.min(10, scores.emotionalTrigger);

  // Actionable
  if (/here's (how|what)|step|tip|do this|instead/i.test(content)) scores.actionable += 5;
  if (/\bshould\b|\bmust\b|\bneed to\b/i.test(content)) scores.actionable += 3;
  if (/#\w+/.test(content)) scores.actionable += 2;
  scores.actionable = Math.min(10, scores.actionable);

  // Calculate weighted score
  const weighted = 
    (scores.hookStrength * 0.25) +
    (scores.relatability * 0.20) +
    (scores.unexpectedInsight * 0.20) +
    (scores.shareability * 0.15) +
    (scores.emotionalTrigger * 0.10) +
    (scores.actionable * 0.10);

  return {
    scores,
    total: Math.round(weighted * 10) / 10,
    tier: weighted >= 8 ? 1 : weighted >= 7 ? 2 : weighted >= 5 ? 3 : 4
  };
}

// Technical accuracy flags
function checkTechnicalAccuracy(post) {
  const content = post.content || '';
  const issues = [];
  const warnings = [];

  // Check for unverified statistics
  if (/\d+%/.test(content) && !/Cyberhaven|LayerX|Cyera|IBM|GitGuardian|Sift|Group-IB|OpenAI/i.test(content)) {
    warnings.push('Statistics without named source');
  }

  // Check for oversimplified claims
  if (/stores? everything forever/i.test(content)) {
    issues.push('Oversimplified: "stores everything forever" - should specify retention');
  }
  if (/AI (can|will) (read|know|see) your (mind|thoughts)/i.test(content)) {
    issues.push('Sensationalized: AI mind-reading claim');
  }
  if (/100% (secure|safe|protected)/i.test(content)) {
    issues.push('Overclaim: Nothing is 100% secure');
  }

  // Check for outdated references
  if (/202[0-2]\b/.test(content) && !/Samsung|JPMorgan|Goldman/i.test(content)) {
    warnings.push('Contains older date reference - verify still relevant');
  }

  return {
    accurate: issues.length === 0,
    issues,
    warnings,
    score: issues.length === 0 ? (warnings.length === 0 ? 10 : 8) : 5
  };
}

// Brand alignment check
function checkBrandAlignment(post) {
  const content = post.content || '';
  const flags = [];

  // Check for off-brand tone
  if (/idiot|stupid|dumb|moron/i.test(content)) {
    flags.push('Mean/insulting language detected');
  }
  if (/BREAKING|URGENT|ACT NOW/i.test(content)) {
    flags.push('Clickbait urgency language');
  }
  if (/guaranteed|promise|definitely will/i.test(content)) {
    flags.push('Overclaiming language');
  }

  return {
    aligned: flags.length === 0,
    flags,
    score: 10 - (flags.length * 3)
  };
}

// Main review function
function reviewPost(post, index) {
  const virality = scoreVirality(post);
  const technical = checkTechnicalAccuracy(post);
  const brand = checkBrandAlignment(post);

  const overallScore = (virality.total + technical.score + brand.score) / 3;

  return {
    index,
    title: post.title || post.blogTitle || `Post ${index}`,
    type: post.type || 'unknown',
    status: post.status,
    virality,
    technical,
    brand,
    overallScore: Math.round(overallScore * 10) / 10,
    publishReady: virality.tier <= 2 && technical.accurate && brand.aligned,
    preview: (post.content || '').substring(0, 80) + '...'
  };
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const action = args[0] || '--score';

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  const drafts = posts.filter(p => p.status === 'draft');

  console.log('📊 Content Quality Review\n');
  console.log(`Total posts: ${posts.length}`);
  console.log(`Drafts to review: ${drafts.length}\n`);

  if (action === '--audit') {
    // Full audit with issues
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    let publishReady = 0;
    let needsWork = 0;

    drafts.forEach((post, i) => {
      const review = reviewPost(post, i);
      
      console.log(`📝 ${review.title}`);
      console.log(`   Type: ${review.type}`);
      console.log(`   Viral Score: ${review.virality.total}/10 (Tier ${review.virality.tier})`);
      console.log(`   Technical: ${review.technical.accurate ? '✅' : '⚠️'} ${review.technical.score}/10`);
      console.log(`   Brand: ${review.brand.aligned ? '✅' : '⚠️'} ${review.brand.score}/10`);
      console.log(`   Overall: ${review.overallScore}/10`);
      console.log(`   Ready: ${review.publishReady ? '✅ YES' : '❌ NO'}`);
      
      if (review.technical.issues.length > 0) {
        console.log(`   Issues:`);
        review.technical.issues.forEach(i => console.log(`     ❌ ${i}`));
      }
      if (review.technical.warnings.length > 0) {
        console.log(`   Warnings:`);
        review.technical.warnings.forEach(w => console.log(`     ⚠️ ${w}`));
      }
      if (review.brand.flags.length > 0) {
        console.log(`   Brand flags:`);
        review.brand.flags.forEach(f => console.log(`     🚩 ${f}`));
      }
      
      console.log('');
      
      if (review.publishReady) publishReady++;
      else needsWork++;
    });

    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n✅ Publish-ready: ${publishReady}`);
    console.log(`⚠️ Needs work: ${needsWork}`);

  } else if (action === '--score') {
    // Quick score summary
    const reviews = drafts.map((post, i) => reviewPost(post, i));
    reviews.sort((a, b) => b.overallScore - a.overallScore);

    console.log('Top Posts by Score:\n');
    reviews.slice(0, 15).forEach((r, i) => {
      const status = r.publishReady ? '✅' : '⚠️';
      console.log(`${i + 1}. ${status} [${r.overallScore}] ${r.title}`);
    });

    const tier1 = reviews.filter(r => r.virality.tier === 1).length;
    const tier2 = reviews.filter(r => r.virality.tier === 2).length;
    const ready = reviews.filter(r => r.publishReady).length;

    console.log(`\n📊 Summary:`);
    console.log(`   Tier 1 (excellent): ${tier1}`);
    console.log(`   Tier 2 (good): ${tier2}`);
    console.log(`   Publish-ready: ${ready}`);

  } else if (action === '--sort') {
    // Sort posts by score and save
    const reviews = posts.map((post, i) => ({ post, review: reviewPost(post, i) }));
    
    // Separate published from drafts
    const published = reviews.filter(r => r.post.status === 'published');
    const drafts = reviews.filter(r => r.post.status === 'draft');
    
    // Sort drafts by score (highest first)
    drafts.sort((a, b) => b.review.overallScore - a.review.overallScore);
    
    // Recombine: published first, then sorted drafts
    const sortedPosts = [
      ...published.map(r => r.post),
      ...drafts.map(r => ({ ...r.post, qualityScore: r.review.overallScore }))
    ];

    fs.writeFileSync(POSTS_FILE, JSON.stringify(sortedPosts, null, 2));
    
    console.log('✅ Posts sorted by quality score');
    console.log(`   Top draft: ${drafts[0]?.review.title} (${drafts[0]?.review.overallScore})`);
  }
}

main().catch(console.error);
