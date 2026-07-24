import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ArrowLeft, Heart, Loader2 } from 'lucide-react'
import { photosService } from '../services/photosService'
import useAuthStore from '../store/useAuthStore'
import useStore from '../store/useStore'

export default function WatchPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const playerRef = useRef(null)
  const hasSeekRef = useRef(false)
  const { token } = useAuthStore()

  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { isInWatchlist, toggleWatchlist, updateProgress, getProgress } = useStore()
  const savedProgress = video ? getProgress(video.id) : null

  useEffect(() => {
    hasSeekRef.current = false
    setLoading(true)
    setError(null)

    photosService.getVideoById(token, id)
      .then(({ video: v }) => setVideo(v))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, token])

  const handleReady = () => {
    if (!hasSeekRef.current && savedProgress && savedProgress.seconds > 5) {
      playerRef.current?.seekTo(savedProgress.seconds, 'seconds')
      hasSeekRef.current = true
    }
  }

  const handleProgress = ({ playedSeconds }) => {
    if (video && playedSeconds > 1) {
      updateProgress(video.id, playedSeconds, playerRef.current?.getDuration() || 0)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={36} className="text-white animate-spin" />
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400 gap-4">
        <p className="text-xl">Video not found.</p>
        <p className="text-sm text-gray-600">{error}</p>
        <button onClick={() => navigate(-1)} className="text-brand-red hover:underline text-sm">
          Go Back
        </button>
      </div>
    )
  }

  const inWatchlist = isInWatchlist(video.id)

  return (
    <div className="min-h-screen bg-black">
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

      {/* Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-1">{video.title}</h1>
            {video.createdAt && (
              <p className="text-gray-400 text-sm">
                {new Date(video.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            )}
          </div>
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
