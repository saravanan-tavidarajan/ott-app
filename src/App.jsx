import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'
import BrowsePage from './pages/BrowsePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen bg-brand-dark">
        <Routes>
          {/* Watch page has its own full-screen layout without navbar */}
          <Route path="/watch/:id" element={<WatchPage />} />

          {/* All other pages share the navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/browse" element={<BrowsePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/watchlist" element={<WatchlistPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
