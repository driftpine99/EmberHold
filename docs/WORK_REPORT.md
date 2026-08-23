# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-23-01
- **Status:** FERTIG
- **Ausgangscommit:** `091edd002e142dcc501d981807c4f83713badbec`
- **Ausgangs-Git-Status:** sauber (`## main...origin/main`, keine fremden
  Änderungen)
- **Lokale Commits:**
  - `42d7e29` — Code und Tests
  - Doku-Commit (dieser Commit) — erlaubte Dokumentation
- **Kein Push.**

## Ergebnis

Der Frühverlust-Exploit ist geschlossen, der Gluttropfen-Vertrag ist
vervollständigt, und die technischen Ist-Werte in `docs/TESTPLAN.md` stammen
jetzt aus genau dem finalen `npm test`.

**Der Befund.** Der Erzboden von 4 galt unabhängig von der Laufdauer. Gemessen
über alle neun Seeds stirbt der absichtlich untätige Lauf nach 37,98 bis 45,60
Sekunden und kassierte dafür jedes Mal die vollen 4 Erz — **5,26 bis 6,32 Erz
je Minute**, während die typische 8-Minuten-Sortie 1,75 liefert. Der
schlechteste mögliche Lauf war damit 3,6-mal ertragreicher als das Herzstück
des Spiels. Zusätzlich bestätigt: Der **garantierte Ausrüstungsfund** wurde
auch bei diesen Abbrüchen ausgeschüttet — Fund vorhanden in 9 von 9 Fällen.

**Die Korrektur.** Sie führt keine neue Währung, keinen Regler und keine Strafe
ein, sondern benutzt eine Grenze, die das Spiel schon kennt: die kürzeste
angebotene Sortie von drei Minuten. Ein Lauf, der sie nicht erreicht, ist ein
Abbruch.

```
Abbruch (unter 3:00):  Erz = clamp(1, Kurve, floor(Minuten × 1,75))
                       kein garantierter Ausrüstungsfund
ab 3:00:               Erz = Kurve, Fund wie bisher
```

Ergebnis: 1 Erz je Abbruch, schlechteste Rate **1,58 Erz je Minute**, kein
Fund. Läufe ab drei Minuten sind rechnerisch unberührt.

## Geänderte Dateien

| Datei | Commit | Art |
|---|---|---|
| `prototype/web/index.html` | `42d7e29` | Laufzeit: `rewardOre()`, `runSeconds()`, `depositRunReward()`, Startknopf, Testexport |
| `tools/run-balance-suite.mjs` | `42d7e29` | neuer Check `earlyLossGuard`, erweiterter `healOrbFlow`, gehärteter `oreCurve`, Dauerangabe in drei bestehenden Checks |
| `CHANGELOG.md` | Doku-Commit | Eintrag unter `Unreleased → Changed` |
| `docs/TESTPLAN.md` | Doku-Commit | Ist-Werte aus dem finalen Lauf, Fokus-Schutz 5:30, Evolutionsschwelle 2/9, Beschreibung der neuen Checks |
| `docs/DECISIONS.md` | Doku-Commit | Nachtrag zu D-034 |

`AGENTS.md`, `CLAUDE.md`, `docs/WORKFLOW.md`, `docs/CURRENT_TASK.md` und
`ROADMAP.md` wurden **nicht** verändert. In `ROADMAP.md` ist durch diesen
Auftrag kein technischer Wert falsch geworden.

## Abnahmekriterien und Belege

### Scope 1 — Früh verlorene Runs

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| Regel 1: Basis-Beute wird bei Tod nicht gelöscht | erfüllt | `earlyLossGuard.basisBleibt = true`; `S.reward === S.baseReward` und `baseReward > 0` in 9/9 Läufen (213 bis 253 Beute) |
| Regel 1: echter Versuch zahlt nie null Erz | erfüllt | `regelEinsHaelt = true`; jeder Abbruch zahlt 1 Erz |
| Headless-Lauf `stationary/immortal:false/noPicks` über echten Auszahlungspfad geprüft | erfüllt | `echterRunPfad = true`: `phase === "over"`, `result === "Gefallen"` in 9/9. Weg: `damagePlayer()` → `endRun(false)` → `depositRunReward()` |
| Ertrag ≤ 1,75 Erz je Minute | erfüllt | `rateHaelt = true`; schlechteste Rate **1,58**, Anker 1,75 |
| Sehr früh verlorener Run ohne garantierten Ausrüstungsfund | erfüllt | `keinFruehfund = true`; `lootGear === null`, 0 neue Teile, 0 neuer Staub in 9/9 |
| 3-Minuten- und 8-Minuten-Auszahlung bleibt erhalten | erfüllt | `normalUnveraendert = true` über 6 Fälle inkl. Grenzfall Tod exakt bei 3:00 → 5 Erz + Fund |
| Vier Beuteanker unverändert | erfüllt | `oreCurve`: 1412→5, 17290→14, 28425→17, 137872→32, mit **und** ohne Dauerangabe (`ankerOhneDauer = true`) |
| Späte Tode behalten Basis-Beute, nur Overtime-Bonus verfällt | erfüllt | `endRun()` unverändert; Testfall „später Tod, magere Beute" (480 s, 1412) zahlt vollen Kurvenwert 5 |
| Vertragsmultiplikator genau einmal | erfüllt | `einmalGezahlt = true` (zweiter Aufruf gibt 0); `contractFlow` weiterhin grün |
| Bestehende Spielstände kompatibel | erfüllt | Kein gespeichertes Feld berührt; Save-Version unverändert bei 4. `holdFlow`, `holdExpansion`, `contractFlow`, `equipmentFlow` prüfen v1→v4-Migration und bleiben grün |
| Test prüft nicht nur eine isolierte Hilfsfunktion | erfüllt | `earlyLossGuard` fährt den echten Simulationslauf bis zum Tod und zahlt über `depositRunReward()` aus |

**Gegenprobe.** Derselbe Check gegen den Stand vor der Korrektur (HEAD
`091edd0`, unveränderte Kopie im Scratchpad): `rateHaelt = false`,
`keinFruehfund = false`, schlechteste Rate **6,32 Erz/Min**, Fund in 9/9 Fällen
vorhanden. Der Check kann also wirklich rot werden.

### Scope 2 — Gluttropfen-Dropweg

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| Kill nach abgelaufener Abklingzeit erzeugt genau einen Tropfen | erfüllt | `ersterKillTropft = true`; Tropfenzahl +1 und `lastHealOrb` auf aktueller `S.t` |
| Kills innerhalb der Abklingzeit erzeugen keinen zweiten | erfüllt | `fensterHaeltDicht = true` bei `killsImFenster = 50` |
| Nach erneutem Ablauf wieder genau ein Tropfen | erfüllt | `zweiterZyklus = true`; Tropfenzahl +1 |
| Heilwert weiterhin geprüft | erfüllt | `heiltRichtig = true`; geheilt 14,4 = erwartet 14,4 |
| Fehlende XP-Gutschrift weiterhin geprüft | erfüllt | `heiltRichtig` prüft `xpTotal` unverändert; `splitterRichtig = true` |
| Kleinerer Sog weiterhin geprüft | erfüllt | `sogRichtig = true` |
| Heilmenge, Sog und Dropfrequenz **nicht** verändert | eingehalten | Kein `CFG.HEAL_ORB_*`-Wert und keine Zeile in `killEnemy()`/`updateGems()` geändert — der Verhaltenstest zeigte keinen Laufzeitfehler |

**Härtung durch mich, nicht durch den Subagenten:** Schritt 2 zählt die
tatsächlich erfolgten Kills mit. Ohne diese Zahl wäre der Check auch dann grün
gewesen, wenn gar kein Gegner entstanden wäre — er hätte still nichts geprüft.

### Scope 3 — Dokumentation

| Kriterium | Ergebnis | Beleg |
|---|---|---|
| `CHANGELOG.md` unter `Unreleased` knapp aktualisiert | erfüllt | Drei Einträge unter `Changed` |
| Ist-Werte aus genau dem finalen `npm test` | erfüllt | Tabelle in `docs/TESTPLAN.md` mit Herkunftsvermerk auf Commit `42d7e29` |
| Fokus-Schutz überall 5:30 | erfüllt | `docs/TESTPLAN.md` Zeile 216 von 7:30 auf 5:30 korrigiert; Zeile 118 stand bereits richtig |
| Evolutionsschwelle mindestens 2/9 | erfüllt | Tabelle: Ist 3/9, Vertrag „mindestens 2 / 9" statt bisher „mindestens 1 / 9" |
| D-034 um Frühverlust-Absicherung ergänzt | erfüllt | Abschnitt „Nachtrag: Der Erzboden hatte dasselbe Vorzeichenproblem" |
| Keine neue, nicht beauftragte Entscheidung eröffnet | eingehalten | Kein neuer D-Eintrag angelegt |
| `ROADMAP.md` nur bei falschem technischem Wert | eingehalten | Geprüft, keiner gefunden, Datei unverändert |

**Korrigierte Doku-Werte** (alle waren schon vor diesem Auftrag veraltet — die
Simulation ist durch meine Änderung nachweislich unverändert, siehe unten):

| Größe | Doku vorher | Ist jetzt |
|---|---:|---:|
| Erster Kartenzug, Mittelwert | 31,0 s | 31,6 s |
| Kartenzüge in 8 Min | 15,33 | 16,11 |
| Rhythmus pro Minute | 1,44 · 1,56 · 1,89 · 1,67 · 1,67 · 1,78 · 1,89 · 3,44 | 1,44 · 1,67 · 1,67 · 1,89 · 1,56 · 1,44 · 2,22 · 4,22 |
| Kartenzüge bei −10 % XP | 16,44 | 24,89 |
| Kartenzüge bei +10 % XP | 14,22 | 17,22 |
| Verhältnis | 1,156 | 1,445 |
| Runs mit Evolution | 1 / 9 | 3 / 9 |
| Spitze im Feld, Maximum | 314 | 322 |

## Prüfungen

| Befehl oder Prüfung | Ergebnis | Exitcode |
|---|---|---:|
| `npm test` (final, nach allen Änderungen) | `pass: true`, 38 von 38 Checks grün | 0 |
| `git diff --check` | keine Ausgabe | 0 |
| `git status --short --branch` | sauber, siehe unten | 0 |
| Gezielter Frühverlust-Test `earlyLossGuard` | grün, 7 Teilprüfungen | — |
| Gezielter Gluttropfen-Test `healOrbFlow` | grün, 7 Teilprüfungen | — |
| Gegenprobe `earlyLossGuard` gegen Commit `091edd0` | **rot**, wie beabsichtigt | 1 |
| Vergleich der Balance-Suite gegen `091edd0` | bitgenau identisch | 0 |

**Ausdrücklich verlangte Checks in der finalen Ausgabe — alle grün:**

```text
configStable        gruen      healOrbFlow        gruen
aspectIndependent   gruen      holdFlow           gruen
densityOvershoot    gruen      holdExpansion      gruen
evolutionReachable  gruen      equipmentFlow      gruen
                               contractFlow       gruen
oreCurve            gruen      earlyLossGuard     gruen (neu)
```

**Nachweis, dass die Simulation unverändert ist.** Ich habe HEAD `091edd0` in
einer separaten Kopie ausgeführt und die Kennzahlen verglichen:

| Größe | HEAD `091edd0` | Arbeitskopie |
|---|---:|---:|
| firstAvg | 31,640740740740227 | 31,640740740740227 |
| totalAvg | 16,11111111111111 | 16,11111111111111 |
| low/high/ratio | 24,889 / 17,222 / 1,4452 | 24,889 / 17,222 / 1,4452 |
| evolutionRuns | 3 | 3 |
| spitzeMax | 322 | 322 |

Die Kampfsimulation ist bitgenau identisch. Die Korrektur wirkt ausschließlich
im Auszahlungspfad.

**Weitere relevante Messwerte aus dem finalen Lauf:**

```text
ueberschuss: zieldichte 301, spitzeMittel 310, spitzeMax 322,
             prozentMittel 3,0, prozentMax 6,8, grenzeProzent 10
targets:     first 35, designTotal 21, botRef 15,3
earlyLoss:   ankerRate 1,75, schlechtesteRate 1,58
healOrb:     geheilt 14,4, erwartet 14,4, killsImFenster 50
```

## Manuelle Prüfungen

- **Durchgeführt:** keine. Der Auftrag verlangt keinen Browserlauf, und ich
  habe keinen ausgeführt.
- **Sichtbare Textänderung am Run-Ende, die Codex bewerten muss:** Nach einem
  Abbruch vor 3:00 zeigt die Kachel „Ausrüstungsfund" jetzt **„kein Fund"**.
  Das ist der bereits vorhandene Pfad in `gearLootText()`, es wurde keine neue
  Beschriftung eingeführt. Ein kurzer manueller Smoke wäre sinnvoll: 3-Minuten-
  Scharmützel absichtlich vor 3:00 sterben lassen und prüfen, ob „kein Fund"
  und „+1 Eisenerz" verständlich nebeneinander stehen.
- **Nicht möglich in dieser Umgebung:** echte Renderleistung und Spielgefühl.

## Risiken, Nebenwirkungen und Abweichungen

1. **Ein ehrlicher Tod zwischen 0:35 und 3:00 kostet jetzt auch Erz.** Wer bei
   2:00 mit 1.412 Beute stirbt, bekommt 3 statt 5 Erz; bei 2:59 weiterhin die
   vollen 5. Das ist die Kehrseite einer einzigen Grenze statt zweier
   Sonderregeln. **Produktentscheidung für Codex**, falls das nicht gewollt
   ist.
2. **Ein ehrlicher Tod vor 3:00 verliert den Ausrüstungsfund**, auch bei 2:59.
   Ich habe bewusst **eine** Grenze gewählt (die kürzeste angebotene Sortie)
   statt einer zweiten, niedrigeren Schwelle nur für Ausrüstung. Eine
   niedrigere Gear-Schwelle, etwa 60 Sekunden, wäre milder, würde den Farmweg
   aber wieder öffnen, sobald man 65 Sekunden überlebt. **Codex entscheidet**,
   ob 3:00 bleibt.
3. **Unter rund 35 Sekunden bleibt die Rate rechnerisch über dem Anker**, weil
   Regel 1 den Boden bei 1 Erz hält. „Nie null" und „höchstens 0,7 Erz" sind
   nicht gleichzeitig erfüllbar. Praktisch kein Farmweg: 1 Erz ohne Fund gegen
   14 Erz plus Fund je sauberer Sortie. Der geprüfte Lauf liegt bei 38 bis 46
   Sekunden und damit im abgedeckten Bereich.
4. **Drei bestehende Checks mussten in der Testeinrichtung angepasst werden.**
   `holdFlow`, `contractFlow` und `equipmentFlow` bauten eine synthetische
   Sortie mit `S.t = 0` auf und liefen dadurch in die neue Abbruchgrenze,
   obwohl an ihrer eigenen Zuständigkeit nichts falsch ist. Sie setzen jetzt
   `S.t = S.runLen` — die Sortie wurde zu Ende gespielt. **Das ist keine
   gelockerte Schwelle**, sondern eine wahrheitsgemäße Einrichtung; die
   geprüften Zusicherungen sind unverändert.
5. **Beobachteter Nebeneffekt, nicht beauftragt, nicht geändert:** Bei Seed
   1789 verbucht `endRun()` 213 Basis-Beute, die Endsumme aus Kills und
   Splittern ergibt 218. Ursache: Nach `damagePlayer()` → `endRun(false)`
   läuft der restliche Frame weiter und sammelt noch Splitter ein, die die
   Belohnung nicht mehr sieht. Der Spieler verliert dadurch wenige
   Beutepunkte. Ich habe das **nicht** angefasst und meine Zusicherung
   entsprechend auf den tatsächlichen Vertrag beschränkt (`baseReward` wird
   nicht verkleinert und übersteigt nie die erspielte Beute), statt eine
   Gleichheit zu erzwingen, die dieses fremde Verhalten mitprüfen würde.
6. **Stale Kommentar außerhalb meines Scopes, nicht geändert:**
   `prototype/web/index.html:1779` sagt „greift erst ab 7:30", die Konstante
   `EVO_FOCUS_AT = 330` bedeutet 5:30. Das gehört zu
   D-031. Ich habe es Codex überlassen, statt in fremde Entscheidung
   hineinzuschreiben.
7. **Commits liegen auf `main`**, wie vom Auftrag vorgegeben und wie in der
   bisherigen Projekthistorie üblich. Kein Push.

**Keine Abweichung vom freigegebenen Scope.** Kein Roadmap-Punkt bearbeitet,
keine Content-, Grafik-, Audio-, Hold- oder Monetarisierungsbaustelle eröffnet,
keine Testschwelle gelockert.

## Einsatz eines günstigen Subagenten

Die abgegrenzte Erweiterung des `healOrbFlow`-Blocks habe ich an einen
Haiku-Subagenten delegiert, mit vollständiger Spezifikation der drei
Teilprüfungen. Ich habe anschließend den kompletten Diff geprüft, die Logik
gegen die Laufzeit nachgerechnet und **eine Schwäche selbst korrigiert**: Der
gelieferte Schritt 2 wäre auch grün gewesen, wenn `spawnEnemy()` keinen Gegner
geliefert hätte. Architektur, Laufzeitkorrektur, `earlyLossGuard` und die
gesamte Abschlussprüfung stammen von mir.

## Abschließender Git-Status

```text
## main...origin/main [ahead 2]
```

Arbeitsbaum sauber, keine unversionierten Dateien, zwei lokale Commits vor
`origin/main`, nicht gepusht.

```text
42d7e29  fix: früh verlorene Runs sind kein Farmweg mehr, EH-2026-08-23-01
<dieser>  docs: Frühverlust-Absicherung dokumentieren und Ist-Werte auffrischen
```

Der Hash des Doku-Commits steht nicht in dieser Datei, weil sie selbst Teil
davon ist.

## Empfehlung an Codex

**Abnehmen** — mit zwei bewusst offengelassenen Produktfragen.

Der Auftrag ist vollständig umgesetzt, alle 38 Checks sind grün, der neue
Wächter wird gegen den alten Stand nachweislich rot, und die Kampfsimulation
ist bitgenau unverändert.

Zwei Punkte gehören dir, nicht mir:

1. Soll die Ausrüstungsgrenze bei 3:00 bleiben? Ein ehrlicher Tod bei 2:59
   verliert dadurch den Fund (Risiko 2).
2. Ist die Erzdeckelung für ehrliche Tode zwischen 0:35 und 3:00 gewollt
   (Risiko 1)?

Wenn beides so bleibt, empfehle ich vor dem Push einen 30-Sekunden-Smoke im
Browser auf die Kachel „kein Fund", weil das die einzige sichtbare
Textänderung ist. Danach steht dem Feldlauf nichts im Weg — die Zahl der
wartenden unbestätigten Änderungen steigt damit allerdings von sechs auf
sieben.
