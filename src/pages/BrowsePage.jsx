import VideoCard from '../components/VideoCard'
import { useVideos } from '../hooks/useVideos'

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-video bg-gray-800 rounded animate-pulse" />
          <div className="h-3 bg-gray-800 rounded mt-2 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function BrowsePage() {
  const { videos, loading, error } = useVideos()

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <h1 className="text-white text-2xl font-bold mb-6">Browse All Videos</h1>

      {loading && <SkeletonGrid />}

      {error && (
        <p className="text-gray-400 text-sm">Failed to load videos: {error}</p>
      )}

      {!loading && !error && videos.length === 0 && (
        <p className="text-gray-400 text-sm">No videos found in your Google Photos library.</p>
      )}

      {!loading && !error && videos.length > 0 && (
        <>
          <p className="text-gray-400 text-sm mb-4">{videos.length} videos</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
