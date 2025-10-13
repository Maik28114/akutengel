// React importieren
import React from 'react'

// Footer-Komponente
// Zeigt: Disclaimer + Copyright (immer unten)
function Footer() {
  return (
    // Footer = semantisches HTML
    // bg-gray-800 = dunkler Hintergrund
    // text-white = helle Schrift
    // py-6 = padding vertikal 24px
    // mt-auto = pushed to bottom (mit flex-parent)
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      
      {/* Container */}
      <div className="container mx-auto px-4">
        
        {/* Zentrierter Text */}
        <div className="text-center">
          
          {/* ===== WICHTIGER DISCLAIMER ===== */}
          {/* Flexbox für Icon + Text */}
          <div className="flex items-center justify-center mb-3">
            {/* Warnung-Icon */}
            <span className="text-2xl mr-2" role="img" aria-label="Warnung">
              ⚠️
            </span>
            {/* Überschrift */}
            {/* text-lg = groß (1.125rem = 18px) */}
            {/* font-semibold = halb-fett */}
            <p className="text-lg font-semibold">
              WICHTIGER HINWEIS
            </p>
          </div>
          
          {/* Haupt-Disclaimer-Text */}
          {/* text-gray-300 = helles Grau */}
          {/* mb-4 = margin bottom 16px */}
          {/* max-w-2xl = maximale Breite (42rem = 672px) */}
          {/* mx-auto = zentriert */}
          <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
            Diese App dient nur zur Information und ersetzt 
            {/* <strong> = fett + weiß hervorheben */}
            <strong className="text-white"> KEINE ärztliche Beratung </strong>
            oder Behandlung!
          </p>
          
          {/* Zweiter Disclaimer-Satz */}
          <p className="text-gray-300 mb-4">
            Bei ernsthaften oder anhaltenden Beschwerden immer einen Arzt aufsuchen!
          </p>

          {/* ===== TRENNLINIE ===== */}
          {/* border-t = Rahmen oben */}
          {/* border-gray-700 = dunkle Linie */}
          {/* pt-4 = padding top 16px */}
          {/* mt-4 = margin top 16px */}
          <div className="border-t border-gray-700 pt-4 mt-4">
            
            {/* Copyright & Projekt-Info */}
            {/* text-gray-400 = mittleres Grau */}
            {/* text-sm = klein */}
            <p className="text-gray-400 text-sm">
              © 2025 AkutEngel • Weiterbildungsprojekt IT Engineer
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}

// Exportieren
export default Footer