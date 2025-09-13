import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export default async function RegisterPage() {
  return (
    <div className="app-shell">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>
        <form action="/api/auth/register" method="post" className="space-y-4">
          <label>
            <span className="text-sm">Email</span>
            <input name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </label>
          <label>
            <span className="text-sm">Password</span>
            <input name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </label>
          <label>
            <span className="text-sm">Display name</span>
            <input name="name" type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </label>
          <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded">Create account</button>
        </form>
      </div>
    </div>
  )
}
