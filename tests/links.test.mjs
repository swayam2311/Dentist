import fs from 'fs';
import path from 'path';

export async function runLinksTest() {
  const issues = [];
  const srcDir = path.resolve('src');

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');

        // 1. Audit for dead href="#"
        if (/href=["']#["']/.test(content)) {
          issues.push({
            file: fullPath,
            rule: 'NO_DEAD_HREF_HASH',
            message: 'Found dead href="#" link.',
          });
        }

        // 2. Audit for wrong WhatsApp numbers from Stitch export
        const badWa = content.match(/wa\.me\/(9102225891949|912225891949|919820000000)/);
        if (badWa) {
          issues.push({
            file: fullPath,
            rule: 'NO_WRONG_WHATSAPP_NUMBER',
            message: `Found incorrect Stitch WhatsApp link: wa.me/${badWa[1]}`,
          });
        }

        // 3. Audit for wrong phone numbers
        const badTel = content.match(/tel:(9102225891949|919820000000)/);
        if (badTel) {
          issues.push({
            file: fullPath,
            rule: 'NO_WRONG_TEL_LINK',
            message: `Found incorrect telephone link: tel:${badTel[1]}`,
          });
        }
      }
    }
  }

  scanDirectory(srcDir);

  return {
    testName: 'Link & Telephony Integrity Audit',
    passed: issues.length === 0,
    issues,
  };
}

