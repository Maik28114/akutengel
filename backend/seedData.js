require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Injury = require('./models/Injury');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starte Seed-Prozess...\n');

    // MongoDB verbinden
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB verbunden');

    // Alte Daten löschen
    console.log('🗑️ Lösche alte Test-Daten...');
    await User.deleteMany({});
    await Injury.deleteMany({});
    console.log('✅ Alte Daten gelöscht\n');

    // Test-User erstellen
    console.log('👤 Erstelle Test-User...');
    const user = await User.create({
      email: 'max@test.de',
      password: 'test123',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'admin'
    });
    console.log('✅ User erstellt: max@test.de\n');

    // Verletzungen erstellen
    console.log('🔧 Erstelle Verletzungen...');
    
    const injuriesData = [
      {
        name: 'Schnittwunde',
        category: 'Wunde',
        severity: 'Leicht',
        firstAidSteps: [
          'Hände gründlich waschen, bevor Sie die Wunde behandeln',
          'Wunde unter fließendem, lauwarmem Wasser für mindestens 1 Minute reinigen',
          'Mit sauberem Tuch leichten Druck ausüben, um Blutung zu stoppen',
          'Wunde mit sterilem Verband oder Pflaster abdecken',
          'Tetanus-Impfschutz prüfen, bei Unsicherheit Arzt aufsuchen'
        ],
        symptoms: [
          'Blutung aus der Wunde',
          'Schmerzen im betroffenen Bereich',
          'Eventuell klaffende Wundränder',
          'Rötung und Schwellung um die Wunde'
        ],
        warnings: [
          'Keine Salben oder Puder auf frische Wunden auftragen',
          'Bei tiefen Schnitten (mehr als 1cm) sofort zum Arzt',
          'Verschmutzte Wunden immer ärztlich behandeln lassen',
          'Nicht zu fest abbinden - Blutzirkulation muss erhalten bleiben'
        ],
        emergency: {
          shouldCall112: false,
          urgencyLevel: 'Normal'
        },
        keywords: ['schnitt', 'messer', 'glas', 'verletzung', 'blutung', 'wunde']
      },
      {
        name: 'Verbrennung 1. Grades',
        category: 'Verbrennung',
        severity: 'Leicht',
        firstAidSteps: [
          'Person sofort von der Hitzequelle entfernen',
          'Betroffene Stelle mit kühlem (nicht eiskaltem) Wasser für 10-15 Minuten kühlen',
          'KEINE Eiswürfel oder Kühlpacks direkt auf die Haut legen',
          'Nach dem Kühlen eine sterile, nicht fettende Wundauflage locker anbringen',
          'Bei Bedarf Schmerzmittel nach Rücksprache mit Arzt oder Apotheker'
        ],
        symptoms: [
          'Rötung der betroffenen Hautstelle',
          'Leichte Schwellung',
          'Schmerzempfindlichkeit und Brennen',
          'Warme Haut',
          'Keine Blasenbildung'
        ],
        warnings: [
          'NIEMALS Butter, Öl, Mehl oder andere Hausmittel verwenden',
          'Keine Salben auf frische Verbrennungen auftragen',
          'Blasen niemals selbst öffnen - Infektionsgefahr',
          'Bei Verbrennungen im Gesicht, an Händen oder Genitalien immer zum Arzt'
        ],
        emergency: {
          shouldCall112: false,
          urgencyLevel: 'Normal'
        },
        keywords: ['verbrennung', 'hitze', 'feuer', 'heiß', 'sonnenbrand', 'verbrühen']
      },
      {
        name: 'Nasenbluten',
        category: 'Wunde',
        severity: 'Leicht',
        firstAidSteps: [
          'Aufrecht hinsetzen oder hinstellen, leicht nach vorne beugen',
          'Kopf leicht nach VORNE neigen (nicht nach hinten!)',
          'Nasenflügel für 5-10 Minuten zusammendrücken',
          'Kaltes, feuchtes Tuch in den Nacken legen',
          'Nach dem Stoppen der Blutung für einige Stunden nicht schnäuzen'
        ],
        symptoms: [
          'Blutung aus einem oder beiden Nasenlöchern',
          'Eventuell Blutgeschmack im Mund',
          'Leichte Schmerzen in der Nase'
        ],
        warnings: [
          'Kopf NIEMALS nach hinten neigen - Verschlucken von Blut vermeiden',
          'Keine Taschentücher in die Nase stopfen',
          'Bei länger als 20 Minuten anhaltender Blutung Arzt aufsuchen',
          'Bei häufigem Nasenbluten ärztlich abklären lassen'
        ],
        emergency: {
          shouldCall112: false,
          urgencyLevel: 'Normal'
        },
        keywords: ['nase', 'nasenbluten', 'epistaxis', 'blutung']
      },
      {
        name: 'Insektenstich',
        category: 'Sonstiges',
        severity: 'Leicht',
        firstAidSteps: [
          'Stachel vorsichtig entfernen (falls vorhanden), nicht quetschen',
          'Betroffene Stelle mit kaltem Wasser oder Eispack kühlen',
          'Kühlende, juckreizstillende Salbe oder Gel auftragen',
          'Bei Schwellung: betroffene Stelle hochlagern',
          'Bei Stich im Mund: Eiswürfel lutschen und umgehend Arzt aufsuchen'
        ],
        symptoms: [
          'Lokale Rötung und Schwellung',
          'Juckreiz an der Einstichstelle',
          'Leichte Schmerzen',
          'Eventuell kleine Quaddel'
        ],
        warnings: [
          'Bei Stichen im Mund- oder Rachenraum sofort Notarzt rufen',
          'Bei bekannter Allergie sofort Notfallmedikamente anwenden',
          'Anzeichen einer allergischen Reaktion ernst nehmen',
          'Stich nicht aufkratzen - Infektionsgefahr'
        ],
        emergency: {
          shouldCall112: false,
          urgencyLevel: 'Normal'
        },
        keywords: ['insekt', 'stich', 'wespe', 'biene', 'mücke', 'bremse']
      },
      {
        name: 'Verstauchung Knöchel',
        category: 'Knochenbruch',
        severity: 'Mittel',
        firstAidSteps: [
          'Sofort pausieren und betroffenen Fuß ruhig stellen',
          'PECH-Regel anwenden: Pause, Eis, Compression, Hochlagern',
          'Knöchel mit kaltem Wasser oder Kühlpack kühlen (10-15 Minuten)',
          'Elastischen Druckverband anlegen (nicht zu fest)',
          'Fuß hochlagern über Herzhöhe',
          'Bei starken Schmerzen oder Verdacht auf Bruch: Arzt aufsuchen'
        ],
        symptoms: [
          'Sofortige Schmerzen im Knöchelbereich',
          'Schwellung des Knöchels',
          'Eventuell Bluterguss',
          'Eingeschränkte Beweglichkeit',
          'Druckschmerz'
        ],
        warnings: [
          'Nicht sofort wieder belasten',
          'Keine Wärme in den ersten 48 Stunden anwenden',
          'Bei Verdacht auf Bruch immer röntgen lassen',
          'Verband nicht zu fest anlegen - Durchblutung prüfen'
        ],
        emergency: {
          shouldCall112: false,
          urgencyLevel: 'Dringend'
        },
        keywords: ['verstauchung', 'knöchel', 'umgeknickt', 'distorsion', 'zerrung', 'bänder', 'pech-regel', 'pech']
      }
    ];

    // Alle Verletzungen auf einmal erstellen
    const injuries = await Injury.create(injuriesData);

    console.log(`✅ ${injuries.length} Verletzungen erfolgreich erstellt:`);
    injuries.forEach(injury => {
      console.log(`   ✓ ${injury.name} (${injury.category}, ${injury.severity})`);
    });

    // Zusammenfassung
    console.log('\n🎉 Seeding erfolgreich abgeschlossen!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Zusammenfassung:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   👤 Users erstellt:      ${1}`);
    console.log(`   🩹 Injuries erstellt:   ${injuries.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📧 Test-Login Daten:');
    console.log('   Email:    max@test.de');
    console.log('   Passwort: test123');
    console.log('   Rolle:    admin');
    console.log('\n🌐 API Endpoints zum Testen:');
    console.log('   Health:   http://localhost:5000/api/health');
    console.log('   Injuries: http://localhost:5000/api/injuries');
    console.log('   Suche:    http://localhost:5000/api/injuries/search?q=schnitt');
    console.log('   Filter:   http://localhost:5000/api/injuries?category=Wunde\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fehler beim Seeding:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Fehler-Message:', error.message);
    
    if (error.errors) {
      console.error('\n📋 Validierungsfehler im Detail:');
      Object.keys(error.errors).forEach(key => {
        console.error(`   ❌ ${key}: ${error.errors[key].message}`);
      });
    }
    
    console.error('\n🔍 Vollständiger Error Stack:');
    console.error(error);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
};

// Funktion ausführen
seedDatabase();