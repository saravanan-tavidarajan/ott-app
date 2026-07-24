import { useNavigate } from 'react-router-dom'
import { LogOut, User, Mail, Tag, Calendar, Play, Heart, Clock } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import useStore from '../store/useStore'
import { getVideoById } from '../data/videos'
import VideoCard from '../components/VideoCard'

function Avatar({ name, size = 'lg' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'
  const sizeClass = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-8 h-8 text-sm'
  return (
    <div className={`${sizeClass} rounded-full bg-brand-red flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  )
}

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const { watchlist, progress } = useStore()
  const navigate = useNavigate()

  const watchedCount = Object.keys(progress).length
  const continueWatchingCount = Object.values(progress).filter(
    (p) => p.percent > 0.05 && p.percent < 0.95
  ).length
  const watchlistVideos = watchlist.map((id) => getVideoById(id)).filter(Boolean).slice(0, 5)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const joinDate = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header card */}
      <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar name={user?.name} size="lg" />
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-2xl font-bold">{user?.name}</h1>
          <span className="inline-block mt-1 mb-3 text-xs text-brand-red font-semibold bg-brand-red/10 border border-brand-red/30 px-2.5 py-1 rounded-full">
            {user?.role}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <User size={14} className="text-gray-500" /> {user?.username}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" /> {user?.email}
            </span>
            <span className="flex items-center gap-2">
              <Tag size={14} className="text-gray-500" /> ID: {user?.id}
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
          <p className="text-sm">No saved videos yet. Browse and add some!</p>
        </div>
      )}
    </div>
  )
}
