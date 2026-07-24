import { Link } from 'react-router-dom'
import { Heart, Play } from 'lucide-react'
import { getVideoById } from '../data/videos'
import VideoCard from '../components/VideoCard'
import useStore from '../store/useStore'

export default function WatchlistPage() {
  const { watchlist } = useStore()
  const watchlistVideos = watchlist.map((id) => getVideoById(id)).filter(Boolean)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={22} className="text-brand-red" fill="#E50914" />
        <h1 className="text-white text-2xl font-bold">My List</h1>
        <span className="text-gray-400 text-sm">({watchlistVideos.length} titles)</span>
      </div>

      {watchlistVideos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlistVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-4">
          <Heart size={56} className="opacity-20" />
          <p className="text-lg text-gray-400">Your list is empty</p>
          <p className="text-sm">Save titles to watch them later</p>
          <Link
            to="/browse"
            className="mt-4 flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded font-medium hover:bg-red-700 transition-colors"
          >
            <Play size={16} />
            Browse Videos
          </Link>
        </div>
      )}
    </div>
  )
}
