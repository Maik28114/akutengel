// Verletzungs-spezifische Hilfsfunktionen

// Severity Farbe ermitteln
export const getSeverityColor = (severity) => {
  switch(severity) {
    case 'Leicht': 
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Mittel': 
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Schwer': 
      return 'bg-red-100 text-red-800 border-red-200'
    default: 
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Kategorie Emoji ermitteln
export const getCategoryEmoji = (category) => {
  switch(category) {
    case 'Wunde': 
      return '🩹'
    case 'Verbrennung': 
      return '🔥'
    case 'Knochenbruch': 
      return '🦴'
    case 'Vergiftung': 
      return '☠️'
    case 'Atemnot': 
      return '💨'
    case 'Bewusstlosigkeit': 
      return '😵'
    case 'Sonstiges': 
      return '❓'
    default: 
      return '🏥'
  }
}

// Prüfe ob Notfall (Schweregrad "Schwer")
export const isEmergency = (injury) => {
  return injury?.severity === 'Schwer' || injury?.emergency?.shouldCall112 === true
}

// Prüfe ob 112 angerufen werden sollte
export const shouldCall112 = (injury) => {
  return injury?.emergency?.shouldCall112 === true
}

// Verletzungen filtern
export const filterInjuries = (injuries, query, category, severity) => {
  let filtered = [...injuries]

  // Text-Suche
  if (query && query.trim()) {
    const lowercaseQuery = query.toLowerCase()
    filtered = filtered.filter(injury => 
      injury.name.toLowerCase().includes(lowercaseQuery) ||
      injury.category.toLowerCase().includes(lowercaseQuery) ||
      injury.symptoms?.some(s => s.toLowerCase().includes(lowercaseQuery)) ||
      injury.keywords?.some(k => k.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Kategorie-Filter
  if (category && category !== 'Alle') {
    filtered = filtered.filter(injury => injury.category === category)
  }

  // Schweregrad-Filter
  if (severity && severity !== 'Alle') {
    filtered = filtered.filter(injury => injury.severity === severity)
  }

  return filtered
}

// Verletzungen nach Schweregrad sortieren
export const sortBySeverity = (injuries) => {
  const severityOrder = { 'Schwer': 1, 'Mittel': 2, 'Leicht': 3 }
  return [...injuries].sort((a, b) => {
    return (severityOrder[a.severity] || 99) - (severityOrder[b.severity] || 99)
  })
}

// Verletzungen nach Kategorie gruppieren
export const groupByCategory = (injuries) => {
  return injuries.reduce((groups, injury) => {
    const category = injury.category || 'Sonstiges'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(injury)
    return groups
  }, {})
}

// Alle verfügbaren Kategorien extrahieren
export const getUniqueCategories = (injuries) => {
  const categories = injuries.map(injury => injury.category)
  return ['Alle', ...new Set(categories)]
}

// Alle verfügbaren Schweregrade extrahieren
export const getUniqueSeverities = (injuries) => {
  const severities = injuries.map(injury => injury.severity)
  return ['Alle', ...new Set(severities)]
}

// Erste-Hilfe Schritte zählen
export const countFirstAidSteps = (injury) => {
  return injury?.firstAidSteps?.length || 0
}

// Prüfe ob Verletzung Symptome hat
export const hasSymptoms = (injury) => {
  return injury?.symptoms && injury.symptoms.length > 0
}

// Prüfe ob Verletzung Warnungen hat
export const hasWarnings = (injury) => {
  return injury?.warnings && injury.warnings.length > 0
}

// Erstelle Suchvorschlag basierend auf Verletzung
export const createSearchSuggestion = (injury) => {
  return {
    title: injury.name,
    category: injury.category,
    severity: injury.severity,
    preview: injury.firstAidSteps?.[0]?.substring(0, 80) + '...'
  }
}