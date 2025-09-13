import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthForm from '../components/AuthForm'
import { supabase } from '../lib/supabaseClient'
import GlassShell from '../components/GlassShell'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) router.replace('/welcome')
      else setLoading(false)
    }
    check()
  }, [])

  if (loading) return <div className="app-shell">Loading…</div>

  return (
    <GlassShell title="Welcome Back" subtitle="Sign in to your account">
      <AuthForm onLogin={() => router.replace('/welcome')} />
    </GlassShell>
  )
}
