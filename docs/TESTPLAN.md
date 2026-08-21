# EMBERHOLD — Prototyp Phase 0

Ein Held (Aelric), ein Territorium, 8-Minuten-Run und ein kleiner funktionaler
Kraterhold. Kein Backend. Der Kampf bleibt unverändert messbar; zusätzlich wird
geprüft, ob `Sortie → Produktion → Verbesserung → Sortie` verständlich ist.

`../prototype/web/index.html` ist eigenständig — Doppelklick genügt, kein
Server, keine Installation. Läuft auf Desktop und Handy.

## Steuerung

| | |
|---|---|
| Bewegen | WASD / Pfeiltasten · mobil: links wischen |
| Ember-Stoß | Leertaste · mobil: rechts tippen |
| Karte wählen | Klick oder 1 / 2 / 3 |
| Neu ziehen | R |
| Pause | `Esc` oder `P` · Pausenbutton oben rechts |
| **T** | **Live-Tuning** — Dichte, Schaden, HP, XP-Kurve. Wirkt sofort, auch mitten im Run. |
| **F3** | Entwickler-Anzeige — FPS, Entities, Pick-Zeiten gegen die Spezifikation |

## Hold-MVP testen

1. Tiefmine kostenlos reparieren.
2. Nach 15 Sekunden das erste Erz einsammeln oder direkt ein
   3-Minuten-Scharmützel spielen.
3. Nach der Rückkehr Sortiebeute und Minenlager einsammeln.
4. Emberschmiede für 10 Erz reparieren; sie verbraucht automatisch 5 Erz je
   Barren und benötigt dafür 30 Sekunden.
5. Zwei Barren einsammeln und den Wächterbogen verstärken.
6. Im nächsten Run muss links `Wächterbogen +10 %` erscheinen.
7. Arkanum für 15 Erz reparieren, Essenz sammeln und für 2 Essenz einen
   zusätzlichen Reroll vorbereiten. Der nächste Run startet dann mit 2 statt 1.
8. Übungshof für 3 Barren reparieren, Trainingsmarken sammeln und einen der
   drei Utility-Pfade lernen. Die Meisterschaft muss im nächsten Run links
   sichtbar sein und den angegebenen Wert verändern.
9. Seite neu laden: Ressourcen, Gebäude, Vorbereitung und Meisterschaften
   müssen erhalten sein.

Die kurzen Timer dienen nur dazu, den vollständigen Loop innerhalb weniger
Minuten zu testen. Die langfristigen GDD-Zeiten sind noch nicht aktiv.

## Automatisierter Balance-Vertrag

`npm test` lädt den echten Headless-Spielpfad ohne zusätzliche
Projektabhängigkeiten. GitHub Actions führt denselben Test bei relevanten
Änderungen automatisch aus.

Getestet werden neun feste Seeds: 1701, 1709, 1721, 1733, 1741, 1753, 1777,
1789 und der Feldtest-Seed 2474367456. Der aktuelle Stand:

| Größe | Ist | Vertrag |
|---|---:|---:|
| Erster Kartenzug, Mittelwert | 26,5 s | 25–45 s; Zielwert 35 s |
| Kartenzüge in 8 Min, Mittelwert | 20,56 | 21 ± 3 |
| Rhythmus pro Minute | 1,56 · 2,00 · 2,22 · 1,89 · 2,44 · 2,44 · 3,00 · 5,00 | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kartenzüge bei −10 % XP-Kosten | 28,44 | — |
| Kartenzüge bei +10 % XP-Kosten | 18,44 | — |
| Verhältnis der beiden Varianten | 1,542 | ≤ 1,75 |
| Runs mit Evolution | 3 / 9 | mindestens 2 / 9 |
| Elite-Reliktwahlen | 2 in 9 / 9 Runs | exakt 2 pro vollständigem Run |

Ein Wiederholungslauf mit demselben Seed muss bitgenau dasselbe Ergebnis
liefern. Der Test endet mit Fehlercode, sobald ein Korridor oder diese
Reproduzierbarkeit verletzt wird.

Die neun Baseline-Runs werden mit einer fokussierten, aber nicht
allwissenden Kartenstrategie gespielt. Mindestens zwei davon müssen in einer
normalen 8-Minuten-Sortie eine Evolution abschließen. Ab 7:30 hält das Angebot
einen bereits begonnenen Evolutionspfad als eine von drei optionalen Karten
sichtbar; die Voraussetzungen bleiben Waffenstufe 5 plus Passivstufe 3.
`evolutionCatalog` erzwingt außerdem ein Angebot und die Kernmechanik jedes
der sechs Pfade. `eliteChoices` prüft den Weg vom Elite-Kill zur einmaligen
3er-Auswahl, alle vier Relikteffekte und die zweite Entscheidung nach dem Boss.

Seit D-017 führt der Test `resize()` tatsächlich aus und prüft fünf
Querformate mit demselben Seed:

| Fenster | SCALE | Kampfausschnitt | Safe-Area je Seite | Zieldichte 8:00 |
|---|---:|---|---:|---:|
| 1000×700 (Referenz) | 1,000 | 1000 × 700 | 0 px | 301 |
| 1280×720 | 1,280 | 1000 × 563 | 0 px | 301 |
| 1536×864 | 1,536 | 1000 × 563 | 0 px | 301 |
| 844×390 | 0,693 | 1000 × 563 | 75 px | 301 |
| 2560×1080 (21:9) | 1,920 | 1000 × 563 | 320 px | 301 |

Vier Prüfungen hängen daran:

- `aspectIndependent` — bitgenau identische Laufergebnisse über alle Formate.
- `minCombatHeight` — mindestens 562 sichtbare Welteinheiten Höhe. Ohne die
  Deckelung bei 16:9 fiel 844×390 auf 462 und 21:9 auf 422.
- `bossInsideCombat` — der Warden-Einstieg (280 Welteinheiten) liegt innerhalb
  des Kampfausschnitts. **Achtung:** Die Reserve beträgt ab 16:9 nur 1,25
  Einheiten; siehe den offenen Vorbehalt in D-017.
- `telemetrySeparated` — die Rendertelemetrie erreicht die Simulation nicht.
- `visibleCountsCulling` — `render()` wird im Shim wirklich ausgeführt: Ein
  Gegner außerhalb des Kampfausschnitts, aber innerhalb des Simulationskreises,
  erscheint nur in `nearbyEnemies`. Der Lauf deckt beide Renderpfade ab, mit
  und ohne seitliche Safe-Area.

`holdExpansion` prüft zusätzlich die Save-v2→v3-Migration, deterministische
Offline-Produktion des Arkanums und Übungshofs, deren Lagerkappen, maximal zwei
vorbereitete Rerolls, steigende Meisterschaftskosten und die Isolation aller
Hold-Boni aus der Seed-Baseline.

Hochformat ist laut D-017 kein unterstützter Kampfmodus und wird bewusst nicht
geprüft; der geplante „Gerät drehen"-Hinweis steht unter P0.3.

**Simulations- und Rendertelemetrie sind zwei verschiedene Zahlen.** Wer sie
verwechselt, misst das Falsche:

| Größe | Bedeutung | Hängt am Fenster? | Darf in die Balance? |
|---|---|---|---|
| `nearbyEnemies` | Gegner im festen Kreis `SIM_DIAG*1.15`, steuert das Nachspawnen | nein | **ja, ausschließlich diese** |
| `peakNearbyEnemies` | Spitzenwert davon über den Run | nein | ja |
| `visibleEnemies` | Gegner, die das Render-Culling wirklich durchlässt | ja | nein |
| `peakVisibleEnemies` | Spitzenwert davon über den Run | ja | nein |

Entwickleranzeige (`F3`), Performancebericht und Run-Bericht weisen Gesamtzahl,
Simulationsradius und sichtbare Gegner getrennt aus. Im Node-Test bleiben die
Renderwerte zwangsläufig auf 0, weil nicht gerendert wird — genau das prüft
`telemetrySeparated`. Ein realer Wert für `peakVisibleEnemies` entsteht erst im
manuellen Run.

Der Check `configStable` verlangt zusätzlich, dass die gesamte
Balancekonfiguration nach `runBalanceSuite()` exakt dem Ausgangszustand
entspricht. Die Suite verstellt `XP_C` für ihre Sensitivitätsläufe bewusst; ein
nicht zurückgesetzter Wert würde jede spätere Messung still entwerten (D-018).

Zusätzlich prüft derselbe abhängigkeitfreie Test den UX-Fluss: Ein
3-Minuten-Scharmützel muss im gleichen Modus neu starten, der kopierbare
Run-Bericht muss seine Pflichtfelder enthalten und `D` darf nicht erneut mit
der Entwickleranzeige kollidieren. Pause und Fortsetzen müssen den Run zudem
im selben Modus und ohne Zustandsverlust weiterführen.

Der zusätzliche Hold-Check prüft Mine und Schmiede mit festen Zeitstempeln,
lokale Speicherung, die einmalige Auszahlung einer Run-Belohnung, Rückkehr in
den Hold und die Übernahme des +10-%-Schadensbonus in den nächsten Run. Die
Kampf-Balance-Suite läuft immer ohne Hold-Bonus.

Der Check `contractFlow` prüft zusätzlich die Sortietafel aus P0.5.1:

- Ein alter Hold-Spielstand ohne Vertragsfeld migriert verlustfrei auf
  Save-Version 2 und wählt den Wächterring als sicheren Standard.
- Die Auswahl eines Vertrags bleibt nach Speichern und Laden erhalten.
- Sturmbruch verändert bei identischem Seed reproduzierbar die Verteilung der
  Gegnerfamilien und zahlt den ausgewiesenen Erzbonus genau einmal aus.
- Ein Headless-Lauf ohne expliziten Vertrag verwendet immer den Wächterring und
  bleibt bitgenau mit der bisherigen Balance-Referenz identisch.

Manuell müssen die drei Vertragskarten im Hold auf Desktop und Mobil lesbar
sein. Im Run müssen Vertragsname und leicht veränderte Bodenstimmung erkennbar
bleiben, ohne Gegner- oder Telegrafiefarben zu überdecken.

Der Visual-Smoke-Check stellt zusätzlich sicher, dass die drei aktiven
Raster-Assets (`aelric-atlas-v2.png`, `enemy-atlas-v1.png` und
`enemy-swarmer-atlas-v2.png`) als echte RGBA-PNGs vorhanden sind, der
Bildlader eingebunden ist und ein Langbogenschuss den rein visuellen
Release-Zustand auslöst.

Der letzte technische Browser-Smoke mit dem animierten Schwärmer erreichte
vorläufig mindestens 59 FPS bei 53 sichtbaren Gegnern nach ungefähr 30
Sekunden. Diese frühe Messung ist weder der vollständige 8-Minuten-Stresstest
noch die P0.3-Abnahme auf echten Referenzgeräten.

**Einordnung dieser Zahl (gemessen am 21.08.2026, aktualisiert nach D-017).**
53 Gegner ist nicht irgendein Zwischenwert, sondern praktisch das *Minimum* des
gesamten Runs. Seit der Entkopplung nach D-017 ist die Zieldichte auf allen
Querformaten identisch:

| Zeitpunkt | Zieldichte | Spitze im Feld | max. gezählt |
|---|---:|---:|---:|
| 0:30 | 42 | — | — |
| 8:00 | 301 | 382 | 355 |

Der alte Smoke-Wert von 53 Gegnern stammt aus einem 16:9-Fenster vor der
Entkopplung und ist damit doppelt überholt. Entscheidend bleibt: Die Dichte
steigt über den Run um etwa das Siebenfache, der Schwärmer stellt ab etwa 3:00
die Mehrheit dieser Figuren. Die FPS-Abnahme muss deshalb ausdrücklich das
Fenster **6:00–8:00** abdecken; eine Messung bei 0:30 ist für P0.3 ohne
Aussagekraft.

## Manueller Grafikcheck

1. Aelric muss beim Laufen alle vier Kontaktphasen zeigen, immer aufrecht
   bleiben und bei einem horizontalen Richtungswechsel sauber spiegeln.
2. Kurz vor einem Langbogenschuss ist die gespannte Pose sichtbar; beim Schuss
   folgen Release-Linie, Rückstoßpose und Pfeil.
3. Die fünf Gegnerfamilien müssen auch ohne Farblegende an ihrer Silhouette
   unterscheidbar sein. Schwärmer müssen zusätzlich vier klar verschiedene,
   asynchron laufende Beinkontaktphasen zeigen.
4. Gegner bleiben ebenfalls aufrecht und spiegeln horizontal, ohne bei einem
   Richtungswechsel sichtbar aus ihrer Position zu springen.
   Entfernung und Lichtkreis dürfen sie niemals durch Kreise oder abstrakte
   Silhouetten ersetzen oder am Bildschirmrand nachträglich abdunkeln.
5. Beim Stürmer muss die rote Laufbahn exakt dem folgenden Sprint entsprechen;
   beim Speier muss die violette Ziellinie vor dem Projektil sichtbar sein.
6. Teiler (grüne Teilungsbögen), Wahrer (goldener Zielrahmen) und Elite
   (orangefarbener Prioritätsrahmen) bleiben auch im Gegnerpulk erkennbar.
7. Beim Mittelboss erscheinen eine kurze Regelwarnung, rote Angriffsflächen,
   die goldene sichere Lücke und eine dauerhafte Warden-Lebensanzeige.
8. Falls Bilder nicht laden, müssen prozedurale Figuren erscheinen und der Run
   weiterhin spielbar bleiben.
9. Auf einem Monitor über 60 Hz muss die Weltbewegung auch zwischen zwei
   Gameplay-Ticks weiterlaufen; die Visual Clock hängt am Browser-Frame.
   Die Rasterposen selbst dürfen bewusst mit etwa 10 Bildern/s wechseln und
   dabei keine halbtransparenten Doppelkonturen erzeugen.
10. Aelrics dunkle Rüstung und normale Gegner müssen auf dem mittelgrauen
    Basalt auch außerhalb des warmen Lichtkerns als Silhouette lesbar bleiben.
11. Schnelle Richtungswechsel dürfen Aelric nicht um 90 oder 180 Grad kippen
   lassen. Nur Zielhilfen und Projektile dürfen frei rotieren.
12. Sobald der Boss in Waffenreichweite ist, zielt der nächste Langbogenpfeil
   auf ihn und erreicht ihn auch durch normale Gegner hindurch.
13. Dauerhaftes Stehen im Gegnerpulk muss deutlich riskanter sein als Kiten;
   Fernkampf darf keinen Nahkampf-Build voraussetzen, um den Boss zu besiegen.
14. Vor der Animation der nächsten Gegnerfamilie einen vollständigen
    8-Minuten-Run spielen. Run-Bericht und schlechteste FPS kopieren und
    zusätzlich notieren, ob Schwärmer bei hoher Dichte ruhig, geerdet und ohne
    synchrones Marschieren wirken.
15. Erst wenn dieser Lauf keine neue Rotations-, Sichtbarkeits- oder deutliche
    Performance-Regression zeigt, darf der Stürmer als nächste Familie
    animiert werden.

Die Einzelruns streuen derzeit stark: erster Zug 21,0–30,7 Sekunden und
10–35 Kartenzüge. Der Vertrag bewertet deshalb vorerst den Seed-Mittelwert;
die Streuung bleibt ein Tuningthema vor dem externen Spieltest.

Nach D-017 sind im manuellen Grafikcheck zusätzlich drei Sichtfragen zu
beantworten, die keine Messung ersetzen kann:

1. Wirkt der Kampfausschnitt auf 16:9 (1000 × 563 statt 1000 × 700
   Welteinheiten) zu eng? Fällt das Urteil negativ aus, ist Pillarboxing bis zur
   vollen Referenzhöhe der dokumentierte Gegenentwurf.
2. Sieht die seitliche Safe-Area auf Formaten breiter als 16:9 ruhig und
   gerahmt aus — oder wirkt sie wie ein abgeschnittenes Bild?
3. Ist der Warden beim Einstieg vollständig sichtbar? Bei senkrechtem Einstieg
   ist ein Anschnitt zu erwarten (Reserve nur 1,25 Welteinheiten).

Die alte manuelle Browserreferenz mit 1.039 Gegnern ist nach D-014 ungültig.
FPS und tatsächliche Spitzenzahl müssen mit dem reduzierten Entity-Budget neu
auf Desktop und echten Mobilgeräten gemessen werden.

## Was der Prototyp bereits enthält

- 6 Waffen, 8 Passive und 6 unterschiedliche Evolutionen
- 5 Gegnerfamilien mit **unterschiedlichen Bewegungsmustern**, nicht nur Werten
- Elite mit eigener 3er-Reliktwahl bei 2:00 und 6:00, Mittelboss mit
  ausweichbaren Mustern bei 4:10,
  Schatzflut bei 7:00, Extraktion bei 8:00 mit Overtime-Angebot
- Ember-Stoß mit 0,35 s Unverwundbarkeit
- Lichtradius, der mit der Buildstärke wächst
- Nicht blockierendes First-Run-Onboarding und deutliche Warden-Ankündigung
- Klarer Extraktions-/Neustartfluss mit kopierbarem Run-Bericht
- Kraterhold mit Tiefmine, Emberschmiede, Arkanum und Übungshof
- Lokale Offline-Produktion mit 24-Stunden-Kappe
- Erste dauerhafte Hold→Run-Verbesserung über den Wächterbogen
- Herstellbare zusätzliche Rerolls und drei kleine Utility-Meisterschaften
- Balanceziele für vier Run-Längen (3 / 8 / 15 / 20 Min); die Phase-0-UI bietet
  bewusst nur 3 und 8 Minuten an
- Regel 1 umgesetzt: Tod kostet nur den Overtime-Bonus, nie die Basis

## Bekannte Abweichungen

1. **Der erste Zug liegt am frühen Rand des Korridors.** 25,4 Sekunden im
   Mittel sind akzeptiert, aber noch nicht das Designzentrum von 35 Sekunden.
2. **Die Build-Streuung ist hoch.** Ein starker Build schneeballt weiterhin.
   Die ±10-%-Prüfung kippt die mittlere Kartenzahl nicht mehr um Faktor zwei,
   einzelne Seeds liegen aber weit auseinander.
3. **Der Test-Bot beendet den Run selten.** Er plant 0,45 s voraus und wählt
   aus 16 Richtungen — ein Mensch ist deutlich besser. Die Zahl sagt wenig
   über die tatsächliche Schwierigkeit; dafür brauchst du echte Spieler.
4. **15- und 20-Minuten-Runs sind noch nicht über die Start-UI erreichbar.**
   Ihre Zielwerte sind bereits definiert, sie sind aber nicht Teil des
   Phase-0-Spieltests.
5. Kein Ton. Bewusst — Phase 0 testet Bewegung und Rhythmus.

## Der Fehler, der am meisten Zeit gekostet hat

Das räumliche Hash-Gitter (`cellHead`) wird nur in `rebuildGrid()` mit −1
initialisiert, ist beim Laden aber mit Nullen gefüllt. Die allererste
Nachbarschaftsabfrage lief dadurch in eine Endlosschleife `0 → 0 → 0` und
der Browser fror ein — aber nur beim allerersten Aufruf, danach nie wieder.
Fix: `new Int32Array(CFG.NCELLS).fill(-1)` plus `cellHead.fill(-1)` bei
jedem Run-Start.

## Abbruchkriterium aus dem GDD

> Wenn zehn externe Testpersonen nicht freiwillig einen zweiten Run starten,
> wird das Projekt hier beendet. Nicht angepasst — beendet.

Das ist der Zweck dieses Builds. Schick ihn herum, bevor irgendetwas
anderes gebaut wird.
