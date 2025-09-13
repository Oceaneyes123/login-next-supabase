export default function LoginPage() {
  return (
    <div className="app-shell">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <form action="/api/auth/login" method="post" className="space-y-4">
          <label>
            <span className="text-sm">Email</span>
            <input name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </label>
          <label>
            <span className="text-sm">Password</span>
            <input name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </label>
          <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded">Sign in</button>
        </form>

        <div className="mt-4">
          <a href="/api/auth/oauth/google" className="w-full block text-center py-2 px-4 border rounded">Continue with Google</a>
        </div>
      </div>
    </div>
  )
}
