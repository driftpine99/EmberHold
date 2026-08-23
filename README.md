# Project Emberhold

> **Arbeitstitel:** Vor Store-Auftritt, Domainkauf oder öffentlichem Marketing
> wird ein neuer Name gewählt und geprüft. „Emberhold“ ist bereits anderweitig
> im Spielemarkt belegt.

Project Emberhold ist ein reines Solo-PvE-Spiel, das Idle-RPG-Progression mit
kurzen Bullet-Heaven-Runs verbindet. Die Festung produziert und fertigt
Ausrüstung, die den Kartenpool im Kampf verändert. Kämpfe erobern wiederum die
Territorien, welche die Festung versorgen.

## Aktueller Stand

Das Projekt befindet sich im Übergang vom **Kampfprototyp zum kleinen
Hold-Validierungsslice**.

Der aktuelle Build enthält einen Helden, ein Territorium, sechs Waffen mit
vollständigen Evolutionspfaden, acht Passive, fünf Gegnerfamilien, Eliten,
einen Mittelboss,
Extraktion und Overtime. Hinzu kommt ein bewusst kleiner Kraterhold mit
Tiefmine, Emberschmiede, Arkanum, Übungshof, lokaler Speicherung,
Offline-Produktion, herstellbaren Rerolls und drei Utility-Meisterschaften.
Aelric nutzt inzwischen einen konsistenten
4×3-Raster-Atlas mit Idle-, Lauf- und Bogenphasen; Gegner besitzen eigene
Silhouetten und Blickrichtungen. Die Weltposition bleibt an den Browser-Frame
gekoppelt, während klar getaktete Einzelposen Doppelbilder vermeiden. Ein
hellerer, ruhiger Basaltboden und eine dezente Ascheaufhellung trennen dunkle
Figuren vom Untergrund. Der häufige Schwärmer besitzt als erster Gegnertyp
einen echten Vier-Phasen-Laufzyklus; weitere Familien folgen erst nach seinem
Spieltest. Backend, Ton und Monetarisierung bleiben weiterhin außerhalb des
Scopes.

Die Sortietafel bietet inzwischen drei Verträge: den unveränderten
Wächterring, den schnellen Sturmbruch und die robuste Aschengruft. Auswahl,
Gegnergewichtung, Risikomodifikator und Erzbonus bleiben über den lokalen
Spielstand erhalten und werden im Run-HUD sowie Bericht ausgewiesen.
Elite-Kills öffnen bei 2:00 und 6:00 eine eigene Auswahl aus drei Run-Relikten;
die zweite Wahl schafft bewusst eine neue Buildentscheidung zwischen Warden
und Extraktion.

Jede mindestens drei Minuten gespielte Sortie bringt außerdem ein Teil für die
Rüstkammer. Ein früher Abbruch behält seine erspielte Basis-Beute, liefert aber
keinen garantierten Ausrüstungsfund. Sechs feste Teile verteilen sich auf drei
Slots, Duplikate werden sofort zu Runenstaub und Ränge werden gezielt statt über
Fusionen erhöht. Die seltene Runenfibel sät mit Runenfunke eine eigene Karte in
das Angebot des nächsten Runs.

Die einzige Produktfrage der Phase 0 lautet:

> Macht ein Run genug Spaß, dass Testpersonen freiwillig sofort einen zweiten
> Run starten?

## Prototyp starten

1. `prototype/web/index.html` im Browser öffnen.
2. Im Hold die **Tiefmine reparieren** und eine Sortie wählen.
3. Mit WASD oder Pfeiltasten bewegen.
4. Den Ember-Stoß mit der Leertaste auslösen.
5. Karten mit 1, 2 oder 3 wählen.
6. Mit `Esc`, `P` oder dem Pausenbutton pausieren und fortsetzen.

Der Prototyp ist eigenständig und benötigt für den lokalen Test keine
Installation und keinen Server.

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
