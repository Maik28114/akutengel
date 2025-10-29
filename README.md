# 🚑 AkutEngel - Erste Hilfe & Gesundheitstipps

**Moderne Full-Stack-Webanwendung für Notfälle und Erste-Hilfe-Informationen**

## 📋 Über das Projekt

**AkutEngel** ist eine moderne Web-App, die Menschen in Notfallsituationen schnellen Zugriff auf Erste-Hilfe-Informationen bietet. Die App kombiniert eine intuitive Benutzeroberfläche mit einer leistungsstarken Backend-API.

### ✨ Hauptfeatures

- 🔍 **Intelligente Verletzungssuche** - Finde schnell die richtigen Erste-Hilfe-Maßnahmen
- 🎯 **Filter & Kategorien** - Nach Schweregrad und Kategorie filtern
- 📱 **Responsive Design** - Funktioniert perfekt auf allen Geräten
- 🎨 **Moderne UI** - Professionelles Design mit Tailwind CSS
- 🚨 **Notruf-Informationen** - Direkter Zugang zu wichtigen Notrufnummern
- 📸 **Foto-Upload** - Verletzungen dokumentieren (in Entwicklung)
- 💾 **MongoDB Integration** - Skalierbare NoSQL-Datenbank
- 🔒 **Sicherheit** - JWT Authentication, bcrypt, Rate Limiting

---

## 🛠️ Tech Stack

### Backend
- **Node.js 18+** - JavaScript Runtime
- **Express.js** - Web Framework
- **MongoDB 7** - NoSQL Datenbank
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password Hashing
- **Helmet** - Security Headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - API Protection

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server (schneller als CRA)
- **React Router v6** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework
- **PostCSS** - CSS Processing
- **Axios** - HTTP Client (geplant)

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-Container Orchestration
- **Git** - Version Control
- **VS Code** - IDE
- **MongoDB Compass** - Database GUI

---

## 📁 Projektstruktur
```
akutengel/
├── docker-compose.yml          # Container Orchestration
├── mongo-init.js               # MongoDB Initialisierung
├── README.md
│
├── backend/                    # SERVER (Port 5000)
│   ├── models/
│   │   ├── User.js            # User-Model mit JWT Auth
│   │   ├── Injury.js          # Verletzungs-Model ✅
│   │   ├── SearchHistory.js   # Suchverlauf
│   │   └── Feedback.js        # Feedback-System
│   ├── seedData.js            # Test-Daten Script ✅
│   ├── server.js              # Express API ✅
│   ├── Dockerfile
│   └── package.json
│
└── frontend/                   # CLIENT (Port 5173)
    ├── public/
    │   ├── logo.webp          # App Logo
    │   └── vite.svg
    ├── src/
    │   ├── assets/            # Bilder, Icons
    │   ├── components/        # React Komponenten ✅
    │   │   ├── Header.jsx     # Navigation Header
    │   │   ├── Footer.jsx     # Footer mit Links
    │   │   ├── Layout.jsx     # Layout Wrapper
    │   │   └── ScrollToTop.jsx # Scroll-Verhalten
    │   ├── pages/             # Routen ✅
    │   │   ├── HomePage.jsx   # Startseite mit Hero
    │   │   ├── SearchPage.jsx # Verletzungssuche mit Filter
    │   │   ├── UploadPage.jsx # Foto-Upload (geplant)
    │   │   ├── EmergencyPage.jsx # Notruf-Info (geplant)
    │   │   └── NotFoundPage.jsx # 404 Seite
    │   ├── services/          # API Layer ✅
    │   │   └── api.js
    │   ├── utils/             # Hilfsfunktionen ✅
    │   │   ├── helpers.js     # Allgemeine Helpers
    │   │   └── injuryHelpers.js # Verletzungs-Helpers
    │   ├── App.jsx            # Haupt-Komponente ✅
    │   ├── index.css          # Tailwind Imports ✅
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js         # Vite Config mit Proxy ✅
    ├── tailwind.config.js     # Tailwind Config ✅
    ├── postcss.config.js      # PostCSS Config ✅
    └── package.json
```

---

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js 18+
- Docker Desktop
- Git

### 1. Repository klonen
```bash
git clone https://github.com/Maik28114/akutengel.git
cd akutengel
```

### 2. Environment Variables
```bash
# Backend .env erstellen
cp backend/.env.example backend/.env
```

**backend/.env:**
```env
MONGODB_URI=mongodb://admin:akutengel2025@mongodb:27017/akutengel?authSource=admin
PORT=5000
NODE_ENV=development
JWT_SECRET=DEIN_SUPER_GEHEIMES_JWT_SECRET
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Docker starten
```bash
# Container starten
docker-compose up -d

# Test-Daten einfügen
docker exec -it akutengel-backend node seedData.js

# Logs prüfen
docker-compose logs -f
```

### 4. Frontend starten
```bash
cd frontend
npm install
npm run dev
```

### 5. Öffnen
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 📡 API Endpoints

### System
- `GET /` - API Dokumentation
- `GET /api/health` - Health Check

### Authentication
- `POST /api/auth/register` - User registrieren
- `POST /api/auth/login` - User login

### Injuries (Verletzungen)
- `GET /api/injuries` - Alle Verletzungen
- `GET /api/injuries/:id` - Einzelne Verletzung
- `GET /api/injuries/search?q=...` - Textsuche
- `GET /api/injuries?category=Wunde` - Nach Kategorie
- `GET /api/injuries?severity=Leicht` - Nach Schweregrad
- `POST /api/injuries` - Neue Verletzung (Admin)

**Kategorien:** Wunde, Verbrennung, Knochenbruch, Vergiftung, Atemnot, Bewusstlosigkeit, Sonstiges

**Schweregrade:** Leicht, Mittel, Schwer

---

## 🎨 Design System

### Farben
- **Primary:** `#dc2626` (Emergency Rot)
- **Background:** Gradient `#fef2f2` → `#ffffff`
- **Text:** `#111827` (Grau-900)
- **Accent:** `#3b82f6` (Blau)

### Komponenten
- Tailwind CSS Utility Classes
- Mobile-first Responsive Design
- Hover & Transform Animationen
- Shadow & Gradient Effects
- Custom Tailwind Config für `emergency` Farbe

---

## 📊 Entwicklungs-Status

### ✅ Phase 1: Backend Setup - ABGESCHLOSSEN
- [x] Docker + MongoDB Container
- [x] Express API mit Security (Helmet, CORS, Rate Limiting)
- [x] Mongoose Models (User, Injury, SearchHistory, Feedback)
- [x] JWT Authentication
- [x] CRUD Operations für Verletzungen
- [x] Suche & Filter Funktionalität
- [x] Seed Script mit 5 Test-Verletzungen
- [x] API Testing erfolgreich

### ✅ Phase 2: Frontend Integration - ABGESCHLOSSEN
- [x] React + Vite Setup
- [x] Tailwind CSS Integration
- [x] React Router Konfiguration
- [x] Layout-Komponenten (Header, Footer, Layout)
- [x] HomePage mit Hero-Sektion
- [x] SearchPage mit Filter & Suche
- [x] Detail-Ansicht für Verletzungen
- [x] API Service Layer
- [x] Utility Functions (helpers, injuryHelpers)
- [x] Responsive Design
- [x] Vite Proxy für Backend-Kommunikation

### 🚧 Phase 3: Advanced Features - IN PLANUNG
- [ ] Logo Integration
- [ ] EmergencyPage (Notruf-Informationen)
- [ ] UploadPage (Foto-Upload Funktionalität)
- [ ] User Authentication UI
- [ ] Suchverlauf anzeigen
- [ ] Favoriten-System
- [ ] Admin-Dashboard
- [ ] Feedback-System UI

### 📅 Phase 4: Polish & Deployment 
- [ ] Performance Optimierung
- [ ] Accessibility (WCAG 2.1)
- [ ] Mehrsprachigkeit (DE/EN)
- [ ] PWA (Offline-Modus)
- [ ] Unit & Integration Tests
- [ ] Production Build
- [ ] Deployment (Vercel + Railway)
- [ ] Finale Dokumentation

---

## 🔒 Sicherheit

- ✅ JWT Token Authentication
- ✅ bcrypt Password Hashing (10 Rounds)
- ✅ Helmet Security Headers
- ✅ CORS Configuration
- ✅ Rate Limiting (100 req/15min)
- ✅ MongoDB Sanitization (NoSQL Injection Schutz)
- ✅ Input Validation (Mongoose)
- ✅ Environment Variables

---

## 🐳 Docker Commands
```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Neu bauen
docker-compose up -d --build

# Logs
docker-compose logs -f backend

# Seed ausführen
docker exec -it akutengel-backend node seedData.js

# MongoDB Shell
docker exec -it akutengel-mongodb mongosh -u admin -p akutengel2025
```

---

## 🧪 Testing

### Backend API testen
```bash
# Health Check
curl http://localhost:5000/api/health

# Alle Verletzungen
curl http://localhost:5000/api/injuries

# Suche
curl http://localhost:5000/api/injuries/search?q=schnitt
```

### Frontend testen
```bash
cd frontend
npm run dev
# Öffne: http://localhost:5173
```

---

## 📦 Test-Daten

Nach dem Seed-Script sind 5 Verletzungen verfügbar:
1. **Schnittwunde** (Wunde, Leicht)
2. **Verbrennung 1. Grades** (Verbrennung, Leicht)
3. **Nasenbluten** (Wunde, Leicht)
4. **Insektenstich** (Sonstiges, Leicht)
5. **Verstauchung Knöchel** (Knochenbruch, Mittel)

**Test-User:**
- Email: max@test.de
- Passwort: test123

---

## 🎯 Lernziele

- ✅ Full-Stack Development (MERN)
- ✅ RESTful API Design
- ✅ MongoDB & Mongoose
- ✅ Docker & Container
- ✅ JWT Authentication
- ✅ React Hooks & Router
- ✅ Tailwind CSS
- ✅ Git Version Control
- 🚧 File Upload & Storage
- 🚧 State Management
- 🚧 Deployment & DevOps

---

## ⚠️ Wichtiger Hinweis

**Diese App dient nur zur Information und ersetzt KEINE ärztliche Beratung!**

Bei Notfällen: **112 anrufen!**

---

## 📞 Notrufnummern (Deutschland)

- **112** - Feuerwehr & Rettungsdienst
- **110** - Polizei
- **116 117** - Ärztlicher Bereitschaftsdienst

---

## 👨‍💻 Autor

**Maik Schulz**
- 📧 Email: maik.schulz@tn.techstarter.de
- 🐙 GitHub: [@Maik28114](https://github.com/Maik28114)

