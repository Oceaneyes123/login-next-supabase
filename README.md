# ModernAuth — Next.js + Supabase Authentication Example

A modern, responsive authentication system built with Next.js 14,
Supabase, and Tailwind CSS. Features a stunning glassmorphism UI with
animated backgrounds, email/password authentication, Google OAuth,
and protected routes.

## 🚀 Features

- **Modern UI**: Glassmorphism design with floating orbs, neon streaks,
  and smooth animations
- **Dual Authentication**: Email/password and Google OAuth sign-in
- **Hybrid Architecture**: Uses both Next.js Pages Router and App Router
- **Protected Routes**: Middleware-based session protection for dashboard
- **Responsive Design**: Mobile-optimized with Tailwind CSS
- **Type-Safe**: Built with TypeScript-ready structure
- **Server-Side Rendering**: Dashboard uses server components for
  optimal performance

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Authentication**: Supabase Auth (@supabase/supabase-js,
  @supabase/auth-helpers-nextjs)
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```text
├── app/                          # Next.js App Router
│   ├── layout.js                # Root layout component
│   ├── dashboard/
│   │   └── page.js              # Protected dashboard (server component)
│   ├── login/
│   │   └── page.js              # Login page
│   └── register/
│       └── page.js              # Registration page
├── components/                   # Reusable React components
│   ├── AuthForm.js              # Main authentication form
│   └── GlassShell.js            # Glassmorphism UI wrapper
├── docs/
│   └── design.html              # UI design mockup
├── lib/
│   └── supabaseClient.js        # Supabase client configuration
├── pages/                       # Next.js Pages Router
│   ├── _app.js                  # App wrapper with auth listener
│   ├── index.js                 # Home page with auth form
│   ├── welcome.js               # Welcome page (client-side protected)
│   └── api/auth/                # Authentication API routes
│       ├── login.js             # Email/password login handler
│       ├── register.js          # User registration handler
│       └── oauth/
│           └── google.js        # Google OAuth handler
├── sql/
│   └── create_profiles_table.sql # Database schema
├── styles/
│   └── globals.css              # Global styles and Tailwind imports
├── middleware.js                # Route protection middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── package.json                 # Dependencies and scripts
```

## 🏗 Architecture Overview

### Authentication Flow

1. **Client-Side Auth**: Uses Supabase JS client for real-time auth state
2. **Server-Side Protection**: Middleware validates sessions for
   protected routes
3. **API Routes**: Handle authentication logic server-side
4. **Session Management**: Cookies store auth tokens automatically

### UI Components

- **GlassShell**: Reusable wrapper with animated background and
  glassmorphism effects
- **Responsive Design**: Adapts to mobile devices with optimized layouts

### Database Schema

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  PRIMARY KEY (id)
);
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
git clone https://github.com/Oceaneyes123/login-next-supabase.git
cd login-next-supabase
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Authentication > Settings
3. Enable Email auth
4. Configure Google OAuth:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set redirect URL: `http://localhost:3000/api/auth/oauth/google`

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database Setup (Optional)

1. Go to your Supabase dashboard > SQL Editor
2. Run the SQL from `sql/create_profiles_table.sql` to create
   the profiles table

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 📋 API Endpoints

### Authentication Routes

- `POST /api/auth/login` - Email/password sign-in
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/oauth/google` - Google OAuth initiation

### Protected Pages

- `/dashboard` - Server-side protected dashboard
- `/welcome` - Client-side protected welcome page

## 🎨 UI Components

### GlassShell Component

A beautiful glassmorphism wrapper with:

- Animated floating orbs
- Neon accent streaks
- Backdrop blur effects
- Responsive design
- Customizable title and subtitle

### AuthForm Component

Features:

- Toggle between login and registration
- Email/password validation
- Password confirmation for registration
- Google OAuth integration
- Error handling and loading states

## 🔧 Configuration

### Next.js Config

```javascript
const nextConfig = {
  reactStrictMode: true,
}
```

### Tailwind Config

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        accent: '#06b6d4',
      }
    },
  },
  plugins: [],
}
```

### Middleware

Protects routes using Supabase auth helpers:

```javascript
export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data } = await supabase.auth.getSession()

  if (pathname.startsWith('/dashboard')) {
    if (!data?.session) {
      return NextResponse.redirect('/login')
    }
  }

  return res
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update Supabase OAuth redirect URLs to your production domain
4. Deploy!

### Other Platforms

- Ensure environment variables are set
- Update `NEXT_PUBLIC_SITE_URL` to your domain
- Configure OAuth redirect URLs in Supabase

## 🔒 Security Features

- **Server-side session validation** with middleware
- **CSRF protection** via Next.js API routes
- **Secure token storage** in HTTP-only cookies
- **OAuth state validation** for Google sign-in
- **Input validation** and sanitization

## 🎯 Usage Examples

### Client-Side Auth Check

```javascript
import { supabase } from '../lib/supabaseClient'

const { data: user } = await supabase.auth.getUser()
if (user) {
  // User is authenticated
}
```

### Server-Side Auth Check

```javascript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabase = createServerComponentClient({ cookies })
const { data } = await supabase.auth.getUser()
```

### Sign Out

```javascript
await supabase.auth.signOut()
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing authentication service
- [Next.js](https://nextjs.org) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- Design inspiration from modern glassmorphism trends

## 📞 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the Supabase documentation
- Review Next.js authentication guides

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
