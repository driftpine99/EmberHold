# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-23-02
- **Status:** **BLOCKIERT** – der gesamte freigegebene Scope ist umgesetzt und
  geprüft, aber ein Regressionsanker (`totalPicks`) ist durch die beauftragte
  Produktregel ungültig geworden. Über seine Neureferenzierung entscheidet
  Codex, nicht Claude.
- **Ausgangscommit:** `694b69557d7d69e950a84dd9f6e60db57b8fa6c1`
- **Ausgangs-Git-Status:** sauber (`## main...origin/main`, keine fremden
  Änderungen, keine unversionierten Dateien)
- **Lokale Commits:**
  - `a5d9dfc` — Laufzeitcode und Tests
  - Doku-Commit (dieser Commit) — nur `docs/WORK_REPORT.md`
- **Kein Push.**

## Ergebnis in einem Satz

Alle vier Scope-Punkte aus D-035 sind umgesetzt, fünf neue Verhaltenstests sind
grün und per Mutation gegengeprüft, 42 von 43 Checks bestehen — der eine rote
Check ist der Kartenzug-Anker, den die beauftragte Evolutionsänderung
zwangsläufig verschiebt.

## Warum BLOCKIERT und nicht FERTIG

`totalPicks` prüft den Botanker `BOT_PICK_REF = 15,3 ± 3`, also den Korridor
12,30 bis 18,30. Nach der Umsetzung liegt der Mittelwert bei **21,67**.

Der Auftrag verbietet ausdrücklich, eine Testschwelle nur zum Grünwerden zu
lockern, und verlangt bei einem durch die neue Produktregel entwerteten Anker
eine Messreihe plus `BLOCKIERT`. Genau das liegt vor. Ich habe
`BOT_PICK_REF` **nicht** angefasst.

### Messreihe: woher die 21,67 kommen

Vier Varianten, jeweils dieselben neun Referenzseeds, 8 Minuten, unsterblicher
Bot. Nur die genannte Eigenschaft unterscheidet sie.

| Variante | Kartenzüge | Läufe mit Evolution | Evolutionen je Lauf | Kills |
|---|---:|---:|---:|---:|
| A – Ausgangsstand `694b695` | 16,11 | 3/9 | 0,67 | 4.852 |
| B – alles neu, aber Fokus zurück auf 5:30 | 17,22 | 5/9 | 0,89 | 5.060 |
| C – alles neu, aber ohne Sofortabschluss | 18,78 | 9/9 | 1,33 | 5.663 |
| D – vollständig (Fokus 4:00 + Sofortabschluss) | **21,67** | 9/9 | 1,89 | 6.915 |

Beide Hebel sind einzeln vom Auftrag verlangt und einzeln wirksam:

- Der **Fokus ab 4:00 auf dem führenden Pfad** hebt die Evolutionsläufe von
  3/9 auf 9/9 (Variante C) und die Kartenzüge um 2,67.
- Der **Sofortabschluss** bringt eine zweite Evolution je Lauf (1,33 → 1,89)
  und weitere 2,89 Kartenzüge.

Die Kette ist bekannt und in `CLAUDE.md` beschrieben: mehr Kartenzüge → höhere
Stufe → stärkerer Build → mehr Kills → mehr XP. Evolutionen sind der stärkste
Sprung in dieser Kette. Der Anker wurde vor dieser Regel kalibriert.

### Was Codex entscheiden muss

Drei Wege, alle drei sind Produktentscheidungen:

1. **Anker neu referenzieren** auf den gemessenen Wert (21,67) — mit dem
   Hinweis, dass der Bot damit erstmals über dem Designziel von 21 liegt.
2. **Einen der beiden Hebel zurücknehmen** — Variante B (17,22) bliebe im
   bestehenden Korridor, erfüllt dann aber D-035 nur halb.
3. **Anker vorerst stehen lassen** und den nächsten Feldlauf abwarten, weil der
   Bot laut D-026 ohnehin nicht die menschliche Kurve abbildet.

Meine Einschätzung, ausdrücklich als Empfehlung und nicht als Entscheidung:
Weg 1 ist am ehrlichsten, weil der Anker eine reine Bot-Regressionsmarke ist
und die Regel selbst gewollt war. Bemerkenswert ist aber, dass der Bot jetzt
genau dort landet, wo das Designziel für Menschen liegt — Menschen liegen laut
D-026 unter dem Bot, der nächste Feldlauf sollte also gezielt die Kartenzüge
zählen.

## Geänderte Dateien

| Datei | Commit | Art |
|---|---|---|
| `prototype/web/index.html` | `a5d9dfc` | Laufzeit: Warden-Kampfphase, Ortung, kompaktes HUD, Pause-Detail, Evolutionsabschluss, Schadensmessung, CSS, Testexporte |
| `tools/run-balance-suite.mjs` | `a5d9dfc` | fünf neue Checks, angepasste Quelltext-Zusicherung in `telemetrySeparated` |
| `docs/WORK_REPORT.md` | Doku-Commit | dieser Bericht |

`CHANGELOG.md`, `docs/DECISIONS.md` und `docs/TESTPLAN.md` sind **bewusst nicht
geändert**: Der Auftrag gibt sie nur frei, „wenn Code und Tests grün sind". Das
ist wegen `totalPicks` nicht erfüllt. Außerdem hängt der einzutragende Ist-Wert
für die Kartenzüge an Codex' Entscheidung über den Anker — ihn jetzt zu
schreiben, hieße die Entscheidung vorwegzunehmen.

`ROADMAP.md`, `docs/CURRENT_TASK.md`, `AGENTS.md`, `CLAUDE.md` und
`docs/WORKFLOW.md` wurden nicht angefasst.

## Abnahmekriterien und Belege

### Scope 1 – Warden als lesbare Kampfphase

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| Benannte Konstante `BOSS_ADD_TARGET = 90` | erfüllt | `prototype/web/index.html`, Konstante mit Begründung |
| Nachspawnziel während lebendem Boss ≤ 90 | erfüllt | `bossCombatPocket`: ohne Boss 127 normale Gegner, mit Boss **90** |
| Boss und Eliten zählen nicht mit, werden nicht entfernt | erfüllt | Mit 1 Boss und 5 Eliten im Feld erreichen die normalen Gegner trotzdem volle 90; `boss=1`, `elite=5` unverändert |
| Vorhandene Gegner nicht schlagartig gelöscht | erfüllt | 127 normale Gegner vor Boss-Eintritt, **127** direkt danach |
| Nach Boss-Tod wieder normale Kurve | erfüllt | während Boss 90 → nach Tod **135** |
| Keine Beute, XP oder Kills für entfernte Gegner | erfüllt | Test läuft mit abgeschalteten Waffen: `S.kills` und beide Splitterzähler bleiben exakt unverändert |
| Randpfeil außerhalb, Chevron innerhalb, beides weg nach Tod | erfüllt | `bossLocatorState`: links/rechts/oben/unten je Randpfeil, innen Chevron, nach Tod `null` |
| Marker respektiert Safe-Area | erfüllt | Marker wird am Kampfausschnitt geklemmt; im Browser bei 1422×613 gemessen: Marker bei 466 von erlaubten 500 Welteinheiten, außerhalb der 166 px Safe-Area |
| Unterscheidbar von Aelrics Geschossen | teilweise belegt | Pixelmessung im Browser: 1.978 rot-goldene Pixel am Randpfeil, hellster Pixel RGB(240,195,90) = Gold `#f0c45a`. Die **subjektive** Unterscheidbarkeit bleibt beim Besitzer |
| Keine Änderung an Simulation oder Zielwahl | erfüllt | `bossLocator()` liest nur Positionen; `bossTargeting` und `bossDurability` weiterhin grün |
| Bossleiste bleibt | erfüllt | `updateHUD` unverändert bis auf die gemeinsame Hilfsfunktion `bossIsAlive()` |

### Scope 2 – Standard-HUD entschlacken

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| Links nur Waffen, Passive, ein Evolutionspfad | erfüllt | `compactCombatHud`: 7 Slots + 1 Pfad |
| Höchstens acht Einträge beim D-035-Feldbuild | erfüllt | **8** Einträge (5 Waffen, 2 Passive, 1 Fokuspfad) |
| Fokuspfad ist der am weitesten fortgeschrittene, deterministisch | erfüllt | Fokus = Windriss (Langbogen 5 + Sehne 3) bei 5 offenen Pfaden; bei Gleichstand Katalogreihenfolge |
| Meta-Boni raus aus der Kampfliste | erfüllt | alle 8 Meta-Einträge fehlen im `#slots`-HTML |
| Meta-Boni vollständig in der Pause unter `Run-Boni` | erfüllt | alle 8 im `#pausedetail`; Abschnitt heißt `Run-Boni` |
| Pause zeigt vollständigen Build und alle Pfade | erfüllt | Build vollständig, **5 von 5** Pfaden vorhanden |
| Kein horizontaler Überlauf bei 1422×613 | erfüllt | Browser gemessen: Slotliste 168 px breit, rechte Kante 182 px von 1422; Pause `scrollWidth === clientWidth`; `document.body` ohne Überlauf |
| Verdeckt Bossmarker, Pause oder Stoß nicht | erfüllt | Slotliste endet bei 182 px und 605 px von 613 px Höhe; Marker wird im Weltraum gezeichnet |

### Scope 3 – Evolutionsabschluss

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| `EVO_FOCUS_AT = 240` | erfüllt | `evolutionCompletion`: `fokusAb = 240` |
| Fokus verfolgt den führenden Pfad | erfüllt | Bei Bogen 1 / Klinge 4 + Federung 2 wählt der Fokus **Klinge**, obwohl Langbogen im Katalog vorn steht |
| Fokus greift nicht vor 4:00 | erfüllt | Bei 239 s erscheint die Fokuskarte nicht in jedem der 40 Angebote |
| Sofortige Evolution beim letzten Waffenlevel | erfüllt | Bogen 4 + Sehne 3, Waffenkarte → `S.evo.bogen === 1` im selben Zug |
| Sofortige Evolution beim letzten Passivlevel | erfüllt | Bogen 5 + Sehne 2, Passivkarte → sofort |
| Keine doppelte Evolution | erfüllt | `evoTimes.length` bleibt 1 |
| Folgender Kartenzug ist ein normales Dreierangebot | erfüllt | 3 Karten, keine `evo`-Karte |
| Karten-Gewichte, Rerolls, übrige Plätze unverändert | erfüllt | Kein Eingriff in Pool oder Gewichte; nur die Auswahl der Fokuskarte |
| Toast, HUD, Run-Bericht zeigen den Abschluss | erfüllt | `toast()` im selben Zug, HUD-Slot wird `EVO`, `Evolutionen:` im Bericht; `evoTimes` hält den Zeitpunkt |

### Scope 4 – Waffenschaden messbar

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| Overkill nur bis verbleibende HP | erfüllt | Gegner mit 8,44 HP, Treffer mit 422 Schaden → gebucht **8,44** |
| Getrennte Erfassung je Waffe | erfüllt | `dmgW` als `Float64Array(6)` in Katalogreihenfolge |
| Boss-Anteil getrennt | erfüllt | Normalschaden erhöht `dmgWBoss` nicht; Bosstreffer schon, und nie mehr als der Gesamtwert |
| Quellzuordnung Projektil | erfüllt | `P.src` je Projektil |
| Quellzuordnung Kettenblitz | erfüllt | Schaden ausschließlich auf `blitz`, alle anderen Felder 0 |
| Quellzuordnung Klinge | erfüllt | Schaden ausschließlich auf `klinge` |
| Quellzuordnung Feuerboden → Feuerkugel | erfüllt | Nach Ablauf des Bodens steigt `kugel` weiter, alle anderen bleiben 0 |
| Quellzuordnung Frostsplitter → Frostnova | erfüllt | Ein **Bogen**projektil tötet den verlangsamten Gegner; der Splitterschaden landet auf `frost`, der direkte Treffer auf `bogen` |
| Zwei Berichtszeilen, nur aktive Waffen | erfüllt | `Schaden je Waffe:` und `Boss-Schaden je Waffe:`; inaktive Waffen fehlen |
| Keine Allokation je Treffer oder Frame | erfüllt | Feste `Float64Array`-Felder, eine Modulvariable `DMG_SRC`, kein zusätzliches Objekt und kein zusätzliches Argument im Trefferpfad |
| Keine Balanceänderung | erfüllt | Kein Schadenswert, keine Trefferzahl, keine Abklingzeit geändert |

### Scope 5 – Todesframe-Befund nicht mitgezogen

Nicht angefasst. Der Befund aus dem Vorauftrag (Splitter, die nach `endRun()`
im selben Frame noch eingesammelt werden) bleibt unverändert offen.

## Prüfungen

| Befehl oder Prüfung | Ergebnis | Exitcode |
|---|---|---:|
| `npm test` (final) | 42 von 43 Checks grün, rot: `totalPicks` | **1** |
| `git diff --check` | keine Ausgabe | 0 |
| `git status --short --branch` | sauber, 2 Commits voraus | 0 |
| `bossCombatPocket` | grün | — |
| `bossLocatorState` | grün | — |
| `compactCombatHud` | grün | — |
| `evolutionCompletion` | grün | — |
| `weaponDamageReport` | grün | — |

**Ausdrücklich verlangte Kontrolle — alle grün:** `configStable`,
`aspectIndependent`, `densityOvershoot`, `bossTargeting`, `bossDurability`,
`evolutionReachable`, `healOrbFlow`, `holdFlow`, `holdExpansion`,
`contractFlow`, `equipmentFlow`, `earlyLossGuard`.

### Mutationstest der fünf neuen Checks

Jede Korrektur einzeln zurückgenommen, jeweils die volle Suite gefahren:

| Zurückgenommen | Rot geworden |
|---|---|
| `BOSS_ADD_TARGET` auf 99999 | nur `bossCombatPocket` |
| Ortung immer als Chevron | nur `bossLocatorState` |
| Meta-Boni wieder in die Kampfliste | nur `compactCombatHud` |
| Sofortabschluss abgeschaltet | nur `evolutionCompletion` |
| Overkill ungedeckelt gebucht | nur `weaponDamageReport` |

Kein Check ist eine Tautologie, und keiner reißt einen anderen mit.

### Vorher / Nachher über alle neun Referenzseeds

8 Minuten, unsterblicher Bot, identische Seeds. „v" = Ausgangscommit `694b695`,
„n" = Stand `a5d9dfc`.

| Seed | 1. Zug v | 1. Zug n | Züge v | Züge n | Evo v | Evo n | Kills v | Kills n | Spitze v | Spitze n | Boss-Tötungen n |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1701 | 32,3 | 32,3 | 13 | 14 | 0 | 1 | 3.790 | 3.018 | 310 | **125** | 0 |
| 1709 | 27,8 | 27,8 | 22 | 28 | 2 | 3 | 6.409 | 7.456 | 304 | 302 | 1 |
| 1721 | 30,7 | 30,7 | 12 | 17 | 0 | 1 | 3.580 | 5.991 | 317 | 312 | 1 |
| 1733 | 35,8 | 35,8 | 9 | 12 | 0 | 1 | 2.022 | 2.490 | 322 | 307 | 1 |
| 1741 | 29,8 | 29,8 | 15 | 34 | 0 | 3 | 4.668 | 13.272 | 313 | 305 | 1 |
| 1753 | 32,8 | 32,8 | 31 | 31 | 3 | 3 | 10.960 | 11.884 | 302 | 306 | 1 |
| 1777 | 27,6 | 27,6 | 13 | 18 | 0 | 1 | 3.914 | 4.798 | 314 | 302 | 1 |
| 1789 | 35,2 | 35,2 | 14 | 24 | 0 | 2 | 3.194 | 7.547 | 306 | 307 | 1 |
| 2474367456 | 32,7 | 32,7 | 16 | 17 | 1 | 2 | 5.129 | 5.779 | 305 | 308 | 1 |
| **Mittel** | **31,64** | **31,64** | **16,11** | **21,67** | **0,67** | **1,89** | **4.852** | **6.915** | — | — | **0,89** |

Zieldichte bei 8:00 unverändert **301**. Feldspitze im Maximum **322 → 312**,
im Mittel **310 → 286**.

**Seed 1701 ist der wichtigste Datenpunkt.** Dort stirbt der Warden nicht
(Boss-Tötungen 0), und genau deshalb fällt die Feldspitze von 310 auf **125**:
Der Deckel hält die gesamte Bosszeit. Das ist wörtlich die Situation, die der
Besitzer beschrieben hat — kaum zum Boss durchkommen, während immer mehr
Verstärkung nachrückt.

Der erste Kartenzug ist auf allen neun Seeds **bitgenau identisch**. Die
Änderung wirkt erst ab dem Fokuszeitpunkt und beim Boss, nicht auf das frühe
Pacing.

## Manuelle Prüfungen und Browser-Smoke

Ein Browser-Smoke bei **1422×613** wurde durchgeführt und hat **echte Frames
gerendert**. Belege, alle programmatisch aus dem laufenden Canvas gelesen:

- 30 `render()`-Durchläufe auf einem Canvas von 2133×920 physischen Pixeln
  (DPR 1,5); 1.963 von 1.962 Stichproben nicht schwarz, es wurde also
  tatsächlich gezeichnet.
- **Randpfeil:** 1.978 rot-goldene Pixel um die erwartete Bildposition,
  hellster Pixel RGB(240,195,90) — das ist exakt das Gold `#f0c45a`.
- **Chevron:** 5.559 rot-goldene Pixel über dem Warden.
- **Nach Boss-Tod:** `bossLocator()` liefert `null`, es wird nichts mehr
  gezeichnet.
- Beide Marker liegen außerhalb der Safe-Area (je 166 px bei 1422×613).
- Linke Liste: 7 Slots + 1 Pfad, 168 px breit, rechte Kante bei 182 px,
  Unterkante bei 605 von 613 px.
- Pause: 3 Abschnitte, 13 Chips, 5 Pfade, kein horizontaler Überlauf.

**Was ich ausdrücklich NICHT behaupte.** Der Screenshot der Vorschau ist ein
statischer Schnappschuss, auf dem eine Kartenüberlagerung liegt; er zeigt den
Kampfzustand nicht verlässlich. Außerdem laden die PNG-Atlanten über die
`data:`-URL nicht, es lief also der prozedurale Fallback. Eine **subjektive
Sichtprüfung** — ob der Marker im Gefecht wirklich sofort ins Auge fällt, ob
die linke Seite jetzt ruhig wirkt und ob sich der Marker von Aelrics Pfeilen
klar genug abhebt — habe ich **nicht** durchgeführt. Sie bleibt beim Besitzer.

## Einsatz eines günstigen Subagenten

Für die isolierte CSS-Aufgabe (Pausen-Detailbereich, inklusive kompakter
Variante unter `@media (max-height:700px)`) habe ich einen Haiku-Subagenten
eingesetzt. Ich habe seinen vollständigen Diff geprüft: Er lag korrekt im
`<style>`-Block, hat keine bestehende Regel verändert und keine JavaScript-
Zeile angefasst. Zwei Dinge habe ich selbst nachgezogen:

1. Einen Tippfehler in seinem deutschen Kommentar („Bonien") ersetzt und den
   Kommentar auf den eigentlichen Zweck umgeschrieben.
2. Seine Aussage zur Ursache des roten Checks **nicht übernommen**: Er
   schrieb, `totalPicks` sei ein „dokumentierter Zustand gemäß D-026". Das ist
   falsch — der Check war vor diesem Auftrag grün und ist erst durch die
   Evolutionsänderung gekippt. Die Messreihe oben stammt von mir.

Architektur, Laufzeitcode, alle fünf Verhaltenstests, die Mutationsgegenprobe,
der Browser-Smoke und diese Abnahme stammen vom Hauptagenten.

## Risiken, Nebenwirkungen und Abweichungen

1. **Der Kartenzug-Anker ist rot** (siehe oben). Das ist der Blocker.
2. **Der Bot erreicht jetzt 9 von 9 Evolutionen.** Das GDD reservierte
   „zuverlässige Evolutionen" laut altem Codekommentar für den
   15-Minuten-Tiefenzug. D-035 hebt diesen Vorbehalt für den 8-Minuten-Lauf
   auf; ob 9/9 zu großzügig ist, ist eine Produktfrage für Codex.
3. **Ein ehrlicher Nebeneffekt der Bossphase:** In Läufen, in denen der Warden
   nicht stirbt, bleibt die Dichte dauerhaft bei ~90 statt ~300 (Seed 1701).
   Das ist gewollt, verändert aber das Spielgefühl der Schlussminuten für
   schwache Builds spürbar. Der nächste Feldlauf sollte das bewerten.
4. **`telemetrySeparated` prüft eine umbenannte Quelltextstelle.** Die
   Zusicherung wurde nicht gelockert, sondern erweitert: Sie verlangt jetzt
   zusätzlich, dass `have` aus den Simulationszählern stammt, und schließt
   Renderwerte in der Spawnentscheidung per Regex aus.
5. **`headlessRun()` liefert drei neue Felder** (`bossKills`, `evoTimes`,
   `dmgW`/`dmgWBoss`). `reproducible`, `contractFlow` und `holdExpansion`
   vergleichen jeweils zwei Läufe miteinander und bleiben grün.
6. **Sichtbare Textänderungen:** Der Run-Bericht hat zwei neue Zeilen. Die
   linke Kampfliste ist deutlich kürzer. Die Pause hat einen neuen
   Detailbereich. Nichts davon entfernt Information.
7. **Kein Save-Feld berührt**, Save-Version unverändert bei 4.
8. **Commits liegen auf `main`**, wie vom Auftrag vorgegeben. Kein Push.

Keine Abweichung vom freigegebenen Scope: keine Waffenwerte, keine globale
Dichtekurve außerhalb der Bossphase, keine XP-Kurve, keine neuen Inhalte, kein
numerisches Balancing.

## Abschließender Git-Status

```text
## main...origin/main [ahead 2]
```

Arbeitsbaum sauber, keine unversionierten Dateien.

```text
a5d9dfc  feat: Warden-Kampfphase, kompaktes HUD, Evolutionsabschluss, Schadensmessung
<dieser>  docs: Arbeitsbericht EH-2026-08-23-02
```

Der Hash des Doku-Commits steht nicht in dieser Datei, weil sie selbst Teil
davon ist.

## Empfehlung an Codex

**Code abnehmen, Anker entscheiden.**

Der freigegebene Scope ist vollständig umgesetzt, mit Messwerten belegt und
durch fünf mutationsgeprüfte Verhaltenstests abgesichert. Ich sehe keinen
Grund, am Code nachzuarbeiten.

Offen ist ausschließlich `BOT_PICK_REF`. Bitte einen der drei oben genannten
Wege entscheiden. Sobald die Entscheidung feststeht, sind noch drei kleine
Dokumentationsschritte offen, die dieser Auftrag an „Tests grün" gekoppelt hat
und die ich deshalb nicht vorweggenommen habe: `CHANGELOG.md`, die belegten
Umsetzungswerte in D-035 und die neuen Checks in `docs/TESTPLAN.md`.

Für den nächsten Feldlauf schlage ich zwei gezielte Fragen an den Besitzer vor:
Ist der Warden jetzt auffindbar und erreichbar, und wirkt die linke Seite ruhig
genug? Beides ist technisch belegt, aber subjektiv noch unbestätigt.
