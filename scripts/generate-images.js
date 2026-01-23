#!/usr/bin/env node
/**
 * ZeroShare Image Generation Script
 * 
 * Uses Google's GenAI SDK (Nano Banana / Imagen) to generate all website images
 * 
 * Setup:
 *   1. npm install @google/genai
 *   2. export GOOGLE_API_KEY=your_api_key
 *   3. node scripts/generate-images.js [--priority 1|2|3|all] [--image <name>]
 * 
 * Usage:
 *   node scripts/generate-images.js                    # Generate all images
 *   node scripts/generate-images.js --priority 1      # Only priority 1 (immediate impact)
 *   node scripts/generate-images.js --image og-image  # Generate single image
 *   node scripts/generate-images.js --list            # List all images
 */

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Configuration
const MODEL = process.env.IMAGE_MODEL || 'gemini-2.5-flash-image'; // or 'imagen-4.0-generate-001'
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

// Color palette for reference
const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2', 
  accent: '#4facfe',
  teal: '#00f2fe',
  pink: '#f093fb',
};

// All image prompts organized by priority
const IMAGE_PROMPTS = {
  // PRIORITY 1 - Immediate Impact
  'og-image': {
    priority: 1,
    filename: 'og-image.png',
    outputPath: 'og-image.png', // Root of public
    dimensions: { width: 1200, height: 630 },
    prompt: `A premium social sharing image for ZeroShare Gateway. Clean composition with the ZeroShare shield logo concept (translucent glass shield with purple/indigo glow) prominently on the right side. Left side has clean space for text overlay: "ZeroShare Gateway" and "AI Security for Enterprise". Subtle abstract background with flowing data particles. The overall feel is premium, trustworthy, and tech-forward. Colors: indigo (#667eea) to purple (#764ba2) gradient, white text space, dark accents. Professional SaaS marketing quality.`
  },
  
  'hero-abstract-bg': {
    priority: 1,
    filename: 'hero-abstract-bg.png',
    outputPath: 'hero/hero-abstract-bg.png',
    dimensions: { width: 1920, height: 1080 },
    prompt: `A stunning abstract 3D visualization representing data protection and AI security. Flowing streams of light particles in indigo (#667eea) and purple (#764ba2) gradients curve through a deep navy blue void. Geometric shield shapes formed by connected nodes and glowing lines float in the composition. Small glowing orbs represent data points being filtered through a translucent crystalline barrier. The style is ultra-modern, sleek, and suggests advanced technology. Subtle depth of field creates dimension. No text, no logos. Premium tech aesthetic similar to high-end cybersecurity marketing. Cinematic lighting, 8K quality render.`
  },

  'architecture-flow': {
    priority: 1,
    filename: 'architecture-flow.png',
    outputPath: 'architecture/architecture-flow.png',
    dimensions: { width: 1200, height: 600 },
    prompt: `A clean, professional technical architecture diagram showing data flow. Left side: a modern building/office icon representing "Your Infrastructure" in indigo blue. Center: a large glowing shield/gateway icon with the text area for "ZeroShare Gateway" - this is the hero element with purple glow effects. Right side: cloud icons representing "AI Services" (OpenAI, Claude, etc). Connecting them: flowing lines with small animated-looking particles. Some particles are blocked/filtered at the gateway (shown in red/orange being caught). Clean particles continue through (shown in green/blue). Style: flat design meets subtle 3D, premium SaaS aesthetic. White background. Professional infographic quality.`
  },

  // PRIORITY 2 - Feature Icons
  'icon-pii-detection': {
    priority: 2,
    filename: 'icon-pii-detection.png',
    outputPath: 'icons/icon-pii-detection.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing PII detection. A magnifying glass made of transparent crystal with an indigo (#667eea) glow, hovering over a stylized document. Small glowing highlights indicate found personal data. The magnifying glass has a subtle lens flare. Minimalist, premium tech aesthetic. Transparent background. Soft shadows, studio lighting.`
  },

  'icon-secret-blocking': {
    priority: 2,
    filename: 'icon-secret-blocking.png',
    outputPath: 'icons/icon-secret-blocking.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing secret/credential blocking. A translucent shield with purple (#764ba2) energy, blocking a stylized key or password symbol. The key appears to be bouncing off or being deflected by an energy barrier. Small particle effects at the point of impact. Premium glass/crystal material. Transparent background. Studio product lighting.`
  },

  'icon-on-premise': {
    priority: 2,
    filename: 'icon-on-premise.png',
    outputPath: 'icons/icon-on-premise.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing on-premise deployment. A modern server rack or data center building made of translucent blue crystal (#4facfe gradient). A small shield emblem on the front. Subtle internal glowing circuitry visible through the glass. The icon sits on a small reflective surface. Transparent background. Premium tech aesthetic, studio lighting.`
  },

  'icon-audit-log': {
    priority: 2,
    filename: 'icon-audit-log.png',
    outputPath: 'icons/icon-audit-log.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing audit logging. A stylized clipboard or log document made of glass with glowing lines of text (abstract, not readable). A small checkmark or verification seal in indigo. Subtle holographic sheen. Floating at a slight angle. Transparent background. Clean, enterprise software aesthetic.`
  },

  'icon-compliance': {
    priority: 2,
    filename: 'icon-compliance.png',
    outputPath: 'icons/icon-compliance.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing compliance and certification. A prestigious badge or seal shape made of brushed gold and crystal. Contains a checkmark and subtle shield motif. Ribbons or laurel elements. Glowing edges in purple (#764ba2). Premium, trustworthy aesthetic like a certification seal. Transparent background.`
  },

  'icon-performance': {
    priority: 2,
    filename: 'icon-performance.png',
    outputPath: 'icons/icon-performance.png',
    dimensions: { width: 200, height: 200 },
    prompt: `A 3D rendered icon representing high performance/speed. A stylized lightning bolt made of pure energy, gradient from cyan (#4facfe) to teal (#00f2fe). Surrounded by a subtle circular speed indicator or gauge. Motion blur effects suggesting speed. Transparent background. Dynamic but professional.`
  },

  // PRIORITY 2 - Blog Featured Images
  'blog-pii-leaks': {
    priority: 2,
    filename: 'blog-pii-leaks.png',
    outputPath: 'blog/blog-pii-leaks.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A dramatic visualization of data leakage prevention. A stream of glowing personal data icons (envelopes, ID cards, credit cards, phone numbers represented abstractly) flowing toward a dark void representing "the cloud". A brilliant indigo shield barrier intercepts the stream, filtering and protecting the data. The protected data glows green, leaked data glows red/orange. Dark moody background, dramatic lighting. Text space on left side. Premium cybersecurity marketing aesthetic.`
  },

  'blog-compliance': {
    priority: 2,
    filename: 'blog-compliance.png',
    outputPath: 'blog/blog-compliance.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A sophisticated visualization of compliance frameworks. Multiple translucent certification badges floating in space: GDPR, HIPAA, SOC 2 represented as glowing seals. They orbit around a central AI brain icon that's protected by a shield. The style is premium, institutional, trustworthy. Gradient from purple to indigo. Document and checklist icons subtly integrated. Dark blue background. Space for text overlay.`
  },

  'blog-zero-trust': {
    priority: 2,
    filename: 'blog-zero-trust.png',
    outputPath: 'blog/blog-zero-trust.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A visualization of zero trust architecture for AI. A central glowing gateway (purple/indigo) with multiple verification checkpoints represented as scanning rings. Every connection point has a lock or verification symbol. Network nodes surrounding, each individually protected. The style suggests "trust nothing, verify everything". Futuristic but professional. Dark background with glowing elements. Blueprint/technical drawing aesthetic combined with 3D.`
  },

  'blog-secrets': {
    priority: 2,
    filename: 'blog-secrets.png',
    outputPath: 'blog/blog-secrets.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A visualization of secrets and credential protection. Stylized API keys, passwords, and credential strings (shown as glowing text fragments, not readable) being caught by a scanning net or filter. A large eye or magnifying glass represents detection. Caught secrets are highlighted in red/warning orange. The filter/gateway glows purple. Dark background, dramatic spotlight effect. Code editor aesthetic combined with security visualization.`
  },

  'blog-governance': {
    priority: 2,
    filename: 'blog-governance.png',
    outputPath: 'blog/blog-governance.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A visualization of enterprise AI governance. An organizational chart structure made of glowing nodes and connections. At the top: a shield representing security policy. Branches connect to various department icons (HR, Engineering, Finance). Each has a small protective barrier. The overall shape suggests structure, control, and protection. Corporate purple and indigo colors. Professional, enterprise aesthetic. Light background.`
  },

  'blog-gateway': {
    priority: 2,
    filename: 'blog-gateway.png',
    outputPath: 'blog/blog-gateway.png',
    dimensions: { width: 1200, height: 630 },
    prompt: `A detailed visualization of an AI proxy gateway. The gateway itself is a large glowing portal or arch in the center, gradient from indigo to purple. Data streams enter from the left (various icons: chat bubbles, code, documents). Inside the gateway: a scanning zone with X-ray/filter effect. Clean data exits right toward cloud/AI icons. Blocked data is diverted. Technical but accessible. Dark background, the gateway provides the light source.`
  },

  // PRIORITY 2 - Industry Visuals
  'industry-healthcare': {
    priority: 2,
    filename: 'industry-healthcare.png',
    outputPath: 'industries/industry-healthcare.png',
    dimensions: { width: 600, height: 400 },
    prompt: `An abstract representation of healthcare AI security. A stylized hospital or medical building silhouette in soft blue. Connected to it: flowing data streams protected by a purple shield barrier. Medical cross symbols and heart rate lines subtly integrated. A large protective dome or shield covers the healthcare elements. Modern, clean, trustworthy. Color palette: soft blues, white, with purple (#764ba2) security accents. No specific hospital branding. Light background.`
  },

  'industry-finance': {
    priority: 2,
    filename: 'industry-finance.png',
    outputPath: 'industries/industry-finance.png',
    dimensions: { width: 600, height: 400 },
    prompt: `An abstract representation of financial AI security. Stylized bank building or vault elements. Flowing streams of currency symbols and data protected by indigo (#667eea) shield barriers. Graph lines showing upward trends. A protective dome covers the financial elements. Gold and navy blue accents with the purple security gradient. Premium, trustworthy, institutional. Light background.`
  },

  'industry-technology': {
    priority: 2,
    filename: 'industry-technology.png',
    outputPath: 'industries/industry-technology.png',
    dimensions: { width: 600, height: 400 },
    prompt: `An abstract representation of technology company AI security. Stylized code editor windows, server racks, and laptop icons. Flowing data streams (representing API calls) protected by a cyan (#4facfe) to purple gradient shield. Binary or code elements subtly in background. Modern startup/tech aesthetic. Circuit board patterns integrated subtly. Light background.`
  },

  // PRIORITY 3 - Pricing Illustrations
  'pricing-startup': {
    priority: 3,
    filename: 'pricing-startup.png',
    outputPath: 'pricing/pricing-startup.png',
    dimensions: { width: 400, height: 300 },
    prompt: `An illustration representing a startup/small team tier. A small, sleek rocket or seedling growing, protected by a small indigo shield. Simple, clean, approachable. Single user or small team iconography. Light, optimistic. Transparent background.`
  },

  'pricing-professional': {
    priority: 3,
    filename: 'pricing-professional.png',
    outputPath: 'pricing/pricing-professional.png',
    dimensions: { width: 400, height: 300 },
    prompt: `An illustration representing a professional/growing team tier. A modern office building or team of abstract figures, protected by a larger purple shield with more features/layers visible. Growth chart elements. More substantial than startup, but not enterprise-level. Transparent background.`
  },

  'pricing-enterprise': {
    priority: 3,
    filename: 'pricing-enterprise.png',
    outputPath: 'pricing/pricing-enterprise.png',
    dimensions: { width: 400, height: 300 },
    prompt: `An illustration representing enterprise tier. A skyline of buildings or large organizational structure, protected by a comprehensive, multi-layered shield system in full purple/indigo gradient. Premium materials: gold accents, crystalline structures. Compliance badges orbiting. The most impressive of the three. Suggests scale, security, and premium service. Transparent background.`
  },

  // PRIORITY 3 - Trust Badges
  'badge-soc2': {
    priority: 3,
    filename: 'badge-soc2.png',
    outputPath: 'badges/badge-soc2.png',
    dimensions: { width: 150, height: 150 },
    prompt: `A premium SOC 2 compliance badge. Circular seal design with "SOC 2" text area. Shield icon in center. Brushed metal and glass materials. Indigo and gold colors. Professional certification aesthetic. Transparent background.`
  },

  'badge-hipaa': {
    priority: 3,
    filename: 'badge-hipaa.png',
    outputPath: 'badges/badge-hipaa.png',
    dimensions: { width: 150, height: 150 },
    prompt: `A premium HIPAA compliance badge. Circular seal design with medical cross integrated. "HIPAA" text area. Shield protecting a heart or medical symbol. Blue and white with gold accents. Healthcare trustworthy aesthetic. Transparent background.`
  },

  'badge-gdpr': {
    priority: 3,
    filename: 'badge-gdpr.png',
    outputPath: 'badges/badge-gdpr.png',
    dimensions: { width: 150, height: 150 },
    prompt: `A premium GDPR compliance badge. Circular seal with EU stars motif subtly integrated. Shield protecting a user/person icon. "GDPR" text area. Blue and gold, European institutional aesthetic. Transparent background.`
  },

  // PRIORITY 3 - Other
  'contact-hero': {
    priority: 3,
    filename: 'contact-hero.png',
    outputPath: 'contact-hero.png',
    dimensions: { width: 800, height: 600 },
    prompt: `An inviting visualization for a contact/demo page. Two stylized figures (abstract, not realistic) connected by a glowing line representing communication. One figure represents the customer (blue), one represents the ZeroShare team (purple). Between them: a glowing handshake or connection point. Subtle shield and security elements in background. Warm, trustworthy, human. The style says "we're here to help". Light background, welcoming but professional.`
  },

  'hero-shield-3d': {
    priority: 3,
    filename: 'hero-shield-3d.png',
    outputPath: 'hero/hero-shield-3d.png',
    dimensions: { width: 800, height: 800 },
    prompt: `A sophisticated 3D rendered shield icon made of translucent glass and glowing energy. The shield has geometric facets like a cut diamond, with an indigo (#667eea) to purple (#764ba2) gradient core. Subtle holographic reflections. Small streams of light data pass through the shield, being filtered and protected. Floating in space with soft ambient occlusion shadow. Ultra-clean, minimalist tech aesthetic. No background (transparent). Studio lighting, product render quality.`
  },

  'request-intercept': {
    priority: 3,
    filename: 'request-intercept.png',
    outputPath: 'architecture/request-intercept.png',
    dimensions: { width: 1000, height: 500 },
    prompt: `An elegant visualization of AI request interception. A translucent tunnel or pipeline made of light grid lines. Data packets (glowing cubes) traveling through. At the center, a scanning zone with purple light rays examining each packet. Some packets glow red (containing PII) and are diverted. Others glow green (clean) and continue through. The style is futuristic but professional - like a high-end cybersecurity firm's marketing. Subtle particle effects. Dark background with the pipeline being the light source. 8K quality render.`
  },

  'docs-deployment-arch': {
    priority: 3,
    filename: 'docs-deployment-arch.png',
    outputPath: 'docs/docs-deployment-arch.png',
    dimensions: { width: 1400, height: 800 },
    prompt: `A clean technical architecture diagram for documentation. Shows: VPC boundary containing ZeroShare Gateway container, connected to external AI APIs, internal applications, and logging/monitoring systems. Uses standard cloud architecture iconography but with premium styling. Color-coded: internal = blue, gateway = purple, external = gray, security elements = indigo. White background, clean lines, professional technical documentation quality.`
  },

  'docs-request-flow': {
    priority: 3,
    filename: 'docs-request-flow.png',
    outputPath: 'docs/docs-request-flow.png',
    dimensions: { width: 1200, height: 600 },
    prompt: `A sequence diagram showing request flow. Vertical swimlanes for: User, Application, ZeroShare Gateway, AI Service. Arrows showing request flow with numbered steps. At the gateway: a decision diamond showing "PII Detected?" with Yes (block/redact) and No (forward) paths. Clean UML-inspired but modernized style. Indigo/purple accents. White background, professional documentation quality.`
  },
};

// Initialize Google GenAI client
function getClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GOOGLE_API_KEY environment variable not set');
    console.error('   Set it with: export GOOGLE_API_KEY=your_api_key');
    process.exit(1);
  }
  return new GoogleGenAI({ apiKey });
}

// Ensure output directories exist
function ensureDirectories() {
  const dirs = [
    'hero', 'icons', 'architecture', 'industries', 
    'blog', 'pricing', 'badges', 'docs'
  ];
  
  for (const dir of dirs) {
    const fullPath = path.join(OUTPUT_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created directory: ${fullPath}`);
    }
  }
}

// Generate a single image
async function generateImage(client, name, config) {
  console.log(`\n🎨 Generating: ${name}`);
  console.log(`   Dimensions: ${config.dimensions.width}x${config.dimensions.height}`);
  console.log(`   Output: ${config.outputPath}`);
  
  try {
    // Using Nano Banana (Gemini with image generation)
    // The prompt needs to explicitly request image generation
    const imagePrompt = `Generate an image: ${config.prompt}`;
    
    const response = await client.models.generateContent({
      model: MODEL,
      contents: imagePrompt,
      generationConfig: {
        responseModalities: ['image', 'text'],
      }
    });

    // Debug: show full response structure
    if (process.env.DEBUG) {
      console.log(`   DEBUG Response:`, JSON.stringify(response, null, 2));
    }

    // Try multiple ways to extract image data
    const candidates = response.response?.candidates || response.candidates || [];
    let imageData = null;
    let mimeType = 'image/png';

    for (const candidate of candidates) {
      const parts = candidate.content?.parts || candidate.parts || [];
      for (const part of parts) {
        // Check for inline data
        if (part.inlineData?.data) {
          imageData = part.inlineData.data;
          mimeType = part.inlineData.mimeType || 'image/png';
          break;
        }
        // Check for image field directly
        if (part.image?.imageBytes) {
          imageData = part.image.imageBytes;
          break;
        }
        // Check for fileData
        if (part.fileData?.fileUri) {
          console.log(`   📎 File URI: ${part.fileData.fileUri}`);
        }
      }
      if (imageData) break;
    }
    
    if (imageData) {
      const outputPath = config.outputPath.includes('/') 
        ? path.join(OUTPUT_DIR, config.outputPath)
        : path.join(__dirname, '..', 'public', config.outputPath);
      
      const imageBuffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`   ✅ Saved: ${outputPath} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);
      return true;
    } else {
      // Check if there's text response (model might have refused)
      const textParts = candidates[0]?.content?.parts?.filter(p => p.text) || [];
      if (textParts.length > 0) {
        console.log(`   ⚠️  Model returned text instead of image:`);
        console.log(`   "${textParts[0].text.slice(0, 200)}..."`);
      } else {
        console.log(`   ⚠️  No image data in response`);
        console.log(`   Response keys:`, Object.keys(response || {}));
      }
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    if (process.env.DEBUG) {
      console.error(error);
    }
    return false;
  }
}

// Alternative: Use Imagen model
async function generateImageWithImagen(client, name, config) {
  console.log(`\n🎨 Generating with Imagen: ${name}`);
  
  try {
    const response = await client.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: config.prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: config.dimensions.width > config.dimensions.height ? '16:9' : '1:1',
      }
    });

    if (response.generatedImages?.[0]?.image?.imageBytes) {
      const outputPath = config.outputPath.includes('/') 
        ? path.join(OUTPUT_DIR, config.outputPath)
        : path.join(__dirname, '..', 'public', config.outputPath);
      
      const imageBuffer = Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`   ✅ Saved: ${outputPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

// List all images
function listImages() {
  console.log('\n📋 Available Images:\n');
  
  const byPriority = { 1: [], 2: [], 3: [] };
  for (const [name, config] of Object.entries(IMAGE_PROMPTS)) {
    byPriority[config.priority].push({ name, ...config });
  }
  
  for (const priority of [1, 2, 3]) {
    const label = priority === 1 ? 'Immediate Impact' : priority === 2 ? 'High Value' : 'Polish';
    console.log(`\n🎯 Priority ${priority} - ${label}:`);
    for (const img of byPriority[priority]) {
      console.log(`   ${img.name.padEnd(25)} ${img.dimensions.width}x${img.dimensions.height}  → ${img.outputPath}`);
    }
  }
  
  console.log(`\n📊 Total: ${Object.keys(IMAGE_PROMPTS).length} images`);
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  // Handle --list flag
  if (args.includes('--list')) {
    listImages();
    return;
  }
  
  // Parse arguments
  let priority = null;
  let singleImage = null;
  let useImagen = args.includes('--imagen');
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--priority' && args[i + 1]) {
      priority = args[i + 1] === 'all' ? null : parseInt(args[i + 1]);
    }
    if (args[i] === '--image' && args[i + 1]) {
      singleImage = args[i + 1];
    }
  }
  
  console.log('🖼️  ZeroShare Image Generator');
  console.log('============================\n');
  console.log(`Model: ${useImagen ? 'imagen-4.0-generate-001' : MODEL}`);
  
  const client = getClient();
  ensureDirectories();
  
  // Filter images to generate
  let imagesToGenerate = Object.entries(IMAGE_PROMPTS);
  
  if (singleImage) {
    imagesToGenerate = imagesToGenerate.filter(([name]) => name === singleImage);
    if (imagesToGenerate.length === 0) {
      console.error(`❌ Image not found: ${singleImage}`);
      console.error('   Use --list to see available images');
      process.exit(1);
    }
  } else if (priority) {
    imagesToGenerate = imagesToGenerate.filter(([_, config]) => config.priority === priority);
  }
  
  console.log(`\n📦 Generating ${imagesToGenerate.length} image(s)...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const [name, config] of imagesToGenerate) {
    const generateFn = useImagen ? generateImageWithImagen : generateImage;
    const result = await generateFn(client, name, config);
    
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    // Rate limiting - wait between requests
    if (imagesToGenerate.length > 1) {
      console.log('   ⏳ Waiting 2s before next image...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log('\n============================');
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('============================\n');
}

main().catch(console.error);
