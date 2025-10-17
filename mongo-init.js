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
          minLength: 60,
          maxLength: 60,
          description: 'Muss ein bcrypt Hash sein (60 Zeichen)'
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
      required: ['name', 'category', 'severity', 'symptoms', 'firstAidSteps'],
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
        symptoms: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Liste der Symptome'
        },
        firstAidSteps: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['step', 'description'],
            properties: {
              step: { bsonType: 'int' },
              title: { bsonType: 'string' },
              description: { bsonType: 'string' },
              imageUrl: { bsonType: 'string' }
            }
          },
          description: 'Erste-Hilfe Schritte'
        },
        warnings: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        },
        when911: {
          bsonType: 'string',
          description: 'Wann 112 anrufen'
        }
      }
    }
  }
});

db.injuries.createIndex({ name: 'text' });
db.injuries.createIndex({ category: 1 });
db.injuries.createIndex({ severity: 1 });

print('✅ Injuries Collection erstellt');

// ========================================
// 3. SEARCH_HISTORY COLLECTION
// ========================================
db.createCollection('searchhistory', {
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

db.searchhistory.createIndex({ userId: 1, timestamp: -1 });
db.searchhistory.createIndex({ query: 'text' });

print('✅ Search History Collection erstellt');

// ========================================
// 4. FEEDBACK COLLECTION
// ========================================
db.createCollection('feedback', {
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

db.feedback.createIndex({ injuryId: 1, rating: -1 });
db.feedback.createIndex({ userId: 1 });

print('✅ Feedback Collection erstellt');

print('🎉 AkutEngel Datenbank erfolgreich initialisiert!');