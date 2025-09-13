import '../styles/globals.css'
import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // basic event logging; pages can read from supabase.auth
    })
    return () => listener?.subscription?.unsubscribe()
  }, [])

  return <Component {...pageProps} />
}
