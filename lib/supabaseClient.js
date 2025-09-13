import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create the Supabase client only in the browser or when env vars are available.
// This avoids throwing during Next.js build when env vars may not be set.
let supabase
if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey) {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
} else if (supabaseUrl && supabaseAnonKey) {
	// If env vars exist on the server at runtime, create a real client lazily.
	try {
		supabase = createClient(supabaseUrl, supabaseAnonKey)
	} catch (e) {
		// fallback to a minimal stub
		supabase = null
	}
} else {
	// Build-time fallback: expose a minimal stub to avoid exceptions during build.
	supabase = {
		auth: {
			onAuthStateChange: () => ({ subscription: { unsubscribe: () => {} } }),
			getUser: async () => ({ data: { user: null } }),
			signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
			signUp: async () => ({ error: new Error('Supabase not configured') }),
			signInWithOAuth: async () => ({ error: new Error('Supabase not configured') }),
			signOut: async () => ({ error: new Error('Supabase not configured') }),
		},
	}
}

export { supabase }
