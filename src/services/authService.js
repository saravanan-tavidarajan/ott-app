const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const authService = {
  getGoogleAuthUrl: async () => {
    const res = await fetch(`${API_BASE}/api/auth/google/url`)
    if (!res.ok) throw new Error('Failed to get auth URL')
    return res.json() // { url }
  },

  getMe: async (token) => {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to fetch user profile')
    return res.json() // { user }
  },
}
