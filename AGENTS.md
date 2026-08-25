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

- Sichtbarer Produktname und Art Direction sind seit D-037/D-041
  **Orbitblade**. Repository, Pages-URL, Save-Key und interne IDs bleiben
  vorerst Emberhold.
- Referenz bleibt docs/concepts/orbitblade-combat-ui-direction-v2.png:
  taktisches flaches 2D-Sci-Fantasy in Navy, Violett, Cyan und Weißgold.
- Der feinere, dunklere Deckboden aus Commit 9190de9 ist die D-041-Referenz,
  läuft aber mit der nahtlosen D-040-Technik bis an alle Bildschirmränder.
  Keine Safe-Area-Balken, harten Trennlinien oder Randabdunklung.
- Der Orbitträger nutzt SPR.orbiter mit 6 Idle-, 8 Bewegungs- und 8
  Wurfphasen; aufrecht, nur horizontal gespiegelt, nie frei rotiert.
- Alle fünf Familien behalten sechs asynchrone Phasen, müssen sich nach D-041
  aber klar durch Außenkontur, Proportion und Größe unterscheiden. Farbe allein
  reicht nicht. Elite, AEGIS und der neue NEXUS bleiben sofort eigenständig.
- Gegner bleiben vollständige Figuren mit klaren Leuchtkernen. Keine
  Kreisplatzhalter, Schattenfiguren oder synchronen Pulkphasen.
- Kampf-UI: Gesundheit/Erfahrung, Uhr, Pause, dynamische Bossleiste, höchstens
  sechs Waffenpiktogramme und genau ein kompakter Hinweis „Nächste EVO“.
  Sektorname nur als Start-Toast, in Pause und Bericht.
- Weltbewegung läuft am Browser-Frame; Posen wechseln ungefähr mit 10–12 FPS
  ohne Crossfade. Keine Gradienten, `shadowBlur` oder Objektallokationen pro
  Einheit und Frame.
- Code-native und KI-generierte Prototypgrafik ist nicht automatisch
  store-fertig oder rechtlich freigegeben. Ein finaler Art-/Rechte-Pass bleibt
  ein eigenes Gate.

## Historischer Produktkontext

Dieser Abschnitt ist kein Arbeitsauftrag. Priorität und Scope stehen nur in
`docs/CURRENT_TASK.md`.

**Stand 25.08.2026, nach technischer D-041-Abnahme.** OpenCode hat
EH-2026-08-25-03 umgesetzt; Codex hat den Diff unabhängig geprüft und
Rückzug, Trefferinteraktionen, Gesamtdauer sowie Restgefahren nach NEXUS
korrigiert. AEGIS hat Ziel 50, NEXUS Ziel 30 und sperrt bis zu seinem Tod die
Extraktion. Waffenwerte blieben unverändert.

Offen ist der Besitzerlauf bis NEXUS für Hintergrund, Familienlesbarkeit,
EVO-Hinweis, Bossgefühl und echte FPS. Erst danach folgt der separate
Waffenrollenpass. Technische Baseline: 53/53 Checks; letzter Feldlauf
19.176 Kills, 27 Kartenzüge, zwei Evolutionen, FPS 44/54.

### Drei Dinge, die eine neue Sitzung wissen muss

**1. Der Botwert ist nur ein Regressionsanker.** `totalPicks` prüft gegen
`BOT_PICK_REF = 19.78`, nicht gegen das menschliche Designziel. Wer den Anker
„zurück auf 21 repariert“, macht den Vertrag kaputt. Der Besitzerlauf nach
D-036 soll 28–34 Kartenzüge erreichen.

**2. D-041 wartet auf die sichtbare Besitzerabnahme.** Keine weitere Balance
oder Darstellung stapeln. Erst der Besitzerlauf bis NEXUS trennt Finale und
Waffenwirkung sauber; danach folgt der Waffenpass. Station, Audio und
Monetarisierung bleiben eigene Gates.

**3. Sichtbare Namen sind eine Präsentationsschicht.** `LEX` darf Bezeichnungen
ändern; IDs wie `bogen`, `glutsehne`, `ring` und der Save-Key
`emberhold:hold:v1` bleiben für Spielstände und Tests erhalten. Alte Begriffe
in Migrationen sind deshalb kein sichtbarer Rückfall.

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
