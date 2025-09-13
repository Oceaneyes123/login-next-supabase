import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // create a Supabase client that's bound to the incoming request/response
  // this helper will set the session cookies on successful sign-in
  const supabase = createServerSupabaseClient({ req, res })
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    // If Supabase returns a session, the helper already set cookies.
    // Redirect the browser to the protected dashboard.
    const redirectTo = data?.session ? '/dashboard' : (data?.url || '/dashboard')
    res.writeHead(302, { Location: redirectTo })
    return res.end()
  } catch (err) {
    return res.status(400).json({ error: err.message || String(err) })
  }
}
