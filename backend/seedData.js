require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Injury = require('./models/Injury');

// MongoDB verbinden
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB verbunden'))
  .catch(err => {
    console.error('❌ Fehler:', err);
    process.exit(1);
  });

// Test-Daten
const testInjuries = [
  {
    name: 'Schnittwunde',
    category: 'Wunde',
    severity: 'Leicht',
    description: 'Eine Schnittwunde ist eine durch einen scharfen Gegenstand verursachte Verletzung der Haut. Sie kann unterschiedlich tief sein und bluten.',
    symptoms: [
      'Klaffende Wunde',
      'Blutung',
      'Schmerzen',
      'Möglicherweise sichtbares Gewebe'
    ],
    firstAidSteps: [
      {
        step: 1,
        title: 'Hände waschen',
        description: 'Waschen Sie Ihre Hände gründlich mit Seife oder desinfizieren Sie sie, bevor Sie die Wunde berühren.'
      },
      {
        step: 2,
        title: 'Blutung stoppen',
        description: 'Drücken Sie mit einem sauberen Tuch oder sterilen Verband fest auf die Wunde. Halten Sie den Druck für 5-10 Minuten aufrecht.'
      },
      {
        step: 3,
        title: 'Wunde reinigen',
        description: 'Spülen Sie die Wunde vorsichtig mit klarem, lauwarmem Wasser aus. Entfernen Sie sichtbare Verschmutzungen.'
      },
      {
        step: 4,
        title: 'Desinfizieren',
        description: 'Tragen Sie ein Desinfektionsmittel auf die Wunde auf, um Infektionen vorzubeugen.'
      },
      {
        step: 5,
        title: 'Verband anlegen',
        description: 'Decken Sie die Wunde mit einem sterilen Pflaster oder Verband ab. Wechseln Sie den Verband täglich.'
      }
    ],
    warnings: [
      'Bei tiefen Schnitten sofort Arzt aufsuchen',
      'Nicht mit schmutzigen Händen anfassen',
      'Tetanus-Impfschutz überprüfen'
    ],
    when911: 'Rufen Sie den Notruf 112, wenn die Blutung nicht stoppt, die Wunde sehr tief ist, ein Fremdkörper in der Wunde steckt oder Anzeichen einer Infektion auftreten.',
    keywords: ['schnitt', 'messer', 'verletzung', 'blut', 'wunde']
  },
  {
    name: 'Verbrennung 1. Grades',
    category: 'Verbrennung',
    severity: 'Leicht',
    description: 'Eine Verbrennung ersten Grades betrifft nur die oberste Hautschicht. Die Haut ist gerötet, schmerzt und kann leicht geschwollen sein.',
    symptoms: [
      'Rötung der Haut',
      'Schmerzen',
      'Leichte Schwellung',
      'Trockene Haut'
    ],
    firstAidSteps: [
      {
        step: 1,
        title: 'Sofort kühlen',
        description: 'Halten Sie die verbrannte Stelle unter fließendes, kühles (nicht eiskaltes) Wasser für mindestens 10-15 Minuten.'
      },
      {
        step: 2,
        title: 'Kleidung entfernen',
        description: 'Entfernen Sie vorsichtig Schmuck und lockere Kleidung von der betroffenen Stelle, bevor Schwellungen auftreten.'
      },
      {
        step: 3,
        title: 'Nicht mit Eis kühlen',
        description: 'Verwenden Sie KEIN Eis direkt auf der Haut, da dies zusätzliche Schäden verursachen kann.'
      },
      {
        step: 4,
        title: 'Brandwunde schützen',
        description: 'Decken Sie die Verbrennung locker mit einem sterilen, nicht klebenden Verband ab.'
      },
      {
        step: 5,
        title: 'Schmerzmittel',
        description: 'Bei Bedarf kann ein Schmerzmittel wie Ibuprofen eingenommen werden (nach Packungsbeilage).'
      }
    ],
    warnings: [
      'KEINE Hausmittel wie Butter, Öl oder Mehl verwenden',
      'Blasen nicht aufstechen',
      'Bei Unsicherheit Arzt konsultieren'
    ],
    when911: 'Rufen Sie 112, wenn die Verbrennung größer als die Handfläche ist, das Gesicht, Hände, Füße oder Genitalien betrifft, oder bei Verbrennungen bei Kindern.',
    keywords: ['verbrennung', 'hitze', 'feuer', 'heiß', 'brand']
  },
  {
    name: 'Nasenbluten',
    category: 'Wunde',
    severity: 'Leicht',
    description: 'Nasenbluten tritt häufig spontan auf oder nach einem Schlag auf die Nase. In den meisten Fällen ist es harmlos und stoppt von selbst.',
    symptoms: [
      'Blutung aus der Nase',
      'Blutgeschmack im Mund',
      'Möglicherweise Schwindel'
    ],
    firstAidSteps: [
      {
        step: 1,
        title: 'Aufrecht hinsetzen',
        description: 'Setzen Sie sich aufrecht hin und lehnen Sie den Kopf LEICHT nach vorne (nicht nach hinten!).'
      },
      {
        step: 2,
        title: 'Nasenflügel zusammendrücken',
        description: 'Drücken Sie beide Nasenflügel fest zusammen und halten Sie den Druck für 10 Minuten.'
      },
      {
        step: 3,
        title: 'Durch den Mund atmen',
        description: 'Atmen Sie ruhig durch den Mund, während Sie die Nase zuhalten.'
      },
      {
        step: 4,
        title: 'Kühlen (optional)',
        description: 'Legen Sie einen kalten, feuchten Lappen in den Nacken oder auf die Stirn.'
      },
      {
        step: 5,
        title: 'Nach 10 Minuten Druck lösen',
        description: 'Lösen Sie den Druck vorsichtig. Wenn die Blutung anhält, wiederholen Sie den Vorgang.'
      }
    ],
    warnings: [
      'Kopf NICHT nach hinten legen (Blut kann in den Rachen laufen)',
      'Nicht in die Nase bohren oder schnäuzen',
      'Bei häufigem Nasenbluten Arzt aufsuchen'
    ],
    when911: 'Rufen Sie 112, wenn die Blutung nach 20 Minuten nicht stoppt, sehr stark ist, nach einem Unfall auftritt oder Sie Medikamente zur Blutverdünnung nehmen.',
    keywords: ['nase', 'blut', 'nasenbluten', 'epistaxis']
  },
  {
    name: 'Insektenstich',
    category: 'Sonstiges',
    severity: 'Leicht',
    description: 'Ein Insektenstich verursacht meist lokale Reaktionen wie Rötung, Schwellung und Juckreiz. In seltenen Fällen kann eine allergische Reaktion auftreten.',
    symptoms: [
      'Rötung an der Einstichstelle',
      'Schwellung',
      'Juckreiz',
      'Leichte Schmerzen',
      'Bei Allergie: Atemnot, Schwindel'
    ],
    firstAidSteps: [
      {
        step: 1,
        title: 'Stachel entfernen',
        description: 'Falls ein Stachel sichtbar ist (z.B. bei Bienen), entfernen Sie ihn vorsichtig mit einer Pinzette oder Ihrem Fingernagel. Nicht quetschen!'
      },
      {
        step: 2,
        title: 'Kühlen',
        description: 'Kühlen Sie die Einstichstelle mit einem kalten, feuchten Tuch oder einem Kühlpack (in ein Tuch gewickelt) für 15-20 Minuten.'
      },
      {
        step: 3,
        title: 'Desinfizieren',
        description: 'Reinigen Sie die Stelle mit Wasser und Seife und tragen Sie ein Desinfektionsmittel auf.'
      },
      {
        step: 4,
        title: 'Nicht kratzen',
        description: 'Vermeiden Sie Kratzen, um Infektionen vorzubeugen. Bei starkem Juckreiz kann eine kühlende Salbe helfen.'
      },
      {
        step: 5,
        title: 'Beobachten',
        description: 'Beobachten Sie die Einstichstelle auf Anzeichen einer allergischen Reaktion oder Infektion.'
      }
    ],
    warnings: [
      'Bei bekannter Insektenallergie sofort Notfallmedikament verwenden',
      'Achten Sie auf Anzeichen einer allergischen Reaktion',
      'Nicht aufkratzen'
    ],
    when911: 'Rufen Sie sofort 112 bei Atemnot, Schwellungen im Gesicht/Hals, Schwindel, schnellem Herzschlag, Übelkeit oder bekannter Insektenallergie.',
    keywords: ['insekt', 'stich', 'biene', 'wespe', 'mücke', 'allergie']
  },
  {
    name: 'Verstauchung',
    category: 'Knochenbruch',
    severity: 'Mittel',
    description: 'Eine Verstauchung entsteht durch Überdehnung oder Riss von Bändern, meist am Sprunggelenk oder Handgelenk. Die betroffene Stelle schwillt an und schmerzt.',
    symptoms: [
      'Schmerzen bei Bewegung',
      'Schwellung',
      'Bluterguss',
      'Eingeschränkte Beweglichkeit',
      'Druckempfindlichkeit'
    ],
    firstAidSteps: [
      {
        step: 1,
        title: 'PECH-Regel: Pause',
        description: 'Unterbrechen Sie sofort die Aktivität und entlasten Sie das betroffene Gelenk. Nicht weiter belasten!'
      },
      {
        step: 2,
        title: 'PECH-Regel: Eis',
        description: 'Kühlen Sie die verletzte Stelle mit einem Kühlpack (in ein Tuch gewickelt) für 15-20 Minuten. Wiederholen Sie alle 2-3 Stunden.'
      },
      {
        step: 3,
        title: 'PECH-Regel: Compression',
        description: 'Legen Sie einen elastischen Druckverband an, um die Schwellung zu reduzieren. Nicht zu fest wickeln!'
      },
      {
        step: 4,
        title: 'PECH-Regel: Hochlagern',
        description: 'Lagern Sie das verletzte Gelenk hoch (über Herzhöhe), um Schwellungen zu minimieren.'
      },
      {
        step: 5,
        title: 'Arzt aufsuchen',
        description: 'Lassen Sie die Verletzung von einem Arzt untersuchen, um einen Bruch auszuschließen.'
      }
    ],
    warnings: [
      'Nicht mit Wärme behandeln in den ersten 48 Stunden',
      'Verband nicht zu fest anlegen (Durchblutung prüfen)',
      'Bei starken Schmerzen oder Verdacht auf Bruch sofort zum Arzt'
    ],
    when911: 'Rufen Sie 112, wenn das Gelenk deformiert aussieht, starke Schmerzen bestehen, keine Bewegung möglich ist oder der Verdacht auf einen Bruch besteht.',
    keywords: ['verstauchung', 'gelenk', 'knöchel', 'handgelenk', 'bänder', 'pech']
  }
];

// Funktion zum Einfügen der Daten
async function seedDatabase() {
  try {
    console.log('🌱 Starte Seed-Prozess...\n');

    // 1. Alte Daten löschen (optional)
    console.log('🗑️  Lösche alte Test-Daten...');
    await User.deleteMany({ email: { $regex: '@test.de$' } });
    await Injury.deleteMany({});
    console.log('✅ Alte Daten gelöscht\n');

    // 2. Test-User erstellen
    console.log('👤 Erstelle Test-User...');
    const testUser = await User.create({
      email: 'max@test.de',
      password: 'test123',
      firstName: 'Max',
      lastName: 'Mustermann',
      role: 'admin'
    });
    console.log(`✅ User erstellt: ${testUser.email}\n`);

    // 3. Verletzungen erstellen
    console.log('🩹 Erstelle Verletzungen...');
    for (const injuryData of testInjuries) {
      const injury = await Injury.create({
        ...injuryData,
        createdBy: testUser._id
      });
      console.log(`✅ ${injury.name} erstellt`);
    }

    console.log('\n🎉 Seed-Prozess abgeschlossen!\n');
    console.log('📊 Zusammenfassung:');
    console.log(`   - ${await User.countDocuments()} User`);
    console.log(`   - ${await Injury.countDocuments()} Verletzungen`);
    console.log('\n🔐 Test-Login:');
    console.log('   Email: max@test.de');
    console.log('   Passwort: test123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Seed:', error);
    process.exit(1);
  }
}

// Ausführen
seedDatabase();