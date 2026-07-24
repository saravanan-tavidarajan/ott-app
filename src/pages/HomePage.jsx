import { Loader2 } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import VideoCarousel from '../components/VideoCarousel'
import { useVideos } from '../hooks/useVideos'
import useStore from '../store/useStore'

function SkeletonRow() {
  return (
    <div className="mb-8 px-4 sm:px-6">
      <div className="h-5 w-32 bg-gray-800 rounded mb-3 animate-pulse" />
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-44 sm:w-52 flex-shrink-0">
            <div className="aspect-video bg-gray-800 rounded animate-pulse" />
            <div className="h-3 bg-gray-800 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { videos, loading, error } = useVideos()
  const { getWatchedVideos } = useStore()

  const watchedIds = getWatchedVideos()
  const continueWatching = videos.filter((v) => watchedIds.includes(v.id))
  const featuredVideo = videos[0] || null

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <div className="w-full h-[70vh] bg-gray-900 animate-pulse" />
        <div className="relative -mt-8 z-10 pb-12">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-lg mb-2">Failed to load videos</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <Loader2 size={36} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No videos found in your Google Photos library.</p>
          <p className="text-sm mt-1 text-gray-600">Upload some videos to Google Photos and refresh.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroBanner video={featuredVideo} />
      <div className="relative -mt-8 z-10 pb-12">
        {continueWatching.length > 0 && (
          <VideoCarousel title="Continue Watching" videos={continueWatching} />
        )}
        <VideoCarousel title="My Google Photos Videos" videos={videos} />
        {videos.length > 10 && (
          <VideoCarousel title="Recently Added" videos={[...videos].reverse().slice(0, 10)} />
        )}
      </div>
    </div>
  )
}
