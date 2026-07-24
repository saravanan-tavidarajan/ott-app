import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VideoCard from './VideoCard'

export default function VideoCarousel({ title, videos }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  if (!videos || videos.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-white text-lg font-semibold mb-3 px-4 sm:px-6">{title}</h2>
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  )
}
