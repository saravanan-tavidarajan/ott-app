import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, Film } from 'lucide-react'
import { authService } from '../services/authService'
import useAuthStore from '../store/useAuthStore'

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current) return
    handled.current = true

    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true })
      return
    }

    if (!token) {
      navigate('/login?error=no_token', { replace: true })
      return
    }

    authService.getMe(token)
      .then(({ user }) => {
        setAuth(user, token)
        navigate('/', { replace: true })
      })
      .catch(() => {
        navigate('/login?error=auth_failed', { replace: true })
      })
  }, [])

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-brand-red font-bold text-xl tracking-widest uppercase mb-6">
        <Film size={24} />
        StreamApp
      </div>
      <Loader2 size={32} className="text-white animate-spin" />
      <p className="text-gray-400 text-sm">Signing you in...</p>
    </div>
  )
}
