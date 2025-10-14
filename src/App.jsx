// React importieren
import React from 'react'
// Router-Komponenten importieren
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Layout-Komponente importieren
import Layout from './components/Layout'
// Alle Seiten importieren
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import UploadPage from './pages/UploadPage'
import EmergencyPage from './pages/EmergencyPage'
import ScrollToTop from './components/ScrollToTop'

// Haupt-App-Komponente
function App() {
  return (
    // BrowserRouter = Aktiviert Routing in der ganzen App
    // Muss AUSSEN um alles sein
    <BrowserRouter>
      
      {/* Layout = Header + Content + Footer */}
      {/* Bleibt auf allen Seiten gleich */}
      <Layout>
        
        {/* Routes = Container für alle Routen */}
        {/* Hier definierst du welche URL welche Seite zeigt */}
        <Routes>
          
          {/* Route = Eine einzelne Route/Seite */}
          {/* path="/" = URL-Pfad (Startseite) */}
          {/* element={<HomePage />} = Welche Komponente anzeigen */}
          <Route path="/" element={<HomePage />} />
          
          {/* Suchseite */}
          {/* URL: http://localhost:5173/search */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Upload-Seite */}
          {/* URL: http://localhost:5173/upload */}
          <Route path="/upload" element={<UploadPage />} />
          
          {/* Notruf-Seite */}
          {/* URL: http://localhost:5173/emergency */}
          <Route path="/emergency" element={<EmergencyPage />} />
          
        </Routes>
        
      </Layout>
      
    </BrowserRouter>
  )
}

// Exportieren
export default App