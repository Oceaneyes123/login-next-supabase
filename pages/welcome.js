import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Welcome() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        router.replace('/')
        return
      }
      setUser(data.user)
      setLoading(false)
    }
    init()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) return <div className="app-shell">Loading…</div>

  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'there'

  return (
    <div className="app-shell">
      <Head>
        <title>Welcome — ModernAuth</title>
      </Head>
      <div className="bg-white p-8 rounded shadow max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold">Hi {name} 👋</h2>
        <p className="mt-2 text-slate-600">Welcome back — this is your personalized page.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={signOut} className="px-4 py-2 rounded border">Sign out</button>
        </div>
      </div>
    </div>
  )
}
