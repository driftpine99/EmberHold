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

## Was gemessen wurde (automatisierter Bot, 8 Läufe je Wert)

| Größe | Ist | GDD-Soll |
|---|---|---|
| Erster Kartenzug | 31,3 s | 35 s |
| Kartenzüge in 8 Min | 18,8 | 21 |
| Rhythmus pro Minute | 1,8 · 1,4 · 1,6 · 1,9 · 1,8 · 2,4 · 2,9 · 5,1 | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kills pro Run | 7.900 | — |
| Spitze Gegner auf dem Schirm | 1.039 | ≤ 1.500 |
| FPS Desktop / Handy | 58 / 58 | ≥ 55 |
| Überlebenszeit (Bot) | Median 377 s | — |

Der Rhythmus trifft die **Form** (dünn früh, dicht spät), nicht jede
Einzelzahl. Die Streuung zwischen Läufen ist hoch, weil unterschiedliche
Builds unterschiedlich schnell hochlaufen — das ist genretypisch.

## Was der Prototyp bereits enthält

- 6 Waffen, 6 Passive, 2 Evolutionen (Windriss, Höllenschlund)
- 5 Gegnerfamilien mit **unterschiedlichen Bewegungsmustern**, nicht nur Werten
- Elite bei 2:00 und 6:00, Mittelboss mit ausweichbaren Mustern bei 4:10,
  Schatzflut bei 7:00, Extraktion bei 8:00 mit Overtime-Angebot
- Ember-Stoß mit 0,35 s Unverwundbarkeit
- Lichtradius, der mit der Buildstärke wächst
- Vier Run-Längen (3 / 8 / 15 / 20 Min)
- Regel 1 umgesetzt: Tod kostet nur den Overtime-Bonus, nie die Basis

## Bekannte Abweichungen

1. **Erster Kartenzug bei 31 s statt 35 s**, 18,8 statt 21 Kartenzüge.
   Über den T-Regler „XP-Kosten" justierbar.
2. **Die Schleife ist bistabil.** Ein starker Build schneeballt: 10 % Änderung
   an den XP-Kosten halbiert oder verdoppelt die Kartenzüge. Gedämpft über
   `HP_PER_LVL` (Gegner-HP wächst mit der Spielerstufe), aber nicht beseitigt.
   Für Phase 1 relevant.
3. **Evolution verlangt Waffe 5 + Passiv 3**, nicht 5 + 5 wie im GDD.
   Gemessen: bei 5 + 5 kam in 8 Läufen keine einzige Evolution zustande.
4. **Der Test-Bot beendet den Run selten.** Er plant 0,45 s voraus und wählt
   aus 16 Richtungen — ein Mensch ist deutlich besser. Die Zahl sagt wenig
   über die tatsächliche Schwierigkeit; dafür brauchst du echte Spieler.
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
