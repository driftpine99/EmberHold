# Emberhold – Projektanweisungen für Claude Code

Diese Datei ist die kurze Übergabe für jede neue Claude-Code-Sitzung. Das
Projekt wird kosteneffizient und in kleinen, prüfbaren Schritten gebaut. Der
Besitzer kann nicht selbst programmieren: Ergebnisse, Risiken und manuelle
Tests deshalb immer in verständlichem Deutsch erklären.

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

- Gemalte, bewusst niedrig aufgelöste Fantasy-Figuren mit klaren Silhouetten
  auf einem mittelhellen, ruhigen Basaltboden; siehe D-014 bis D-016.
- Aelric nutzt `assets/aelric-atlas-v2.png`: 4×3 Zellen für Idle, Lauf und
  Bogen. Er bleibt aufrecht und wird nur horizontal gespiegelt, nie frei
  rotiert.
- Gegner bleiben unabhängig von Entfernung vollständig sichtbar. Keine
  Kreisplatzhalter, abstrakten Schattenfiguren oder zusätzliche
  Randabdunklung wieder einführen.
- `assets/enemy-atlas-v1.png` enthält die statischen Gegnerfamilien.
  `assets/enemy-swarmer-atlas-v2.png` enthält den ersten asynchronen
  Vier-Phasen-Laufzyklus. Weitere Familien werden einzeln ergänzt, nicht als
  neuer großer Sammelatlas.
- Die Weltbewegung läuft am Browser-Frame; Rasterposen wechseln bewusst mit
  ungefähr 9–10 FPS ohne Crossfade-Doppelbilder.
- KI-generierte Grafiken sind Prototyp-Assets, nicht automatisch
  store-fertig oder rechtlich freigegeben. Ein finaler Art-/Rechte-Pass ist
  ein späteres eigenes Gate.

## Aktueller Übergabepunkt

Der technische Kurztest des Schwärmers ergab vorläufig mindestens 59 FPS bei
53 sichtbaren Gegnern nach ungefähr 30 Sekunden. Das ist kein vollständiger
Stresstest. Vor der nächsten Gegnerfamilie braucht es einen manuellen
8-Minuten-Run und das Feedback des Besitzers gemäß `docs/TESTPLAN.md`.

Nach der visuellen Freigabe folgt gemäß D-019 zunächst Phase 0.5. Die
verbindliche Reihenfolge lautet: Sortieverträge, Build-/Run-Entscheidungen,
Arkanum und Übungshof, danach Ausrüstung und Zerlegung. Jeder Abschnitt bleibt
ein eigener spielbarer Commit mit Tests. Die Animationen von Stürmer, Speier,
Teiler und Wahrer sind bis danach zurückgestellt.

Der Standardvertrag muss die bestehende Balance-Referenz bitgenau oder innerhalb
der dokumentierten Korridore erhalten. Neue Hold-Boni und Vertragsmodifikatoren
dürfen nicht unbemerkt in die Baseline-Seed-Suite gelangen. Bestehende lokale
Spielstände immer migrieren; niemals durch eine neue Save-Version still löschen.

## Prüfen und dokumentieren

Nach Code- oder Assetänderungen mindestens ausführen:

```text
npm test
git diff --check
```

Grafikänderungen zusätzlich im Browser bei Bewegung, Richtungswechsel,
Gegnerpulk und Boss prüfen. `Image` fehlt absichtlich im Node-Headless-Pfad;
der prozedurale Fallback muss testbar bleiben.

Bei einer abgeschlossenen Änderung `CHANGELOG.md` aktualisieren. Geänderte
Entscheidungen gehören in `docs/DECISIONS.md`, offene Arbeit in `ROADMAP.md`
und neue Abnahmeschritte in `docs/TESTPLAN.md`. Keine erledigten Punkte ohne
Test als abgeschlossen markieren.

## Asset-Werkzeuge und Stolperfallen

- `tools/extract-atlas-alpha.cjs` entfernt Schein- oder
  Schachbretthintergründe reproduzierbar.
- `tools/crop-horizontal-atlas.cjs` schneidet horizontale Animationsstreifen
  auf quadratische Zellen zu.
- Neue PNGs als echte RGBA-Dateien prüfen; bei fehlerhaftem Laden muss der
  prozedurale Fallback den Run spielbar halten.
- Schnelle Richtungswechsel dürfen Figuren nie auf die Seite oder auf den
  Kopf drehen. Nur Projektile und Zielhilfen dürfen frei rotieren.
