import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthForm from '../components/AuthForm'
import { supabase } from '../lib/supabaseClient'

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
    <div className="app-shell">
      <Head>
        <title>Sign in — ModernAuth</title>
        <meta name="description" content="Sign in or sign up using email or Google" />
      </Head>
      <div className="w-full max-w-3xl p-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold">Welcome to ModernAuth</h1>
          <p className="text-slate-600 mt-2">Sign up or sign in to see your personalized welcome page.</p>
        </header>

        <main className="flex flex-col items-center gap-6">
          <AuthForm onLogin={() => router.replace('/welcome')} />
        </main>
      </div>
    </div>
  )
}
