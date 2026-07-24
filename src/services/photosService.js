const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const authHeader = (token) => ({ Authorization: `Bearer ${token}` })

export const photosService = {
  getVideos: async (token, pageToken = null) => {
    const url = new URL(`${API_BASE}/api/photos/videos`)
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const res = await fetch(url, { headers: authHeader(token) })
    if (!res.ok) throw new Error('Failed to fetch videos')
    return res.json() // { videos, nextPageToken }
  },

  getVideoById: async (token, id) => {
    const res = await fetch(`${API_BASE}/api/photos/videos/${id}`, {
      headers: authHeader(token),
    })
    if (!res.ok) throw new Error('Video not found')
    return res.json() // { video }
  },
}
