// React importieren
import React from 'react'

// Haupt-Komponente
function App() {
  return (
    // Container mit Tailwind-Klassen
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Karte mit Schatten */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Überschrift in Notfall-Rot */}
        <h1 className="text-4xl font-bold text-emergency mb-4">
          🚑 AkutEngel
        </h1>
        {/* Untertitel */}
        <p className="text-gray-600 text-lg">
          Tailwind funktioniert! ✅
        </p>
        {/* Test-Button */}
        <button className="mt-4 bg-success text-white px-6 py-3 rounded-lg hover:bg-success-dark">
          Test Button
        </button>
      </div>
    </div>
  )
}

// Exportieren
export default App