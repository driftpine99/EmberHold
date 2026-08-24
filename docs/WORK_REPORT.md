# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-24-01 (D-036 – Späte Progression und Waffenrollen)
- **Status:** FERTIG, bereit für Codex-Review
- **Ausgangscommit:** `676506ffe24b8168fc7adb614d13a89811d34bef`
- **Ausgangsstatus:** Arbeitsbaum sauber (`## main...origin/main`), `npm test`
  43/43 grün, Exitcode 0
- **Endstand:** `npm test` **45/45 grün**, Exitcode 0; `git diff --check` sauber
- **Commits:** keine. **Nicht committet, nicht gepusht** — wie beauftragt.

## Ergebnis in einem Satz

Alle vier Scope-Punkte sind umgesetzt, zwei neue Verhaltenschecks sichern sie
ab und sind per Mutation gegengeprüft; die Rundenklinge hatte tatsächlich einen
Funktionsfehler, kein reines Abstimmungsproblem.

## Geänderte Dateien

| Datei | Art |
|---|---|
| `prototype/web/index.html` | XP-Kurve, Pfeilregen-Faktor, Klingen-Trefferprüfung, Waffentelemetrie, zwei Testexporte |
| `tools/run-balance-suite.mjs` | zwei neue Checks `lateProgression` und `weaponRoles` |
| `docs/CURRENT_TASK.md` | Auftrag eingetragen, Status auf `BEREIT_FUER_CODEX_REVIEW` |
| `docs/WORK_REPORT.md` | dieser Bericht |

`ROADMAP.md`, `docs/DECISIONS.md`, `docs/TESTPLAN.md`, `CHANGELOG.md`,
`AGENTS.md`, `CLAUDE.md` und `docs/WORKFLOW.md` sind **unverändert**.

```text
 prototype/web/index.html    |  77 +++++++++++++++---
 tools/run-balance-suite.mjs | 185 +++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 251 insertions(+), 11 deletions(-)
```

## A. XP-Kurve

### Konstanten und Formel

| | vorher | nachher |
|---|---|---|
| Formel | `xpNeed(L) = 82 · L^0,70` | `L ≤ 20`: unverändert · `L > 20`: `82 · L^0,70 · (L/20)^3,0` |
| neue Konstanten | – | `CFG.XP_LATE_AT = 20`, `CFG.XP_LATE_K = 3.0` |
| `XP_C` / `XP_K` | 82 / 0,70 | **unverändert** 82 / 0,70 |

Es ist dieselbe Kurvenfamilie: Oberhalb von Stufe 20 steigt nur der Exponent
von 0,70 auf 3,70. An der Grenze ist der Zusatzfaktor exakt 1,0 — die Kurve ist
stetig, es gibt keinen Deckel und keine Sperre.

| Stufe | vorher | nachher | Faktor |
|---:|---:|---:|---:|
| 1 | 82,0 | 82,0 | 1,00 |
| 20 | 667,6 | 667,6 | 1,00 |
| 21 | 690,8 | **799,7** | 1,16 |
| 30 | 886,7 | 2.992,8 | 3,38 |
| 40 | 1.084,6 | 8.676,5 | 8,00 |

Der Kostensprung von Stufe 20 auf 21 beträgt +19,8 % statt +3,5 %. Der
Progressionstest deckelt ihn ausdrücklich bei 25 %, damit dort nie eine Wand
entsteht.

### Synthetischer Level-47-Budgettest

| Größe | Wert |
|---|---:|
| XP-Budget, das die **alte** Kurve bis Stufe 47 brauchte | 32.951 |
| Selbstkontrolle: Stufe mit diesem Budget auf der alten Kurve | **47** |
| Stufe mit diesem Budget auf der **neuen** Kurve | **33** |
| Zielkorridor des Auftrags | 30–34 ✓ |
| Stufe bei zehnfachem Budget | 55 (kein Deckel) |

### Warum k = 3,0

Gemessen über alle neun Referenzseeds. Der Exponent hat auf den **Bot** fast
keinen Hebel, weil der Bot ohnehin kaum über Stufe 20 hinauskommt — er
bestimmt praktisch nur den synthetischen Budgetwert:

| `XP_LATE_K` | Stufe bei Level-47-Budget | Kartenzüge Bot | Aufschlag auf Stufe 21 |
|---:|---:|---:|---:|
| 0 (aus) | 47 | 20,78 | 0 % |
| 2,0 | 35 | 19,22 | +10,3 % |
| 2,5 | 34 | 19,11 | +13,0 % |
| 2,75 | 33 | 19,00 | +14,4 % |
| **3,0** | **33** | **19,00** | **+15,8 %** |
| 3,25 | 32 | 19,00 | +17,2 % |

3,0 liegt mittig im geforderten Korridor 30–34 und ist weit draußen deutlich
milder als eine Exponentialform (Stufe 47 kostet das 13-fache statt des
25-fachen).

## B. Pfeilregen

Geändert wurde **genau eine** Stellschraube: der EVO-Schadensmultiplikator des
Splitterköchers.

| | vorher | nachher |
|---|---|---|
| Codezeile | `... * (evo?.82:1)` | `... * (evo?.68:1)` |
| Änderung | – | **−17,1 %** |
| Fächerbreite, Projektilzahl, Durchschlag, Feuerrate | unverändert | **unverändert** |
| normaler Splitterköcher | unverändert | **unverändert** |

## C. Rundenklinge

### Diagnose: Es war ein Funktionsfehler

Die Klinge war die **einzige** Waffe, die den Körperradius des getroffenen
Gegners ignorierte. Jedes Projektil rechnet mit `r + 9` (normal), `+ 16`
(Elite) beziehungsweise `+ 30` (Warden); die Klinge prüfte nur, ob der
**Mittelpunkt** des Gegners innerhalb ihres Eigenradius von 17 lag.

Folgen: Die effektive Trefferfläche gegen einen Normalgegner war 17² statt
26² — Faktor 2,3. Gegen den Warden mit 30 Einheiten Körper war sie 17² statt
47² — Faktor 7,6. Die Klinge zog sichtbar durch Gegner hindurch, ohne zu
treffen, und war gegen den Warden praktisch wirkungslos.

Korrigiert wurde ausschließlich diese Inkonsistenz. **Kein** Schadenswert,
**keine** Klingenzahl, **kein** Radius der Umlaufbahn, **keine** Defensive und
**keine** Rüstung wurden angefasst.

### Benchmark

Deterministisches Nahbereichsszenario: Spieler im Ursprung, Gegner auf einem
gleichmäßigen Gitter (16 Einheiten Raster) im Ring von 38 bis 155
Welteinheiten, 275 Gegner, 600 Ticks, keine Gegnerbewegung, alle Gegner
überleben die Messung. Ein Gitter statt Ringen, weil sonst die zufällige Lage
eines Rings relativ zur Klingenbahn das Ergebnis bestimmt.

| Messung | vorher | nachher | Faktor |
|---|---:|---:|---:|
| Rundenklinge Stufe 2 | 35.229 | 83.392 | **2,37×** |
| Rundenklinge Stufe 3 | 56.779 | 134.680 | **2,37×** |
| Rundenklinge Stufe 4 | 68.234 | 159.787 | **2,34×** |
| Rundenklinge Stufe 5 | 117.518 | 275.105 | **2,34×** |
| Klingenzyklon Stufe 5 | 175.497 | 410.587 | **2,34×** |
| Rundenklinge gegen Warden | 874 | 2.751 | **3,15×** |
| Kettenblitz Stufe 4, Nahfeld | 5.236 | 5.236 | 1,00 |
| Langbogen Stufe 4, Nahfeld | 7.096 | 7.096 | 1,00 |
| Splitterköcher Stufe 5, Fernfeld | 11.476 | 11.476 | 1,00 |
| **Pfeilregen Stufe 5, Fernfeld** | **37.866** | **31.401** | **0,83×** |
| Langbogen gegen Warden | 1.774 | 1.774 | 1,00 |
| Kettenblitz gegen Warden | 1.047 | 1.047 | 1,00 |

Der Zielkorridor „ungefähr 2–3× wirksamer" ist damit getroffen, mit einer
einzigen Korrektur statt gestapelter Buffs.

**Wichtige Einordnung:** Der Benchmark misst Durchsatz gegen eine dichte,
stehende Nahkampfmenge. Das ist der Bestfall der Klinge, nicht der Normalfall
eines Runs — im Feldlauf kam sie auf 291 Schaden, weil Gegner sie bei einem
dominanten Fernkampfbuild gar nicht erst erreichen. Die Zahlen sind als
Vorher-/Nachher-Vergleich der Klinge belastbar, **nicht** als Aussage „Klinge
stärker als Bogen".

### Keine neue Schneeballkurve

Die stärkere Klinge erhöht die Kartenzüge nicht, sie senkt sie sogar:

| Stand | Kartenzüge Bot |
|---|---:|
| Ausgangscommit `676506f` | 21,67 |
| nur Klingen-Trefferkorrektur | **21,00** |
| nur Pfeilregen-Nerf | 21,67 (keine Wirkung auf den Bot, siehe unten) |
| beide Waffenänderungen, XP-Bremse aus | 20,78 |
| Endstand mit XP-Bremse | **19,00** |

Auch die Feldspitze steigt nicht: `densityOvershoot` liegt unverändert bei
+3,5 % gegen die erlaubten +10 %.

**Ehrliche Einschränkung:** Der Pfeilregen-Nerf ist im Botlauf **nicht**
messbar, weil die Bot-Kartenstrategie den Splitterköcher praktisch nie
evolviert — die Werte sind bis auf die letzte Stelle identisch mit dem
Ausgangsstand. Belegt ist der Nerf ausschließlich über den deterministischen
Benchmark und den neuen Check `weaponRoles`.

## D. Waffentelemetrie

Neue Felder im Run-State, beide als `Float64Array(6)` in Katalogreihenfolge:

- `S.wFirst[i]` — Sekunde der ersten Aufnahme, `-1` = nie
- `S.evoAt[i]` — Sekunde der Evolution, `-1` = keine

Gesetzt wird jeweils einmal je Waffe, nicht pro Treffer und nicht pro Frame.
Aktive Zeit und Schaden je Sekunde werden **erst beim Erzeugen des Berichts**
gerechnet. Keine neuen Allokationen in Treffer- oder Schwarm-Schleifen, keine
neuen HUD-Elemente, kein Save-Feld berührt, Save-Version unverändert bei 4.

Neue Berichtszeile, gemessen im Browser bei 1422×613:

```text
Waffenverlauf: Langbogen ab 0:00 · 8:00 aktiv · 33/s,
               Pfeilregen ab 1:01 · 6:59 aktiv · 100/s · EVO 3:34,
               Rundenklinge ab 1:32 · 6:27 aktiv · 166/s
```

Liegt die aktive Zeit unter einer Sekunde, steht `–/s` statt einer erfundenen
Null.

## Tests und Nachweise

| Befehl / Prüfung | Ergebnis | Exitcode |
|---|---|---:|
| `npm test` (final) | **45 von 45 Checks grün**, `pass: true` | **0** |
| `git diff --check` | keine Ausgabe | 0 |
| `git status --short --branch` | nur die vier oben genannten Dateien geändert | 0 |
| `lateProgression` (neu) | grün, 5 Teilprüfungen | — |
| `weaponRoles` (neu) | grün, 3 Teilprüfungen | — |

### Vorher / Nachher über alle neun Referenzseeds

| Größe | vorher (`676506f`) | nachher | Vorgabe |
|---|---:|---:|---|
| Erster Kartenzug, Mittelwert | 31,64 s | **31,64 s** | unverändert ✓ |
| First-Pick-Korridor 25–45 s | grün | grün | bleibt gültig ✓ |
| Kartenzüge, Mittelwert | 21,67 | **19,00** | Anker 21,7 ± 3 → 18,70–24,70 ✓ |
| Läufe mit Evolution | 9 / 9 | **7 / 9** | — |
| Evolutionen je Lauf | 1,89 | **1,44** | Ziel 1–2 typisch ✓ |
| Kills, Mittelwert | 6.915 | 6.235 | — |
| Endstufe Bot, Mittelwert | 22,67 | 20,00 | — |
| Feldspitze, Maximum | 312 | **312** | unverändert ✓ |
| Feldspitze, Mittelwert | 286 | 267 | — |
| Dichte-Überschuss | +3,5 % | **+3,5 %** | Grenze +10 % ✓ |
| Zieldichte 8:00 | 301 | **301** | unverändert ✓ |

### Mutationstest der beiden neuen Checks

Jede Änderung einzeln zurückgenommen, jeweils die volle Suite gefahren:

| Zurückgenommen | Rot geworden |
|---|---|
| `XP_LATE_K` auf 0 (Bremse aus) | nur `lateProgression` |
| Pfeilregen zurück auf `.82` | nur `weaponRoles` (Verhältnis 3,28 statt 2,72) |
| Klinge wieder nur Mittelpunktprüfung | nur `weaponRoles` |

Kein Check ist eine Tautologie, keiner reißt einen anderen mit.

### Was `weaponRoles` genau prüft

Die Klingenbahn liegt bei Stufe 2 auf exakt 74 Welteinheiten; ein Gegner in
radialem Abstand d hat also |d − 74| Abstand zur Bahn. Damit lassen sich die
drei Fälle exakt stellen, ohne in die Arrays zu schreiben:

| Fall | Abstand zur Bahn | Grenze | gemessen | erwartet |
|---|---:|---|---:|---|
| Normalgegner knapp außerhalb des Eigenradius | 20 | 17+9 = 26 | **638** | trifft ✓ |
| Normalgegner klar zu weit | 40 | 17+9 = 26 | **0** | trifft nicht ✓ |
| Warden | 40 | 17+30 = 47 | **863** | trifft ✓ |

Der mittlere Fall ist der wichtige: Er schließt aus, dass die Klinge nun
weiter greift als erlaubt.

Zusätzlich: Pfeilregen gegen normalen Splitterköcher im selben Fernfeld,
Verhältnis **2,72** (vorher 3,28). Die Decke liegt bei 3,0, der Boden bei 2,0 —
Pfeilregen bleibt deutlich stärker als der Grundköcher, ist aber keine
automatische Wahl mehr.

### Bestätigung: Warden und Boss-Adds unverändert

| Prüfung | Wert vorher | Wert nachher |
|---|---:|---:|
| `BOSS_ADD_TARGET` | 90 | **90** |
| normale Gegner mit lebendem Warden | 90 | **90** |
| normale Gegner ohne Warden | 127 | **127** |
| Warden-HP-Faktor (`kind===2` → `hp*=120`) | unverändert | unverändert |
| `bossTargeting`, `bossDurability`, `bossCombatPocket`, `bossLocatorState` | grün | grün |

Im Diff ist keine Zeile der Warden-Logik, der Spawnkurve, von `targetEnemies`,
des HUD oder der Safe-Areas enthalten.

### Browser-Smoke bei 1422×613

Echte Frames gerendert, programmatisch aus dem laufenden Canvas gelesen:

- 20 `render()`-Durchläufe, Canvas 1422×613, 872 von 871 Stichproben nicht
  schwarz — es wurde tatsächlich gezeichnet.
- **Die Klinge trifft den Warden jetzt:** 2.823 Bossschaden (33 % Anteil).
  Vor der Korrektur war das praktisch nicht möglich.
- Alle drei Waffenzeilen im Bericht korrekt gefüllt.
- Kein horizontaler Überlauf.

**Was ich ausdrücklich nicht behaupte:** Der subjektive 8-Minuten-Test ist
**nicht** bestanden — den fährt der Besitzer. Der Screenshot der Vorschau ist
ein statischer Schnappschuss und taugt nicht zur Beurteilung des Spielgefühls;
außerdem laden die PNG-Atlanten über die `data:`-URL nicht, es lief der
prozedurale Fallback.

## Bekannte Risiken

1. **Der Bot-Anker hat nur noch 0,30 Reserve nach unten.** 19,00 gegen die
   Untergrenze 18,70. Wichtig für die Bewertung: Der XP-Exponent ist dafür
   **nicht** der Hebel — von `XP_LATE_K` 2,0 bis 3,25 bleiben die Kartenzüge
   praktisch konstant (19,22 bis 19,00). Der Rückgang kommt zu etwa einem
   Drittel aus der Klingenkorrektur und zu zwei Dritteln daraus, dass der Bot
   die letzten Stufen nicht mehr erreicht. Eine mildere Bremse würde die
   Reserve also nicht zurückholen. Ich habe den Anker **nicht** angefasst.
2. **Der Pfeilregen-Nerf ist im Botlauf unsichtbar** (siehe oben). Erst der
   nächste Feldlauf zeigt, ob −17,1 % das richtige Maß sind.
3. **Die Klinge ist im Nahfeld-Benchmark sehr stark.** Ob sie im echten Run das
   Risiko der Nahdistanz wert ist, entscheidet nur der Feldlauf. Wenn sie dort
   überdreht, ist der nächste Schritt eine Senkung des Schadenswerts — die
   Trefferkorrektur selbst sollte bestehen bleiben, sie behebt einen Fehler.
4. **Der Zielkorridor 28–34 Kartenzüge ist am Menschen noch unbestätigt.** Der
   synthetische Budgettest sagt Stufe 33, also 32 Kartenzüge. Die
   Rückkopplung (weniger Stufen → weniger Schaden → weniger Erfahrung) drückt
   den echten Wert zusätzlich nach unten, vermutlich Richtung 28–31.

## Offene Punkte

- `CHANGELOG.md`, `docs/DECISIONS.md` (D-036), `docs/TESTPLAN.md` und
  `ROADMAP.md` sind bewusst **nicht** angefasst — laut Auftrag synchronisiert
  Codex sie nach unabhängiger Prüfung.
- Der vorbestehende Todesframe-Telemetriefehler bleibt unverändert offen.

## Manuelle Abnahmeschritte

**Für Codex:**

1. `npm test` selbst ausführen — erwartet 45/45, Exitcode 0.
2. Den Diff auf die vier Scope-Punkte prüfen; insbesondere bestätigen, dass
   keine Warden-, Dichte-, HUD- oder Save-Zeile enthalten ist.
3. Die Klingenkorrektur bewerten: Ist „Körperradius mitrechnen wie bei jedem
   Projektil" als Fehlerbehebung akzeptiert, oder soll sie als Balancewert
   behandelt und kleiner ausfallen?
4. Über die Reserve am Bot-Anker entscheiden (Risiko 1) — ich habe ihn
   bewusst nicht verändert.

**Für den Besitzer** (nach Codex' Freigabe, ein vollständiger
Wächterring-Lauf über 8 Minuten ohne Live-Tuning):

1. Fühlen sich die ersten drei bis vier Minuten **genauso** an wie vorher? Bis
   Stufe 20 wurde bewusst nichts geändert.
2. Endet der Lauf bei ungefähr 28–34 Kartenzügen statt bei 46? Wird der
   Fortschritt in der zweiten Hälfte spürbar langsamer, ohne blockiert zu
   wirken?
3. Bist du am Ende noch praktisch unbesiegbar, oder gibt es wieder brenzlige
   Momente?
4. Ist Pfeilregen weiterhin stark, aber nicht mehr automatisch die beste Wahl?
5. Lohnt sich die Rundenklinge jetzt? Insbesondere: Merkst du sie im
   Warden-Kampf?
6. Danach den **vollständigen Run-Bericht** kopieren. Die neue Zeile
   `Waffenverlauf` ist die Grundlage für die nächste Balance-Entscheidung.

## Eingesetzter Subagent und eigene Nachprüfung

Für den `lateProgression`-Testblock habe ich einen Haiku-Subagenten
eingesetzt — eine klar abgegrenzte, rein arithmetische Aufgabe. Keine
Produktentscheidung und keine Dokumentation wurden delegiert.

Ich habe seinen vollständigen Diff geprüft und **drei Dinge selbst
nachgebessert**:

1. **Tote Variable:** `LK` (`XP_LATE_K`) wurde eingelesen, aber nie benutzt.
   Ich habe daraus eine echte Prüfung gemacht: Der Zusatzfaktor muss exakt
   `(L/20)^XP_LATE_K` sein. Ohne das wäre jede beliebige steigende Kurve grün
   gewesen.
2. **Off-by-one:** Seine Schleife zählte die *bezahlten* Stufen, nicht die
   *erreichte* Stufe — der Korridor 30–34 wäre damit faktisch 31–35 gewesen.
   Korrigiert auf die Semantik von `gainXP()`; der Wert lautet jetzt 33 statt
   32.
3. **Fehlende Selbstkontrolle:** Der Test bildete ein Referenzbudget, prüfte
   aber nie, ob dieses Budget auf der alten Kurve wirklich Stufe 47 ergibt.
   Ergänzt als `budgetStimmt` — jetzt fällt auf, wenn das Budget falsch
   gebildet wurde.

Anschließend habe ich die volle Suite selbst ausgeführt, den zweiten Check
`weaponRoles` selbst geschrieben, alle Benchmarks selbst gefahren und die drei
Mutationstests selbst durchgeführt. Analyse, Diagnose der Klinge, Wahl des
XP-Exponenten und dieser Bericht stammen vollständig vom Hauptagenten.

## Codex-Review vom 24.08.2026

Codex hat den vollständigen Diff unabhängig geprüft und `npm test` selbst
ausgeführt. Claudes vier Scope-Punkte sind akzeptiert; Warden, Dichte, Hold,
HUD und Save-Pfad bleiben unverändert.

Ein Review-Mangel wurde direkt behoben: `weaponTimelineText()` war im Browser
geprüft, aber noch nicht automatisch gegen Regression abgesichert. Der
bestehende Check `weaponDamageReport` prüft jetzt deterministisch Langbogen ab
0:00 mit 4:00 Aktivzeit und 2/s sowie Sturmherz ab 1:00 mit 3:00 Aktivzeit,
3/s und EVO 3:00; inaktive Waffen dürfen nicht erscheinen. Die erste
Testerwartung verwendete trotz gesetzter Evolution den Namen `Kettenblitz` und
wurde auf den korrekten Namen `Sturmherz` korrigiert. Endstand: **45/45 Checks
grün**, `git diff --check` sauber. Empfehlung: technisch abnehmen und den
D-036-Besitzerlauf starten.
