import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password, name } = req.body
  try {
    const { data, error } = await supabase.auth.signUp({ email, password }, { data: { full_name: name } })
    if (error) throw error

    // on the server we should also insert into profiles table if desired (client webhook or server hook is better)
    res.writeHead(302, { Location: '/' })
    return res.end()
  } catch (err) {
    return res.status(400).json({ error: err.message || String(err) })
  }
}
