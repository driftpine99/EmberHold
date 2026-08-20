# Project Emberhold

> **Arbeitstitel:** Vor Store-Auftritt, Domainkauf oder öffentlichem Marketing
> wird ein neuer Name gewählt und geprüft. „Emberhold“ ist bereits anderweitig
> im Spielemarkt belegt.

Project Emberhold ist ein reines Solo-PvE-Spiel, das Idle-RPG-Progression mit
kurzen Bullet-Heaven-Runs verbindet. Die Festung produziert und fertigt
Ausrüstung, die den Kartenpool im Kampf verändert. Kämpfe erobern wiederum die
Territorien, welche die Festung versorgen.

## Aktueller Stand

Das Projekt befindet sich in **Phase 0: Kampfprototyp**.

Der aktuelle Build enthält einen Helden, ein Territorium, mehrere Waffen und
Passive, fünf Gegnerfamilien, Eliten, einen Mittelboss, Evolutionen,
Extraktion und Overtime. Der Hold, das Backend und die Monetarisierung gehören
bewusst noch nicht zu dieser Phase.

Die einzige Produktfrage der Phase 0 lautet:

> Macht ein Run genug Spaß, dass Testpersonen freiwillig sofort einen zweiten
> Run starten?

## Prototyp starten

1. `prototype/web/index.html` im Browser öffnen.
2. **Ausrücken** wählen.
3. Mit WASD oder Pfeiltasten bewegen.
4. Den Ember-Stoß mit der Leertaste auslösen.
5. Karten mit 1, 2 oder 3 wählen.

Der Prototyp ist eigenständig und benötigt für den lokalen Test keine
Installation und keinen Server.

## Repository-Struktur

```text
.github/                 Issue- und Pull-Request-Vorlagen
docs/
  GAME_DESIGN.md         Vollständiges Game Design Document
  TESTPLAN.md            Testanleitung und bekannte Abweichungen
  BALANCING.xlsx         Balancing-Modell
  SYSTEM_OVERVIEW.html   Kompakte visuelle Systemübersicht
  DECISIONS.md           Verbindliche Projektentscheidungen
prototype/
  web/
    index.html            Spielbarer Phase-0-Prototyp
CHANGELOG.md              Nachvollziehbare Änderungen
ROADMAP.md                Aktueller Entwicklungsplan
```

## Entwicklungsprinzipien

- Solo-PvE, keine Ranglisten, Gilden, PvP- oder Koop-Systeme.
- Der Kernfortschritt funktioniert lokal und ohne Onlinekonto.
- Erst den Kampf testen, danach den Hold bauen.
- Keine neue Engine, bevor der Phase-0-Test bestanden ist.
- Kleine Änderungen mit klaren Abnahmekriterien.
- `main` enthält nur startbare und geprüfte Versionen.
- Balancingwerte sollen langfristig aus einer gemeinsamen Datenquelle stammen,
  die Spiel und Simulation verwenden.

## Nächster Meilenstein

Die nächsten Aufgaben stehen in [ROADMAP.md](ROADMAP.md). Das vollständige
Konzept befindet sich in [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md), die
praktische Testanleitung in [docs/TESTPLAN.md](docs/TESTPLAN.md).

## Lizenz

Aktuell ist keine Open-Source-Lizenz vergeben. Sämtliche Rechte bleiben bei den
jeweiligen Urhebern, bis eine bewusste Lizenzentscheidung getroffen wurde.
