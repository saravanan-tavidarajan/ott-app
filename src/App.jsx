import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'
import BrowsePage from './pages/BrowsePage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen bg-brand-dark">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Watch page — full screen, no navbar */}
          <Route
            path="/watch/:id"
            element={
              <ProtectedRoute>
                <WatchPage />
              </ProtectedRoute>
            }
          />

          {/* All other protected routes share the navbar */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/watchlist" element={<WatchlistPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
