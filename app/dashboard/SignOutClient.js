"use client"
import React from 'react'
import { createRoot } from 'react-dom/client'
import SignOutButton from '../../components/SignOutButton'

export default function hydrateSignOut() {
  if (typeof window === 'undefined') return
  const el = document.getElementById('signout-root')
  if (!el) return
  try {
    const root = createRoot(el)
    root.render(<SignOutButton redirectTo="/" />)
  } catch (err) {
    console.error('Hydrate signout failed', err)
  }
}

// Run immediately when imported in the server component via next/script or dynamic import
hydrateSignOut()
