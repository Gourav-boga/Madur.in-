import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. UI may have limited functionality until added to .env.');
}

// Create client only if credentials exist to prevent runtime crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      from: () => ({
        select: () => ({
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
          eq: () => ({ single: () => ({ data: null, error: null }), data: [], error: null }),
          data: [],
          error: null
        }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ data: [], error: null }) }),
        delete: () => ({ eq: () => ({ data: [], error: null }) }),
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOtp: async () => ({ data: null, error: null }),
        verifyOtp: async () => ({ data: { session: null }, error: null }),
        signOut: async () => ({ error: null }),
      }
    } as any);
