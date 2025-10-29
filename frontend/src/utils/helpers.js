// Allgemeine Hilfsfunktionen (nicht spezifisch für Verletzungen)

// Text kürzen
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Datum formatieren
export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Zeit formatieren
export const formatTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Telefonnummer formatieren (entfernt Leerzeichen)
export const formatPhoneNumber = (number) => {
  if (!number) return ''
  return number.replace(/\s/g, '')
}

// Prüfe ob String leer ist
export const isEmpty = (value) => {
  return !value || value.trim() === ''
}

// Capitalize ersten Buchstaben
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Scroll zum Element
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Kopiere Text in Zwischenablage
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Fehler beim Kopieren:', err)
    return false
  }
}

// Debounce Funktion (für Suche)
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Array nach Eigenschaft sortieren
export const sortByProperty = (array, property, ascending = true) => {
  return [...array].sort((a, b) => {
    if (a[property] < b[property]) return ascending ? -1 : 1
    if (a[property] > b[property]) return ascending ? 1 : -1
    return 0
  })
}

// Zufälliges Element aus Array
export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null
  return array[Math.floor(Math.random() * array.length)]
}