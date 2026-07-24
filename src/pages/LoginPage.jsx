import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Film, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    try {
      await login(username, password)
      navigate(from, { replace: true })
    } catch {
      // error is already set in the store
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg)',
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
      <div className="w-full max-w-sm bg-black/80 rounded-xl px-8 py-10 backdrop-blur">
        <h1 className="text-white text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-gray-400 text-sm mb-8">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2.5 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg text-sm outline-none focus:border-gray-400 placeholder:text-gray-600 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 pr-10 rounded-lg text-sm outline-none focus:border-gray-400 placeholder:text-gray-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-lg font-semibold text-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-1"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Hint */}
        <p className="text-gray-600 text-xs text-center mt-6">
          Use <span className="text-gray-400">admin</span> / <span className="text-gray-400">admin@123</span>
        </p>
      </div>
    </div>
  )
}
