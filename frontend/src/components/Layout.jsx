// React importieren
import React from 'react'
// Unsere Header und Footer Komponenten importieren
import Header from './Header'
import Footer from './Footer'

// Layout-Komponente
// Wrapper für alle Seiten (zeigt Header + Content + Footer)
// 
// Verwendung: <Layout>Inhalt hier</Layout>
// "children" = alles was zwischen <Layout> und </Layout> steht
function Layout({ children }) {
  return (
    // Äußerster Container
    // min-h-screen = mindestens volle Bildschirmhöhe
    // flex flex-col = Flexbox vertikal
    // bg-gray-50 = heller grauer Hintergrund
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* HEADER (immer oben) */}
      <Header />

      {/* MAIN CONTENT (nimmt verfügbaren Platz) */}
      {/* <main> = semantisches HTML für Hauptinhalt */}
      {/* flex-1 = nimmt gesamten verfügbaren Platz zwischen Header/Footer */}
      {/* container = begrenzte Breite */}
      {/* py-6 = padding vertikal 24px */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* {children} = hier wird Seiten-Inhalt eingefügt */}
        {children}
      </main>

      {/* FOOTER (immer unten wegen flex + mt-auto) */}
      <Footer />

    </div>
  )
}

// Exportieren
export default Layout