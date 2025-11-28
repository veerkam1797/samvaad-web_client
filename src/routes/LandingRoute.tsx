import { Link } from 'react-router-dom'
import { MessageCircle, Volume2, Type, Smartphone, Users, Zap, Shield } from 'lucide-react'

export function Component() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 relative overflow-hidden animate-fadeIn">
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/6 animate-float">
        <MessageCircle className="w-8 h-8 text-indigo-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float delay-500">
        <Volume2 className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 animate-float delay-1500">
        <Type className="w-8 h-8 text-green-400" />
      </div>

      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-slideInLeft">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/logo/icon.png"
              alt="Samvaad Logo"
              className="h-10 w-10 rounded-full object-cover shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Samvaad
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-3 sm:gap-4 animate-slideInRight">
          <Link
            to="/login"
            className="px-4 sm:px-5 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 sm:px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-700"
          >
            Sign up
          </Link>
        </nav>
      </header>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
        
        {/* Left Section */}
        <div className="animate-slideUp space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium animate-pulse">
              <Zap className="w-4 h-4" />
              AI-Powered Accessibility
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Braille language AI for{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                inclusive communication
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Translate human language to Braille and back in real-time. Break communication barriers and enable truly accessible conversations with AI-powered translation.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/onboarding"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-700"
              >
                <span className="flex items-center justify-center gap-2">
                  Get started
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Link>

              <Link
                to="/login"
                className="group px-8 py-4 rounded-full border-2 border-gray-300 text-gray-800 font-semibold text-center bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-indigo-400"
              >
                <span className="flex items-center justify-center gap-2">
                  I have an account
                  <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-500" />
                Mobile Friendly
              </div>
            </div>
          </div>
        </div>

        {/* Right Section with Enhanced Braille Grid */}
        <div className="relative animate-fadeIn delay-300">
          <div className="relative">
            {/* Main Braille Card */}
            <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5 w-5 h-5 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Braille Translation</h3>
                  <p className="text-sm text-gray-500">Real-time conversion</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 20 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:from-gray-100 hover:to-gray-200 hover:shadow-lg"
                  >
                    <div className="grid grid-cols-2 gap-1 p-1">
                      {Array.from({ length: 6 }).map((__, dot) => (
                        <span
                          key={dot}
                          className={`h-2 w-2 rounded-full transition-all duration-500 ${
                            ((idx + dot) % 3 === 0 || (idx + dot) % 4 === 0)
                              ? 'bg-gradient-to-br from-indigo-600 to-purple-600 animate-pulse'
                              : 'bg-gray-300'
                          }`}
                        ></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                <span>Interactive Braille Cells</span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  Live
                </span>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-200 animate-float">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">Speech Input</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-200 animate-float delay-1000">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Text Output</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: MessageCircle,
              title: "Two-way Communication",
              description: "Seamless interaction between human language and Braille",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Smartphone,
              title: "Mobile Optimized",
              description: "Works perfectly on all devices and screen readers",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Users,
              title: "Multi-user Support",
              description: "Enable conversations between multiple people",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Zap,
              title: "Real-time AI",
              description: "Instant translation with advanced AI models",
              color: "from-orange-500 to-red-500"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-500 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-12 text-center animate-fadeIn delay-1000">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to start communicating?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of users experiencing inclusive communication
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Create your free account
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Component