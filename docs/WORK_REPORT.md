# Claude-Arbeitsbericht

> Diese Datei wird von Claude für jeden Auftrag vollständig ersetzt. Der
> aktuelle Auftrag steht in `docs/CURRENT_TASK.md`; ältere Berichte bleiben in
> der Git-Historie erhalten.

## Steuerung

- **Task-ID:** EH-2026-08-25-02 — Kampf-Grafik und UI nach Entwurf 3 (D-040)
- **Status:** FERTIG, bereit für Codex-Review
- **Ausgangscommit:** `9190de94707f210b0ca1d7559f27fae4180f3c84`
- **Anfangsstatus:** `## main...origin/main`, Arbeitsbaum sauber, keine fremden
  Änderungen; `npm test` 48/48 grün, Exitcode 0
- **Endstand:** `npm test` **49/49 grün**, Exitcode 0; `git diff --check` sauber
- **Lokale Commits:** zwei (`46088fc`, `f711ae5`), **nicht gepusht**

## Ergebnis in einem Satz

Der Kampf sieht auf beiden Pflichtgrößen sichtbar nach Entwurf 3 aus — Deck bis
an den Rand, minimale Rand-UI, `BOSS: AEGIS` mittig, Waffen unten — und der
serialisierte Referenzlauf über neun Seeds ist dabei **bitidentisch** geblieben.

## Ergebnis je Gate

| Gate | Status | Beleg |
|---|---|---|
| A – Bestandsaufnahme | erfüllt | 48/48 vor der ersten Änderung; Referenzlauf serialisiert; Ausgangsmessung im Browser bei beiden Größen |
| B – minimale Kampf-UI | erfüllt | Keine linke Liste, sechs Waffensymbole, `BOSS: AEGIS`, Pause allein rechts; null Kollisionen gemessen |
| C – durchgehendes Deck | erfüllt | Rand 95 gegen Innen 113 bei 844×390; 77 statt 32 Bodenkacheln auf 21:9 |
| D – einheitliche Figuren | erfüllt | Vorgerenderte Phasen von 28 auf 64 |
| E – Gefahren | erfüllt | Violette Segmente, weißgoldene Lücke, rot-orange Laufbahn, violetter Bossmarker |

## Sichtbare Unterschiede gegenüber D-038

| Element | vorher (D-038) | jetzt (D-040) |
|---|---|---|
| Bildränder | Safe-Area-Balken mit Sternenkacheln und harter Cyan-Trennlinie | Deck läuft durchgehend bis an alle Ränder |
| Randhelligkeit 844×390 | 20 (fast schwarzer Balken) | **95** gegen 113 im Inneren |
| Linke Seite | permanente Textliste aus Waffen, Passiven und Fokuspfad | leer; Build nur noch in der Pause |
| Oben links | Stufe, Erfahrung, Leben | kompakter Block: grüne Lebens- und cyane Erfahrungsleiste plus Stufe |
| Oben mittig | Sektorname **oder** Bossleiste | ausschließlich `BOSS: AEGIS` mit violetter Leiste und zwei Phasenmarkern |
| Oben rechts | Pause, Uhr, FPS, Tuning | Pause und Uhr; FPS und Tuning nach unten links |
| Unten mittig | nichts | bis zu sechs Waffensymbole mit Stufe und echtem Abklingring |
| Boden | 16 kleine Paneele je Kachel, dominanter Arena-Rahmen mit fünf Ringen | vier große helle Paneele, drei feine Ringe, acht radiale Fugen |
| Gegnerfamilien | eine statische Silhouette je Familie (nur Familie 0 animiert) | fünf Maschinenkörper mit je sechs versetzten Phasen |
| AEGIS | eine statische Silhouette | sechs Phasen, violetter Kern, zwei getrennte Seitenpanzer |
| Bosswarnung | rote Linien mit Pfeilspitzen | flache violette Segmente, weißgoldene sichere Lücke |
| Bossmarker | rot-golden | violett/weißgold, klar von cyanen Projektilen getrennt |

## Bewusst nur angenähert

Entwurf 3 ist eine Zielrichtung, keine pixelgenaue Vorlage. Diese Punkte habe
ich absichtlich **nicht** übernommen:

1. **Die acht Gegner und die geringe Dichte des Bildes.** Der Auftrag verbietet
   Spawn- und Mechanikänderungen ausdrücklich. Der reale Kampf zeigt weiterhin
   rund 150 bis 280 Gegner.
2. **Die Kreuzattacke und die verwundbaren Seitenmodule.** Beides ist laut
   D-040 keine freigegebene Mechanik. Die Seitenpanzer sind reine Darstellung
   ohne eigene Trefferfläche.
3. **Das Porträt oben links.** Es bräuchte ein neues Rasterasset; der Auftrag
   verlangt code-native Umsetzung und keine neuen Dateien. Der Zustandsblock
   trägt stattdessen nur die beiden Balken und die Stufe.
4. **Die Bildschärfe und Materialtiefe des Konzepts.** Sie stammt aus einem
   generierten Rendering. Der Prototyp bleibt bewusst flach und niedrig
   aufgelöst, damit ein Pulk lesbar bleibt und nichts pro Gegner kostet.
5. **Runde Waffensymbole mit eigener Illustration.** Die Symbole tragen aktuell
   ein farbiges Feld je Waffe. Eigene Piktogramme wären ein eigener Schritt.

## Phasen und Runtime-Assets, vorher und nachher

| Größe | vorher | nachher |
|---|---:|---:|
| Orbitträger (Idle/Lauf/Wurf) | 4 + 6 + 6 = **16** | 6 + 8 + 8 = **22** |
| Gegnerfamilien | Familie 0 mit 6, Familien 1–4 je 1 statisch = **10** | 5 × 6 = **30** |
| Elite | 1 statisch | **6** |
| AEGIS | 1 statisch | **6** |
| **Summe vorgerendert** | **28** | **64** |
| Runtime-PNG-Dateien | 4 Dateien, 5,8 MB | **unverändert** 4 Dateien, 5,8 MB |

**Es wurde keine neue Rasterdatei angelegt.** Alle Figuren, das Deck, die
Waffensymbole und die Gefahrenflächen sind code-native Canvas-Grafik, einmal
vorgerendert. `docs/ASSET_PROVENANCE.md` bleibt deshalb unverändert; der
bestehende Eintrag AP-003 deckt code-native Laufzeitfiguren bereits ab.

## Beleg für unveränderte Simulation

Serialisiert werden neun Referenzseeds in drei Varianten (8-Minuten-Lauf,
3-Minuten-Lauf mit `breach`, absichtlicher Frühverlust), vier Hold-Auszahlungen
über den echten Weg, die XP-Kurve an acht Stufen, die Zieldichte an fünf
Zeitpunkten sowie `CFG`, `HOLD_CFG`, Vertragswerte und alle IDs.

| Messpunkt | vorher | nach Gate C | nach Gate E | final |
|---|---|---|---|---|
| SHA256 | `978beffd…b6f9` | identisch | identisch | **identisch** |
| Bytes | 30.808 | 30.808 | 30.808 | 30.808 |

Damit sind feste Seeds, RNG-Reihenfolge, Kartenzüge, Evolutionen, Kills, Beute,
Dichte, Spawnziel, Bossverstärkung, Save v4 und die Ökonomie nachweislich
unberührt. `renderCostContract` blieb über alle Gates bei **zwei Gradienten,
null `shadowBlur` und null neuen Canvas pro Frame** bei 281 sichtbaren Gegnern.

## Befehle, Exitcodes und Checks

| Befehl | Ergebnis | Exitcode |
|---|---|---:|
| `npm test` (Baseline) | 48/48 grün | 0 |
| `npm test` (final) | **49/49 grün** | **0** |
| `git diff --check` | keine Ausgabe | 0 |
| Paritätsvergleich nach jedem Gate | Hash unverändert | 0 |

**Neuer Check `combatUiV2`**, sieben Teilprüfungen:

| Teilprüfung | Ergebnis |
|---|---|
| `keineLinkeListe` | grün |
| `waffenleisteVorhanden` (inklusive Obergrenze sechs) | grün |
| `bossTitelKorrekt` (`BOSS: AEGIS`, kein `SEKTORBOSS`) | grün |
| `keineSafeAreaBalken` | grün |
| `deckVorDemClip` | grün |
| `phasenzahlen` (idle 6, walk 8, throw 8, foe 6) | grün |
| `deckBisZumRand` — **Verhaltensmessung** | grün: 77 Kacheln auf 21:9 gegen 32 auf 16:9, Safe-Area 320 px |

Die siebte Teilprüfung habe ich ergänzt, weil die ersten sechs reine
Quelltextsuchen sind. Sie misst am echten `render()`-Aufruf, dass das Deck
tatsächlich über den Kampfausschnitt hinausreicht — das könnte keine Textsuche
belegen.

## Browserprüfungen

Der Browser rendert in dieser Umgebung echte Frames. Alle Zahlen stammen aus
`getBoundingClientRect` und `getImageData` am laufenden Canvas.

**1280×720** (Canvas 1920×1080, 60 Frames):

- **null Kollisionen** zwischen `topbar`, `vitals`, `clock`, `pausebtn`,
  `bossbar`, `weaponbar`, `dash`, `devbtn`, `tunebtn`; nichts außerhalb des
  Fensters, kein horizontaler Überlauf
- 91 % helle Bildpunkte; Rand links 61, rechts 62, innen 69
- 1,22 ms je Frame bei 182 sichtbaren Gegnern
- sechs Waffensymbole, `BOSS: AEGIS`, zwei Phasenmarker

**844×390** (Canvas 1266×585, 60 Frames):

- **null Kollisionen**, nichts außerhalb, kein Überlauf
- 99 % helle Bildpunkte; Rand links und rechts 95, innen 113
- 0,87 ms je Frame bei 152 sichtbaren Gegnern
- Kampfausschnitt unverändert 1000 × 563 Welteinheiten

**Zustände geprüft:** Start, Run, Kartenwahl, Elite-Modulwahl, Pause,
Ergebnisbildschirm und Rückkehr zur Station. **Keine Browserfehler** in allen
Durchläufen (`window.onerror` blieb leer).

**Bildrate:** Die gemessenen 0,87 bis 1,22 ms je Frame entsprechen rechnerisch
über 800 Bildern pro Sekunde. Das ist eine reine Zeichenmessung ohne
Spiellogik, Vsync und Compositing — **kein FPS-Wert eines echten Laufs**. Ein
belastbarer 1-%-Low aus einem späten Laufabschnitt ist so nicht zu gewinnen;
der bleibt dem Besitzerlauf vorbehalten.

**Screenshots:** Ich habe in der Sitzung Bildschirmaufnahmen beider Größen
erstellt und ausgewertet; sie zeigen Deck bis zum Rand, `BOSS: AEGIS` mittig,
Waffenleiste unten, AEGIS mit Seitenpanzern und die violetten Warnsegmente.
**Es wurden keine Bilddateien im Repository abgelegt** — der Auftrag verlangt
ausdrücklich, Bilder nicht ungefragt zu committen.

### Nicht durchgeführte Prüfungen

- **Kein achtminütiger Spiellauf**, daher kein echter FPS-Wert und kein
  1-%-Low aus einem späten Abschnitt.
- **Keine subjektive Freigabe.** Ich habe gemessen, dass gezeichnet wird, womit
  und wo — ob es dem Besitzer gefällt, ist nicht gemessen.
- **Kein Save-Neuladen im Browser**: Die Vorschau lädt als `data:`-URL,
  `localStorage` ist dort gesperrt. Abgedeckt durch `presentationLayer`,
  `holdFlow`, `holdExpansion`, `contractFlow` und `equipmentFlow` im Node-Lauf.
- **Kein Test auf echter Mobilhardware**; 844×390 wurde nur als Fenstergröße
  geprüft.

## Subagenten und eigene Prüfung

**Subagent 1 — Waffenleiste (Haiku).** Auftrag: Markup, CSS und eine
`renderWeaponBar()`-Funktion, exakte Einfügestellen vorgegeben, alles andere
verboten. Ergebnis brauchbar, aber mit zwei Abweichungen, die ich beim
Diff-Lesen gefunden habe:

1. Das Markup landete vor `#slots` statt vor `#dash`. Beide Elemente sind
   absolut positioniert und die Leiste hat `pointer-events:none`; die
   Abweichung ist funktional folgenlos. Ich habe sie belassen und dokumentiere
   sie hier.
2. Der Abklingring war **statisch** — eine feste Randfarbe, die keinen Zustand
   zeigt. Das erfüllt „verständlicher Abklingzustand" nicht. Ich habe ihn durch
   einen echten Ring ersetzt, der `S.cool` liest, auf Zwanzigstel rundet und
   nur bei sichtbarer Änderung ins DOM schreibt. Gemessen zeigt er
   unterschiedliche Werte je Waffe (0,05 bis 1,00).

**Subagent 2 — Check `combatUiV2` (Haiku).** Auftrag: ein neuer Testblock in
`tools/run-balance-suite.mjs`, sechs genau spezifizierte Teilprüfungen,
Verdrahtung an drei Stellen. Der Diff war korrekt und vollständig
spezifikationstreu. Meine Ergänzung: die siebte, verhaltensbasierte
Teilprüfung, weil sechs reine Quelltextsuchen für eine UI-Aussage zu schwach
sind.

Nach jeder Integration habe ich die volle Suite selbst ausgeführt. Kein
Subagent hat committet, gepusht oder Projektdokumentation angefasst. Art
Direction, Deck, Figuren, Gefahren, HUD-Struktur und dieser Bericht stammen vom
Hauptagenten.

## Selbst gefundene und behobene Fehler

Drei Defekte fielen erst durch Messung auf, nicht beim Ansehen:

1. **HUD-Kollision:** Meine Regeln für die Entwicklertasten standen **vor** den
   Originalen und verloren die Spezifitätsfrage. `#devbtn` behielt `top:14px`
   und lag dadurch auf dem Zustandsblock. Die Regeln stehen jetzt dahinter.
2. **Verbotene Randabdunklung:** Mein erster Deckentwurf hatte weiche
   Randverläufe. Das ist genau die von D-014 untersagte Randvignette. Entfernt;
   die Ränder sind jetzt nur noch 26 Pixel Sternenstreifen mit 16 % Deckkraft.
3. **Überlappung mit dem Onboarding:** Die Einführungsbox lag über der neuen
   Waffenleiste. Sie sitzt jetzt 74 Pixel höher.

Zusätzlich: `slotLayout` wurde kurzzeitig rot, weil meine neue `#slots`-Regel
die ursprüngliche im regulären Ausdruck überdeckte. Ich habe die Regel **hinter**
die Originalregel gelegt, statt den Check anzupassen — der Layoutvertrag bleibt
damit im Quelltext unverändert prüfbar.

## Risiken und offene Punkte

1. **Sektorname entschieden:** nicht dauerhaft sichtbar. Start-Toast, Pause und
   Run-Bericht reichen; die Kampfmitte bleibt frei.
2. **Waffenpiktogramme in der Codex-Review erledigt:** sechs eigene
   code-native Symbole ersetzen die reinen Farbfelder.
3. **Die alten PNG-Atlanten liegen weiterhin im Runtime-Ordner** und zeigen
   Fantasy-Figuren. Code-native Orbitträger-, Gegner- und AEGIS-Sprites haben
   jedoch Vorrang. Eine spätere Entfernung der ungenutzten Dateien ist ein
   eigener Aufräumschritt, kein Laufzeitblocker.
4. **Keine echte FPS-Zahl.** Die Renderzeit sieht sehr gut aus, ersetzt aber
   keine Messung im laufenden Spiel auf Zielhardware.
5. **Die Balancebefunde aus D-040 bleiben offen** — Gegnerflut, Bossdruck und
   Sternenhagel. Das war ausdrücklich nicht Teil dieses Auftrags.

## Abschließender Git-Status

```text
## main...origin/main [ahead 2]
```

`46088fc` enthält Laufzeit und Tests; `f711ae5` enthält Changelog und diesen
Arbeitsbericht. Claude hat geschützte Dateien nicht verändert.

## Empfehlung an Codex

**Abnehmen, dann den Besitzer sehen lassen.**

Alle fünf Gates sind umgesetzt, 49/49 Checks grün, die Simulation über neun
Seeds bitidentisch, beide Pflichtgrößen messbar kollisionsfrei und ohne
Browserfehler. Der sichtbare Sprung gegenüber D-038 ist groß: keine
abgeschnittenen Seiten mehr, keine linke Textwand, ein klar benannter Boss und
eine einheitliche Figurensprache mit mehr als doppelt so vielen Phasen.

Codex entscheidet über die beiden offenen UI-Punkte. Die technische
Besitzerfreigabe bleibt wegen des fehlenden vollständigen 8-Minuten-Smokes
offen.

Danach ist der nächste Schritt laut D-040 der Boss- und Dichtepass — und erst
danach der Waffenrollenpass.

## Codex-Review

Codex hat beide Commits unabhängig geprüft. Der Bericht war nach dem zweiten
Dokumentationscommit an drei Stellen veraltet: Tatsächlich wurden zwei lokale
Commits übergeben, der Arbeitsbaum war sauber und der code-native Orbitträger
hat in der Runtime Vorrang vor dem alten Atlas. Diese Angaben sind oben
korrigiert.

Produktentscheidungen:

1. Der Sektorname bleibt aus der permanenten Kampf-UI entfernt. Der vorhandene
   Start-Toast sowie Pause und Run-Bericht reichen aus.
2. Farbflächen reichen als Waffensymbole nicht. Codex hat sechs eigene
   code-native SVG-Piktogramme ergänzt.

Zusätzliche Review-Korrektur: Die Sektortönung liegt nun über dem gesamten
Deck, damit auf breiten Formaten keine neue Farbnaht an der technischen
Clip-Grenze entsteht. Der Test prüft außerdem die korrekte
Verdrahtungsreihenfolge der Piktogramme und die Tönung vor dem Clip.

Unabhängige Prüfung: `npm test` 49/49 grün, `git diff --check` sauber.
Eine eigene sichtbare Browserfreigabe war wegen der lokalen Browserverbindung
nicht möglich; deshalb bleibt der Besitzerlauf verbindlich.
