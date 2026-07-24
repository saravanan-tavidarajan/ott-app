import { videos, getFeaturedVideo, getVideosByCategory, CATEGORIES } from '../data/videos'
import HeroBanner from '../components/HeroBanner'
import VideoCarousel from '../components/VideoCarousel'
import useStore from '../store/useStore'

export default function HomePage() {
  const featured = getFeaturedVideo()
  const { getWatchedVideos } = useStore()
  const watchedIds = getWatchedVideos()
  const continueWatching = videos.filter((v) => watchedIds.includes(v.id))

  return (
    <div className="min-h-screen">
      <HeroBanner video={featured} />

      <div className="relative -mt-8 z-10 pb-12">
        {continueWatching.length > 0 && (
          <VideoCarousel title="Continue Watching" videos={continueWatching} />
        )}
        {CATEGORIES.map((cat) => (
          <VideoCarousel
            key={cat}
            title={cat}
            videos={getVideosByCategory(cat)}
          />
        ))}
      </div>
    </div>
  )
}
