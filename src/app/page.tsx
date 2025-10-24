'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/applogonew.png"
                alt="Creo Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-emerald-600">Creo</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                How it Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                Pricing
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                FAQ
              </button>
              <button
                onClick={() => router.push('/registration')}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-600 hover:text-emerald-600 cursor-pointer">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-gray-600 hover:text-emerald-600 cursor-pointer">
                How it Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-gray-600 hover:text-emerald-600 cursor-pointer">
                Pricing
              </button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-gray-600 hover:text-emerald-600 cursor-pointer">
                FAQ
              </button>
              <button
                onClick={() => router.push('/registration')}
                className="w-full bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors mt-4 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[90vh]">
            {/* Left Column - Content */}
            <div className={`space-y-8 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium border border-emerald-200/50 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-semibold">AI-Powered Image Generation</span>
                <svg className="w-4 h-4 ml-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Create
                  <span className="block mt-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 animate-gradient-x">
                      Stunning Images
                    </span>
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-gray-600 mt-2">
                    from Text
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                  Transform your wildest ideas into breathtaking visuals with our cutting-edge AI. 
                  <span className="text-gray-800 font-medium"> No design skills required</span> – just describe what you envision.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => router.push('/registration')}
                  className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Creating Free
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/50">
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">10K+</div>
                  <div className="text-sm text-gray-500 font-medium">Images Created</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">5K+</div>
                  <div className="text-sm text-gray-500 font-medium">Happy Users</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 flex items-center justify-center">
                    4.9
                    <svg className="w-6 h-6 ml-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className={`${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-300`}>
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                {/* Main Demo Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                  {/* Browser Header */}
                  <div className="flex items-center space-x-3 pb-6 border-b border-gray-100/50">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-sm text-gray-500 ml-4 font-medium">Creo AI Generator</div>
                    <div className="ml-auto flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-emerald-600 font-medium">Live</span>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6">
                    {/* Input Section */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Describe your image
                      </label>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-4 border border-gray-200/50 hover:border-emerald-200 transition-colors duration-300">
                        <p className="text-sm text-gray-700 italic leading-relaxed">
                          &quot;A minimalist workspace with natural light, wooden desk, and modern laptop&quot;
                        </p>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-2xl text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Image
                      </span>
                    </button>

                    {/* Output Section */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Generated Image
                      </label>
                      <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-2xl p-4 border border-emerald-100/50 hover:border-emerald-200 transition-colors duration-300">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="/generatedimage.png"
                            alt="AI Generated Image Example"
                            width={400}
                            height={225}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 font-medium">4K Resolution</span>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-600 font-medium">2.3MB</span>
                          </div>
                          <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer flex items-center space-x-1 transition-colors duration-200">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-xl animate-pulse delay-1000"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-1/2 -left-4 w-2 h-16 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full opacity-60"></div>
                <div className="absolute top-1/4 -right-2 w-1 h-12 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Used By Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by leading companies</p>
          </div>
          
          {/* News Ticker */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* Company logos only */}
              <div className="flex items-center flex-shrink-0">
                {/* Netflix */}
                <div className="mx-8">
                  <Image
                    src="/netflix.png"
                    alt="Netflix"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Microsoft */}
                <div className="mx-8">
                  <Image
                    src="/microsoft.png"
                    alt="Microsoft"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Figma */}
                <div className="mx-8">
                  <Image
                    src="/figma.png"
                    alt="Figma"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Dropbox */}
                <div className="mx-8">
                  <Image
                    src="/dropbox.png"
                    alt="Dropbox"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Instagram */}
                <div className="mx-8">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Uber */}
                <div className="mx-8">
                  <Image
                    src="/uber.png"
                    alt="Uber"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Airbnb */}
                <div className="mx-8">
                  <Image
                    src="/airbnb.png"
                    alt="Airbnb"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* YouTube */}
                <div className="mx-8">
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Exact duplicate for seamless loop */}
              <div className="flex items-center flex-shrink-0">
                {/* Netflix */}
                <div className="mx-8">
                  <Image
                    src="/netflix.png"
                    alt="Netflix"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Microsoft */}
                <div className="mx-8">
                  <Image
                    src="/microsoft.png"
                    alt="Microsoft"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Figma */}
                <div className="mx-8">
                  <Image
                    src="/figma.png"
                    alt="Figma"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Dropbox */}
                <div className="mx-8">
                  <Image
                    src="/dropbox.png"
                    alt="Dropbox"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Instagram */}
                <div className="mx-8">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Uber */}
                <div className="mx-8">
                  <Image
                    src="/uber.png"
                    alt="Uber"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* Airbnb */}
                <div className="mx-8">
                  <Image
                    src="/airbnb.png"
                    alt="Airbnb"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                {/* YouTube */}
                <div className="mx-8">
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Why Choose Creo
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Professional-grade AI image generation that fits seamlessly into your creative workflow
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Feature List */}
            <div className="space-y-12">
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">Lightning Fast Generation</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Create high-quality images in under 10 seconds. Our optimized infrastructure ensures you never wait.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">Intelligent Understanding</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Advanced AI that comprehends context, style, and nuance to deliver exactly what you envision.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">Studio Quality Output</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Generate images up to 8K resolution with professional-grade detail and clarity for any project.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3">Commercial Rights</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Full ownership of generated images for personal and commercial use without restrictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-sm text-gray-500 ml-4">Creo AI Generator</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Input</div>
                      <div className="text-gray-800 italic">&quot;A minimalist workspace with natural light, wooden desk, and modern laptop&quot;</div>
                    </div>
                    
                    <div className="flex items-center justify-center py-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-100">
                      <div className="text-sm text-gray-500 mb-3">Generated Image</div>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <Image
                            src="/generatedimage.png"
                            alt="AI Generated Image Example"
                            width={400}
                            height={225}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      <div className="text-center mt-3">
                        <div className="text-sm text-gray-500">AI Generated Image</div>
                        <div className="text-xs text-gray-400 mt-1">4K Resolution</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-100 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-light text-gray-900">10K+</div>
              <div className="text-gray-500">Images Generated Daily</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-gray-900">99.9%</div>
              <div className="text-gray-500">Uptime Guarantee</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-gray-900">5K+</div>
              <div className="text-gray-500">Active Creators</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning images in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Describe Your Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply type what you want to see. Be as detailed or as simple as you like - our AI understands it all.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Creates Magic</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI algorithms process your description and generate a unique, high-quality image.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Download & Share</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your creation in high resolution and share it with the world or use it in your projects.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/registration')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Try It Now - It&apos;s Free!
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of creators who are already using Creo to bring their ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-gray-600 text-sm">Graphic Designer</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">
                &quot;Creo has revolutionized my workflow. I can create concept art and mockups in minutes instead of hours. The quality is incredible!&quot;
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Mike Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Content Creator</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">
                &quot;As a YouTuber, I need eye-catching thumbnails constantly. Creo saves me so much time and money. The results are always professional.&quot;
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Alex Thompson</h4>
                  <p className="text-gray-600 text-sm">Startup Founder</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">
                &quot;Perfect for creating marketing materials on a budget. The AI understands exactly what I need and delivers every time.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Choose the plan that fits your creative needs
            </p>
            <p className="text-sm text-gray-500 italic">
              * This is a demo mockup - no actual payment processing is implemented
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600">Perfect for getting started</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">5 images per day</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Standard resolution</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Basic support</span>
                </li>
              </ul>
              <button
                onClick={() => router.push('/registration')}
                className="w-full bg-gray-900 text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600">For serious creators</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">100 images per day</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">4K resolution</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Priority processing</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Commercial license</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <button
                onClick={() => router.push('/registration')}
                className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">For teams and businesses</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Unlimited images</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">8K resolution</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">24/7 priority support</span>
                </li>
              </ul>
              <button
                onClick={() => router.push('/registration')}
                className="w-full bg-gray-900 text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Creo
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How does Creo generate images?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creo uses advanced artificial intelligence and machine learning models trained on millions of images. 
                When you provide a text description, our AI analyzes the text and generates a unique image that matches your vision.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I use the generated images commercially?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! All images generated with Creo are yours to use for both personal and commercial purposes. 
                Pro and Enterprise plans include full commercial licensing rights.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How long does it take to generate an image?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most images are generated within 10-30 seconds, depending on the complexity and current server load. 
                Pro users get priority processing for faster results.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What image formats do you support?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creo generates images in high-quality PNG format. You can download them in various resolutions 
                depending on your plan (up to 8K for Enterprise users).
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a free trial available?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Our free plan includes 5 images per day at no cost. You can also try our Pro plan 
                with a 7-day free trial to experience all premium features.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! You can cancel your subscription at any time from your account settings. 
                You&apos;ll continue to have access to paid features until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Creo to bring their ideas to life. 
            Start creating stunning images today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/registration')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get Started Free
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 cursor-pointer"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/applogonew.png"
                  alt="Creo Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-bold text-emerald-400">Creo</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transform your ideas into stunning visuals with the power of AI. 
                Create, inspire, and bring your imagination to life.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Creo. All rights reserved. Built by Moeez Nagra.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
