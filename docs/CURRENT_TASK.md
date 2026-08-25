# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-25-02
- **Thema:** Kampf-Grafik und UI nach Entwurf 3
- **Status:** **TECHNISCH_ABGENOMMEN_DURCH_CODEX** (25.08.2026)
- **Auftraggeber:** Besitzer
- **Projektleitung und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P0 – sichtbarer Spielspaß und Kampflesbarkeit
- **Startstand:** sauberer `main` nach der Codex-Übergabe; den tatsächlichen
  Ausgangscommit und den anfänglichen Git-Status vor jeder Änderung selbst
  prüfen und in `docs/WORK_REPORT.md` festhalten
- **Timebox:** bis zu fünf Stunden produktiv ausschöpfen; nicht nach dem ersten
  kosmetischen Teilergebnis stoppen

## Produktentscheidung

Der Besitzer hat Entwurf 3 ausdrücklich ausgewählt. Die verbindliche interne
Referenz ist `docs/concepts/orbitblade-combat-ui-direction-v2.png`.

Sie ist eine Zielrichtung, kein Runtime-Asset und keine pixelgenaue Vorlage.
Verbindlich sind D-040 und AP-004: taktisches Sci-Fantasy, durchgehendes
mittelhelles Orbitaldeck, minimale Rand-UI, klarer weiß-goldener Orbitträger,
dunkle Gegner mit Leuchtkernen, großer violetter AEGIS und geometrische
Warnflächen.

Der Feldlauf hat zugleich Balanceprobleme bestätigt. Diese werden **nicht** in
diesem Auftrag gelöst. Die geringe Gegnerzahl und die dargestellte Bossphase
des Konzeptbilds dürfen nicht als Freigabe für Spawn- oder Mechanikänderungen
missverstanden werden.

## Ziel

Der reale Kampf soll auf Desktop und Mobil sichtbar näher an Entwurf 3 rücken:

1. abgeschnitten wirkende Seiten und harte Sternenbalken verschwinden;
2. die permanente Informationslast wird auf eine kleine Rand-UI reduziert;
3. Orbitträger, alle fünf normalen Gegnerfamilien und AEGIS bilden eine
   einheitliche, animationsfreundliche Sci-Fantasy-Figurensprache;
4. Boss und Gefahren sind im Pulk schneller lesbar;
5. Simulation und Balance bleiben bitgenau unverändert.

## Verbindlicher Umsetzungsscope

### Gate A – bestehende Darstellung aufnehmen

- Den echten Renderpfad, `renderCostContract`, `presentationLayer` und die
  responsive HUD-Struktur vollständig prüfen.
- Wenn ein sichtbarer Browser verfügbar ist, Ausgangsscreenshots bei 1280×720
  und 844×390 erstellen; andernfalls die Grenze ehrlich dokumentieren.
- Keine neue Architektur und keine Engine einführen.

### Gate B – minimale Kampf-UI

- Oben links bleiben nur kompakte Gesundheit und Erfahrung sowie höchstens
  unmittelbar notwendige Kurzwerte wie Stufe oder Zeit.
- Während AEGIS lebt steht oben mittig exakt **BOSS: AEGIS** mit einer klaren
  Lebensleiste; höchstens zwei rein visuelle Phasenmarker sind erlaubt, ohne
  neue Bossmechanik vorzutäuschen.
- Pause bleibt allein oben rechts.
- Aktive Waffen werden als maximal sechs kompakte Symbole mit Stufe und
  verständlichem Abklingzustand unten mittig dargestellt.
- Passive, Relikte, Ausrüstung, Kills, Sektorvertrag und Detailwerte werden
  nicht mehr als permanente linke Textliste gezeigt. Vorhandene wichtige
  Informationen bleiben über Pause und Run-Bericht erreichbar.
- Kartenwahl, Dialoge, Toasts und mobile Touch-Zonen dürfen nicht überlappen.

### Gate C – durchgehendes Orbitaldeck

- Der Kampfhintergrund reicht optisch bis an alle Bildschirmränder. Die
  bisherige Safe-Area darf technisch bestehen, muss aber als ruhige, nahtlose
  Deckfortsetzung erscheinen; keine harten Cyan-Trennlinien und keine
  dominanten Sternenbalken.
- Große blau-graue Paneele, wenige Fugen, dezente Kreisgeometrie und höchstens
  kleine periphere Weltraumbrüche ersetzen den abgeschnittenen Arena-Rahmen.
- Kampfelemente bleiben auf den festen Simulationsausschnitt geclippt.
  `SCALE`, `VIEW_W`, `VIEW_H`, Culling und D-017 dürfen nicht in die
  Simulation zurückwirken.
- Boden vorgerendert oder gekachelt; keine neuen teuren Per-Frame-Verläufe oder
  Canvas-Erzeugungen.

### Gate D – einheitliche Figuren und Animation

- Code-native, einmal vorgerenderte Canvas-Sprites sind der bevorzugte
  kosteneffiziente Weg. Keine Dateien aus dem lokalen Referenzprojekt und keine
  Franchise-Anleihen.
- Orbitträger: weiß-goldene klare Silhouette mit cyanem Energiekern; mindestens
  sechs Idle-, acht Bewegungs- und acht Wurfphasen oder eine technisch
  gleichwertig flüssige Lösung. Nur horizontal spiegeln, nie frei rotieren.
- Alle fünf normalen Gegnerfamilien: eigenständige Maschinenkörper in einer
  gemeinsamen Formsprache. Jede Familie erhält mindestens sechs asynchron
  versetzte Bewegungs-/Schwebephasen oder eine gleichwertige vorgerenderte
  Animation. Dunkle Körper brauchen klare Leuchtkerne/Randlichter, ohne
  Warnfarben zu verwischen.
- Elite bleibt als hochwertige Variante sofort erkennbar.
- AEGIS: deutlich größer, violetter Kern, zwei visuell getrennte Seitenpanzer
  und mindestens sechs ruhige Animationsphasen. Die Seitenpanzer sind nicht
  verwundbar.
- Pro Gegner und Frame im Wesentlichen ein `drawImage`. Keine Gradienten,
  Pfadobjekte, Arrays oder temporären Canvas pro Gegner im Schwarmpfad.
- Weltbewegung bleibt am Browser-Frame. Keine Figur kippt oder steht Kopf.

### Gate E – Gefahren und Bosslesbarkeit

- Bestehende Bossmuster nur visuell neu zeichnen: flache violette Segmente,
  deutlich sichtbare sichere Lücke und klare rot-orange Laufbahn.
- Bossmarker weiß-golden/violett und klar getrennt von cyanfarbenen
  Spielerprojektilen.
- Familienwarnungen geometrisch, zurückhaltend und unter den Figuren. Kein
  Partikelnebel und kein dauerhafter Vollbild-Glow.
- Keine neue Kreuzattacke, Bossphase, Kollisionsfläche oder Schadensregel.

## Unverhandelbare Grenzen

- Keine Änderung an Gegnerzahl, Spawnziel, Bossverstärkung, Post-Boss-Rampe,
  XP, Kartenangebot, Schaden, Waffenwerten, Zielwahl, Kollision oder RNG.
- Sternenhagel, Kettenemitter und alle anderen Waffen bleiben unverändert.
- Keine Änderung an Save v4, Save-Key, Run-Bericht, Station oder Ökonomie.
- Keine Rückflugmechanik, kein neuer Inhalt, kein Ton.
- Keine neue Engine, Bibliothek, Buildkette oder Netzabhängigkeit.
- Keine Fremdassets aus `orbitblade/` und keine erkennbaren Franchise-Designs.
- Node- und Bildlade-Fallbacks bleiben spielbar.
- Neue Rasterdateien nur, wenn Code-native Umsetzung objektiv scheitert. Dann
  vor dem Import stoppen und den Blocker dokumentieren.
- Claude pusht nicht und beginnt keinen Folgeauftrag.

## Kosten- und Agentenregel

Claude soll die Fünf-Stunden-Timebox produktiv nutzen. Günstige kleinere
Coding-Subagenten sind für isolierte Aufgaben wie CSS/DOM, Sprite-Builder,
Tests oder statische Diff-Prüfung ausdrücklich erwünscht. Claude behält
Art-Direction, Architektur und Zusammenführung selbst, gibt enge Dateibereiche
vor, prüft jeden fremden Diff vollständig und lässt nach jeder Integration die
Suite laufen. Keine parallelen Änderungen an denselben Zeilen der monolithischen
`index.html`.

## Automatische Abnahme

1. Vorher-/Nachher-Balanceausgabe der neun festen Seeds bleibt vollständig
   identisch; Korridore werden nicht gelockert.
2. `npm test` vollständig grün. Für V2 entsteht mindestens ein gezielter
   Check oder eine belastbare Erweiterung von `presentationLayer`.
3. `renderCostContract` bleibt grün; keine neuen Allokationen oder Gradienten
   im Gegner-Schwarmpfad.
4. Node-Fallback ohne `Image` bleibt spielbar und getestet.
5. `git diff --check` sauber.
6. Keine Browserfehler bei Start, Run, Pause, Kartenwahl, Ergebnis und Rückkehr.

## Manuelle Abnahme durch Claude

Wenn ein sichtbarer Browser verfügbar ist:

1. 1280×720 und 844×390 in Bewegung, Kartenwahl und Pause prüfen.
2. Bei hoher Dichte alle fünf Familien, asynchrone Animation und UI-Überlappung
   prüfen.
3. AEGIS prüfen: Bezeichnung, Marker, Größe, Seitenpanzer, Lebensleiste,
   sichere Lücke und Laufbahn.
4. Schnelle Richtungswechsel und Impulsstoß prüfen; keine Figur kippt/springt.
5. Schlechteste FPS und 1-%-Low eines späten Laufabschnitts festhalten.
6. Nach Möglichkeit Nachher-Screenshots beider Größen erzeugen und Pfade im
   Bericht nennen; Bilder nicht ungefragt committen.

Ist kein sichtbarer Browser möglich, bleibt der Auftrag nach grünen Tests
**TEILWEISE**. Keine visuelle Freigabe erfinden.

## Erlaubte Dateien

- `prototype/web/index.html`
- `tools/run-balance-suite.mjs` nur für echte zusätzliche Präsentations- oder
  Performancechecks, nie zum Lockern von Balanceankern
- `CHANGELOG.md`
- `docs/WORK_REPORT.md`
- `docs/ASSET_PROVENANCE.md` nur bei einem neuen Runtime-Asset

Alle anderen Dateien sind geschützt. Insbesondere nicht ändern:
`ROADMAP.md`, `docs/DECISIONS.md`, `docs/TESTPLAN.md`,
`docs/CURRENT_TASK.md` und die Konzeptbilder.

## Rückgabe

`docs/WORK_REPORT.md` vollständig nach `docs/WORKFLOW.md` ersetzen, samt:

- tatsächlich erreichten sichtbaren Unterschieden gegenüber D-038;
- bewusst nur angenäherten Elementen aus Entwurf 3 und Begründung;
- Vorher-/Nachher-Zahl der vorgerenderten Phasen und Runtime-Assets;
- Beleg für unveränderte Simulation, feste Seeds, Save und RNG;
- Browsergrößen, FPS-Werte und nicht mögliche Sichtprüfungen;
- Subagenten je Teilauftrag sowie Claudes eigene Diff-/Testprüfung;
- abschließendem Git-Status und Empfehlung an Codex.

Lokale kleine Commits sind nach grünen Tests erlaubt. Kein Push.

## Codex-Abnahme

**Technisch abgenommen am 25.08.2026.** Claude hat den Auftrag in zwei lokalen
Commits umgesetzt. Codex hat beide Diffs unabhängig geprüft, die UI-Fragen
entschieden und als kleine Review-Nacharbeit sechs eigene Waffenpiktogramme
sowie eine nahtlose Sektortönung über dem gesamten Deck ergänzt.

- `npm test`: 49/49 Checks grün;
- `git diff --check`: sauber;
- neun feste Seeds und alle Balancekennzahlen unverändert;
- Rendervertrag weiter bei zwei Gradienten, keinem `shadowBlur` und keinem
  neuen Canvas pro Frame im gemessenen Pfad;
- Sektorname nur als Start-Toast sowie in Pause und Run-Bericht, nicht dauerhaft;
- subjektive Sicht- und Performancefreigabe bleibt beim Besitzerlauf.

Bis zu diesem Besitzerlauf wird kein Boss-/Dichte- oder Waffenpass gestapelt.
