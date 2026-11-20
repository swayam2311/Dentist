import { runLinksTest } from '../tests/links.test.mjs';
import { runContentAuditTest } from '../tests/content.test.mjs';
import { runRlsSecurityTest } from '../tests/rls.test.mjs';
import { runBookingValidationTest } from '../tests/booking.test.mjs';

async function main() {
  console.log('===============================================================');
  console.log('GANGAL DENTAL CLINIC — ACCEPTANCE & VERIFICATION TEST SUITE');
  console.log('===============================================================\n');

  let totalFailed = 0;

  // 1. Link & Telephony Audit
  const linkResult = await runLinksTest();
  console.log(`[TEST 1] ${linkResult.testName}: ${linkResult.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!linkResult.passed) {
    totalFailed++;
    console.error('Issues:', linkResult.issues);
  }

  // 2. Content & Rule Zero Medical Ethics Audit
  const contentResult = await runContentAuditTest();
  console.log(`[TEST 2] ${contentResult.testName}: ${contentResult.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!contentResult.passed) {
    totalFailed++;
    console.error('Violations:', contentResult.violations);
  }

  // 3. Database RLS & Security Audit
  const rlsResult = await runRlsSecurityTest();
  console.log(`[TEST 3] ${rlsResult.testName}: ${rlsResult.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!rlsResult.passed) {
    totalFailed++;
    console.error('Checks:', rlsResult.checks);
  } else {
    for (const c of rlsResult.checks) {
      console.log(`  ✓ ${c.name}`);
    }
  }

  // 4. Booking Validation & Hours Test
  const bookingResult = await runBookingValidationTest();
  console.log(`[TEST 4] ${bookingResult.testName}: ${bookingResult.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!bookingResult.passed) {
    totalFailed++;
    console.error('Tests:', bookingResult.tests);
  } else {
    for (const t of bookingResult.tests) {
      console.log(`  ✓ ${t.name}`);
    }
  }

  console.log('\n---------------------------------------------------------------');
  if (totalFailed === 0) {
    console.log('ALL VERIFICATION & ACCEPTANCE TESTS PASSED (4/4) ✅');
    process.exit(0);
  } else {
    console.error(`FAILED: ${totalFailed} test suite(s) had errors. ❌`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});

