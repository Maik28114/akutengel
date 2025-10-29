import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-emergency rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🚑</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AkutEngel</h1>
              <p className="text-xs text-gray-600">Erste Hilfe & Gesundheitstipps</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/search"
              className="text-gray-700 hover:text-emergency font-medium transition-colors"
            >
              🔍 Suchen
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-emergency font-medium transition-colors"
            >
              📸 Upload
            </Link>
            <Link
              to="/emergency"
              className="px-4 py-2 bg-emergency text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              🚨 Notruf
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-emergency">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header