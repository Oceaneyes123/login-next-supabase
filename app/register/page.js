"use client"
import { useState } from 'react'
import GlassShell from '../../components/GlassShell'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })
      if (!res.ok) {
        const body = await res.json().catch(()=>({ error: 'Unknown error' }))
        throw new Error(body.error || body.message || 'Registration failed')
      }
      // redirect on success
      window.location.href = '/'
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassShell title="Create Account" subtitle="Join us today">
      <form onSubmit={handleSubmit} className="relative z-2">
        <div className="mb-6">
          <input value={email} onChange={e=>setEmail(e.target.value)} name="email" type="email" required className="form-input" placeholder="Email address" />
        </div>

        <div className="mb-6">
          <input value={password} onChange={e=>setPassword(e.target.value)} name="password" type="password" required className="form-input" placeholder="Password" />
        </div>

        <div className="mb-6">
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} name="confirm" type="password" required className="form-input" placeholder="Confirm password" />
        </div>

        <div className="mb-6">
          <input value={name} onChange={e=>setName(e.target.value)} name="name" type="text" className="form-input" placeholder="Display name (optional)" />
        </div>

        {error ? <div style={{color:'#ffb4b4', marginBottom:12}}>{error}</div> : null}

        <button type="submit" disabled={loading} className="login-button">{loading ? 'Creating...' : 'Create Account'}</button>
      </form>

      <div className="relative z-2">
        <div className="divider"><span>or continue with</span></div>
        <a href="/api/auth/oauth/google" className="social-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21.35 11.1h-9.2v2.8h5.2c-.25 1.3-1.1 2.4-2.35 3.1v2.6h3.8c2.2-2.05 3.6-5 3.6-8.6 0-.6-.05-1.2-.2-1.9z" fill="#4285F4"/>
            <path d="M12.15 22c2.55 0 4.7-.85 6.3-2.3l-3.8-2.6c-1.05.7-2.4 1.05-3.9 1.05-3 0-5.5-2-6.4-4.7H1.9v2.95C3.45 19.9 7.5 22 12.15 22z" fill="#34A853"/>
            <path d="M5.75 13.45c-.25-.75-.4-1.55-.4-2.45s.15-1.7.4-2.45V5.6H1.9A9.99 9.99 0 0 0 1 11c0 1.6.35 3.1.9 4.45l3.85-2z" fill="#FBBC05"/>
            <path d="M12.15 4.5c1.4 0 2.65.5 3.65 1.5l2.7-2.7C16.8 1.85 14.95 1 12.15 1 7.5 1 3.45 3.1 1.9 6.65l3.85 2.95c.85-2.7 3.4-4.7 6.4-4.7z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>
      </div>
    </GlassShell>
  )
}
