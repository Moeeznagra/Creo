'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface Generation {
  id: string
  prompt: string
  image_url: string
  description?: string
  created_at: string
}

export default function GenerationsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [generations, setGenerations] = useState<Generation[]>([])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState('')
  const [pageLoaded, setPageLoaded] = useState(false)
  const router = useRouter()

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/')
    } else {
      setUser(user)
    }
  }, [router])

  const fetchGenerations = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setGenerations(data || [])
    } catch (error) {
      console.error('Error fetching generations:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  useEffect(() => {
    checkUser()
    fetchGenerations()
  }, [checkUser, fetchGenerations])

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || !user) return

    setGenerating(true)
    setMessage('')
    
    try {
      console.log('Sending request to generate image with prompt:', prompt.trim())
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Failed to generate image')
      }

      const data = await response.json()
      
      // Save to database
      const { data: generation, error } = await supabase
        .from('generations')
        .insert([
          {
            prompt: prompt.trim(),
            image_url: data.imageUrl,
            description: data.description,
            user_id: user.id
          }
        ])
        .select()

      if (error) throw error
      setGenerations([generation[0], ...generations])
      setPrompt('')
      setMessage('Image generated successfully!')
    } catch (error: unknown) {
      console.error('Error generating image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setMessage(`Failed to generate image: ${errorMessage}`)
    } finally {
      setGenerating(false)
    }
  }

  const deleteGeneration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('generations')
        .delete()
        .eq('id', id)

      if (error) throw error
      setGenerations(generations.filter(gen => gen.id !== id))
    } catch (error) {
      console.error('Error deleting generation:', error)
    }
  }

  const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `creo-${prompt.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading your studio...</h2>
          <p className="text-gray-600">Preparing your creative workspace</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 relative" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 relative group">
                <img 
                  src="/applogonew.png" 
                  alt="Creo Logo" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0, 188, 132, 0.3))' }}
                />
                <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#00BC84', textShadow: '0 0 20px rgba(0, 188, 132, 0.3)' }}>Creo Studio</h1>
                <p className="text-gray-600 font-medium">AI-Powered Creative Workspace</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-2xl transition-all duration-300 group cursor-pointer"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: '#00BC84', textShadow: '0 0 30px rgba(0, 188, 132, 0.4)' }}>
            Create Magic with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Transform your ideas into stunning visuals with the power of artificial intelligence
          </p>
        </div>

        {/* Create New Image Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-16 border border-gray-200 relative overflow-hidden transition-all duration-1000 delay-300 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(0, 188, 132, 0.1)' }}>
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 relative group">
                <img 
                  src="/applogonew.png" 
                  alt="Creo Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0, 188, 132, 0.3))' }}
                />
                <div className="absolute -inset-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-3xl font-bold mb-3" style={{ color: '#00BC84' }}>Create New Image</h3>
              <p className="text-gray-600 text-lg">Describe your vision and let AI bring it to life</p>
            </div>
            
            <form onSubmit={generateImage} className="space-y-8">
              <div className="space-y-4">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-700 text-center">
                  Describe your image
                </label>
                <textarea
                  id="prompt"
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-6 py-6 bg-gray-50 border-2 border-gray-200 rounded-3xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:bg-gray-100 resize-none text-lg"
                  placeholder="A serene mountain landscape at sunset with a lake reflecting the sky..."
                  rows={4}
                />
              </div>
              
              <button
                type="submit"
                disabled={generating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-6 px-8 rounded-3xl font-bold text-xl hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none relative overflow-hidden cursor-pointer"
                style={{ boxShadow: '0 10px 30px rgba(0, 188, 132, 0.3)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {generating ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating your masterpiece...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Generate Image</span>
                  </div>
                )}
              </button>
            </form>

            {message && (
              <div className={`mt-8 p-6 rounded-3xl text-lg font-medium ${
                message.includes('error') || message.includes('Error') || message.includes('Failed')
                  ? 'bg-red-50 text-red-700 border-2 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className={`space-y-12 transition-all duration-1000 delay-500 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#00BC84', textShadow: '0 0 20px rgba(0, 188, 132, 0.3)' }}>
              Your Gallery
            </h3>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium">{generations.length} {generations.length === 1 ? 'creation' : 'creations'}</span>
            </div>
          </div>

          {generations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-20 text-center border border-gray-200 relative overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(0, 188, 132, 0.1)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-8 relative group">
                  <svg className="w-16 h-16 text-emerald-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: '#00BC84' }}>Your gallery is empty</h3>
                <p className="text-gray-600 text-xl mb-12 max-w-md mx-auto">Create your first AI masterpiece above to get started!</p>
                <div className="flex justify-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {generations.map((generation) => (
                <div
                  key={generation.id}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 overflow-hidden group relative"
                  style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 188, 132, 0.05)' }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="aspect-square bg-gray-100 relative overflow-hidden rounded-t-3xl">
                    <img
                      src={generation.image_url}
                      alt={generation.prompt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => downloadImage(generation.image_url, generation.prompt)}
                          className="p-3 bg-white/95 backdrop-blur-sm rounded-2xl text-gray-700 hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                          title="Download image"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteGeneration(generation.id)}
                          className="p-3 bg-red-500/95 backdrop-blur-sm rounded-2xl text-white hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                          title="Delete image"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6 relative z-10">
                    <h4 className="text-gray-800 font-bold text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {generation.prompt}
                    </h4>
                    {generation.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {generation.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">{new Date(generation.created_at).toLocaleDateString()}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-600 font-semibold">AI Generated</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}