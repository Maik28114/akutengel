require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

// Models importieren
const User = require('./models/User');
const Injury = require('./models/Injury');
const SearchHistory = require('./models/SearchHistory');
const Feedback = require('./models/Feedback');

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

// Security Headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Sanitization (verhindert NoSQL Injection)
app.use(mongoSanitize());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Max 100 Requests pro IP
  message: 'Zu viele Anfragen von dieser IP, bitte später nochmal versuchen.'
});
app.use('/api/', limiter);

// ========================================
// MONGODB CONNECTION
// ========================================

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB verbunden!');
    console.log(`📦 Datenbank: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB Verbindungsfehler:', err.message);
    process.exit(1);
  });

// ========================================
// ROUTES
// ========================================

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: '🚑 AkutEngel Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      injuries: {
        getAll: 'GET /api/injuries',
        getOne: 'GET /api/injuries/:id',
        search: 'GET /api/injuries/search?q=...',
        create: 'POST /api/injuries'
      },
      feedback: {
        create: 'POST /api/feedback',
        getByInjury: 'GET /api/feedback/injury/:injuryId'
      }
    }
  });
});

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV,
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// ========================================
// AUTH ROUTES
// ========================================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validierung
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Bitte alle Felder ausfüllen'
      });
    }

    // Check ob User schon existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'E-Mail bereits registriert'
      });
    }

    // User erstellen
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    // Token generieren
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler bei der Registrierung',
      error: error.message
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Bitte E-Mail und Passwort eingeben'
      });
    }

    // User finden (mit Passwort)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Ungültige Anmeldedaten'
      });
    }

    // Passwort prüfen
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Ungültige Anmeldedaten'
      });
    }

    // Token generieren
    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Login erfolgreich',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Login',
      error: error.message
    });
  }
});

// ========================================
// INJURY ROUTES
// ========================================

// Alle Verletzungen abrufen
app.get('/api/injuries', async (req, res) => {
  try {
    const { category, severity, limit = 20 } = req.query;
    
    const query = { isActive: true };
    if (category) query.category = category;
    if (severity) query.severity = severity;

    const injuries = await Injury.find(query)
      .sort({ averageRating: -1, viewCount: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: injuries.length,
      data: injuries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Verletzungen',
      error: error.message
    });
  }
});

// Verletzung suchen - MUSS VOR :id Route kommen!
app.get('/api/injuries/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Suchbegriff fehlt'
      });
    }

    // Einfache Regex-Suche in mehreren Feldern
    const searchRegex = new RegExp(q, 'i'); // i = case-insensitive
    
    const injuries = await Injury.find({
      isActive: true,
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { symptoms: searchRegex },
        { keywords: searchRegex }
      ]
    }).sort({ averageRating: -1 });

    res.json({
      success: true,
      count: injuries.length,
      query: q,
      data: injuries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler bei der Suche',
      error: error.message
    });
  }
});

// Eine Verletzung abrufen
app.get('/api/injuries/:id', async (req, res) => {
  try {
    const injury = await Injury.findById(req.params.id);
    
    if (!injury) {
      return res.status(404).json({
        success: false,
        message: 'Verletzung nicht gefunden'
      });
    }

    // View Count erhöhen
    await injury.incrementViewCount();

    res.json({
      success: true,
      data: injury
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Verletzung',
      error: error.message
    });
  }
});

// Neue Verletzung erstellen (nur für Testing)
app.post('/api/injuries', async (req, res) => {
  try {
    const injury = await Injury.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Verletzung erstellt',
      data: injury
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Erstellen der Verletzung',
      error: error.message
    });
  }
});

// ========================================
// FEEDBACK ROUTES
// ========================================

// Feedback erstellen
app.post('/api/feedback', async (req, res) => {
  try {
    const { userId, injuryId, rating, comment, wasHelpful } = req.body;

    // Validierung
    if (!userId || !injuryId || !rating || wasHelpful === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Fehlende Pflichtfelder'
      });
    }

    const feedback = await Feedback.create({
      userId,
      injuryId,
      rating,
      comment,
      wasHelpful
    });

    res.status(201).json({
      success: true,
      message: 'Feedback gespeichert',
      data: feedback
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Du hast bereits Feedback zu dieser Verletzung gegeben'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Fehler beim Speichern des Feedbacks',
      error: error.message
    });
  }
});

// Feedback für eine Verletzung abrufen
app.get('/api/feedback/injury/:injuryId', async (req, res) => {
  try {
    const feedback = await Feedback.getByInjury(req.params.injuryId, {
      limit: 20,
      onlyVerified: false
    });

    const stats = await Feedback.getAverageRating(req.params.injuryId);

    res.json({
      success: true,
      stats,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen des Feedbacks',
      error: error.message
    });
  }
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route nicht gefunden'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ========================================
// SERVER START
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚑 Server läuft auf http://localhost:' + PORT);
  console.log('📊 API Docs: http://localhost:' + PORT + '/');
  console.log('💚 Health Check: http://localhost:' + PORT + '/api/health');
  console.log('\nDrücke Strg+C zum Beenden');
});