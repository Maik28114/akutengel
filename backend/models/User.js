// Benutzer-Verwaltung
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Bitte gib eine E-Mail-Adresse an'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Bitte gib eine gültige E-Mail-Adresse an'
    ]
  },
  password: {
    type: String,
    required: [true, 'Bitte gib ein Passwort an'],
    minlength: [6, 'Passwort muss mindestens 6 Zeichen lang sein'],
    select: false // Passwort wird nicht automatisch zurückgegeben
  },
  firstName: {
    type: String,
    required: [true, 'Bitte gib deinen Vornamen an'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Bitte gib deinen Nachnamen an'],
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // automatisches createdAt und updatedAt
});

// Passwort hashen vor dem Speichern
UserSchema.pre('save', async function(next) {
  // Nur hashen wenn Passwort geändert wurde
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Methode: Passwort vergleichen
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Fehler beim Passwort-Vergleich');
  }
};

// Methode: JWT Token generieren
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Methode: User-Daten ohne sensible Infos zurückgeben
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.__v;
  return user;
};

module.exports = mongoose.model('User', UserSchema);