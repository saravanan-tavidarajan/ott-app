import { useState } from 'react'
import { CATEGORIES, getVideosByCategory } from '../data/videos'
import VideoCarousel from '../components/VideoCarousel'
import VideoCard from '../components/VideoCard'

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const allCats = ['All', ...CATEGORIES]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="px-4 sm:px-6 mb-8">
        <h1 className="text-white text-2xl font-bold mb-6">Browse</h1>
        {/* Category filter chips */}
        <div className="flex gap-2 flex-wrap">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === 'All' ? (
        CATEGORIES.map((cat) => (
          <VideoCarousel
            key={cat}
            title={cat}
            videos={getVideosByCategory(cat)}
          />
        ))
      ) : (
        <div className="px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {getVideosByCategory(activeCategory).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
