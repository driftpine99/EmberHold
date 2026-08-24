# Sci-Fantasy-Neuausrichtung – Vorproduktionsprüfung

**Stand:** 24.08.2026

**Status:** Name entschieden; visueller Erstauftrag freigegeben

**Gehört zu:** `docs/ORBITBLADE_CONCEPT_DRAFT.md`

## Kurzurteil

Der neue Sci-Fantasy-Rahmen passt zum vorhandenen Spiel. Er löst aber nur dann
ein echtes Produktproblem, wenn Emberhold als spielerische Grundlage erhalten
bleibt und nicht nur umbenannt wird. Der Run braucht weiterhin bessere
Lesbarkeit, eine markante Startwaffe, ein klares Zwischenziel und später einen
nützlicheren Hub.

Der Besitzer hat den Namen entschieden: **Orbitblade bleibt** trotz der unten
dokumentierten Kollision. Für den ersten Auftrag gelten zwei Schutzregeln:

1. Die Raumstation wird in Stufe A nur neu inszeniert; Laufzeiten,
   Ressourcenflüsse und Baseline-Balance bleiben identisch.
2. Der erste Umbau bleibt vollständig visuell und semantisch. Der ausstehende
   D-036-Feldlauf folgt danach und bleibt Gate vor Rückflugmechanik, neuer
   Balance oder neuem Content.

Damit ist der visuelle Erstauftrag klein, messbar und freigegeben.

## 1. Verbindlicher Produktkern

- Solo-PvE-Bullet-Heaven mit achtminütigen Runs und optionaler Overtime.
- Browser-Prototyp auf GitHub Pages, spielbar auf Desktop und im mobilen
  Querformat. Kein Backend, Konto, PvP, Koop, Cloud-Save oder Live-KI.
- Die bestehende Simulation, das Hold-System und die Tests sind die technische
  Grundlage. Es findet kein Engine-Wechsel statt.
- Sci-Fantasy statt Fantasy: verlassene Raumstation, fremde Maschinen,
  kosmische Energie und eigenständige psionische Fähigkeiten.
- Keine Namen, Figuren, Kostüme, Sounds, Symbole oder Waffenformen aus Star
  Wars, Star Trek oder anderen bekannten Marken übernehmen. Begriffe wie
  Telekinese, Kettenblitz oder Energieklinge werden eigenständig gestaltet.
- Das visuelle Ziel bleibt stilisiert, klar lesbar und bewusst niedrig
  aufgelöst. Es ist kein realistisches oder isometrisches 3D-Spiel.

## 2. Namens- und Markt-Gate

Der Name **Orbit Blade** ist bereits für ein am 31.07.2026 veröffentlichtes
Sci-Fi-Roguelite auf Steam belegt. Dessen zentrale Beschreibung – Klingen
hinausschleudern und zurückrufen – liegt außerdem sehr nah an unserem neuen
Kernangriff. Unabhängig von einer späteren juristischen Markenprüfung wäre der
Name deshalb kommerziell schlecht unterscheidbar.

Besitzerentscheidung und Folge:

- **Orbitblade** bleibt sichtbarer Produktname; das Risiko ist bewusst akzeptiert.
- Das ist keine juristische Markenfreigabe und keine Aussage, dass ein späterer
  Store den Namen akzeptiert.
- `Emberhold` bleibt vorerst technischer Repository-, Pages- und Save-Name.
- Vor einem monetarisierten Store-Eintrag erfolgt trotzdem eine eigene
  Namens-, Domain- und Markenprüfung; ein nötiger späterer Wechsel bleibt möglich.

## Geschäftsmodell- und Vertriebs-Gate

Die heutige Offline-Architektur mit lokalem Spielstand passt zum Prototyp und
später am besten zu einem einmal bezahlten Premium-Spiel. Ein Free-to-play-
Modell mit Käufen wäre kein kleiner Zusatz: Es bräuchte Konten,
Kaufbelegprüfung, Backend, Manipulationsschutz, Datenschutz, Support und
laufenden Live-Betrieb.

Darum gilt für die Vorproduktion:

- Phase 0 bleibt vollständig ohne Monetarisierung und ohne spekulative
  Shop-Schnittstellen.
- Die Produktannahme lautet vorläufig **kleines Premium-Indiespiel**; der
  konkrete Preis und die Ziel-Stores werden erst nach bestandenem Spaß-Gate
  geprüft.
- Kosmetik, DLC oder andere Erweiterungen sind spätere Optionen, keine
  Voraussetzung für Save-, Stations- oder Kampfarchitektur.
- Falls später ausdrücklich Free-to-play gewählt wird, ist das ein eigenes
  Architektur- und Budget-Gate vor jeder Shop-Implementierung.

## 3. Exakter Run-Vertrag

Die erste Sci-Fantasy-Stufe verändert die vorhandene Taktung nicht:

| Zeitpunkt | Verbindliches Ereignis |
|---|---|
| 0:00 | Start mit Orbitklinge auf Rang 1 |
| ca. 0:30–0:38 | erster menschlicher Kartenzug |
| 2:00 | erstes Elite-Ereignis |
| ca. 4:00 | Evolutionsfokus wird relevant |
| 4:10 | Sektorboss **AEGIS**, Add-Ziel weiterhin 90 |
| 6:00 | zweites Elite-Ereignis |
| 7:00 | Beuteanstieg |
| 8:00 | Extraktion oder freiwillige Overtime |

Ein erstes Sektorziel – Arbeitstitel **„Signal sichern“** – ist eine spätere
Spielerweiterung, keine Bedingung für den visuellen Umbau. Zielkorridor: etwa
2:45 bis vor 4:00. Scheitern kostet nur den Bonus, niemals den ganzen Run.

## 4. Startwaffe: Orbitklinge

### Rolle

Die Orbitklinge ersetzt funktional Langbogen/Windriss und ist die erkennbare
Signaturwaffe des Spiels. Sie darf nicht zusätzlich zur bisherigen Startwaffe
laufen.

- Jeder Run startet mit Orbitklinge Rang 1.
- Sie belegt einen der sechs Waffenplätze.
- Es gibt in der ersten Stufe keine manuelle Zielsteuerung und keinen neuen
  Aktionsknopf.
- Zielpriorität bleibt: Boss, dann Elite, dann nächster normaler Gegner in
  Reichweite. Ohne Ziel fliegt sie in die letzte Bewegungsrichtung.
- Die Boss-Priorität darf nicht von Adds „verbraucht“ werden.

### Flugvertrag der ersten Stufe

1. Gerader Ausflug zum Ziel oder bis zur Maximalreichweite.
2. Klar lesbarer Wendepunkt.
3. Weich gekrümmter Rückflug zur **aktuellen** Spielerposition.
4. Pro Gegner höchstens ein Treffer auf dem Hin- und einer auf dem Rückweg;
   beide Trefferzustände werden getrennt gespeichert.
5. Stirbt das Ziel unterwegs, beendet die Klinge ihre geplante Flugbahn. Sie
   teleportiert nicht und sucht mitten im Flug kein neues Ziel.

Ein zusätzliches Kreisen um das Ziel gehört ausdrücklich **nicht** in den
ersten Produktionsschnitt. Es wäre eine neue Mechanik und erschwert
Lesbarkeit, Trefferregeln und Boss-Balance.

### Balancevertrag

- Bei gleichem Rang liegt der Schaden gegen ein Standardziel höchstens zehn
  Prozent über oder unter dem heutigen Langbogen.
- Ein bewusst ausgerichteter Rückflug darf als Geschicklichkeitsbonus ungefähr
  zehn bis zwanzig Prozent Mehrwert erzeugen.
- Die Evolution **Photonenschneise** übernimmt die Rolle von Windriss:
  unbegrenztes Durchdringen und eine gedeckelte Spur-/Sogwirkung.
- Keine unbegrenzten Treffer, keine Allokationen pro Frame und keine
  Aufweichung der bestehenden Balance-Suite.

## 5. Verbindliche Umbenennung

### Waffen

| Bestehende Funktion | Neuer sichtbarer Name | Evolution |
|---|---|---|
| Langbogen | Orbitklinge | Photonenschneise |
| Splitterköcher | Impulskarabiner | Sternenhagel |
| Feuerkugel | Plasmakern | Sonnenbruch |
| Kettenblitz | Kettenemitter | Sturmnetz |
| Rundenklinge | Sentinel-Drohnen | Orbitalschwarm |
| Frostnova | Kryo-Impuls | Nullpunkt |

**Wichtig:** Sentinel-Drohnen sind eine reine Neuinszenierung der aktuellen
Rundenklinge. Sie geben keinen Schild, keine Schadensreduktion und zerstören
keine Projektile. Damit bleibt D-036 erhalten.

### Passive Module

| Alt | Neu |
|---|---|
| Sehne | Vektorspule |
| Köcher | Munitionsmatrix |
| Linse | Fokussierlinse |
| Amulett | Fluxrelais |
| Federung | Gyrostabilisator |
| Umhang | Schildmatrix |
| Wetzstein | Kantenresonator |
| Magnetstein | Traktorarray |

### Gegner

| Alt | Neu |
|---|---|
| Schwärmer | Sammlerdrohnen |
| Stürmer | Rammjäger |
| Speier | Emitterdrohnen |
| Teiler | Replikatorsonden |
| Wahrer | Bollwerkeinheiten |
| Warden/Boss | **SEKTORBOSS: AEGIS** |

## 6. Raumstation

### Stufe A – sichere Neuinszenierung

Stufe A bildet den bestehenden Hold vollständig ab. Sie verändert keine
Timer, Preise, Erträge, Freischaltungen oder Run-Modifikatoren.

| Hold-Funktion | Stationsmodul |
|---|---|
| Ressourcenabbau | Asteroidensonde |
| Verarbeitung | Materiefabrikator |
| Essenz/Forschung | Fluxlabor |
| Training | Simulationsdeck |
| Ausrüstung | Ausrüstungsbucht |
| Verträge/Run-Wahl | Sternenkarte |

Die Station ist ein flacher 2D-Hub mit HTML-Hotspots und stilisiertem
Hintergrund. Kein begehbares 3D-Deck, keine isometrische Navigation und keine
zusätzliche Kollisionsphysik.

UI-Regeln:

- oben höchstens drei aktuell wichtige Ressourcen;
- weitere Werte nur im passenden Modul;
- Sortienzahl ist Statistik, keine Währung;
- immer genau ein sichtbares nächstes Stationsziel;
- Bedienung muss im mobilen Querformat ohne abgeschnittene Ränder funktionieren.

### Stufe B – spätere echte Erweiterung

Erst nach Abnahme von Run und Stufe A wird entschieden, ob Fortschritt an
Sortien statt an Echtzeit gekoppelt wird. Mögliche zweite Ausbaustufen:

- Asteroidensonde: Bergungsziel im Sektor;
- Materiefabrikator: gezielte Modulkalibrierung;
- Fluxlabor: zweiter vorbereiteter Reroll;
- Simulationsdeck: gespeichertes Vorbereitungs-Preset;
- Ausrüstungsbucht: gezieltes Rang-Upgrade;
- Sternenkarte: zusätzliches Sektorziel.

Diese Punkte sind Optionen, noch kein freigegebener Scope.

## 7. Visuelle und technische Leitplanken

- Kamera und Simulation bleiben flaches Top-down. Die Konzeptbilder sind
  Stimmungsvorlagen, keine Vorgabe für Plattformränder oder Isometrie.
- Keine Abgründe oder Stationskanten, an denen Spieler oder Gegner hängen
  bleiben können.
- Weltbewegung läuft mit Browser-Framerate; Rasterposen wechseln mit etwa
  10–12 Bildern pro Sekunde ohne Crossfade-Doppelbilder.
- Spieler-Vertical-Slice: 4 Idle-, 6 Lauf- und 6 Wurfposen.
- Gegner werden familienweise ergänzt, zunächst mit sechs asynchronen
  Laufposen. Keine neuen großen Sammelatlanten.
- Glows und Kontaktschatten werden vorgerendert; keine teuren Gradienten oder
  `shadowBlur`-Operationen pro Einheit und Frame.
- Der vorhandene Runtime-Assetstand liegt bei rund 6 MB. Der erste Vertical
  Slice bleibt insgesamt unter 10 MB PNG-Runtime-Assets; Zielwert pro Atlas
  höchstens ungefähr 2 MB.
- Pflichtansichten: 1280×720 und 844×390. Ziel bleibt 1-%-Low mindestens 55 FPS
  und weniger als fünf Prozent Messungen unter 55 FPS.

## 8. Save-, Code- und Migrationsvertrag

- Der bestehende Key `emberhold:hold:v1` bleibt in der ersten Stufe erhalten.
- Bestehende interne IDs (`bogen`, `ore`, `bars` usw.) dürfen beim sichtbaren
  Re-Theming zunächst bestehen bleiben. Sichtbare Namen sind davon getrennt.
- Das alte lokale Orbitblade-Save `orbitblade_konzept_save` wird niemals
  gelesen oder importiert.
- Strukturelle Änderungen erfolgen nur mit erhöhter Save-Version und expliziter
  Migration. Kein bestehender Spielstand wird still gelöscht.
- Der lokale Ordner `orbitblade/` ist Referenzmaterial, kein Quellcode- oder
  Asset-Lieferant. Eine Übernahme ist erst nach geklärter Herkunft und Lizenz
  erlaubt.

## 9. KI- und Rechtevertrag

Für jedes neue Runtime-Asset werden Quelle, Erstellungsweg, verwendete
Referenzen, Bearbeitungen und Freigabestatus in `docs/ASSET_PROVENANCE.md`
erfasst. Konzeptbilder sind nicht automatisch Store-Assets.

Generative Prompts dürfen keine lebenden Künstler imitieren und keine
geschützten Figuren, Logos oder eindeutig wiedererkennbaren Franchise-Designs
anfordern. Vor öffentlicher Veröffentlichung folgen ein eigener Art-
Konsistenzpass, Rechteprüfung und die korrekte Plattform-Offenlegung.

## 10. Sichere Produktionsreihenfolge

Jeder Punkt erhält einen eigenen `docs/CURRENT_TASK.md`-Auftrag und eine
separate Abnahme. Es wird nicht parallel an mehreren Punkten gearbeitet.

0. **Entschieden:** Orbitblade bleibt Name; Risiko D-037 ist akzeptiert.
1. **Visueller Erstauftrag:** Sprache, HUD, Safe-Area, Station Stufe A und
   kleiner Grafik-Slice bei bitidentischer Simulation.
2. **D-036-Feldlauf:** menschlicher Acht-Minuten-Lauf nach diesem Slice.
3. **Orbitklinge mechanisch:** Rückflug und DPS-Benchmark erst danach.
4. **Ein Sektorziel:** „Signal sichern“, separat abgenommen.
5. **Station Stufe B:** erst nach eigener Produktentscheidung.

## 11. Abnahme pro Produktionsschritt

Mindestens:

- `npm test` vollständig grün;
- `git diff --check` sauber;
- bei rein visuellen Aufgaben bitidentische Baseline-Läufe;
- Browserprüfung in 1280×720 und 844×390;
- bei Save-Berührung: alter Spielstand laden, speichern und neu laden;
- bei Grafik: Bewegung, Richtungswechsel, Pulk und Boss prüfen;
- nach spielerischen Änderungen ein menschlicher Acht-Minuten-Lauf und die
  Kernfrage: „Will ich freiwillig sofort einen zweiten Run starten?“

## 12. Freigabestand

- **Entschieden:** Orbitblade bleibt sichtbarer Produktname.
- **Festgelegt durch Codex:** Station Stufe A behält die bestehende Ökonomie.
- **Freigegeben:** visueller und semantischer Erstauftrag ohne Mechanikänderung.
- **Weiter offen:** D-036-Feldlauf vor Rückflugmechanik, Balance oder Content.

Der aktive Claude-Auftrag steht verbindlich in `docs/CURRENT_TASK.md`.
