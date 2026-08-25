# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-25-01
- **Thema:** Letzten Run-Bericht lokal sichern
- **Status:** **TECHNISCH_ABGENOMMEN_DURCH_CODEX** (25.08.2026)
- **Auftraggeber:** Besitzer
- **Ausführung und Abnahme:** Codex
- **Priorität:** P0 – verlustfreie Feldtest-Telemetrie
- **Startstand:** `main` bei `2ed75f2`, Arbeitsbaum sauber

## Ausgangslage

Der erste vollständige D-036/D-038-Besitzerlauf wurde am 25.08.2026
erfolgreich kopiert. Beim unmittelbar vorherigen Lauf wurde der Bericht jedoch
vor Beginn des nächsten Runs nicht kopiert und ging verloren. Der Prototyp
speichert bisher nur Station und Onboarding; der vollständige Run-Bericht lebt
nur im aktuellen Laufzustand `S` und wird beim nächsten Run überschrieben.

Der neue Feldlauf mit Seed `1818720884` ist technisch sauber: Trümmerring,
acht Minuten, unverändertes Tuning, 24 Kartenzüge, Stufe 25, zwei Evolutionen,
57 schlechteste FPS, 60 FPS im 1-%-Low und keine Probe unter 55 FPS. Die sechs
subjektiven Antworten aus `docs/TESTPLAN.md` stehen noch aus. Dieser Auftrag
ändert deshalb ausdrücklich keine Balance.

## Ziel

Nach jedem abgeschlossenen Run wird genau dessen fertig formatierter Bericht
automatisch lokal gespeichert. In der Orbitalstation kann der letzte Bericht
erneut in die Zwischenablage kopiert werden, auch nachdem ein neuer
Laufzustand erzeugt oder die Seite neu geladen wurde.

## Scope

- eigener lokaler Schlüssel `emberhold:run-report:v1`, getrennt von Save v4;
- ausschließlich letzter abgeschlossener Bericht, keine Run-Historie;
- Speichern erst nach finalem Ergebnis und finaler Belohnungsbuchung;
- Stationsaktion nur sichtbar, wenn ein gültiger Bericht vorhanden ist;
- derselbe robuste Clipboard-Fallback wie im Ergebnisdialog;
- ungültige, leere oder zu große gespeicherte Daten still verwerfen;
- Verhaltenstest für Speichern, Neuladen, Überschreiben von `S` und
  Sichtbarkeit der Stationsaktion;
- Dokumentation des Besitzerlaufs und des Qualitätsfixes.

## Unverhandelbare Grenzen

- Keine Änderung an Balance, RNG, Simulation, Spawn, Waffen oder Boss.
- Keine Änderung der Hold-Save-Version oder vorhandener Save-Felder.
- Kein Backend, Konto, Upload oder externe Übertragung.
- Keine Run-Historie, Statistikseite oder neue Meta-Ökonomie.
- Bestehende Spielstände müssen unverändert weiter funktionieren.

## Abnahme

1. Ein abgeschlossener Run speichert den vollständigen Bericht lokal.
2. Der Bericht überlebt neuen Laufzustand und Seiten-Neuladen.
3. Die Orbitalstation zeigt nur bei vorhandenem gültigem Bericht eine
   verständliche Kopieraktion.
4. Ergebnisdialog und Stationsaktion kopieren jeweils den richtigen Text.
5. Fehler oder gesperrter Browser-Speicher blockieren das Spiel nicht.
6. `npm test` vollständig grün; `git diff --check` sauber.
7. Browser-Smoke mindestens bei 1280×720 und 844×390.

## Feldlaufentscheidung

Der Bericht ist quantitativ erfasst, aber das D-036-Spielgefühl-Gate bleibt
bis zu den sechs Antworten des Besitzers offen. Vorher keine neue Waffenbalance
und keinen Content freigeben.

## Abnahmeergebnis

- `npm test`: **48/48 Checks**, einschließlich `lastRunReportFlow`;
- `git diff --check`: sauber;
- letzter Bericht überlebt Abschlussframe, neuen Laufzustand und simulierten
  Reload;
- separater Schlüssel, Save v4 und Balance bleiben unverändert;
- ungültige oder nicht schreibbare lokale Daten blockieren das Spiel nicht.

Der sichtbare Browser-Smoke konnte in dieser Sitzung nicht wiederholt werden,
weil sowohl Browser- als auch Windows-Steuerung am lokalen
Windows-Sandbox-Helfer scheiterten. Die Änderung ist klein, strukturell mobil
abgesichert und wird ausgeliefert; der Besitzer prüft nach dem nächsten
abgeschlossenen Pages-Run, ob die Stationsaktion sichtbar und bedienbar ist.
