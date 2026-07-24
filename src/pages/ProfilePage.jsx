import { useNavigate } from 'react-router-dom'
import { LogOut, Mail, Calendar, Play, Heart, Clock } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import useStore from '../store/useStore'
import VideoCard from '../components/VideoCard'
import { useVideos } from '../hooks/useVideos'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const { watchlist, progress } = useStore()
  const { videos } = useVideos()
  const navigate = useNavigate()

  const watchedCount = Object.keys(progress).length
  const continueWatchingCount = Object.values(progress).filter(
    (p) => p.percent > 0.05 && p.percent < 0.95
  ).length

  const watchlistVideos = watchlist
    .map((id) => videos.find((v) => v.id === id))
    .filter(Boolean)
    .slice(0, 5)

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header card */}
      <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Google avatar */}
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-brand-red flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {user?.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="text-white text-2xl font-bold">{user?.name}</h1>
          <span className="inline-block mt-1 mb-3 text-xs text-brand-red font-semibold bg-brand-red/10 border border-brand-red/30 px-2.5 py-1 rounded-full">
            Google Account
          </span>
          <div className="flex flex-col gap-1.5 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" /> {user?.email}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-500" /> Member since {joinDate}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start sm:self-center flex-shrink-0"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-5 flex flex-col items-center gap-1 text-center">
          <Play size={20} className="text-brand-red mb-1" />
          <span className="text-white text-2xl font-bold">{watchedCount}</span>
          <span className="text-gray-400 text-xs">Videos Watched</span>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 flex flex-col items-center gap-1 text-center">
          <Clock size={20} className="text-yellow-400 mb-1" />
          <span className="text-white text-2xl font-bold">{continueWatchingCount}</span>
          <span className="text-gray-400 text-xs">In Progress</span>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 flex flex-col items-center gap-1 text-center">
          <Heart size={20} className="text-pink-400 mb-1" fill="#f472b6" />
          <span className="text-white text-2xl font-bold">{watchlist.length}</span>
          <span className="text-gray-400 text-xs">Watchlist</span>
        </div>
      </div>

      {/* Watchlist preview */}
      {watchlistVideos.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Heart size={16} className="text-brand-red" fill="#E50914" />
              My List
            </h2>
            {watchlist.length > 5 && (
              <button
                onClick={() => navigate('/watchlist')}
                className="text-gray-400 hover:text-white text-xs transition-colors"
              >
                View all ({watchlist.length})
              </button>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {watchlistVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {watchlist.length === 0 && (
        <div className="bg-gray-900 rounded-xl p-8 text-center text-gray-500">
          <Heart size={36} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm">No saved videos yet.</p>
        </div>
      )}
    </div>
  )
}
