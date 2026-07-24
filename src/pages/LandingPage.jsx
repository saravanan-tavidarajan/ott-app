import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Film, Play, Heart, Search, Clock, Shield, Loader2 } from 'lucide-react'
import { authService } from '../services/authService'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
)

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-start gap-3 p-6 bg-gray-900 rounded-xl border border-gray-800">
    <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center">
      <Icon size={20} className="text-brand-red" />
    </div>
    <h3 className="text-white font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
)

export default function LandingPage() {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const { url } = await authService.getGoogleAuthUrl()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2 text-brand-red font-bold text-xl tracking-widest uppercase">
          <Film size={22} />
          StreamApp
        </div>
        <div className="flex items-center gap-4">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
            Privacy Policy
          </Link>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <GoogleIcon />}
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <span className="inline-block text-brand-red text-xs font-semibold tracking-widest uppercase bg-brand-red/10 border border-brand-red/20 px-3 py-1 rounded-full mb-6">
          Personal Video Streaming
        </span>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Your Google Photos videos,<br />
          <span className="text-brand-red">beautifully streamed.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          StreamApp is a personal OTT platform that connects to your Google Photos library
          and lets you browse, search, and stream your own videos in a Netflix-like experience —
          privately and securely.
        </p>
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="inline-flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-xl text-base font-bold hover:bg-gray-100 disabled:opacity-60 transition-colors shadow-lg"
        >
          {loading
            ? <><Loader2 size={20} className="animate-spin" /> Redirecting...</>
            : <><GoogleIcon /> Get Started with Google</>
          }
        </button>
        <p className="text-gray-600 text-xs mt-4">
          Read-only access to your videos. We never modify or delete your content.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-white text-2xl font-bold text-center mb-10">Everything you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            icon={Play}
            title="Stream Your Videos"
            description="Play any video from your Google Photos library directly in the browser with a full-featured player."
          />
          <Feature
            icon={Search}
            title="Search & Browse"
            description="Instantly search through your entire video library by filename. Browse everything in a clean grid layout."
          />
          <Feature
            icon={Heart}
            title="Personal Watchlist"
            description="Save your favourite videos to a personal watchlist and access them instantly from any session."
          />
          <Feature
            icon={Clock}
            title="Continue Watching"
            description="Pick up exactly where you left off. StreamApp tracks your playback progress across all your videos."
          />
          <Feature
            icon={Shield}
            title="Private & Secure"
            description="Your videos stay in Google Photos. We request read-only access and never store or copy your media."
          />
          <Feature
            icon={Film}
            title="Netflix-like Experience"
            description="A dark, immersive interface with hero banners, carousels, and smooth transitions — built for watching."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-semibold uppercase tracking-widest">
            <Film size={14} className="text-brand-red" />
            StreamApp
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <a href="mailto:saran[dot]trs[at]gmail[dot]com" className="hover:text-gray-400 transition-colors">Contact</a>
          </div>
          <p>© 2026 StreamApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
