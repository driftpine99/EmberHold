# Aktiver Arbeitsauftrag
## Steuerung

- **Task-ID:** EH-2026-08-25-04
- **Thema:** Lichthüter-Grafik, Bergungssignal und Stationsring V1
- **Status:** **TECHNISCH_ABGENOMMEN_WARTET_BESITZERTEST**
- **Auftraggeber:** Besitzer
- **Projektleitung und Abnahme:** Codex
- **Ausführung:** OpenCode; unabhängige Review und Nacharbeit durch Codex
- **Priorität:** P0 – sichtbare Qualität und ein verständlicher Run→Station-Zweck
- **Verbindlicher Ausgangscommit:** `d78fdbe5dabd32991b5b5f2ab765cdb290aa9d08`
- **Zeitregel:** die gesamte verfügbare OpenCode-Arbeitszeit produktiv nutzen,
  alle Gates in Reihenfolge bearbeiten und nicht nach einem kosmetischen
  Teilergebnis stoppen. Droht das externe Zeitlimit, den letzten grünen Stand
  sichern und den Rest ehrlich als teilweise melden.

**Codex-Abnahme 25.08.2026:** 58/58 Checks grün, 18 Baseline-Fingerprints
bitidentisch, `git diff --check` sauber. Die Review-Nacharbeit steht in
`docs/WORK_REPORT.md`. Kein Agent darf ohne neuen freigegebenen Auftrag
weitere Balance-, Grafik- oder Stationsänderungen stapeln.

Bei Widersprüchen mit historischem Kontext in `AGENTS.md`, `CLAUDE.md` oder
älteren Roadmap-Abschnitten gilt ausschließlich dieser Auftrag.

## Verbindlicher Besitzerbefund

Der vollständige D-041-Lauf mit Seed `2026415955` wurde am 25.08.2026 bei
9:35 nach besiegtem NEXUS extrahiert: 16.846 Kills, Stufe 29, 28 Kartenzüge,
drei Evolutionen, schlechteste FPS 56, 1-%-Low 58 und 0,0 Prozent unter
55 FPS.

Freigegeben sind AEGIS mit Ziel 50, NEXUS als verpflichtendes Finale, beide
NEXUS-Muster, die unterscheidbareren Gegnerfamilien und die technische
Performance. Der Besitzer hat danach mehr Lust auf einen weiteren Run.

Nicht freigegeben beziehungsweise ausdrücklich gewünscht:

- Der Hintergrund ist weiterhin nur ein Raster aus Kästen und deutlich
  schwächer als die früheren Orbitblade-Entwürfe.
- Der Spieler soll die markante weiß-goldene **Lichthüter**-Silhouette der
  lokalen alten Orbitblade-Fassung übernehmen.
- Der Rammjäger fällt während seiner Rush-Aufladung auf die alte
  Gegnerdarstellung zurück.
- `Nächste EVO` ist hilfreich, stört aber unten mittig und soll kompakt zurück
  an die linke Seite.
- Die Station soll wie eine tatsächlich reparierte Raumstation wirken und
  bedienbares Gameplay statt einer Wand aus Kästen bieten.
- Im Run fehlt ein bewusst verfolgtes Ergebnis, das nach der Rückkehr sichtbar
  am Stationsausbau weiterarbeitet.

NEXUS dauerte in diesem einzelnen Menschenlauf 1:35. Das liegt etwas über dem
früheren Zielkorridor, wurde aber als „ganz lustig“ und fair bewertet. Dieser
Auftrag ändert deshalb weder NEXUS-HP noch Bosswerte. Erst ein weiterer
vergleichbarer Lauf darf daraus eine Balanceentscheidung machen.

## Produktentscheidung: ein zusammenhängender Vertikalschnitt

Der nächste Ausbau verbindet genau eine neue Kette:

> In der Sortie ein Signal sichern → Stationsdaten bergen → den zentralen
> Stationskern sichtbar aufbauen → ein Protokoll für den nächsten Run wählen.

Das ist ein einzelner vertikaler Produkt-Slice, keine allgemeine
Content-Erweiterung. Er darf Grafik, Station und Run-Zweck gemeinsam ändern,
weil diese drei Punkte für den Besitzer denselben Spaßblocker bilden.

## Lokale Orbitblade-Referenz: erlaubt, aber begrenzt

Die lokale Referenz liegt unter
`Orbitblade/Saber-Game-Projekt/`. Nur die aktive Fassung unter `konzept/` darf
schreibgeschützt untersucht werden. `archive/`, Trailer, ZIPs, Videos und die
verschachtelte `.git` bleiben unangetastet.

Vor diesem Referenz-Audit sind die dortige `AGENTS.md` und `CLAUDE.md`
vollständig zu lesen; ihre Schutzregeln für `archive/` und das aktive
`konzept/` gelten auch bei rein lesender Arbeit.

Konkret relevant sind in `konzept/game.js`:

- `zeichneLichthueterNeu()` als Formensprache für Helm, Goldhalo,
  Schulterpanzer, Mantel und cyanfarbenes Visier;
- `zeichneHintergrund()`, `drawStarLayers()`, `drawNebulae()`,
  `drawFadedGrid()` und `drawLandmark()` als Referenz für Tiefe, Ringformen,
  Sterne und ruhige Parallaxe.

Diese Funktionen werden **nicht als alter Spielblock importiert**. Ihre
Formensprache wird an die bestehende vorgerenderte Emberhold-Runtime adaptiert.
Kein `Date.now()`, `shadowBlur`, Gradient oder Canvas-Neubau im Figuren- oder
Schwarm-Hot-Loop. Das Referenzprojekt wird nicht geändert und nicht in den
Commit aufgenommen. Ursprung und Adaption sind in
`docs/ASSET_PROVENANCE.md` als PROTOTYP zu dokumentieren; kommerzielle
Freigabe bleibt offen.

## Ziel

Der Kampf sieht sofort stärker nach der beschlossenen kosmischen
Sci-Fantasy-Richtung aus. Die Station wird zu einer verständlichen visuellen
Karte mit sechs bedienbaren Modulen. Ein absichtlich verfolgtes Sektorziel
liefert nach jedem vollständigen Versuch sichtbaren Fortschritt für einen
dreistufigen Stationskern und spürbare, aber begrenzte Vorbereitungsoptionen.

## Gate A – visueller Kampfpass mit Lichthüter

1. `buildOrbiterSprites()` behält mindestens sechs Idle-, acht Lauf- und acht
   Wurfphasen bei ungefähr 12 visuellen Bildern pro Sekunde.
2. Die Figur übernimmt die eigenständigen Merkmale des alten Lichthüters:
   geschlossener weiß-goldener Helm, cyanfarbenes Visier, Goldhalo/Krone,
   breite Schulterplatten und geteilter Mantel. Sie bleibt aufrecht, wird nur
   horizontal gespiegelt und besitzt einen ruhigen Kontaktschatten.
3. Lauf, Wurf und Impuls müssen unterschiedliche, flüssig lesbare Posen sein.
   Keine frei rotierte Figur, kein Wackeln des Ursprungs und kein
   halbtransparentes Crossfade-Doppelbild.
4. Der heutige gleichförmige 80er-Kastenboden wird durch eine reichere, ruhige
   Weltraum-/Orbitalstruktur ersetzt: tiefe Navy-Fläche, wenige gecachte
   Stern- und Nebelebenen, große gebrochene Ring-/Leitstrukturen und eine
   zurückhaltende Kampfdeck-Textur. Keine lückenlose Wand quadratischer
   Paneele, keine schwarze Safe-Area und kein abgeschnittener Arenarand.
5. Die Kampffläche bleibt mittelhell genug, dass dunkle Gegner und rote/
   violette Warnungen jederzeit lesbar sind. D-017 bleibt unverändert:
   Simulation und Seitenverhältnis dürfen sich durch die Kulisse nicht ändern.
6. Hintergrundebenen werden einmalig vorgerendert, gekachelt oder auf einer
   wiederverwendeten reduzierten Zwischenleinwand erzeugt. Pro Frame kein neuer
   Canvas und höchstens die bisherige konstante Zahl teurer Gradienten.

## Gate B – zwei sichtbare Korrekturen

1. In der Rammjäger-Aufladephase bleibt dieselbe aktuelle keilförmige
   Rammjäger-Silhouette sichtbar. Der Warnkorridor liegt darunter; die alte
   Tier-/Fallback-Gegnergrafik darf nicht mehr erscheinen.
2. Genau ein `Nächste EVO`-Hinweis bleibt erhalten und verwendet weiterhin
   ausschließlich `leadingEvoPath()`. Er sitzt innerhalb des linken
   Kampfrands unter Gesundheit/XP, nicht unten mittig. Er darf bei 1280×720
   und 844×390 weder Spieler noch Karten, Bossleiste, Sektorziel, Waffenleiste,
   Impuls, Pause oder Dialoge überdecken.

## Gate C – Stationsring statt Kartenwand

Die vorhandenen Funktionen werden nicht gelöscht, sondern neu geordnet:

1. Die Startansicht zeigt eine zusammenhängende, eigenständige Orbitalstation
   um einen zentralen Kern. Planet, Sterne, Ringsegmente, Stromleitungen und
   Reparaturzustände bilden eine echte Szene statt des bisherigen Kraters und
   der gleichzeitig sichtbaren Rechteckkarten.
2. Sechs klar getrennte, große Hotspots bilden Asteroidensonde,
   Materiefabrikator, Fluxlabor, Simulationsdeck, Ausrüstungsbucht und
   Sternenkarte ab. Ein Klick/Tap öffnet genau ein zugehöriges Detailpanel mit
   den heutigen Aktionen und Werten.
3. Offline, reparierbar, produzierend und abholbereit müssen bereits auf der
   Stationskarte an Licht, Schaden, Leitung oder Animation unterscheidbar sein.
   Der zentrale Kern zeigt seine neue Ausbaustufe ebenso sichtbar.
4. Alle heutigen Funktionen bleiben erreichbar: Produktion und Einsammeln,
   Orbitklingen-Verstärkung, Reroll-Vorbereitung, drei Meisterschaften,
   Ausrüstung anlegen/aufwerten/zerlegen, Sektorwahl, 3-/8-Minuten-Start und
   letzter Run-Bericht.
5. Oben stehen weiterhin nur Asterit, Legierungsplatten,
   Fluxkondensat und die anders gestaltete Sortienstatistik. Stationsdaten
   erscheinen ausschließlich am zentralen Kern beziehungsweise Ziel.
6. Standardfokus ist das eine nächste Stationsziel. Tastaturfokus,
   `aria-label`s und große Touchflächen bleiben erhalten. Bei 1280×720 und
   844×390 keine abgeschnittenen Module; ein Detailpanel darf intern scrollen,
   die Karte selbst nicht horizontal.

Die Station darf als code-natives Canvas/SVG/CSS-Motiv umgesetzt werden.
Neue Bitmap- oder Fremdassets sind nicht erlaubt. Ein neues eigenes SVG ist
nur zulässig, wenn es kleiner und wartbarer als die Inline-Lösung ist und in
der Provenienz erfasst wird.

## Gate D – ein bewegungsbasiertes Sektorziel

Nur in der Acht-Minuten-Sortie erscheint **genau ein** Ziel `SIGNAL SICHERN`:

1. Spawn bei 2:30 an einer deterministischen, gut erreichbaren Position in
   ungefähr 220–300 Welteinheiten Abstand zum Spieler; Platzierung nutzt einen
   separaten Hash aus Seed/Position und verbraucht keinen Gameplay-RNG.
2. Ein Richtungspfeil und ein ruhiger Ring machen das Ziel auffindbar. Innerhalb
   von ungefähr 110 Welteinheiten lädt es insgesamt acht Sekunden. Verlassen
   pausiert den Fortschritt, setzt ihn nicht zurück.
3. Das Zeitfenster endet bei 4:00, damit das Ziel nicht mit AEGIS kollidiert.
   Es erzeugt keine Sonderwelle, keine neue Gegnerart und blockiert weder
   AEGIS noch NEXUS, Tod, Pause oder Kartenwahl.
4. Abschluss sichert **eine Stationsdatei**. Ein echter NEXUS-Kill sichert eine
   zweite. Beide gehören zur Basisbergung und bleiben deshalb auch bei einem
   späteren Tod im Finale oder in Overtime erhalten. Abbruch vor dem jeweiligen
   Erfolg erzeugt nichts.
5. Gutschrift erfolgt in `depositRunReward()` exakt einmal. Wiederholtes
   Öffnen, Extraktion/Overtime oder doppelte Endereignisse dürfen nichts
   duplizieren.
6. Run-HUD, Ergebnis und kopierbarer Bericht nennen Status, Ladefortschritt
   und verdiente Stationsdaten verständlich.

## Gate E – zentraler Stationskern und Sortie-Protokolle

Save v4 wird explizit auf **v5** migriert. Alle alten Ressourcen, Gebäude,
Ausrüstung, Meisterschaften, Rerolls und Sektorwahl bleiben exakt erhalten.
Neue Felder werden exakt bereinigt: `stationData` als Ganzzahl 0–999,
`coreStage` als Ganzzahl 0–3 und `sortieProtocol` als `none` oder ein bereits
freigeschaltetes Protokoll (interne Namen dürfen abweichen, Bedeutung nicht).

Der zentrale Stationskern besitzt drei einmalige Ausbaustufen:

| Stufe | Kosten | Freigeschaltetes Protokoll |
|---|---|---|
| 1 | 1 Stationsdatei + 5 Asterit | **Klingenfokus:** Der erste legale Kartenzug enthält eine Orbitklingen-Aufwertung. |
| 2 | 2 Stationsdaten + 1 Legierungsplatte | **Fluxreserve:** Der Run startet mit genau einem zusätzlichen, nicht verbrauchten Stations-Reroll. |
| 3 | 3 Stationsdaten + 2 Legierungsplatten | **Bergungsscanner:** SIGNAL SICHERN lädt in fünf statt acht Sekunden; bei Erfolg wird der garantierte Ausrüstungsfund bevorzugt aus noch nicht besessenen Teilen gewählt, solange eines existiert. |

Regeln:

- Jede Stufe verändert den sichtbaren Kern und versorgt weitere Module mit
  Licht; der Ausbau darf nicht nur eine Zahl in einem Panel sein.
- Vor einer Sortie ist genau `kein Protokoll` oder eines der bereits
  freigeschalteten Protokolle aktiv. Die Wahl ist kostenlos, klar erklärt und
  im Kampf nur kompakt in Pause/Run-Bericht sichtbar.
- `Klingenfokus` injiziert deterministisch eine **legale** bestehende Karte,
  ohne zusätzliche RNG-Ziehung, ohne EVO-Voraussetzungen zu umgehen und ohne
  einen vierten Kartenplatz zu erzeugen. Ist keine Aufwertung legal, bleibt
  das normale Angebot unverändert.
- `Fluxreserve` ist getrennt von hergestellten Rerolls. Es erhöht das
  Startbudget um exakt eins, verbraucht keine Fluxkondensate und stapelt nur
  mit den bestehenden maximal zwei vorbereiteten Rerolls.
- `Bergungsscanner` gibt kein doppeltes Item. Er verändert nur die Auswahl des
  ohnehin garantierten Funds; sind alle Teile besessen, gilt der bisherige
  Duplikat-/Staubpfad.
- Ohne gebautes/gewähltes Protokoll bleibt der serialisierte Baseline-Run
  bitidentisch. Hold-Boni dürfen nicht unbemerkt in die Referenzsuite gelangen.

## Unverhandelbare Grenzen

- Keine Änderung an Waffen-/Passivschaden, XP-Kurve, Evolutionen,
  Gegnerwerten, Dichtezielen, AEGIS/NEXUS, Heilung oder Magnetradius.
- Kein neuer Kampfknopf, keine neue Waffe, Gegnerfamilie, Bossphase, Währung
  außerhalb der projektgebundenen Stationsdaten, kein Audio und keine
  Monetarisierung.
- Kein Import des alten Orbitblade-Saves, Spielsystems, Orbitbaums oder
  Werkstattumfangs. `orbitblade_konzept_save` wird nie gelesen.
- Keine Netzwerk-, Build-, Bibliotheks- oder Engine-Abhängigkeit.
- Keine Franchise-Namen oder erkennbaren geschützten Designs.
- `main` wird nicht gepusht. Keine Änderung an geschützten kanonischen
  Dokumenten außerhalb der unten erlaubten Dateien.

## Kosten- und Agentenregel

OpenCode soll günstige/einfache Subagenten sinnvoll einsetzen, mindestens für
zwei klar begrenzte Aufgaben, sofern seine Umgebung Subagenten anbietet:

1. schreibgeschützter Audit von Lichthüter/Hintergrund im Referenzprojekt;
2. Testspezifikation oder unabhängige Diff-/Renderkostenprüfung;
3. optional Station-Layout/CSS als Analyse oder isolierter Entwurf.

Wegen der monolithischen `prototype/web/index.html` dürfen Subagenten diese
Datei nicht gleichzeitig in überlappenden Bereichen editieren. OpenCode hält
Save-Migration, Run-Zustand, Integration und Schlussreview selbst, liest jeden
Subagenten-Diff vollständig und übernimmt keine Aussage ungeprüft. Ist keine
Subagentenfunktion verfügbar, wird das im Bericht notiert und lokal
weitergearbeitet.

## Automatische Abnahme

Vor Beginn Baseline `npm test` und `git status --short --branch` protokollieren.
Danach mindestens:

1. `npm test` vollständig grün; keine bestehende Schwelle lockern.
2. Neuer `combatArtV3`-Vertrag: Phasenzahlen 6/8/8 oder höher,
   Lichthüter-Merkmale, keine alte Rammjäger-Warnfigur, EVO-Hinweis links und
   keine verbotenen Hot-Loop-Operationen.
3. Neuer `sectorObjectiveFlow`: nur 8 Minuten, 2:30–4:00, kumulativer
   Fortschritt, Pause/Resume, Erfolg/Misserfolg, kein RNG-Verbrauch, kein
   Bossblocker und keine doppelte Gutschrift.
4. Neuer `stationCoreFlow`: Kosten und drei Stufen, sichtbare Zustände,
   Protokollsperren/-wahl sowie Wirkung jedes Protokolls.
5. Save-Migration v4→v5 mit vollständigem Feldvergleich der alten Daten;
   fehlerhafte neue Felder werden sicher bereinigt.
6. `baselineIsolated`: ohne aktives Protokoll serialisierte neun Seeds und
   früher Lauf bis 4:10 bitidentisch zum Ausgangscommit. Der neue rein
   visuelle Hintergrund verbraucht keinen Gameplay-RNG.
7. Getrennte Protokollchecks: legale Karteninjektion ohne EVO-Bypass,
   Rerollbudget exakt +1 und unbesessener Gear-Fund mit vollständigem
   Duplikat-Fallback.
8. `renderCostContract` und `aspectIndependent` grün. Keine
   gegnerlinear zusätzliche Draw-Pässe, keine Canvas-Allokation pro Frame,
   kein `shadowBlur` im Schwarmpfad.
9. Stations-DOM/UX-Vertrag: sechs eindeutige Hotspots, zentraler Kern, genau
   ein offenes Detailpanel, alle bisherigen Aktions-IDs erreichbar.
10. `git diff --check` sauber; keine Browserfehler.

Wenn durch die absichtlich gewählten Protokolle Seed-Ergebnisse abweichen,
werden sie separat gemessen. Der Baseline-Anker **19,78 ±3** bleibt unangetastet.

## Manuelle Abnahme durch OpenCode

Wenn ein sichtbarer Browser verfügbar ist:

1. Station bei 1280×720 und 844×390: alle sieben Hotspots, Detailpanel,
   Reparatur-/Produktionszustände, zentrale Kernstufen und Sortiestart.
2. Kampf bei beiden Größen: Lichthüter Idle/Lauf/Wurf/Impuls,
   Richtungswechsel, neuer Hintergrund, dunkler Gegnerpulk und Warnfarben.
3. Rammjäger beim vollständigen Aufladen: kein Wechsel auf das alte Design.
4. EVO links sowie SIGNAL SICHERN mit Marker, Pause, Karte und AEGIS ohne
   Überlappung.
5. Ein beschleunigter kompletter Ablauf: Signal sichern, NEXUS besiegen,
   Rückkehr, Daten exakt einmal erhalten, Kernstufe bauen, Protokoll wählen,
   neuen Run starten.
6. FPS/1-%-Low bei hoher Dichte gegen Besitzerreferenz 56/58/0,0 Prozent
   dokumentieren. Nicht erkennbar schlechter; das echte Besitzergerät bleibt
   die finale Freigabe.

Ohne sichtbaren Browser die Grenze offen benennen und keine visuelle Abnahme
behaupten.

## Erlaubte Dateien

- `prototype/web/index.html`
- `prototype/web/assets/orbitblade-station-v1.svg` nur falls Gate C die
  externe eigene SVG-Variante begründet
- `tools/run-balance-suite.mjs`
- `CHANGELOG.md`
- `docs/WORK_REPORT.md`
- `docs/ASSET_PROVENANCE.md`

Geschützt: `ROADMAP.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`,
`docs/DECISIONS.md`, `docs/TESTPLAN.md`, `docs/CURRENT_TASK.md`,
`docs/WORKFLOW.md`, Konzeptbilder und der gesamte lokale Referenzordner.

## Rückgabe

`docs/WORK_REPORT.md` vollständig nach `docs/WORKFLOW.md` ersetzen und
zusätzlich liefern:

- Status und Beleg je Gate; eingesetzte Subagenten, deren Auftrag und eigene
  Diffprüfung;
- Referenzfunktionen und genaue Art der Adaption, ohne pauschalen Codeimport;
- Vorher-/Nachher-Bilder oder präzise Browserbeschreibung für beide Größen;
- Save-v4-Migrationsbeleg und Beispielstand vor/nach Ausbau;
- Signal-/NEXUS-Datenfluss inklusive Doppelgutschrift-Schutz;
- Baseline-Seeds sowie getrennte Messung der drei Protokolle;
- Renderkosten und echte FPS, soweit messbar;
- alle Testbefehle mit Exitcode, Risiken, Abweichungen und offene manuelle
  Prüfungen;
- lokale kleine Commits, finaler Git-Status und Empfehlung an Codex.

Lokale kleine Commits nach grünen Tests sind erlaubt. Kein Push und kein
Folgeauftrag.
