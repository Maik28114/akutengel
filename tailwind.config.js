/** @type {import('tailwindcss').Config} */
export default {
  // Definiere wo Tailwind nach Klassen suchen soll
  content: [
    "./index.html",              // HTML Template
    "./src/**/*.{js,ts,jsx,tsx}", // Alle React Komponenten
  ],
  theme: {
    extend: {
      // Eigene Farben definieren (für AkutEngel)
      colors: {
        // Notfall-Rot (für 112 Button, Warnungen)
        emergency: {
          DEFAULT: '#EF4444',  // Standard Rot
          dark: '#DC2626',     // Dunkleres Rot für Hover
        },
        // Erfolg-Grün (für "alles OK", leichte Verletzungen)
        success: {
          DEFAULT: '#10B981',  // Standard Grün
          dark: '#059669',     // Dunkler für Hover
        },
        // Warnung-Orange (für "Vorsicht", mittlere Schwere)
        warning: {
          DEFAULT: '#F59E0B',  // Standard Orange
          dark: '#D97706',     // Dunkler für Hover
        },
      },
      // Eigene Schriftgrößen (extra groß für Lesbarkeit)
      fontSize: {
        'huge': '2.5rem',      // 40px - für Hauptüberschriften
        'xlarge': '2rem',      // 32px - für große Überschriften
      },
      // Minimale Höhen für Touch-Targets
      minHeight: {
        'touch': '60px',       // Mindestens 60px für Buttons
      },
    },
  },
  plugins: [],
}