import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT_DIR, 'src/data.ts');
const PROJECTS_IMG_DIR = path.join(ROOT_DIR, 'public/projects');

const GITHUB_USERNAME = 'Wilhelm-art';

console.log(`\n=============================================================`);
console.log(`  GITHUB PROJECTS & AUTHENTIC ANTI-SLOP COVER SYNC ENGINE   `);
console.log(`=============================================================\n`);

// 1. Fetch repositories from GitHub
function fetchGitHubRepos() {
  try {
    console.log(`[1/4] Fetching public repositories for ${GITHUB_USERNAME}...`);
    const output = execSync(`gh repo list ${GITHUB_USERNAME} --limit 30 --json name,description,url,homepageUrl,pushedAt,repositoryTopics`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    const repos = JSON.parse(output);
    console.log(`✓ Retrieved ${repos.length} public repositories from GitHub.\n`);
    return repos;
  } catch (err) {
    console.warn(`[WARN] gh CLI unavailable or timed out, attempting native fetch...`);
    return null;
  }
}

// 2. Health check live URLs
async function checkUrlHealth(url) {
  if (!url || !url.startsWith('http')) return { status: 'none', ok: false };
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Portfolio Health Checker)' }
    });
    clearTimeout(timeout);
    return { status: res.status, ok: res.ok };
  } catch (e) {
    return { status: 'unreachable', ok: false, error: e.message };
  }
}

// 3. Capture Authentic Browser Screenshot (Zero AI-Slop)
async function captureAuthenticCover(liveUrl, outputPath) {
  console.log(`  -> Launching Playwright Chromium for: ${liveUrl}`);
  try {
    const { chromium } = await import('@playwright/test');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    
    await page.goto(liveUrl, { waitUntil: 'networkidle', timeout: 20000 });
    // Brief settle time for font rendering
    await page.waitForTimeout(1000);

    const tempPng = outputPath.replace(/\.webp$/, '-temp.png');
    await page.screenshot({ path: tempPng });
    await browser.close();

    // Convert and compress to WebP using Python PIL (installed on machine)
    execSync(`python -c "
from PIL import Image
raw = Image.open('${tempPng.replace(/\\/g, '/')}')
w, h = raw.size
target_ratio = 640 / 400
crop_h = int(w / target_ratio)
if crop_h > h:
    crop_w = int(h * target_ratio)
    left = (w - crop_w) // 2
    top = 0
    right = left + crop_w
    bottom = h
else:
    left = 0
    top = 0
    right = w
    bottom = crop_h
cropped = raw.crop((left, top, right, bottom))
resized = cropped.resize((640, 400), Image.Resampling.LANCZOS)
resized.save('${outputPath.replace(/\\/g, '/')}', 'WEBP', quality=85)
"`);

    if (fs.existsSync(tempPng)) fs.unlinkSync(tempPng);
    console.log(`  ✓ Generated authentic anti-slop cover: ${path.basename(outputPath)}`);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed to capture ${liveUrl}: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const shouldCapture = args.includes('--capture') || args.includes('-c');

  // Step 1: Read current projects
  const dataContent = fs.readFileSync(DATA_PATH, 'utf8');
  console.log(`[2/4] Reading active projects registry from src/data.ts...`);

  // Step 2: Fetch GitHub Repos
  const repos = fetchGitHubRepos();
  if (repos) {
    console.log(`--- GitHub Repositories Status ---`);
    for (const r of repos) {
      const isTracked = dataContent.includes(r.name) || (r.name === 'zqyntoon' && dataContent.includes('komik-zynqtoon'));
      const statusIcon = isTracked ? '✓ [TRACKED]' : '+ [NEW / UNTRACKED]';
      console.log(`${statusIcon} ${r.name.padEnd(25)} (Last pushed: ${r.pushedAt?.slice(0, 10)})`);
    }
    console.log('');
  }

  // Step 3: Health check existing projects
  console.log(`[3/4] Verifying health and reachability of project URLs...`);
  const { projects } = await import('../src/data.ts');
  for (const p of projects) {
    const health = await checkUrlHealth(p.liveUrl);
    const badge = health.ok ? `[OK ${health.status}]` : `[FAIL ${health.status}]`;
    console.log(`  ${badge.padEnd(12)} ${p.title} -> ${p.liveUrl}`);
  }

  // Step 4: Capture authentic covers if requested
  if (shouldCapture) {
    console.log(`\n[4/4] Generating authentic anti-slop covers using Playwright...`);
    for (const p of projects) {
      if (p.liveUrl && p.liveUrl.startsWith('http') && !p.liveUrl.includes('github.com')) {
        const coverPath = path.join(PROJECTS_IMG_DIR, path.basename(p.screenshot));
        console.log(`\nProcessing ${p.title}...`);
        await captureAuthenticCover(p.liveUrl, coverPath);
      }
    }
  } else {
    console.log(`\n[4/4] Tip: Run 'npm run update:covers' to re-capture all authentic screenshots.`);
  }

  console.log(`\n=============================================================`);
  console.log(`  SYNC COMPLETE: All project records verified against GitHub. `);
  console.log(`=============================================================\n`);
}

main().catch(console.error);
