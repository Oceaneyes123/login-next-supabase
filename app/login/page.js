"use client"

export default function LoginPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
        
        .hyper-modern-bg {
          font-family: 'Inter', sans-serif;
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(135deg, 
            #1a1a2e 0%, 
            #16213e 25%, 
            #0f3460 50%, 
            #533483 75%, 
            #e94560 100%);
          position: relative;
        }
        
        .bg-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, #a8edea, #fed6e3);
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }
        
        .orb-3 {
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #ffecd2, #fcb69f);
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-20px) scale(1.1); }
          66% { transform: translateY(10px) scale(0.9); }
        }
        
        .neon-streak {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #ff0080 50%, 
            transparent 100%);
          animation: streak 6s linear infinite;
          opacity: 0.7;
        }
        
        .streak-1 {
          width: 300px;
          top: 25%;
          left: -300px;
          animation-delay: 0s;
        }
        
        .streak-2 {
          width: 200px;
          top: 70%;
          right: -200px;
          animation-delay: 3s;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #00ffff 50%, 
            transparent 100%);
        }
        
        @keyframes streak {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 300px)); }
        }
        
        .login-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          padding: 48px 40px;
          width: 420px;
          margin: 24px auto;
          position: relative;
          overflow: hidden;
          animation: cardFloat 6s ease-in-out infinite;
        }
        
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .login-title {
          font-size: 32px;
          font-weight: 200;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .login-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.5px;
        }
        
        .form-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 300;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          outline: none;
        }

  /* utility: bottom margin for form rows — match base page spacing (1rem) */
  .mb-6 { margin-bottom: 1rem; }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }
        
        .form-input:focus {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .login-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, 
            rgba(255, 0, 128, 0.8) 0%, 
            rgba(0, 255, 255, 0.8) 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%);
          transition: left 0.5s ease;
        }
        
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 25px rgba(255, 0, 128, 0.3),
            0 0 40px rgba(0, 255, 255, 0.2);
        }
        
        .login-button:hover::before {
          left: 100%;
        }
        
        .login-button:active {
          transform: translateY(0px);
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .divider span {
          margin: 0 16px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .social-button {
          width: 100%;
          padding: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 400;
          backdrop-filter: blur(10px);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .social-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 480px) {
          .login-card {
            width: 90%;
            padding: 32px 24px;
            margin: 20px auto;
          }
          
          .login-title {
            font-size: 28px;
          }
        }
      `}</style>
      
      <div className="hyper-modern-bg">
        <div className="bg-animation">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="neon-streak streak-1"></div>
          <div className="neon-streak streak-2"></div>
        </div>
        
        <div className="flex justify-center items-center h-full relative z-10">
          <div className="login-card">
            <div className="text-center mb-10 relative z-2">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div>
            
            <form action="/api/auth/login" method="post" className="relative z-2">
              <div className="mb-6">
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="form-input" 
                  placeholder="Email address"
                />
              </div>
              
              <div className="mb-6">
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className="form-input" 
                  placeholder="Password"
                />
              </div>
              
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="relative z-2">
              <div className="divider">
                <span>or continue with</span>
              </div>
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
          </div>
        </div>
      </div>
    </>
  )
}
