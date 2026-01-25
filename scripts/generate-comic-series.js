#!/usr/bin/env node
/**
 * "The Gateway" Comic Series Generator
 * 
 * Generates all 34 episodes of the AI security office comedy comic series.
 * Uses Google Nano Banana for photorealistic image generation.
 * 
 * Usage:
 *   node scripts/generate-comic-series.js              # Generate all episodes
 *   node scripts/generate-comic-series.js --episode 1  # Generate single episode
 *   node scripts/generate-comic-series.js --list       # List all episodes
 */

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Load episode prompts
const EPISODES_DATA = require('../docs/COMIC_EPISODES_DATA.json');
const EPISODES = EPISODES_DATA.episodes || [];

const MODEL = process.env.IMAGE_MODEL || 'gemini-2.5-flash-image';
// SECURITY: Images go to private/ first. prebuild-comics.js copies only released ones to public/
const OUTPUT_DIR = path.join(__dirname, '..', 'private', 'images', 'comics');

// Initialize Google GenAI client
function getClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GOOGLE_API_KEY environment variable not set');
    process.exit(1);
  }
  return new GoogleGenAI({ apiKey });
}

// Ensure output directory exists
function ensureDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created directory: ${OUTPUT_DIR}`);
  }
}

function extractImageFromResponse(response) {
  const candidates = response.response?.candidates || response.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || candidate.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) return part.inlineData.data;
    }
  }
  return null;
}

async function generateImage(client, prompt, filename) {
  const response = await client.models.generateContent({
    model: MODEL,
    contents: prompt,
    generationConfig: { responseModalities: ['image', 'text'] },
  });
  const imageData = extractImageFromResponse(response);
  if (!imageData) return false;
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
  console.log(`   ✅ Saved: ${filename} (${(Buffer.from(imageData, 'base64').length / 1024).toFixed(1)} KB)`);
  return true;
}

// 3-panel strip for blog
async function generateEpisode(client, episode) {
  console.log(`\n🎨 Episode ${episode.number}: "${episode.title}" (blog + LinkedIn)`);
  const prompt = `Create a photorealistic 3-panel comic strip, horizontal layout. Each panel 800x800px, total 2400x800px.

${episode.panel1}

${episode.panel2}

${episode.panel3}

STYLE: Photorealistic office comedy. Modern tech office, open floor plan. Consistent characters. Clean speech bubbles. Calendar shows THURSDAY. Dry humor.`;
  const ok = await generateImage(client, prompt, `comic-episode-${String(episode.number).padStart(2, '0')}.png`);
  if (!ok) return false;

  // Panel 1 only for LinkedIn (square, curiosity hook)
  const promptLi = `Create a single photorealistic comic panel, square 1080x1080px. Office comedy. Modern tech office.

${episode.panel1}

STYLE: Same as above. Single panel only, 1080x1080. Clean, readable.`;
  const okLi = await generateImage(client, promptLi, `comic-episode-${String(episode.number).padStart(2, '0')}-linkedin.png`);
  if (!okLi) console.log(`   ⚠️  LinkedIn panel not generated, will use full strip`);
  return true;
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  // Handle --list flag
  if (args.includes('--list')) {
    console.log('\n📋 Available Episodes:\n');
    EPISODES.forEach(ep => {
      console.log(`   Episode ${ep.number}: "${ep.title}"`);
      console.log(`   Slug: ${ep.slug}`);
      console.log(`   Theme: ${ep.theme}\n`);
    });
    return;
  }
  
  // Parse episode number
  let episodeNum = null;
  const episodeIndex = args.indexOf('--episode');
  if (episodeIndex !== -1 && args[episodeIndex + 1]) {
    episodeNum = parseInt(args[episodeIndex + 1]);
  }
  
  console.log('🎨 "The Gateway" Comic Series Generator');
  console.log('=====================================\n');
  console.log(`Model: ${MODEL}`);
  
  const client = getClient();
  ensureDirectories();
  
  // Filter episodes to generate
  let episodesToGenerate = EPISODES;
  if (episodeNum) {
    episodesToGenerate = EPISODES.filter(ep => ep.number === episodeNum);
    if (episodesToGenerate.length === 0) {
      console.error(`❌ Episode ${episodeNum} not found`);
      process.exit(1);
    }
  }
  
  console.log(`\n📦 Generating ${episodesToGenerate.length} episode(s)...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const episode of episodesToGenerate) {
    const result = await generateEpisode(client, episode);
    
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    // Rate limiting - wait between requests
    if (episodesToGenerate.length > 1) {
      console.log('   ⏳ Waiting 3s before next episode...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  
  console.log('\n=====================================');
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('=====================================\n');
}

main().catch(console.error);
