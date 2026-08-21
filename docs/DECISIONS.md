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
