# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-25-03 — Kampflesbarkeit V3 und verpflichtendes
  NEXUS-Finale (D-041)
- **Status:** FERTIG, bereit für Codex-Review
- **Ausgangscommit:** `dffc2e5bf7662fd89ffecf79e11e844bac4697ab`
  („docs: NEXUS-Finale und Grafiknacharbeit planen“)
- **Anfangsstatus:** `## main...origin/main`, Arbeitsbaum sauber, keine fremden
  Änderungen; Baseline `npm test` **49/49 grün**, Exitcode 0
- **Endstand:** `npm test` **53/53 grün**, Exitcode 0; `git diff --check`
  sauber (Exitcode 0)
- **Lokale Commits:** zwei — `ebb88c7` (feat(d041): Spielcode + Suite),
  `docs(d041)` (Bericht + Changelog, direkt danach). **Nicht gepusht.**

## Ergebnis in einem Satz

Der Run hat jetzt drei erkennbare Akte — Aufbau, AEGIS-Arena mit Ziel 50 und
das verpflichtende NEXUS-Finale bei 8:00 mit Ziel 30 und Extraktionssperre —,
der Grafikrückschritt ist korrigiert, genau ein EVO-Hinweis ist zurück, und die
Suite steht bei 53/53 grünen Checks inklusive vier neuen Verträgen.

## Status je Gate

| Gate | Status | Umsetzung | Beleg/Test |
|---|---|---|---|
| A – Hintergrund | erfüllt | Kachel aus `9190de9` wörtlich übernommen (`#39435c`, 80er-Paneele, Schattierung 62–76, 22 Leitungen); nahtlose D-040-Technik (Boden über ganze Leinwand, Tönung vor Clipping, `drawDeckEdges`) unverändert | Diff `buildArenaSprites()`; `combatUiV2` grün (`deckBisZumRand`: 77 Kacheln auf 21:9 gegen 32 auf 16:9, Safe-Area 320 px) |
| B – Silhouetten | erfüllt | Neue eingefrorene Tabelle `FOE_PROFILE` (k/Breite/Höhe/Teile) ist die einzige Quelle für `drawFoeBody()`; Kachelgrößen `[40,56,66,60,86]`; Rammjäger lang-keilförmig, Emitter breit mit getrennten Auslegern, Replikator echte Zwillingssilhouette mit Naht, Bollwerk groß/breit/gepanzert | Neuer Check `foeSilhouettes` (paarweise verschieden, Rollen-Eigenschaften, Tabelle von der Zeichnung konsumiert, Spritegrößen paarweise); Renderpfad unverändert ein `drawImage` je Gegner |
| C – EVO-Hinweis | erfüllt | Ein Element `#evohint` über der Waffenleiste (bottom 72 px vs. 16 px, z-index 5 unter Dialogebene 20); `updateEvoHint()` liest ausschließlich `leadingEvoPath()`, signaturbasiert ohne DOM-Schrieb pro Frame | Neuer Check `evolutionFocusHud` (genau ein Element, zeigt nur führenden Pfad, Fortschritt Waffe+Passiv, sofortiger Wechsel nach Abschluss, verschwindet ohne Pfad) |
| D – AEGIS-Arena | erfüllt | `BOSS_ADD_TARGET` 90→50; neues Feld `E.ret`; Überschuss wird deterministisch (aufsteigende Slotreihenfolge) markiert, zieht mit ~230 u/s sichtbar ab und wird still freigegeben; `hurt()`/Zielwahl/Kontakt überspringen Rückzugende; `CFG.SURGE_AT` samt Event entfernt | Erweiterter `bossCombatPocket` (Ziele 50/30): Rückzug sichtbar, nach ≤ 9,5 s abgeschlossen, Kills 0→0, Splitter/Tropfen/XP unverändert, 5 Eliten bleiben, Wiederaufbau 50→135 |
| E – NEXUS-Finale | erfüllt | Warnung (Toast) ab 7:45 + kontrollierte Dichtereduktion bis −40 %; Spawn bei 8:00 im sichtbaren Ausschnitt; Arena-Ziel 30; Extraktionssperre via `finaleBlocker()`/`pendingExtract`; Overtime-Multiplikator bleibt aus; eigene Silhouette `SPR.nexusA` (Trägerkreuz, drei Fangarme, cyanweißer Kern), 6 Phasen; Muster st3 Zielbomben (neu, 3 Zonen, ≥1,25 s Vorwarnung) und st4/st5 Ringsalven mit dreifach rotierender sicherer Lücke (1,15 s Vorzeichnung); dynamische Bossleiste, `FINALE +m:ss`-Uhr, Berichtszeilen | Neuer Check `finalBossFlow` (14 Teilprüfungen inkl. „Gefallen“ bei Spielertod im Finale, 3-Minuten-Modus unverändert) + neuer `nexusBenchmark` |

## Pflichtprüfungen

```text
npm test   → exit 0, "pass": true, 53/53 Checks (vorher 49/49)
git diff --check → exit 0 (nach Entfernen eines Trailing-Whitespace)
```

Neue Checks (alle verhaltensbasiert am echten Headless-Pfad bzw. DOM-Shim):
`finalBossFlow`, erweiterter `bossCombatPocket` V2, `nexusBenchmark`,
`evolutionFocusHud`, `foeSilhouetten` als `foeSilhouettes`. Der bestehende
`renderCostContract` bleibt grün: 281 sichtbare Gegner, 323 drawImage im
ersten Frame, 2 Gradienten/Frame, 0 shadowBlur, 0 neue Canvases — nichts
skaliert mit der Gegnerzahl. Save-, Hold-, Contract-, Report-, Aspect-,
Telemetrie- und UX-Checks laufen unverändert grün.

## Botanker: Vorher-/Nachher-Messung (Anker neu referenziert)

Der entfernte 7:00-Schub nahm dem Bot späte Erfahrung weg; der Botanker ist
deshalb nach Messung von 21,7 auf **17,56** neu referenziert (Toleranz
unverändert ±3, Verfahren wie D-035). Beide Messreihen: Original `dffc2e5`
gegen Endstand, identische Bot-Strategie, neun feste Seeds.

| Seed | Züge vorher | Züge nachher | Kills vorher | Kills nachher | EVO vorher→nachher | Stufe vorher→nachher |
|---|---:|---:|---:|---:|---|---|
| 1701 | 14 | 11 | 3018 | 2746 | 1→0 | 15→12 |
| 1709 | 25 | 24 | 7368 | 8070 | 2→3 | 26→25 |
| 1721 | 17 | 15 | 5991 | 4221 | 1→1 | 18→16 |
| 1733 | 9 | 9 | 2218 | 1637 | 0→0 | 10→10 |
| 1741 | 27 | 17 | 12169 | 5088 | 3→1 | 28→18 |
| 1753 | 26 | 25 | 10579 | 10754 | 3→3 | 27→26 |
| 1777 | 18 | 21 | 4798 | 6638 | 1→1 | 19→22 |
| 1789 | 22 | 22 | 6451 | 6781 | 2→2 | 23→23 |
| 2474367456 | 13 | 14 | 3526 | 4355 | 0→1 | 14→15 |
| **Mittel** | **19,00** | **17,56** | — | — | **7/9 → 6/9 Läufe** | — |

Erster Kartenzug 31,6 s (unverändert im Korridor), Sensitivitätsverhältnis und
Dichteüberschuss weiter grün. `evolutionReachable` (≥2/9) bleibt mit 6/9
erfüllt; keine Schwelle wurde gelockert.

## Dichte vor/während/nach den Bossphasen

Zielkurve (`targetEnemies`, formatunabhängig) und Arena-Deckel:

| Zeitpunkt | Zielkurve | Effektiv im Feld (Botlauf Seed 1701) |
|---|---:|---:|
| 0:30 Aufbau | 42 | 44 |
| 3:00 | 84 | 77 |
| 4:09 vor AEGIS | 122 | 121 |
| **während AEGIS** | Kurve egal | **Deckel 50** |
| 5:00 nach AEGIS-Tod | 162 | Wiederaufbau 50→135 (Szenario E) |
| 7:10 | 273 | normale Kurve |
| 7:44 vor Warnung | 291 | normale Kurve |
| **in Finale-Warnung 7:52** | 296 | **Reduktion auf ≈241 (−20 % steigend bis −40 %)** |
| **während NEXUS** | Kurve egal | **Deckel 30** |

Rückzug-Beleg (Szenario C, 220 Normale + 5 Eliten künstlich überfüllt):
rueckzugSichtbar nach 1 s > 0; nach ≤ 9,5 s `retreating=0` und Bestand 220→50;
Kills 0→0; Splitter/Tropfen 0→0; XP 0→0; Eliten 5→5. Zurückgezogene Gegner
sind zusätzlich in `hurt()`, beiden Zielwahlen und dem Kontaktschaden
ausgeschlossen — sie können prinzipiell keine Belohnung erzeugen.

## NEXUS-Benchmark (deterministisch, Seed 20260825)

Gemessen am echten Kampf (echte Waffen-/Treffer-/KI-Pfade), Build eingefroren,
Spieler unsterblich:

| Build | Ergebnis |
|---|---|
| Repräsentativ (Photonenschneise-EVO + Sternenhagel 4 + Plasmakern 2) | **47,3 s** besiegt — Korridor 30–75 s ✓ |
| Wiederholung desselben Laufs | 47,3 s — bitidentisch ✓ |
| Schwach (Orbitklinge 2, sonst nichts) | nach 300 s **nicht besiegt** ✓ |

Kalibrierung ausschließlich über den neuen Boss-Multiplikator
(`NEXUS_HP_MULT = 120 → 660`, dokumentiert im Code); Waffen-/Passivwerte,
XP-Kurve, Kartenlogik und Heilung wurden nicht berührt. NEXUS-HP im
Vertragslauf: 74.199.

## Dynamische Präsentation

- Bossleiste: `BOSS: AEGIS` während des Mittelbosses, `BOSS: NEXUS` im Finale
  (behavioral geprüft über `updateHUD()` im Shim).
- Uhr zeigt im Finale `FINALE +m:ss` (cyan), getrennt von der orangen
  Overtime-Kennung; `S.otActive` bleibt während des gesamten Finales false.
- Run-Bericht ergänzt `Finalboss:` mit Status, Spawnzeit, Tötungszeit und
  Finaldauer; im 3-Minuten-Modus `keiner · kurze Sortie`.

## Subagenten

Keine eingesetzt. Begründung: Alle Änderungen liegen in einer monolithischen
Datei mit eng verzahnten Zustandsmaschinen (Spawn, Rückzug, Boss-KI, HUD);
eine sichere Paralleledition mehrerer Agenten wäre gegen die Vorgabe
„niemals dieselben Bereiche gleichzeitig“ auf fast jeden Diff gefallen. Alle
Diffs stammen daher aus einer Hand und sind vollständig selbst geprüft; jede
Integration wurde unmittelbar per `npm test` verifiziert (insgesamt 10 Suite-
Läufe während der Entwicklung).

## Manuelle Prüfung / Browser

**Nicht möglich — ehrlich dokumentiert:** In dieser Umgebung steht kein
sichtbarer Browser zur Verfügung (bekannter Zustand seit 22.08.2026: die Seite
komponiert keine Frames, `requestAnimationFrame` feuert nicht). Deshalb wurden
NICHT manuell geprüft und werden auch nicht behauptet:

- visuelle Bodewirkung gegenüber `9190de9` und Screenshots,
- Lesbarkeit aller fünf Silhouetten im echten Pulk bei hoher Dichte,
- Anmutung der NEXUS-Silhouette, Lesbarkeit beider Mustertelegraphen,
- Überlappungsfreiheit des EVO-Hinweises im echten Layout bei 1280×720 und
  844×390 (nur geometrische CSS-Verträge sind automatisiert geprüft),
- FPS, 1-%-Low und Anteil unter 55 FPS.

Stattdessen absichert: `renderCostContract` (Renderkosten unverändert),
`combatUiV2` (Deck bis zum Rand, Phasenzahlen 6/8/8/6), `foeSilhouettes`,
`evolutionFocusHud` (Lage bottom 72 > 16, z-index 5 < 20) sowie alle
Simulationsverträge. Die visuelle Abnahme ist — wie im Auftrag vorgesehen —
Sache des Besitzerlaufs durch Codex/Besitzer.

## Risiken, Nebenwirkungen, offene Punkte

1. **Botanker-Neureferenz:** fachlich begründet und vollständig tabelliert;
   wer den alten Wert 21,7 wiederherstellt, macht die Suite bewusst rot.
2. **Wegfall Bergungsflut:** Der Run endet jetzt im Finale statt in einer
   Beuteflut; das späte Gefüge (XP-Rhythmus, Evolutionen je Lauf 6/9 statt
   7/9) hat sich messbar, aber im Korridor verschoben. Der folgende
   Waffenrollenpass sollte die Telemetrie am neuen Finale neu messen.
3. **NEXUS-Zähigkeit ist bewusst hoch (×660).** Der Korridor wird mit einem
   Photonenschneise-lastigen Referenzbuild erreicht; Builds ohne Fernschaden
   könnten länger brauchen. Der Benchmark macht das reproduzierbar prüfbar;
   Feinkalibrierung wäre eine eigene, kleine Entscheidung.
4. **Elite im Finale-Szenario:** Der Test nutzt für den Todespfad bewusst eine
   Elite, weil Normale in der Arena laufend in den belohnungsfreien Rückzug
   gezwungen werden — dort tragen sie keinen Kontaktschaden mehr (gewollt).
5. Kleinere Konsolenduplikate: `damagePlayer`/`newRun`/`endRun`/
   `updateHUD`/`updateEvoHint` sind zusätzlich über `window.__EH` exportiert —
   ausschließlich für die Verträge.

## Dateien und Commits

| Datei | Änderung |
|---|---|
| `prototype/web/index.html` | Gates A–E: Boden, FOE_PROFILE-Sprites, evohint (CSS/HTML/JS), Arena/Rückzug, Surge-Entfernung, NEXUS (Konstanten, KI, Sprites, Telegraphen, HUD, Bericht, Exporte) |
| `tools/run-balance-suite.mjs` | bossCombatPocket V2, finalBossFlow, nexusBenchmark, evolutionFocusHud, foeSilhouettes, Shim-Härtung (children/style-Stummel), Verdrahtung |
| `CHANGELOG.md` | Unreleased-Eintrag D-041 |
| `docs/WORK_REPORT.md` | dieser Bericht |

Geschützte Dateien (ROADMAP, README, DECISIONS, TESTPLAN, CURRENT_TASK,
AGENTS, CLAUDE, WORKFLOW, Konzeptbilder) wurden nicht verändert.

## Abschließender Git-Status

```text
## main...origin/main [ahead 2]
```

Arbeitsbaum sauber; lokale Commits `ebb88c7` (Implementierung + Suite) und
`f569037` (dieser Bericht + Changelog). **Nicht gepusht** — der Push liegt
bei Codex.

## Empfehlung an Codex

**Abnehmen** — mit zwei Vorbehalten für die nächste Station:
1. Sichtbare Abnahme im Browser (Boden, Silhouetten, EVO-Hinweis-Lage,
   NEXUS-Muster, FPS-Fenster 6:00–8:00+) kann hier nicht erfolgen und gehört
   in den Besitzerlauf.
2. Der neue Botanker 17,56 ist Messwert, kein Designziel; bitte beim Push
   zusammen mit dem Vorher-/Nachher-Tabelle in TESTPLAN/DECISIONS konservieren.
