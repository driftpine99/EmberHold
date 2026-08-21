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
7. Seite neu laden: Ressourcen, Gebäude und Verbesserung müssen erhalten sein.

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
| Kartenzüge in 8 Min, Mittelwert | 21,78 | 21 ± 3 |
| Rhythmus pro Minute | 1,78 · 2,22 · 2,22 · 2,22 · 2,56 · 2,22 · 3,11 · 5,44 | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kartenzüge bei −10 % XP-Kosten | 17,67 | — |
| Kartenzüge bei +10 % XP-Kosten | 15,11 | — |
| Verhältnis der beiden Varianten | 1,169 | ≤ 1,75 |
| Runs mit Evolution | 5 / 9 | mindestens 2 / 9 |

Ein Wiederholungslauf mit demselben Seed muss bitgenau dasselbe Ergebnis
liefern. Der Test endet mit Fehlercode, sobald ein Korridor oder diese
Reproduzierbarkeit verletzt wird.

Die neun Baseline-Runs werden mit einer fokussierten, aber nicht
allwissenden Kartenstrategie gespielt. Mindestens zwei davon müssen in einer
normalen 8-Minuten-Sortie eine Evolution abschließen. Ab 7:30 hält das Angebot
einen bereits begonnenen Evolutionspfad als eine von drei optionalen Karten
sichtbar; die Voraussetzungen bleiben Waffenstufe 5 plus Passivstufe 3.

Zusätzlich prüft derselbe abhängigkeitfreie Test den UX-Fluss: Ein
3-Minuten-Scharmützel muss im gleichen Modus neu starten, der kopierbare
Run-Bericht muss seine Pflichtfelder enthalten und `D` darf nicht erneut mit
der Entwickleranzeige kollidieren. Pause und Fortsetzen müssen den Run zudem
im selben Modus und ohne Zustandsverlust weiterführen.

Der zusätzliche Hold-Check prüft Mine und Schmiede mit festen Zeitstempeln,
lokale Speicherung, die einmalige Auszahlung einer Run-Belohnung, Rückkehr in
den Hold und die Übernahme des +10-%-Schadensbonus in den nächsten Run. Die
Kampf-Balance-Suite läuft immer ohne Hold-Bonus.

Der Visual-Smoke-Check stellt zusätzlich sicher, dass die beiden aktiven
Sprite-Atlanten als echte RGBA-PNGs vorhanden sind, der Bildlader eingebunden
ist und ein Langbogenschuss den rein visuellen Release-Zustand auslöst.

## Manueller Grafikcheck

1. Aelric muss beim Laufen alle vier Kontaktphasen zeigen, immer aufrecht
   bleiben und bei einem horizontalen Richtungswechsel sauber spiegeln.
2. Kurz vor einem Langbogenschuss ist die gespannte Pose sichtbar; beim Schuss
   folgen Release-Linie, Rückstoßpose und Pfeil.
3. Die fünf Gegnerfamilien müssen auch ohne Farblegende an ihrer Silhouette
   unterscheidbar sein.
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

Die Einzelruns streuen derzeit stark: erster Zug 21,0–30,7 Sekunden und
10–35 Kartenzüge. Der Vertrag bewertet deshalb vorerst den Seed-Mittelwert;
die Streuung bleibt ein Tuningthema vor dem externen Spieltest.

Die alte manuelle Browserreferenz mit 1.039 Gegnern ist nach D-014 ungültig.
FPS und tatsächliche Spitzenzahl müssen mit dem reduzierten Entity-Budget neu
auf Desktop und echten Mobilgeräten gemessen werden.

## Was der Prototyp bereits enthält

- 6 Waffen, 6 Passive, 2 Evolutionen (Windriss, Höllenschlund)
- 5 Gegnerfamilien mit **unterschiedlichen Bewegungsmustern**, nicht nur Werten
- Elite bei 2:00 und 6:00, Mittelboss mit ausweichbaren Mustern bei 4:10,
  Schatzflut bei 7:00, Extraktion bei 8:00 mit Overtime-Angebot
- Ember-Stoß mit 0,35 s Unverwundbarkeit
- Lichtradius, der mit der Buildstärke wächst
- Nicht blockierendes First-Run-Onboarding und deutliche Warden-Ankündigung
- Klarer Extraktions-/Neustartfluss mit kopierbarem Run-Bericht
- Kraterhold mit Tiefmine, Emberschmiede und zwei sichtbar gesperrten Slots
- Lokale Offline-Produktion mit 24-Stunden-Kappe
- Erste dauerhafte Hold→Run-Verbesserung über den Wächterbogen
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
