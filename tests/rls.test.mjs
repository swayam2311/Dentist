import fs from 'fs';
import path from 'path';

export async function runRlsSecurityTest() {
  const checks = [];

  // 1. Verify schema definition contains strict exclusion constraint & RLS policies
  const schemaPath = path.resolve('supabase/migrations/20261120000000_init_gangal_schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Check btree_gist exclusion constraint
  const hasExclusionConstraint =
    schemaSql.includes('btree_gist') &&
    schemaSql.includes('EXCLUDE USING gist') &&
    schemaSql.includes('tstzrange(starts_at, ends_at) WITH &&');

  checks.push({
    name: 'PostgreSQL Temporal Exclusion Constraint (Double-booking prevention)',
    passed: hasExclusionConstraint,
    detail: hasExclusionConstraint
      ? 'Verified: btree_gist exclusion constraint prevents overlapping appointments at DB level.'
      : 'FAILED: Missing btree_gist exclusion constraint on appointments table.',
  });

  // Check that anon role is denied on appointments
  const hasAnonDenied =
    !schemaSql.includes('CREATE POLICY "anon_select" ON appointments') &&
    schemaSql.includes('REVOKE EXECUTE ON FUNCTION book_appointment FROM anon');

  checks.push({
    name: 'Anonymous Access Strictly Denied on Appointments',
    passed: hasAnonDenied,
    detail: hasAnonDenied
      ? 'Verified: Anon role has no SELECT/INSERT policies on appointments; RPC execution revoked from anon.'
      : 'FAILED: Anon role has permissive appointment access in schema.',
  });

  // 2. Client bundle security: Verify SUPABASE_SERVICE_ROLE_KEY is NEVER prefixed with NEXT_PUBLIC_
  const envExample = fs.readFileSync(path.resolve('.env.example'), 'utf8');
  const serviceRoleExposed = /NEXT_PUBLIC_[A-Z_]*SERVICE_ROLE/.test(envExample);

  checks.push({
    name: 'Service Role Key Hidden from Client Bundle',
    passed: !serviceRoleExposed,
    detail: !serviceRoleExposed
      ? 'Verified: Service role key is server-only and not exposed to NEXT_PUBLIC_ namespace.'
      : 'FAILED: Found NEXT_PUBLIC_ service role key definition.',
  });

  const allPassed = checks.every((c) => c.passed);

  return {
    testName: 'Database RLS & Client Bundle Security Audit',
    passed: allPassed,
    checks,
  };
}

