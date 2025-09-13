import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for a confirmation link.')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError

        // ensure the session/user is loaded before proceeding
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        if (!userData?.user) throw new Error('Unable to get user after sign-in')
        onLogin && onLogin()
      }
    } catch (err) {
      alert(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) throw error
      // OAuth will redirect to Supabase's flow; nothing more to do here.
    } catch (err) {
      alert(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow" role="region" aria-labelledby="auth-heading">
      <h2 className="text-2xl font-semibold mb-4">{isSignUp ? 'Create account' : 'Sign in'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
        </label>
        <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-primary text-white rounded focus:outline-none focus:ring-2 focus:ring-primary/50">{loading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Sign in')}</button>
      </form>

      <div className="mt-4">
        <button type="button" onClick={handleGoogle} className="w-full py-2 px-4 border rounded flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21.35 11.1h-9.2v2.8h5.2c-.25 1.3-1.1 2.4-2.35 3.1v2.6h3.8c2.2-2.05 3.6-5 3.6-8.6 0-.6-.05-1.2-.2-1.9z" fill="#4285F4"/>
            <path d="M12.15 22c2.55 0 4.7-.85 6.3-2.3l-3.8-2.6c-1.05.7-2.4 1.05-3.9 1.05-3 0-5.5-2-6.4-4.7H1.9v2.95C3.45 19.9 7.5 22 12.15 22z" fill="#34A853"/>
            <path d="M5.75 13.45c-.25-.75-.4-1.55-.4-2.45s.15-1.7.4-2.45V5.6H1.9A9.99 9.99 0 0 0 1 11c0 1.6.35 3.1.9 4.45l3.85-2z" fill="#FBBC05"/>
            <path d="M12.15 4.5c1.4 0 2.65.5 3.65 1.5l2.7-2.7C16.8 1.85 14.95 1 12.15 1 7.5 1 3.45 3.1 1.9 6.65l3.85 2.95c.85-2.7 3.4-4.7 6.4-4.7z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="mt-4 text-center">
        <button type="button" className="text-sm text-primary" onClick={() => setIsSignUp(s => !s)}>{isSignUp ? 'Have an account? Sign in' : "Don't have an account? Create one"}</button>
      </div>
    </div>
  )
}
