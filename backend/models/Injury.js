// Verletzungen & Erste-Hilfe
const mongoose = require('mongoose');

const FirstAidStepSchema = new mongoose.Schema({
  step: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  warning: {
    type: String,
    default: null
  }
}, { _id: false });

const InjurySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bitte gib einen Namen für die Verletzung an'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Bitte wähle eine Kategorie'],
    enum: {
      values: ['Wunde', 'Verbrennung', 'Knochenbruch', 'Vergiftung', 'Atemnot', 'Bewusstlosigkeit', 'Sonstiges'],
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
  description: {
    type: String,
    required: [true, 'Bitte gib eine Beschreibung an'],
    minlength: [20, 'Beschreibung muss mindestens 20 Zeichen lang sein']
  },
  symptoms: [{
    type: String,
    required: true
  }],
  firstAidSteps: {
    type: [FirstAidStepSchema],
    required: [true, 'Bitte gib mindestens einen Erste-Hilfe-Schritt an'],
    validate: {
      validator: function(steps) {
        return steps && steps.length > 0;
      },
      message: 'Mindestens ein Erste-Hilfe-Schritt ist erforderlich'
    }
  },
  warnings: [{
    type: String
  }],
  when911: {
    type: String,
    required: [true, 'Bitte gib an, wann 112 angerufen werden sollte']
  },
  imageUrl: {
    type: String,
    default: null
  },
  keywords: [{
    type: String,
    lowercase: true,
    trim: true
  }],
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
  viewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
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

// Text-Index für Suche
InjurySchema.index({ 
  name: 'text', 
  description: 'text', 
  symptoms: 'text',
  keywords: 'text'
});

// Compound Index für Filter
InjurySchema.index({ category: 1, severity: 1 });
InjurySchema.index({ averageRating: -1 });

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

// Statische Methode: Nach Keywords suchen
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