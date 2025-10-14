import React from 'react'
import { Link } from 'react-router-dom'

function EmergencyPage() {
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
        🚨 Notruf & Notfallnummern
      </h2>

      {/* Notruf 112 (groß & rot) */}
      <div className="bg-emergency text-white rounded-lg shadow-lg p-8 mb-6 text-center">
        <span className="text-6xl block mb-4">🚨</span>
        <h3 className="text-3xl font-bold mb-4">NOTRUF 112</h3>
        <p className="text-lg mb-6 opacity-90">
          Europaweiter Notruf • Kostenlos • 24/7 erreichbar
        </p>
        <a 
          href="tel:112"
          className="bg-white text-emergency px-8 py-4 rounded-lg text-xl 
                     font-bold inline-flex items-center space-x-2 
                     hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl">📞</span>
          <span>112 ANRUFEN</span>
        </a>
      </div>

      {/* Wann 112 anrufen? */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          ⚠️ Wann den Notruf 112 wählen?
        </h4>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Bewusstlosigkeit oder Bewusstseinsstörungen</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Starke Blutung die nicht stoppt</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Atemnot oder Atemstillstand</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Verdacht auf Herzinfarkt oder Schlaganfall</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Schwere Verbrennungen</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Verdacht auf Knochenbruch</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-emergency font-bold">•</span>
            <span className="text-gray-700">Vergiftungen</span>
          </li>
        </ul>
      </div>

      {/* Weitere Nummern */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          📞 Weitere wichtige Nummern
        </h4>
        <div className="space-y-4">
          
          {/* Ärztlicher Bereitschaftsdienst */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-800">Ärztlicher Bereitschaftsdienst</p>
              <p className="text-sm text-gray-600">Bei nicht lebensbedrohlichen Beschwerden</p>
            </div>
            <a 
              href="tel:116117"
              className="bg-success text-white px-4 py-2 rounded-lg font-bold 
                         hover:bg-green-600 transition-colors"
            >
              116 117
            </a>
          </div>

          {/* Giftnotruf */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-800">Giftnotruf</p>
              <p className="text-sm text-gray-600">Bei Vergiftungen</p>
            </div>
            <a 
              href="https://www.bfr.bund.de/de/giftnotruf-181.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-warning text-white px-4 py-2 rounded-lg font-bold 
                         hover:bg-orange-600 transition-colors text-sm"
            >
              Übersicht
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}

export default EmergencyPage