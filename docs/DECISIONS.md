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
Familie×Lichtstufe-Scans auf einen sichtbaren Durchlauf reduziert. Nach der
Aufhellung des Arenabodens entfällt auch der entfernungsabhängige Kreis- und
Schatten-Fallback: Jeder sichtbare Gegner verwendet seine vollständige
Rasterfigur. Nur eine echte Angriffsphase darf eine alternative Variante
anzeigen. Dafür werden pro Familie nur noch Normal- und Warnvariante
vorgerendert. Passive Familienmarker bleiben auf den nahen Kampfbereich
begrenzt. Die nachträgliche Bildschirmrand-Vignette entfällt ebenfalls; der
warme Lichtkreis bleibt ein reiner Bodeneffekt. Der Feldtest-Seed `2474367456`
ist Teil der reproduzierbaren Suite.

## D-015 – Gemalte Low-Res-Figuren mit getrenntem Bewegungs- und Posentakt

**Status:** beschlossen

Die mittlere Stilrichtung des Grafikvergleichs wird verbindlich: moderne,
gemalte Low-Res-Sprites mit vereinfachten Formen, Graphitrüstung, kühler
Aschekante und wenigen Glutakzenten. Der Arenaboden liegt eine klar hellere
Wertestufe unter den Figuren, bleibt entsättigt und wird unter dem Kampf
detailarm gehalten. Aelric ist zusätzlich durch eine weiche, nicht als UI
lesbare Ascheaufhellung verankert.

D-015 ersetzt für Aelric den Überblendungsanteil aus D-011. Der neue 4×3-Atlas
enthält je vier Idle-, Lauf- und Bogenphasen. Die Weltposition wird weiter pro
Browser-Frame geglättet; die Rasterposen wechseln bewusst mit ungefähr zehn
Bildern pro Sekunde und werden nicht miteinander überblendet. Dadurch bleiben
Silhouette und Rüstung in jedem Moment deckend. Der Phase-0-Atlas blickt nach
rechts und wird ausschließlich horizontal gespiegelt; echte Vorder- und
Rückansichten bleiben ein späterer, eigener Produktionsschritt.

Animation, Bodenfarbe und Aschelicht verändern weder Trefferflächen noch
Kampfwerte, Zufallsfolgen oder Spawnlogik. Erst wenn Aelric im Spieltest trägt,
werden Gegnerfamilien nach demselben Verfahren neu produziert.

## D-016 – Gegneranimation familienweise statt als großer Sammelatlas

**Status:** beschlossen

Gegneranimationen werden kosteneffizient Familie für Familie validiert. Der
Schwärmer beginnt, weil er am häufigsten sichtbar ist und Laufzeitprobleme in
großen Gruppen zuerst offenlegt. Sein 4×1-Atlas enthält vier geerdete
Beinkontaktphasen, läuft mit neun Posen pro Sekunde und erhält pro Gegner einen
deterministischen Phasenversatz. Die Weltbewegung bleibt davon unabhängig und
weiterhin flüssig.

Der Kontaktschatten wird einmal in jedes kleine Laufzeit-Sprite vorgerendert;
dadurch entstehen im Schwarm keine zusätzlichen Schattenpfade pro Frame. Erst
nach positivem Sicht- und FPS-Test wird dieselbe Pipeline auf Stürmer, Speier,
Teiler und Wahrer übertragen. Die Animation verändert keine Trefferfläche,
Geschwindigkeit oder Gegnerlogik.

## D-017 – Seitenverhältnis verändert das Balancing; die CI prüft eine Größe, die niemand spielt

**Status:** beschlossen, technisch umgesetzt und automatisch abgesichert
(21.08.2026). **Die visuelle Abnahme steht aus** und erfolgt im manuellen
8-Minuten-Run: Kampfausschnitt, seitliche Safe-Area und Warden-Einstieg sind
Sichtfragen, die keine Messung beantwortet.

Bei der Vorbereitung der 8-Minuten-Abnahme des Schwärmers (ROADMAP-Punkt 1) hat
sich gezeigt, dass derselbe Spielcode je nach Fenstergröße ein anderes Balancing
liefert. `npm test` meldet `pass`, während ein normales Desktopfenster den
Vertrag verletzt.

**Mechanismus.** `resize()` in `prototype/web/index.html` (ca. Zeile 1710)
normiert `SCALE` auf die *kleinere* Fensterkante und leitet daraus drei Werte
ab: `AREA_F` skaliert die Zielgegnerzahl in `targetEnemies()`, `VIEW_DIAG`
bestimmt den Spawnradius (`VIEW_DIAG*0.96`), den Despawn-Rand
(`VIEW_DIAG*1.55`) und die Sichtprüfung (`VIEW_DIAG*1.15`). Weil `SCALE` auf die
kürzere Kante normiert, hängt das Ergebnis am **Seitenverhältnis**, nicht an der
Auflösung: 1280×720 und 1536×864 liefern identische Werte.

Der Node-Shim in `tools/run-balance-suite.mjs` setzt `clientWidth 1000`,
`clientHeight 700` und `addEventListener = noop`. Dadurch läuft `resize()` in der
CI nie, und `VIEW_W/VIEW_H/AREA_F/VIEW_DIAG` behalten ihre Startwerte
`1000 / 700 / 1 / 610`. Die CI prüft damit ein Seitenverhältnis von 10:7, das
auf keinem realen Gerät vorkommt.

**Messung** (neun Vertragsseeds, `smart`+`immortal`, `XP_C` vor jeder Messung
explizit auf 82 gesetzt, Wiederholung bitgenau identisch):

| Fenster | Dichte 0:30 | Dichte 8:00 | Spitze Gegner | max. sichtbar | Kartenzüge Ø | Evolutionen | Vertrag 21±3 |
|---|---:|---:|---:|---:|---:|---:|---|
| 1000×700 (CI/Node) | 42 | 301 | 382 | 355 | 21,78 | 5/9 | erfüllt |
| 1280×720 (16:9) | 53 | 375 | 451 | 409 | 17,44 | 3/9 | **verletzt** |
| 1536×864 (16:9) | 53 | 375 | 451 | 409 | 17,44 | 3/9 | **verletzt** |
| 390×844 (Handy hoch) | 64 | 457 | 551 | 485 | 21,11 | 4/9 | erfüllt |

**Zwei getrennte Folgen.**

1. *Balancing.* Auf 16:9 fallen die Kartenzüge um 20 % (21,78 → 17,44) und die
   Evolutionsquote von 5/9 auf 3/9. Ursache ist der größere Spawnradius: Gegner
   erscheinen weiter weg, erreichen den Spieler später, es gibt weniger frühe
   Kills und damit weniger XP. Ein größerer Bildschirm macht das Spiel also
   *langsamer*, nicht großzügiger.
2. *Renderlast.* `AREA_F` erhöht die Gegnerzahl mit der sichtbaren Fläche und ist
   bei 2,2 gedeckelt; `VIEW_DIAG` ist **nicht** gedeckelt. Auf einem hochkant
   gehaltenen Handy stehen am Ende 457 statt 301 Gegner auf dem Feld (+52 %) —
   also die höchste Last ausgerechnet auf der schwächsten Hardware. Das
   gefährdet direkt das P0.3-Ziel von mindestens 55 FPS.

**Entscheidung.** Die Simulation wird vom Seitenverhältnis entkoppelt. 1000×700
ist die feste Balance-Referenz. Umgesetzt am 21.08.2026:

- Neue Konstanten `SIM_W = 1000`, `SIM_H = 700`,
  `SIM_DIAG = hypot(SIM_W, SIM_H)/2`. Zieldichte (`targetEnemies`), Spawnring,
  Zählradius für `onScreen`, Despawnrand und der Boss-Einstiegsabstand rechnen
  ausschließlich mit diesen Werten.
- `AREA_F` und `VIEW_DIAG` sind ersatzlos entfallen. `VIEW_W` und `VIEW_H`
  existieren weiterhin, werden aber nur noch für das Render-Culling benutzt.
- `resize()` beeinflusst nur noch Darstellung, Canvas-Skalierung und Culling.
- XP-Werte, Gegnerwerte, Spawnkurven und Waffenwerte blieben unverändert. Die
  Referenzmessung ist bitgenau erhalten: erster Kartenzug 26,477777777777558 s,
  21,77777777777778 Kartenzüge, Sensitivität 1,1691176470588236, 5/9
  Evolutionen — vor wie nach der Änderung identisch.

**Darstellung: „Cover", bei 16:9 gedeckelt.** Weil der Spawnring fest ist,
würden auf breiten Fenstern Gegner sichtbar innerhalb des Bildes erscheinen.
Deshalb gilt `SCALE = max(W/SIM_W, H/SIM_H)` — allerdings nur bis 16:9. Ein
reines Cover ließ die sichtbare Höhe auf breiten Formaten immer weiter
schrumpfen (844×390 auf 462, 21:9 auf 422 Welteinheiten); das war zu wenig
vertikale Vorwarnung. Ab 16:9 bleibt der zentrale **Kampfausschnitt** deshalb
bei 1000 × 562,5 Welteinheiten stehen, und die überschüssige Breite wird ruhige
seitliche Safe-Area statt zusätzlicher Kampfraum. Welt, Gegner und Telegrafien
werden auf diesen Ausschnitt geclippt.

| Fenster | Seitenverhältnis | SCALE | Kampfausschnitt | Safe-Area je Seite |
|---|---:|---:|---|---:|
| 1024×768 (4:3) | 1,333 | 1,097 | 933 × 700 | 0 px |
| 1000×700 (Referenz) | 1,429 | 1,000 | 1000 × 700 | 0 px |
| 1280×720 · 1536×864 (16:9) | 1,778 | 1,280 / 1,536 | 1000 × 563 | 0 px |
| 844×390 (Handy quer) | 2,164 | 0,693 | 1000 × 563 | 75 px |
| 2560×1080 (21:9) | 2,370 | 1,920 | 1000 × 563 | 320 px |

Zwischen 10:7 und 16:9 wird die ganze Leinwand bespielt. Erst darüber entsteht
die Safe-Area. Die Alternative wäre Pillarboxing bis zur vollen Referenzhöhe
gewesen; sie hielte 1000 × 700 überall, kostet aber auf 16:9 spürbar Bildfläche.
Falls der Ausschnitt im Spieltest zu eng wirkt, ist das der Gegenentwurf.

**Offener Vorbehalt zum Warden-Einstieg.** `BOSS_ENTRY` beträgt 280
Welteinheiten, die halbe sichtbare Höhe ab 16:9 aber nur 281,25. Die Reserve
von 1,25 Einheiten genügt der Prüfung `bossInsideCombat`, ist aber praktisch
keine: Betritt der Warden den Ausschnitt senkrecht, wird er sichtbar
angeschnitten. Eine Absenkung auf etwa 190 Einheiten wäre die naheliegende
Korrektur, ändert aber einen Gegnerwert und braucht deshalb eine eigene
Entscheidung.

**Telemetrietrennung.** `nearbyEnemies` zählt den festen Simulationskreis
(`SIM_DIAG*1.15`) und steuert das Nachspawnen; `visibleEnemies` zählt, was das
Render-Culling wirklich durchlässt. Nur `nearbyEnemies` darf in die Balance
einfließen — `headlessRun` gibt konsequent keine Rendertelemetrie mehr zurück,
und die Prüfung `telemetrySeparated` erzwingt das.

**Hochformat ist kein unterstützter Kampfmodus.** Geprüft und garantiert werden
ausschließlich Querformate. Ein „Gerät drehen"-Hinweis für Hochformat ist unter
P0.3 in der Roadmap vermerkt.

**Absicherung.** `npm test` führt `resize()` jetzt wirklich aus und prüft
1000×700, 1280×720, 1536×864, 844×390 und 2560×1080 mit demselben Seed:

- `aspectIndependent` — bitgenau identische Laufergebnisse über alle Formate
- `minCombatHeight` — mindestens 562 sichtbare Welteinheiten Höhe
- `bossInsideCombat` — Warden-Einstieg innerhalb des Kampfausschnitts
- `telemetrySeparated` — Rendertelemetrie erreicht die Simulation nicht
- `visibleCountsCulling` — `visibleEnemies` stammt wirklich aus dem Culling

Hochformat ist kein unterstützter Kampfmodus und wird bewusst nicht geprüft.

## D-018 – Beobachtung: verschobener XP-Wert nach mehreren Suite-Läufen

**Status:** Ursache offen, Absicherung umgesetzt (21.08.2026)

Nach mehreren aufeinanderfolgenden `runBalanceSuite()`-Aufrufen und Direktläufen
in derselben Seite stand `CFG.XP_C` auf **81,18 statt 82** — exakt
`82 × 0,9 × 1,1`, also das Produkt der beiden Varianten-Faktoren. Ein sauberer
Kontrollversuch (`XP_C` auf 82 setzen, Suite laufen lassen, erneut lesen) zeigte
**kein** Leck, und es gibt im Code nur zwei Zuweisungen an `CFG.XP_C`
(Zeile 2779 setzen, Zeile 2854 im `finally` zurücksetzen), die korrekt gepaart
sind.

Die Ursache bleibt offen. Weil ein stillschweigend verschobener Balancewert jede
folgende Messung entwertet, ist die Absicherung trotzdem umgesetzt:
`runBalanceSuite()` nimmt beim Eintritt einen Schnappschuss der **gesamten**
Balancekonfiguration `CFG` und vergleicht ihn am Ende. Abweichungen lassen den
Check `configStable` und damit `npm test` rot werden. Damit ist die
Fehlerklasse dauerhaft sichtbar, unabhängig davon, welche Einzelursache sie hat.

## D-019 – Content- und Rückkehr-Slice vor dem externen Spieltest

**Status:** beschlossen (21.08.2026)

Der technische Kampfprototyp ist stabil genug für weitere Arbeit, aber der
interne Test zeigt zwei bereits bekannte Produktprobleme: Der achtminütige Run
variiert noch zu wenig, und der Zwei-Gebäude-Hold bietet nach der ersten
Bogenverbesserung fast keine Entscheidung mehr. Ein externer Test in diesem
Zustand würde vor allem diesen fehlenden Umfang bestätigen und die eigentliche
Frage nach Kampf- und Rückkehrmotivation verzerren.

Vor P0.4 wird deshalb eine begrenzte Phase 0.5 eingeschoben. Sie enthält drei
Sortieverträge, vollständige Evolutionspfade für die vorhandenen Waffen, eine
Elite-Belohnungsentscheidung, Arkanum und Übungshof sowie einen kompakten
Ausrüstungs-/Zerlegungsloop. Jedes Paket muss die Verbindung `Hold → Run → Hold`
sichtbar stärken und erhält einen eigenen Test- und Commitpunkt.

Dies ist keine Freigabe für den vollständigen Phase-1-Scope. Zweiter Held,
weitere Biome, acht Gebäude, Runen, Aufstieg, Backend, Ton und Monetarisierung
bleiben gesperrt. Gegneranimationen nach dem Schwärmer werden zurückgestellt,
bis der Content-Slice spielbar abgenommen ist. Der Standardvertrag bleibt die
unveränderte Balance-Referenz; Meta-Boni werden in der Seed-Suite weiterhin
explizit deaktiviert.

## D-020 – Drei Verträge, eine unveränderte Balance-Referenz

**Status:** beschlossen und umgesetzt (21.08.2026)

Die erste Phase-0.5-Erweiterung ist eine Sortietafel mit drei jederzeit
wählbaren Verträgen. **Wächterring** ist der bisherige Run ohne Modifikator und
bleibt die einzige verbindliche Seed-Baseline. **Sturmbruch** gewichtet Stürmer
und Speier stärker, gibt Gegnern 8 % mehr Tempo und Leben und zahlt ×1,35 Erz.
**Aschengruft** gewichtet Teiler und Wahrer stärker, gibt 18 % mehr Leben sowie
3 % Tempo und zahlt ×1,55 Erz.

Die Auswahl wird im bestehenden Hold-Spielstand als Save-Version 2 migriert,
im Hold erklärt und in HUD sowie Run-Bericht sichtbar gehalten. Verträge dürfen
Gegnerfamilien, Risiko und Hold-Ertrag verändern, aber weder XP-Kurve noch
Kartenrhythmus des Wächterrings still überschreiben. `contractFlow` prüft
Migration, Persistenz, deterministische Unterschiede, einmalige Belohnung und
die Isolation der Baseline.

## D-021 – Vollständige Buildpfade und Elite-Relikte

**Status:** beschlossen und umgesetzt (21.08.2026)

Alle sechs Waffen besitzen nun ein eigenes Endziel. Splitterköcher wird mit
Köcher zu **Pfeilregen**, Kettenblitz mit dem neuen Amulett zu **Sturmherz**,
Rundenklinge mit Federung zu **Klingenzyklon** und Frostnova mit dem neuen
Umhang zu **Ewiger Winter**. Die bisherigen Pfade Windriss und Höllenschlund
bleiben unverändert. Amulett liefert Abklingtempo, Umhang Schadensschutz; damit
ist jede Evolution weiterhin an Waffenstufe 5 plus Passivstufe 3 gebunden.

Jede der zwei Eliten erzeugt statt bloß zusätzlicher Gegnerdichte eine eigene,
pausierende 3er-Auswahl aus vier Run-Relikten. Glutkern, Schrittzeichen,
Sammlerauge und Aschenhaut verändern Schaden, Bewegung, Aufsammeln oder
Überleben nur für den laufenden Einsatz. Die zweite Elite erscheint bei 6:00
und setzt damit eine erkennbare Entscheidung nach dem Warden und vor der
Extraktion. Relikte dürfen gestapelt werden, belegen keinen Waffen- oder
Passivslot und besitzen bewusst keinen Reroll, damit sie sich von normalen
Levelkarten unterscheiden.

`evolutionCatalog` prüft Angebot und charakteristische Mechanik aller sechs
Evolutionen. `eliteChoices` prüft Kill→Belohnungs-Queue, drei verschiedene
Optionen, alle vier Effekte und exakt zwei Entscheidungen in jedem der neun
Baseline-Runs. Die zusätzliche Kartenbreite verändert den Seed-Mittelwert auf
20,56 Kartenzüge und 3/9 Runs mit mindestens einer Evolution; beide Werte
bleiben im bestehenden Vertrag.

## D-022 – Hold-Vorbereitung statt weiterer Rohschaden

**Status:** beschlossen und umgesetzt (21.08.2026)

Arkanum und Übungshof werden als drittes und viertes funktionsfähiges Gebäude
vorgezogen. Das Arkanum kostet 15 Eisenerz, produziert alle 45 Sekunden Essenz
bis zur Lagerkappe 6 und erlaubt für je 2 Essenz einen zusätzlichen Reroll für
den nächsten Run. Maximal zwei können vorbereitet werden und werden beim Start
atomar aus dem Hold-Spielstand in den Run übertragen.

Der Übungshof kostet 3 Barren und produziert alle 60 Sekunden eine
Trainingsmarke bis zur Lagerkappe 4. Marken verbessern drei Utility-Pfade auf
höchstens Stufe 2: Pfadkunde (+5 % Lauftempo), Reichgriff (+10 %
Aufsammelradius) und Stoßschule (−8 % Stoß-Abklingzeit), jeweils pro Stufe.
Die Kosten steigen von einer auf zwei Marken. Direkter Schaden bleibt bewusst
beim bestehenden Wächterbogen, damit der Hold nicht jede Kampfentscheidung
durch passiven Powercreep ersetzt.

Der lokale Save-Key bleibt kompatibel; dieser Schritt führte das Schema
zunächst auf Version 3. D-023 erweitert es verlustfrei auf Version 4.
`holdExpansion` prüft die Migration, beide Offline-Produktionen,
Zeitstempel-Idempotenz, Vorbereitungslimit, Meisterschaftskosten, Verbrauch
beim Run-Start und vollständige Isolation der Meta-Boni aus der Headless-
Balance-Referenz. Im Browser passt der Desktop-Hold bei 1440×1000 nahezu ohne
Scroll; 844×390 bleibt ohne horizontalen Überlauf vertikal bedienbar.

## D-023 – Drei Ausrüstungsslots ohne Fusionssystem

**Status:** beschlossen und umgesetzt (21.08.2026)

Jede abgeschlossene oder verlorene Sortie vergibt genau ein Ausrüstungsteil
zusätzlich zum Erz. Die Rüstkammer kennt sechs feste Einzelstücke in drei
Slots: Waffe, Talisman und Gewand. Ein bisher unbekanntes Teil wird auf Rang 1
freigeschaltet; ein bereits bekanntes Duplikat wird sofort in Runenstaub
umgewandelt. Es gibt deshalb weder Inventarkapazität noch wertlose Kopien oder
ein Fusionssystem. Nicht mehr gewünschte Teile lassen sich ebenfalls direkt
zerlegen.

Runenstaub wertet ein gezielt gewähltes Teil bis Rang 3 auf. Gewöhnliche Teile
kosten 6 beziehungsweise 12 Staub, die seltene Runenfibel 12 beziehungsweise
24. Angelegte Werte werden erst beim Start in den Run kopiert und verändern
Angriffstempo, Schaden, Aufsammelradius, Bewegung oder Schadensschutz. Die
Runenfibel ist absichtlich anders: Sie garantiert **Runenfunke** als eine von
drei Karten, bis der Spieler sie wählt. Runenfunke gibt für diesen Run +1
Mehrfachprojektil und +20 % Angriffstempo.

Der Save migriert unter demselben Key auf Version 4 und validiert Besitz,
Ränge und Slotzuordnung gegen den festen Katalog. `equipmentFlow` prüft den
kompletten Pfad von v3-Migration über Fund, direkte Duplikatverwertung,
Aufwertung, Anlegen und Zerlegen bis zur seltenen Kartenwirkung. Außerdem
beweist der Test, dass Ausrüstung und Kartensaat aus der Headless-Baseline
isoliert bleiben und die Run-Belohnung nur einmal gebucht wird.

Da der vollständige Hold jetzt höher als ein Desktop-Viewport ist, steht die
Sortietafel visuell direkt unter dem Kopfbereich. Vertrag und Run-Start bleiben
ohne Scrollen erreichbar; Produktion, Training und Rüstkammer folgen darunter.

## D-024 – Erster Feldlauf: FPS-Einbruch, Metrik und Lichtkreis

**Status:** Punkt 2 und 3 umgesetzt. **Der ursprüngliche Befund hat sich als
Messartefakt herausgestellt** – Auflösung am Ende dieses Eintrags. Punkt 1
(Lichtkreis) wird nicht mehr verfolgt.

Am 22.08.2026 lieferte der Besitzer den ersten echten 8-Minuten-Run. Er ist
**kein gültiger Baseline-Nachweis**: Die Live-Tuning-Regler wurden während des
Laufs bewegt. Kennzahlen zum Vergleich (Vertrag Wächterring, Seed 3313572481):

| Größe | Feldlauf | Baseline-Vertrag |
|---|---:|---:|
| Kartenzüge | 50 | 21 ± 3 |
| Stufe | 51 | ~18 |
| Kills | 133.121 | ~12.500 |
| Evolutionen | 4 | 0–2 |
| Spitze im SIM-Radius | 681 | 338 |
| Erster Kartenzug | 26,9 s | 26,5 s |

Der erste Kartenzug liegt exakt im Korridor. Die Regler wurden also erst nach
dem Start bewegt. Die Spitze von 681 liegt bei 97 % von `CAP_ENEMY` (700) – der
Entity-Deckel hat den Lauf abgefangen.

**Was der Lauf trotzdem beweist.** Die Telemetrietrennung aus D-017 stimmt
nachweislich: 339 sichtbare zu 681 Gegnern im Simulationsradius ist ein
Verhältnis von 0,498. Geometrisch vorhergesagt sind 0,494 – Cullingfenster
(1120 × 682,5 Welteinheiten) geteilt durch Simulationskreis (Radius 702). Beide
Zähler messen also genau das, was sie behaupten. Der Kampfausschnitt wurde mit
1000 × 562 korrekt gemeldet.

**Der Befund: schlechteste FPS 21 gegen ein Ziel von 55.**

`S.fps` ist ein Halbsekunden-Mittel; `worstFps` das Minimum dieser Mittel ab
Sekunde 4. Die 21 sind also kein einzelner verlorener Frame, sondern eine volle
halbe Sekunde mit etwa 10 Bildern. Gemessen wurde am selben Build, was die
Ursache **nicht** ist:

| Last | Simulation | Zeichenbefehle |
|---|---:|---:|
| 340 Gegner, Startbogen | 0,1 ms | 1,1 ms |
| 681 Gegner, Startbogen | 0,1 ms | 2,0 ms |
| 681 Gegner, 4 Evolutionen | 0,1 ms | 2,1 ms |

Die Simulation ist damit ausgeschlossen: 0,1–0,2 ms gegen ein Frame-Budget von
etwa 48 ms bei 21 FPS. Auch die Zahl der Zeichenbefehle ist unkritisch. Die
Füllrate konnte nicht gemessen werden – ein Vergleich mit `devicePixelRatio` 1
gegen 2 kostete trotz vierfacher Pixelzahl praktisch dasselbe, was beweist, dass
im nicht angezeigten Tab gar nicht rasterisiert wird.

**Leitende Hypothese: der Lichtkreis.** `lightRadius()` ist
`175 + buildPower()*13` und **ungedeckelt**. Pro Frame wird ein frischer
`createRadialGradient` erzeugt und als voller Kreis gefüllt. Ab einer
Buildmacht von etwa 31 überdeckt dieser Kreis den gesamten Bildschirm; der
Feldlauf lag bei etwa 46, also Radius 773. Auf einem HiDPI-Bildschirm sind das
3,69 Millionen Pixel Gradientfüllung pro Frame. Ein Deckel auf die halbe
Bildschirmdiagonale wäre die naheliegende Korrektur.

**Zweiter Befund: die Metrik taugt so nicht für die Abnahme.** `worstFps` ist
das Minimum aus rund 960 Halbsekundenproben. Ein einziger Ausreißer durch
Garbage Collection oder einen Hintergrundprozess setzt den Wert dauerhaft.
Für eine belastbare Abnahme braucht es zusätzlich den Zeitanteil unterhalb von
55 FPS oder ein 1-%-Low.

**Dritter Befund: getunte Läufe sind nicht erkennbar.** Der Run-Bericht enthält
keinen Hinweis darauf, dass die Regler bewegt wurden. Ohne den mündlichen
Hinweis des Besitzers wäre der Lauf nur an unplausiblen Zahlen aufgefallen. Für
den externen Spieltest mit zwanzig Personen ist das ein echtes Risiko. Der
Bericht sollte Tuning-Abweichungen sowie `devicePixelRatio` und die
Leinwandgröße in Pixeln aufnehmen.

**Zweiter Feldlauf am 22.08.2026: sauber, 3 Minuten, Seed 3548821049.** Keine
Regler bewegt. Kartenzüge 6 (Ziel 5), erster Kartenzug 34,9 s, 888 Kills,
Spitze 79 im Simulationsradius bei 60 sichtbaren Gegnern — und **57 FPS**. Bei
einem vsync-Deckel von 60 heißt das: in der schlechtesten halben Sekunde von
drei Minuten fielen drei Bilder aus. Praktisch fehlerfrei.

Damit stehen zwei Messpunkte gegeneinander:

| Lauf | sichtbare Gegner | Buildmacht | Lichtkreis füllt | schlechteste FPS |
|---|---:|---:|---:|---:|
| 3 Min, sauber | 60 | 6 | 36 % des Schirms | **57** |
| 8 Min, getunt | 339 | ~46 | 100 % | **21** |

Beide Größen sind zwischen den Läufen gemeinsam gewachsen; der A/B trennt sie
also noch nicht. Entscheidend ist aber, dass die Gradientfüllung **sättigt**:

| Buildmacht | Radius | Anteil des Schirms |
|---:|---:|---:|
| 6 | 324 px | 36 % |
| 15 | 474 px | 66 % |
| 22 | 590 px | 86 % |
| 31 | 740 px | 100 % |
| 46 | 989 px | 100 % |

Ab Buildmacht 31 ist der Bildschirm voll; darüber kostet der Lichtkreis nichts
mehr zusätzlich. **Daraus wird der saubere 8-Minuten-Lauf zum entscheidenden
Test.** Er landet bei Buildmacht etwa 22, also 86 % Füllung gegenüber 100 % im
getunten Lauf — praktisch derselbe Lichtanteil — bei aber nur etwa halb so
vielen sichtbaren Gegnern:

- Bleibt er bei etwa 21 FPS, scheidet der Lichtkreis als Erklärung aus und die
  Ursache liegt bei Gegnerzahl, Projektilen oder Effekten.
- Erreicht er 55 FPS oder mehr, liegt die Ursache im Bereich zwischen
  Buildmacht 22 und 46 — dann ist die Sättigungsschwelle des Lichts der erste
  Verdächtige.

**Korrektur zu Punkt 1.** Die zuerst vorgeschlagene Lösung „Radius deckeln"
bringt nichts. Der Kreis wird ohnehin auf die Leinwand geclippt: Sobald sein
Radius die halbe Bildschirmdiagonale überschreitet, ist die gefüllte Fläche
identisch, egal wie groß der Radius rechnerisch ist. Ein Deckel würde nur die
Verlaufskurve stauchen und damit das Bild verändern, ohne Füllrate zu sparen.

Die wirksame Optimierung wäre stattdessen, den Verlauf **einmal in eine
Offscreen-Leinwand vorzurendern** und pro Frame nur noch zu kopieren, statt
einen Radialverlauf pro Frame zu rastern. Das ist visuell identisch und
potenziell ein großer Gewinn, weil Verlaufsrasterung deutlich teurer ist als
ein Bitmap-Kopiervorgang.

**Warum das trotzdem noch nicht gebaut wird:** Der Gewinn ist in dieser
Umgebung nicht messbar, weil im nicht angezeigten Tab nicht rasterisiert wird.
Und die Änderung sitzt genau in der Grafikschicht, die gerade auf ihre manuelle
Abnahme wartet. Eine unverifizierbare Renderänderung unmittelbar vor dieser
Abnahme würde das Urteil über den Schwärmer verunreinigen. Punkt 1 wird deshalb
erst nach der Abnahme umgesetzt.

**Umgesetzt am 22.08.2026:**

2. **FPS-Metrik.** Alle Halbsekundenproben landen in `S.fpsLog`. `fpsStats()`
   liefert daraus 1-%-Low und den Zeitanteil unterhalb von `FPS_TARGET` (55).
   `FPS_TARGET` liegt bewusst außerhalb von `CFG`, damit ein Performanceziel
   den Balancevertrag nicht berührt. Der Check `fpsMetrics` schreibt die
   Absicht fest: 99 saubere Proben plus ein einzelner Ausreißer drücken den
   Minimalwert auf 20, lassen das 1-%-Low aber bei 60.
3. **Härtung des Berichts.** `CFG_DEFAULTS` hält den Ausgangszustand aller
   Balancewerte beim Laden fest, `tuningDeviations()` meldet jede Abweichung
   namentlich. `displayInfo()` ergänzt CSS-Größe, echte Pixelzahl und
   `devicePixelRatio`. Der Check `reportHardened` prüft beide Richtungen:
   „Tuning: unverändert" im sauberen Fall, der Wertname im getunten Fall.

**Vorschlag für die Abnahmeschwelle** – noch nicht beschlossen: statt „mindestens
55 FPS" künftig „1-%-Low mindestens 55 **und** höchstens 2 % der Proben
unterhalb von 55". Der bisherige Minimalwert allein ist als Abnahmekriterium
nicht belastbar.

**Zur Hardware.** Der Besitzer testet auf einem ThinkPad X1 Carbon von etwa
2022: Ultrabook mit integrierter Iris-Xe-Grafik, typischerweise 1920×1200 bei
150 % Skalierung, also `devicePixelRatio` 1,5 und damit 2,25-fache Pixelzahl.
Das ist genau die Geräteklasse, in der Füllrate zum Engpass wird. Der Bericht
meldet den echten Wert ab jetzt selbst, womit sich die Frage beim nächsten Lauf
ohne Rückfrage klärt.

Vor diesen Änderungen fehlt weiterhin ein **sauberer** Referenzlauf: Seite neu
laden (das setzt alle Regler zurück, sie werden nicht gespeichert), Wächterring,
acht Minuten, nichts anfassen.

## D-025 – Beobachtung: Erz aus einem Run wächst nur logarithmisch

**Status:** offen – nur beobachtet, keine Änderung vorgenommen

Beim Auswerten des Feldlaufs fiel auf: 137.872 Basis-Beute ergaben 17 Eisenerz.
Die Umrechnung ist `rewardOre(r) = max(3, round(log2(r+1)))`.

| Basis-Beute | Eisenerz |
|---:|---:|
| 1.000 | 10 |
| 20.000 | 14 |
| 137.872 | 17 |
| 500.000 | 19 |

Eine **Verdopplung der Beute bringt exakt ein Erz mehr**. Ein 138-mal besserer
Lauf bringt 1,7-mal so viel Erz. Damit ist aktives Können für den Hold-Ertrag
nahezu bedeutungslos, was der Zielsetzung aus Kapitel 11.6 des GDD
widerspricht: dort sollen Runs 60–70 % des Fortschritts tragen.

Die Vertragsmultiplikatoren wirken weiterhin, weil sie **nach** dem Logarithmus
angewendet werden (17 wird zu 23 bzw. 26). Die Frage ist nicht der
Multiplikator, sondern die Kurve darunter. Eine Wurzelkurve statt eines
Logarithmus wäre die naheliegende Alternative, ändert aber die Hold-Ökonomie
spürbar und braucht deshalb eine eigene Entscheidung.

### Auflösung von D-024 am 22.08.2026

Der erste saubere 8-Minuten-Lauf (Seed 242369191, Wächterring,
`Tuning: unverändert`) hat den Befund entschärft:

| Kennzahl | Wert | Bewertung |
|---|---:|---|
| Schlechteste FPS | 35 | eine einzelne halbe Sekunde |
| FPS 1-%-Low | **58** | über der Zielmarke von 55 |
| Anteil unter 55 FPS | **0,5 %** von 935 Proben | 2,3 Sekunden von 480 |

**Das Spiel läuft praktisch durchgehend flüssig.** Der alarmierende Wert von 21
aus dem ersten Feldlauf war der schlechteste Einzelmoment, nicht das
Spielgefühl — und beide Zahlen aus demselben Lauf zeigen, wie weit sie
auseinanderliegen können: 35 gegen 58. Ohne die neue Metrik hätten wir hier
eine Performancekrise diagnostiziert, die es nicht gibt.

**Die Lichtkreis-Hypothese ist damit widerlegt.** Der Lauf erreichte Buildmacht
32, also einen Lichtradius von 591 Welteinheiten gegen eine halbe
Bildschirmdiagonale von 574. Der Verlauf füllte in der zweiten Runhälfte also
den **gesamten** Bildschirm — bei gleichzeitig 218 sichtbaren Gegnern — und das
1-%-Low lag trotzdem bei 58. Punkt 1 wird nicht umgesetzt; ein vorgerenderter
Verlauf bliebe eine saubere Optimierung, löst aber kein vorhandenes Problem.

Was die einzelne 35er-Halbsekunde verursacht hat, bleibt offen. Garbage
Collection, die Schatzflut bei 7:00 oder ein Vorgang außerhalb des Browsers sind
alle plausibel. Bei 0,5 % Zeitanteil ist das kein Grund für eine Untersuchung.

**Die vorgeschlagene Abnahmeschwelle bewährt sich.** „1-%-Low mindestens 55 und
höchstens 2 % der Proben unter 55" hätte diesen Lauf mit 58 und 0,5 % sauber
bestanden und den ersten Feldlauf korrekt hinterfragt. Sie bleibt zur
Bestätigung durch den Besitzer vorgemerkt.

**Nebenbefund: die Safe-Area aus D-017 ist erstmals im Feld gelaufen.** Das
Fenster war 1422 × 613 CSS groß, also ein Seitenverhältnis von 2,32 und damit
deutlich breiter als 16:9. Der Kampfausschnitt wurde korrekt auf 1000 × 562
begrenzt, mit rechnerisch 166 Pixel Safe-Area je Seite. Ob sie ruhig aussieht,
ist weiterhin eine offene Sichtfrage.

## D-026 – Der Testbot bildet die menschliche Runkurve nicht ab

**Status:** offen – Entscheidung durch den Besitzer erforderlich

Zwei saubere Menschenläufe liegen jetzt vor und weichen systematisch vom
Bot ab, auf dem der gesamte Balancevertrag kalibriert ist.

**Früh ist der Bot zu schnell.**

| Quelle | Erster Kartenzug |
|---|---:|
| Designziel (GDD) | 35,0 s |
| Bot, Mittel über 9 Seeds | 26,5 s |
| Bot, gesamte Streuung | 21,0–30,7 s |
| Mensch, 3-Min-Lauf | 34,9 s |
| Mensch, 8-Min-Lauf | 35,2 s |

Beide Menschenläufe liegen **oberhalb der gesamten Bot-Streuung** und treffen
das Designziel von 35 Sekunden fast exakt. Zwei unabhängige Messungen mit
einer Abweichung von 0,3 Sekunden untereinander — das ist kein Zufall mehr.
Die im Testplan geführte Abweichung „erster Zug zu früh" beschreibt damit
nicht das Spiel, sondern das Messinstrument.

**Spät ist der Bot zu langsam.**

| Quelle | Kartenzüge in 8 Minuten |
|---|---:|
| Designziel | 21 |
| Bot, Mittel | 21,8 |
| Bot, gesamte Streuung | 10–35 |
| Mensch, 8-Min-Lauf | **36** |

Der Mensch liegt über der gesamten Bot-Streuung, erreichte Stufe 37, zwei
Evolutionen und 20.143 Kills. Ein 8-Minuten-Lauf liefert damit annähernd das,
was laut GDD Kapitel 5.3 der 15-Minuten-Tiefenzug liefern soll (39 Kartenzüge).
Die vier Runlängen wären dann mechanisch nicht mehr klar getrennt.

**Einschränkung:** Für den Frühlauf gibt es zwei Messpunkte, für den Spätlauf
nur einen. Der Menschenlauf hatte zudem einen leicht ausgebauten Hold
(Training 2/2/2, Runenfibel R1), den die Baseline gemäß D-020 bis D-023
absichtlich ausblendet. Wie viel davon Können, wie viel Hold-Bonus und wie viel
Seed-Glück ist, lässt sich aus einem Lauf nicht trennen.

**Warum das zählt:** Ein Bot, der früh zu schnell und spät zu langsam ist, hat
eine andere Kurvenform als ein Mensch — nicht nur einen anderen Mittelwert. Ein
Korridor, der auf dieser Kurve kalibriert ist, beschreibt das Spielerlebnis
nicht. Vor dem externen Spieltest sollte das geklärt sein, sonst wird gegen die
falsche Referenz getunt.

**Zur Entscheidung stehen:**

1. Zwei bis drei weitere saubere 8-Minuten-Menschenläufe sammeln, bevor
   irgendetwas geändert wird. Billigster Schritt, klärt die Streuung.
2. Den Botkorridor als das führen, was er ist — ein Regressionswächter gegen
   stille Änderungen — und die Designziele getrennt an Menschenläufen prüfen.
3. Den Bot verbessern, damit er die menschliche Kurve trifft. Teuer und nur
   sinnvoll, wenn er weiter als Designreferenz dienen soll.

Empfehlung: erst Punkt 1, dann entscheiden. Der Balancevertrag bleibt bis dahin
unverändert; er erfüllt seinen Zweck als Regressionswächter unabhängig davon.

## D-027 – Erste Spielerbewertung: der Run trägt in diesem Zustand nicht

**Status:** offen – Reihenfolge und Umfang müssen vom Besitzer freigegeben
werden. Es wurde noch kein Code geändert.

Am 22.08.2026 hat der Besitzer nach drei Läufen die fünf Sichtfragen aus dem
Testplan beantwortet. Die Antwort auf Frage 5 lautet sinngemäß: **Lust ja, aber
so funktioniert der Run nicht.** Der wichtigste Satz daraus:

> „Aktuell weiß ich nicht, wofür ich die Runs mache."

Damit ist die Kernfrage von Phase 0 – trägt der Kampf einen freiwilligen
zweiten Run? – **noch nicht mit Ja beantwortet.** Der Schwärmer ist nicht
freigegeben; der Stürmer bleibt gesperrt.

### Die Rückmeldungen im Wortlaut, nach Ursache sortiert

**A. Die Gegnerdichte nimmt dem Spiel sein einziges Verb.**

> „aktuell kommen ohnehin so viele Gegner, dass es fast keinen Unterschied mehr
> macht. Man kann gar nicht mehr so richtig laufen/ausweichen." · „es ist alles
> überlagert mit Gegnern" · „An den Boss kommt man wegen der vielen Gegner nicht."

Das trifft den Kern: Das GDD baut auf *ein* Verb, Bewegung, und verlangt in
Kapitel 5.2, dass jedes Bossmuster mit reiner Bewegung ausweichbar ist. Wenn
Bewegung nicht mehr möglich ist, ist der Entwurf verletzt, nicht nur unbequem.

Messbar ist es auch. Der Lauf erreichte 445 Gegner im Simulationsradius bei
einer Zieldichte von 301 – ein Überschuss von 48 %. Die Ursache ist eine
Rückkopplung, die mit D-026 zusammenhängt: Mehr Kartenzüge führen zu einer
höheren Spielerstufe, und `HP_PER_LVL` macht Gegner mit jeder Stufe zäher. Auf
Stufe 37 haben sie den 4,54-fachen Grund-HP-Wert statt 3,49 auf der
Bot-Baseline von Stufe 18, also **30 % mehr Leben**. Sie sterben langsamer als
sie nachrücken, und das Feld läuft voll.

Das heißt: **Dichte und Pacing sind dasselbe Problem von zwei Seiten.** Wer nur
die Spawnzahl senkt, behandelt das Symptom.

**B. Buildmacht ist zu schwer zu erreichen.**

> „Die Buffs sind teils so schwer zu erlangen, weil die Karten wirklich random
> kommen – ohne empowerte Fähigkeiten wird es extrem schwer."

Die 22-%-Trefferquote aus GDD Kapitel 5.7 („Dominant Strategy Denial") ist als
Zahl bewusst gewählt, wird in der Praxis aber als Willkür erlebt. Reroll und
Verbannen existieren, sind aber knapp.

**C. Überleben ist undurchsichtig.**

> „Lebensreg fühlt sich langsam an + es gibt keine Lebenspunkte zum Einsammeln."

`REGEN` steht auf 0,75 HP/s. Heilung gibt es ausschließlich über die Karte
Glutherz, also zufällig. Es gibt keine Gesundheits-Drops von Gegnern.

**D. Der Zweck des Runs ist unsichtbar.**

> „Aktuell weiß ich nicht, wofür ich die Runs mache."

Das ist die schwerwiegendste Rückmeldung. Die Belohnungskette existiert
technisch – Beute wird zu Erz, Erz zu Barren, Barren zu Verbesserungen – aber
sie kommt beim Spieler nicht an. Siehe auch D-025: Eine Verdopplung der Beute
bringt genau ein Erz mehr, was den Ertrag zusätzlich entwertet.

**E. Der Hold erklärt sich nicht.**

> „Hold ist aktuell sehr unübersichtlich. Ich verstehe teils gar nicht so
> richtig, was ich da machen soll."

Damit ist die Leitfrage von H0.1 – verstärkt eine Produktionskette den Wunsch
nach der nächsten Sortie? – negativ beantwortet.

**F. Die Animation wirkt ruckelig. Das widerspricht D-015 und D-016.**

> „die Animationen sehen insgesamt noch scheußlich aus (die Qualität der
> einzelnen Figuren könnte schlechter sein, dafür sollte es viel animierter
> sein… aktuell ist es zu ruckelig)."

D-015 und D-016 legen den Posentakt bewusst auf neun bis zehn Bilder pro Sekunde
fest, gegen Doppelkonturen durch Überblendung. Der Besitzer bewertet genau das
als Ruckeln und wäre bereit, **Detailqualität je Figur gegen mehr Phasen zu
tauschen**. Das ist eine bewusste Umkehr der beiden Entscheidungen und keine
beiläufige Korrektur.

**G. Anzeigen rutschen aus dem Bild, und die Safe-Area gefällt nicht.**

> „die dunklen Flächen sehen nicht so schön aus. Wir müssen insbesondere auch
> die ganzen Anzeigen komprimieren, vieles rutscht dann links aus dem Bild (was
> ich brauche um die Fähigkeiten zu empowern)."

Zwei Dinge in einem: Die seitliche Safe-Area aus D-017 wird als unschön
empfunden, und die Slotanzeige läuft bei niedriger Fensterhöhe aus dem Bild.
Der zweite Punkt verschärft B unmittelbar – wer nicht sieht, was er hat, kann
nicht gezielt aufwerten.

### Vorgeschlagene Reihenfolge

Die Punkte sind nicht gleichrangig. A ist Voraussetzung für alles andere: Ein
Run, in dem man nicht laufen kann, lässt sich weder mit Zweck noch mit
Belohnung retten.

| Rang | Paket | Warum dort |
|---|---|---|
| 1 | **A + Pacing (D-026)** | Gemeinsame Ursache. Ohne Bewegung kein Spiel. |
| 2 | **G, nur die Slotanzeige** | Kleinster Eingriff mit direkter Wirkung auf B. |
| 3 | **B + C** | Buildmacht erreichbar, Überleben lesbar machen. |
| 4 | **D + E** | Zweck und Hold verständlich machen. |
| 5 | **F** | Teuerste Änderung, braucht neue Assets und die Revision von D-015/D-016. |
| 6 | **G, Safe-Area** | Rein kosmetisch, erst wenn der Run trägt. |

Nicht jedes Paket ist eine reine Umsetzung. Rang 1 revidiert die Dichtewerte aus
D-014, Rang 5 revidiert D-015 und D-016. Beides braucht eine eigene bewusste
Entscheidung, keine stille Anpassung während der Arbeit.

## D-028 – Warum das Feld verstopft: Bewegung erzeugt den Gegnerüberschuss

**Status:** untersucht und gemessen, **Entscheidung offen**. Es wurde kein
Balancewert geändert.

D-027 Rang 1 verlangt, die Gegnerdichte zu entschärfen. Die Untersuchung hat
eine andere Ursache ergeben als vermutet, und sie führt in eine Zwickmühle.

### Die Ursache

Nicht der Build, nicht die Spielerstufe, nicht die Spawnkurve — **die Bewegung
des Spielers selbst**:

| Spieler | Spitze im Feld | über Zieldichte 301 |
|---|---:|---:|
| steht still | 303 | +1 % |
| Bot, kitet | 357 (Streuung bis 438) | +19 % |
| Besitzer, Feldlauf | 445 | +48 % |

Widerlegt wurden dabei ausdrücklich:

- *Spielerstufe und \`HP_PER_LVL\`.* Bei festgehaltener Stufe von 10 bis 45 sitzt
  die Population im Gleichgewicht exakt auf der Zieldichte (297–300 bei Ziel 301).
- *Buildstärke.* Vom Startbogen bis zum Maximalbuild mit vier Evolutionen und
  67.854 Kills bleibt die Spitze zwischen 295 und 303.
- *Der Spawn-Bias nach hinten.* Ihn ganz zu entfernen senkt den Überschuss nur
  von +19 % auf +12 %.

**Der Mechanismus.** Gezählt wird in einem Kreis von \`SIM_DIAG*1.15\` = 702
Welteinheiten, recycelt erst ab \`SIM_DIAG*1.55\` = 946. Dazwischen liegt ein
ungezählter Vorrat mit 82 % der Zählfläche. Wer kitet, zieht eine Schleppe in
diesen Vorrat; der Spawner füllt vorne bis zur Zieldichte nach, weil er die
Schleppe nicht sieht. Beim Wenden sammelt der Spieler beides wieder ein.

**Das ist strukturell schädlich, nicht nur unbequem:** Je besser jemand
ausweicht, desto voller wird sein Feld — bis Ausweichen unmöglich ist. Die
korrekte Spielweise zerstört ihre eigene Voraussetzung. Genau das beschreibt
der Besitzer mit „man kann gar nicht mehr so richtig laufen/ausweichen".

### Die Zwickmühle

Jeder wirksame Hebel senkt zugleich die Kills und damit die XP. Gemessen mit
der vollen Vertragssuite:

| Despawn-Faktor | Spitze | über Ziel | Kartenzüge | Vertrag 18–24 |
|---:|---:|---:|---:|---|
| 1,55 (heute) | 357 | +19 % | 20,56 | erfüllt |
| 1,40 | 338 | +12 % | 18,44 | erfüllt, knapp |
| 1,30 | 331 | +10 % | 17,44 | **verletzt** |
| 1,25 | 321 | +7 % | 15,78 | **verletzt** |
| 1,20 | 308 | +2 % | 15,33 | **verletzt** |

Eine XP-Kompensation über \`XP_C\` wurde ebenfalls durchgerechnet. Keine der
zehn geprüften Kombinationen erfüllt alle vier Kriterien gleichzeitig: Bei
Despawn 1,20 und \`XP_C\` 74 stimmen Kartenzüge und Sensitivität, aber nur ein
Lauf von neun erreicht eine Evolution. Bei 1,25 und \`XP_C\` 68 stimmen
Kartenzüge und Evolutionen, aber die Sensitivität steigt auf 1,83 über die
erlaubten 1,75.

### Warum hier nicht weitergetunt wird

Der Vertrag ist auf dem Testbot kalibriert, und **D-026 zeigt, dass dieser Bot
die menschliche Kurve nicht abbildet**: Der Besitzer erreichte 36 Kartenzüge,
wo der Bot 20,6 erreicht. Eine XP-Kompensation, die den *Bot* zurück auf 21
hebt, würde den *Menschen* noch weiter über 36 treiben — also genau das
Gegenteil dessen, was das Spielgefühl braucht.

Drei gekoppelte Stellschrauben gegen vier verrauschte Kriterien zu optimieren,
während die Referenz nachweislich falsch ist, ist keine saubere Arbeit. Die
Reihenfolge muss umgekehrt werden.

### Zur Entscheidung stehen

1. **Erst die Referenz reparieren.** Zwei bis drei weitere saubere
   Menschenläufe sammeln (D-026), den Kartenzug-Korridor aus Menschendaten neu
   ableiten und den Botkorridor nur noch als Regressionswächter führen. Danach
   ist die Dichte in einem Zug lösbar, ohne gegen eine falsche Referenz zu
   tunen. **Empfohlen.**
2. **Den Defekt sofort beheben und den Korridor mitziehen.** Despawn auf 1,20,
   Überschuss auf +2 %, und den Kartenzug-Korridor auf den dann gemessenen Wert
   setzen. Schnell wirksam, verschiebt aber den Balancevertrag auf Basis
   derselben fragwürdigen Botreferenz.
3. **Die Zieldichte selbst senken** (\`SPAWN_SPAN\`, heute 450). Das ist eine
   Revision von D-014 und wirkt unabhängig vom Überschuss. Kann mit 1 oder 2
   kombiniert werden, ersetzt aber keines von beiden, weil der Überschuss
   bleibt.

Bis zur Entscheidung bleibt der Code unverändert. Der Überschuss ist als
Messgröße jetzt bekannt und reproduzierbar; er lässt sich jederzeit gegen jede
Änderung nachprüfen.

## D-029 – Korrektur zu D-024: Der FPS-Einbruch ist real und hängt an den sichtbaren Gegnern

**Status:** gemessen und belegt. Ersetzt die Entwarnung aus der Auflösung von
D-024.

Der vierte Feldlauf (Seed 4265181367, sauber, Wächterring) widerlegt die
Einschätzung, der FPS-Befund sei ein reines Messartefakt. Beide sauberen
8-Minuten-Läufe liefen auf **demselben Rechner, demselben Fenster
(1422 × 613, DPR 1,35) und mit unverändertem Tuning**:

| | Lauf 3 | Lauf 4 |
|---|---:|---:|
| Spitze im SIM-Radius | 445 | 441 |
| **Spitze sichtbar gezeichnet** | **218** | **294** |
| Anteil sichtbar/SIM | 0,49 | 0,67 |
| Buildmacht | 32 | 27 |
| Lichtradius | 591 | 526 |
| **FPS 1-%-Low** | **58** | **38** |
| **Anteil unter 55 FPS** | **0,5 %** | **40,0 %** |

**Der Treiber sind die sichtbar gezeichneten Gegner, nicht die Gesamtmenge.**
Die Spitze im Simulationsradius ist in beiden Läufen praktisch gleich (445 zu
441). Nur der sichtbare Anteil unterscheidet sich, weil der Spieler
unterschiedlich viel Zeit mitten im Pulk verbracht hat. 35 % mehr sichtbare
Gegner kosten 34 % des 1-%-Lows.

**Der Lichtkreis ist damit endgültig ausgeschlossen.** Im schlechteren Lauf war
er *kleiner* (Radius 526 gegen 591), weil die Buildmacht niedriger lag. Weniger
Verlaufsfüllung, trotzdem 20 FPS weniger.

**40 % der Zeit unterhalb der Zielmarke ist kein Ausreißer, sondern der
Normalzustand dieses Laufs.** Die Entwarnung in D-024 galt nur für die Last von
Lauf 3. Sie wird hiermit zurückgenommen.

### Was daraus folgt

Die Zwickmühle aus D-028 löst sich damit auf. Die Gegnerdichte zu senken ist
nicht länger nur eine Frage des Spielgefühls, sondern **eine harte technische
Notwendigkeit**. Damit fällt das Argument weg, man dürfe den Botkorridor nicht
anfassen: Der Korridor ist nachgelagert, die Bildrate ist die Randbedingung.

Drei Wirkungen ziehen dabei in dieselbe Richtung:

1. **Technik.** Weniger sichtbare Gegner heben die Bildrate.
2. **Spielgefühl.** Weniger Gegner machen Bewegung und Ausweichen wieder möglich
   — die Hauptbeschwerde aus D-027.
3. **Pacing.** Weniger Gegner bedeuten weniger XP. Der Mensch liegt mit 28 und
   36 Kartenzügen **über** dem Designziel von 21; eine Senkung bewegt ihn also
   in die richtige Richtung. Nur der Bot, der ohnehin die falsche Referenz ist
   (D-026), fällt unter seinen Korridor.

Der bisherige Konflikt bestand nur, weil der Botkorridor als Ziel behandelt
wurde statt als Regressionswächter.

### Vorgeschlagenes Budget

Statt eines Entity-Deckels im Simulationsradius (\`CAP_ENEMY\` = 700) braucht es
ein Budget für **sichtbar gezeichnete** Gegner, denn nur die kosten Bilder. Die
beiden Läufe grenzen es ein:

- 218 sichtbar → 1-%-Low 58, 0,5 % unter Ziel · **tragfähig**
- 294 sichtbar → 1-%-Low 38, 40 % unter Ziel · **nicht tragfähig**

Ein Zielwert von etwa **200 sichtbaren Gegnern** in der Spitze liegt sicher im
tragfähigen Bereich. Bemerkenswert: Würde allein der Überschuss aus D-028
beseitigt (SIM-Spitze von 441 auf die Zieldichte 301), läge der sichtbare Wert
bei Anteil 0,67 schon bei etwa 200. **Der Defekt aus D-028 zu beheben reicht
also möglicherweise aus, ohne die Zieldichte selbst anzutasten.**

Das ist die nächste zu bauende Änderung. Sie revidiert den Despawn-Radius aus
D-014 und stellt den Kartenzug-Korridor gemäß D-026 auf einen Regressionswächter
um. Beides braucht die Freigabe des Besitzers, weil es zwei Entscheidungen
zugleich berührt.
