# Roadmap

## Phase 0 – Kampfprototyp

Ziel: Mit externen Testpersonen prüfen, ob der aktive Kern aus Bewegung,
automatischen Angriffen, Kartenwahl und Eskalation trägt.

### P0.0 – Repository-Basis

- [x] Repository-Struktur anlegen
- [x] Prototyp auf `prototype/web/index.html` vereinheitlichen
- [x] GDD, Balancing und Testplan einsortieren
- [x] Solo-PvE als verbindlichen Scope festhalten
- [x] Issue- und Pull-Request-Vorlagen anlegen

### P0.1 – Eine Quelle für Laufzeit-Balancing

- [x] Laufzeitwerte des Prototyps dokumentieren
- [x] Abweichungen zwischen GDD, Workbook und Spielcode auflisten
- [x] Fehlende externe Simulationsskripte rekonstruieren oder durch die
  integrierten Headless-Tests ersetzen
- [x] XP-Kurve und Evolutionsbedingungen verbindlich entscheiden
- [x] Automatischen Pacing-Test reproduzierbar machen
- [x] Test bei jeder relevanten Balanceänderung ausführen

Abnahme:

- Erster Kartenzug und Anzahl der Kartenzüge liegen im vereinbarten Korridor.
- Ein 10-%-Tuningwert verdoppelt oder halbiert die Kartenzahl nicht mehr.
- GDD, Testplan und Laufzeitcode nennen dieselben Regeln.

### P0.2 – Kernloop und UX

- [ ] Start, Tod, Extraktion und Neustart ohne Erklärung verständlich machen
- [ ] Kartenwahl auf Desktop und Mobil prüfen
- [ ] Evolution in normalen 8-Minuten-Runs erreichbar machen
- [ ] Lesbarkeit von Gegnerfamilien und Bosswarnungen prüfen
- [x] Testbericht am Run-Ende kopierbar machen
- [x] Kampf über Button und Tastatur vollständig pausierbar machen

Abnahme:

- Ein neuer Spieler kann ohne Hilfe einen Run starten und Karten wählen.
- Nach Tod oder Extraktion ist der nächste sinnvolle Schritt eindeutig.
- Während eines vollständigen Runs treten keine blockierenden Fehler auf.

### P0.3 – Mobile und Performance

- [ ] Steuerung auf mindestens zwei echten Mobilgeräten testen
- [ ] Querformat, sichere Bildschirmbereiche und Touch-Ziele prüfen
- [ ] FPS und Entity-Spitzen protokollieren
- [ ] Verhalten bei Tab-Wechsel und Bildschirmunterbrechung prüfen

Abnahme:

- Mindestens 55 FPS auf den festgelegten Referenzgeräten.
- Keine unbeabsichtigten Dashs oder verlorenen Kartenwahlen.
- Ein kompletter Run verursacht keinen Absturz oder dauerhaften Hänger.

### P0.4 – Externer Spieltest

- [ ] Teilbaren Web-Build veröffentlichen
- [ ] Kurzen neutralen Fragebogen vorbereiten
- [ ] Mindestens 20 nicht beteiligte Personen testen lassen
- [ ] Zweitstart-Rate und wiederkehrende Kritikpunkte auswerten

Gate für Phase 1:

- Mindestens 50 % starten freiwillig einen zweiten Run.
- Die Mehrheit versteht Bewegung, Ember-Stoß und Kartenwahl ohne persönliche
  Erklärung.
- Es gibt keine wiederkehrende Beschwerde, die den Kernloop grundsätzlich
  infrage stellt.

## Phase 1 – Solo-PvE Vertical Slice

Wird erst nach bestandenem Phase-0-Gate begonnen.

Vorgesehener Scope:

- zwei Helden
- drei Territorien
- vier Hold-Gebäude
- Ausrüstung und Zerlegung
- lokale Speicherung und Offline-Berechnung
- ein visuell fertiges Biom
- kein Konto, Backend oder Monetarisierungssystem
