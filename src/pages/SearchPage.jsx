import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { videos } from '../data/videos'
import VideoCard from '../components/VideoCard'
import useStore from '../store/useStore'

export default function SearchPage() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const { searchQuery, setSearchQuery } = useStore()
  const [localQuery, setLocalQuery] = useState(urlQuery || searchQuery)

  useEffect(() => {
    setLocalQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery])

  const query = localQuery.trim().toLowerCase()
  const results = query
    ? videos.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query) ||
          v.subtitle.toLowerCase().includes(query)
      )
    : videos

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Search input */}
      <div className="relative mb-8 max-w-lg">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          autoFocus
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search for movies, shows..."
          className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-gray-400 text-sm"
        />
      </div>

      {/* Results label */}
      <p className="text-gray-400 text-sm mb-4">
        {query ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${localQuery}"` : 'All videos'}
      </p>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <Search size={48} className="mb-4 opacity-30" />
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-1">Try a different title or category</p>
        </div>
      )}
    </div>
  )
}
