# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-26-01
- **Entscheidung:** D-044
- **Thema:** Echte Orbitklinge und Rekonstruktionskapitel 1
- **Status:** **FREIGEGEBEN_FUER_OPENCODE**
- **Auftraggeber:** Besitzer
- **Projektleitung und Abnahme:** Codex
- **Ausführung:** OpenCode; unabhängige Review, kanonische Dokumentation und
  Push ausschließlich durch Codex
- **Priorität:** P0 – Kernidentität der Waffe und dauerhafte Run-Motivation
- **Verbindlicher Code-/Baseline-Ausgangscommit:** `036b5de`
- Der direkt darauf folgende reine D-044-Planungscommit enthält nur diesen
  Auftrag und kanonische Dokumentation. Er ist der erwartete Startpunkt für
  OpenCode und keine Baseline-Abweichung.
- **Zeitregel:** Nutze das gesamte verfügbare OpenCode-Zeitfenster produktiv.
  Arbeite alle Pflicht-Gates in der festgelegten Reihenfolge ab und stoppe
  nicht nach Analyse, Klingenprototyp, Save-Schema oder einem ersten grünen
  Teiltest. Wenn alle Gates früh fertig sind, investiere die Restzeit
  ausschließlich in Bedienfluss, sichtbare Stationszustände, Performance und
  zusätzliche Regressionen innerhalb dieses Auftrags. Bei drohendem Zeitlimit
  den letzten vollständig grünen Gate-Stand lokal committen und den Rest
  ehrlich als TEILWEISE dokumentieren.

Bei Widersprüchen mit AGENTS.md, CLAUDE.md, historischen Roadmap-Texten,
älteren Berichten oder D-043 gilt ausschließlich dieser Auftrag.

## Verbindlicher Besitzerbefund nach D-043

D-043 ist technisch sauber und bleibt als Ausgangspunkt erhalten. Die
sichtbare Besitzerabnahme hat aber vier Produktprobleme bestätigt:

1. Das ursprüngliche Konzept zeigt eine gebogene Klinge, die durch Gegner
   fliegt, kurz um ein wichtiges Ziel kreist und auf einer zweiten Bahn zum
   Spieler zurückkehrt. Im Spiel wurde nur eine gerade Projektilbewegung mit
   anders ausgerichteten Bildern gebaut.
2. Der Hintergrund ist ruhiger und wieder besser, wirkt aber noch nicht ganz
   modern und spacig. Hier ist nur ein kleiner Feinschliff nötig.
3. Die Stationsnavigation fühlt sich hakelig an. Der Spieler öffnet mehrere
   Detailflächen, sammelt Werte ein und verlässt die Station wieder, ohne eine
   klare Entscheidung oder einen flüssigen Ablauf.
4. Der heutige Meta-Fortschritt endet nach wenigen marginalen Boni. Es fehlt
   ein sichtbarer, länger tragender Grund, weitere Runs zu spielen.

Die Lücke bei der Klinge entstand durch den alten Scope: D-043 fror
Bewegungslogik, Reichweite und Trefferpfad ein, obwohl die Bildreferenz einen
echten Rückflug verlangte. D-044 korrigiert diese Produktentscheidung
ausdrücklich. Die Station wird diesmal nicht nur neu präsentiert, sondern
mechanisch erweitert.

## Produktziel

D-044 baut einen zusammenhängenden vertikalen Slice:

> Die Orbitklinge soll sich wie die namensgebende Signaturwaffe spielen.
> Jeder sinnvolle Run soll die Orbitalstation sichtbar einem gewählten Projekt
> näherbringen und neue Spielentscheidungen freischalten.

Erfolg bedeutet:

- Die Standardwaffe fliegt sichtbar hinaus, umkreist ihr priorisiertes Ziel
  und kehrt zum bewegten Spieler zurück.
- Ein routinemäßiger Stationsbesuch braucht höchstens zwei bewusste Klicks bis
  zum nächsten Start; ein Ausbau mit Auswahl höchstens vier.
- Nach jedem sinnvollen Run ist an genau einem angehefteten Projekt sichtbarer
  Fortschritt entstanden.
- Ein normaler erfolgreicher Acht-Minuten-Run ermöglicht ungefähr ein
  Rang-1-Projekt; spätestens zwei ähnliche Runs ermöglichen das nächste
  relevante Projekt.
- Die zwölf neuen Modulränge liefern neue Entscheidungen und Zielsetzungen,
  keine endlose Prozentleiter.
- Der neue Hintergrund wirkt moderner und räumlicher, bleibt aber ruhiger als
  D-042.

## Bewusste Grenzen

Nicht Teil dieses Auftrags:

- neue Engine, Buildsystem oder externe Laufzeitabhängigkeit;
- Backend, Konto, Cloud-Save, Mehrspieler, Audio oder Monetarisierung;
- neue Gegnerfamilien, Bosse, Waffen oder Sektoren;
- globale Änderungen an Gegnerdichte, XP-Kurve, AEGIS- oder NEXUS-Lebenspunkten;
- allgemeiner Waffenrollenpass für Splitter, Blitz, Plasmakern,
  Rundenklinge/Frost oder Drohnen;
- endloser Städtebau, frei platzierbare Gebäude oder neue Produktionswährung;
- vollständiger Art-/Rechte-Pass.

Die einzige absichtliche Kampfänderung betrifft die interne Waffe `bogen`
(Orbitklinge/Photonenschneise). Andere Waffenwerte bleiben unverändert.
Asterit und Stationsdaten tragen die neue Rekonstruktion; keine siebte
Währung erfinden.

## Verbindliche Referenzen

Vor der Implementierung vollständig lesen beziehungsweise ansehen:

1. `docs/concepts/orbitblade-combat-direction-v1.png`
2. `docs/concepts/orbitblade-combat-ui-direction-v2.png`
3. `docs/concepts/orbitblade-station-direction-v1.png`
4. `docs/concepts/README.md`
5. D-044 in `docs/DECISIONS.md`
6. den aktuellen Projektilpool, `shoot()`, `updateProjectiles()`,
   `projectileHitOnce()`, `priorityEnemy()`, Kartenangebote, Save v5,
   `renderStationMap()`, `renderHold()` und `endRun()`

Die Bildreferenz ist diesmal auch mechanisch verbindlich: hinausfliegen,
kurz um ein Prioritätsziel bogenförmig kreisen und auf einer zweiten
sichtbaren Bahn zurückkehren.

## Gate 0 – Audit, Baseline und Arbeitsaufteilung

1. `git status --short --branch`, Ausgangscommit und `npm test`
   protokollieren.
2. Vor der ersten Änderung die heutigen 18 Baseline-Fingerprints, den
   Botmittelwert, die neun Seed-Ergebnisse, `weaponRoles`,
   `nexusBenchmark` und Renderkosten in `docs/WORK_REPORT.md` festhalten.
3. Den Projektilpool einschließlich Trefferhistorie vollständig prüfen.
   Besonders dokumentieren, warum die heutige Bewegung
   `x += vx * dt; y += vy * dt` keine Rückkehr besitzt.
4. Save-v5-Felder, Produktionsgutschrift, Run-Ende und alle bestehenden
   Stationsaktionen vollständig prüfen. Keine zweite Auszahlungsquelle neben
   `endRun()` erfinden.
5. Vor dem Coding eine kurze Datenstrategie für Klingenphasen und Save v6 in
   den Arbeitsbericht schreiben.
6. Nutze günstige/einfache Subagenten für begrenzte Aufgaben:
   - read-only Audit von Projektilpool und Trefferledger;
   - isolierter Entwurf der Save-v6-Bereinigung und Progressionstabellen;
   - unabhängige Testvertragsprüfung;
   - optional statischer SVG-/Responsive-Audit.
   OpenCode prüft jeden Subagenten-Diff vollständig selbst. Architektur,
   Integration, Balanceentscheidung und Abschlussprüfung bleiben beim
   Hauptagenten.

Gate 0 endet nicht mit einem Bericht. Danach sofort Gate A bearbeiten.

## Gate A – Orbitklinge V3 als echte Bumerang-Waffe

### Flugzustände

Jede interne `bogen`-Klinge besitzt deterministisch drei echte
Bewegungsphasen:

1. **HINAUS:** eine gut lesbare Kurve vom Abwurfpunkt zum mit
   `priorityEnemy()` gewählten Ziel. Boss vor Elite vor normalem Gegner.
2. **ORBIT:** bei Erreichen des Zielbereichs eine kurze Bogenbewegung von
   ungefähr 180 bis 270 Grad um das Ziel, Dauer 0,24 bis 0,36 Sekunden.
3. **RÜCKKEHR:** zweite, von der Hinflugbahn unterscheidbare Kurve zur
   aktuellen Spielerposition. Der Spieler darf sich bewegen; die Klinge
   korrigiert weich und wird am Spieler sichtbar eingefangen.

Weitere Regeln:

- Stirbt oder verschwindet das Ziel, beginnt sofort eine saubere Rückkehr.
- Ohne legales Ziel fliegt die Klinge entlang der letzten Zielrichtung zu
  einem deterministischen Wendepunkt und kehrt zurück.
- Eine harte Sicherheitszeit von höchstens 1,6 Sekunden verhindert verlorene
  Projektile.
- Kein Teleport, kein plötzliches Verschwinden am Ziel und kein gerader
  Rückwärtsflug exakt auf derselben Linie.
- Mehrere Klingen verwenden deterministische Seiten-/Phasenversätze und dürfen
  nicht deckungsgleich kreisen.
- Die bestehende Zielpriorität auf AEGIS/NEXUS und Eliten bleibt erhalten.

### Sichtbare Eigenrotation

Die Klinge dreht während aller drei Flugphasen sichtbar um ihren eigenen
Mittelpunkt. Das ist unabhängig von der Bahntangente:

- mindestens acht, bevorzugt 12 bis 16 vorgerenderte Drehwinkel;
- ungefähr 2,5 bis 3,5 vollständige Umdrehungen pro Sekunde;
- asymmetrische gebogene Cyan-Schneide und weiß-goldener Kern bleiben in
  Einzelbildern lesbar;
- genau ein `drawImage` je Klingenprojektil und Frame;
- kurze Spur zeigt die Bahnrichtung, nicht eine zweite Waffe;
- Photonenschneise nutzt dieselbe Form mit klarer Goldkante/kräftigerer
  Schneide, ohne eine größere Trefferfläche vorzutäuschen.

### Treffer- und Schadensvertrag

- Ein Gegner darf während HINAUS plus ORBIT zusammen höchstens einmal und
  während RÜCKKEHR höchstens einmal getroffen werden.
- Kein Gegner erhält Tick-Schaden in jedem Orbit-Frame.
- Das bestehende Durchschlagsbudget gilt je Flugbein. Bossfokussierte und
  evolvierte Klingen behalten ihre heutige Sonderbehandlung.
- Ausgangspunkt für die Abstimmung sind 55 Prozent des heutigen
  Einzeltrefferschadens pro Flugbein. OpenCode darf diesen Split nur innerhalb
  eines isolierten Benchmarks feinjustieren.
- Ein Ziel, das beide Flugbeine trifft, soll insgesamt ungefähr 95 bis
  120 Prozent des bisherigen direkten Schadens erhalten. Der Rückweg darf
  zusätzliche Gegner treffen; der feste Crowd-Benchmark darf höchstens
  30 Prozent über D-043 liegen.
- Schaden und Boss-Schaden werden weiterhin ausschließlich der internen Quelle
  `bogen` zugerechnet.
- Windriss/Photonenschneise behält seine Sogwirkung entlang der realen Bahn,
  erzeugt aber keinen zusätzlichen unsichtbaren Schaden.
- Feuerfrequenz, Kartenstufen, Evolutionvoraussetzung und sichtbare
  Waffenbezeichnungen bleiben unverändert.

Der Projektilpool darf um typisierte, vorallozierte Felder erweitert werden.
Keine Objekt-, Array-, Canvas-, Gradienten- oder Closure-Allokation je
Klingenprojektil und Frame.

## Gate B – kleiner moderner Space-Hintergrund-Pass

D-043 wird nicht verworfen. Der Feinschliff beschränkt sich auf Komposition:

1. Mindestens 70 Prozent des Kampfausschnitts bleiben ruhige mittelhelle
   Navy-/Blaugrau-Fläche.
2. Ersetze den letzten Eindruck kleiner technischer Kästen durch wenige große,
   asymmetrische Decksegmente oder eine breite gebrochene Orbitalstruktur.
3. Höchstens ein großer, kontrastarmer Ring-/Horizontbogen prägt einen
   sichtbaren Ausschnitt. Ein violetter Planetenrand oder Nebelband darf nur
   peripher Raumtiefe geben.
4. Sehr wenige Sterne liegen hinter oder außerhalb der Deckstruktur.
   Dünne Cyan-/Weißgold-Navigationslinien sind seltene Akzente, keine
   Kachelbegrenzung.
5. Keine neue flächige Abdunklung, kein Mikropunktraster, kein dichter
   Leitungsplan, kein Bloom-Nebel und keine sichtbare Safe-Area-Kante.
6. Statische Ebenen bleiben deterministisch vorgerendert. Gameplay-RNG,
   Simulation, Cover-Skalierung, Culling und die heutige Obergrenze teurer
   Operationen pro Frame bleiben unverändert.
7. Gegner, XP, Klinge sowie rote/violette Warnungen müssen stärker als jede
   neue Dekoration bleiben.

## Gate C – flüssiger Stationsbesuch statt Drawer-Klickstrecke

Die Station bleibt dieselbe zusammenhängende 1000×560-SVG-Szene. Die
Bedienung wird jedoch neu geordnet:

1. Es gibt genau eine kompakte `stationtray`-Aktionsfläche für das gewählte
   Modul statt sieben unabhängig wirkender Voll-Drawer. Bestehende
   Aktions-IDs dürfen intern weiterverwendet werden, bleiben aber je exakt
   einmal im DOM.
2. Antippen eines Baukörpers aktualisiert Auswahl, sichtbare Kontur,
   Modulstatus, nächsten Ausbau und primäre Aktion im selben Frame.
3. Ein Wechsel erhält keinen alten Scrollzustand oder verdeckten zweiten
   Drawer. Eine 140- bis 200-ms-Überblendung/Bewegung darf den Wechsel
   beruhigen; `prefers-reduced-motion` schaltet sie ab.
4. Auf 844×390 bleibt die Station sichtbar. Die Tray-Höhe liegt geschlossen
   unter 42 Prozent der Anzeige, ist intern scrollbar und verdeckt weder
   Ressourcen noch Launch dauerhaft.
5. Beim echten Eintritt in die Station werden fertige Produktionen aus
   Sonde, Fabrikator, Fluxlabor und Simulation genau einmal automatisch
   eingesammelt. Eine gemeinsame Ankunftszeile nennt die Summen. Wiederholtes
   `renderHold()`, Modulwechsel oder Reload ohne neue Produktion zahlen
   nichts doppelt aus.
6. Ohne Ausbauentscheidung sind vom Stationsstart bis zur nächsten Sortie
   höchstens zwei bewusste Klicks nötig. Mit Projektwahl und Bau höchstens
   vier.
7. Launch, letzter Run-Bericht und angeheftetes Projekt bleiben ohne
   Modulsuche erreichbar.
8. Tastatur, Touchflächen ab 44 CSS-Pixeln, Fokuszustände und ARIA-Namen
   bleiben funktionsfähig. SVG und Overlay teilen weiter exakt 1000:560.

## Gate D – Save v6 und Rekonstruktionsleiter

### Additive Migration

Save v5 wird verlustfrei auf v6 migriert. Bestehende Ressourcen, Gebäude,
Ausrüstung, Kernstufen, Protokolle und letzter Run-Bericht bleiben erhalten.

Neue Felder:

- `moduleRanks` mit Whitelist
  `mine, forge, arcanum, yard, armory, map`, je Ganzzahl 0 bis 2;
- `projectFocus`: eine Modul-ID oder `none`;
- `weaponFocus`: eine legale Nicht-Orbitklingen-Waffen-ID oder `none`;
- `dashMod`: `none`, `afterburner`, `repulsor` oder `phase`;
- `gearTargetSlot`: `none`, `weapon`, `charm` oder `mantle`;
- `gearTargetItem`: legale Ausrüstungs-ID im gewählten Slot oder `none`;
- `stationMission`: `none`, `signal`, `aegis` oder `nexus`;
- `stationRisk`: Boolean.

Unbekannte, falsche oder nicht freigeschaltete Werte werden auf sichere
Defaults bereinigt. Alte Saves erhalten überall Rang 0 und keine Auswahl.
Ein alter Spielstand darf niemals still zurückgesetzt werden.

### Zwölf Projekte

Sechs Module erhalten je zwei zusätzliche Rekonstruktionsränge. Der
Gesamtfortschritt ist abgeleitet:

`Rekonstruktion = coreStage + Summe(moduleRanks)` mit Maximum 15.

Für alle Module gelten dieselben klaren Projektkosten:

- Rang 1: 8 Asterit + 1 Stationsdatei;
- Rang 2: 16 Asterit + 2 Stationsdaten.

Voraussetzung ist, dass das zugehörige Modul repariert beziehungsweise bei
Ausrüstungsbucht/Sternenkarte bereits online ist. Kosten werden genau einmal
abgezogen. Ein gebauter Rang kann nicht erneut gekauft werden.

### Fortschritt aus Runs

Keine neue Währung:

- jeder sinnvolle Run mit mindestens 3:00 Spielzeit oder regulär
  abgeschlossenem 3-Minuten-Modus sichert einmalig 1 Stationsdatei;
- SIGNAL SICHERN liefert weiterhin 1;
- echter NEXUS-Kill liefert weiterhin 1;
- eine erfüllte Stationsmission kann 1 weitere liefern;
- dieselbe Quelle zahlt pro Run höchstens einmal.

Ein normaler vollständiger Acht-Minuten-Run mit Signal und NEXUS liefert
damit 3 Stationsdaten plus die bestehende Asteritbeute. Ein Abbruch unter
3:00 darf keine Stationsdatei farmen; die bestehende Basisbeute bleibt
unangetastet.

Die Referenzprogression muss in einer deterministischen Simulation zeigen:

- nach einem normalen erfolgreichen Acht-Minuten-Run ist mindestens ein
  Rang-1-Projekt finanzierbar, sofern ein repariertes Rang-0-Modul existiert;
- zwischen zwei finanzierbaren relevanten Projekten liegen höchstens zwei
  vergleichbare vollständige Runs;
- alle zwölf Modulränge sind ohne Idle-Wartezwang ungefähr in 8 bis 12
  erfolgreichen Referenzruns erreichbar;
- Kernstufen und Modulprojekte konkurrieren sichtbar um Stationsdaten, ohne
  einen mathematischen Deadlock zu erzeugen.

## Gate E – konkrete Freischaltungen der sechs Module

Alle Effekte sind erst nach gebautem Rang aktiv. Ohne Modulränge bleibt nur
die neue Orbitklingenmechanik als absichtliche D-044-Kampfänderung.

### Asteroidensonde

- **Rang 1 – Signalscanner:** SIGNAL-Ladezeit 8,0 → 6,5 Sekunden.
- **Rang 2 – Datenlinse:** ein gesichertes Signal liefert zusätzlich genau
  2 Asterit. Keine zusätzliche Stationsdatei und keine Doppelgutschrift.

### Materiefabrikator

- **Rang 1 – Waffenmatrix:** Vor dem Run darf eine der fünf
  Nicht-Orbitklingen-Waffen als Fokus gewählt werden. Eine legale Karte
  dieser Waffe erscheint spätestens im dritten tatsächlichen Kartenzug.
- **Rang 2 – Evolutionskopplung:** Das zugehörige Evolutions-Passiv erscheint,
  sofern legal, spätestens im sechsten tatsächlichen Kartenzug.
- Es werden keine zusätzlichen Karten, Stufen oder Picks erzeugt. Ist die
  Karte bereits maximal/evolviert oder anderweitig illegal, wird keine
  ungültige Karte erzwungen.

### Fluxlabor

- **Rang 1:** ein Banish pro Run.
- **Rang 2:** zwei Banishes pro Run.
- Banish entfernt die gewählte normale Waffen- oder Passivkarte für den Rest
  des Runs und ersetzt das Angebot legal, ohne Pick oder Reroll zu verbrauchen.
- Orbitklinge, Evolutionen, Elite-Module und Gearkarten sind nicht bannbar.
  Bereits investierte Stufen bleiben erhalten; nur weitere Angebote entfallen.
- Fokuswaffe und ihr gekoppeltes Passiv dürfen nicht gleichzeitig durch die
  eigene Vorbereitung unbrauchbar gemacht werden.

### Simulationsdeck

Ab Rang 1 wird vor dem Run genau eine Impulsstoß-Sidegrade gewählt:

- **Nachbrenner:** +30 % Distanz, +25 % Abklingzeit;
- **Repulsor:** -15 % Distanz, stößt normale Gegner ohne Schaden zurück;
- **Phasenmantel:** +0,18 s Unverwundbarkeit, +25 % Abklingzeit.

Rang 2 halbiert nur den jeweiligen Nachteil: +12,5 % Abklingzeit,
-7,5 % Distanz beziehungsweise +12,5 % Abklingzeit. Keine Variante verursacht
direkten Schaden oder trivialisiert Bosswarnungen.

### Ausrüstungsbucht

- **Rang 1:** ein Zielslot kann gewählt werden; dessen Gewicht beim nächsten
  echten Ausrüstungsfund ist dreifach.
- **Rang 2:** innerhalb des Zielslots darf ein konkretes Teil gewählt werden;
  sein Gewicht ist dreifach, aber der Fund bleibt nicht garantiert.
- Bestehende Bevorzugung unbesessener Teile, Ranggrenze, Duplikatstaub,
  Ausrüstungsplätze und Bergungsscanner bleiben intakt.

### Sternenkarte

- **Rang 1:** Vor einer Acht-Minuten-Sortie kann genau eine Mission gewählt
  werden: SIGNAL sichern, AEGIS besiegen oder NEXUS besiegen. Erfüllung gibt
  einmalig 1 Stationsdatei. Drei-Minuten-Runs zeigen diese Missionen als
  nicht verfügbar und zahlen sie nicht aus.
- **Rang 2:** optionales Risikoprotokoll: sämtlicher feindlicher Kontakt-,
  Projektil- und Bossgefahrenschaden +15 Prozent, Asteritbeute ×1,25.
  Dichte, Gegner-HP und XP bleiben unverändert.
- Mission, Risiko, Erfüllung und Auszahlung erscheinen im Run-Bericht.

### Sichtbare Rekonstruktion

Jeder Modulrang verändert den echten SVG-Baukörper:

- Rang 1 fügt ein klar erkennbares Strukturteil hinzu;
- Rang 2 ergänzt eine zweite sichtbare Geometrie-/Energieebene;
- nicht nur Text, Zahl, Farbe oder eine weitere Lampe;
- jede Ausbaustufe bleibt bei Handygröße unterscheidbar;
- Gesamtfortschritt 0–15 erscheint kompakt am Kern.

## Gate F – angeheftetes Projekt und Run-Rückkehr

1. Der Spieler kann genau ein nächstes Modulprojekt anheften.
2. Die Station und die Startvorbereitung zeigen Name, Rang, Effekt,
   vorhandene/benötigte Asterit- und Datenmenge sowie einen echten
   Fortschrittsbalken.
3. Nach einem Run fasst eine einmalige Ankunftsübersicht zusammen:
   Asterit, Datenquellen, Mission, automatisch eingesammelte Produktion und
   Fortschritt des angehefteten Projekts.
4. Ist das Projekt finanzierbar, führt die primäre Aktion direkt zum
   passenden Modul. Der Kauf bleibt eine bewusste Bestätigung.
5. Nach dem Bau wird der sichtbare Stationsrang sofort erhöht und das nächste
   Projekt desselben Moduls angeboten oder der Fokus sauber gelöst.
6. Vor dem Start zeigt eine kompakte Zeile, welches konkrete Runziel heute auf
   den Stationsausbau einzahlt. Keine neue permanente Textspalte im Kampf.
7. Run-Bericht und lokal gespeicherter letzter Bericht enthalten
   Rekonstruktionsstand, Datenquellen, Mission/Risiko sowie Hin-/Rücktreffer
   der Orbitklinge, ohne interne IDs anzuzeigen.

## Gate G – automatisierte Verträge und Qualität

Mindestens fünf neue beziehungsweise klar erweiterte Verträge werden
verhaltensbasiert geprüft:

1. **orbitbladeReturnFlow**
   - HINAUS → ORBIT → RÜCKKEHR → Fang in richtiger Reihenfolge;
   - gekrümmte, getrennte Bahnen; bewegter Spieler; Zielverlust-Fallback;
   - ein Treffer pro Gegner und Flugbein, maximal zwei;
   - Bosspriorität und vollständige Schadenszuordnung;
   - deterministische Wiederholung und Sicherheitszeit.
2. **orbitbladeBenchmark**
   - D-043-Einzelziel- und Crowdmessung vor der Änderung protokollieren;
   - Einzelziel 95–120 Prozent, Crowd höchstens 130 Prozent;
   - `nexusBenchmark` bleibt im bestehenden Korridor.
3. **stationProgressV2**
   - v5→v6 verlustfrei, Whitelists/Caps, Kosten genau einmal;
   - Datenquellen einmalig, kein Kurzabbruch- oder Reload-Farming;
   - 12-Projekt-Simulation im Korridor 8–12 Referenzruns, kein Deadlock.
4. **metaUnlockFlow**
   - Fokusgarantien ohne Extrapick, Banish 1/2, drei Dash-Sidegrades,
     Geargewichtung, Mission und Risiko jeweils nur nach Freischaltung;
   - alle Effekte im Run-Bericht und ohne Wirkung im frischen Save.
5. **stationNavigationV3**
   - genau eine Tray-Fläche, eine Auswahl, eine Zielmarke;
   - Auto-Einsammeln exakt einmal, Klickbudget, vorhandene Aktions-IDs je
     einmal, 1000:560-Kopplung und 844×390-Vertrag.
6. **combatBackdropV5**
   - ruhige Flächen/seltene Großstruktur, deterministisch vorgerendert,
     keine erhöhte teure Renderlast.

Zusätzlich:

- `npm test` bleibt vollständig grün; Ziel sind mindestens 65 Checks.
- `git diff --check` bleibt sauber.
- Botanker `19.78 ±3` und Toleranz dürfen von OpenCode nicht geändert
  werden. Liegt die neue normalisierte Klinge außerhalb, als
  Balanceentscheidung an Codex melden statt die Schwelle zu lockern.
- Die 18 D-043-Fingerprints werden sich durch die absichtliche
  Orbitklingenmechanik ändern. Vorher/Nachher je Seed dokumentieren und erst
  nach bestandenem Klingenbenchmark auf eine neue D-044-Referenz setzen.
  Nicht von Klinge betroffene Konfiguration, Dichte und Save-Baseline müssen
  stabil bleiben.
- `renderCostContract`: bei 300 Gegnern/281 sichtbar weiterhin höchstens
  zwei Gradienten pro Frame, kein `shadowBlur), kein Canvas pro Frame.
  Genau ein `drawImage` je sichtbarer Orbitklinge.
- Keine neue Objektallokation pro Gegner, Klinge oder Stationsanimation und
  Frame.
- `configStable`, Seitenverhältnisse, Bossarena, Signal, NEXUS,
  Schadensbericht und letzter Run-Bericht bleiben grün.

## Manueller Browser-Smoke

Wenn ein sichtbarer Browser verfügbar ist:

1. Station bei 1280×720 und 844×390 öffnen; mindestens vier Module wechseln.
   Auswahl und Tray müssen sofort und weich reagieren.
2. Produktion bereitstellen, Station neu betreten und beweisen, dass alles
   genau einmal automatisch eingesammelt wird.
3. Ein Projekt anheften und bauen; Baukörper und Gesamtstand müssen sichtbar
   wechseln.
4. Neue Vorbereitungsauswahl je einmal bedienen: Fokuswaffe, Banish,
   Impulsstoß, Gearziel, Mission/Risiko.
5. Einzelne Orbitklinge, mehrere zeitversetzte Würfe, Zielverlust,
   Bossorbit und Rückkehr zum bewegten Spieler prüfen.
6. Hintergrund auf moderne Raumtiefe, Ruhe und Kontrast prüfen.
7. Vollständigen 8-Minuten-Ablauf bis NEXUS und zurück zur Station prüfen;
   FPS, Bericht und Projektfortschritt festhalten.

Ohne sichtbaren Browser diese Punkte ehrlich offen lassen. Kein Screenshot
oder subjektives Spielgefühl behaupten.

## Gate-Reihenfolge bei Zeitdruck

Tests und ein grüner integrierter Stand sind nie optional. Fachliche
Reihenfolge:

1. Gate A – echte Orbitklinge;
2. Gates D und E – Save/Progression und Freischaltungen;
3. Gates C und F – Stationsfluss, Projekt und Rückkehr;
4. Gate B – kleiner Hintergrundpass;
5. Gate G – während jedes Gates erweitern und abschließend vollständig fahren.

Kein Folgegate auf einen roten Zwischenstand stapeln.

## Erlaubte Dateien

- `prototype/web/index.html`
- `tools/run-balance-suite.mjs`
- `CHANGELOG.md`
- `docs/WORK_REPORT.md`
- `docs/ASSET_PROVENANCE.md`, nur falls neue oder abgeleitete Assets entstehen
- `prototype/web/assets/orbitblade-*.png` oder `.svg`, nur wenn wirklich
  nötig, reproduzierbar dokumentiert und mit funktionierendem Fallback

Geschützt sind AGENTS.md, CLAUDE.md, README.md, ROADMAP.md,
docs/CURRENT_TASK.md, docs/DECISIONS.md, docs/TESTPLAN.md, docs/WORKFLOW.md,
alle Konzeptbilder und der lokale Orbitblade-Referenzordner.

Keine sonstigen Projektdateien ändern. OpenCode pusht nicht.

## Lokale Commits

Erlaubt und erwünscht sind kleine grüne Commits entlang der Gates, zum Beispiel:

1. Orbitklingenbewegung und Benchmark;
2. Save v6 und Rekonstruktionslogik;
3. Freischaltungen und Stationsnavigation;
4. Hintergrund-/Responsive-Pass;
5. Tests, Bericht und Changelog.

Jeder Commit muss startbar sein. Keine Fixup-/WIP-Commits als Endstand.

## Rückgabe in docs/WORK_REPORT.md

Den bisherigen Bericht vollständig ersetzen und mindestens liefern:

- Task-ID, Ausgangscommit und anfänglichen Git-Status;
- eingesetzte Subagenten, deren begrenzte Aufgabe, Ergebnis und OpenCodes
  eigene Prüfung;
- Status und Beleg für jedes Gate;
- D-043→D-044-Vergleich der Klingenbahn einschließlich Treffermengen und
  Damage-Benchmarks;
- Save-v5→v6-Migrationsmatrix mit altem und neuem Beispielsave;
- Kosten-/Run-Simulation für alle zwölf Projekte;
- Wirkung und Sperrbedingung jeder Freischaltung;
- Auto-Einsammel- und Doppelgutschrift-Nachweis;
- Vorher/Nachher der 18 Baseline-Fingerprints und Botmittelwert;
- Renderkosten und, falls möglich, Browsergrößen/FPS;
- alle Befehle mit Exitcode;
- geänderte Dateien und lokale Commits;
- Risiken, Abweichungen und offene manuelle Prüfungen;
- abschließenden `git status --short --branch`;
- klare Empfehlung an Codex: abnehmen, nacharbeiten oder blockiert lassen.

OpenCode beginnt keinen Folgeauftrag und pusht nicht.
