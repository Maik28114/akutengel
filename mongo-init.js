// Datenbank für AkutEngel initialisieren
db = db.getSiblingDB('akutengel');

print('🚑 Initialisiere AkutEngel Datenbank...');

// ========================================
// 1. USERS COLLECTION
// ========================================
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Muss eine gültige E-Mail-Adresse sein'
        },
        password: {
          bsonType: 'string',
          minLength: 6,
          description: 'Passwort oder bcrypt Hash'
        },
        firstName: {
          bsonType: 'string',
          minLength: 1,
          description: 'Vorname ist erforderlich'
        },
        lastName: {
          bsonType: 'string',
          minLength: 1,
          description: 'Nachname ist erforderlich'
        },
        role: {
          enum: ['user', 'admin'],
          description: 'Benutzerrolle'
        },
        isActive: {
          bsonType: 'bool',
          description: 'Account aktiv?'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
db.users.createIndex({ role: 1 });

print('✅ Users Collection erstellt');

// ========================================
// 2. INJURIES COLLECTION (Verletzungen)
// ========================================
db.createCollection('injuries', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'category', 'severity'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Name der Verletzung'
        },
        category: {
          enum: ['Wunde', 'Verbrennung', 'Knochenbruch', 'Vergiftung', 'Atemnot', 'Bewusstlosigkeit', 'Sonstiges'],
          description: 'Kategorie der Verletzung'
        },
        severity: {
          enum: ['Leicht', 'Mittel', 'Schwer'],
          description: 'Schweregrad'
        },
        firstAidSteps: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Erste-Hilfe Schritte als einfache Strings'
        },
        symptoms: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Liste der Symptome'
        },
        warnings: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Warnhinweise'
        },
        keywords: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Suchbegriffe'
        }
      }
    }
  }
});

db.injuries.createIndex({ name: 'text', symptoms: 'text', keywords: 'text' });
db.injuries.createIndex({ category: 1, severity: 1 });

print('✅ Injuries Collection erstellt');

// ========================================
// 3. SEARCH_HISTORY COLLECTION
// ========================================
db.createCollection('searchhistories', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'query', 'searchType'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'Referenz zum User'
        },
        query: {
          bsonType: 'string',
          description: 'Suchbegriff'
        },
        searchType: {
          enum: ['text', 'image', 'voice'],
          description: 'Art der Suche'
        },
        results: {
          bsonType: 'array',
          items: { bsonType: 'objectId' },
          description: 'Gefundene Verletzungen'
        },
        timestamp: {
          bsonType: 'date'
        }
      }
    }
  }
});

db.searchhistories.createIndex({ userId: 1, timestamp: -1 });
db.searchhistories.createIndex({ query: 'text' });

print('✅ Search History Collection erstellt');

// ========================================
// 4. FEEDBACK COLLECTION
// ========================================
db.createCollection('feedbacks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'injuryId', 'rating'],
      properties: {
        userId: { bsonType: 'objectId' },
        injuryId: { bsonType: 'objectId' },
        rating: {
          bsonType: 'int',
          minimum: 1,
          maximum: 5
        },
        comment: { bsonType: 'string' },
        wasHelpful: { bsonType: 'bool' },
        createdAt: { bsonType: 'date' }
      }
    }
  }
});

db.feedbacks.createIndex({ injuryId: 1, rating: -1 });
db.feedbacks.createIndex({ userId: 1 });

print('✅ Feedback Collection erstellt');

print('🎉 AkutEngel Datenbank erfolgreich initialisiert!');