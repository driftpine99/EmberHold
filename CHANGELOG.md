# Changelog

Alle bedeutenden Projektänderungen werden in dieser Datei dokumentiert.

## Unreleased


- Verbindlicher Codex–Claude-Workflow mit klarer Rollenverteilung:
  Codex priorisiert, prüft und pusht; Claude implementiert nur den freigegebenen
  Einzelauftrag
- Kanonische Dateien für aktiven Auftrag und standardisierten Arbeitsbericht
### Added

- Waffen-Telemetrie im kopierbaren Run-Bericht: tatsächlich abgezogener
  Gesamtschaden und Boss-Schaden je aktive Waffe; Overkill und Folgeeffekte
  werden ihrer Ursprungswaffe korrekt zugerechnet
- Fünf neue Verhaltenschecks für Warden-Kampfphase, Bossortung, kompaktes HUD,
  unmittelbaren Evolutionsabschluss und Waffen-Schadensbericht; zusammen mit
  dem oberen Bossmarker-Randfall jetzt 43/43 Checks grün

- FPS-Metrik nach D-024: alle Halbsekundenproben werden gesammelt, `fpsStats()`
  liefert 1-%-Low und den Zeitanteil unter der Zielmarke. `FPS_TARGET` liegt
  bewusst außerhalb von `CFG`, damit ein Performanceziel den Balancevertrag
  nicht berührt
- Härtung des Run-Berichts nach D-024: `CFG_DEFAULTS` und
  `tuningDeviations()` machen bewegte Live-Tuning-Regler sichtbar,
  `displayInfo()` ergänzt CSS-Größe, echte Pixelzahl und `devicePixelRatio`
- Zwei weitere Prüfungen in `npm test`: `fpsMetrics` schreibt fest, dass ein
  einzelner Ausreißer das 1-%-Low nicht kippt, `reportHardened` prüft die
  Tuning-Erkennung in beide Richtungen

- Rüstkammer mit sechs festen Ausrüstungsteilen für Waffe, Talisman und Gewand;
  jede Sortie vergibt genau einen Fund
- Direkte Duplikatverwertung zu Runenstaub, manuelles Zerlegen und gezielte
  Rangaufwertung bis Rang 3 ohne Fusionssystem
- Seltene Runenfibel als Kartensaat: Runenfunke erscheint garantiert im
  Run-Angebot und verstärkt Angriffstempo sowie Mehrfachprojektile
- Save-v4-Migration und automatischer `equipmentFlow` vom Fund bis zur
  Run-Kartenwirkung bei isolierter Balance-Baseline
- Arkanum mit Essenzproduktion, Lagerkappe und bis zu zwei herstellbaren
  zusätzlichen Rerolls für den nächsten Run
- Übungshof mit Trainingsmarken und je zwei Stufen Pfadkunde, Reichgriff und
  Stoßschule als dauerhafte Utility-Meisterschaften
- Save-Migration und `holdExpansion`-Test für Offline-Produktion, Kappen,
  Kosten, Run-Verbrauch und Headless-Isolation
- Vier neue Waffen-Evolutionen: Pfeilregen, Sturmherz, Klingenzyklon und
  Ewiger Winter; damit besitzen alle sechs Waffen einen vollständigen Pfad
- Amulett für Abklingtempo und Umhang für Schadensschutz als neue Passive
- Zwei pausierende Elite-Reliktwahlen pro vollständigem Run mit Glutkern,
  Schrittzeichen, Sammlerauge und Aschenhaut; Relikte erscheinen in Buildleiste
  und Run-Bericht
- Automatische Verträge `evolutionCatalog` für alle sechs Endmechaniken und
  `eliteChoices` für Queue, Auswahl, Effekte und beide Zeitachsen-Entscheidungen
- Sortietafel mit Wächterring, Sturmbruch und Aschengruft; jeder Vertrag zeigt
  Gegnerfokus, Risiko und Erzbonus und bleibt im lokalen Spielstand gewählt
- Vertragsname im Kampf-HUD und Run-Bericht sowie dezente eigene Bodenstimmung
- Automatischer `contractFlow` für Save-v1→v2-Migration, Persistenz,
  deterministische Gegnergewichtung, Belohnung und Baseline-Isolation
- Begrenzte Phase 0.5 für Sortieverträge, vollständige Buildpfade, Hold-Ausbau
  und einen kompakten Ausrüstungsloop vor dem externen Spieltest (D-019)
- Getrennte Telemetrie: `nearbyEnemies`/`peakNearbyEnemies` für den festen
  Simulationskreis, `visibleEnemies`/`peakVisibleEnemies` für die tatsächlich
  gezeichneten Gegner. Entwickleranzeige, Performancebericht und Run-Bericht
  weisen Gesamtzahl, Simulationsradius und sichtbare Gegner getrennt aus
- Zentraler Kampfausschnitt mit seitlicher Safe-Area auf Formaten breiter als
  16:9; Welt, Gegner und Telegrafien werden darauf geclippt
- Vier weitere Prüfungen in `npm test`: `minCombatHeight` (mindestens 562
  sichtbare Welteinheiten Höhe), `bossInsideCombat` (Warden-Einstieg im
  Kampfausschnitt) und `telemetrySeparated` (Rendertelemetrie erreicht die
  Simulation nicht) sowie `visibleCountsCulling`, das `render()` im Node-Shim
  tatsächlich ausführt und beide Renderpfade abdeckt
- Feste Balance-Referenz `SIM_W`/`SIM_H`/`SIM_DIAG` (1000×700): Zieldichte,
  Spawnring, Zählradius, Despawnrand und Boss-Einstiegsabstand rechnen
  unabhängig von Fenstergröße und Seitenverhältnis (D-017)
- Viewport-Paritätstest in `npm test`: `resize()` wird über den Node-Shim
  tatsächlich ausgeführt und 1000×700, 1280×720, 1536×864 sowie 844×390 müssen
  bitgenau identische Laufergebnisse liefern (`aspectIndependent`)
- Invariante `configStable`: die gesamte Balancekonfiguration muss nach
  `runBalanceSuite()` exakt dem Ausgangszustand entsprechen (D-018)
- `resize` und `viewport()` als Testeinstiegspunkte in `window.__EH`
- Projektweite `CLAUDE.md` mit Scope, Grafikregeln, Prüfkommandos und klarem
  Übergabepunkt für Claude Code
- Priorisierte Grafikreihenfolge mit manuellem 8-Minuten-Gate zwischen den
  einzelnen Gegnerfamilien
- Repository-Grundstruktur für Dokumentation und Webprototyp
- README mit Projektstatus und Startanleitung
- Phase-0-Roadmap mit messbaren Gates
- Issue- und Pull-Request-Vorlagen
- Entscheidungsprotokoll
- Reproduzierbare Balance-Suite mit festen Seeds und GitHub-Action
- Abhängigkeitsfreier Node-Test für den integrierten Headless-Spielpfad
- Prozedurale Warden-Arena mit Basaltboden, Ember-Vents und Randpfeilern
- Lesbare Boss-Telegrafien für Ringsalve und Ansturm
- Nicht blockierendes First-Run-Onboarding und Warden-Ankündigung
- Kopierbarer Run-Bericht am Ende eines Laufs
- Abhängigkeitsfreier UX-Smoke-Test als Teil von `npm test`
- Vollständige Spielpause über Button, `Esc` oder `P`
- Kraterhold als neuer Start- und Rückkehrbildschirm
- Tiefmine und Emberschmiede als erste funktionale Produktionskette
- Lokaler Hold-Speicherstand mit deterministischer Offline-Produktion
- Dauerhafte Wächterbogen-Verbesserung für die nächste Sortie
- Hold-Flow-Prüfung für Produktion, Persistenz und einmalige Run-Auszahlung
- Konsistenter 4×3-Aelric-Atlas mit je vier Idle-, Lauf- und Bogenphasen
- Vierphasiger, geerdeter Laufzyklus für die häufige Schwärmer-Familie
- Eigenständige Designs für fünf Gegnerfamilien, Elite und Warden-Boss
- Acht vorgerenderte Blickrichtungen und vier Lichtstufen pro Gegnerfamilie
- Reproduzierbare Alpha-Aufbereitung für KI-generierte Sprite-Atlanten
- Wiederverwendbarer Zuschnitt horizontaler Animationsstreifen auf quadratische Zellen
- Automatische Prüfung der aktiven lokalen RGBA-Assets und des Bogen-Animationszustands

### Changed

- Der Warden bildet eine lesbare Kampfphase: höchstens 90 nachspawnende
  normale Gegner, keine künstliche Entfernung, danach schrittweiser
  Wiederaufbau der normalen Dichte
- Rot-goldener Randpfeil außerhalb des Kampfausschnitts und Chevron über dem
  sichtbaren Warden; der Chevron bleibt auch am knappen oberen 16:9-Rand
  vollständig sichtbar
- Kampf-HUD auf aktive Waffen, Passive und genau einen führenden
  Evolutionspfad reduziert; Run-Boni, vollständiger Build und alle Pfade in
  die Pause verschoben
- Evolutionsfokus von 5:30 auf 4:00 gelegt und erfüllte Pfade schließen ohne
  zusätzlichen Zufallskartenzug sofort
- Bot-Regressionsanker wegen dieser beabsichtigten Produktänderung von 15,3
  auf 21,7 neu referenziert; Toleranz unverändert bei ±3

- Früh verlorene Runs sind kein Farmweg mehr (EH-2026-08-23-01): Eine Sortie,
  die die kürzeste angebotene Länge von 3 Minuten nicht erreicht, gilt als
  Abbruch. Ihr Erz wird auf den Takt des typischen Laufs von 1,75 Erz je Minute
  gedeckelt, und der garantierte Ausrüstungsfund entfällt. Vorher zahlte ein
  absichtlich untätiger Lauf nach rund 38 bis 46 Sekunden die vollen 4 Erz —
  5,3 bis 6,3 Erz je Minute plus Fund. Regel 1 bleibt gewahrt: Die erspielte
  Basis-Beute bleibt gebucht und ein echter Versuch zahlt nie null Erz. Läufe
  ab 3 Minuten und alle vier Beuteanker sind unverändert
- Neuer Check `earlyLossGuard` prüft den echten Auszahlungsweg über
  `damagePlayer()` → `endRun(false)` → `depositRunReward()` mit allen neun
  Seeds, dazu die unveränderten Normalauszahlungen und den Grenzfall
  Tod exakt bei 3:00
- `healOrbFlow` prüft die Abklingzeit jetzt als vollständige Leiter: ein Kill
  nach Ablauf erzeugt genau einen Gluttropfen, 50 Kills im Fenster keinen
  weiteren, nach erneutem Ablauf wieder genau einer. Heilmenge, fehlende
  XP-Gutschrift und kleinerer Sog bleiben unverändert
- `resize()` beeinflusst nur noch Darstellung, Canvas-Skalierung und
  Render-Culling. `AREA_F` und `VIEW_DIAG` sind ersatzlos entfallen
- Fokus-Schutz für begonnene Evolutionspfade greift ab 5:30 statt 7:30. Die
  alte Marke war seit D-030 faktisch abgeschaltet, weil dort kein Kartenzug
  mehr ankam; Evolutionen wieder bei 3/9 statt 1/9 (D-031)
- Canvas-Skalierung auf „Cover" umgestellt und bei 16:9 gedeckelt, damit der
  feste Spawnring außerhalb des Bildes bleibt, ohne dass breite Formate an
  sichtbarer Höhe verlieren (844×390 und 21:9 blieben zwischenzeitlich bei 462
  bzw. 422 Welteinheiten stehen; jetzt durchgehend 563)

- Visual-Testplan auf alle drei aktiven RGBA-Raster-Assets und den vorläufigen
  Schwärmer-Performance-Smoke aktualisiert
- Konzept auf reines Solo-PvE ohne PvP, Koop, Gilden oder Ranglisten festgelegt
- Cloud-Save und Backend als optionale spätere Infrastruktur definiert
- Vorhandener Browserprototyp als kanonischer Phase-0-Build einsortiert
- Phase-0-XP-Kurve, Evolution und runlängenabhängige Pick-Ziele vereinheitlicht
- Gameplay-Zufall vom Rendering getrennt und seedbar gemacht
- Rechten Warden-Arena-Entwurf als visuelle Phase-0-Kampfrichtung festgelegt
- Extraktion, Overtime, Tod und Neustart verständlicher beschriftet
- Drei-Minuten-Scharmützel startet beim Wiederholen nicht mehr als Acht-Minuten-Run
- Entwickleranzeige von `D` auf `F3` verlegt, damit WASD konfliktfrei funktioniert
- Run-Beute wird einmalig in Eisenerz umgerechnet und im Hold eingelagert
- Prozedurale Figurenplatzhalter durch lokale Raster-Art mit schnellem Fallback ersetzt
- Bogenangriff zeigt jetzt Spannungs-, Release- und Rückstoßphase
- Doppelbild-Crossfades durch klar getaktete Einzelposen bei flüssiger Weltbewegung ersetzt
- Aelrics Drehung und Bewegungsstart/-stopp mit framerateunabhängigem Easing geglättet
- Basaltboden aufgehellt, Bodendetail beruhigt und Aelric mit kühler Ascheaufhellung abgesetzt
- Entfernungsabhängige Kreis- und Schattenplatzhalter entfernt; sichtbare Gegner verwenden immer ihre vollständige Rasterfigur
- Gegnerausrichtung von 8 auf 16 vorgerenderte Richtungen erweitert und weich nachgeführt
- Evolutionspfade im Kampf-HUD und auf relevanten Karten sichtbar gemacht
- Späten optionalen Fokus-Schutz für fast fertige Evolutionspfade ergänzt
- CI-Vertrag um die Evolutionserreichbarkeit in 8-Minuten-Runs erweitert

### Documentation

- Fertiges Protokoll `Manueller Gesamttest des Phase-0.5-Slices` in
  `docs/TESTPLAN.md`: Vorbereitung, Durchgang A für Hold → Run → Hold,
  Durchgang B für den vollständigen 8-Minuten-Run mit Beobachtungsfenstern je
  Zeitmarke und fünf Fragen, die der kopierbare Run-Bericht nicht beantworten
  kann
- Blocker in `ROADMAP.md` festgehalten: Ein gerenderter Lauf ist in der
  Claude-Code-Umgebung nicht möglich, weil die Browser-Pane nicht angezeigt
  wird und `requestAnimationFrame` deshalb nicht feuert (nachgemessen:
  0 Frames in 14,4 Sekunden)

### Changed

- Recyclingrand für normale Gegner von 1,55 auf 1,20 mal `SIM_DIAG` gesenkt
  (neue Konstante `DESPAWN_F`). Bewegung erzeugt dadurch keinen
  Gegnerüberschuss mehr: Die Spitze im Feld fällt von 357 auf 308 bei einer
  Zieldichte von 301, der Überschuss von +19 % auf +2,2 % (D-030)
- Der Kartenzug-Korridor ist jetzt ein Regressionswächter gegen
  `BOT_PICK_REF` statt gegen das Designziel. Designziel und Botanker stehen
  getrennt in der Testausgabe; das Designziel wird an Menschenläufen geprüft
  (D-026, D-030)
- `evolutionReachable` von 2/9 auf 1/9 gesenkt und ausdrücklich als
  Bodenschwelle statt als Designziel geführt (D-030)

### Added

- Erzkurve von logarithmisch auf eine am typischen Lauf verankerte Potenzkurve
  umgestellt. Das 3-Minuten-Scharmützel war 1,9-mal ertragreicher je Minute als
  der 8-Minuten-Run — das Herzstück des Spiels war mathematisch die schlechtere
  Wahl. Erz je Minute steigt jetzt monoton mit der Laufgüte, das Wirtschafts-
  tempo für einen typischen Lauf bleibt unverändert (D-025, D-034)
- Check `oreCurve` prüft fünf Eigenschaften der Kurve, darunter als Wächter,
  dass Erz je Minute mit der Laufgüte steigt
- `holdFlow` und `contractFlow` leiten ihre Erwartung jetzt aus der Kurve und
  den Vertragsdaten ab, statt Erzwerte hart zu verdrahten
- Sichtbares nächstes Ziel im Hold und am Run-Ende: genau eine Handlung mit
  Fortschritt und Begründung statt sechs gleichrangiger Anzeigen. Der Run endet
  nicht mehr mit einer Zahl, sondern mit dem, was sie bewirkt (D-033)
- Check `holdGoalLadder` prüft alle sechs Zustände der Zielleiter
- Gluttropfen: einsammelbare Heilung, die beim Tod eines Gegners fällt, 6 %
  der Lebenspunkte heilt und einen kleineren Einzugsradius ohne Fernsog hat —
  man muss hingehen. Abklingzeit 25 Sekunden statt Trefferchance je Kill, damit
  ein starker und ein schwacher Build dieselbe Heilrate haben (D-032)
- Check `healOrbFlow` prüft das Verhalten des Tropfens in vier Teilprüfungen
- Check `densityOvershoot`: die Spitzenbelegung darf die Zieldichte um
  höchstens 10 % überschreiten, damit der Defekt aus D-028 nicht unbemerkt
  zurückkehrt

### Known issues

- **Der Run trägt in diesem Zustand nicht (D-027).** Erste Spielerbewertung:
  Die Gegnerdichte macht Laufen und Ausweichen unmöglich, der Boss ist nicht
  erreichbar, Buildmacht ist zu zufällig, Heilung fehlt, der Zweck des Runs ist
  unsichtbar und der Hold erklärt sich nicht. Der Schwärmer ist nicht
  freigegeben.
- Die Animation wird als ruckelig bewertet. Der Besitzer würde Detailqualität
  je Figur gegen mehr Phasen tauschen — das kehrt D-015 und D-016 um und
  braucht eine eigene Entscheidung (D-027 Punkt F).
- Die Slotanzeige rutscht bei niedriger Fensterhöhe aus dem Bild, genau die
  Information, die für gezieltes Aufwerten gebraucht wird (D-027 Punkt G).

- Ein sauberer 8-Minuten-Feldlauf fehlt weiterhin. Er ist laut D-024 der
  entscheidende Test, weil die Füllung des Lichtkreises ab Buildmacht 31
  sättigt und er damit Lichtkreis gegen Gegnerzahl trennt.
- Der erste saubere Menschenlauf erreichte den ersten Kartenzug nach
  34,9 Sekunden — oberhalb der gesamten Bot-Streuung von 21,0 bis 30,7. Der
  Verdacht ist, dass die Baseline gegen einen Bot kalibriert ist, der im
  Frühlauf besser spielt als ein Mensch.
- Der Auslöser der einzelnen schlechtesten Halbsekunde (35 FPS bei sonst 58 im
  1-%-Low) ist unbekannt. Bei 0,5 % Zeitanteil kein Untersuchungsgrund.
- Erster Feldlauf am 22.08.2026 meldete **21 FPS** gegen ein Ziel von 55. Der
  Lauf war durch bewegte Tuning-Regler verfälscht und ist kein gültiger
  Nachweis, aber Simulation (0,1 ms) und Zeichenbefehle (2,1 ms bei 681
  Gegnern) sind als Ursache ausgeschlossen. Leitende Hypothese ist die
  Füllrate des ungedeckelten Lichtkreises. Siehe D-024.
- Die Abnahmeschwelle für Phase 0.3 steht noch auf „mindestens 55 FPS". D-024
  schlägt vor, sie auf „1-%-Low mindestens 55 und höchstens 2 % der Proben
  unter 55" umzustellen; das ist noch nicht beschlossen. Der erste saubere
  8-Minuten-Lauf hätte diese Schwelle bestanden.
- Der Testbot trifft die menschliche Runkurve nicht: früh rund acht Sekunden
  zu schnell, spät deutlich zu langsam. Der Balancevertrag ist auf dieser Kurve
  kalibriert (D-026).
- Erz aus einem Run wächst nur logarithmisch: Eine Verdopplung der Beute bringt
  ein einziges Erz mehr (D-025).

- Das Workbook enthält noch das analytische Langfristmodell. Für Phase 0 ist
  gemäß D-006 ausschließlich der ausführbare Laufzeitvertrag verbindlich.
- Der derzeitige Arbeitstitel ist im Spielemarkt bereits belegt.
- Die Einzelursache des einmalig beobachteten XP-Werts von 81,18 (D-018) ist
  weiterhin unbekannt. Die Fehlerklasse ist durch `configStable` abgesichert,
  aber nicht erklärt.
- Der sichtbare Weltausschnitt ist auf breiten Fenstern kleiner als bisher
  (1000 × 563 statt 1000 × 700 Welteinheiten auf 16:9). Ob das im Spiel zu eng
  wirkt, muss der manuelle 8-Minuten-Run zeigen; Pillarboxing ist der
  dokumentierte Gegenentwurf.
- Der manuelle 8-Minuten-Run zur Abnahme des Schwärmers steht weiterhin aus.
  Solange er fehlt, gibt es keine gemessene FPS-Zahl und keinen realen Wert für
  `peakVisibleEnemies`; beide entstehen erst beim echten Rendern.
- Die Neutralität der Baseline gegenüber Vertragsmodifikatoren hängt an einem
  Default-Parameter (`contractId` fällt auf `ring` zurück), nicht an einem
  harten HEADLESS-Gate in den Formeln selbst — anders als bei `holdDmg`,
  `holdUtility` und `gearBonus`. Funktional gleichwertig und durch
  `baselineIsolated` getestet, aber bei künftigem Refactoring von `runBatch`
  fragiler, weil ein Grep nach `HEADLESS` den Fehler nicht fände.
- Das Feld `version` im Hold-Speicherstand wird geschrieben, aber nirgends
  gelesen. Die Migration ist rein feldweise und additiv. Das trägt, solange
  Schema-Erweiterungen additiv bleiben; eine künftige Feldumbenennung hätte
  keinen eingebauten Schutz.
- Der Warden betritt den Kampfausschnitt bei 280 Welteinheiten. Auf 16:9 und
  breiter beträgt die halbe sichtbare Höhe 281,25 — die Reserve ist also nur
  1,25 Einheiten, und ein vertikaler Einstieg dürfte den Warden sichtbar
  anschneiden. Der Wert ist ein Gegnerwert und wurde bewusst nicht ohne
  Entscheidung geändert.
