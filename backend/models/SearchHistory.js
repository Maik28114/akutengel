// Suchverlauf
const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID ist erforderlich']
  },
  query: {
    type: String,
    required: [true, 'Suchbegriff ist erforderlich'],
    trim: true
  },
  searchType: {
    type: String,
    required: [true, 'Suchtyp ist erforderlich'],
    enum: {
      values: ['text', 'image', 'voice'],
      message: '{VALUE} ist kein gültiger Suchtyp'
    }
  },
  results: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Injury'
  }],
  resultCount: {
    type: Number,
    default: 0
  },
  selectedResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Injury',
    default: null
  },
  wasHelpful: {
    type: Boolean,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false // Wir nutzen nur timestamp
});

// Index für schnelle Abfragen
SearchHistorySchema.index({ userId: 1, timestamp: -1 });
SearchHistorySchema.index({ query: 'text' });
SearchHistorySchema.index({ timestamp: -1 });

// Methode: Als hilfreich markieren
SearchHistorySchema.methods.markAsHelpful = async function(helpful) {
  this.wasHelpful = helpful;
  return await this.save();
};

// Methode: Ausgewähltes Ergebnis setzen
SearchHistorySchema.methods.setSelectedResult = async function(injuryId) {
  this.selectedResult = injuryId;
  return await this.save();
};

// Statische Methode: Letzte Suchen eines Users
SearchHistorySchema.statics.getRecentByUser = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('selectedResult', 'name category severity');
};

// Statische Methode: Häufigste Suchbegriffe
SearchHistorySchema.statics.getMostSearched = function(limit = 10) {
  return this.aggregate([
    {
      $group: {
        _id: '$query',
        count: { $sum: 1 },
        avgResultCount: { $avg: '$resultCount' },
        helpfulPercentage: {
          $avg: {
            $cond: [{ $eq: ['$wasHelpful', true] }, 1, 0]
          }
        }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
};

// Statische Methode: Suchstatistiken für einen User
SearchHistorySchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalSearches: { $sum: 1 },
        textSearches: {
          $sum: { $cond: [{ $eq: ['$searchType', 'text'] }, 1, 0] }
        },
        imageSearches: {
          $sum: { $cond: [{ $eq: ['$searchType', 'image'] }, 1, 0] }
        },
        voiceSearches: {
          $sum: { $cond: [{ $eq: ['$searchType', 'voice'] }, 1, 0] }
        },
        helpfulSearches: {
          $sum: { $cond: [{ $eq: ['$wasHelpful', true] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalSearches: 0,
    textSearches: 0,
    imageSearches: 0,
    voiceSearches: 0,
    helpfulSearches: 0
  };
};

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);