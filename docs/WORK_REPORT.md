# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-24-02 — Orbitblade, visueller und semantischer
  Vertikalschnitt (D-038)
- **Status:** FERTIG, bereit für Codex-Review
- **Ausgangscommit:** `dd68982fbb2a048004cd082d78beb18292aeec77`
- **Anfangsstatus:** `## main...origin/main`, Arbeitsbaum sauber, keine fremden
  Änderungen; `npm test` 45/45 grün, Exitcode 0
- **Endstand:** `npm test` **47/47 grün**, Exitcode 0; `git diff --check` sauber
- **Lokale Commits:** vier Gate-Commits, **nicht gepusht**

## Ergebnis in einem Satz

Der Prototyp heißt, klingt und sieht auf allen sichtbaren Flächen nach
Orbitblade, während neun serialisierte Referenzläufe mit Runs, Toden,
Hold-Auszahlung, XP-Kurve, Dichte und `CFG` **bitidentisch** geblieben sind.

## Zeitnutzung je Gate

Grobe Aufteilung der Sitzung, nicht gestoppt, sondern nach Arbeitsschritten
geschätzt:

| Gate | Anteil | Schwerpunkt |
|---|---|---|
| 0 – Baseline und Plan | ~10 % | Dokumente lesen, Paritäts-Harness bauen, Inventur |
| 1 – Präsentationsschicht | ~30 % | `LEX`, alle Umbenennungen, neuer Check, Testabgleich |
| 2 – Kampfoberfläche | ~25 % | Palette, Boden, Safe-Area, HUD, zwei Browserfunde |
| 3 – Orbitalstation | ~12 % | Kopfressourcen, Modulzustände, Browserdurchlauf |
| 4 – Grafik-Slice | ~18 % | Figuren, Klingenprojektil, Renderkosten-Check |
| Bericht und Doku | ~5 % | Changelog, Provenienz, dieser Bericht |

## Ergebnis je Gate

| Gate | Status | Beleg |
|---|---|---|
| 0 – Baseline | erfüllt | 45/45 grün vor der ersten Änderung; Referenzlauf serialisiert, SHA256 `978beffd…` |
| 1 – Präsentationsschicht | erfüllt | `presentationLayer` grün; Parität unverändert |
| 2 – Kampfoberfläche | erfüllt | Beide Pflichtformate kollisionsfrei gemessen; zwei echte Überlagerungen behoben |
| 3 – Orbitalstation A | erfüllt | Alle zehn Stationsaktionen im Browser durchgespielt, Kosten und Erträge unverändert |
| 4 – Grafik-Slice | erfüllt | Vier Kernelemente code-native; `renderCostContract` grün |

## Dateien und lokale Commits

| Commit | Inhalt |
|---|---|
| `d3cdd3b` | Gate 1 – Präsentationsschicht `LEX`, alle Umbenennungen, Check `presentationLayer` |
| `39a22f6` | Gate 2 – Palette, Stationsdeck, Safe-Area, HUD-Hierarchie |
| `5ada6ab` | Gate 3 – Orbitalstation Stufe A |
| Gate-4-Commit | Figuren, Klingenprojektil, `renderCostContract`, Changelog, Provenienz, dieser Bericht, Statuswechsel |

Geändert wurden ausschließlich erlaubte Dateien: `prototype/web/index.html`,
`tools/run-balance-suite.mjs`, `CHANGELOG.md`, `docs/ASSET_PROVENANCE.md`,
`docs/WORK_REPORT.md` und der Status in `docs/CURRENT_TASK.md`.
`ROADMAP.md`, `docs/DECISIONS.md`, `docs/TESTPLAN.md`, `README.md`,
`AGENTS.md`, `CLAUDE.md` und `docs/WORKFLOW.md` sind unverändert.

## Subagent: Auftrag, Ergebnis und eigene Prüfung

**Auftrag.** Ein günstiger Haiku-Subagent sollte eine reine Lese-Inventur aller
sichtbaren deutschen Begriffe in `prototype/web/index.html` erstellen: eine
Tabelle mit Zeilennummer, Kategorie, Text und Fundort, plus eine getrennte
Liste der nicht sichtbaren Treffer (IDs, Save-Key, Kommentare). Ausdrücklich
verboten: jede Dateiänderung, jede Produktentscheidung, jeder Umbenennungs-
vorschlag, Commit und Push.

**Ergebnis.** Der Subagent hat korrekt nichts verändert und keine
Produktentscheidung getroffen. Die Inventur selbst war jedoch **nicht
verwendbar**: Statt der verlangten Zeilentabelle kamen nur Aggregatzahlen; die
Kategorie „HTML-Markup 227+" zählte offensichtlich Kommentare mit, und die
Bossleiste in Zeile 402 wurde als „nicht sichtbar (aria-hidden)" eingestuft,
obwohl genau dort `Warden`/`Aschenhüter` für den Spieler stehen.

**Meine Prüfung und Konsequenz.** Ich habe die Einstufung stichprobenartig
gegen den Quelltext geprüft, den Widerspruch bei Zeile 402 gefunden und die
Inventur daraufhin **selbst** mit gezielten Greps über alle Begriffe der
Mandatsliste erstellt. Aus dem Subagentenergebnis habe ich nur zwei Hinweise
übernommen und beide selbst verifiziert: die Toast-Zeilen und die
Berichtszeilen. Es wurde **kein Subagentencode** in das Repository übernommen.

## Vorher-/Nachher-Parität

Serialisiert werden neun Referenzseeds in drei Varianten (8-Minuten-Lauf,
3-Minuten-Lauf mit `breach`, absichtlicher Frühverlust), dazu vier
Hold-Auszahlungen über den echten Weg, die XP-Kurve an acht Stufen, die
Zieldichte an fünf Zeitpunkten sowie `CFG`, `HOLD_CFG`, Vertragswerte,
Waffen-, Passiv- und Ausrüstungs-IDs.

| Messpunkt | vorher | nach Gate 1 | nach Gate 2 | nach Gate 4 |
|---|---|---|---|---|
| SHA256 der Serialisierung | `978beffd…b6f9` | identisch | identisch | **identisch** |
| Bytes | 30.808 | 30.808 | 30.808 | 30.808 |
| Vertragswerte `reward`/`hp`/`bias` | — | unverändert | unverändert | unverändert |

Nur die **Namen** der drei Verträge unterscheiden sich; alle Zahlen sind
gleich. Damit sind Seeds, RNG-Reihenfolge, Kartenzüge, Evolutionen, Kills,
Beute, Dichte, Boss und Hold-Auszahlung nachweislich unberührt.

## Befehle, Exitcodes und grüne Checks

| Befehl | Ergebnis | Exitcode |
|---|---|---:|
| `npm test` (Baseline vor Gate 1) | 45/45 grün | 0 |
| `npm test` (final) | **47/47 grün** | **0** |
| `git diff --check` | keine Ausgabe | 0 |
| Paritätsvergleich nach jedem Gate | Hash unverändert | 0 |

Neu hinzugekommen sind zwei Checks:

**`presentationLayer`** — prüft die Abbildung als Verhalten, nicht als
Quelltext: Vollständigkeit gegen die Laufzeitarrays, tatsächliche Anwendung der
Namen, unveränderte interne IDs, den Save-Key `emberhold:hold:v1`, einen
verlustfreien v4-Rundlauf durch `localStorage`, einen Run-Bericht mit neuen
Namen und **ohne** interne IDs sowie dass `LEX` eingefroren ist.

**`renderCostContract`** — misst am echten `render()`-Aufruf mit 300 gespawnten
und 281 sichtbaren Gegnern plus AEGIS:

| Größe | gemessen | Bedeutung |
|---|---:|---|
| `drawImage` im ersten Frame | 308 | es wird wirklich gezeichnet |
| Gradienten je Frame | **2** | konstant, wächst nicht mit der Gegnerzahl |
| `shadowBlur`-Setzungen je Frame | **0** | keine teure Weichzeichnung im Pulk |
| neue Canvas je Frame | **0** | alle Sprites sind vorgerendert |

Bestehende Paritäts-, Boss-, HUD-, Hold-, Vertrags-, Ausrüstungs- und
Save-Checks sind unverändert grün: `configStable`, `aspectIndependent`,
`densityOvershoot`, `bossTargeting`, `bossDurability`, `bossCombatPocket`,
`bossLocatorState`, `compactCombatHud`, `holdFlow`, `holdExpansion`,
`contractFlow`, `equipmentFlow`, `earlyLossGuard`, `lateProgression`,
`weaponRoles`, `evolutionCompletion`, `weaponDamageReport`.

Drei bestehende Checks leiten ihre Namenserwartung jetzt aus `LEX` ab statt aus
fest eingetippten Begriffen: `holdGoalLadder`, `compactCombatHud` und
`weaponDamageReport`. Keine Schwelle wurde gelockert, kein Anker neu
referenziert.

## Browserprüfungen

Der sichtbare Browser rendert in dieser Umgebung **echte Frames**. Alle
folgenden Zahlen stammen aus `getImageData` am laufenden Canvas, nicht aus
einem Screenshot.

**1280×720** — Canvas 1920×1080, 24 Frames gezeichnet:

- keine einzige Überlagerung zwischen `topbar`, `sectorhud`, `clock`,
  `pausebtn`, `slots`, `dash`, `bossbar`, `hpwrap`, `xpwrap`, `devbtn`,
  `tunebtn`; nichts außerhalb des Fensters, kein horizontaler Überlauf
- **94 %** der Stichproben heller als Schwellwert 60; mittlere Bodenfarbe
  RGB(77, 73, 78) mit Blaustich — der Kampfboden ist messbar mittelhell
- Spielerbereich: 289 goldene, 520 weiße und 28 cyanfarbene Bildpunkte —
  eine weißgoldene Figur, kein Kreis

**844×390** — Canvas 1266×585, Safe-Area 75 px je Seite:

- keine Überlagerung, weder mit noch ohne aktive Bossleiste
- Kampfausschnitt unverändert 1000×563 Welteinheiten
- Safe-Area-Farbe RGB(20, 26, 42) mit gekacheltem Sternenfeld

**Sichtbar bestätigt im Screenshot:** Bossleiste „AEGIS", Warnung
„SEKTORBOSS: AEGIS", Toast „Elite-Einheit nähert sich", Kartennamen
„Munitionsmatrix", „Fokussierlinse", „Orbitklinge", Stationsdeck mit
Panelfugen, Bossmarker-Chevron, kompaktes linkes HUD.

**Stationsdurchlauf im Browser:** Sonde reparieren, Asterit einsammeln,
Fabrikator reparieren, Legierungsplatten einsammeln, Orbitklinge verstärken,
Fluxlabor reparieren, Reroll vorbereiten, Simulationsdeck reparieren,
Meisterschaft lernen, Sektor wählen — alle zehn Aktionen mit unveränderten
Kosten und Erträgen.

### Nicht durchgeführte Prüfungen

- **Kein Save-Neuladen im Browser.** Die Vorschau lädt die Datei als
  `data:`-URL; `localStorage` ist dort gesperrt (`SecurityError`). Der
  v4-Rundlauf ist stattdessen im Node-Check `presentationLayer` sowie in
  `holdFlow`, `holdExpansion`, `contractFlow` und `equipmentFlow` abgedeckt.
- **Keine subjektive Grafikfreigabe.** Ich habe gemessen, dass gezeichnet wird
  und womit — ob die Figuren im Gefecht *gut aussehen*, ob der Boden angenehm
  ist und ob AEGIS im Pulk wirklich sofort auffällt, ist nicht gemessen und
  bleibt beim Besitzer.
- **Kein achtminütiger Spiellauf**, keine echte FPS-Messung auf Zielgeräten.

## Assetgrößen und Provenienz

**Es wurde keine einzige neue Bilddatei hinzugefügt.** Alle vier Kernelemente
sind code-native Canvas-Grafik, einmal vorgerendert:

| Element | Umsetzung |
|---|---|
| Orbitträger | 16 Posen (4 Idle, 6 Lauf, 6 Wurf), aufrecht, nur horizontal gespiegelt |
| Sammlerdrohne | 6 asynchrone Phasen, sechseckiger Körper, heller Kern, Sammelarme |
| AEGIS | eine große mechanische Silhouette mit Ring, Schultern und hellem Kern |
| Klingenprojektil | 24 vorgedrehte Sicheln mit physischem Kern |

Runtime-Assetstand unverändert: vier PNG-Atlanten mit zusammen **5,8 MB**,
größte Einzeldatei 1,87 MB. Beide Grenzen (rund 2 MB je Atlas, unter 10 MB
gesamt) sind eingehalten. Neuer Provenienzeintrag **AP-003**, Status PROTOTYP;
aus AP-001 und AP-002 wurde nichts ausgeschnitten.

## Risiken und offene Punkte

1. **Nicht umbenannt, weil nicht im Mandat:** die sechs Ausrüstungsteile
   (Glutsehne, Krähenbogen, Sammlersiegel, Runenfibel, Pfadstiefel,
   Rußmantel), die vier Elite-Relikte (Glutkern, Schrittzeichen, Sammlerauge,
   Aschenhaut), die Kartensaat Runenfunke und die drei Meisterschaftsnamen
   (Pfadkunde, Reichgriff, Stoßschule). Sie tragen weiterhin Fantasy-Vokabular
   und sind damit die einzige verbliebene Bruchstelle im Ziel „konsistent
   Sci-Fantasy". **Das ist eine Produktentscheidung für Codex.**
2. **Abgeleitete Namen, die Codex bestätigen sollte:** Klingenverstärkung
   (Stationsausbau), Impulsstoß (früher Ember-Stoß), Reparaturzelle (früher
   Glutherz), Flux neu ausrichten (früher Schicksal neu deuten), Aufklärung
   (früher Scharmützel) sowie die Überschriften „Systeme angehalten",
   „Bergung sichern?" und „Signal verloren". Sie folgen direkt aus dem
   Mandat, stehen aber nicht wörtlich darin.
3. **Ein echter Namenskonflikt wurde behoben:** Der dauerhafte Stationsausbau
   hieß zunächst exakt wie die Waffe „Orbitklinge" und war im HUD nicht mehr
   von einem Waffenslot zu unterscheiden. Er heißt jetzt Klingenverstärkung.
4. **Zwei echte Layoutfehler wurden nur durch Messung gefunden**, nicht durch
   Ansehen: die Bossleiste über der linken HUD-Spalte bei 844×390 und die Uhr
   auf dem Entwickler-Button bei 1280×720. Beide sind behoben — das ist ein
   Hinweis darauf, dass weitere Formate ebenfalls gemessen werden sollten.
5. **Die alten PNG-Atlanten zeigen weiterhin Fantasy-Figuren.** Sobald sie
   laden, überschreiben sie Orbitträger und Sammlerdrohne. Die neuen
   code-nativen Figuren greifen deshalb heute vor allem dort, wo die Atlanten
   fehlen. AEGIS und das Klingenprojektil sind davon **nicht** betroffen — sie
   haben Vorrang. Eine Ablösung der Atlanten ist ein eigener Auftrag.
6. **Die Frostnova-Farbe** bleibt cyan wie die Orbittechnik. Bei dichtem Pulk
   könnte das mit den Kernen der Sammlerdrohnen verschwimmen; das ist eine
   Sichtfrage für den Feldlauf.

## Empfehlung an Codex

**Abnehmen und den D-036-Feldlauf ansetzen.**

Alle vier Gates sind umgesetzt, 47/47 Checks sind grün, die Simulation ist über
neun Seeds bitidentisch geblieben, und beide Pflichtformate sind messbar
kollisionsfrei. Zwei neue Checks sichern genau das ab, was dieser Auftrag
verspricht: die Namensabbildung ohne ID-Bruch und die Renderkosten im Pulk.

Vor dem Push bitte drei Dinge entscheiden:

1. Sollen Ausrüstung, Relikte und Meisterschaften ebenfalls umbenannt werden
   (Risiko 1)? Solange nicht, ist „konsistent Sci-Fantasy" nur teilweise
   erreicht.
2. Sind die abgeleiteten Namen aus Risiko 2 so in Ordnung?
3. Soll ein eigener Auftrag die alten Fantasy-Atlanten ablösen (Risiko 5)?

Danach ist der nächste Schritt laut Produktionsreihenfolge der menschliche
Acht-Minuten-Lauf — und erst danach die echte Rückflugmechanik der
Orbitklinge.
