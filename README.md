# Orbitblade

> **Technischer Projektname:** Repository, GitHub-Pages-URL, Save-Key und
> interne IDs heißen vorerst weiter Emberhold. Der sichtbare Name Orbitblade
> ist laut D-037 eine bewusste Besitzerentscheidung, aber noch nicht marken-
> oder store-rechtlich freigegeben.

Orbitblade ist ein reines Solo-PvE-Spiel aus kurzen Bullet-Heaven-Sortien und
einer kleinen lokalen Orbitalstation. Im Run baut der Orbitträger aus Waffen,
Passivmodulen und Evolutionen einen Build; Bergungswert und Asterit treiben
zwischen den Läufen Reparaturen, Ausrüstung und Vorbereitung der Station an.

## Aktueller Stand

Der Phase-0-Prototyp enthält drei Sektoren, sechs Waffen mit vollständigen
Evolutionspfaden, acht Passivmodule, fünf Gegnerfamilien, Eliten,
**SEKTORBOSS: AEGIS**, Extraktion und Overtime. Die Orbitalstation besitzt
Asteroidensonde, Materiefabrikator, Fluxlabor, Simulationsdeck,
Ausrüstungsbucht und Sternenkarte mit lokalem Save v5 und begrenzter
Offline-Produktion.

D-043 ist technisch umgesetzt, hat die sichtbare Produktabnahme aber nicht
vollständig bestanden. Die neue Kulisse und SVG-Station bleiben als Grundlage.
Die Orbitklinge fliegt bislang jedoch geradlinig statt wie im Konzept um ein
Ziel und zum Spieler zurück. Die Station sieht räumlicher aus, bietet aber
noch keinen ausreichend langen oder bedeutsamen Fortschritt.

D-044 / EH-2026-08-26-01 ist deshalb der aktive nächste Slice:

- echte HINAUS-/ORBIT-/RÜCKKEHR-Bewegung der namensgebenden Waffe;
- kleiner moderner Space-Feinschliff des ruhigen Hintergrunds;
- Save v6 mit zwölf sichtbaren Modulprojekten und angeheftetem Ausbauziel;
- ungefähr eine relevante Freischaltung je ein bis zwei erfolgreiche Runs;
- Waffenfokus, Banish, Impulsstoß-Sidegrades, gezielte Ausrüstung und
  bestehende Signal-/AEGIS-/NEXUS-Missionen;
- flüssiger Stationsbesuch mit einer Aktions-Tray und einmaligem
  Auto-Einsammeln statt mehrerer Drawer-Wechsel.

Asterit und Stationsdaten bleiben die Rekonstruktionsmittel; es entsteht keine
neue Währung. Backend, Ton und Monetarisierung bleiben außerhalb des Scopes.
Der aktuell ausgelieferte Stand steht weiterhin bei 60/60 grünen Checks,
Botanker 19,78 ±3 und 18 bitidentischen D-043-Baseline-Fingerprints.


Die Produktfrage der Phase 0 lautet:

> Macht ein Run genug Spaß, dass Testpersonen freiwillig sofort einen zweiten
> Run starten?

## Prototyp starten

- Online: [GitHub Pages](https://driftpine99.github.io/EmberHold/prototype/web/)
- Lokal: `prototype/web/index.html` im Browser öffnen; Installation und
  Server sind nicht nötig.
- In der Orbitalstation den **Trümmerring** wählen und die Sortie starten.
- Bewegen: WASD/Pfeiltasten; mobil links wischen.
- Impulsstoß: Leertaste; mobil rechts tippen.
- Karten: 1, 2, 3 oder antippen.
- Pause: `Esc`, `P` oder der Button oben rechts.

## Automatischer Balance-Test

Mit installiertem Node.js 20 oder neuer:

```text
npm test
```

Der Test benötigt keine Projektabhängigkeiten. GitHub Actions führt ihn bei
relevanten Änderungen automatisch mit neun festen Zufalls-Seeds aus.

## Repository-Struktur

```text
CLAUDE.md                Projektübergabe und Arbeitsregeln für Claude Code
.github/                 Issue- und Pull-Request-Vorlagen
docs/
  GAME_DESIGN.md         Vollständiges Game Design Document
  TESTPLAN.md            Testanleitung und bekannte Abweichungen
  BALANCING.xlsx         Balancing-Modell
  SYSTEM_OVERVIEW.html   Kompakte visuelle Systemübersicht
  DECISIONS.md           Verbindliche Projektentscheidungen
  WORKFLOW.md            Rollen und Ablauf für Codex und Claude
  CURRENT_TASK.md        Einziger aktiver Claude-Arbeitsauftrag
  WORK_REPORT.md         Standardisierte Rückgabe an Codex
prototype/
  web/
    index.html            Spielbarer Phase-0-Prototyp
    assets/               Lokale Figuren- und Gegneratlanten
tools/
  crop-horizontal-atlas.cjs Zuschnitt horizontaler Animationsstreifen
  extract-atlas-alpha.cjs Reproduzierbare Transparenzaufbereitung
  run-balance-suite.mjs   Abhängigkeitsfreier Balance-Test
package.json              Lokale Testbefehle
CHANGELOG.md              Nachvollziehbare Änderungen
ROADMAP.md                Aktueller Entwicklungsplan
```

## Entwicklungsprinzipien

- Solo-PvE, keine Ranglisten, Gilden, PvP- oder Koop-Systeme.
- Der Kernfortschritt funktioniert lokal und ohne Onlinekonto.
- Den Hold nur in kleinen, messbaren Produktionsketten erweitern.
- Keine neue Engine, bevor der Phase-0-Test bestanden ist.
- Kleine Änderungen mit klaren Abnahmekriterien.
- `main` enthält nur startbare und geprüfte Versionen.
- Für Phase 0 ist der ausführbare Laufzeitvertrag die Balancequelle; ein
  gemeinsamer Datenexport folgt erst nach bestandenem Spieltest-Gate.

## Nächster Meilenstein

Die nächsten Aufgaben stehen in [ROADMAP.md](ROADMAP.md). Das vollständige
Konzept befindet sich in [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md), die
praktische Testanleitung in [docs/TESTPLAN.md](docs/TESTPLAN.md).

## Lizenz

Aktuell ist keine Open-Source-Lizenz vergeben. Sämtliche Rechte bleiben bei den
jeweiligen Urhebern, bis eine bewusste Lizenzentscheidung getroffen wurde.
