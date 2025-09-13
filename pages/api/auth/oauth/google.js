import { supabase } from '../../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
    // Supabase will redirect; but signInWithOAuth here returns a url in data
    // If data.url exists, redirect there
    const redirectTo = data?.url || '/'
    res.writeHead(302, { Location: redirectTo })
    return res.end()
  } catch (err) {
    return res.status(400).json({ error: err.message || String(err) })
  }
}
