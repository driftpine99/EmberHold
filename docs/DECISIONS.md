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

- XP-Kosten: `82 × Level^0,70`
- Evolution: Waffenstufe 5 + zugehöriges Passiv Stufe 3
- Zielzüge für 3 / 8 / 15 / 20 Minuten: 5 / 21 / 39 / 50
- erster Zug: Zielwert 35 Sekunden; akzeptierter Mittelwert der festen
  Seed-Suite 25–45 Sekunden
- neun feste Seeds einschließlich eines echten Feldtest-Seeds; ±10 %
  XP-Kosten dürfen die mittlere Zahl der Kartenzüge nicht um mehr als Faktor
  1,75 auseinanderziehen

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
sechzehn Blickrichtungen umgerechnet. Der Frame-Pfad bleibt bei einem gecachten
`drawImage` je Gegner. Prozedurale Platzhalter bleiben als Fehler-Fallback
erhalten. Aelrics wenige Schlüsselposen werden zeitbasiert überblendet; eine
separate Visual Clock hält diese Übergänge auch auf Displays über 60 Hz weich.
Animationen ändern keine Trefferflächen, Werte, Zufallsfolgen oder Spawnlogik.
Pfeile, Treffer-, Licht- und Bosswarn-Effekte bleiben bewusst prozedural.

Die Bilder gelten als Prototyp-Assets, nicht als automatisch freigegebene
Store-Assets. Vor einer Veröffentlichung werden Herkunft, Nutzungsrechte,
visuelle Konsistenz und gegebenenfalls eine finale Neuproduktion separat
geprüft.

## D-012 – Evolution sichtbar und spät fokussierbar

**Status:** beschlossen

Eine Evolution bleibt Waffenstufe 5 plus zugehöriges Passiv Stufe 3. Der
Prototyp zeigt den Fortschritt permanent im Kampf-HUD und kennzeichnet jede
Karte, die einen aktiven Evolutionspfad voranbringt.

Ab 7:30 ersetzt das Angebot höchstens eine seiner drei Karten durch den noch
fehlenden Schritt eines bereits begonnenen Pfads. Die Wahl bleibt freiwillig;
vorher bleibt der Build vollständig zufallsgetrieben. Der späte Zeitpunkt
verhindert, dass eine frühe Evolution die XP-Kurve durch zusätzlichen Schaden
aufschaukelt.

Der CI-Vertrag verlangt mindestens zwei evolvierte Builds unter neun festen,
fokussiert gespielten 8-Minuten-Seeds. Gleichzeitig bleiben 21 ± 3 Kartenzüge
und der bestehende Sensitivitätskorridor verbindlich.

## D-013 – Verhalten vor Detail: verbindliche Gefahrensprache

**Status:** beschlossen

Spezialgegner werden nicht durch zusätzliche Sprite-Details erklärt, sondern
durch wenige prozedurale Signale mit fester Bedeutung. Rot markiert die
festgelegte Sprintbahn eines Stürmers, Violett die festgelegte Schussrichtung
eines Speiers. Grün kennzeichnet Teilung, Gold ein wertvolles Ziel und Orange
eine Elite-Priorität. Diese Geometrie bleibt unabhängig von den Raster-Assets
und funktioniert deshalb auch im Grafik-Fallback.

Eine gezeigte Angriffsrichtung ist verbindlich: Stürmer und Speier speichern
den Winkel zu Beginn ihrer Warnphase und verwenden exakt diesen Winkel für den
folgenden Angriff. Der Speier erhält dafür eine 0,55 Sekunden lange Zielphase.
Der Mittelboss ergänzt seine Bodenwarnungen um eine kurze Regelerklärung und
eine dauerhafte Lebensanzeige. Neue VFX-Assets oder Sound sind dafür nicht
erforderlich.

## D-014 – Aufrechte Rasterfiguren und Zielpriorität vor Schwarmmasse

**Status:** beschlossen

Die vorhandenen KI-Atlanten sind perspektivische Illustrationen, keine
Top-down-Richtungsframes. Held und Gegner bleiben deshalb im Bildschirmraum
aufrecht und werden ausschließlich horizontal gespiegelt. Freie 360°-Richtung
zeigen Pfeile, Bogenlinie und Telegrafien; eine komplette Rasterfigur wird nie
gedreht. Echte 4- oder 8-Richtungsanimationen benötigen später einen dafür
produzierten Atlas und werden nicht durch Rotation vorgetäuscht.

Auto-Angriffe verwenden die lesbare Priorität `Boss → Elite → nächstes Ziel`.
Ein auf den Boss gerichteter Langbogenpfeil durchschlägt normale Gegner. Der
Boss erscheint sichtbar innerhalb der Waffenreichweite; sein
Prototyp-HP-Multiplikator steigt nach Feldtest von 90 auf 120. Zusätzlicher
Boss-Schaden entfällt. Jeder Pfeil kann denselben Gegner exakt einmal treffen;
eine Feuerkugel explodiert exakt einmal und Kettenblitz besucht jedes Ziel nur
einmal. Das räumliche Hash-Gitter prüft nach dem Hash auch die echte Zelle.

Die Referenzdichte sinkt von 55 + 1.250 auf 42 + 450 Gegner in der
Sättigungsformel; das Entity-Limit sinkt von 1.500 auf 700. Im Gegenzug wird
die XP-Kurve auf `82 × Level^0,70` abgeflacht. Kontakttreffer haben 0,50 statt
0,70 Sekunden Unverwundbarkeit, Regeneration sinkt auf 0,75 HP/s und der
Kontaktfaktor steigt auf 1,10. Weniger, lesbarere Gegner bleiben dadurch
gefährlicher als eine reine, folgenlose Sprite-Wand.

Nach einem echten Run mit 28 FPS wird die Gegnerdarstellung von zwanzig
Familie×Lichtstufe-Scans auf einen sichtbaren Durchlauf reduziert. Gegner in
tiefer Dunkelheit verwenden kleine Silhouetten; passive Familienmarker werden
nur im nahen Lichtbereich gezeichnet. Der Feldtest-Seed `2474367456` ist Teil
der reproduzierbaren Suite.
