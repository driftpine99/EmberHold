# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-25-05
- **Entscheidung:** D-043
- **Thema:** Orbitklinge V2, ruhige Kampfkulisse und Orbitalstation V2
- **Status:** **FREIGEGEBEN_FUER_OPENCODE**
- **Auftraggeber:** Besitzer
- **Projektleitung und Abnahme:** Codex
- **Ausführung:** OpenCode; unabhängige Review, Dokumentation und Push durch Codex
- **Priorität:** P0 – sichtbare Produktqualität und glaubwürdiger Meta-Hub
- **Verbindlicher Ausgangscommit:** 6b69bcf
- **Zeitregel:** Nutze das gesamte verfügbare OpenCode-Zeitfenster produktiv.
  Arbeite alle Pflicht-Gates in Reihenfolge ab und stoppe nicht nach Analyse,
  einem ersten CSS-Pass oder der ersten grünen Teilprüfung. Wenn alle Gates
  früh fertig sind, investiere die Restzeit ausschließlich in visuellen
  Feinschliff, Responsive-Verhalten, Zustandslesbarkeit und unabhängige
  Regressionstests innerhalb dieses Auftrags. Bei drohendem Zeitlimit den
  letzten grünen Stand lokal committen und den Rest ehrlich als TEILWEISE
  dokumentieren.

Bei Widersprüchen mit AGENTS.md, CLAUDE.md, historischen Roadmap-Texten oder
älteren Arbeitsberichten gilt ausschließlich dieser Auftrag.

## Verbindlicher Besitzerbefund nach D-042

D-042 ist technisch abgenommen: SIGNAL SICHERN, Stationsdaten, Save v5,
Kernstufen, Protokolle, Rammjäger-Korrektur und EVO-Hinweis bleiben erhalten.
Der Besitzer hat die sichtbare Fassung getestet und entschieden:

- Der weiß-goldene Lichthüter ist besser und bleibt die Grundlage.
- Die heutige Orbitklinge sieht schlecht und unbedeutend aus. Das bereits
  gewählte Konzept zeigte eine markante cyanfarbene Wurfklinge mit physischem
  weiß-goldenem Kern; diese Qualität wird im Spiel nicht erreicht.
- Der Hintergrund ist besser als vorher, enthält aber zu viele Sterne,
  Linien, Zellen und Landmarken gleichzeitig. Er konkurriert mit Gegnern,
  Warnflächen und Waffen.
- Der permanente große Ring in einiger Entfernung um den Avatar stört. Gemeint
  ist die sichtbare Grenze des Licht-/Machtradius, nicht ein zeitlich
  begrenzter Signal-, Schild- oder Bosswarnring.
- Die Station wirkt weiterhin nicht wie eine Raumstation. Sechs dekorierte
  Menüpunkte um einen Kern sind keine räumliche Station und kein spürbares
  Stationsgameplay.

Diese Aussagen sind die visuelle Abnahme. OpenCode soll sie nicht erneut
grundsätzlich diskutieren oder durch mehr kleine Effekte lösen.

## Produktentscheidung

D-043 ersetzt weder den D-042-Meta-Loop noch die bestehende Simulation. Es ist
ein großer Präsentations- und Interaktionspass mit einem eindeutigen Ziel:

> Der Kampf soll einen klaren visuellen Fokus besitzen: Lichthüter,
> Wurfklinge, Gegner und Warnung. Die Startansicht soll auf den ersten Blick
> eine beschädigte, wiederaufgebaute Orbitalstation sein, an der die
> vorhandenen Aktionen räumlich stattfinden.

Die Station bleibt bewusst ein kompakter Meta-Hub und wird kein Städtebau.
Ihre sechs heutigen Funktionen, Ressourcen, Kosten und Timer werden nicht
erweitert, sondern räumlich, animiert und verständlich inszeniert.

## Verbindliche visuelle Referenzen

Vor jeder Implementierung vollständig ansehen beziehungsweise lesen:

1. docs/concepts/orbitblade-combat-ui-direction-v2.png
2. docs/concepts/orbitblade-combat-direction-v1.png
3. docs/concepts/orbitblade-station-direction-v1.png
4. docs/concepts/README.md

Die Bilder sind interne Designreferenzen, keine pixelgenauen Produktionsassets.
Verbindlich sind ihre Komposition, Hierarchie und Formensprache:

- weiß-goldene Keramik, dunkles Metall, Cyan-Energie und wenig warmes Gold;
- große ruhige Flächen statt kleinteiliger Dekorationsfüllung;
- eine klar erkennbare physische Wurfklinge;
- eine zusammenhängende Station über einem violetten Planeten;
- sechs Module als Baukörper derselben Station, verbunden durch Wege und
  Energieleitungen;
- minimale Rand-UI und nur ein kontextuelles Detailfenster.

Ergänzend darf die aktive lokale Referenz unter
Orbitblade/Saber-Game-Projekt/konzept schreibgeschützt untersucht werden.
Vorher dort AGENTS.md und CLAUDE.md vollständig lesen. Relevant sind nur
zeichneKlinge, zeichneLichthueterNeu und die Hintergrundebenen. archive,
ZIPs, Videos, verschachtelte .git und das Referenzprojekt selbst bleiben
unangetastet. Kein alter Save und kein altes Spielsystem werden importiert.

Die Konzept-PNGs dürfen nicht einfach als vollflächiger Screenshot mit
unsichtbaren Menü-Hotspots eingebaut werden. Die Stationszustände müssen aus
dem realen Save entstehen und als echte, veränderliche Scene-Layer sichtbar
sein. Eigene Ausschnitte oder abgeleitete Prototyp-Layer sind nur mit sauberer
Provenienz und einem funktionierenden Fallback erlaubt.

## Gate 0 – Audit und Umsetzungsplan, danach ohne Pause weiterarbeiten

1. Aktuellen Kampf- und Stationsrenderpfad vollständig lesen.
2. In docs/WORK_REPORT.md kurz festhalten, welche konkreten Elemente der drei
   Konzeptbilder heute fehlen. Das ist Teil des späteren Berichts und kein
   Grund, auf Freigabe zu warten.
3. Den störenden Avatar-Ring technisch eindeutig identifizieren. Die
   lightRadius-Logik darf für bestehende Berechnungen erhalten bleiben; nur
   ihre permanente großflächige sichtbare Kontur soll verschwinden.
4. Eine Renderstrategie festlegen, die auf dem vorhandenen einzelnen
   HTML-/Canvas-Prototyp bleibt. Bevorzugt sind vorgerenderte Canvas-Sprites
   für die Klinge und eine strukturierte Inline-SVG-/Canvas-Szene für die
   Station. Keine neue Engine oder Abhängigkeit.
5. Baseline mit npm test und git status --short --branch protokollieren.

Gate 0 endet nicht mit einem Bericht. OpenCode beginnt im selben Lauf sofort
mit Gate A.

## Gate A – Orbitklinge V2 als visuelles Hauptmerkmal

Die heutige kleine cyanfarbene Sichel wird vollständig neu gestaltet.

1. Die Standardklinge ist auf Handygröße sofort als geworfene Energiewaffe
   lesbar: ein deutlicher weiß-goldener oder dunkler physischer Mittelteil,
   eine asymmetrische gebogene Cyan-Schneide, eine klare helle Innenkante und
   eine sichtbare Spitze. Kein Punkt, keine einfache Banane, kein abstrakter
   Kreis und keine erkennbare Franchise-Waffe.
2. Zielgröße ungefähr 42 bis 54 Bildschirmpixel bei Referenzskalierung. Die
   tatsächliche Trefferbox, Reichweite, Geschwindigkeit, Durchdringung,
   Feuerrate und Zielwahl bleiben unverändert.
3. Der Flug besitzt mindestens vier visuelle Rotationsphasen und 16 oder mehr
   Richtungsstufen beziehungsweise eine gleichwertige vorgerenderte Lösung.
   Mehrere gleichzeitig fliegende Klingen erhalten einen deterministischen
   Phasenversatz, damit sie nicht synchron blinken.
4. Körper, Energie und Flugspur werden in höchstens einem drawImage pro
   Klingenprojektil komponiert. Keine Canvas-Erzeugung, Gradienten,
   shadowBlur-Änderung oder Objektallokation pro Projektil und Frame.
5. Die Flugspur ist kurz, kontrolliert und an die Bewegungsrichtung gebunden.
   Sie darf nicht wie eine zweite Klinge wirken und bei Mehrfachschuss keinen
   cyanfarbenen Nebel erzeugen.
6. Abwurf und Projektil müssen visuell zusammenpassen: Die vorhandenen
   Wurfphasen des Lichthüters zeigen Loslassen und kurze Nachbewegung. Kein
   Teleport aus der Körpermitte und kein Crossfade-Doppelavatar.
7. Photonenschneise darf dieselbe Waffe sichtbar verstärken, etwa durch eine
   hellere Goldkante oder breitere Energieschneide. Die Darstellung darf keine
   zusätzliche Schadensfläche versprechen und keinen zweiten Trefferpfad
   vortäuschen.
8. Kartenpiktogramm und unteres Waffenpiktogramm verwenden dieselbe
   Klingen-Silhouette, damit Waffe, Karte und Projektil zusammengehören.
9. Der prozedurale Fallback bleibt bei fehlendem Image-API-Pfad spielbar und
   zeigt ebenfalls die neue erkennbare Form.

## Gate B – ruhiger Kampf-Hintergrund und kein Avatar-Radius

1. Entferne die permanente sichtbare Außenkontur des großen lightRadius-Rings
   vollständig. Auch ein weich begrenzter Kreis, dessen Außenkante als Ring
   gelesen wird, ist nicht erlaubt.
2. Ein kleiner Kontaktschatten und eine sehr lokale, kantenlose Aura direkt am
   Lichthüter dürfen bleiben. Zeitlich oder zustandsabhängige Schilde,
   Fokusmarker, SIGNAL SICHERN und Bosswarnungen bleiben erhalten und müssen
   von der entfernten Daueranzeige klar unterscheidbar sein.
3. Reduziere die visuelle Informationsdichte der D-042-Kulisse deutlich:
   mindestens zwei Drittel des sichtbaren Kampfausschnitts sollen ruhige,
   mittelhelle Navy-/Blaugrau-Fläche ohne Mikrostern, Leitungsknoten oder
   Landmarkdetail sein.
4. Es gibt höchstens drei visuelle Hierarchieebenen:
   - ruhiges breites Orbitaldeck als Spielfläche;
   - wenige große, kontrastarme Paneel-/Ringformen zur Orientierung;
   - sehr seltene periphere Sterne, Planet- oder Trümmerformen.
5. Keine wiederholte Kastenwand, kein enges Liniennetz, keine gleichmäßig
   verteilten Mikropunkte und keine Landmarke in jeder Zelle. Dekorationen
   dürfen nicht dieselbe Helligkeit wie Cyan-Angriffe oder violette/rote
   Warnungen erreichen.
6. Der Boden reicht weiterhin ohne schwarze Balken oder sichtbare Schnittkante
   bis an die Anzeige. D-017, Simulation, Culling und Cover-Skalierung bleiben
   unangetastet.
7. Der neue Hintergrund bleibt deterministisch, verbraucht keinen
   Gameplay-RNG und verwendet höchstens die heutige konstante Zahl teurer
   Gradienten pro Frame. Statische Ebenen werden vorgerendert.
8. Dunkle Gegnerfamilien, rote Warnkorridore, AEGIS, NEXUS und die neue
   Orbitklinge müssen auf Desktop und Handy klar vor dem ruhigeren Boden
   stehen.

## Gate C – Orbitalstation V2 als echter Ort

Die vorhandene holdscene und ihre sechs runden Menü-Hotspots werden visuell
neu aufgebaut. Ein bloßes Umfärben, weitere Kartenrahmen oder mehr Icons
erfüllen dieses Gate nicht.

1. Die Startansicht wird von einer zusammenhängenden Station dominiert, die
   den Großteil des nutzbaren Bildschirms einnimmt. Sie schwebt über einem
   violetten Planeten beziehungsweise Trümmerring und besitzt erkennbare Tiefe,
   Decks, Außenhülle, Stege, Kabel und gemeinsame Beleuchtung.
2. Der zentrale Kern ist ein physischer Baukörper mit Plattform. Der kleine
   weiß-goldene Lichthüter steht dort als Maßstab. Kernstufen 0 bis 3 verändern
   sichtbar Geometrie, Energiekränze und die Zahl versorgter Leitungen, nicht
   nur Text oder drei Lampen.
3. Die sechs Funktionen sind eindeutige Gebäudeteile derselben Station:
   - Asteroidensonde: Ausleger, Dock und kleine Abbaukörper;
   - Materiefabrikator: kompakter industrieller Reaktor/Fertiger;
   - Fluxlabor: violette Glaskammer oder Feldspule;
   - Simulationsdeck: ringförmige Trainingsplattform/Hologramm;
   - Ausrüstungsbucht: Hangar, Werkbank oder offene Docktore;
   - Sternenkarte: Antenne und holografischer Kartentisch mit Startfunktion.
4. Module sind über Ringstege und Energieleitungen körperlich verbunden.
   Freischaltung und Kernstufe speisen sichtbare Leitungssegmente. Es dürfen
   nicht sechs freischwebende Button-Kreise auf einem Hintergrund bleiben.
5. Zustände entstehen am Baukörper:
   - offline: dunkle Sektion, Bruch, Baugerüst oder unterbrochene Leitung;
   - reparierbar: genau eine dezente Zielmarkierung;
   - produzierend: ruhiger Maschinenimpuls oder laufendes Förderlicht;
   - abholbereit: klarer, aber nicht blinkender Ressourcenbehälter;
   - gewählt/aktiv: fokussierte Cyan-/Goldkontur am echten Modul.
6. Klick-/Touchflächen folgen der sichtbaren Modulform und bleiben mindestens
   44 CSS-Pixel groß. Eine kurze Bezeichnung darf bei Fokus, Hover oder
   Auswahl erscheinen; permanente große Menüchips über jedem Gebäude sind
   nicht erlaubt.
7. Immer genau ein kontextuelles Detailpanel zeigt die vorhandenen Aktionen.
   Auf Desktop erscheint es als schmaler Stations-Drawer am Rand, ohne die
   Station zu verdrängen. Auf 844×390 darf es als intern scrollendes Bottom-
   oder Side-Sheet erscheinen; die Station bleibt dahinter als Ort erkennbar.
8. Ressourcenleiste, nächstes Ziel und Launch bleiben klein am Rand. Die
   Hauptfläche gehört der Station. Keine zusätzliche Kartenwand unterhalb.
9. Alle bestehenden Aktionen und IDs bleiben funktional erreichbar:
   Produktion/Einsammeln, Reparaturen, Orbitklingen-Verstärkung,
   Reroll-Vorbereitung, drei Meisterschaften, Ausrüstung
   anlegen/aufwerten/zerlegen, Kernstufen, Protokollwahl, Sektoren,
   3-/8-Minuten-Start und letzter Run-Bericht.
10. Tastaturfokus, aria-labels, Touchbedienung und ein sinnvoller
    Standardfokus bleiben erhalten. Eine Maus darf nicht erforderlich sein.

Die Station darf als Inline-SVG mit CSS-Zustandsklassen, als Canvas-Szene mit
semantischen Overlay-Buttons oder als nachvollziehbare Kombination gebaut
werden. Wenn ein eigenes Asset kleiner und wartbarer ist, ist
prototype/web/assets/orbitblade-station-v2.svg erlaubt. Eine statische
Illustration ohne saveabhängige Layer besteht das Gate nicht.

## Gate D – vorhandenes Stationsgameplay sichtbar machen

Es werden keine neue Währung und kein neuer Produktionszweig erfunden. Die
vorhandenen Systeme müssen aber eine sichtbare Reaktion in der Station
auslösen.

1. Eine Reparatur schaltet sofort das beschädigte Gebäudeteil, seine Leitung
   und seine Beleuchtung um. Kein Reload.
2. Einsammeln zeigt eine kurze Bewegung vom realen Modul zur passenden
   Ressource in der Kopfzeile. Sie darf rein visuell sein und nie doppelt
   auszahlen.
3. Ein Kernupgrade baut mindestens ein sichtbares Strukturteil hinzu und
   versorgt neue Leitungssegmente. Die drei Stufen müssen auch ohne
   Zahlenvergleich unterscheidbar sein.
4. Vorhandene Stationsdaten werden am Kern als höchstens sechs kleine
   Datenelemente oder ein klarer Füllstand sichtbar. Keine zusätzliche
   permanente Textspalte.
5. Das gewählte Sortie-Protokoll verändert eine kompakte Projektion am Kern
   oder an der Sternenkarte. none, Klingenfokus, Fluxreserve und
   Bergungsscanner sind visuell unterscheidbar, ohne neue Kampfwirkung.
6. Nach Rückkehr aus einem Run darf eine kurze, überspringbare
   Ankunftsrückmeldung Signal-/NEXUS-Daten und neue Bergung an den zugehörigen
   Stationsort führen. Sie verwendet nur bereits berechnete Ergebnisse,
   verändert keine Auszahlung und erscheint nicht bei jedem Seiten-Reload.
7. Der nächste sinnvolle Stationsschritt bleibt als genau ein räumliches Ziel
   hervorgehoben. Die UI erklärt knapp warum; sie ersetzt die Szene nicht.
8. Animationen laufen über transform/opacity oder vorgerenderte Frames,
   respektieren prefers-reduced-motion und dürfen weder Save- noch
   Produktionszeit verändern.

## Gate E – Responsive-, Performance- und Qualitätspass

1. Station bei 1280×720, 1536×864 und 844×390 prüfen. Alle sechs Module,
   Kern und Start müssen erreichbar sein; kein horizontaler Scroll und keine
   abgeschnittene Hauptaktion.
2. Kampf bei 1280×720 und 844×390 prüfen: Idle, Laufen,
   Richtungswechsel, Abwurf, Einzelklinge, Mehrfachschuss, Photonenschneise,
   dichter Gegnerpulk, AEGIS und NEXUS.
3. Die Orbitklinge darf auch bei vielen Projektilen die Gegner nicht
   überstrahlen. Die Kulisse darf die Bosswarnungen nicht verschlucken.
4. Echte Browser-Screenshots anfertigen, falls die Umgebung dies erlaubt:
   Station offline/teilrepariert, Station mit Kernstufe, Kampf mit
   Einzelklinge und Kampf mit Mehrfachschuss. Screenshots nur unter
   docs/review/d043-*.png speichern.
5. Echte FPS/1-%-Low gegen die Besitzerreferenz 56/58/0,0 Prozent prüfen,
   soweit messbar. Kein erkennbarer Rückschritt. Ohne sichtbaren Browser die
   Grenze offen benennen und keine visuelle Freigabe behaupten.
6. Tote CSS-Regeln, doppelte IDs und ersetzte D-042-Hotspot-Dekoration
   entfernen. Keine zweite Station parallel im DOM verstecken.
7. Alle neuen Zustände erhalten Tests; keine bestehende Schwelle wird
   gelockert.

## Unverhandelbare Grenzen

- Keine Änderung an Waffen-/Passivschaden, Trefferboxen, Reichweiten,
  Geschossgeschwindigkeit, Zielwahl, XP-Kurve, Evolutionen, Gegnerwerten,
  Dichte, AEGIS/NEXUS, Heilung oder Magnetradius.
- Keine Änderung an Ressourcenpreisen, Produktionstakt, Stationsdatenmenge,
  Kernkosten, Protokollwirkungen, Ausrüstungsfund oder Auszahlung.
- Save bleibt Version 5. Keine neuen persistierten Felder ohne echten Bedarf;
  vorhandene Spielstände dürfen niemals gelöscht oder still zurückgesetzt
  werden.
- SIGNAL SICHERN, Rammjäger-Fix, EVO-Hinweis links, NEXUS-Finale und
  D-042-Protokolle bleiben funktional.
- Kein Audio, Backend, Konto, PvP, Koop, Monetarisierung, neue Waffe,
  Gegnerfamilie, Bossphase, Sektor oder Engine.
- Keine Netzwerk-, Paket-, Build- oder Laufzeitabhängigkeit.
- Keine Franchise-Namen oder erkennbaren geschützten Designs.
- Kein Push. Nur Codex prüft, dokumentiert und pusht den Stand.
- Geschützte Dokumente und Konzeptbilder nicht verändern.

## Agenten- und Arbeitsregel

OpenCode soll günstige/einfache Subagenten für mindestens drei klar getrennte
Aufgaben einsetzen, sofern seine Umgebung das erlaubt:

1. visueller Read-only-Audit der drei Konzeptbilder gegen aktuelle Station,
   Klinge und Hintergrund;
2. isolierter Entwurf/Implementierung der Klingen-Sprites oder dazugehörigen
   Tests;
3. isolierter Stations-SVG-/Layoutentwurf ohne gleichzeitige Bearbeitung
   derselben index.html-Bereiche;
4. am Ende unabhängige Diff-, DOM-, Save- und Renderkostenprüfung.

OpenCode bleibt für Architektur, Integration und Tests verantwortlich. Es
liest jeden Subagenten-Diff vollständig und übernimmt keine Aussage
ungeprüft. Wegen der monolithischen index.html dürfen niemals zwei Agenten
gleichzeitig überlappende Bereiche editieren. Ein Subagent darf alternativ
nur Analyse oder einen separaten SVG-Entwurf liefern. Ist keine
Subagentenfunktion verfügbar, im Bericht vermerken und selbst weiterarbeiten.

Sinnvolle kleine lokale Commits nach jedem grünen Gate sind erlaubt. Nach
jedem Integrationsschritt git diff prüfen. Keine fremden Änderungen
überschreiben.

## Automatische Abnahme

Vorher Baseline dokumentieren. Danach mindestens:

1. npm test vollständig grün; keine Schwelle oder Erwartung nur zum
   Grünmachen lockern.
2. Bestehende 58 Verträge, insbesondere baselineIsolated,
   stationCoreFlow, stationDomContract, sectorObjectiveFlow,
   finalBossFlow, combatArtV3 und renderCostContract bleiben grün.
3. Neuer combatArtV4-Vertrag:
   - neue Klingenform in Projektil, Karte und HUD;
   - mindestens vier Rotationsphasen und 16 Richtungen oder gleichwertig;
   - deterministischer Phasenversatz;
   - nur ein komponiertes drawImage je Klingenprojektil;
   - keine sichtbare permanente lightRadius-Kontur;
   - Hintergrunddichte reduziert und keine verbotene Hot-Loop-Arbeit.
4. Neuer stationSceneV2-Vertrag:
   - genau ein Stationsszenengraph, sechs physische Module und Kern;
   - keine sechs generischen Kreisbuttons als sichtbare Hauptdarstellung;
   - eindeutige saveabhängige Zustandsklassen;
   - genau ein Detailpanel/Drawer;
   - alle bisherigen Aktions-IDs genau einmal vorhanden;
   - Kernstufen, Daten und Protokoll besitzen sichtbare Szenenzustände.
5. Interaktionstests für Reparatur, Produktion, Einsammeln, Kernupgrade und
   Protokollwahl prüfen sowohl bestehende Fachwirkung als auch den
   unmittelbar aktualisierten Szenenzustand.
6. Save-v5-Rundlauf mit vollständigem Vergleich der bestehenden Daten.
7. Baseline ohne aktives Protokoll bleibt über alle 18 Fingerprints
   bitidentisch zu 6b69bcf.
8. aspectIndependent, minCombatHeight und alle mobilen DOM-Prüfungen bleiben
   grün.
9. Renderkosten: kein Canvas pro Frame, keine gegner- oder
   projektilabhängigen Gradienten/shadowBlur-Wechsel, keine zweite
   Gegnerzeichenschleife.
10. npm test, git diff --check und eine Suche nach doppelten IDs sauber.

Quelltext-Stringtests allein genügen für die visuelle Abnahme nicht. Sie
dürfen strukturelle Garantien absichern, müssen aber durch Browserprüfung oder
ehrlich offene Besitzerprüfung ergänzt werden.

## Manuelle Abnahme durch OpenCode

Wenn ein sichtbarer Browser verfügbar ist:

1. Station frisch/offline, teilweise repariert und Kernstufe 3 bei
   1280×720 und 844×390 prüfen.
2. Jedes sichtbare Gebäudeteil antippen; der passende Drawer öffnet, die
   Station bleibt räumlich erkennbar, zweiter Tap schließt nicht alles.
3. Reparieren, produzieren/einsammeln, Kern ausbauen und Protokoll wechseln;
   jede Aktion muss sofort an der Station sichtbar werden.
4. 8-Minuten-Run starten und Einzelklinge, Mehrfachschuss sowie
   Photonenschneise im Bewegtbild prüfen.
5. Kontrollieren, dass kein permanenter großer Ring um den Avatar sichtbar
   ist und Signal-/Boss-/Schildringe trotzdem verständlich bleiben.
6. Im dichten Pulk und Finale Hintergrundruhe, Gegnerlesbarkeit und FPS
   prüfen.
7. Rückkehr zur Station: gesicherte Daten und Kernfortschritt müssen als
   räumliches Ergebnis lesbar sein.

Ohne Browser diese Punkte nicht als bestanden melden.

## Erlaubte Dateien

- prototype/web/index.html
- prototype/web/assets/orbitblade-station-v2.svg, falls technisch begründet
- prototype/web/assets/orbitblade-blade-v2.png, nur wenn ein echtes
  transparentes RGBA-Prototypasset reproduzierbar erzeugt und dokumentiert wird
- tools/run-balance-suite.mjs
- CHANGELOG.md
- docs/WORK_REPORT.md
- docs/ASSET_PROVENANCE.md
- docs/review/d043-*.png ausschließlich für echte Prüfscreenshots

Geschützt sind AGENTS.md, CLAUDE.md, README.md, ROADMAP.md,
docs/CURRENT_TASK.md, docs/DECISIONS.md, docs/TESTPLAN.md, docs/WORKFLOW.md,
alle Konzeptbilder und der gesamte lokale Orbitblade-Referenzordner.

## Rückgabe

docs/WORK_REPORT.md vollständig nach docs/WORKFLOW.md ersetzen und zusätzlich
liefern:

- Task-ID, Status, Ausgangscommit und anfänglicher Git-Status;
- Ergebnis und Beleg je Gate;
- Liste der Subagenten, deren Auftrag, Ergebnis und OpenCodes eigene Prüfung;
- konkrete Vorher-/Nachher-Unterschiede für Klinge, Hintergrund, Avatar-Ring
  und Station;
- genaue Renderstrategie und Renderkosten;
- Nachweis, dass Kampfwerte, Ökonomie und Save v5 unverändert blieben;
- Screenshots oder ehrliche Angabe, warum sie nicht möglich waren;
- alle Testbefehle mit Exitcode und relevante Messwerte;
- geänderte Dateien und lokale Commits;
- Risiken, Abweichungen, offene manuelle Prüfungen;
- finalen git status --short --branch;
- klare Empfehlung an Codex: abnehmen, nacharbeiten oder blockiert lassen.

OpenCode pusht nicht und beginnt keinen Folgeauftrag.
