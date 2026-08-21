# Roadmap

## Aktueller Arbeitsfokus

Diese Reihenfolge ist die verbindliche Übergabe für den nächsten Entwickler.
Nicht mehrere Grafikfamilien gleichzeitig beginnen:

1. [ ] Einen vollständigen 8-Minuten-Run mit dem animierten Schwärmer spielen.
   Run-Bericht, schlechteste FPS sowie Auffälligkeiten bei Lesbarkeit,
   Bodenkontakt und Bewegungsruhe festhalten. Der bisherige Browser-Smoke von
   mindestens 59 FPS bei 53 sichtbaren Gegnern nach etwa 30 Sekunden ist nur
   ein vorläufiger Technikcheck.
2. [ ] Danach Phase 0.5 als Content- und Rückkehr-Slice umsetzen: zuerst drei
   Sortieverträge, dann vollständige Buildpfade, anschließend Hold-Ausbau und
   Ausrüstung. Die Pakete stehen weiter unten und werden einzeln geprüft.
3. [ ] Gegneranimationen erst nach dem Content-Slice fortsetzen. Stürmer,
   Speier, Teiler und Wahrer bleiben in dieser Reihenfolge vorgesehen, sind
   aber nicht mehr der nächste Produktmeilenstein.
4. [ ] Erst danach entscheiden, ob Aelric einen aufwendigeren Richtungsatlas
   mit 6–8 Lauf- und Bogenphasen erhält.

**Stand 21.08.2026 zu Punkt 1.** Der Punkt bleibt offen. Der gerenderte
8-Minuten-Run konnte nicht durchgeführt werden: In der Claude-Code-Umgebung wird
die Browser-Pane nicht angezeigt, dadurch komponiert die Seite keine Frames,
`requestAnimationFrame` feuert null Mal und die Rundenuhr bleibt bei 0:00 stehen.
Eine echte FPS-Messung setzt ein sichtbares Fenster voraus und muss deshalb vom
Besitzer oder bei geöffneter Pane gefahren werden.

Vorbereitend gemessen und dokumentiert wurde:

- `npm test` ist grün (24/24 Checks, Exitcode 0). D-017 und D-018 sind mit
  Commit `246cc64` auf `main` gesichert.
- Der Schwärmer-Renderpfad hält D-014, D-015 und D-016 vollständig ein:
  deterministischer Phasenversatz, vorgerenderter Kontaktschatten, ein
  Zeichendurchlauf, keine Rotation an Rasterfiguren, allokationsfreie
  Schwarmschleife. Dort ist nichts zu reparieren.
- Die Zieldichte ist seit D-017 auf allen Querformaten identisch: 42 Gegner bei
  0:30, 301 bei 8:00, Spitze 338 im Simulationsradius. Der alte Smoke-Wert von
  53 Gegnern bei 0:30 stammt aus einem 16:9-Fenster vor der Entkopplung und ist
  doppelt überholt. Details in `docs/TESTPLAN.md`.
- Wie viele Gegner davon tatsächlich gezeichnet werden, steht seit der
  Telemetrietrennung getrennt als `visibleEnemies`/`peakVisibleEnemies` in der
  Entwickleranzeige und im Run-Bericht. Diese Zahl kann erst der manuelle Run
  liefern, weil sie nur beim echten Rendern entsteht.

- [x] D-017 entschieden und umgesetzt: Die Simulation ist vom Seitenverhältnis
  entkoppelt, 1000×700 ist die feste Balance-Referenz. `npm test` führt
  `resize()` jetzt wirklich aus und verlangt über 1000×700, 1280×720, 1536×864
  und 844×390 bitgenau identische Ergebnisse (`aspectIndependent`). Die
  Referenzmessung blieb unverändert.
- [x] D-018 abgesichert: `configStable` vergleicht die gesamte
  Balancekonfiguration vor und nach `runBalanceSuite()`.
- [x] Simulations- und Rendertelemetrie getrennt: `nearbyEnemies` steuert das
  Nachspawnen, `visibleEnemies`/`peakVisibleEnemies` zählen die tatsächlich
  gezeichneten Gegner. Die Balance nutzt ausschließlich `nearbyEnemies`.
- [x] Cover auf 16:9 gedeckelt. Breitere Formate behalten einen zentralen
  Kampfausschnitt von 1000 × 563 Welteinheiten; überschüssige Breite wird
  seitliche Safe-Area, und Welt, Gegner und Telegrafien werden darauf geclippt.
- [ ] **Offen:** Den 8-Minuten-Run bei sichtbarem Fenster fahren und dabei
  ausdrücklich das Fenster 6:00–8:00 protokollieren, nicht nur den Start.
  Mitzuprüfen sind drei Dinge, die keine Messung beantworten kann:
  ob der Kampfausschnitt von 1000 × 563 auf 16:9 zu eng wirkt, ob die seitliche
  Safe-Area auf breiten Formaten ruhig statt abgeschnitten aussieht, und ob der
  Warden beim Einstieg vollständig sichtbar ist (siehe Vorbehalt in D-017).

Ton bleibt auf Wunsch ausdrücklich zurückgestellt. Die offenen Mobile-,
Performance- und externen Spieltests weiter unten bleiben vor Phase 1
verbindlich.

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

- [x] Start, Tod, Extraktion und Neustart ohne Erklärung verständlich machen
- [ ] Kartenwahl auf Desktop und Mobil prüfen
- [x] Evolution in normalen 8-Minuten-Runs erreichbar machen
- [ ] Lesbarkeit von Gegnerfamilien und Bosswarnungen prüfen
- [x] Testbericht am Run-Ende kopierbar machen
- [x] Kampf über Button und Tastatur vollständig pausierbar machen
- [x] Aelric mit konsistentem Lauf- und Bogenzyklus sowie lesbarem Bodenkontrast ausstatten
- [x] Technischen Animationspfad an der häufigsten Gegnerfamilie im frühen Schwarm validieren
- [ ] Animierten Schwärmer in einem vollständigen 8-Minuten-Run abnehmen

Abnahme:

- Ein neuer Spieler kann ohne Hilfe einen Run starten und Karten wählen.
- Nach Tod oder Extraktion ist der nächste sinnvolle Schritt eindeutig.
- Während eines vollständigen Runs treten keine blockierenden Fehler auf.

### P0.3 – Mobile und Performance

- [ ] Steuerung auf mindestens zwei echten Mobilgeräten testen
- [ ] Querformat, sichere Bildschirmbereiche und Touch-Ziele prüfen
- [ ] FPS und Entity-Spitzen protokollieren
- [ ] Verhalten bei Tab-Wechsel und Bildschirmunterbrechung prüfen
- [ ] „Gerät drehen"-Hinweis für Hochformat ergänzen. Laut D-017 ist Hochformat
  kein unterstützter Kampfmodus: Die Simulation garantiert identische
  Ergebnisse ausschließlich im Querformat. Statt den Kampf im Hochformat
  anzubieten, soll ein ruhiger Overlay-Hinweis zum Drehen auffordern; der Run
  pausiert dabei, statt abzubrechen.

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

## Phase 0.5 – Content- und Rückkehr-Slice

Ziel: Der interne Prototyp muss gehaltvoll genug werden, dass ein externer Test
nicht lediglich den bereits bekannten Inhaltsmangel misst. Diese Phase zieht
einen kleinen Teil des Vertical Slices vor, ohne den vollständigen Phase-1-Scope
zu öffnen.

### P0.5.1 – Sortietafel als Brücke

- [x] Drei klar unterschiedliche Sortieverträge im Hold anbieten
- [x] Gegnergewichtung, Risiko und Belohnung je Vertrag sichtbar erklären
- [x] Auswahl speichern und im HUD sowie Run-Bericht ausweisen
- [x] Standardvertrag als unveränderte Balance-Referenz behalten

### P0.5.2 – Mehr Build- und Run-Entscheidungen

- [x] Für alle sechs vorhandenen Waffen einen Evolutionspfad umsetzen
- [x] Fehlende Passive für diese Pfade ergänzen
- [x] Elite-Kills mit einer kleinen, echten Belohnungsentscheidung verbinden
- [x] Mindestens eine weitere erkennbare Entscheidung zwischen Boss und
  Extraktion ergänzen, ohne die Gegnerzahl weiter zu erhöhen

### P0.5.3 – Hold mit Wirkung auf den nächsten Run

- [ ] Arkanum als dritte Produktionsstätte umsetzen
- [ ] Übungshof mit kleinen Aelric-Utility-Meisterschaften umsetzen
- [ ] Herstellbare Run-Vorbereitung mindestens über zusätzliche Rerolls anbinden
- [ ] Offline-Produktion, Lagerkappen und Save-Migration deterministisch testen

### P0.5.4 – Kompakter Ausrüstungsloop

- [ ] Ausrüstung als Run-Belohnung vergeben
- [ ] Anlegen, Zerlegen und gezieltes Aufwerten ermöglichen
- [ ] Kein Fusionssystem und keine wertlosen Duplikate einführen
- [ ] Mindestens eine Kartensaat von seltener Ausrüstung bis in den Run-Pool
  durchgängig testen

Abnahme:

- Zwei aufeinanderfolgende Runs können sich durch Vertrag und Buildziel
  erkennbar unterscheiden.
- Nach einer Rückkehr bietet der Hold mindestens zwei sinnvolle Aktionen statt
  nur Einsammeln und Warten.
- Mindestens eine Hold-Entscheidung verändert den nächsten Run sichtbar.
- Der Standardvertrag erfüllt weiterhin den automatischen Balancevertrag.
- Bestehende lokale Spielstände werden migriert und nicht gelöscht.

Bewusst weiterhin außerhalb des Scopes: zweiter Held, vollständige acht
Gebäude, Runen, Aufstieg, neue Engine, Backend, Ton und Monetarisierung.

## H0.1 – Hold-Validierungsslice im Browser

Ziel: Nach einem positiven internen Kampftest prüfen, ob bereits eine einzige
Produktionskette den Wunsch nach der nächsten Sortie verstärkt. Dieser Slice
ist noch kein vollständiger Beginn von Phase 1.

- [x] Kraterhold als Startbildschirm integrieren
- [x] Tiefmine mit Lagerkappe und Offline-Produktion umsetzen
- [x] Emberschmiede als erste Verarbeitungskette umsetzen
- [x] Run-Belohnung genau einmal in Eisenerz umwandeln
- [x] Wächterbogen als erste dauerhafte Hold→Run-Verbesserung anbinden
- [x] Lokalen Speicherstand und deterministische Hold-Tests ergänzen
- [ ] Hold→Run→Hold-Schleife mit externen Spielern prüfen

Die Produktionszeiten sind für diesen Test auf 15 beziehungsweise 30 Sekunden
komprimiert. Langfristige Multi-Clock-Zeiten werden erst nach positivem Test
kalibriert.

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
