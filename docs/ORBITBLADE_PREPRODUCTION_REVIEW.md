# Sci-Fantasy-Neuausrichtung – Vorproduktionsprüfung

**Stand:** 24.08.2026

**Status:** fachlich geprüft, noch nicht zur Implementierung freigegeben

**Gehört zu:** `docs/ORBITBLADE_CONCEPT_DRAFT.md`

## Kurzurteil

Der neue Sci-Fantasy-Rahmen passt zum vorhandenen Spiel. Er löst aber nur dann
ein echtes Produktproblem, wenn Emberhold als spielerische Grundlage erhalten
bleibt und nicht nur umbenannt wird. Der Run braucht weiterhin bessere
Lesbarkeit, eine markante Startwaffe, ein klares Zwischenziel und später einen
nützlicheren Hub.

Vor der ersten Codeänderung müssen drei Entscheidungen bestätigt werden:

1. **„Orbitblade“ wird vorerst kein öffentlicher Produktname.** Der interne
   Arbeitsname lautet **Project Vesper**; Repository, Save-Key und GitHub-URL
   bleiben zunächst Emberhold.
2. **Die Raumstation wird in Stufe A nur sauber neu inszeniert.** Laufzeiten,
   Ressourcenflüsse und Baseline-Balance bleiben identisch. Eine tiefere
   Stationsökonomie ist eine eigene Stufe B.
3. **Vor dem Umbau wird ein unveränderter D-036-Referenzlauf archiviert.** So
   bleibt messbar, ob die Neuausrichtung das Spiel tatsächlich verbessert.

Danach ist das Konzept für kleine, einzeln abnehmbare Produktionsschritte
ausreichend präzise.

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

Folge:

- `Orbitblade` bleibt höchstens die Bezeichnung der lokalen Designreferenz.
- Für Dokumente und Entwicklung gilt vorläufig **Project Vesper**.
- `Emberhold` bleibt technischer Repository-, Pages- und Save-Name, bis ein
  eigener Naming-Sprint abgeschlossen ist.
- Ein öffentlicher Namenswechsel erfolgt erst nach Store-, Domain-, Web- und
  Markenrecherche. Das ist ein späteres Freigabe-Gate, keine Coding-Aufgabe.

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

0. **Gate:** drei Besitzerentscheidungen und D-036-Referenzlauf.
1. **Visuelle Hülle:** Titel-Codename, HUD-Hierarchie, Palette, hellerer Boden;
   Simulation und Waffen bleiben bitidentisch.
2. **Orbitklinge prozedural:** nur Flug- und Treffervertrag plus DPS-Benchmark.
3. **Grafik-Vertical-Slice:** Spieler, eine Gegnerfamilie und AEGIS.
4. **Semantischer Pass:** restliche sichtbare Waffen-, Modul- und Gegnernamen.
5. **Station Stufe A:** Hold-Re-Theming ohne Ökonomieänderung.
6. **Ein Sektorziel:** „Signal sichern“, gemessen und separat abgenommen.
7. **Station Stufe B:** erst nach eigener Produktentscheidung.

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

## 12. Noch offene Besitzerfreigabe

Codex empfiehlt die folgenden drei Antworten:

1. **Ja:** kein öffentlicher Name Orbitblade; vorläufig Project Vesper.
2. **Ja:** Station Stufe A behält die bestehende Ökonomie vollständig bei.
3. **Ja:** erst D-036-Referenzlauf, dann Task 1.

Erst nach dieser Bestätigung schreibt Codex den nächsten Claude-Auftrag. Bis
dahin ist kein Implementierungsschritt freigegeben.
