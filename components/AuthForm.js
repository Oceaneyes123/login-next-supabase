"use client"
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import GlassShell from './GlassShell'

export default function AuthForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (isSignUp && password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      if (isSignUp) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        })
        if (!res.ok) {
          const body = await res.json().catch(()=>({ error: 'Unknown error' }))
          throw new Error(body.error || body.message || 'Registration failed')
        }
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
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassShell title={isSignUp ? 'Create Account' : 'Welcome back'} subtitle={isSignUp ? 'Join us today' : 'Sign in to your account'}>
      <form onSubmit={handleSubmit} className="relative z-2" aria-live="polite">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-6">
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            className="form-input"
            autoComplete="email"
          />
        </div>

        {isSignUp && (
          <div className="mb-6">
            <label className="sr-only" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              className="form-input"
              autoComplete="name"
            />
          </div>
        )}

        <div className="mb-6">
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

        {isSignUp && (
          <div className="mb-6">
            <label className="sr-only" htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              className="form-input"
              autoComplete="new-password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="login-button"
          aria-disabled={loading}
        >
          {loading ? (isSignUp ? 'Creating...' : 'Please wait...') : (isSignUp ? 'Create Account' : 'Sign in')}
        </button>
      </form>

      <div className="relative z-2">
        <div className="divider"><span>or continue with</span></div>
        <a href="/api/auth/oauth/google" className="social-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21.35 11.1h-9.2v2.8h5.2c-.25 1.3-1.1 2.4-2.35 3.1v2.6h3.8c2.2-2.05 3.6-5 3.6-8.6 0-.6-.05-1.2-.2-1.9z" fill="#4285F4"/>
            <path d="M12.15 22c2.55 0 4.7-.85 6.3-2.3l-3.8-2.6c-1.05.7-2.4 1.05-3.9 1.05-3 0-5.5-2-6.4-4.7H1.9v2.95C3.45 19.9 7.5 22 12.15 22z" fill="#34A853"/>
            <path d="M5.75 13.45c-.25-.75-.4-1.55-.4-2.45s.15-1.7.4-2.45V5.6H1.9A9.99 9.99 0 0 0 1 11c0 1.6.35 3.1.9 4.45l3.85-2z" fill="#FBBC05"/>
            <path d="M12.15 4.5c1.4 0 2.65.5 3.65 1.5l2.7-2.7C16.8 1.85 14.95 1 12.15 1 7.5 1 3.45 3.1 1.9 6.65l3.85 2.95c.85-2.7 3.4-4.7 6.4-4.7z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>
      </div>

      <div style={{marginTop:16, textAlign:'center'}}>
        <button type="button" onClick={() => setIsSignUp(s => !s)} className="" style={{background:'none', border:'none', color:'rgba(255,255,255,0.8)', cursor:'pointer'}}>
          {isSignUp ? 'Have an account? Sign in' : "Don't have an account? Create one"}
        </button>
      </div>
    </GlassShell>
  )
}
