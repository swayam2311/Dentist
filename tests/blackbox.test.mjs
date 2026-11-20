import fs from 'fs';
import path from 'path';

export async function runBlackBoxTests() {
  console.log('\n--- EXECUTING BLACK-BOX FUNCTIONAL & SYSTEM METRIC TESTS ---');
  const results = [];

  // 1. Route Completeness Check
  const requiredRoutes = [
    'src/app/page.tsx',
    'src/app/treatments/page.tsx',
    'src/app/treatments/[slug]/page.tsx',
    'src/app/our-team/page.tsx',
    'src/app/new-patients/page.tsx',
    'src/app/stories/page.tsx',
    'src/app/contact/page.tsx',
    'src/app/book/page.tsx',
    'src/app/book/confirmed/page.tsx',
    'src/app/admin/page.tsx',
    'src/app/privacy/page.tsx',
    'src/app/terms/page.tsx',
    'src/app/api/slots/route.ts',
    'src/app/api/appointments/route.ts',
    'src/app/api/contact/route.ts',
    'src/app/api/appointments/status/route.ts',
  ];

  const missingRoutes = requiredRoutes.filter((r) => !fs.existsSync(path.resolve(r)));
  results.push({
    name: 'All 16 application routes and API endpoints exist',
    passed: missingRoutes.length === 0,
    detail: missingRoutes.length ? `Missing: ${missingRoutes.join(', ')}` : 'All routes present.',
  });

  // 2. Zero Dead Links Check (Zero href="#")
  let deadLinksCount = 0;
  function scanDeadLinks(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDeadLinks(full);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const content = fs.readFileSync(full, 'utf8');
        const matches = content.match(/href=["']#["']/g);
        if (matches) deadLinksCount += matches.length;
      }
    }
  }
  scanDeadLinks(path.resolve('src/app'));
  scanDeadLinks(path.resolve('src/components'));

  results.push({
    name: 'Zero dead href="#" links across all components and pages',
    passed: deadLinksCount === 0,
    detail: `Found ${deadLinksCount} dead href="#" links`,
  });

  // 3. Telephony & Coordinates Verification
  const siteConfigRaw = fs.readFileSync(path.resolve('src/config/site.config.ts'), 'utf8');
  const hasLandline = siteConfigRaw.includes('022 25891949');
  const hasMobile = siteConfigRaw.includes('+91 99870 76628');
  const hasWhatsApp = siteConfigRaw.includes('https://wa.me/919987076628');
  const hasPincode = siteConfigRaw.includes('400610');
  const hasMapsUrl = siteConfigRaw.includes('https://maps.app.goo.gl/HdnbPPQoGewQZzfp7');

  results.push({
    name: 'Verified clinic coordinates (022 25891949, +91 99870 76628, wa.me/919987076628, 400610, Maps)',
    passed: hasLandline && hasMobile && hasWhatsApp && hasPincode && hasMapsUrl,
  });

  // 4. Design System CSS Keyframes & Default Theme Verification
  const globalsCss = fs.readFileSync(path.resolve('src/styles/globals.css'), 'utf8');
  const hasKeyframes =
    globalsCss.includes('@keyframes gentleFloat') &&
    globalsCss.includes('@keyframes calmBreathing') &&
    globalsCss.includes('@keyframes ambientDrift') &&
    globalsCss.includes('@keyframes toothPulse') &&
    globalsCss.includes('@keyframes dash') &&
    globalsCss.includes('@keyframes check');

  const defaultThemeIsAqua =
    globalsCss.includes(':root') &&
    globalsCss.includes('--bg-surface: #edfcff;') &&
    globalsCss.includes('--color-primary: #005255;');

  results.push({
    name: 'CSS globals define all 6 Stitch animations and default Aqua theme tokens',
    passed: hasKeyframes && defaultThemeIsAqua,
  });

  // 5. Image Domain Whitelisting
  const nextConfig = fs.readFileSync(path.resolve('next.config.js'), 'utf8');
  const allowsGoogleCdn = nextConfig.includes('lh3.googleusercontent.com');

  results.push({
    name: 'Next.js configuration whitelists Google CDN image domains',
    passed: allowsGoogleCdn,
  });

  // 6. Schema.org JSON-LD Verification
  const layout = fs.readFileSync(path.resolve('src/app/layout.tsx'), 'utf8');
  const hasJsonLd =
    layout.includes('application/ld+json') &&
    layout.includes('MedicalBusiness') &&
    layout.includes('Dentist') &&
    (layout.includes('400610') || layout.includes('siteConfig.address.pincode'));

  results.push({
    name: 'Layout embeds Schema.org Dentist / MedicalBusiness JSON-LD',
    passed: hasJsonLd,
  });

  const allPassed = results.every((r) => r.passed);
  for (const r of results) {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
  }

  return { testName: 'Black-Box Functional & Quality Metrics Test', passed: allPassed, results };
}

if (process.argv[1]?.includes('blackbox.test.mjs')) {
  runBlackBoxTests().then((res) => {
    if (!res.passed) process.exit(1);
  });
}
