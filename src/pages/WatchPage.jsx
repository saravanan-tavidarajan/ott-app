import { useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ArrowLeft, Heart, Tag } from 'lucide-react'
import { getVideoById } from '../data/videos'
import useStore from '../store/useStore'

export default function WatchPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const playerRef = useRef(null)
  const hasSeekRef = useRef(false)

  const video = getVideoById(id)
  console.log("video", video)
  const { isInWatchlist, toggleWatchlist, updateProgress, getProgress } = useStore()

  const savedProgress = getProgress(Number(id))

  const handleReady = () => {
    console.log("playerRef", playerRef)
    if (!hasSeekRef.current && savedProgress && savedProgress.seconds > 5) {
      playerRef.current?.seekTo(savedProgress.seconds, 'seconds')
      hasSeekRef.current = true
    }
  }

  const handleProgress = ({ playedSeconds, played }) => {
    console.log(playedSeconds, played);
    if (video && playedSeconds > 1) {
      updateProgress(video.id, playedSeconds, playerRef.current?.getDuration() || 0)
    }
  }

  useEffect(() => {
    hasSeekRef.current = false
  }, [id])

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400 gap-4">
        <p className="text-xl">Video not found.</p>
        <button onClick={() => navigate('/')} className="text-brand-red hover:underline">
          Back to Home
        </button>
      </div>
    )
  }

  const inWatchlist = isInWatchlist(video.id)

  return (
    <div className="min-h-screen bg-black">
      {/* Back button overlay */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-white bg-black/60 hover:bg-black/80 px-3 py-2 rounded-full text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Player */}
      <div className="w-full bg-black" style={{ aspectRatio: '16/9', maxHeight: '75vh' }}>
        <ReactPlayer
          ref={playerRef}
          url={video.src}
          controls
          playing
          width="100%"
          height="100%"
          onReady={handleReady}
          onProgress={handleProgress}
          progressInterval={5000}
        />
      </div>

      {/* Video info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-1">{video.title}</h1>
            <p className="text-gray-400 text-sm mb-4">{video.subtitle}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
          </div>
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <button
              onClick={() => toggleWatchlist(video.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                inWatchlist
                  ? 'bg-brand-red text-white hover:bg-red-700'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <Heart size={16} fill={inWatchlist ? 'white' : 'none'} />
              {inWatchlist ? 'Remove from List' : 'Add to My List'}
            </button>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
              <Tag size={12} />
              {video.category}
            </span>
          </div>
        </div>

        {savedProgress && (
          <div className="mt-6">
            <p className="text-gray-500 text-xs mb-1">
              Progress: {Math.round(savedProgress.percent * 100)}%
            </p>
            <div className="h-1 bg-gray-700 rounded">
              <div
                className="h-full bg-brand-red rounded"
                style={{ width: `${Math.min(savedProgress.percent * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
