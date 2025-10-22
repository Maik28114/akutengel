# 🚑 AkutEngel - Erste Hilfe & Gesundheitstipps

**Gesundheits-App für Notfälle und alltägliche Beschwerden**

Schnelle, verständliche Anleitungen für alle Altersgruppen

---

## 📋 Über das Projekt

**AkutEngel** ist eine Web-App, die Menschen in Notfallsituationen und bei alltäglichen Gesundheitsfragen hilft. Die App bietet:

- **Schritt-für-Schritt Anleitungen** bei Verletzungen (Schürfwunde, Schnittwunde, etc.)
- **Gesundheitstipps** bei Beschwerden (Kopfschmerzen, Fieber, etc.)
- **Schnellzugriff auf Notruf** (112, Giftnotruf)
- **Foto-Upload** zum Vergleich von Verletzungen
- **Minimalistische UI** - einfach für jung und alt

**Projekttyp:** Weiterbildungsprojekt IT Engineer  
**Entwicklungszeit:** 20 Tage (Solo)  
**Status:** 🟢 In Entwicklung (Tag 1 abgeschlossen)

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool (schneller als CRA)
- **Tailwind CSS** - Utility-First CSS
- **React Router v6** - Navigation

### Backend 
- **Node.js + Express** - REST API
- **MongoDB + Mongoose** - NoSQL Datenbank
- **Multer + GridFS** - Bildupload
- **Docker** - Containerisierung

### Tools
- **VS Code** - IDE
- **GitHub** - Versionskontrolle
- **Browser** - API Testing

---

## 📁 Projekt-Struktur

```
akutengel/
├── docker-compose.yml          # Docker Container Konfiguration
├── mongo-init.js               # MongoDB Initialisierung
├── README.md                   # Projekt-Dokumentation
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example           # Environment Variablen Beispiel
│   ├── package.json
│   ├── server.js              # Express Server & Routes
│   ├── seedData.js            # Test-Daten Script
│   │
│   └── models/
│       ├── User.js            # User Model
│       ├── Injury.js          # Verletzungs Model
│       ├── SearchHistory.js   # Suchverlauf Model
│       └── Feedback.js        # Feedback Model
│
└── frontend/                   # React Frontend
    ├── public/
    ├── src/
    │   ├── components/        # React Komponenten
    │   ├── pages/             # Seiten
    │   ├── services/          # API Services
    │   └── utils/             # Hilfsfunktionen
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Installation & Setup

### Voraussetzungen

- **Node.js v18+** ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **MongoDB** (lokal, später Atlas)
- **Docker Desktop** 

### Projekt klonen

```bash
git clone https://github.com/Maik28114/akutengel.git
cd akutengel
```

---

## 🐳 Docker Setup (Empfohlen)

### Schritt 1: Environment Variablen

Erstelle eine `.env` Datei im `backend/` Ordner:

```bash
cd backend/.env.example backend/.env
```

**Inhalt der `.env` Datei:**

```env
# MongoDB Connection (LOKAL mit Docker)
MONGODB_URI=mongodb://admin:akutengel2025@mongodb:27017/akutengel?authSource=admin

# Server Config
PORT=5000
NODE_ENV=development

# JWT Config
JWT_SECRET=DEIN_SUPER_GEHEIMES_JWT_SECRET_HIER
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Schritt 2: Docker Container starten

```bash
# Container bauen und starten
docker-compose up -d

# Logs ansehen (optional)
docker-compose logs -f
```

### Schritt 3: Test-Daten einfügen

```bash
# Seed Script im Container ausführen
docker exec -it akutengel-backend node seedData.js
```

### Schritt 4: Testen

- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/
- **Health Check:** http://localhost:5000/api/health
- **Verletzungen:** http://localhost:5000/api/injuries

---

## 🐳 Docker Commands

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Container neu bauen
docker-compose up -d --build

# Logs anzeigen
docker-compose logs -f backend
docker-compose logs -f mongodb

# Container neu starten
docker-compose restart backend

# Alle Container und Volumes löschen
docker-compose down -v

# In Backend Container einloggen
docker exec -it akutengel-backend sh

# In MongoDB Shell einloggen
docker exec -it akutengel-mongodb mongosh -u admin -p akutengel2025

# Seed Script ausführen
docker exec -it akutengel-backend node seedData.js
```

---

## 📡 API Endpoints

### System

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/` | API Dokumentation |
| GET | `/api/health` | Health Check |

### Authentication

| Method | Endpoint | Beschreibung | Body |
|--------|----------|--------------|------|
| POST | `/api/auth/register` | Neuen User registrieren | `email`, `password`, `firstName`, `lastName` |
| POST | `/api/auth/login` | User login | `email`, `password` |

### Injuries (Verletzungen)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/injuries` | Alle Verletzungen abrufen |
| GET | `/api/injuries/:id` | Einzelne Verletzung abrufen |
| GET | `/api/injuries/search?q=...` | Verletzung suchen (Textsuche) |
| GET | `/api/injuries?category=Wunde` | Nach Kategorie filtern |
| GET | `/api/injuries?severity=Leicht` | Nach Schweregrad filtern |
| POST | `/api/injuries` | Neue Verletzung erstellen (Admin) |

**Kategorien:** `Wunde`, `Verbrennung`, `Knochenbruch`, `Vergiftung`, `Atemnot`, `Bewusstlosigkeit`, `Sonstiges`

**Schweregrade:** `Leicht`, `Mittel`, `Schwer`

### Feedback

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| POST | `/api/feedback` | Feedback erstellen |
| GET | `/api/feedback/injury/:injuryId` | Feedback für Verletzung abrufen |

---

## 🔐 Test-Daten

Nach dem Ausführen des Seed-Scripts (`docker exec -it akutengel-backend node seedData.js`) sind folgende Test-Daten verfügbar:

### Test-User
- **Email:** max@test.de
- **Passwort:** test123
- **Rolle:** Admin

### Verletzungen (5 Einträge)

1. **Schnittwunde** (Wunde, Leicht)
   - 5 Erste-Hilfe Schritte
   - Symptome, Warnungen, Notruf-Info

2. **Verbrennung 1. Grades** (Verbrennung, Leicht)
   - Kühl-Anleitung
   - Was NICHT tun (Butter, Öl, etc.)

3. **Nasenbluten** (Wunde, Leicht)
   - PECH-Regel nicht anwenden
   - Kopf nach vorne

4. **Insektenstich** (Sonstiges, Leicht)
   - Stachel entfernen
   - Allergie-Warnung

5. **Verstauchung** (Knochenbruch, Mittel)
   - PECH-Regel (Pause, Eis, Compression, Hochlagern)

---

## 🧪 API Testing

### Im Browser

```bash
# Health Check
http://localhost:5000/api/health

# Alle Verletzungen
http://localhost:5000/api/injuries

# Nach Kategorie filtern
http://localhost:5000/api/injuries?category=Wunde

# Nach Schweregrad filtern
http://localhost:5000/api/injuries?severity=Leicht

# Suche
http://localhost:5000/api/injuries/search?q=schnitt
```


### MongoDB Extension (VS Code)

1. MongoDB Extension installieren
2. Connection String: `mongodb://admin:akutengel2025@localhost:27017`
3. Datenbank `akutengel` öffnen
4. Collections anschauen:
   - `users` (1 Dokument)
   - `injuries` (5 Dokumente)
   - `searchhistory` (leer)
   - `feedback` (leer)

---

## 📊 Entwicklungs-Status

### ✅ Phase 1: Backend (Tag 1-3) - ABGESCHLOSSEN

- [x] Docker + MongoDB Setup
- [x] Express Server mit Security Middleware
  - [x] Helmet (Security Headers)
  - [x] CORS
  - [x] Rate Limiting
  - [x] MongoDB Sanitization (NoSQL Injection Schutz)
- [x] Mongoose Models
  - [x] User Model (JWT Auth, bcrypt)
  - [x] Injury Model (Verletzungen)
  - [x] SearchHistory Model
  - [x] Feedback Model
- [x] Auth System (Register/Login)
- [x] CRUD Operations für Verletzungen
- [x] Suche & Filter (Regex-basiert)
- [x] Seed Script für Test-Daten
- [x] API Testing erfolgreich
- [x] MongoDB Extension Setup
- [x] Projekt-Dokumentation

### 🚧 Phase 2: Frontend Integration (Tag 4-7) - IN ARBEIT

- [ ] React Frontend mit Backend verbinden
- [ ] API Service Layer erstellen
- [ ] Login/Register UI
- [ ] Verletzungs-Liste anzeigen
- [ ] Detail-Ansicht für Verletzungen
- [ ] Such-Funktion UI
- [ ] Filter UI (Kategorie, Schweregrad)
- [ ] Responsive Design testen

### 📅 Phase 3: Advanced Features (Tag 8-14)

- [ ] Bild-Upload Funktionalität
- [ ] Bildbasierte Suche/Vergleich
- [ ] Suchverlauf speichern & anzeigen
- [ ] Favoriten-System
- [ ] User-Profil Seite
- [ ] Admin-Dashboard
- [ ] Feedback-System UI

### 🚀 Phase 4: Polish & Deployment (Tag 15-20)

- [ ] Performance Optimierung
- [ ] Accessibility (WCAG 2.1)
- [ ] Mehrsprachigkeit (DE/EN)
- [ ] Offline-Modus (PWA)
- [ ] Testing (Unit, Integration)
- [ ] Deployment (Vercel/Railway)
- [ ] Finale Dokumentation

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Sichere Token-basierte Auth
- ✅ **bcrypt** - Passwort Hashing (10 Rounds)
- ✅ **Helmet** - Security HTTP Headers
- ✅ **CORS** - Cross-Origin Resource Sharing Kontrolle
- ✅ **Rate Limiting** - 100 Requests pro 15 Minuten
- ✅ **MongoDB Sanitization** - NoSQL Injection Schutz
- ✅ **Input Validation** - Mongoose Schema Validierung
- ✅ **Environment Variables** - Secrets nicht im Code

---

## 📞 Support & Links

- 📧 **Email:** maik.schulz@tn.techstarter.de
- 🐙 **GitHub:** https://github.com/Maik28114/akutengel.git
- 💼 **LinkedIn:** dein-profil

---

## 🎯 Lernziele

Durch dieses Projekt lerne ich:
- ✅ Full-Stack Development (MERN Stack)
- ✅ RESTful API Design
- ✅ MongoDB & Mongoose
- ✅ Docker & Container
- ✅ JWT Authentication
- ✅ Git Version Control
- ✅ Agile Entwicklung
- 🚧 React State Management
- 🚧 File Upload & Storage
- 🚧 Deployment & DevOps

---

**Made with ❤️ and 🚑 by [Maik Schulz]**

*Weil jeder schnell Hilfe verdient!*