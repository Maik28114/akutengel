import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          💬 Was kann ich für dich tun?
        </h2>
        <p className="text-gray-600 text-lg">
          Schnelle Hilfe bei Verletzungen und alltäglichen Beschwerden
        </p>
      </div>

      {/* Haupt-Aktionen */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Button 1: Suchen (groß) */}
        <Link 
          to="/search"
          className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <span className="text-5xl">🔍</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-emergency">
                Verletzung oder Beschwerde suchen
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                z.B. "Schürfwunde", "Kopfschmerzen", "Fieber"
              </p>
            </div>
            <span className="text-2xl text-gray-400 group-hover:text-emergency">→</span>
          </div>
        </Link>

        {/* 2 kleinere Buttons nebeneinander */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Button 2: Foto */}
          <Link 
            to="/upload"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <span className="text-4xl block mb-2">📷</span>
            <h3 className="font-bold text-gray-800 group-hover:text-emergency">
              Foto hochladen
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Verletzung fotografieren
            </p>
          </Link>

          {/* Button 3: Themen */}
          <Link 
            to="/search"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <span className="text-4xl block mb-2">📚</span>
            <h3 className="font-bold text-gray-800 group-hover:text-emergency">
              Themen stöbern
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Nach Kategorien
            </p>
          </Link>

        </div>

        {/* Button 4: Notruf (rot) */}
        <Link 
          to="/emergency"
          className="bg-emergency text-white rounded-lg shadow-md p-6 hover:bg-red-600 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <span className="text-4xl">🚨</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Notruf 112</h3>
              <p className="text-red-100 text-sm">Bei lebensbedrohlichen Situationen</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </Link>

      </div>

      {/* Hinweis-Box */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-warning p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>💡 Tipp:</strong> Bei Unsicherheit oder schweren Verletzungen 
          immer den Notruf 112 wählen!
        </p>
      </div>

    </div>
  )
}

export default HomePage