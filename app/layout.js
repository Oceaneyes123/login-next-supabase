import '../styles/globals.css'
export const metadata = {
  title: 'ModernAuth',
  description: 'Next.js 14 + Supabase auth example',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
