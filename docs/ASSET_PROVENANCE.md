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
