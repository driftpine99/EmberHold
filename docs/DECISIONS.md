# Projektentscheidungen

Dieses Dokument hält verbindliche Entscheidungen fest. Änderungen benötigen
eine bewusste neue Entscheidung; sie sollen nicht beiläufig während einer
Implementierung entstehen.

## D-001 – Reines Solo-PvE

**Status:** beschlossen

Das Spiel enthält kein PvP, Koop, Matchmaking, Gilden oder globale
Bestenlisten. Persönliche Rekorde und Solo-Herausforderungen ersetzen soziale
oder kompetitive Progression.

## D-002 – Phase 0 vor Engine-Wechsel

**Status:** beschlossen

Der vorhandene Browserprototyp wird zuerst mit echten Spielern getestet. Ein
Produktionsprojekt in Defold oder einer anderen Engine beginnt erst, wenn der
aktive Kernloop das Phase-0-Gate bestanden hat.

## D-003 – Offline spielbarer Kern

**Status:** beschlossen

Der Solo-Fortschritt funktioniert lokal ohne Konto und ohne permanente
Internetverbindung. Cloud-Save, Remote Config, Analytik und Kaufprüfung können
später ergänzt werden, sind aber nicht Teil des Vertical Slice.

## D-004 – Emberhold ist nur ein Arbeitstitel

**Status:** beschlossen

Vor öffentlichem Marketing oder Store-Auftritt wird ein neuer Name ausgewählt
und auf bestehende Spiele, Marken, Domains und Store-Einträge geprüft.

## D-005 – Keine Open-Source-Lizenz zum Projektstart

**Status:** beschlossen

Der Quellcode wird zunächst ohne Open-Source-Lizenz veröffentlicht. Eine
Lizenzentscheidung erfolgt erst, wenn das Geschäftsmodell und der Umgang mit
Code und Assets feststehen.

## D-006 – Laufzeitcode ist die Phase-0-Balancequelle

**Status:** beschlossen

Für den Kampfprototyp sind die Werte in `prototype/web/index.html` verbindlich.
Das Workbook bleibt ein langfristiges Designmodell und ist keine ausführbare
Simulation des Kampfes. Abweichungen dürfen nicht stillschweigend übernommen
werden.

Der Phase-0-Vertrag lautet:

- XP-Kosten: `55 × Level^0,95`
- Evolution: Waffenstufe 5 + zugehöriges Passiv Stufe 3
- Zielzüge für 3 / 8 / 15 / 20 Minuten: 5 / 21 / 39 / 50
- erster Zug: Zielwert 35 Sekunden; akzeptierter Mittelwert der festen
  Seed-Suite 25–45 Sekunden
- acht feste Seeds; ±10 % XP-Kosten dürfen die mittlere Zahl der Kartenzüge
  nicht um mehr als Faktor 1,75 auseinanderziehen

Änderungen an diesen Regeln müssen Spielcode, GDD und Testplan gemeinsam
aktualisieren und `npm test` bestehen.

## D-007 – Kostenleitplanken bis zum Phase-0-Gate

**Status:** beschlossen

Bis echte Spieler den Kernloop bestätigt haben, gibt es keinen Engine-Wechsel,
kein Backend und keine bezahlte Produktions-Pipeline. Tests laufen ohne
Projektabhängigkeiten lokal und in GitHub Actions. KI-Agenten werden nur für
klar abgegrenzte Parallelprüfungen eingesetzt; Integration und technische
Entscheidungen bleiben zentral.

## D-008 – Kraterhold als visuelle Basisrichtung

**Status:** beschlossen

Der konzentrische Kraterhold ist die visuelle Zielrichtung für Basis und
Kampfgebiet. Im Vertical Slice werden nur Ember-Kern, innerer Produktionsring
und wenige Gebäudeslots funktional umgesetzt. Weitere Ringe bleiben sichtbare,
aber gesperrte Ruinen. So bleibt die langfristige Größe erkennbar, ohne sie
bereits produzieren zu müssen.

## D-009 – Warden-Arena als Phase-0-Kampfrichtung

**Status:** beschlossen

Der rechte Kampfentwurf mit konzentrischer Warden-Arena ist die verbindliche
visuelle Richtung für den Phase-0-Kampf. Der Prototyp setzt ihn zunächst mit
prozeduralen Basaltplatten, Warden-Ringen, Ember-Vents, Randpfeilern und roten
Boss-Telegrafien um. Diese Elemente bleiben dekorativ und verändern weder
Kollision noch Spawnfläche oder Kameralogik. Individuelle Produktions-Assets
werden erst nach bestandenem Phase-0-Gate beauftragt oder generiert.

## D-010 – Zwei-Gebäude-Hold als Browser-Validierungsslice

**Status:** beschlossen

Nach positivem internem Kampftest wird der bestehende Browserprototyp um einen
kleinen Hold-Loop erweitert. Funktional sind zunächst nur Tiefmine und
Emberschmiede: `Eisenerz → Barren → Wächterbogen +10 % Schaden`. Arkanum,
Übungshof und äußere Kraterringe bleiben sichtbar gesperrt.

Für schnelle Validierung produziert die Tiefmine 1 Erz je 15 Sekunden bis zu
20 Erz; die Schmiede verarbeitet 5 Erz in 30 Sekunden zu einem Barren und
lagert höchstens 4. Diese Testwerte ersetzen nicht die langfristigen
Multi-Clock-Zeiten des GDD. Der Zustand wird lokal gespeichert und höchstens
24 Stunden offline fortgeschrieben. Es gibt weiterhin kein Konto, Backend oder
Monetarisierungssystem.

## D-011 – Zwei KI-Atlanten als kostengünstiger visueller Testpass

**Status:** beschlossen

Diese Entscheidung ist die eng begrenzte Ausnahme zum letzten Satz von D-009.
Sie erlaubt einen visuellen Prototyp-Pass, aber noch keine Produktionspipeline.

Vor dem externen Phase-0-Test werden genau zwei lokale Raster-Atlanten
integriert: sechs Posen für Aelric sowie fünf Gegnerfamilien plus Elite und
Boss. Damit soll der Test nicht mehr durch abstrakte Kreis- und Rautenfiguren
verfälscht werden. Es entsteht weiterhin keine bezahlte Produktionspipeline.

Die Atlanten werden beim Laden einmal in kleine Sprites, vier Lichtstufen und
acht Blickrichtungen umgerechnet. Der Frame-Pfad bleibt bei einem gecachten
`drawImage` je Gegner. Prozedurale Platzhalter bleiben als Fehler-Fallback
erhalten. Animationen ändern keine Trefferflächen, Werte, Zufallsfolgen oder
Spawnlogik. Pfeile, Treffer-, Licht- und Bosswarn-Effekte bleiben bewusst
prozedural.

Die Bilder gelten als Prototyp-Assets, nicht als automatisch freigegebene
Store-Assets. Vor einer Veröffentlichung werden Herkunft, Nutzungsrechte,
visuelle Konsistenz und gegebenenfalls eine finale Neuproduktion separat
geprüft.
