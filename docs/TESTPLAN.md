# EMBERHOLD — Prototyp Phase 0

Ein Held (Aelric), ein Territorium, 8-Minuten-Run. Keine Meta, kein Hold,
kein Backend. **Eine einzige Frage: Macht das Kämpfen Spaß?**

`../prototype/web/index.html` ist eigenständig — Doppelklick genügt, kein
Server, keine Installation. Läuft auf Desktop und Handy.

## Steuerung

| | |
|---|---|
| Bewegen | WASD / Pfeiltasten · mobil: links wischen |
| Ember-Stoß | Leertaste · mobil: rechts tippen |
| Karte wählen | Klick oder 1 / 2 / 3 |
| Neu ziehen | R |
| **T** | **Live-Tuning** — Dichte, Schaden, HP, XP-Kurve. Wirkt sofort, auch mitten im Run. |
| **D** | Entwickler-Anzeige — FPS, Entities, Pick-Zeiten gegen die Spezifikation |

## Automatisierter Balance-Vertrag

`npm test` lädt den echten Headless-Spielpfad ohne zusätzliche
Projektabhängigkeiten. GitHub Actions führt denselben Test bei relevanten
Änderungen automatisch aus.

Getestet werden acht feste Seeds: 1701, 1709, 1721, 1733, 1741, 1753, 1777
und 1789. Der aktuelle Stand:

| Größe | Ist | Vertrag |
|---|---:|---:|
| Erster Kartenzug, Mittelwert | 25,4 s | 25–45 s; Zielwert 35 s |
| Kartenzüge in 8 Min, Mittelwert | 22,25 | 21 ± 3 |
| Rhythmus pro Minute | 1,75 · 2,13 · 2,63 · 2,13 · 2,13 · 2,50 · 3,13 · 5,88 | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kartenzüge bei −10 % XP-Kosten | 21,5 | — |
| Kartenzüge bei +10 % XP-Kosten | 17,0 | — |
| Verhältnis der beiden Varianten | 1,265 | ≤ 1,75 |

Ein Wiederholungslauf mit demselben Seed muss bitgenau dasselbe Ergebnis
liefern. Der Test endet mit Fehlercode, sobald ein Korridor oder diese
Reproduzierbarkeit verletzt wird.

Die Einzelruns streuen derzeit stark: erster Zug 17,5–40,5 Sekunden und
16–42 Kartenzüge. Der Vertrag bewertet deshalb vorerst den Seed-Mittelwert;
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
