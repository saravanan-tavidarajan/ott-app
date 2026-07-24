import { useNavigate } from 'react-router-dom'
import { Play, Plus, Check } from 'lucide-react'
import useStore from '../store/useStore'

export default function HeroBanner({ video }) {
  const navigate = useNavigate()
  const { isInWatchlist, toggleWatchlist } = useStore()
  const inWatchlist = isInWatchlist(video.id)

  return (
    <div className="relative w-full h-[70vh] min-h-[400px] flex items-end">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 pb-16 max-w-xl">
        <span className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-2 block">
          {video.category}
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-3 leading-tight">
          {video.title}
        </h1>
        <p className="text-gray-300 text-sm mb-6 line-clamp-3">
          {video.description}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/watch/${video.id}`)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            <Play size={18} fill="black" />
            Play
          </button>
          <button
            onClick={() => toggleWatchlist(video.id)}
            className="flex items-center gap-2 bg-gray-600/70 text-white px-5 py-2.5 rounded font-semibold hover:bg-gray-600 transition-colors"
          >
            {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
            {inWatchlist ? 'Added' : 'My List'}
          </button>
        </div>
      </div>
    </div>
  )
}
