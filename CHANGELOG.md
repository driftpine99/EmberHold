# Changelog

Alle bedeutenden Projektänderungen werden in dieser Datei dokumentiert.

## Unreleased

### Added

- Repository-Grundstruktur für Dokumentation und Webprototyp
- README mit Projektstatus und Startanleitung
- Phase-0-Roadmap mit messbaren Gates
- Issue- und Pull-Request-Vorlagen
- Entscheidungsprotokoll
- Reproduzierbare Balance-Suite mit festen Seeds und GitHub-Action
- Abhängigkeitsfreier Node-Test für den integrierten Headless-Spielpfad
- Prozedurale Warden-Arena mit Basaltboden, Ember-Vents und Randpfeilern
- Lesbare Boss-Telegrafien für Ringsalve und Ansturm
- Nicht blockierendes First-Run-Onboarding und Warden-Ankündigung
- Kopierbarer Run-Bericht am Ende eines Laufs
- Abhängigkeitsfreier UX-Smoke-Test als Teil von `npm test`
- Vollständige Spielpause über Button, `Esc` oder `P`
- Kraterhold als neuer Start- und Rückkehrbildschirm
- Tiefmine und Emberschmiede als erste funktionale Produktionskette
- Lokaler Hold-Speicherstand mit deterministischer Offline-Produktion
- Dauerhafte Wächterbogen-Verbesserung für die nächste Sortie
- Hold-Flow-Prüfung für Produktion, Persistenz und einmalige Run-Auszahlung
- Konsistenter 4×3-Aelric-Atlas mit je vier Idle-, Lauf- und Bogenphasen
- Eigenständige Designs für fünf Gegnerfamilien, Elite und Warden-Boss
- Acht vorgerenderte Blickrichtungen und vier Lichtstufen pro Gegnerfamilie
- Reproduzierbare Alpha-Aufbereitung für KI-generierte Sprite-Atlanten
- Automatische Prüfung der aktiven lokalen RGBA-Assets und des Bogen-Animationszustands

### Changed

- Konzept auf reines Solo-PvE ohne PvP, Koop, Gilden oder Ranglisten festgelegt
- Cloud-Save und Backend als optionale spätere Infrastruktur definiert
- Vorhandener Browserprototyp als kanonischer Phase-0-Build einsortiert
- Phase-0-XP-Kurve, Evolution und runlängenabhängige Pick-Ziele vereinheitlicht
- Gameplay-Zufall vom Rendering getrennt und seedbar gemacht
- Rechten Warden-Arena-Entwurf als visuelle Phase-0-Kampfrichtung festgelegt
- Extraktion, Overtime, Tod und Neustart verständlicher beschriftet
- Drei-Minuten-Scharmützel startet beim Wiederholen nicht mehr als Acht-Minuten-Run
- Entwickleranzeige von `D` auf `F3` verlegt, damit WASD konfliktfrei funktioniert
- Run-Beute wird einmalig in Eisenerz umgerechnet und im Hold eingelagert
- Prozedurale Figurenplatzhalter durch lokale Raster-Art mit schnellem Fallback ersetzt
- Bogenangriff zeigt jetzt Spannungs-, Release- und Rückstoßphase
- Doppelbild-Crossfades durch klar getaktete Einzelposen bei flüssiger Weltbewegung ersetzt
- Aelrics Drehung und Bewegungsstart/-stopp mit framerateunabhängigem Easing geglättet
- Basaltboden aufgehellt, Bodendetail beruhigt und Aelric mit kühler Ascheaufhellung abgesetzt
- Gegnerausrichtung von 8 auf 16 vorgerenderte Richtungen erweitert und weich nachgeführt
- Evolutionspfade im Kampf-HUD und auf relevanten Karten sichtbar gemacht
- Späten optionalen Fokus-Schutz für fast fertige Evolutionspfade ergänzt
- CI-Vertrag um die Evolutionserreichbarkeit in 8-Minuten-Runs erweitert

### Known issues

- Das Workbook enthält noch das analytische Langfristmodell. Für Phase 0 ist
  gemäß D-006 ausschließlich der ausführbare Laufzeitvertrag verbindlich.
- Der derzeitige Arbeitstitel ist im Spielemarkt bereits belegt.
