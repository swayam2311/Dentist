import fs from 'fs';
import path from 'path';

export async function runContentAuditTest() {
  const violations = [];
  const srcDir = path.resolve('src');

  // Forbidden unverified strings from Section 3
  const forbiddenPatterns = [
    { pattern: /MDS\s*Prosthodontics/i, label: 'MDS Prosthodontics' },
    { pattern: /Fellow\s*ICOI/i, label: 'Fellow ICOI' },
    { pattern: /ISPPD\s*Certified/i, label: 'ISPPD Certified' },
    { pattern: /34\s*combined\s*years/i, label: '34 combined years' },
    { pattern: /6\+\s*years\s*with\s*Gangal/i, label: '6+ years with Gangal' },
    { pattern: /3,400\+\s*patients/i, label: '3,400+ patients' },
    { pattern: /68%\s*of\s*first-timers/i, label: '68% of first-timers' },
    { pattern: /94%\s*don't\s*feel/i, label: "94% don't feel anaesthetic" },
    { pattern: /24\/7\s*post-op\s*support/i, label: '24/7 post-op support' },
    { pattern: /Dr\.\s*Gangal\s*&\s*Partners/i, label: 'Dr. Gangal & Partners' },
    { pattern: /Grade\s*IV\s*titanium/i, label: 'Grade IV titanium' },
    { pattern: /computer-guided\s*0\.1mm/i, label: 'computer-guided 0.1mm' },
    { pattern: /strawberry\s*numbing\s*gel/i, label: 'strawberry numbing gel' },
    { pattern: /no\s*impression\s*pastes\s*ever/i, label: 'no impression pastes ever' },
    { pattern: /ultrasonic\s*micro-vibrations/i, label: 'ultrasonic micro-vibrations' },
    { pattern: /3D\s*optical\s*wand/i, label: '3D optical wand' },
    { pattern: /zero\s*pain/i, label: 'zero pain (absolute claim)' },
    { pattern: /zero\s*enamel\s*sensitivity/i, label: 'zero enamel sensitivity (absolute claim)' },
    { pattern: /lifetime\s*durability/i, label: 'lifetime durability (absolute claim)' },
    { pattern: /zero\s*residual\s*pain/i, label: 'zero residual pain (absolute claim)' },
    { pattern: /They\s*walked\s*me\s*through\s*every\s*micro-step/i, label: "Invented addition to Asmita's review" },
    { pattern: /lh3\.googleusercontent\.com\/aida-public/i, label: 'Hotlinked AI face imagery' },
  ];

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const item of forbiddenPatterns) {
          if (item.pattern.test(content)) {
            violations.push({
              file: fullPath,
              label: item.label,
              message: `Public component contains forbidden unverified claim or AI image: "${item.label}"`,
            });
          }
        }
      }
    }
  }

  scanDirectory(srcDir);

  return {
    testName: 'Section 3 Unverified Claims & Medical Ethics Audit',
    passed: violations.length === 0,
    violations,
  };
}

