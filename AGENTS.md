# Emberhold – Projektanweisungen für Codex

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

## Historischer Produktkontext

Dieser Abschnitt ist kein Arbeitsauftrag. Priorität und Scope stehen nur in
docs/CURRENT_TASK.md.

**Stand 22.08.2026, nach D-034.** Phase 0.5 ist umgesetzt (D-019 bis D-023).
Danach hat der Besitzer zum ersten Mal selbst gespielt und bewertet — das
Ergebnis steht in **D-027** und ist das Dokument, an dem sich gerade alles
ausrichtet: *„Lust ja, aber so funktioniert der Run nicht."* Der Schwärmer ist
**nicht freigegeben**, der Stürmer bleibt gesperrt.

Aus D-027 sind Rang 1 bis 4 abgearbeitet:

| Rang | Was | Entscheidung |
|---|---|---|
| 1 | Bewegungsüberschuss beseitigt, Feld verstopft nicht mehr | D-028 bis D-030 |
| 2 | Slotanzeige läuft nicht mehr aus dem Bild | — |
| 3 | Evolutionen wieder erreichbar; Gluttropfen als einsammelbare Heilung | D-031, D-032 |
| 4 | Zweck sichtbar: ein Ziel im Hold und am Run-Ende; Erzkurve korrigiert | D-033, D-034 |

**Offen bleiben Rang 5 und 6:** Die Animation wirkt für den Besitzer ruckelig,
er würde Detailqualität gegen mehr Phasen tauschen — das **kehrt D-015 und
D-016 um** und braucht neue Assets sowie eine eigene bewusste Entscheidung.
Die seitliche Safe-Area gefällt ihm nicht, das ist rein kosmetisch.

### Drei Dinge, die eine neue Sitzung wissen muss

**1. Der Kartenzug-Korridor ist kein Designziel mehr.** Seit D-026 ist belegt,
dass der Testbot die menschliche Kurve nicht abbildet: Menschen erreichen den
ersten Kartenzug nach 34,9 / 35,2 / 33,9 Sekunden, der Bot nach 26,5 bei einer
Streuung von 21,0 bis 30,7. `totalPicks` prüft deshalb gegen den
Regressionsanker `BOT_PICK_REF`, nicht gegen `CFG.PICK_TARGETS`. Beide Zahlen
stehen getrennt in der Testausgabe als `botRef` und `designTotal`. **Wer den
Anker „zurück auf 21 repariert", macht es kaputt.** Das Designziel wird an
Menschenläufen geprüft, siehe die Feldlauf-Tabelle in `docs/TESTPLAN.md`.

**2. Sechs Änderungen warten auf einen Feldlauf.** D-030 bis D-034 sind
gemessen und getestet, aber keine ist im Spiel bestätigt. **Keine weiteren
Balanceänderungen stapeln**, bevor der Besitzer einen sauberen 8-Minuten-Lauf
gefahren hat — sonst lässt sich nicht mehr zuordnen, was gewirkt hat. Das
Prüfprotokoll mit sechs gezielten Fragen steht in `docs/TESTPLAN.md`.

**3. Die Reserve beim Dichte-Überschuss ist halbiert.** `densityOvershoot`
erlaubt 10 %, aktuell liegen wir bei 6,8 % (vorher 3,9 %). Ursache ist eine
Kette: mehr Kartenzüge → höhere Stufe → zähere Gegner → langsameres Sterben.
Jede Änderung, die die Kartenzüge weiter hebt, kann den Check reißen. Das ist
kein Fehler, sondern genau die Warnung, für die er gebaut wurde.

### Was weiterhin unverhandelbar ist

Neue Hold-Boni und Vertragsmodifikatoren dürfen nicht unbemerkt in die
Baseline-Seed-Suite gelangen; `baselineIsolated` prüft das in drei Checks.
Bestehende lokale Spielstände immer migrieren, niemals durch eine neue
Save-Version still löschen. Und Erwartungswerte in Tests nicht hart verdrahten:
`holdFlow` und `contractFlow` sind an D-034 zerbrochen, weil sie Erzwerte fest
eingetragen hatten, obwohl an dem was sie prüfen nichts falsch war. Beide leiten
ihre Erwartung jetzt aus der Laufzeit ab.

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
