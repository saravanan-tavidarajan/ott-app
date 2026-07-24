import { useState, useEffect } from 'react'
import { photosService } from '../services/photosService'
import useAuthStore from '../store/useAuthStore'

export function useVideos() {
  const { token } = useAuthStore()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false

    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch first page (up to 100 videos)
        const data = await photosService.getVideos(token)
        if (!cancelled) setVideos(data.videos || [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, [token])

  return { videos, loading, error }
}
