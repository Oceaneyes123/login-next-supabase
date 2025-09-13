import { supabase } from '../../../../lib/supabaseClient'

export default async function handler(req, res) {
  // Accept GET and POST to make the endpoint easier to use from links or forms
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end()
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const redirectToAfter = siteUrl + '/dashboard'
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectToAfter },
    })
    if (error) throw error

    // data.url is the Supabase-hosted redirect URL for OAuth flow
    const redirectTo = data?.url || redirectToAfter
    res.writeHead(302, { Location: redirectTo })
    return res.end()
  } catch (err) {
    console.error('OAuth handler error:', err)
    return res.status(400).json({ error: err.message || String(err) })
  }
}
