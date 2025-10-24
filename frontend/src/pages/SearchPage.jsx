import React from 'react'
import { Link } from 'react-router-dom'

function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Zurück-Button */}
      <Link 
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-emergency transition-colors mb-4"
      >
        <span className="text-xl mr-2">←</span>
        <span>Zurück zur Startseite</span>
      </Link>

      {/* Titel */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 Verletzung oder Beschwerde suchen
      </h2>

      {/* Suchfeld */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <input 
          type="text"
          placeholder="z.B. Schürfwunde, Kopfschmerzen, Fieber..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg
                     focus:outline-none focus:ring-2 focus:ring-emergency"
        />
        <button className="mt-4 w-full bg-emergency text-white py-3 rounded-lg 
                          font-bold hover:bg-red-600 transition-colors">
          Suchen
        </button>
      </div>

      {/* Platzhalter */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Hier werden später die Suchergebnisse angezeigt.
        </p>
      </div>

    </div>
  )
}

export default SearchPage