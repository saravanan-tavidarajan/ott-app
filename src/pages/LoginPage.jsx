import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Film, AlertCircle, Loader2 } from 'lucide-react'
import { authService } from '../services/authService'

// Google "G" logo SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
)

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const errorParam = searchParams.get('error')

  const errorMessages = {
    no_code: 'Google sign-in was cancelled.',
    no_token: 'Authentication failed. Please try again.',
    auth_failed: 'Could not verify your account. Please try again.',
    access_denied: 'Access was denied. Please allow the required permissions.',
  }

  const errorMessage = errorParam
    ? (errorMessages[errorParam] || decodeURIComponent(errorParam))
    : null

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { url } = await authService.getGoogleAuthUrl()
      window.location.href = url
    } catch (err) {
      console.error('Failed to get auth URL:', err)
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-brand-red font-bold text-2xl tracking-widest uppercase mb-10">
        <Film size={28} />
        StreamApp
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-black/80 rounded-xl px-8 py-10 backdrop-blur text-center">
        <h1 className="text-white text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-400 text-sm mb-8">
          Sign in to access your personal video library from Google Photos.
        </p>

        {/* Error */}
        {errorMessage && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2.5 text-sm mb-6 text-left">
            <AlertCircle size={16} className="flex-shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin text-gray-500" />
              Redirecting to Google...
            </>
          ) : (
            <>
              <GoogleIcon />
              Sign in with Google
            </>
          )}
        </button>

        <p className="text-gray-600 text-xs mt-6">
          Your videos are loaded directly from your Google Photos library.
        </p>
      </div>
    </div>
  )
}
