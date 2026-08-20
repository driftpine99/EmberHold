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

Getestet werden acht feste Seeds: 1701, 1709, 1721, 1733, 1741, 1753, 1777
und 1789. Der aktuelle Stand:

| Größe | Ist | Vertrag |
|---|---:|---:|
| Erster Kartenzug, Mittelwert | 25,4 s | 25–45 s; Zielwert 35 s |
| Kartenzüge in 8 Min, Mittelwert | 23,38 | 21 ± 3 |
| Rhythmus pro Minute | 1,75 · 2,13 · 2,63 · 2,13 · 2,13 · 3,00 · 3,88 · 5,75 | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kartenzüge bei −10 % XP-Kosten | 18,75 | — |
| Kartenzüge bei +10 % XP-Kosten | 16,38 | — |
| Verhältnis der beiden Varianten | 1,145 | ≤ 1,75 |

Ein Wiederholungslauf mit demselben Seed muss bitgenau dasselbe Ergebnis
liefern. Der Test endet mit Fehlercode, sobald ein Korridor oder diese
Reproduzierbarkeit verletzt wird.

Zusätzlich prüft derselbe abhängigkeitfreie Test den UX-Fluss: Ein
3-Minuten-Scharmützel muss im gleichen Modus neu starten, der kopierbare
Run-Bericht muss seine Pflichtfelder enthalten und `D` darf nicht erneut mit
der Entwickleranzeige kollidieren. Pause und Fortsetzen müssen den Run zudem
im selben Modus und ohne Zustandsverlust weiterführen.

Der zusätzliche Hold-Check prüft Mine und Schmiede mit festen Zeitstempeln,
lokale Speicherung, die einmalige Auszahlung einer Run-Belohnung, Rückkehr in
den Hold und die Übernahme des +10-%-Schadensbonus in den nächsten Run. Die
Kampf-Balance-Suite läuft immer ohne Hold-Bonus.

Der Visual-Smoke-Check stellt zusätzlich sicher, dass beide lokalen
Sprite-Atlanten als echte RGBA-PNGs vorhanden sind, der Bildlader eingebunden
ist und ein Langbogenschuss den rein visuellen Release-Zustand auslöst.

## Manueller Grafikcheck

1. Aelric muss beim Laufen zwischen zwei Schritten wechseln und sich in die
   Zielrichtung drehen.
2. Kurz vor einem Langbogenschuss ist die gespannte Pose sichtbar; beim Schuss
   folgen Release-Linie, Rückstoßpose und Pfeil.
3. Die fünf Gegnerfamilien müssen auch ohne Farblegende an ihrer Silhouette
   unterscheidbar sein.
4. Gegner drehen sich in acht Richtungen, ohne bei Richtungswechseln sichtbar
   aus ihrer Position zu springen.
5. Stürmer-Telegraphie, Elite-Lebensbalken und Bosswarnungen bleiben vor dem
   detaillierteren Sprite klar lesbar.
6. Falls Bilder nicht laden, müssen prozedurale Figuren erscheinen und der Run
   weiterhin spielbar bleiben.

Die Einzelruns streuen derzeit stark: erster Zug 17,5–40,5 Sekunden und
16–40 Kartenzüge. Der Vertrag bewertet deshalb vorerst den Seed-Mittelwert;
die Streuung bleibt ein Tuningthema vor dem externen Spieltest.

Letzte manuelle Browserreferenz vor Einführung der festen Seeds: 1.039 Gegner
in der Spitze, 58 FPS auf Desktop und Handy, Bot-Überlebenszeit im Median
377 Sekunden. Diese Werte sind keine automatischen Rendering-Regressionstests.

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
