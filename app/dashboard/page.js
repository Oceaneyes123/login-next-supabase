import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user) {
    // middleware should redirect but fallback here too
    return <div className="app-shell">Redirecting…</div>
  }

  const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'there'

  return (
    <div className="app-shell">
      <div className="bg-white p-8 rounded shadow max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold">Hi {name} 👋</h1>
        <p className="mt-2 text-slate-600">Your dashboard is protected via middleware and Supabase sessions.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/welcome" className="px-4 py-2 rounded border">Go to welcome</a>
          {/* client-side sign out button */}
          <div id="signout-root">
            {/* SignOutButton will hydrate here */}
          </div>
        </div>
      </div>
    </div>
  )
}

