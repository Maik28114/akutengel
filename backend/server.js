// ===== IMPORTS =====
// Express = Web Framework für Node.js
const express = require('express');
// Mongoose = MongoDB Object Data Modeling
const mongoose = require('mongoose');
// Dotenv = Lädt Environment Variables aus .env Datei
const dotenv = require('dotenv');
// Cors = Erlaubt Cross-Origin Requests (Frontend → Backend)
const cors = require('cors');

// ===== KONFIGURATION =====
// Lade Environment Variables aus .env Datei
dotenv.config();

// Erstelle Express App
const app = express();

// Port aus Environment Variable oder Default 3000
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Middleware = Funktionen die vor den Routes ausgeführt werden

// CORS aktivieren (erlaubt Requests vom Frontend)
// origin: Frontend URL (localhost:5173 = Vite Dev Server)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// JSON Body Parser (damit wir JSON empfangen können)
// Beispiel: POST Request mit JSON Daten im Body
app.use(express.json());

// URL-encoded Parser (für Formulardaten)
app.use(express.urlencoded({ extended: true }));

// Request Logger (zeigt alle Requests in Console)
// Hilfreich für Debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // next() = weiter zur nächsten Middleware/Route
});

// ===== ROUTES (API ENDPUNKTE) =====

// Test Route (um zu prüfen ob Server läuft)
// GET http://localhost:3000/
app.get('/', (req, res) => {
  // res.json() = sendet JSON Response
  res.json({ 
    message: '🚑 AkutEngel API läuft!',
    version: '1.0.0',
    endpoints: {
      injuries: '/api/injuries',
      search: '/api/search',
      emergency: '/api/emergency'
    }
  });
});

// Health Check Route (prüft ob Server erreichbar ist)
// GET http://localhost:3000/api/health
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime() // Wie lange läuft der Server?
  });
});

// ===== PLATZHALTER FÜR SPÄTERE ROUTES =====
// Diese implementieren wir später (Tag 4-5)

// GET /api/injuries - Alle Verletzungen abrufen
app.get('/api/injuries', (req, res) => {
  // TODO: Implementieren an Tag 4
  res.json({ 
    message: 'Injuries Endpoint - kommt an Tag 4',
    data: []
  });
});

// GET /api/injuries/:id - Eine spezifische Verletzung
app.get('/api/injuries/:id', (req, res) => {
  // req.params.id = ID aus URL
  const { id } = req.params;
  
  // TODO: Implementieren an Tag 4
  res.json({ 
    message: `Injury ${id} - kommt an Tag 4`,
    id: id
  });
});

// POST /api/search - Suche nach Verletzungen/Beschwerden
app.post('/api/search', (req, res) => {
  // req.body = JSON Daten aus Request Body
  const { query } = req.body;
  
  // TODO: Implementieren an Tag 5
  res.json({ 
    message: 'Search Endpoint - kommt an Tag 5',
    query: query,
    results: []
  });
});

// ===== 404 HANDLER =====
// Wenn keine Route matched, zeige 404
// Muss NACH allen anderen Routes kommen!
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route nicht gefunden',
    path: req.url,
    method: req.method
  });
});

// ===== ERROR HANDLER =====
// Globaler Error Handler
// Fängt alle Fehler in der App ab
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Interner Server Fehler',
    message: err.message 
  });
});

// ===== MONGODB VERBINDUNG =====
// Verbinde mit MongoDB Datenbank
const connectDB = async () => {
  try {
    // MongoDB Connection String aus .env Datei
    // Falls nicht gesetzt, nutze lokale MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/akutengel';
    
    // Verbinde mit MongoDB
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB verbunden!');
  } catch (error) {
    console.error('❌ MongoDB Verbindungsfehler:', error.message);
    // Beende Prozess bei Fehler
    process.exit(1);
  }
};

// ===== SERVER STARTEN =====
// Funktion zum Starten des Servers
const startServer = async () => {
  // Erst Datenbank verbinden
  await connectDB();
  
  // Dann Server starten
  app.listen(PORT, () => {
    console.log(`\n🚀 Server läuft auf http://localhost:${PORT}`);
    console.log(`📊 API Docs: http://localhost:${PORT}/`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`\nDrücke Strg+C zum Beenden\n`);
  });
};

// Server starten
startServer();

// ===== GRACEFUL SHUTDOWN =====
// Sauberes Herunterfahren bei Strg+C
process.on('SIGINT', async () => {
  console.log('\n\n⏹️  Server wird heruntergefahren...');
  await mongoose.connection.close();
  console.log('✅ MongoDB Verbindung geschlossen');
  process.exit(0);
});