const mongoose = require('mongoose');

const InjurySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bitte gib einen Namen an'],
    unique: true,
    trim: true
  },
  
  category: {
    type: String,
    required: [true, 'Bitte wähle eine Kategorie'],
    enum: {
      values: ['Wunde', 'Verbrennung', 'Knochenbruch', 'Vergiftung', 
               'Atemnot', 'Bewusstlosigkeit', 'Sonstiges'],
      message: '{VALUE} ist keine gültige Kategorie'
    }
  },
  
  severity: {
    type: String,
    required: [true, 'Bitte gib den Schweregrad an'],
    enum: {
      values: ['Leicht', 'Mittel', 'Schwer'],
      message: '{VALUE} ist kein gültiger Schweregrad'
    }
  },
  
  // Einfaches String-Array
  firstAidSteps: [{
    type: String,
    required: true
  }],
  
  symptoms: [{
    type: String
  }],
  
  warnings: [{
    type: String
  }],
  
  // Optional: Emergency Info
  emergency: {
    shouldCall112: {
      type: Boolean,
      default: false
    },
    urgencyLevel: {
      type: String,
      enum: ['Normal', 'Dringend', 'Notfall'],
      default: 'Normal'
    }
  },
  
  // Optional: Keywords für Suche
  keywords: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  
  // Optional: View Count
  viewCount: {
    type: Number,
    default: 0
  },
  
  // Optional: Rating
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  
  totalRatings: {
    type: Number,
    default: 0
  },
  
  // Optional: Active Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Text-Index für Volltextsuche
InjurySchema.index({ 
  name: 'text', 
  symptoms: 'text',
  keywords: 'text'
});

// Compound Index für Filter
InjurySchema.index({ category: 1, severity: 1 });

// Methode: View Count erhöhen
InjurySchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  return await this.save();
};

// Methode: Rating aktualisieren
InjurySchema.methods.updateRating = async function(newRating) {
  const totalRatings = this.totalRatings + 1;
  const currentTotal = this.averageRating * this.totalRatings;
  const newTotal = currentTotal + newRating;
  
  this.averageRating = newTotal / totalRatings;
  this.totalRatings = totalRatings;
  
  return await this.save();
};

// Statische Methode: Suche
InjurySchema.statics.searchByKeywords = function(searchTerm) {
  return this.find(
    { $text: { $search: searchTerm }, isActive: true },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// Statische Methode: Nach Kategorie filtern
InjurySchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true })
    .sort({ averageRating: -1, viewCount: -1 });
};

module.exports = mongoose.model('Injury', InjurySchema);