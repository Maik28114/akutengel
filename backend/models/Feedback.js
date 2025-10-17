// Bewertungen
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID ist erforderlich']
  },
  injuryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Injury',
    required: [true, 'Injury ID ist erforderlich']
  },
  rating: {
    type: Number,
    required: [true, 'Bewertung ist erforderlich'],
    min: [1, 'Bewertung muss mindestens 1 sein'],
    max: [5, 'Bewertung darf maximal 5 sein']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Kommentar darf maximal 500 Zeichen lang sein']
  },
  wasHelpful: {
    type: Boolean,
    required: [true, 'Bitte gib an, ob die Information hilfreich war']
  },
  category: {
    type: String,
    enum: ['Clarity', 'Accuracy', 'Completeness', 'Usability', 'General'],
    default: 'General'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound Index: Ein User kann nur einmal Feedback zu einer Verletzung geben
FeedbackSchema.index({ userId: 1, injuryId: 1 }, { unique: true });

// Index für Abfragen
FeedbackSchema.index({ injuryId: 1, rating: -1 });
FeedbackSchema.index({ userId: 1, createdAt: -1 });
FeedbackSchema.index({ wasHelpful: 1 });

// Methode: Feedback als verifiziert markieren
FeedbackSchema.methods.verify = async function() {
  this.isVerified = true;
  return await this.save();
};

// Methode: Admin-Antwort hinzufügen
FeedbackSchema.methods.addResponse = async function(responseText, adminId) {
  this.response = {
    text: responseText,
    respondedBy: adminId,
    respondedAt: new Date()
  };
  return await this.save();
};

// Statische Methode: Feedback für eine Verletzung abrufen
FeedbackSchema.statics.getByInjury = function(injuryId, options = {}) {
  const { limit = 10, onlyVerified = false, minRating = 1 } = options;
  
  const query = { injuryId, rating: { $gte: minRating } };
  if (onlyVerified) query.isVerified = true;

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'firstName lastName')
    .select('-__v');
};

// Statische Methode: Durchschnittsbewertung für eine Verletzung
FeedbackSchema.statics.getAverageRating = async function(injuryId) {
  const result = await this.aggregate([
    { $match: { injuryId: mongoose.Types.ObjectId(injuryId) } },
    {
      $group: {
        _id: '$injuryId',
        averageRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 },
        helpfulCount: {
          $sum: { $cond: [{ $eq: ['$wasHelpful', true] }, 1, 0] }
        },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalRatings: 0,
      helpfulCount: 0,
      helpfulPercentage: 0
    };
  }

  const data = result[0];
  return {
    averageRating: Math.round(data.averageRating * 10) / 10,
    totalRatings: data.totalRatings,
    helpfulCount: data.helpfulCount,
    helpfulPercentage: Math.round((data.helpfulCount / data.totalRatings) * 100)
  };
};

// Statische Methode: Feedback-Statistiken
FeedbackSchema.statics.getStatistics = async function() {
  return await this.aggregate([
    {
      $group: {
        _id: null,
        totalFeedback: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        helpfulCount: {
          $sum: { $cond: [{ $eq: ['$wasHelpful', true] }, 1, 0] }
        },
        rating5: {
          $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] }
        },
        rating4: {
          $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] }
        },
        rating3: {
          $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] }
        },
        rating2: {
          $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] }
        },
        rating1: {
          $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] }
        }
      }
    }
  ]);
};

// Hook: Nach dem Speichern das Rating der Verletzung aktualisieren
FeedbackSchema.post('save', async function() {
  const Injury = mongoose.model('Injury');
  try {
    const injury = await Injury.findById(this.injuryId);
    if (injury) {
      await injury.updateRating(this.rating);
    }
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Injury-Ratings:', error);
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);