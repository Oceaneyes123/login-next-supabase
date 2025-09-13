import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    // Redirect to dashboard after sign in (client will hold session in cookies)
    res.writeHead(302, { Location: '/dashboard' })
    return res.end()
  } catch (err) {
    return res.status(400).json({ error: err.message || String(err) })
  }
}
