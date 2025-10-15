// React importieren
import React from 'react'
// Router-Komponenten importieren
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ===== COMPONENTS =====
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

// ===== PAGES =====
import EmergencyPage from './pages/EmergencyPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SearchPage from './pages/SearchPage'
import UploadPage from './pages/UploadPage'

// Haupt-App-Komponente
function App() {
  return (
    // BrowserRouter = Aktiviert Routing
    <BrowserRouter>
      
      {/* Scrollt automatisch nach oben bei Seitenwechsel */}
      <ScrollToTop />
      
      {/* Layout = Header + Content + Footer (bleibt auf allen Seiten) */}
      <Layout>
        
        {/* Routes = Container für alle Routen */}
        <Routes>
          
          {/* Startseite */}
          <Route path="/" element={<HomePage />} />
          
          {/* Suchseite */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Upload-Seite */}
          <Route path="/upload" element={<UploadPage />} />
          
          {/* Notruf-Seite */}
          <Route path="/emergency" element={<EmergencyPage />} />
          
          {/* 404 Seite (für alle anderen URLs) */}
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
        
      </Layout>
      
    </BrowserRouter>
  )
}

// Exportieren
export default App