import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSeverityColor, getCategoryEmoji } from '../utils/injuryHelpers'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [injuries, setInjuries] = useState([])
  const [filteredInjuries, setFilteredInjuries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedInjury, setSelectedInjury] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [selectedSeverity, setSelectedSeverity] = useState('Alle')

  useEffect(() => {
    fetch('/api/injuries')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInjuries(data.data)
          setFilteredInjuries(data.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setError('Verbindung fehlgeschlagen')
        setLoading(false)
      })
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    applyFilters(query, selectedCategory, selectedSeverity)
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    applyFilters(searchQuery, category, selectedSeverity)
  }

  const handleSeverityFilter = (severity) => {
    setSelectedSeverity(severity)
    applyFilters(searchQuery, selectedCategory, severity)
  }

  const applyFilters = (query, category, severity) => {
    let filtered = [...injuries]

    // Text-Suche
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(injury => 
        injury.name.toLowerCase().includes(lowercaseQuery) ||
        injury.category.toLowerCase().includes(lowercaseQuery) ||
        injury.keywords?.some(k => k.toLowerCase().includes(lowercaseQuery))
      )
    }

    // Kategorie-Filter
    if (category !== 'Alle') {
      filtered = filtered.filter(injury => injury.category === category)
    }

    // Schweregrad-Filter
    if (severity !== 'Alle') {
      filtered = filtered.filter(injury => injury.severity === severity)
    }

    setFilteredInjuries(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-emergency border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Lade Verletzungen...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-red-800 text-xl font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  if (selectedInjury) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedInjury(null)}
            className="inline-flex items-center text-gray-600 hover:text-emergency transition-colors mb-8 text-lg font-medium"
          >
            <span className="text-2xl mr-2">←</span>
            <span>Zurück zur Übersicht</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  <span className="text-5xl mr-3">{getCategoryEmoji(selectedInjury.category)}</span>
                  {selectedInjury.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border-2 border-blue-200">
                    {selectedInjury.category}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getSeverityColor(selectedInjury.severity)}`}>
                    {selectedInjury.severity}
                  </span>
                </div>
              </div>
            </div>

            {/* Erste-Hilfe */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-4xl mr-3">🚑</span>
                Erste-Hilfe Maßnahmen
              </h2>
              <div className="space-y-6">
                {selectedInjury.firstAidSteps?.map((step, index) => (
                  <div key={index} className="flex gap-6 p-6 bg-gradient-to-r from-red-50 to-white rounded-xl border-l-4 border-emergency shadow-sm">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emergency text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed pt-2">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptome */}
            {selectedInjury.symptoms && selectedInjury.symptoms.length > 0 && (
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-4xl mr-3">🩺</span>
                  Symptome
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedInjury.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <span className="text-emergency text-xl mt-1">•</span>
                      <span className="text-gray-800 leading-relaxed">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnungen */}
            {selectedInjury.warnings && selectedInjury.warnings.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-yellow-900 mb-4 flex items-center">
                  <span className="text-3xl mr-3">⚠️</span>
                  Wichtige Warnungen
                </h2>
                <ul className="space-y-3">
                  {selectedInjury.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-3 text-yellow-900">
                      <span className="text-xl">⚠️</span>
                      <span className="leading-relaxed">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const categories = ['Alle', 'Wunde', 'Verbrennung', 'Knochenbruch', 'Sonstiges']
  const severities = ['Alle', 'Leicht', 'Mittel', 'Schwer']

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-emergency transition-colors mb-8 text-lg font-medium"
        >
          <span className="text-2xl mr-2">←</span>
          <span>Zurück zur Startseite</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🔍 Verletzung suchen
          </h1>
          <p className="text-xl text-gray-600">
            Finde schnell die richtigen Erste-Hilfe-Maßnahmen
          </p>
        </div>

        {/* Suchfeld */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="z.B. Schnittwunde, Verbrennung, Nasenbluten..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-emergency transition-all"
          />
          <div className="mt-4 text-gray-600 font-medium">
            <span className="text-emergency text-xl font-bold">{filteredInjuries.length}</span> {filteredInjuries.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8 space-y-4">
          {/* Kategorie-Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">KATEGORIE</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-emergency text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Schweregrad-Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">SCHWEREGRAD</h3>
            <div className="flex flex-wrap gap-2">
              {severities.map(severity => (
                <button
                  key={severity}
                  onClick={() => handleSeverityFilter(severity)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSeverity === severity
                      ? 'bg-emergency text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ergebnisse */}
        {filteredInjuries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Keine Ergebnisse gefunden</h3>
            <p className="text-gray-600">Versuche einen anderen Suchbegriff oder Filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInjuries.map(injury => (
              <div
                key={injury._id}
                onClick={() => setSelectedInjury(injury)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-emergency"
              >
                <div className="text-5xl mb-4">{getCategoryEmoji(injury.category)}</div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {injury.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold border border-blue-200">
                    {injury.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(injury.severity)}`}>
                    {injury.severity}
                  </span>
                </div>

                <p className="text-gray-600 line-clamp-2 mb-4">
                  {injury.firstAidSteps?.[0] || 'Keine Beschreibung'}
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <span className="text-emergency font-bold hover:underline inline-flex items-center">
                    Details ansehen
                    <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage