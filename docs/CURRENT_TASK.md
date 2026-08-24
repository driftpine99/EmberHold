# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-24-01
- **Thema:** D-036 – Späte Progression und Waffenrollen
- **Status:** **ABGENOMMEN_DURCH_CODEX**
- **Auftraggeber und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P0 – vor dem nächsten Feldlauf
- **Ausgangscommit:** `676506ffe24b8168fc7adb614d13a89811d34bef`
- **Ausgangsstatus:** Arbeitsbaum sauber, `npm test` 43/43 grün
- **Rückgabe:** `docs/WORK_REPORT.md`
- **Nicht committet, nicht gepusht.**

## Ausgangslage aus dem Feldtest vom 24.08.2026

Manueller 8-Minuten-Lauf: 23.787 Kills, Level 47, 46 Kartenzüge, erster
Kartenzug nach 33,8 s, 3 Evolutionen. Pfeilregen 55 % des Gesamtschadens,
Rundenklinge Stufe 4 nur 291 Gesamtschaden. Schlechteste FPS 57, 1-%-Low 60,
0 % unter 55 FPS. Warden-Schwierigkeit angemessen, reduzierte Gegnerzahl
während des Warden-Kampfes positiv.

Subjektiv: Der frühe Fortschritt fühlt sich gut an. Ab der zweiten Runhälfte
entsteht eine XP-/Stärke-Schneeballkurve, der Spieler wird praktisch
unbesiegbar. Pfeilregen wirkt zu dominant, die Rundenklinge ist das Risiko der
Nahdistanz nicht wert. Evolutionen sind planbar geworden; dieser Fortschritt
soll erhalten bleiben.

## Verbindliche Produktziele

1. Der erste Kartenzug bleibt unverändert; angestrebt 30–38 Sekunden.
2. Die späte XP-Kurve wird erst oberhalb von Level 20 weich gebremst.
3. Manueller Zielkorridor für einen vollständigen 8-Minuten-Lauf:
   28–34 Kartenzüge, typischerweise 1–2 Evolutionen; 3 Evolutionen dürfen ein
   außergewöhnlich guter Run bleiben.
4. Kein harter Level- oder Kartenzug-Deckel.
5. Pfeilregen bleibt eine starke Flächen-Evolution, aber nicht mehr automatisch
   die beste Wahl.
6. Rundenklinge bleibt eine riskante Nahbereichs-DPS-Waffe und wird keine
   Fernkampfwaffe.
7. Keine Projektilabwehr, Unverwundbarkeit oder zusätzliche Schadensreduktion
   für die Rundenklinge – der Spieler ist bereits zu sicher.
8. Warden, Warden-Adds, Gegnerdichte, Hold, Verträge, Ausrüstung, HUD,
   Safe-Areas, Animationen und Grafik bleiben unverändert.

## Freigegebener Scope

### A. XP-Kurve

- Bis einschließlich Level 20 bleibt der XP-Bedarf exakt unverändert.
- Ab Level 21 stetige, nachvollziehbare späte Verteuerung. Keine harte Sperre,
  kein plötzlich sichtbarer Sprung.
- Keine XP-Werte einzelner Gegner ändern, wenn die zentrale Levelkurve genügt.
- `BOT_PICK_REF`, `PICK_TARGETS` und Testtoleranzen nicht ändern, nur damit
  Tests grün werden.
- Deterministischer Progressionstest: frühe Kosten identisch; das XP-Budget,
  das bisher Level 47 erreichte, landet neu bei Level 30–34; First-Pick-Test,
  Baseline-Isolation und CFG-Stabilität bleiben bestehen.

### B. Pfeilregen

- Ausschließlich die Evolution ändern, nicht den normalen Splitterköcher.
- Nur **eine** Schadensdimension um ungefähr 15–20 % absenken.
- Vorher-/Nachher-Werte in einem reproduzierbaren Benchmark festhalten.

### C. Rundenklinge

- Zuerst prüfen, ob die 291 Schadenspunkte aus einem Treffer-/Hitboxproblem
  oder aus der Abstimmung stammen; dafür ein festes, deterministisches
  Nahbereichsszenario bauen.
- Liegt ein Funktionsfehler vor, zuerst diesen beheben und erneut messen.
- Ziel: im definierten Benchmark ungefähr 2–3× wirksamer als vorher.
- Keine gestapelten Buffs, keine Defensive, keine Rüstung.
- Prüfen, dass die stärkere Klinge keine neue XP-Schneeballkurve auslöst.

### D. Waffentelemetrie

Run-Bericht erweitern um Zeitpunkt der ersten Aufnahme je Waffe, aktive Zeit
je Waffe, Schaden je aktiver Sekunde und den Zeitpunkt der Evolution. Keine
neuen Allokationen in Treffer- oder Schwarm-Hot-Loops, feste Arrays im
Run-State, Berechnung erst beim Erzeugen des Berichts, keine neuen
HUD-Elemente, bestehende Spielstände weiterhin tolerieren.

Frostnova ist eine Kontrollwaffe und wird nicht allein anhand ihres geringen
Rohschadens balanciert.

### E. Regressionen

Unverändert bleiben insbesondere Warden-HP und Warden-Angriffslogik, die
reduzierte Add-Dichte während der Bossphase, Spawn- und Dichtekurve,
Seitenverhältnis-Unabhängigkeit, `baselineIsolated`, `configStable`, die
bestehenden Hold-, Vertrag-, Ausrüstungs- und Save-Migrationstests, die
deterministischen Seeds und der prozedurale Grafik-Fallback ohne `Image` im
Node-Testpfad.

## Außerhalb des Scopes

HUD, abgeschnittene Seitenflächen und allgemeine Optik gehören ausdrücklich
**nicht** in diesen Auftrag. Ebenso wenig neue Gegner, Waffen, Karten,
Relikte, Grafiken, Audio, Backend oder ein Enginewechsel.

## Verlangte Nachweise

`npm test`, `git diff --check`, Anzahl bestandener Checks, First-Pick vorher
und nachher, durchschnittliche Kartenzüge vorher und nachher, Evolutionen
vorher und nachher, Dichte- und Peakwerte, synthetischer Level-47-Budgettest,
Pfeilregen-Benchmark, Rundenklingen-Benchmark, Bestätigung dass Warden und
Boss-Adds unverändert sind, sowie `git diff --stat`.

## Übergabe

`docs/WORK_REPORT.md` enthält den vollständigen Bericht. `ROADMAP.md`,
`docs/DECISIONS.md`, `docs/TESTPLAN.md` und `CHANGELOG.md` bleiben bewusst
unverändert – diese synchronisiert Codex nach unabhängiger Prüfung. Es wurde
nichts committet und nichts gepusht.

## Codex-Abnahme vom 24.08.2026

Codex hat Spielcode, Testcode und Claudes Bericht unabhängig geprüft. Als
Review-Nacharbeit wurde der bestehende Check `weaponDamageReport` um die
vollständige `Waffenverlauf`-Zeile mit Aufnahmezeit, aktiver Zeit, Rate,
Evolution und Ausschluss inaktiver Waffen ergänzt.

`npm test` besteht mit **45/45 Checks**, `git diff --check` ist sauber. D-036
ist technisch abgenommen. Offen bleibt ausschließlich der im Testplan
beschriebene vollständige Besitzerlauf; er ist kein neuer Claude-Auftrag.
