import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null })
        try {
          const { user, token } = await authService.login(username, password)
          set({ user, token, isAuthenticated: true, isLoading: false })
        } catch (err) {
          set({ error: err.message, isLoading: false })
          throw err
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ott-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
