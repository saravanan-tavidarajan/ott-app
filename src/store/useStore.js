import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Watchlist
      watchlist: [],
      addToWatchlist: (id) =>
        set((state) => ({ watchlist: [...state.watchlist, id] })),
      removeFromWatchlist: (id) =>
        set((state) => ({ watchlist: state.watchlist.filter((v) => v !== id) })),
      isInWatchlist: (id) => get().watchlist.includes(id),
      toggleWatchlist: (id) => {
        if (get().isInWatchlist(id)) {
          get().removeFromWatchlist(id)
        } else {
          get().addToWatchlist(id)
        }
      },

      // Progress tracking (continue watching)
      progress: {},
      updateProgress: (id, seconds, duration) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [id]: { seconds, duration, percent: duration ? seconds / duration : 0 },
          },
        })),
      getProgress: (id) => get().progress[id] || null,
      getWatchedVideos: () => Object.keys(get().progress).map(Number),

      // Search
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: 'ott-storage',
    }
  )
)

export default useStore
