import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emergency rounded-full shadow-lg mb-6">
              <span className="text-5xl">🚑</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              AkutEngel
            </h1>
            <p className="text-2xl text-gray-600 font-medium">
              Schnelle Hilfe bei Verletzungen und Notfällen
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Finde sofort die richtigen Erste-Hilfe-Maßnahmen für jede Situation.
            Einfach, schnell und lebensrettend.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/search"
              className="inline-flex items-center justify-center px-8 py-4 bg-emergency text-white text-lg font-bold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-2xl mr-3">🔍</span>
              Verletzung suchen
            </Link>
            
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emergency text-lg font-bold rounded-xl shadow-lg hover:shadow-xl border-2 border-emergency transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-2xl mr-3">📸</span>
              Foto hochladen
            </Link>
          </div>

          {/* Emergency Button */}
          <div className="mb-12">
            <Link
              to="/emergency"
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-300 transform hover:scale-105 transition-all duration-200 animate-pulse"
            >
              <span className="text-3xl mr-3">🚨</span>
              NOTRUF 112
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Was kann ich für dich tun?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Schnelle Hilfe bei Verletzungen und alltäglichen Beschwerden
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link
              to="/search"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">🩹</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Verletzung suchen
              </h3>
              <p className="text-gray-700 mb-4">
                Beschreibe deine Verletzung oder Symptome und erhalte sofort passende Erste-Hilfe-Anleitungen
              </p>
              <div className="text-emergency font-semibold group-hover:underline">
                Jetzt suchen →
              </div>
            </Link>

            {/* Feature 2 */}
            <Link
              to="/upload"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Foto hochladen
              </h3>
              <p className="text-gray-700 mb-4">
                Lade ein Foto deiner Verletzung hoch und erhalte eine schnelle Einschätzung und Hilfestellung
              </p>
              <div className="text-emergency font-semibold group-hover:underline">
                Foto hochladen →
              </div>
            </Link>

            {/* Feature 3 */}
            <Link
              to="/emergency"
              className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">🚨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Notfall-Hilfe
              </h3>
              <p className="text-gray-700 mb-4">
                Direkter Zugriff auf Notrufnummern und wichtige Informationen für lebensbedrohliche Situationen
              </p>
              <div className="text-emergency font-semibold group-hover:underline">
                Notruf-Info →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Häufige Verletzungen
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Schnellzugriff auf die häufigsten Erste-Hilfe-Themen
          </p>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🩹', name: 'Wunden', color: 'bg-red-100 hover:bg-red-200' },
              { emoji: '🔥', name: 'Verbrennungen', color: 'bg-orange-100 hover:bg-orange-200' },
              { emoji: '🦴', name: 'Knochenbrüche', color: 'bg-blue-100 hover:bg-blue-200' },
              { emoji: '💊', name: 'Vergiftungen', color: 'bg-purple-100 hover:bg-purple-200' },
              { emoji: '💨', name: 'Atemnot', color: 'bg-cyan-100 hover:bg-cyan-200' },
              { emoji: '😵', name: 'Bewusstlosigkeit', color: 'bg-yellow-100 hover:bg-yellow-200' },
              { emoji: '🤕', name: 'Kopfverletzungen', color: 'bg-pink-100 hover:bg-pink-200' },
              { emoji: '❓', name: 'Sonstiges', color: 'bg-gray-100 hover:bg-gray-200' }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/search?category=${category.name}`}
                className={`${category.color} rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <div className="font-semibold text-gray-800">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl">⚠️</span>
              <div className="text-left">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  WICHTIGER HINWEIS
                </h3>
                <p className="text-yellow-900">
                  Diese App dient nur zur <strong>Information</strong> und ersetzt{' '}
                  <strong>KEINE ärztliche Beratung</strong> oder Behandlung!
                  Bei ernsthaften oder anhaltenden Beschwerden immer einen Arzt aufsuchen!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📞 Wichtige Notrufnummern
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl font-bold text-emergency mb-1">112</div>
                <div className="text-gray-700">Feuerwehr & Rettungsdienst</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emergency mb-1">110</div>
                <div className="text-gray-700">Polizei</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emergency mb-1">116 117</div>
                <div className="text-gray-700">Ärztlicher Bereitschaftsdienst</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage