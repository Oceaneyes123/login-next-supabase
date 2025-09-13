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

  if (loading) return <div className="app-shell">Loading5</div>

  return (
    <AuthForm onLogin={() => router.replace('/welcome')} />
  )
}
