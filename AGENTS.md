# Orbitblade – Projektanweisungen für Codex

Diese Datei ist die kurze Übergabe für jede neue Codex-Sitzung. Das
Projekt wird kosteneffizient und in kleinen, prüfbaren Schritten gebaut. Der
Besitzer kann nicht selbst programmieren: Ergebnisse, Risiken und manuelle
Tests deshalb immer in verständlichem Deutsch erklären.

## Rolle und Zusammenarbeit

Codex ist Projektmanager und technische Leitung. Der verbindliche Ablauf steht
in docs/WORKFLOW.md. Codex besitzt Priorisierung, Scope, Abnahmekriterien,
Review und Push. Genau ein freigegebener Arbeitsauftrag steht in
docs/CURRENT_TASK.md; Claudes Rückgabe steht in docs/WORK_REPORT.md.

Vor jeder Änderung zusätzlich den Workflow und den aktiven Auftrag vollständig
lesen. Bei Widersprüchen gilt docs/CURRENT_TASK.md. Nach Claudes Arbeit prüft
Codex Code und Tests unabhängig, aktualisiert erst dann Roadmap, Entscheidungen
und Testplan und entscheidet über den Push.

## Vor jeder Änderung

1. `git status --short --branch` prüfen und fremde Änderungen bewahren.
2. `README.md` und den Abschnitt **Aktueller Arbeitsfokus** in `ROADMAP.md`
   lesen.
3. Für Designentscheidungen die neuesten Einträge in `docs/DECISIONS.md`
   prüfen; für Abnahme und bekannte Abweichungen `docs/TESTPLAN.md` lesen.
4. Nur den ausdrücklich freigegebenen nächsten Schritt bearbeiten. Keine
   parallele Content-, Hold-, Audio- oder Monetarisierungsbaustelle eröffnen.

## Produkt- und Technikrahmen

- Reines Solo-PvE: kurze Bullet-Heaven-Runs plus kleiner lokaler Hold-Loop.
- Phase 0 beantwortet nur, ob der Kampf einen freiwilligen zweiten Run trägt.
- Kein Backend, Konto, PvP, Koop, Ton oder Monetarisierung in diesem Scope.
- Keine neue Engine vor bestandenem Phase-0-Gate. Der spielbare Prototyp ist
  die einzelne Datei `prototype/web/index.html` und startet ohne Buildschritt.
- Für Phase 0 sind Laufzeitcode und `npm test` der verbindliche
  Balancevertrag. Langfristige Tabellenwerte dürfen ihn nicht still ändern.
- `main` muss stets startbar und geprüft bleiben. Kleine vertikale Änderungen
  sind großen Umbauten vorzuziehen.

## Verbindliche aktuelle Grafikrichtung

- Sichtbarer Produktname und Art Direction sind seit D-037/D-043
  **Orbitblade**. Repository, Pages-URL, Save-Key und interne IDs bleiben
  vorerst Emberhold.
- Referenz bleibt docs/concepts/orbitblade-combat-ui-direction-v2.png:
  taktisches flaches 2D-Sci-Fantasy in Navy, Violett, Cyan und Weißgold.
- D-043 reduziert die D-042-Kulisse auf große ruhige Navy-Flächen, wenige
  unregelmäßige Fugen, zwölf schwache Sterne und seltene kontrastarme
  Landmarken. Keine Kachelwand, dichten Mikropunkte, Safe-Area-Balken,
  harten Trennlinien oder Randabdunklung wieder einführen.
- D-044 verlangt für die interne Waffe `bogen` eine echte
  HINAUS→ORBIT→RÜCKKEHR-Bewegung, sichtbare Eigenrotation und Fang am
  bewegten Spieler. Die 48-Pixel-Form bleibt, darf aber nicht länger nur ein
  gerades Projektil mit wechselnden Bildern sein.
- Die Station bleibt ein zusammenhängender 1000×560-SVG-Ort. D-044 ersetzt
  die Drawer-Klickstrecke durch genau eine Aktions-Tray, ein angeheftetes
  Projekt und zwölf sichtbare Modulränge. SVG und Overlay bleiben gekoppelt.
- Der Orbitträger nutzt SPR.orbiter als weiß-goldenen Lichthüter mit 6 Idle-,
  8 Bewegungs- und 8 Wurfphasen; aufrecht, nur horizontal gespiegelt, nie frei
  rotiert.
- Alle fünf Familien behalten sechs asynchrone Phasen, müssen sich nach D-041
  aber klar durch Außenkontur, Proportion und Größe unterscheiden. Farbe allein
  reicht nicht. Elite, AEGIS und der neue NEXUS bleiben sofort eigenständig.
- Gegner bleiben vollständige Figuren mit klaren Leuchtkernen. Keine
  Kreisplatzhalter, Schattenfiguren oder synchronen Pulkphasen.
- Kampf-UI: Gesundheit/Erfahrung, Uhr, Pause, dynamische Bossleiste, höchstens
  sechs Waffenpiktogramme und genau ein kompakter Hinweis „Nächste EVO“ links.
  Das zeitlich begrenzte Signal darf darunter kompakt erscheinen. Sektorname
  nur als Start-Toast, in Pause und Bericht.
- Weltbewegung läuft am Browser-Frame; Posen wechseln ungefähr mit 10–12 FPS
  ohne Crossfade. Keine Gradienten, `shadowBlur` oder Objektallokationen pro
  Einheit und Frame.
- Code-native und KI-generierte Prototypgrafik ist nicht automatisch
  store-fertig oder rechtlich freigegeben. Ein finaler Art-/Rechte-Pass bleibt
  ein eigenes Gate.

## Historischer Produktkontext

Dieser Abschnitt ist kein Arbeitsauftrag. Priorität und Scope stehen nur in
`docs/CURRENT_TASK.md`.

**Stand 26.08.2026, nach sichtbarer D-043-Abnahme.** D-043 bleibt technisch
sauber bei 60/60 Checks, bestand das Produktgate aber nicht: Klinge ohne
Kreis-/Rückflug, hakelige Station und zu kurze marginale Progression. D-044 /
EH-2026-08-26-01 ist als einziger aktiver Auftrag freigegeben.

OpenCode baut echte Orbitklingenbewegung, kleinen Space-Feinschliff, Save v6,
zwölf Modulprojekte und einen flüssigen Stationsfluss. Der allgemeine
Waffenrollenpass wartet bis zur technischen und sichtbaren D-044-Abnahme.

### Drei Dinge, die eine neue Sitzung wissen muss

**1. Der Botwert ist nur ein Regressionsanker.** `totalPicks` prüft gegen
`BOT_PICK_REF = 19.78`, nicht gegen das menschliche Designziel. Wer den Anker
„zurück auf 21 repariert“, macht den Vertrag kaputt. Der Besitzerlauf nach
D-036 soll 28–34 Kartenzüge erreichen.

**2. D-044 ist der einzige aktive Auftrag.** Keine parallele Balance oder
Darstellung stapeln. OpenCode arbeitet nur `docs/CURRENT_TASK.md` ab, pusht
nicht und lässt die kanonischen Projektdokumente geschützt.

**3. Sichtbare Namen sind eine Präsentationsschicht.** `LEX` darf Bezeichnungen
ändern; IDs wie `bogen`, `glutsehne`, `ring` und der Save-Key
`emberhold:hold:v1` bleiben für Spielstände und Tests erhalten. Save v5 enthält
`stationData`, `coreStage` und `sortieProtocol`. D-044 muss diese Felder
verlustfrei nach v6 migrieren; alte Begriffe in Migrationen sind deshalb kein
sichtbarer Rückfall.

### Was weiterhin unverhandelbar ist

Neue Stationsboni und Sektormodifikatoren dürfen nicht unbemerkt in die
Baseline-Seed-Suite gelangen. Bestehende lokale Spielstände immer migrieren,
niemals durch eine neue Save-Version still löschen. Erwartungswerte in Tests
aus der Laufzeit ableiten, wenn der Test nicht gerade den konkreten Wert
absichern soll.

## Prüfen und dokumentieren

Nach Code- oder Assetänderungen mindestens ausführen:

```text
npm test
git diff --check
```

Grafikänderungen zusätzlich im Browser bei Bewegung, Richtungswechsel,
Gegnerpulk und Boss prüfen. `Image` fehlt absichtlich im Node-Headless-Pfad;
der prozedurale Fallback muss testbar bleiben.

Nach bestandener Review aktualisiert Codex `CHANGELOG.md`,
`docs/DECISIONS.md`, `ROADMAP.md` und `docs/TESTPLAN.md` konsistent.
Claude dokumentiert vor der Review in `docs/WORK_REPORT.md` und ändert andere
Projektdokumente nur mit Freigabe in `docs/CURRENT_TASK.md`. Keine erledigten
Punkte ohne Test und Codex-Abnahme als abgeschlossen markieren.

## Asset-Werkzeuge und Stolperfallen

- `tools/extract-atlas-alpha.cjs` entfernt Schein- oder
  Schachbretthintergründe reproduzierbar.
- `tools/crop-horizontal-atlas.cjs` schneidet horizontale Animationsstreifen
  auf quadratische Zellen zu.
- Neue PNGs als echte RGBA-Dateien prüfen; bei fehlerhaftem Laden muss der
  prozedurale Fallback den Run spielbar halten.
- Schnelle Richtungswechsel dürfen Figuren nie auf die Seite oder auf den
  Kopf drehen. Nur Projektile und Zielhilfen dürfen frei rotieren.
