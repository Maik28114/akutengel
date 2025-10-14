// React Hooks importieren
import { useEffect } from 'react'
// useLocation Hook von React Router
import { useLocation } from 'react-router-dom'

// ScrollToTop-Komponente
// Scrollt automatisch nach oben bei Seitenwechsel
function ScrollToTop() {
  // pathname = aktuelle URL (z.B. "/search")
  const { pathname } = useLocation()

  // useEffect = wird ausgeführt wenn sich pathname ändert
  useEffect(() => {
    // Scrolle zum Seitenanfang
    // behavior: 'instant' = sofort (kein smooth für bessere UX)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [pathname]) // [pathname] = "führe aus wenn pathname sich ändert"

  // Diese Komponente rendert nichts (return null)
  return null
}

// Exportieren
export default ScrollToTop