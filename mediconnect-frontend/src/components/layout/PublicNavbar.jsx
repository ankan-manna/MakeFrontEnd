import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Stethoscope, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav
      className={`sticky top-0 z-40 transition-smooth ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-soft'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2.5 text-neutral-900 font-bold text-lg group">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-smooth">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            MediConnect
          </Link>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-xl hover:bg-neutral-100 transition-soft"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-neutral-200/60 bg-white/95 backdrop-blur-xl animate-slide-up">
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link to="/login">
              <Button variant="ghost" className="w-full justify-center">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button className="w-full justify-center">Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
