import { useNavigate } from 'react-router-dom'
import { Play, Heart, HeartOff } from 'lucide-react'
import useStore from '../store/useStore'

export default function VideoCard({ video }) {
  const navigate = useNavigate()
  const { isInWatchlist, toggleWatchlist, getProgress } = useStore()
  const inWatchlist = isInWatchlist(video.id)
  const progress = getProgress(video.id)

  const handleClick = () => navigate(`/watch/${video.id}`)

  const handleWatchlist = (e) => {
    e.stopPropagation()
    toggleWatchlist(video.id)
  }

  return (
    <div
      className="relative group cursor-pointer rounded-md overflow-hidden flex-shrink-0 w-44 sm:w-52 md:w-60 transition-transform duration-200 hover:scale-105 hover:z-10"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-800 relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 items-center justify-center text-gray-500 text-xs font-medium px-2 text-center hidden"
        >
          {video.title}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Play size={18} className="text-black ml-0.5" fill="black" />
          </div>
        </div>

        {/* Watchlist button */}
        <button
          onClick={handleWatchlist}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white drop-shadow"
        >
          {inWatchlist
            ? <Heart size={16} className="text-brand-red" fill="#E50914" />
            : <Heart size={16} />
          }
        </button>
      </div>

      {/* Progress bar */}
      {progress && (
        <div className="absolute bottom-7 left-0 right-0 h-0.5 bg-gray-600">
          <div
            className="h-full bg-brand-red"
            style={{ width: `${Math.min(progress.percent * 100, 100)}%` }}
          />
        </div>
      )}

      {/* Info */}
      <div className="p-2 bg-gray-900">
        <p className="text-white text-xs font-medium truncate">{video.title}</p>
        <p className="text-gray-400 text-xs truncate">{video.subtitle}</p>
      </div>
    </div>
  )
}
