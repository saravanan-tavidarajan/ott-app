import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import VideoCard from '../components/VideoCard'
import { useVideos } from '../hooks/useVideos'
import useStore from '../store/useStore'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const { searchQuery, setSearchQuery } = useStore()
  const [localQuery, setLocalQuery] = useState(urlQuery || searchQuery)
  const { videos, loading } = useVideos()

  useEffect(() => {
    setLocalQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const query = localQuery.trim().toLowerCase()
  const results = query
    ? videos.filter((v) => v.title?.toLowerCase().includes(query))
    : videos

  const handleChange = (e) => {
    setLocalQuery(e.target.value)
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="relative mb-8 max-w-lg">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          autoFocus
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search your videos..."
          className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-gray-400 text-sm"
        />
      </div>

      <p className="text-gray-400 text-sm mb-4">
        {loading
          ? 'Loading videos...'
          : query
          ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${localQuery}"`
          : `${videos.length} videos`}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Search size={48} className="mb-4 opacity-30" />
            <p className="text-lg">No videos found</p>
            <p className="text-sm mt-1">Try a different title</p>
          </div>
        )
      )}
    </div>
  )
}
