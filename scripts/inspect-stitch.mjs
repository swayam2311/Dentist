import fs from 'node:fs';
import path from 'node:path';

const stitchDir = path.resolve('stitch-export');
const dirs = fs.readdirSync(stitchDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('Found directories:', dirs);

const report = {};

for (const d of dirs) {
  const htmlPath = path.join(stitchDir, d, 'code.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => {
      const fullTag = m[0];
      const src = m[1];
      const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
      const dataAltMatch = fullTag.match(/data-alt=["']([^"']*)["']/i);
      const classMatch = fullTag.match(/class=["']([^"']*)["']/i);
      return {
        src,
        alt: altMatch ? altMatch[1] : '',
        dataAlt: dataAltMatch ? dataAltMatch[1] : '',
        className: classMatch ? classMatch[1] : ''
      };
    });
    
    // Check for inline styles / keyframes
    const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
    
    // Check fonts linked
    const fontMatches = [...html.matchAll(/fonts\.googleapis\.com[^\s"']+/gi)].map(m => m[0]);

    report[d] = {
      imageCount: imgMatches.length,
      images: imgMatches,
      stylesLength: styleMatches.join('\n').length,
      fonts: [...new Set(fontMatches)],
    };
  }
}

fs.writeFileSync('scripts/stitch-inspection.json', JSON.stringify(report, null, 2), 'utf8');
console.log('Inspection complete. Summary:');
for (const [k, v] of Object.entries(report)) {
  console.log(`\n=== ${k} ===`);
  console.log(`Images (${v.imageCount}):`);
  v.images.forEach(img => console.log(`  - ${img.src} | alt: ${img.alt || img.dataAlt}`));
  if (v.fonts.length) console.log(`  Fonts: ${v.fonts.join(', ')}`);
}

