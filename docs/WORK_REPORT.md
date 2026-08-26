# Claude/OpenCode-Arbeitsbericht

> Diese Datei wird für jeden Auftrag vollständig ersetzt. Der aktuelle
> Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in der
> Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-25-05 — Orbitklinge V2, ruhige Kampfkulisse und
  Orbitalstation V2 (D-043)
- **Status:** FERTIG, bereit für Codex-Review
- **Verbindlicher Ausgangscommit laut Auftrag:** `6b69bcf`
- **Tatsächlicher Startcommit:** `1c61b31` (= `6b69bcf` + dokumentarischer
  Commit „docs: D-043 Grafik- und Stationspass freigeben“); Laufzeitcode
  identisch zu `6b69bcf`, alle Fingerprints daher dagegen gültig
- **Anfangsstatus:** `## main...origin/main`, Arbeitsbaum sauber; Baseline
  `npm test` **58/58 grün**, Exitcode 0
- **Endstand:** `npm test` **60/60 grün**, Exitcode 0; `git diff --check`
  Exitcode 0; doppelte statische IDs: keine
- **Lokale Commits:** vier — `ee42993` (Gates A+B), `4741870` (Gates C/D/E
  und neue Verträge), `567c65b` (totes Stations-CSS) und `d2874c6`
  (Bericht/Changelog/Provenienz). **Nicht durch OpenCode gepusht.**

## Ergebnis in einem Satz

Die Wurfklinge ist jetzt eine erkennbare Waffe mit eigener Silhouette in
Projektil, Karte und HUD, der Avatar hat keinen Radius-Ring mehr und die
Kulisse wurde auf ruhige Navy-Fläche mit seltenen Strukturen reduziert, die
Station ist eine zusammenhängende SVG-Szene über dem violetten Planeten, an
der Reparatur, Produktion, Ausbau und Protokollwahl unmittelbar sichtbar
werden — bei **60/60** grünen Checks und bitidentischer Baseline (18/18).

## Gate 0 – Audit und Renderstrategie

- Konzeptbilder vollständig angesehen (v2-Kampf-UI, v1-Kampf, v1-Station) und
  gegen den Code abgeglichen (Subagent 1, Details unten).
- Fehlende Kernelemente (Auszug): Klingentrail fehlte komplett; Klinge war
  symmetrische 26px-Sichel ohne hellen Kern/Spitze; Sterne lagen AUF der
  Kampffläche (26 in der Kachel + 44er-Ebene vollflächig); Landmarks bis
  Alpha .95 mitten im Duell; permanenter Lichtkreis-Stroke-Ring existierte nur
  im Code, in keinem Konzept; Station waren sechs Textchips ohne Gebäudeform,
  ohne Stege, ohne Ruinenzustand.
- Avatar-Ring technisch identifiziert: `render()`-Block „Lichtkreis“ — der
  `ctx.arc(S.x,S.y,lr*0.985)`-Stroke (`rgba(127,212,232,0.05)`, 8px) war die
  permanente Kontur. `lightRadius()` selbst blieb unverändert (Signal-
  Telegraphie nutzt `min(lightRadius(),340)` unabhängig weiter).
- Renderstrategie: alles bleibt im einzelnen HTML/Canvas-Prototyp. Klinge als
  vorgerenderte Canvas-Sprites (24×4×2 = 192 Canvases à 48px), Station als
  Inline-SVG mit CSS-Zustandsklassen + transparente Overlay-Buttons.
- Baseline protokolliert: 58/58, Arbeitsbaum sauber.

## Status je Gate

| Gate | Status | Umsetzung | Beleg |
|---|---|---|---|
| A – Orbitklinge V2 | erfüllt | Neue `drawBladeV2`: asymmetrische Cyan-Schneide mit Spitze (20,2), helle Innenkante mit wanderndem Glanz (4 Phasen), weiß-goldener Mittelteil + Knauf, kurzer Trail (alpha .30, ±15 %). 48px-Sprites, 24 Richtungen × 4 Phasen, EVO-Reihe mit Goldkante/+15 % Schneide. Flug: genau ein drawImage, Phase `((visualT*3+i*0.41)*4)%4` deterministisch. Glyph (`BLADE_GLYPH`) geteilt für HUD + Waffenkarten (cardglyph). Trefferbox/P.r/BLADE_R unangetastet; prozeduraler Pfad ist die Primärlösung (kein Image nötig) | Neuer Vertrag `combatArtV4` (neueForm/flugSauber/glyphGeteilt/ringWeg/kulisseRuhig, alle true) |
| B – Ruhe + kein Ring | erfüllt | Stroke-Ring entfernt; Codex begrenzte die kantenlose Aura in der Review auf `min(70, lr*0.35)`. Kachel: Grundton `#38445f`, Mikrosterne/Leitungen/Knoten entfernt, 2 unregelmäßige Fugen statt 128px-Raster, Nebel reduziert; Sternebene 44→12 schwach; Landmarks nur `h>0.88` (Planet `h>0.965`) mit Alpha .42/.55; Warden-Seals nur `zelle>0.78`, Props nur `zelle<0.10` (je 1 statt 4). D-017/Simulation/Culling unberührt | `combatArtV4.ringWeg/kulisseRuhig`; `combatUiV2` präzisiert: misst verhaltensbasiert NUR den Boden-Pass (Deko-Ebenen temporär abgehängt, Kamera versetzt auf x=137) → 7 vs 9 Kacheln, deckBisZumRand true; renderCostContract: weiterhin 2 Gradienten/Frame, 0 shadowBlur, 0 Canvas/Frame |
| C – Station V2 | erfüllt | Inline-SVG (1000×560): Planet + Trümmerring + Sterne; Kernplattform mit Energiekranz und Lichthüter-Maßstab (~18px); sechs Baukörper (Sonde mit Dock/Ausleger/Asteroiden, Kuppel-Fabrikator mit Glutkern, violette Glaskammer, Simulations-Dome, Hangar mit offenen Toren, Antenne+Kartentisch); Stege + Energieleitungen mit Unterbrechern. Overlay-Buttons (`.hs`, 44px+, Label-Chip bei Fokus/Hover/active) an SVG-Ankern; genau ein Drawer rechts (≤700px Bottom-Sheet); Launch-Kontrolle in der Szene; Ressourcen/Ziel klein am Rand; alte Kartenwand/Deko restlos entfernt | Neuer Vertrag `stationSceneV2.szenenGraph/alteDekoWeg/drawerEin/aktionenEinmal` alle true; bestehender `stationDomContract` angepasst (Overlay-Kern `class="hs core st-N"`) und grün |
| D – Gameplay sichtbar | erfüllt | Reparatur → Baukörper hell + Leitung geschlossen sofort (renderHold-Pfad). Produzierend/abholbereit am Körper (Förderlicht puls, Behälter leuchtet). Einsammeln fliegt kurz zum Ressourcenwert (`.flyres`, transform/opacity, reduced-motion, rein visuell). Kernupgrade schaltet stage1..3 sichtbar (Kränze/Masten/Goldring). Stationsdaten = max 6 Diamanten. Protokollprojektion am Kartentisch (none/Blade/Flasche/Radar). Ankunftsrückmeldung: eigener Key `emberhold:arrival:v1` (KEIN Save-v5-Feld), seen-Markierung → nicht bei jedem Reload, Button führt an den Kern. Räumliches Ziel `is-goal` aus holdGoal() | `stationSceneV2`: Interaktionstests mineOffline→mineOnline, forge run→ready→wartet, kernSichtbar(core-3), protoSichtbar, ankunftGezeigt/Gesehen/führtZumKern/einmal — alle true |
| E – Responsive/Qualität | erfüllt (ohne Browser) | Media-Queries: ≤700px Bottom-Sheet + kompakte Buttons; ≤480px-Höhe engere Szene; Drawer intern scrollbar, keine horizontale Scroll-Ebene (SVG skaliert via viewBox). Tote Regeln entfernt (.holdgrid/.holdsortie/.contractboard-Reste, scene-*, core-orb). Doppelte IDs geprüft: nur JS-Template `${item.id}` (Gear-Renderer, zur Laufzeit eindeutig) | `aspectIndependent`, `minCombatHeight`, alle DOM-Verträge grün; Screenshots siehe unten |

## Subagenten (drei regulär + eine Retry + Abschlussprüfung)

1. **Konzept-Audit** (explore, read-only): las Konzeptbilder + README + den
   aktuellen Code; lieferte die Fehllisten je Bereich und den Nachweis, dass
   der Radiusring konzeptfremd ist sowie die lightRadius-Kopplung zur
   Signal-Telegraphie. Meine Prüfung: Befunde decken sich mit meiner eigenen
   Bildsicht; Umsetzung folgt Punkt für Punkt.
2. **Klingenentwurf** (general): lieferte `d043-blade-entwurf.js`
   (drawBladeV2 + Builder). Meine Prüfung: Koordinatenbudget (max r≈21.7 < 24),
   keine Schatten-API/Gradienten, alle Gate-A-Merkmale; Code 1:1 übernommen,
   mk() durch mkCanvas ersetzt, Builder in buildSprites integriert.
3. **Stations-SVG** (general; erster Versuch scheiterte am Provider, Retry
   erfolgreich): lieferte `d043-station-entwurf.svg` + Notiz. Meine Prüfung:
   vollständige IDs/Klassen, 2 Filter, reduced-motion; Integration: Root-ID
   `stationSvg` + Zustandsklassen, title/desc entfernt, Leitungspfade bekamen
   IDs (JS-Zugriff), Bruch-/Zielmarken an den bestehenden Zustandsfluss
   angebunden.
4. **Unabhängige Abschlussprüfung** (explore): Diff-Integrität (Waffen-/Treffer-/Boss-/Ökonomie-/Save-Blöcke byteidentisch), DOM (IDs je 1×, Reihenfolge, keine zweite Station), Save (Rundlauf stabil, ARRIVAL_KEY außerhalb META, fly/arrival rein präsentativ), Renderkosten (weiterhin exakt 2 Gradienten/Frame, kein shadowBlur-Neuzugang, ein drawImage/Klinge). Befund: kein BLOCKER; Präzisierung der Gradienten-Erwartung übernommen; Hinweis „2 statt 4 Commits“ bezog sich auf meine Draft-Formulierung — korrekt sind zwei Feature-Commits plus Chore/Docs.

## Konkrete Vorher/Nachher

| Element | vorher (D-042) | jetzt (D-043) |
|---|---|---|
| Klinge | symmetrische 34px-Sichel, Heck-Raute, kein Trail | 48px-Säbel: Cyan-Schneide mit Spitze, weiß-goldener Kern, Innenkante+Glanzphasen, kurzer Trail; EVO goldgekantet |
| Avatar | Lichtkreis-Gradient bis lr + 8px-Strokering | kantenlose lokale Aura auf höchstens 70 Welteinheiten, kein Ring |
| Kulisse | 26 Mikrosterne + 44-Sterne-Parallaxe + Leitungen/Knoten + Landmarks in ~45 % der Zellen + Seals/Props-Reihen | ruhige Fläche, 2 Fugen, 12 schwache Sterne, Strukturen in ~12 % der Zellen (Alpha ≤ .55), Seals/Props selten einzeln |
| Station | 308px-Kasten: Sternpunkte, Planet-Scheibe, 2 Haarstrich-Ringe, 6 runde Menüchips um Orb-Button | SVG-Szene: Planet+Trümmerband, Kernplattform mit Figur/Stufen/Daten/Projektion, 6 Baukörper mit Stegen/Leitungen/Zuständen, Drawer, Launch |

## Renderstrategie und -kosten

- Klinge: 192 Sprites einmalig gebacken; Flugpfad ein drawImage, Index ohne
  Allokation; Trail im Sprite (kein zweiter Pass).
- Hintergrund: Basiskachel/Sternebene/Landmarks/Planet vorgerendert; pro Frame
  nur drawImage + visualHash; Gradienten nur Buildzeit.
- Messung (renderCostContract, 300 Gegner / 281 sichtbar): drawImage erster
  Frame 324, Gradienten/Frame 2 (unverändert), shadowBlur 0, Canvas/Frame 0,
  skaliert nicht mit Gegnern, wirklichGezeichnet true.
- Die SVG-Station ist reines DOM und berührt den Kampf-Renderpfad nicht
  (bestätigt durch Abschlussprüfung).

## Kampfwerte, Ökonomie, Save

- Diff-Prüfung (Subagent 4): WEAPONS/PASSIVES/BLADE_R/FAM_*/targetEnemies/
  BOSS_AT/NEXUS_HP_MULT/HOLD_CFG/rewardOre/grantGear-Kern und
  freshHold/cleanHold byteidentisch; Trefferboxen außerhalb aller Hunks.
- Save bleibt Version 5 mit denselben Feldern; ARRIVAL_KEY ist separater
  localStorage-Schlüssel (Anzeige only, seen-Markierung), kein neues
  persistiertes Spielfeld. Rundlauf: presentationLayer + stationCoreFlow grün.
- baselineIsolated: alle **18 Fingerprints bitidentisch zu 6b69bcf**
  (abweichend: []) — Kulisse/Signal-Hash/Protokolle ohne RNG-Rückwirkung.

## Tests (Befehle, Exitcodes)

```text
npm test                      → Exit 0, pass true, 60 Checks (Baseline 58)
git diff --check              → Exit 0
node test-results/check-doppelte-ids.mjs → nur ${item.id}-Templates (Laufzeit eindeutig)
node test-results/check-ids.mjs          → fehlende SVG-IDs: keine
```

Neue Verträge: combatArtV4, stationSceneV2 (mit Interaktionsnachweisen
Reparatur/Produktion/Einsammeln/Kernupgrade/Protokollwahl/Ankunft). Geänderte
bestehende Verträge (nicht gelockert): combatUiV2-Kachelmessung präzisiert
(Boden-Pass isoliert + Kameraversatz), stationDomContract-Kernregex auf
`hs core st-N`.

## Screenshots / Browser

Kein sichtbarer Browser verfügbar (bekannter Umgebungszustand: keine Frames,
kein requestAnimationFrame). Deshalb NICHT geprüft/behauptet: visuelle Wirkung
von Klinge/Kulisse/Station im Bewegtbild, Desktop- und 844×390-Screenshots,
FPS/1-%-Low gegen 56/58/0,0 %. Automatisiert abgesichert: Phasen-/Silhouetten-,
Renderkosten-, DOM-, Zustands- und Isolationsverträge. Die visuelle Abnahme
bleibt dem Besitzerlauf vorbehalten.

## Risiken, Abweichungen, offene Punkte

1. Klingenfokus überlebt Rerolls und wird erst durch die tatsächliche
   Kartenwahl verbraucht. Runtime und `stationCoreFlow.rerollBewahrtFokus`
   bestätigen den bereits in D-042 beschlossenen Vertrag.
2. combatArtV3/V4 enthalten Quelltextmerkmale (Sprite-Grammatik); Verhalten
   wird durch renderCost/baseline flankiert. Ein pixelbasierter Nachweis ist
   im Node-Shim (ohne getImageData) nicht möglich.
3. Landmark-Wahrscheinlichkeit (h>0.88) und Seal/Prop-Schwellen sind
   Stellschrauben für einen späteren Feinschliff, falls der Besitzer noch
   mehr Ruhe wünscht.
4. Der Ankunfts-Key erscheint nach Reload erneut nur dann nicht, wenn er
   bereits als gesehen markiert wurde — genau das Verhalten des Auftrags;
   wer ihn testweise löscht, sieht die Box wieder (gewollt debuggbar).
5. Subagent-3 erster Versuch schlug providerseitig fehl (Retry erfolgreich);
   Entwurfsdateien in test-results wurden nach Prüfung wieder entfernt
   (nicht Teil des Commits, Provenanz in AP-006 beschrieben).

## Dateien und Commits

| Datei | Änderung |
|---|---|
| `prototype/web/index.html` | Gates A–E: drawBladeV2/SPR.orbBlade(+Evo)/Glyph/Kartenglyph; Kulissen-Beruhigung; Ring-Entfernung; Stations-SVG + Overlays + Drawer + CSS; renderStationMap auf Szenenzustände; flyResource; Ankunft; tote Regeln entfernt |
| `tools/run-balance-suite.mjs` | combatArtV4, stationSceneV2 (inkl. Interaktionen), combatUiV2-Messpräzision, stationDomContract-Kernregex, Shim className/Multi-remove |
| `CHANGELOG.md` | Unreleased-Eintrag D-043 |
| `docs/ASSET_PROVENANCE.md` | AP-006 (PROTOTYP, Adaption/Entwürfe dokumentiert) |
| `docs/WORK_REPORT.md` | dieser Bericht |

Geschützte Dateien und Konzeptbilder unverändert; Referenzordner nur lesend.

## Abschließender Git-Status

```text
## main...origin/main [ahead 4]
```

Commits: `ee42993` (Gates A+B), `4741870` (Gates C/D/E + Verträge),
`chore(d043-gate-e)` (totes CSS), `docs(d043)` (Bericht/Changelog/Provenanz).
Arbeitsbaum sauber. Nicht gepusht.

## Empfehlung an Codex

**Abnehmen** mit zwei Hinweisen:
1. Visuelle Abnahme (Klingen-Lesbarkeit einzeln/Mehrfachschuss/Photonenschneise,
   Kulissenruhe, Station als Ort bei 1280×720/1536×864/844×390, FPS gegen
   56/58/0,0 %) bleibt dem Besitzerlauf vorbehalten — hier ehrlich offen.
2. Klingenfokus beim ersten Kartenzug einmal mit Reroll sichtbar gegenprüfen;
   technisch ist das Verhalten bereits eindeutig abgesichert.

## Codex-Review vom 26.08.2026

Codex hat Diff, Laufzeit und vollständige Suite unabhängig geprüft und D-043
technisch abgenommen. Vor der Freigabe wurden vier Integrationsfehler
nachgehärtet: gekoppeltes 1000:560-Verhältnis für SVG und Klickflächen,
sofortiger aktiver Modulzustand, exakt eine fortgeschriebene Zielmarke und
eine auf 70 Welteinheiten gedeckelte lokale Avatar-Aura. Die neuen
Regressionen `geometrieGekoppelt`, `modulwechselAktiv` und `zielWechselt`
sind grün. `npm test`: 60/60, Baseline 18/18 bitidentisch, Botanker 19,78 ±3.
Sichtbare Desktop-/Handy-Abnahme bleibt offen.
