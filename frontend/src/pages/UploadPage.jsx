import React from 'react'
import { Link } from 'react-router-dom'

function UploadPage() {
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
        📷 Foto hochladen
      </h2>

      {/* Upload-Bereich */}
      <div className="bg-white rounded-lg shadow-md p-8">
        
        {/* Upload-Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 
                        text-center hover:border-emergency transition-colors cursor-pointer">
          <span className="text-6xl block mb-4">📷</span>
          <p className="text-lg text-gray-700 mb-2">
            Tippe hier oder ziehe ein Foto hierher
          </p>
          <p className="text-sm text-gray-500">
            Max. 5 MB • JPG, PNG
          </p>
        </div>

        {/* ODER-Trennlinie */}
        <div className="my-6 text-center text-gray-500">
          <span>ODER</span>
        </div>

        {/* Kamera-Button */}
        <button className="w-full bg-emergency text-white py-3 rounded-lg 
                          font-bold flex items-center justify-center space-x-2 
                          hover:bg-red-600 transition-colors">
          <span className="text-2xl">📱</span>
          <span>Kamera öffnen</span>
        </button>

      </div>

      {/* Tipps */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          💡 Tipps für gute Fotos:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Gutes Licht (nicht zu dunkel)</li>
          <li>Nah an der Verletzung</li>
          <li>Verletzung muss gut sichtbar sein</li>
        </ul>
      </div>

      {/* Platzhalter */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">
          🚧 Upload-Funktion kommt an Tag 11-12!
        </p>
      </div>

    </div>
  )
}

export default UploadPage