"use client"
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

        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        if (!userData?.user) throw new Error('Unable to get user after sign-in')
        onLogin && onLogin()
      }
    } catch (err) {
      // keep errors user-friendly
      const message = err?.message || String(err)
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) throw error
    } catch (err) {
      alert(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section role="region" aria-labelledby="auth-heading">
      <h2 id="auth-heading" style={{position:'absolute', left:'-10000px', top:'auto', width:1, height:1, overflow:'hidden'}}>Authentication</h2>

      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <div>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="form-input"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="form-input"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-button"
          aria-disabled={loading}
        >
          {loading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Sign in')}
        </button>
      </form>

      <div className="divider" aria-hidden>
        <span>or</span>
      </div>

      <div>
        <button type="button" onClick={handleGoogle} className="social-button" aria-label="Continue with Google">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21.35 11.1h-9.2v2.8h5.2c-.25 1.3-1.1 2.4-2.35 3.1v2.6h3.8c2.2-2.05 3.6-5 3.6-8.6 0-.6-.05-1.2-.2-1.9z" fill="#4285F4"/>
            <path d="M12.15 22c2.55 0 4.7-.85 6.3-2.3l-3.8-2.6c-1.05.7-2.4 1.05-3.9 1.05-3 0-5.5-2-6.4-4.7H1.9v2.95C3.45 19.9 7.5 22 12.15 22z" fill="#34A853"/>
            <path d="M5.75 13.45c-.25-.75-.4-1.55-.4-2.45s.15-1.7.4-2.45V5.6H1.9A9.99 9.99 0 0 0 1 11c0 1.6.35 3.1.9 4.45l3.85-2z" fill="#FBBC05"/>
            <path d="M12.15 4.5c1.4 0 2.65.5 3.65 1.5l2.7-2.7C16.8 1.85 14.95 1 12.15 1 7.5 1 3.45 3.1 1.9 6.65l3.85 2.95c.85-2.7 3.4-4.7 6.4-4.7z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div style={{marginTop:16, textAlign:'center'}}>
        <button type="button" onClick={() => setIsSignUp(s => !s)} className="" style={{background:'none', border:'none', color:'rgba(255,255,255,0.8)', cursor:'pointer'}}>
          {isSignUp ? 'Have an account? Sign in' : "Don't have an account? Create one"}
        </button>
      </div>
    </section>
  )
}
