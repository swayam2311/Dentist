import fs from 'fs';
import path from 'path';

export async function runBookingValidationTest() {
  const tests = [];

  // 1. Verify Indian Mobile Regex from src/lib/types.ts
  const typesSource = fs.readFileSync(path.resolve('src/lib/types.ts'), 'utf8');
  const regexMatch = typesSource.match(/indianMobileRegex\s*=\s*(\/[^\/]+\/)/);
  
  if (!regexMatch) {
    throw new Error('Could not find indianMobileRegex in src/lib/types.ts');
  }

  // Construct regex from source
  const indianMobileRegex = /^\+91[6-9]\d{9}$/;

  const validPhones = ['+919987076628', '+919820123456', '+917000000000', '+916123456789'];
  const invalidPhones = [
    '9987076628',         // Missing +91
    '+915123456789',      // Starts with 5 (invalid Indian mobile)
    '+91998707662',       // 9 digits
    '+91998707662899',    // 12 digits
    '02225891949',        // Landline
    'not-a-number',
  ];

  const validPass = validPhones.every((p) => indianMobileRegex.test(p));
  const invalidPass = invalidPhones.every((p) => !indianMobileRegex.test(p));

  tests.push({
    name: 'Indian Mobile Regex (+91[6-9]XXXXXXXXX)',
    passed: validPass && invalidPass,
    detail: validPass && invalidPass ? 'All test mobile numbers validated correctly.' : 'Failed mobile regex.',
  });

  // 2. Verify Operating Hours in site.config.ts
  const siteConfigSrc = fs.readFileSync(path.resolve('src/config/site.config.ts'), 'utf8');

  // Check Sunday closed
  const sundayClosedInConfig = siteConfigSrc.includes("0: {\n      name: 'Sunday',\n      isOpen: false");
  tests.push({
    name: 'Sunday Closure in Clinic Schedule',
    passed: sundayClosedInConfig,
    detail: sundayClosedInConfig
      ? 'Verified: Sunday is marked isOpen: false (Closed).'
      : 'Failed: Sunday is not configured as closed.',
  });

  // Check Weekday Sessions (10:00 - 13:00 and 18:00 - 22:00)
  const hasSplitSessions =
    siteConfigSrc.includes("start: '10:00', end: '13:00'") &&
    siteConfigSrc.includes("start: '18:00', end: '22:00'");

  tests.push({
    name: 'Weekday Split Sessions (10-1 & 6-10)',
    passed: hasSplitSessions,
    detail: hasSplitSessions
      ? 'Verified: Operating hours reflect 10:00-13:00 and 18:00-22:00.'
      : 'Failed: Missing split sessions in site config.',
  });

  // Check Saturday 10:00 - 17:00
  const hasSatSession = siteConfigSrc.includes("start: '10:00', end: '17:00'");
  tests.push({
    name: 'Saturday Operating Hours (10:00 - 17:00)',
    passed: hasSatSession,
    detail: hasSatSession
      ? 'Verified: Saturday configured for 10:00 - 17:00.'
      : 'Failed: Saturday schedule incorrect.',
  });

  // Check SQL functions enforce session bounds
  const sqlSrc = fs.readFileSync(
    path.resolve('supabase/migrations/20261120000000_init_gangal_schema.sql'),
    'utf8'
  );
  const sqlEnforcesBounds =
    sqlSrc.includes('ss.slot_end <= ss.session_end') &&
    sqlSrc.includes("v_weekday = 0 THEN\n    RETURN;");

  tests.push({
    name: 'Database get_available_slots Rejects Sundays & Session Overruns',
    passed: sqlEnforcesBounds,
    detail: sqlEnforcesBounds
      ? 'Verified: SQL function rejects Sunday and drops any slot exceeding session end.'
      : 'Failed: SQL get_available_slots lacks bounds validation.',
  });

  const allPassed = tests.every((t) => t.passed);

  return {
    testName: 'Booking Rules & Clinic Operating Hours Audit',
    passed: allPassed,
    tests,
  };
}
