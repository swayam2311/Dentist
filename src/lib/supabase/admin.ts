import { createClient } from '@supabase/supabase-js';

// SERVER-ONLY SERVICE-ROLE CLIENT
// NEVER EXPOSE TO CLIENT BUNDLE
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    // When running without credentials, returns a mock/fallback client
    // so tests and builds succeed cleanly.
    return createClient(supabaseUrl, 'placeholder-service-key', {
      auth: { persistSession: false },
    });
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

