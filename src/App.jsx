// React importieren
import React from 'react'
// Unser Layout importieren
import Layout from './components/Layout'

// Haupt-App-Komponente
function App() {
  return (
    // Layout umschließt alles
    // Zeigt automatisch: Header + Inhalt + Footer
    <Layout>
      
      {/* ===== STARTSEITEN-INHALT ===== */}
      {/* Dieser Bereich wird in Layout als {children} eingefügt */}
      
      {/* Container für zentrierten Inhalt */}
      {/* max-w-2xl = max. Breite 42rem (672px) */}
      {/* mx-auto = horizontal zentriert */}
      <div className="max-w-2xl mx-auto">
        
        {/* Hero-Bereich (Willkommens-Karte) */}
        {/* bg-white = weißer Hintergrund */}
        {/* rounded-lg = runde Ecken */}
        {/* shadow-md = mittlerer Schatten */}
        {/* p-8 = padding 32px */}
        {/* mb-6 = margin bottom 24px */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          
          {/* Hauptüberschrift */}
          {/* text-3xl = sehr groß (1.875rem = 30px) */}
          {/* font-bold = fett */}
          {/* text-gray-800 = dunkles Grau */}
          {/* mb-4 = margin bottom 16px */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Schnelle Hilfe in Notfällen
          </h2>
          
          {/* Untertitel */}
          {/* text-gray-600 = mittleres Grau */}
          <p className="text-gray-600 text-lg">
            Schritt-für-Schritt Anleitungen für Verletzungen und 
            alltägliche Beschwerden
          </p>
        </div>

        {/* ===== TEMPORÄRER TEST-BEREICH ===== */}
        {/* TODO: Wird an Tag 2 durch echte Buttons ersetzt */}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🚧 In Entwicklung...
          </h3>
          
          <p className="text-gray-600 mb-4">
            Tag 1 abgeschlossen! ✅
          </p>
          
          <ul className="text-sm text-gray-500 space-y-2">
            <li>✅ React mit Vite</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ Header & Footer</li>
            <li>✅ Layout-Komponente</li>
            <li>⏳ Morgen: Navigation & Startseite</li>
          </ul>
        </div>

      </div>
      
    </Layout>
  )
}

// Exportieren
export default App