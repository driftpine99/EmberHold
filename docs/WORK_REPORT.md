# Claude/OpenCode-Arbeitsbericht

> Diese Datei wird für jeden Auftrag vollständig ersetzt. Der aktuelle
> Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in der
> Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-25-04 — Lichthüter-Grafik, Bergungssignal und
  Stationsring V1 (D-042)
- **Status:** TECHNISCH ABGENOMMEN; sichtbare Besitzerabnahme offen
- **Verbindlicher Ausgangscommit laut Auftrag:** `d78fdbe`
- **Tatsächlicher Startcommit:** `0a97b59` (= `d78fdbe` plus rein
  dokumentarischer Commit „docs: D-042 Stations-Vertikalschnitt planen“);
  Laufzeitcode gegenüber `d78fdbe` unverändert, alle Fingerprints daher
  gegen `d78fdbe` gültig
- **Anfangsstatus:** `## main...origin/main`, Arbeitsbaum sauber; Baseline
  `npm test` **53/53 grün**, Exitcode 0
- **Endstand:** `npm test` **58/58 grün**, Exitcode 0; `git diff --check`
  Exitcode 0
- **Lokale Commits:** vier — `a261165` (Gates A+B), `a2b37f7` (Gate C +
  Save-v5-Basis), `0c289b8` (Gates D+E + fünf neue Verträge), `docs(d042)`
  (Bericht/Changelog/Provenance, direkt danach). **Nicht gepusht.**

## Ergebnis in einem Satz

Der Kampf zeigt die weiß-goldene Lichthüter-Silhouette vor einer
mehrschichtigen Orbital-Szene statt einer Kistenwand, die Station ist ein
bedienbarer Ring mit Kern und sechs Hotspots, das Sektorziel SIGNAL SICHERN
verbindet Run und Stationsausbau über Stationsdaten und drei Protokolle — und
die serialisierte Baseline bleibt bitidentisch zum Ausgangscommit (18/18
Fingerprints), bei **58/58** grünen Checks.

## Status je Gate

| Gate | Status | Umsetzung | Beleg/Test |
|---|---|---|---|
| A – Lichthüter + Hintergrund | erfüllt | `drawOrbiterPose` adaptiert die Referenzgrammatik (`zeichneLichthueterNeu`, Zeilen 1442–1482): Helm-Hexagon mit Goldraute, cyan-V-Visier, Halo r≈11.8 mit vier Ticks, Schulterplatten bis ±15, Fünfeckspanzer, geteilter Mantel; Pulse eingefroren, kein Date.now. Hintergrund: Navy-Basiskachel 512 px mit weichen Schattierungen, Nebelschleiern, Feinfugen, Leitungen, Mikrosternen; Parallax-Sternebene (Faktor 0.12); Landmark-Zellen à 2000 WE mit Ring/Galaxie/Asteroiden; seltener Ringplanet; `drawDeckEdges` als No-op erhalten | Neuer Vertrag `combatArtV3` (Phasen 6/8/8 @ 12 FPS, Merkmale, Hot-Loop ohne Zeit/Zufall); `renderCostContract`: 281 sichtbar, 324 drawImage erster Frame, 2 Gradienten/Frame (nur die zwei Lichtkreise), 0 shadowBlur, 0 Canvas/Frame |
| B – zwei Korrekturen | erfüllt | Rammjäger-Ladephase nutzt dieselbe `SPR.foe[1]`-Silhouette (Bedingung `SPR.foe&&E.kind[i]===0`); Tier-/Fallback nur noch ohne Atlas. `#evohint` links (`left:14px;top:64px`, kein translateX) | `combatArtV3.rammjaegerNeu/evoLinks`; `evolutionFocusHud` auf Links-Lage umgestellt und grün; `singlePassRendering` unverändert grün (Fallback-Pfad erhalten) |
| C – Stationsring | erfüllt | `.holdscene`: Sterne, Planet, zwei gebrochene Ringsegmente, Leitungen; zentraler Kern-Knopf mit Orb, drei Stufenlichtern, Ausbau-Aktion; sechs Hotspots mit Zustandslampen (offline/produziert/bereit). Genau ein Detailpanel via `data-panel`; ein zweiter Tap lässt es offen. Alle bisherigen IDs/Aktionen liegen in ihren Hotspots; die doppelte permanente Sternenkarten-/Startwand ist entfernt | Neuer Vertrag `stationDomContract` (eindeutige IDs, Panel-Mapping, Aktionen, genau ein offenes Panel, keine Doppelwand, Lampen, Kernstufe); `holdFlow/holdExpansion/equipmentFlow/presentationLayer` weiter grün |
| D – Sektorziel | erfüllt | Nur 8 Minuten: Spawn t=150 an Hash-Position 220–300 WE (eigener visualHash aus Seed+Konstanten — null Gameplay-RNG), Fenster bis 240 (< AEGIS), kumulativ 8 s in r=110 (Scanner 5 s), Verlassen pausiert ohne Reset. Erfolg = Stationsdatei 1, echter NEXUS-Kill = Datei 2; beide getrennt vom unveränderten Bergungswert und exakt einmal in `depositRunReward()` hinter dem bestehenden `rewardGranted`-Guard | Neuer Vertrag `sectorObjectiveFlow`: 17 Teilprüfungen inkl. Determinismus zweier Läufe, Kumulativ/Pause, Terminalität von „verpasst“, Doppelgutschrift-Schutz, Tod-im-Finale-Pfad |
| E – Kern & Protokolle | erfüllt | Save v4→v5 verlustfrei; stationData 0–999, coreStage 0–3, sortieProtocol-Whitelist mit Klemmung/Bereinigung. Kernkosten [1♦+5 Erz / 2♦+1 Platte / 3♦+2 Platten], sequenziell. Klingenfokus injiziert bis zur ersten tatsächlichen Kartenwahl deterministisch eine legale Orbitklingen-Karte und überlebt Rerolls (kein Extra-RNG, kein 4. Platz, kein EVO-Bypass; bogen 0 oder 5 → unverändert), Fluxreserve = exakt +1 Start-Reroll (mit 2 vorbereiteten stapelbar → max 4), Scanner = 5 s Laden + Fund bevorzugt unbesessene Teile, sonst Duplikat-/Staubpfad. Ohne Wahl: Baseline bitidentisch | Neue Verträge `stationCoreFlow` (Sanitizing, Kosten, Sperren, drei Wirkungen inkl. Grenzfälle) und `baselineIsolated` (18/18 Fingerprints bitidentisch zu `d78fdbe`) |

## Subagenten (drei eingesetzt; jeder Befund von mir geprüft)

1. **Referenz-Audit** (explore, schreibgeschützt): las zuerst AGENTS.md und
   CLAUDE.md des Referenzprojekts (Schutzregeln zitiert: nur `konzept/`,
   `archive/` unberührt) und lieferte Formensprache von
   `zeichneLichthueterNeu` sowie Ebenenspezifikation der Hintergrundfunktionen
   inklusive Determinismus-Befund (Date.now-Stellen markiert). Meine Prüfung:
   Koordinaten/Farben 1:1 in den Sprite-Builder übersetzt, numerisch per
   `combatArtV3` verifiziert.
2. **Testspezifikation** (explore): Schrittlisten, Export-Vorschläge,
   Alt→Neu-Liste legaler Bestandserwartungen (Save v5, earlyLoss-Basis,
   EVO links) und zwölf Edgecases. Meine Prüfung: umgesetzt; Abweichung —
   `stationInfo` nicht exportiert (Suite nutzt `H` direkt wie bisher),
   dafür `STATION` als Konstantexport.
3. **Unabhängige Diff-Prüfung** (explore): Save-Pfad, Hot-Loop,
   Signal-Doppelzählung, Protokoll-Grenzen, DOM-Doppel-IDs, Canvas-Kosten.
   Übernommene Fixes: Meta-Voll-Restore in `stationCoreFlow`,
   Shim-`classList.remove(...)`+`className`, CSS-Typo `data-panel="arcanum"`,
   zwischenzeitliche Button-Namen und `#signalhud`-Abstand. Der BLOCKER-Fund
   (HEAD rot wegen fehlender Exports) betraf den Zwischenstand und ist durch
   Commit `0c289b8` behoben. Akzeptierte OK-Hinweise: Reroll bezieht sich auf
   das erste ANGEBOT (Design gemäß Auftragstext), setLineDash-Mikroallokation
   des einzelnen Markers.

## Referenzadaption (konkret, ohne Codeimport)

Übernommen wurden ausschließlich Geometrie-/Farbangaben: Helm-Sechseck und
Goldraute, V-Visier-Bahn, Halo r=11.8 auf Kopfhöhe mit vier diagonalen Ticks,
Fünfeckspanzer mit Chevron-Innenfläche, Schultern `(±7,-7)(±15,-5)(±12,1)`,
Mantelkurven bis y≈18 in `rgba(92,190,255,.24)`. Hintergrund: Idee der Stern-
schichten (deterministischer Hash, gekachelte Offscreen-Ebenen, leichte
Parallaxe), Nebel als gebackene Radialverläufe, Ring-/Strebengrammatik von
`drawFadedGrid` in die Landmark-Sprites, Landmark-Hash aus festen Zellindizes.
Nicht übernommen: Biome-Zyklus, Vignette, Staubpartikel, Screenshake und
jegliche Zeitsteuerung (`Date.now()` der Referenz wurde bewusst nicht
adaptiert).

## Save v4→v5 (Beleg)

Rundlauf (presentationLayer): v4-Rohstand {ore 33, dust 14, runs 9, …} →
loadHold → Version **5**, alle alten Felder identisch, neu {stationData:0,
coreStage:0, sortieProtocol:'none'} → save/load → JSON bitgleich.
Sanitizing: `stationData:"12.7"`→12, `coreStage:9`→3, gesperrtes Protokoll→
'none' (stationCoreFlow.sanitiert/gesperrtBereinigt). Beispiel nach Ausbau:
99♦ / 500 Erz / 500 Platten → drei Käufe → coreStage 3, 93♦, −5 Erz,
−3 Platten; Stufe-2-Protokoll bei Kern 1 wird zu 'none' bereinigt.

## Signal-/NEXUS-Datenfluss

Spawn (updateEvents, Seed-Hash) → Ladefortschritt ausschließlich in step() bei
phase 'run' im Radius → securedData++ genau beim Erreichen von signalBedarf()
bzw. im NEXUS-Tod-Ast von killEnemy() → der normale baseReward bleibt
unverändert → depositRunReward() bucht META.stationData += securedData genau
einmal hinter rewardGranted. Suite:
Doppelaufruf unverändert, Tod nach NEXUS-Kill behält beide Dateien, Abbruch
vor Erfolg sichert nichts.

## Baseline und Protokollmessungen

- baselineIsolated: 9×480-s-Läufe + 9×250-s-Früherlauf, Fingerprints aus
  Kartenzügen, Kills, Familienmischung, Build, Elite-Wahlen und Schadens-
  verteilung — **alle 18 bitidentisch** zum Ausgangscommit (abweichend: []).
  Beweis damit: Signal-Hash, Kulisse und Stationsfelder verbrauchen keinen
  Gameplay-RNG und ändern die Simulation nicht.
- Protokolle getrennt gemessen (stationCoreFlow): Injektion legal
  (bogen lv1 an Platz 1, ≤3 Karten), Reroll bewahrt den Fokus und erst die
  Auswahl verbraucht ihn; bogen 5 + Sehne 3 → unverändertes EVO-Angebot;
  Fluxreserve rerolls 1→2, mit zwei
  vorbereiteten → 4; Scanner lädt nach exakt ~5 s (gemessen 5,02 s Rest im
  Kumulativtest), Fund bevorzugt neu („Deflektormantel“ im Probe-Lauf),
  Vollbesitz → duplicate:true.
- Botanker 19,78 ±3 bleibt unangetastet und grün (Baseline läuft ohne
  Protokoll).

## Renderkosten und Performance

- renderCostContract (300 Gegner, 281 sichtbar): drawImage erster Frame 324,
  Gradienten/Frame 2 (unverändert), shadowBlur/Frame 0, Canvas/Frame 0 —
  nichts skaliert mit der Gegnerzahl. Der neue Hintergrund fällt als
  zusätzliche drawImage-Kacheln an, keine teuren Operationen.
- combatUiV2-Verhaltensbeleg: 33 Boden-Zeichnungen bei 1280×720 gegen 35 bei
  2560×1080 (Safe-Area 320 px) — das Deck reicht bis an den Rand.
- Echte FPS: in dieser Umgebung NICHT messbar (kein sichtbarer Browser);
  Referenz des Besitzers 56/58/0,0 % bleibt Maßstab der manuellen Abnahme.

## Manuelle Prüfung / Browser

**Nicht möglich — ehrlich dokumentiert:** Es steht kein sichtbarer Browser
zur Verfügung (bekannter Zustand: die Seite komponiert keine Frames). Nicht
geprüft und nicht behauptet: visuelle Wirkung von Lichthüter-Posen
(Idle/Lauf/Wurf/Impuls), Richtungswechsel, Hintergrund-Tiefe, Lesbarkeit des
Gegnerpulks, Stationslayout bei 1280×720/844×390 inklusive Touch-Zielen,
Signal-Marker im Bewegtbild, FPS/1-%-Low. Automatisiert abgesichert:
Phasen-/Merkmalsverträge, Renderkostenvertrag, DOM-/UX-Vertrag (IDs, Panels,
Lampen, Kernstufen), Simulationsisolation. Die visuelle Abnahme gehört in den
Besitzerlauf.

## Risiken, Abweichungen, offene Punkte

1. **Klingenfokus-Randfall behoben:** Rerolls bewahren die Garantie bis zur
   ersten tatsächlichen Kartenwahl; `stationCoreFlow` sichert dieses Verhalten.
2. **Signal-Randszenarien:** Solange Bewegung ungebunden ist, ist jede
   Hash-Position erreichbar; kämen später Arena-Grenzen hinzu, müsste der
   Spawn-Hash das berücksichtigen (Hinweis aus dem Diff-Review).
3. **Suite-Umfang:** +18 vollständige Headless-Läufe für die Isolation;
   Laufzeit von npm test steigt merklich (akzeptiert für die Beweiskraft).
4. **combatArtV3 ist teilweise quelltextbasiert** (Sprite-Grammatik-Merkmale).
   Verhalten wird durch renderCostContract/baselineIsolated flankiert; ein
   rein pixelbasierter Nachweis ist im Node-Shim ohne getImageData nicht
   möglich.
5. **Keine Balanceänderung:** NEXUS-HP, Waffen, XP, Dichte unberührt; der
   Besitzerlauf (1:35 auf NEXUS) bleibt alleinige Grundlage eines späteren
   Boss-Balanceauftrags.

## Dateien und Commits

| Datei | Änderung |
|---|---|
| `prototype/web/index.html` | Gates A–E: Lichthüter-Sprites, Orbitalhintergrund, Rammjäger/EVO-Fix, Stationsring-DOM+CSS+JS, Signal (Konstanten, Spawn/Laden, Marker, HUD, Bericht), Save v5, Kern/Protokolle |
| `tools/run-balance-suite.mjs` | combatArtV3, sectorObjectiveFlow, stationCoreFlow, stationDomContract, baselineIsolated (18 Fingerprints), evolutionFocusHud Links-Vertrag, v5-Erwartungen, Shim-Härtung (children/style/removeAttribute/className/Multi-remove) |
| `CHANGELOG.md` | Unreleased-Eintrag D-042 |
| `docs/ASSET_PROVENANCE.md` | AP-005 (PROTOTYP, Adaption aus lokaler Referenz) |
| `docs/WORK_REPORT.md` | dieser Bericht |

Geschützte Dateien (ROADMAP, README, AGENTS, CLAUDE, DECISIONS, TESTPLAN,
CURRENT_TASK, WORKFLOW, Konzeptbilder, Referenzordner) wurden nicht verändert;
das Referenzprojekt blieb ausschließlich lesend offen.

## Abschließender Git-Status

```text
## main...origin/main [ahead 4]
```

Lokale Commits: a261165 → a2b37f7 → 0c289b8 → docs(d042). Nicht gepusht.

## Empfehlung an Codex

**Abnehmen** mit drei Hinweisen:
1. Sichtbare Abnahme (Posen, Hintergrund, Station bei beiden Größen,
   Signal-Marker, FPS gegen 56/58/0,0 %) bleibt dem Besitzerlauf vorbehalten.
2. Der ursprünglich gemeldete Reroll-Randfall ist durch Codex behoben und
   automatisiert abgesichert.
3. baselineIsolated friert die d78fdbe-Simulationsfingerprints ein — künftige
   Balanceaufträge müssen diesen Vertrag bewusst neu referenzieren, nicht
   lockern.

## Codex-Abnahme (maßgeblich, 25.08.2026)

**Status:** technisch abgenommen; sichtbare Besitzerabnahme offen.

Codex hat die vier OpenCode-Commits unabhängig gegen
`docs/CURRENT_TASK.md` geprüft und drei Abweichungen vor der Freigabe
korrigiert:

1. Klingenfokus wurde vom ersten erzeugten Angebot an den ersten tatsächlich
   abgeschlossenen Kartenzug gebunden. Ein oder mehrere Rerolls behalten die
   legale Orbitklingen-Karte; erst eine Kartenwahl verbraucht die Garantie.
2. Ein zweiter Tap auf denselben Stations-Hotspot schließt das einzige
   Detailpanel nicht mehr. Die zusätzlich unter dem Stationsring stehen
   gebliebene permanente Sternenkarten-/Startwand wurde entfernt; Sektorwahl,
   Protokoll, 3-/8-Minuten-Start und letzter Bericht liegen vollständig im
   Sternenkarten-Hotspot.
3. Der unbeauftragte Bonus von 60 Bergungswert je Stationsdatei wurde entfernt.
   Stationsdaten bleiben eine getrennte, todsichere Basisbergung und werden
   weiterhin exakt einmal in `depositRunReward()` gutgeschrieben, ohne die
   bestehende Bergungswert-/Asteritkurve zu verändern.

Die Regressionen sichern jetzt zusätzlich
`rerollBewahrtFokus`, `bleibtOffen` und
`keineDoppelteKartenwand`. Abschließende unabhängige Prüfung:

- `npm test`: **58/58 grün**, Exitcode 0
- Botanker: **19,78 ±3**
- Baseline-Isolation: **18/18 bitidentisch**
- `git diff --check`: sauber

Die sichtbare Browserprüfung war nicht möglich, weil die Browsersteuerung in
der Codex-Umgebung am Windows-Sandboxfehler abbrach. Deshalb werden Avatar,
Hintergrund, Stationslayout, Signalmarker und echte FPS nicht behauptet,
sondern im nächsten Besitzerlauf nach `docs/TESTPLAN.md` geprüft. Die
vorstehende OpenCode-Empfehlung zum Reroll ist durch diese Abnahme überholt.
