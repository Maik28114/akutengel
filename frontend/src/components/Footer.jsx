import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Über uns */}
          <div>
            <h3 className="text-lg font-bold mb-4">AkutEngel</h3>
            <p className="text-gray-400 text-sm">
              Schnelle Hilfe bei Verletzungen und Notfällen. Immer zur Stelle, wenn du uns brauchst.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                  Verletzung suchen
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-400 hover:text-white transition-colors">
                  Notruf
                </Link>
              </li>
            </ul>
          </div>

          {/* Notrufnummern */}
          <div>
            <h3 className="text-lg font-bold mb-4">Notrufnummern</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <span className="text-emergency font-bold">112</span> - Feuerwehr & Rettung
              </li>
              <li className="text-gray-400">
                <span className="text-emergency font-bold">110</span> - Polizei
              </li>
              <li className="text-gray-400">
                <span className="text-emergency font-bold">116 117</span> - Ärztl. Bereitschaft
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-lg font-bold mb-4">Rechtliches</h3>
            <p className="text-gray-400 text-sm">
              Diese App ersetzt keine ärztliche Beratung. Im Notfall immer 112 anrufen!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 AkutEngel. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer