'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [pageLoaded, setPageLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setMessage('Supabase is not configured. Please check your environment variables.')
        return
      }

      if (isLogin) {
        console.log('Attempting to sign in with:', email)
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        console.log('Sign in response:', { data, error })
        if (error) {
          console.error('Sign in error:', error)
          setMessage(`Sign in failed: ${error.message}`)
          return
        }
        if (data.user) {
          console.log('User signed in successfully:', data.user)
          setMessage('Sign in successful! Redirecting...')
          // Use router.push for redirect
          setTimeout(() => {
            router.push('/generations')
          }, 1000)
        } else {
          setMessage('Sign in failed. No user data returned.')
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) {
          console.error('Sign up error:', error)
          setMessage(`Sign up failed: ${error.message}`)
          return
        }
        if (data.user) {
          setMessage('Check your email for the confirmation link!')
        }
      }
    } catch (error: unknown) {
      console.error('Auth error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Please try again.'
      setMessage(`An error occurred: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-teal-200 rotate-45 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-200 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-emerald-200 rotate-12 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-teal-200 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Centered Minimalistic Design */}
        <div className={`hidden lg:flex lg:w-1/2 bg-white relative transition-all duration-1000 ${pageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Subtle Accent Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#EFFDF9', boxShadow: '0 0 80px rgba(239, 253, 249, 0.3)' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#EFFDF9', boxShadow: '0 0 60px rgba(239, 253, 249, 0.3)' }}></div>
          </div>

          <div className="flex flex-col justify-center items-center text-gray-900 p-16 w-full h-full relative z-10">
            <div className={`text-center space-y-16 max-w-lg transition-all duration-1000 delay-500 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {/* Logo */}
              <div className="w-32 h-32 mx-auto relative group">
                <img 
                  src="/applogonew.png" 
                  alt="Creo Logo" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0, 188, 132, 0.3))' }}
                />
                <div className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" style={{ backgroundColor: '#00BC84', boxShadow: '0 0 30px rgba(0, 188, 132, 0.4)' }}></div>
                <div className="absolute -inset-8 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: '#00BC84', boxShadow: '0 0 60px rgba(0, 188, 132, 0.6)' }}></div>
              </div>
              
              {/* Brand */}
              <div className="space-y-8">
                <h1 className="text-6xl font-light tracking-wider" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#00BC84', textShadow: '0 0 30px rgba(0, 188, 132, 0.5), 0 0 60px rgba(0, 188, 132, 0.3)' }}>
                  Creo
                </h1>
                <p className="text-xl font-light leading-relaxed max-w-md mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Transform your ideas into stunning <span style={{ color: '#00BC84', fontWeight: 'bold', textShadow: '0 0 20px rgba(0, 188, 132, 0.4)' }}>visuals</span> with the power of <span style={{ color: '#00BC84', fontWeight: 'bold', textShadow: '0 0 20px rgba(0, 188, 132, 0.4)' }}>AI</span>
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 py-8 border-t border-b border-gray-200 relative">
                <div className="absolute inset-0 rounded-2xl opacity-10" style={{ backgroundColor: '#EFFDF9' }}></div>
                <div className="text-center relative z-10">
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#00BC84', textShadow: '0 0 15px rgba(0, 188, 132, 0.4)' }}>10K+</div>
                  <div className="text-sm text-gray-500 font-medium">Images Generated</div>
                </div>
                <div className="text-center relative z-10">
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#00BC84', textShadow: '0 0 15px rgba(0, 188, 132, 0.4)' }}>5K+</div>
                  <div className="text-sm text-gray-500 font-medium">Active Users</div>
                </div>
                <div className="text-center relative z-10">
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#00BC84', textShadow: '0 0 15px rgba(0, 188, 132, 0.4)' }}>99.9%</div>
                  <div className="text-sm text-gray-500 font-medium">Uptime</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-all duration-1000 delay-300 ${pageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative group">
                <img 
                  src="/applogonew.png" 
                  alt="Creo Logo" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                />
              </div>
              <h1 className="text-5xl font-extralight tracking-wider text-gray-800 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Creo</h1>
              <p className="text-gray-600 text-lg font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Transform your ideas into stunning visuals with AI</p>
            </div>

            {/* Auth Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(0, 188, 132, 0.15), 0 0 100px rgba(0, 188, 132, 0.1)' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to continue creating' : 'Join the creative revolution'}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                    isLogin
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                    !isLogin
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {message && (
                <div className={`mt-6 p-4 rounded-2xl text-sm ${
                  message.includes('error') || message.includes('Error')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {message}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm">
              <p>
                Powered by <span className="font-semibold text-emerald-600">Next.js</span>, <span className="font-semibold text-emerald-600">Supabase</span>, and <span className="font-semibold text-emerald-600">AI</span>
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Built by <span className="font-medium text-gray-600">Moeez Nagra</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}