import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const supabase = createServerSupabaseClient({ req, res })
  const { access_token, refresh_token, provider_token, expires_in, token_type } = req.body

  if (!access_token || !refresh_token) return res.status(400).json({ error: 'Missing tokens' })

  try {
    // Set the session on server side; this will set the HTTP-only cookies
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
      provider_token,
      expires_in: expires_in ? Number(expires_in) : undefined,
      token_type
    })
    if (error) throw error

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Exchange error', err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
