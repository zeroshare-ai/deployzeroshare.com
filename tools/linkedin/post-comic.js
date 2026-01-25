#!/usr/bin/env node
/**
 * Post "The Gateway" Comic to LinkedIn
 * Conversion-focused LinkedIn posting script
 * 
 * Usage:
 *   node tools/linkedin/post-comic.js --episode 1  # Post specific episode
 *   node tools/linkedin/post-comic.js --next        # Post next scheduled episode
 *   node tools/linkedin/post-comic.js --preview 1  # Preview without posting
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });
dotenv.config(); // also allow repo-root .env

const EPISODES_FILE = join(__dirname, '../../docs/COMIC_EPISODES_DATA.json');
const CONFIG_FILE = join(__dirname, 'config.js');

// Load episodes and config
const EPISODES_DATA = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf-8'));
const config = (await import(CONFIG_FILE)).default;

const EPISODES = EPISODES_DATA.episodes;
const API_BASE = 'https://api.linkedin.com/rest';

// Get next episode to post
function getNextEpisode() {
  const today = new Date();
  const startDate = new Date(EPISODES_DATA.seriesInfo.startDate);
  const weeksSinceStart = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));
  const nextEpisodeNum = weeksSinceStart + 1;
  
  if (nextEpisodeNum > EPISODES.length) {
    console.log('✅ All episodes posted!');
    return null;
  }
  
  return EPISODES.find(ep => ep.number === nextEpisodeNum) || EPISODES[0];
}

// LinkedIn API helper
async function linkedInAPI(endpoint, method = 'GET', body = null) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('LINKEDIN_ACCESS_TOKEN not set');
  }

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': config.apiVersion || '202401',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`LinkedIn API Error ${response.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

// Upload image to LinkedIn
async function uploadImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString('base64');
  
  // LinkedIn image upload endpoint
  const uploadResponse = await linkedInAPI('/images?action=initializeUpload', 'POST', {
    initializeUploadRequest: {
      owner: `urn:li:organization:${config.companyId}`,
    },
  });

  // Upload image to provided URL
  const uploadUrl = uploadResponse.value.uploadUrl;
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/png',
    },
    body: imageBuffer,
  });

  return uploadResponse.value.image;
}

// Post comic to LinkedIn
async function postComic(episode, preview = false) {
  console.log(`\n🎨 Posting Episode ${episode.number}: "${episode.title}"\n`);
  
  const base = `comic-episode-${String(episode.number).padStart(2, '0')}`;
  // Check private/ first (source of truth), then public/ (for after prebuild)
  const privateLinkedInPath = join(__dirname, '../../private/images/comics', `${base}-linkedin.png`);
  const privatePath = join(__dirname, '../../private/images/comics', `${base}.png`);
  const publicLinkedInPath = join(__dirname, '../../public/images/comics', `${base}-linkedin.png`);
  const publicPath = join(__dirname, '../../public/images/comics', `${base}.png`);
  
  // Prefer LinkedIn-optimized square image, then full 3-panel
  const linkedInPath = fs.existsSync(privateLinkedInPath) ? privateLinkedInPath : publicLinkedInPath;
  const fullPath = fs.existsSync(privatePath) ? privatePath : publicPath;
  const imagePath = fs.existsSync(linkedInPath) ? linkedInPath : fullPath;

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath} (tried ${linkedInPath}, ${fullPath})`);
  }

  // Use standardized LinkedIn caption (from episode data)
  const postText = episode.linkedinCaption;

  if (preview) {
    console.log('📝 PREVIEW MODE - Would post:\n');
    console.log('Image:', imagePath);
    console.log('Text:', postText);
    console.log('\n✅ Preview complete. Use --live to actually post.');
    return;
  }

  // Upload image
  console.log('📤 Uploading image...');
  const imageUrn = await uploadImage(imagePath);
  console.log('✅ Image uploaded');

  // Create post
  console.log('📝 Creating post...');
  const postData = {
    author: `urn:li:organization:${config.companyId}`,
    commentary: postText,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      media: {
        id: imageUrn,
      },
    },
    lifecycleState: 'PUBLISHED',
  };

  const result = await linkedInAPI('/posts', 'POST', postData);
  console.log('✅ Post created:', result.id);
  
  return result;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const episodeNum = args.includes('--episode') ? parseInt(args[args.indexOf('--episode') + 1]) : null;
  const preview = args.includes('--preview');
  const next = args.includes('--next');

  let episode;
  
  if (episodeNum) {
    episode = EPISODES.find(ep => ep.number === episodeNum);
    if (!episode) {
      console.error(`❌ Episode ${episodeNum} not found`);
      process.exit(1);
    }
  } else if (next) {
    episode = getNextEpisode();
    if (!episode) {
      console.log('✅ All episodes posted!');
      return;
    }
  } else if (preview && args.length > 1) {
    // --preview 1 format (shorthand for --episode 1 --preview)
    const previewNum = parseInt(args[args.indexOf('--preview') + 1]);
    episode = EPISODES.find(ep => ep.number === previewNum);
    if (!episode) {
      console.error(`❌ Episode ${previewNum} not found`);
      process.exit(1);
    }
  } else {
    console.error('Usage: node post-comic.js --episode <num> [--preview] | --next [--preview] | --preview <num>');
    process.exit(1);
  }

  try {
    await postComic(episode, preview);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
