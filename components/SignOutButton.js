"use client"
import { supabase } from '../lib/supabaseClient'

export default function SignOutButton({ redirectTo = '/' }) {
  async function handleSignOut() {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Sign out error', err)
    }
    // Use a hard navigation so this works in both App and Pages router contexts
    window.location.href = redirectTo
  }

  return (
    <button onClick={handleSignOut} className="px-4 py-2 rounded border">
      Sign out
    </button>
  )
}
