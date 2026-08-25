# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-24-02
- **Thema:** Orbitblade – visueller und semantischer Vertikalschnitt
- **Status:** **ABGENOMMEN_DURCH_CODEX** (25.08.2026)
- **Auftraggeber und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P0 – neue Produktidentität ohne Balanceänderung
- **Zeitbox:** bis zu fünf Stunden konzentrierte Arbeitszeit
- **Startstand:** synchrones `main`; Commit und Git-Status beim Start erfassen
- **Rückgabe:** `docs/WORK_REPORT.md`
- **Lokale Commits:** höchstens vier kleine Gate-Commits; nicht pushen

## Bedeutung der Zeitbox

Arbeite bis zu fünf Stunden an genau diesem Auftrag. Stoppe nicht nach einer
oberflächlichen Umbenennung, solange innerhalb des Scopes noch Kriterien,
Browserprüfung oder Härtung offen sind. Erfinde aber keine Features, um Zeit zu
verbrauchen. Früher stoppen ist nur korrekt, wenn alle Pflichtkriterien erfüllt
sind oder ein Stoppsignal greift. Tests und Bericht haben immer Vorrang vor
einem optionalen späteren Paket.

## Ausgangslage

Der Besitzer behält den sichtbaren Produktnamen **Orbitblade** trotz der in
D-037 dokumentierten Verwechslungs- und Markenrisiken. Das ist eine bewusste
Produktentscheidung, aber keine juristische Freigabe. Repositoryname,
GitHub-Pages-URL, Save-Key `emberhold:hold:v1` und interne IDs bleiben
vorerst unverändert.

D-036 ist technisch mit 45/45 Checks abgenommen; der nächste menschliche
Acht-Minuten-Lauf steht noch aus. D-038 erlaubt diesen Auftrag trotzdem, weil
er Simulation und Balance nicht verändern darf. Echte Rückflugmechanik,
Waffenbalance, neue Inhalte und neue Stationsökonomie bleiben bis zu diesem
Feldlauf gesperrt.

Verbindlich sind `docs/ORBITBLADE_CONCEPT_DRAFT.md`,
`docs/ORBITBLADE_PREPRODUCTION_REVIEW.md` und
`docs/ASSET_PROVENANCE.md`. Bei Widersprüchen gilt dieser Auftrag.

## Ziel

Nach diesem Auftrag soll der Prototyp auf den ersten Blick wie Orbitblade
wirken, ohne dass ein Run mechanisch anders verläuft:

1. sichtbare Sprache und Bezeichnungen sind konsistent Sci-Fantasy;
2. Kampf-HUD, Seitenflächen und Boden wirken ruhig und nicht abgeschnitten;
3. der Hold ist als kompakte Orbitalstation inszeniert;
4. Spieler, häufigster Gegner und AEGIS bilden einen kleinen Grafik-Slice;
5. Seeds, Progression, Schaden, RNG, Spawn und Holdwerte bleiben bitidentisch.

## Unverhandelbare Grenzen

- Keine Änderung an `CFG`, XP, Schaden, Cooldowns, Projektilzahl,
  Zielpriorität, Hitboxen, Gegner-HP, Spawn, Dichte, RNG-Aufrufreihenfolge,
  Bosslogik, Kartenangebot, Beute, Hold-Timern, Kosten oder Erträgen.
- Keine echte zurückkehrende Klinge. Die Langbogenmechanik bleibt intern
  unverändert; ausschließlich Name und Darstellung dürfen sich ändern.
- Keine neue Waffe, Karte, Evolution, Gegnerfamilie, Ressource oder Währung.
- Keine neuen Boni, Defensive, Projektilabwehr oder Schadensreduktion.
- Keine Save-Version erhöhen und keine internen Schlüssel umbenennen.
- Nichts aus dem lokalen Ordner `orbitblade/` importieren.
- Keine Franchise-Namen oder erkennbaren Star-Wars-/Star-Trek-Kopien.
- Keine Engine, Abhängigkeit, Buildpipeline, 3D-Station oder neue Physik.
- Keine Testschwelle lockern und keinen Bot-Anker neu referenzieren.

## Günstiger Coding-Subagent

Nutze mindestens einen verfügbaren günstigen, einfacheren Coding-Subagenten für
eine klar begrenzte Aufgabe: sichtbare Textinventur plus Mapping, zusätzliche
deterministische Präsentationstests oder isolierte Safe-Area-/CSS-Prüfung.
Architektur, Art Direction, Integration, Browserbewertung und Bericht bleiben
bei dir. Gib ihm eine exakte Dateiliste; verbiete Push, Produktentscheidungen
und Projektdokumentation.

Bevor du Subagentencode behältst, lies den gesamten Diff, ordne jede Zeile dem
Scope zu, entferne unnötige Abstraktion und Scheintests und führe die Tests
selbst aus. Dokumentiere Auftrag, Ergebnis und eigene Prüfung. Ist kein
günstiger Subagent verfügbar, notiere das und arbeite weiter.

## Gate 0 – Baseline und Plan

Vor jeder Codeänderung:

1. `git status --short --branch` und `git rev-parse HEAD` erfassen.
2. `CLAUDE.md`, `docs/WORKFLOW.md`, diesen Auftrag, Konzept, Review,
   Provenienz und Grafikteil des Testplans vollständig lesen.
3. `npm test` ausführen; erwartet sind 45/45 grüne Checks.
4. Renderstellen für Namen, HUD, Safe-Area, Hold und Figuren inventarisieren.
5. Einen vollständigen festen Seedlauf serialisieren, um spätere Parität zu
   belegen.
6. Kurzen internen Plan für Gates 1 bis 4 erstellen.

Bei roter Baseline oder unerwartetem Arbeitsbaum stoppen und berichten.

## Gate 1 – Präsentationsschicht

Baue eine kleine zentrale Präsentationsabbildung, keine globale Umbenennung
interner IDs. Sie darf im Render-Hot-Loop keine neuen Objekte erzeugen.

### Produkt, Welt und Ressourcen

- Titel: **Orbitblade**; Hold: **Orbitalstation**;
- Warden: **SEKTORBOSS: AEGIS**;
- Wächterring/Sturmbruch/Aschengruft → Trümmerring/Ionensturm/Nullwrack;
- Basis-Beute → Bergungswert; Eisenerz → Asterit;
- Barren → Legierungsplatten; Essenz → Fluxkondensat;
- Trainingsmarken → Sim-Daten; Runenstaub → Modulfragmente;
- Gluttropfen → Nanokapseln.

### Waffen und Passive

- Langbogen/Windriss → Orbitklinge/Photonenschneise;
- Splitterköcher/Pfeilregen → Impulskarabiner/Sternenhagel;
- Feuerkugel/Höllenschlund → Plasmakern/Sonnenbruch;
- Kettenblitz/Sturmherz → Kettenemitter/Sturmnetz;
- Rundenklinge/Klingenzyklon → Sentinel-Drohnen/Orbitalschwarm;
- Frostnova/Ewiger Winter → Kryo-Impuls/Nullpunkt;
- Sehne, Köcher, Linse, Amulett → Vektorspule, Munitionsmatrix,
  Fokussierlinse, Fluxrelais;
- Federung, Umhang, Wetzstein, Magnetstein → Gyrostabilisator,
  Schildmatrix, Kantenresonator, Traktorarray.

### Gegner und Station

- Schwärmer/Stürmer/Speier/Teiler/Wahrer → Sammlerdrohnen, Rammjäger,
  Emitterdrohnen, Replikatorsonden, Bollwerkeinheiten;
- Tiefmine/Emberschmiede/Arkanum/Übungshof/Rüstkammer/Vertragswahl →
  Asteroidensonde, Materiefabrikator, Fluxlabor, Simulationsdeck,
  Ausrüstungsbucht, Sternenkarte.

Die Namen müssen in Start, Station, Karten, Slots, Pause, Tooltips,
Bossanzeige, Ergebnis und Run-Bericht stimmen. Alte Begriffe bleiben in IDs
und Migrationen erlaubt; kein naiver Test darf ihr vollständiges Verschwinden
aus dem Quelltext verlangen.

Nach Gate 1 Tests und Paritätsvergleich; nur grün fortfahren.

## Gate 2 – Kampfoberfläche und Safe-Area

- Flaches Top-down-Sci-Fantasy in Navy, Violett, Cyan, Weißgold und gezieltem
  Orange; mittelheller kontrastreicher Kampfboden.
- Seitliche Flächen als ruhige dekorative Weltfortsetzung statt leerer oder
  abgeschnittener Balken. Rein visuell, ohne Entities oder Simulation.
- Keine Randabdunklung, Kreisplatzhalter oder dunkle Figuren auf Schwarz.
- Oben links nur Leben/Schild und Level/XP.
- Oben mittig nur aktuelles Ziel oder Bossleiste.
- Oben rechts Pause plus höchstens ein kompakter Kontextindikator.
- Waffen/Passive kompakt; Meta-, Build- und Telemetriedetails in Pause/F3.
- Bossmarker, Karten, Touchflächen und Run-Bericht funktional erhalten.

Pflichtformate: 1280×720 und 844×390. Nichts darf abgeschnitten oder
überlagert sein. Simulationsfläche und Culling bleiben identisch. Falls ein
sichtbarer Browser verfügbar ist, Screenshots beider Formate anfertigen;
ansonsten keine manuelle Freigabe behaupten.

## Gate 3 – Orbitalstation Stufe A

Den Hold als flachen 2D-Stationshub inszenieren, ohne seine Aktionen neu zu
bauen:

- sechs Module als zusammengehöriger Ort;
- höchstens drei wichtige Ressourcen dauerhaft im Kopf;
- weitere Ressourcen nur im passenden Modul;
- Sortienzahl als Statistik, nicht Währung;
- genau ein nächstes Ziel hervorgehoben;
- Reparieren, Einsammeln, Herstellen, Training, Ausrüstung und Sektorwahl
  funktionieren exakt wie vorher;
- Timer, Kappen, Kosten, Erträge und Offline-Produktion bitidentisch;
- Save v4 verlustfrei laden, speichern und neu laden.

Keine Stationsmechanik aus Stufe B. Danach insbesondere `holdFlow`,
`holdExpansion`, `equipmentFlow`, `contractFlow` und Save-Roundtrip.

## Gate 4 – kleiner Grafik-Vertikalschnitt

Nur diese Kernelemente eigenständig umsetzen:

1. Orbitträger: aufrechte weißgoldene Figur mit Kopf, Rumpf, Armen und Beinen;
   horizontal spiegeln, niemals frei rotieren.
2. Sammlerdrohne: körperliche Drohne mit sechs asynchronen Bewegungsphasen,
   kein Kreis und keine Schattenfigur.
3. AEGIS: klare mechanische Bosssilhouette mit hellem Kern, auch im Pulk
   erkennbar.
4. Langbogenprojektil darf wie eine geworfene Energieklinge aussehen. Flug,
   Lebenszeit, Treffer und Zielwahl bleiben exakt gleich; keine Rückkehr
   vortäuschen oder implementieren.

Bevorzuge originale code-native Canvas-Grafik oder kleine eigene RGBA-Assets.
Keine Konzeptillustration als Sprite ausschneiden. Neue Assets einzeln unter
`prototype/web/assets/` ablegen und in `docs/ASSET_PROVENANCE.md`
dokumentieren. Etwa 2 MB pro Atlas und unter 10 MB Runtime-PNG gesamt.

Weltbewegung bleibt am Browserframe, Posen etwa 10–12/s, ohne Crossfade.
Glows/Schatten cachen; kein `shadowBlur`, Gradient oder neue Objektallokation
pro Einheit und Frame. Der Node-Fallback ohne `Image` bleibt testbar.
Unkonvertierte Familien dürfen eine neutrale mechanische Prototypdarstellung
erhalten, aber keine weitere Animationsproduktion.

## Pflichtprüfungen

Mindestens:

- `npm test` final vollständig grün;
- `git diff --check` sauber;
- Status und Diff-Stat dokumentiert;
- feste Seeds vor/nachher bei Ergebnissen, RNG-Werten, Picks, Evolutionen,
  Kills, Beute, Dichte, Boss und Hold-Auszahlung bitidentisch;
- bestehende Paritäts-, Boss-, HUD-, Hold-, Vertrag-, Ausrüstungs- und
  Save-Checks grün;
- neuer Verhaltenscheck für die Präsentationsabbildung;
- neuer Check, dass der Run-Bericht sichtbare Namen mappt, ohne IDs/Save-Felder
  umzubenennen;
- Test oder statischer Vertrag gegen teure Operationen im Massenrenderpfad.

Keine bloßen `source.includes()`-Checks als alleiniger Beleg für UI,
Save-Parität oder Renderkosten.

Wenn ein Browser sichtbar ist: Start → Station → Run → Pause → Kartenwahl →
Ergebnis → Station, in 1280×720 und 844×390; Richtungswechsel, Pulk,
Bossmarker, Save-Neuladen, Ränder und aufrechte Figuren prüfen.

## Härtung für verbleibende Zeit

Erst wenn Gates 1–4 und alle Pflichtprüfungen grün sind:

1. Überlagerungen und Kontrastfehler in den Pflichtformaten beheben;
2. Touch, Fokus, Tastatur und reduzierte Bewegung verbessern;
3. neue Renderpfade profilieren und Allokationen entfernen;
4. echte Randfälle mit deterministischen Verhaltenstests absichern;
5. Präsentationscode und Kommentare vereinfachen;
6. Bericht und Changelog vervollständigen.

Keine Rückflugmechanik, Station Stufe B, Audio, Monetarisierung oder neuen
Content als Stretch Goal beginnen.

## Erlaubte Dateien

- `prototype/web/index.html`
- kleine neue Dateien unter `prototype/web/assets/`, falls nötig
- `tools/run-balance-suite.mjs`
- `CHANGELOG.md`
- `docs/ASSET_PROVENANCE.md`, nur für neue Assets
- `docs/WORK_REPORT.md`
- `docs/CURRENT_TASK.md`, nur Status auf `BEREIT_FUER_CODEX_REVIEW`

Alle anderen Dateien bleiben unverändert, insbesondere `ROADMAP.md`,
`docs/DECISIONS.md`, `docs/TESTPLAN.md`, `README.md`, `AGENTS.md`,
`CLAUDE.md` und `docs/WORKFLOW.md`.

## Stoppsignale

Stoppe und berichte, wenn visuelle Ziele nur mit Mechanik/Balance erreichbar
wären, Save v4 nicht erhalten werden kann, Parität abweicht, Assetrechte unklar
sind, Tests nur mit lockereren Erwartungen grün würden oder fremde Änderungen
auftauchen. Ein unsichtbarer Browser blockiert nur die manuelle Grafikfreigabe,
nicht alle code- und testbaren Pakete.

## Übergabe

`docs/WORK_REPORT.md` vollständig ersetzen mit:

1. Ausgangscommit und Anfangsstatus;
2. grober Zeitnutzung je Gate;
3. Ergebnis je Gate;
4. Dateien und lokale Commits;
5. Subagentenauftrag, Änderungen und eigene Diff-Prüfung;
6. konkrete Vorher-/Nachher-Parität;
7. Befehle, Exitcodes und Zahl grüner Checks;
8. Browserprüfungen und fehlende manuelle Prüfungen;
9. Assetgrößen und Provenienz;
10. Risiken und klare Empfehlung an Codex.

`CHANGELOG.md` nur mit tatsächlichen Änderungen ergänzen. Danach
`docs/CURRENT_TASK.md` ausschließlich auf `BEREIT_FUER_CODEX_REVIEW`
setzen, nicht projektweit abnehmen, nicht pushen und keinen Folgeauftrag
beginnen.

## Codex-Abnahme

Die Codex-Abnahme am 25.08.2026 schließt den Auftrag technisch ab:

- finale Suite 47/47, `git diff --check` sauber;
- feste Simulation, interne IDs, Save v4 und Hold-Ökonomie unverändert;
- echter Chrome-Smoke bei 1280×720 und 844×390 einschließlich Station, Run,
  Pause, Kartenwahl, Ergebnis und Rückkehr;
- code-native Orbitblade-Figuren haben Vorrang vor historischen
  Fantasy-Atlanten; zwei ungenutzte Laufzeitdownloads entfallen;
- mobile Safe-Area, Toast-Layer und niedrige Dialoghöhen sind korrigiert;
  Ausrüstung, Elite-Module und Meisterschaften nutzen die Sci-Fantasy-Sprache.

Die subjektive Freigabe des Spielgefühls bleibt beim vollständigen
D-036-Besitzerlauf. Vor dessen Auswertung wird kein neuer Claude-Auftrag
freigegeben.
