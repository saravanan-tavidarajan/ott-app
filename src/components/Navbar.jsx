import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, Film, X } from 'lucide-react'
import useStore from '../store/useStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const { setSearchQuery } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchQuery(localQuery)
      navigate(`/search?q=${encodeURIComponent(localQuery)}`)
      setSearchOpen(false)
    }
  }

  const handleSearchChange = (e) => {
    setLocalQuery(e.target.value)
    setSearchQuery(e.target.value)
    if (location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-brand-red font-bold text-xl tracking-widest uppercase">
          <Film size={24} />
          StreamApp
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/browse" className="hover:text-white transition-colors">Browse</Link>
          <Link to="/watchlist" className="hover:text-white transition-colors">My List</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={localQuery}
                onChange={handleSearchChange}
                placeholder="Search titles..."
                className="bg-black/70 border border-gray-600 text-white text-sm px-3 py-1.5 rounded outline-none focus:border-white w-48"
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setLocalQuery('') }}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
          )}
          <Link to="/watchlist" className="text-gray-300 hover:text-white transition-colors">
            <Heart size={20} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-sm font-bold">
            U
          </div>
        </div>
      </div>
    </nav>
  )
}
