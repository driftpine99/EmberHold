# Asset-Provenienz und Rechtefreigabe

**Stand:** 25.08.2026

Diese Datei begleitet alle neuen visuellen, akustischen und textlichen Assets
des Projekts. Ein Eintrag bedeutet nicht automatisch, dass ein Asset für eine
kommerzielle Veröffentlichung freigegeben ist.

## Verbindliche Felder für neue Assets

Jeder Eintrag enthält:

- Pfad und eindeutige Bezeichnung;
- Einsatzzweck: Konzept, Prototyp oder Runtime;
- Ursprung: selbst erstellt, KI-generiert, lizenziert oder Fremdreferenz;
- Ersteller beziehungsweise Modell und – soweit verfügbar – Version;
- Erstellungsdatum;
- Prompt oder Link auf die Prompt-Datei;
- verwendete Bild-, Video-, Audio- oder Textreferenzen;
- bekannte Lizenz- und Rechtebasis;
- nachträgliche Bearbeitungsschritte;
- Freigabestatus für Repository, öffentliche Demo und kommerziellen Store.

Keine Fremdassets oder Dateien aus `orbitblade/` werden in den Runtime-Ordner
kopiert, solange Herkunft und Nutzungsrechte nicht einzeln dokumentiert sind.
Generative Prompts dürfen keine geschützten Figuren, Logos, Franchise-Designs
oder die gezielte Imitation lebender Künstler verlangen.

## Statuswerte

- **INTERN:** nur Ideenfindung/Dokumentation, nicht im öffentlichen Spiel.
- **PROTOTYP:** im Testspiel erlaubt, kommerzielle Freigabe noch offen.
- **STORE-PRÜFUNG:** technisch fertig, Rechte- und Plattformprüfung offen.
- **FREIGEGEBEN:** Herkunft, Lizenz, Konsistenz und Plattformangaben geprüft.

## Aktuelle Einträge

### AP-001 – Kampfrichtung V1

- **Pfad:** `docs/concepts/orbitblade-combat-direction-v1.png`
- **Zweck:** interne Konzeptillustration für Kampf, Farbkontrast und HUD-Dichte
- **Ursprung:** KI-generiert
- **Werkzeug:** OpenAI ImageGen; genaue Modellversion nicht ausgewiesen
- **Datum:** 24.08.2026
- **Prompt:** `docs/concepts/README.md`
- **Referenzen:** textliche Projektrichtung; kein Runtime-Asset übernommen
- **Lizenz/Rechtebasis:** über das Projektkonto erzeugt; kommerzielle
  Einzelprüfung noch offen
- **Bearbeitung:** keine dokumentierte Nachbearbeitung
- **Status:** INTERN
- **Freigabe:** Repository-Dokumentation ja; Runtime, Demo und Store nein
- **Hinweis:** Name und abgebildete Gestaltung sind keine Store-Freigabe.

### AP-002 – Stationsrichtung V1

- **Pfad:** `docs/concepts/orbitblade-station-direction-v1.png`
- **Zweck:** interne Konzeptillustration für Raumstations-Hub und Modulzonen
- **Ursprung:** KI-generiert
- **Werkzeug:** OpenAI ImageGen; genaue Modellversion nicht ausgewiesen
- **Datum:** 24.08.2026
- **Prompt:** `docs/concepts/README.md`
- **Referenzen:** textliche Projektrichtung; kein Runtime-Asset übernommen
- **Lizenz/Rechtebasis:** über das Projektkonto erzeugt; kommerzielle
  Einzelprüfung noch offen
- **Bearbeitung:** keine dokumentierte Nachbearbeitung
- **Status:** INTERN
- **Freigabe:** Repository-Dokumentation ja; Runtime, Demo und Store nein
- **Hinweis:** Die isometrische Wirkung ist reine Stimmungsvorlage; das Spiel
  bleibt ein flacher 2D-Hub.

### AP-003 – Orbitblade-Laufzeitfiguren V1 (code-native)

- **Pfad:** keine Datei – prozedural in `prototype/web/index.html`
  (`buildOrbiterSprites`, `buildDroneSprites`, `buildAegisSprite` sowie die
  Klingen-, Boden- und Sternenfeldsprites in `buildArenaSprites`)
- **Zweck:** Runtime – Orbitträger, Sammlerdrohne, SEKTORBOSS AEGIS,
  Klingenprojektil, Stationsdeck und Sternenfeld der Safe-Area
- **Ursprung:** selbst erstellt, vollständig als Canvas-Code
- **Ersteller/Werkzeug:** Claude Code im Auftrag EH-2026-08-24-02
- **Datum:** 25.08.2026
- **Prompt:** keiner – kein generatives Bildmodell beteiligt
- **Referenzen:** ausschließlich die textliche Richtung aus
  `ORBITBLADE_CONCEPT_DRAFT.md`. Aus den Konzeptillustrationen AP-001 und
  AP-002 wurde **kein** Bildinhalt ausgeschnitten oder nachgezeichnet
- **Lizenz/Rechtebasis:** eigener Quellcode des Projekts; keine Fremdinhalte,
  keine Franchise-Designs, nichts aus dem Ordner `orbitblade/`
- **Bearbeitung:** entfällt – die Figuren entstehen zur Laufzeit einmalig und
  werden danach nur kopiert
- **Status:** PROTOTYP
- **Hinweis:** Es wurde **keine neue Bilddatei** hinzugefügt. Der
  Runtime-Assetstand bleibt bei den vier bestehenden PNG-Atlanten mit
  zusammen 5,8 MB und damit unter der 10-MB-Grenze. Ein Art-Konsistenz- und
  Rechtepass vor Veröffentlichung bleibt offen.

### AP-004 – Kampf- und UI-Richtung V2

- **Pfad:** `docs/concepts/orbitblade-combat-ui-direction-v2.png`
- **Zweck:** verbindliche interne Zielillustration für den nächsten
  Kampf-Grafik- und UI-Pass
- **Ursprung:** KI-generiert
- **Werkzeug:** OpenAI ImageGen; genaue Modellversion nicht ausgewiesen
- **Datum:** 25.08.2026
- **Prompt:** `docs/concepts/README.md`
- **Referenzen:** textliche Orbitblade-Richtung und die vorherigen internen
  Konzeptbilder AP-001/AP-002; kein Runtime- oder Fremdasset übernommen
- **Lizenz/Rechtebasis:** über das Projektkonto erzeugt; kommerzielle
  Einzelprüfung noch offen
- **Bearbeitung:** keine dokumentierte Nachbearbeitung
- **Status:** INTERN
- **Freigabe:** Repository-Dokumentation ja; Runtime, Demo und Store nein
- **Hinweis:** Der Besitzer wählte Entwurf 3. Das Bild ist eine Zielrichtung,
  kein Spriteatlas und wird vom Spiel nicht geladen.
### AP-005 – Lichthüter-Adaption und Orbitalhintergrund V3 (code-native)

- **Pfad:** keine Datei – prozedural in `prototype/web/index.html`
  (`drawOrbiterPose`/`buildOrbiterSprites`, `buildArenaSprites` mit
  `starTile`/`landmarks`/`planet`, Stationsring als CSS-Motiv im Start-Sheet)
- **Zweck:** Runtime – Spielerfigur „Lichthüter“ (Helm, Goldraute, V-Visier,
  Halo mit Ticks, Schulterplatten, geteilter Mantel), mehrschichtiger
  Weltraum-/Orbitalhintergrund, Stationsring-Szene mit Kern und Hotspots
- **Ursprung:** selbst erstellt, vollständig als Canvas-/CSS-Code; die
  Formensprache wurde aus der LOKALEN Referenz
  `orbitblade/Saber-Game-Projekt/konzept/game.js` adaptiert
  (`zeichneLichthueterNeu`, Zeilen 1442–1482; `drawStarLayers`,
  `drawNebulae`, `drawFadedGrid`, `drawLandmark`) – schreibgeschützt,
  kein Funktionscode importiert, nichts aus `archive/`
- **Ersteller/Werkzeug:** OpenCode im Auftrag EH-2026-08-25-04; Referenz-Audit
  durch einen separaten Lesesubagenten (Schutzregeln der lokalen AGENTS.md/
  CLAUDE.md eingehalten)
- **Datum:** 25.08.2026
- **Prompt:** keiner – kein generatives Bildmodell beteiligt
- **Referenzen:** ausschließlich die genannten Referenzfunktionen; Puls-Werte
  bewusst eingefroren (Halo-Alpha ≈ .82), keine Zeitquelle übernommen
  (`Date.now()` der Referenz wurde NICHT adaptiert)
- **Lizenz/Rechtebasis:** eigener Quellcode des Projekts; das Referenzprojekt
  bleibt unangetastet und ist nicht Teil des Commits
- **Bearbeitung:** Proportionen auf das 52-px-Sprite und die bestehende
  6/8/8-Phasen-Runtime angepasst; Hintergrund als vorgerenderte Kacheln und
  Landmark-Sprites statt Laufzeitverläufen
- **Status:** PROTOTYP
- **Freigabe:** Testspiel ja; kommerzielle Freigabe weiterhin offen. Ein
  Art-/Rechte-Pass vor Store bleibt Pflicht.
- **Hinweis:** Es wurden KEINE neuen Bilddateien hinzugefügt; der Runtime-
  Assetstand bleibt bei den vier PNG-Atlanten.

### AP-006 – Wurfklinge V2 und Orbitalstation-SVG (code-native)

- **Pfad:** keine Datei – prozedural in `prototype/web/index.html`
  (`drawBladeV2`/`buildSprites`-Klingenblock, `BLADE_GLYPH`; Stations-SVG als
  Inline-`<svg id="stationSvg">` im Start-Sheet, adaptiert aus dem geprüften
  Entwurf `test-results/d043-station-entwurf.svg`)
- **Zweck:** Runtime – Wurfklinge (Projektil 24 Richtungen × 4 Phasen,
  EVO-Variante, Karten-/HUD-Glyph) und Orbitalstation V2 (Planet,
  Trümmerring, Kernplattform mit Lichthüter-Maßstab, sechs Modul-Baukörper,
  Stege/Leitungen, Zustandsklassen)
- **Ursprung:** selbst erstellt, vollständig Canvas-/SVG-/CSS-Code. Die
  Klinge wurde aus einem Subagenten-Entwurf übernommen (geprüft:
  Koordinatenbudget r ≤ 24, keine Schatten-API); die Station basiert auf dem
  Subagenten-SVG-Gerüst (nachbearbeitet: Root-ID/Klassen, title/desc entfernt,
  Leitungspfade mit IDs). Formensprache anhand der drei Konzeptbilder
  (AP-001/AP-002/AP-004) und der lokalen Referenz (`zeichneKlinge`,
  `zeichneLichthueterNeu`, Hintergrundebenen — schreibgeschützt)
- **Ersteller/Werkzeug:** OpenCode im Auftrag EH-2026-08-25-05; drei
  Subagenten (Konzept-Audit, Klingenentwurf, SVG-Gerüst) plus unabhängige
  Abschlussprüfung
- **Datum:** 25.08.2026
- **Prompt:** keiner – kein generatives Bildmodell beteiligt
- **Referenzen:** Konzeptbilder wie oben; keine Franchise-Formen; die alte
  Sichel-Klinge (AP-003-Anteil) wurde vollständig ersetzt
- **Lizenz/Rechtebasis:** eigener Quellcode des Projekts; Referenzordner
  unverändert und nicht Teil des Commits
- **Bearbeitung:** Klinge auf 48 px und die bestehenden Trefferpfade
  angepasst (Trefferbox unverändert); SVG-Zustände ausschließlich über
  CSS-Klassen aus dem echten Save (mod-offline/run/ready/repairable/active,
  core-0..3, daten-1..6, proto-*)
- **Status:** PROTOTYP
- **Freigabe:** Testspiel ja; kommerzielle Freigabe weiterhin offen
- **Hinweis:** Keine neuen Bilddateien; `orbitblade-blade-v2.png` war nicht
  nötig (Canvas-Lösung kleiner und wartbarer).

## Vorlage

### AP-XXX – Name

- **Pfad:**
- **Zweck:**
- **Ursprung:**
- **Ersteller/Werkzeug:**
- **Datum:**
- **Prompt:**
- **Referenzen:**
- **Lizenz/Rechtebasis:**
- **Bearbeitung:**
- **Status:** INTERN | PROTOTYP | STORE-PRÜFUNG | FREIGEGEBEN
- **Hinweis:**
