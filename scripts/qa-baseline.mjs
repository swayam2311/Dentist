import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { width: 320, height: 640, name: '320' },
  { width: 375, height: 667, name: '375' },
  { width: 414, height: 896, name: '414' },
  { width: 768, height: 1024, name: '768' },
  { width: 1024, height: 768, name: '1024' },
  { width: 1280, height: 800, name: '1280' },
  { width: 1440, height: 900, name: '1440' },
];

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/treatments', name: 'treatments' },
  { path: '/treatments/invisalign', name: 'treatment-invisalign' },
  { path: '/our-team', name: 'our-team' },
  { path: '/new-patients', name: 'new-patients' },
  { path: '/stories', name: 'stories' },
  { path: '/contact', name: 'contact' },
  { path: '/book', name: 'book' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve('qa/baseline');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Users\\Swayam\\AppData\\Local\\ms-playwright\\chromium-1255\\chrome-win64\\chrome.exe';

async function run() {
  console.log(`Starting QA Baseline audit against ${BASE_URL}...`);
  const launchOptions = { headless: true };
  if (fs.existsSync(CHROME_PATH)) {
    launchOptions.executablePath = CHROME_PATH;
  }
  const browser = await chromium.launch(launchOptions);
  const axeResults = {};

  for (const route of ROUTES) {
    console.log(`\nAuditing route: ${route.path}`);
    axeResults[route.name] = { violations: [] };

    // Run Axe on desktop viewport (1280px)
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      // Give animations and fonts a moment to settle
      await page.waitForTimeout(1000);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      axeResults[route.name].violations = accessibilityScanResults.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        nodesCount: v.nodes.length,
      }));
      console.log(`  [Axe] Found ${accessibilityScanResults.violations.length} violations on ${route.path}`);
    } catch (e) {
      console.error(`  [Axe Error] ${route.path}:`, e.message);
    } finally {
      await context.close();
    }

    // Capture screenshots at each viewport
    for (const vp of VIEWPORTS) {
      const vpContext = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.width < 768,
      });
      const vpPage = await vpContext.newPage();
      try {
        await vpPage.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
        await vpPage.waitForTimeout(800);
        const screenshotPath = path.join(OUT_DIR, `${route.name}-${vp.name}px.png`);
        await vpPage.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  [Screenshot] ${route.name} @ ${vp.name}px -> ${path.basename(screenshotPath)}`);
      } catch (e) {
        console.error(`  [Screenshot Error] ${route.name} @ ${vp.name}px:`, e.message);
      } finally {
        await vpContext.close();
      }
    }
  }

  await browser.close();

  // Save Axe results summary
  const axeSummaryPath = path.join(OUT_DIR, 'axe-baseline-summary.json');
  fs.writeFileSync(axeSummaryPath, JSON.stringify(axeResults, null, 2));
  console.log(`\nAxe baseline summary written to: ${axeSummaryPath}`);
  console.log('Baseline run complete!');
}

run().catch((err) => {
  console.error('Baseline execution failed:', err);
  process.exit(1);
});
