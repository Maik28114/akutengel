// React importieren
import React from 'react'

// Header-Komponente
// Zeigt: Logo + Notruf-Button (immer oben)
function Header() {
  return (
    // Header = semantisches HTML (gut für Screenreader)
    // bg-emergency = unser Notfall-Rot aus tailwind.config.js
    // text-white = weiße Schrift
    // shadow-lg = großer Schatten (3D-Effekt)
    <header className="bg-emergency text-white shadow-lg">
      
      {/* Container = begrenzt Breite, zentriert Inhalt */}
      {/* mx-auto = margin horizontal auto = zentriert */}
      {/* px-4 = padding horizontal 16px */}
      {/* py-4 = padding vertical 16px */}
      <div className="container mx-auto px-4 py-4">
        
        {/* Flex-Container für Logo (links) und Notruf (rechts) */}
        {/* flex = Flexbox aktivieren */}
        {/* items-center = vertikal zentriert */}
        {/* justify-between = maximaler Abstand zwischen Elementen */}
        <div className="flex items-center justify-between">
          
          {/* ===== LOGO & TITEL (linke Seite) ===== */}
          <div className="flex items-center space-x-3">
            
            {/* ===== DEIN LOGO (statt Emoji) ===== */}
            {/* src="/logo.webp" = Pfad zur Datei in public/ */}
            {/* Der Slash (/) am Anfang bedeutet: "Im public/ Ordner" */}
            {/* alt = Alternativtext für Screenreader & wenn Bild nicht lädt */}
            {/* w-14 = width 56px (3.5rem) */}
            {/* h-14 = height 56px (3.5rem) */}
            {/* object-contain = Bild behält Proportionen, wird nicht verzerrt */}
            <img 
              src="/logo.webp" 
              alt="AkutEngel Logo - Engel mit Erste-Hilfe Herz" 
              className="w-14 h-14 object-contain"
            />
            
            {/* Titel-Bereich */}
            <div>
              {/* App-Name */}
              {/* text-2xl = groß (1.5rem = 24px) */}
              {/* font-bold = fette Schrift */}
              <h1 className="text-2xl font-bold">
                AkutEngel
              </h1>
              
              {/* Untertitel */}
              {/* text-sm = klein (0.875rem = 14px) */}
              {/* opacity-90 = leicht transparent (90%) */}
              {/* hidden = versteckt auf kleinen Screens */}
              {/* sm:block = sichtbar ab Tablet-Größe (640px+) */}
              <p className="text-sm opacity-90 hidden sm:block">
                Erste Hilfe & Gesundheitstipps
              </p>
            </div>
          </div>

          {/* ===== NOTRUF BUTTON (rechte Seite) ===== */}
          {/* <a href="tel:112"> = Link der Telefon-App öffnet */}
          {/* bg-white = weißer Hintergrund */}
          {/* text-emergency = unser Rot für Text */}
          {/* px-6 py-3 = Innenabstände */}
          {/* rounded-lg = runde Ecken */}
          {/* hover:bg-gray-100 = bei Mouse-Over hellgrau */}
          {/* transition-colors = smooth Farbübergang */}
          <a 
            href="tel:112"
            className="bg-white text-emergency px-6 py-3 rounded-lg 
                       font-bold hover:bg-gray-100 transition-colors 
                       flex items-center space-x-2"
            aria-label="Notruf 112 anrufen"
          >
            {/* Telefon-Icon */}
            <span className="text-xl">📞</span>
            
            {/* Button-Text */}
            {/* hidden auf kleinen Screens (nur Icon) */}
            {/* sm:inline = sichtbar ab 640px+ */}
            <span className="hidden sm:inline">Notruf 112</span>
          </a>

        </div>
      </div>
    </header>
  )
}

// Exportieren damit andere Dateien es nutzen können
export default Header