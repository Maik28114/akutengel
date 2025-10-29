// API Service für Backend-Kommunikation

const API_URL = '/api'

export const injuryService = {
  // Alle Verletzungen abrufen
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/injuries`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching injuries:', error)
      throw error
    }
  },

  // Einzelne Verletzung abrufen
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/injuries/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching injury:', error)
      throw error
    }
  },

  // Verletzungen nach Kategorie filtern
  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_URL}/injuries?category=${category}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching injuries by category:', error)
      throw error
    }
  }
}

export const uploadService = {
  // Foto hochladen
  uploadImage: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }
}