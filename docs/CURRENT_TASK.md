# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-25-03
- **Thema:** Kampflesbarkeit V3 und verpflichtendes NEXUS-Finale
- **Status:** **FREIGEGEBEN_FUER_CLAUDE**
- **Auftraggeber:** Besitzer
- **Projektleitung und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P0 – sichtbarer Spielspaß und klares Run-Finale
- **Startstand:** sauberer main nach der Codex-Planungsübergabe; tatsächlichen
  Ausgangscommit und anfänglichen Git-Status im Arbeitsbericht festhalten
- **Timebox:** bis zu fünf Stunden produktiv nutzen; Gates in Reihenfolge
  abschließen und nicht nach einem kosmetischen Teilergebnis stoppen

## Verbindlicher Besitzerbefund

Der Besitzerlauf mit Seed 2395647195 wurde bei 8:00 extrahiert: 19.176 Kills,
Stufe 28, 27 Kartenzüge, zwei Evolutionen, schlechteste FPS 44 und 1-%-Low 54.
Gegnerflut, Animation, AEGIS-Erkennung und Bosskampf sind erheblich besser.

Nicht freigegeben sind: der gegenüber D-038 erheblich schlechtere helle
Hintergrund, zu ähnliche Gegnerfamilien, der verschwundene Hinweis auf die
nächste Evolution und weiterhin zu viele Begleiter während AEGIS. Zusätzlich
entscheidet der Besitzer: Eine Acht-Minuten-Sortie ist erst gemeistert, wenn
nach der Aufbauphase ein zweiter Boss besiegt wurde.

## Produktentscheidung

AEGIS bleibt der Mittelboss bei 4:10. Der neue Endboss heißt sichtbar
**NEXUS** und erscheint bei 8:00. Solange NEXUS lebt, gibt es keine Extraktion.
Nach seinem Tod erscheint sofort die bestehende Extraktions-/Overtime-
Entscheidung. Der bisherige 70-Gegner-Schub bei 7:00 entfällt.

Bossphasen sind lesbare Arenen, keine normalen Schwarmphasen mit zusätzlichem
Boss. Überschüssige Gegner ziehen sich kontrolliert und ohne Kills, Erfahrung,
Bergungswert oder Beute zurück. Waffenwerte bleiben unangetastet.

## Ziel

Der Run besitzt drei erkennbare Akte: Build-Aufbau, AEGIS-Mittelboss und das
verpflichtende NEXUS-Finale. Gleichzeitig werden Hintergrund,
Gegnerunterscheidung und Evolutionsanzeige korrigiert.

## Verbindlicher Umsetzungsscope

### Gate A – bekannten guten Hintergrund wiederherstellen

- Commit 9190de9 ist die konkrete Referenz für Bodenfarbe, Panelgröße,
  Leitungs- und Dekodichte: dunklere blau-graue 80er-Paneele statt der
  aktuellen hellen 160er-Flächen.
- D-040 bleibt erhalten: nahtlos bis an alle Ränder, keine abgeschnittene
  Arena, harte Safe-Area, Randvignette oder dominanten Sternenbalken.
- Sektortönung bleibt nahtlos. Boden weiterhin vorgerendert/gekachelt; keine
  zusätzliche Per-Frame-Erzeugung.

### Gate B – fünf Gegnerfamilien aus der Silhouette unterscheiden

- Gemeinsame D-040-Sprache behalten: dunkler Maschinenkörper, helle Kontur,
  Leuchtkern und sechs asynchrone Phasen.
- Sammlerdrohne klein/kompakt; Rammjäger lang und keilförmig;
  Emitterdrohne breit mit Auslegern; Replikatorsonde als geteilte
  Zwillingssilhouette; Bollwerkeinheit groß, breit und schwer gepanzert.
- Außenkontur, Proportion und Größe müssen unterscheiden; Farbe allein reicht
  nicht. Auch ohne Farbe müssen mindestens vier Familien sofort erkennbar sein.
- Trefferflächen, Geschwindigkeit, KI, Schaden und Spawnwahrscheinlichkeit
  bleiben unverändert.
- Pro Gegner und Frame weiter im Wesentlichen ein drawImage; keine Allokation,
  Gradienten oder shadowBlur im Schwarm-Hot-Loop.

### Gate C – genau ein kompakter Evolutionshinweis

- leadingEvoPath() bleibt die einzige fachliche Quelle.
- Oberhalb der unteren Waffenleiste erscheint genau ein schmaler Hinweis
  „Nächste EVO“ mit Evolutionsname sowie Waffen- und Passivfortschritt.
- Er zeigt nur den bestehenden Pfad und ändert Kartenmechanik oder
  EVO_FOCUS_AT nicht. Nach Abschluss wechselt er sofort; ohne Pfad verschwindet
  er.
- Bei 1280×720 und 844×390 keine Überlappung mit Waffen, Impuls, Karten,
  Toast oder Dialog. Linke Textliste bleibt ausgeblendet.

### Gate D – AEGIS als echte Bossarena

- AEGIS bleibt bei CFG.BOSS_AT = 250 Sekunden mit seinen aktuellen Mustern,
  Ortung und Grundwerten.
- Während AEGIS lebt gilt ein Ziel von **50 normalen Gegnern** statt 90.
- Überschuss zieht sich innerhalb höchstens acht Sekunden sichtbar,
  deterministisch und allokationsfrei aus dem Simulationsradius zurück.
- Rückzug erzeugt niemals Kill, XP, Splitter, Nanokapsel, Bergungswert,
  Ausrüstung oder andere Belohnung. Eliten dürfen nicht als künstliche Beute
  verschwinden; ihre Behandlung ist zu dokumentieren.
- Nach AEGIS baut sich die Dichte sanft wieder auf. Der 70er-SURGE bei 7:00
  wird entfernt.

### Gate E – verpflichtender Endboss NEXUS

- Nur die Acht-Minuten-Sortie erhält NEXUS. Drei-Minuten-Scharmützel behalten
  ihr bisheriges Ende.
- Ab 7:45 kurze nicht blockierende Warnung und kontrollierte Dichtereduktion;
  bei 8:00 Spawn innerhalb des sichtbaren Kampfausschnitts.
- Während NEXUS lebt Ziel von **30 normalen Gegnern**, kein Massen-Spawn.
- Nach 8:00 zeigt die Uhr verständlich die Finaldauer. Das ist noch keine
  freiwillige Overtime; deren Schadensmultiplikator bleibt aus.
- Bei 8:00 keine Extraktionsansicht. Erst der echte NEXUS-Tod öffnet sie.
  Spielertod im Finale bleibt „Gefallen“; ohne NEXUS-Kill niemals
  „Extrahiert“ oder gemeistert.
- NEXUS braucht eine von AEGIS klar verschiedene Silhouette, eigene
  Animationsphasen und mindestens zwei klar telegraphierte Angriffsmuster.
  Mindestens eines ist spielerisch neu; keine bloße Umfärbung.
- Jeder Angriff hat eine sichere Reaktion und mindestens eine Sekunde
  Vorwarnung; keine unvermeidbaren Vollbildtreffer oder Franchise-Anleihen.
- Zielkorridor mit repräsentativem Ein- bis Zwei-EVO-Build: ungefähr
  30–75 Sekunden. Nicht in zwei bis drei Treffern und nicht minutenlang.
  Deterministischen Benchmark liefern.
- Bossleiste und Ortung dynamisch BOSS: AEGIS bzw. BOSS: NEXUS.
- Run-Bericht ergänzt Finalboss-Status, Spawn-, Tötungszeit und Finaldauer.
- Keine neue Meta-Währung, Stationsstufe oder Gebäudeänderung.

## Unverhandelbare Grenzen

- Keine Änderung an Waffen/Passivwerten, Evolutionsvoraussetzungen,
  Kartenwahrscheinlichkeiten, XP-Kurve, Magnetradius oder Heilung.
- Sternenhagel, Sonnenbruch, Orbitklinge, Kettenemitter und Sentinel-Drohnen
  nur messen, nicht balancen.
- Save v4, Save-Key, Stationskosten und Offline-Produktion unverändert.
- Keine neue Engine, Bibliothek, Buildkette, Netzabhängigkeit, Fremdassets,
  lokalen Referenzspiel-Dateien oder erkennbaren Franchise-Designs.
- D-017 bleibt erhalten; keine Seitenverhältnis-Abhängigkeit.
- Kein Waffen-, Stations-, Audio- oder Monetarisierungs-Folgeauftrag. Kein Push.

## Kosten- und Agentenregel

Claude soll die fünf Stunden produktiv nutzen. Günstige einfachere
Coding-Subagenten sind für getrennte Aufgaben wie CSS/EVO-Anzeige,
Sprite-Silhouetten oder Tests erwünscht. Wegen der monolithischen index.html
nie gleichzeitig dieselben Zeilenbereiche bearbeiten. Claude behält
Bosszustandsmaschine, Architektur, Integration und Review selbst, prüft jeden
fremden Diff vollständig und testet nach jeder Integration.

## Automatische Abnahme

1. Aktuelle 49 Checks und neun Seeds vorher messen und dokumentieren.
2. npm test grün; keine Schwelle zum Verdecken eines Fehlers lockern.
3. Neuer finalBossFlow: 3-Minuten-Ende unverändert; NEXUS bei 8:00; keine
   Extraktion/Overtime solange er lebt; Bosskill öffnet Extraktion;
   Spielertod bleibt Niederlage.
4. bossCombatPocket V2: Ziele 50/30, Rückzug in höchstens acht Sekunden,
   keine Kunstkills/Belohnungen, Wiederaufbau nach AEGIS, kein 70er-Surge.
5. Neuer evolutionFocusHud-Check für genau einen aktuellen Pfad.
6. Präsentationscheck für fünf unterschiedliche Silhouetten/Abmessungen und
   dynamischen Bossnamen; Farbe allein darf nicht bestehen.
7. renderCostContract grün; keine gegnerlinear zusätzlichen Zeichenoperationen.
8. Erwartete Seed-Abweichungen ab geändertem Boss-/Dichtezeitpunkt mit
   vollständiger Vorher-/Nachher-Tabelle dokumentieren. Frühphase bis 4:10 und
   nicht betroffene Systeme stabil. Botanker nur nach Messung neu
   referenzieren, nie durch breitere Toleranz.
9. Save-, Hold-, Contract-, Report- und Aspect-Checks grün.
10. git diff --check sauber; keine Browserfehler.

## Manuelle Abnahme durch Claude

Wenn ein sichtbarer Browser verfügbar ist:

1. 1280×720 und 844×390 mit Kartenwahl, Pause und EVO-Hinweis prüfen.
2. Hintergrund gegen 9190de9 und Ausgangsstand vergleichen; Screenshots nennen.
3. Bei hoher Dichte alle fünf Familien visuell identifizieren.
4. AEGIS-Rückzug ohne belohntes Verschwinden prüfen.
5. Vollständigen Run bis NEXUS: Warnung, Spawn, zwei Muster,
   Extraktionssperre, Tod und anschließende Extraktion.
6. Schlechteste FPS, 1-%-Low und Anteil unter 55 messen; gegenüber
   44/54/2,0 % nicht erkennbar schlechter.

Ohne sichtbaren Browser Grenzen ehrlich dokumentieren, keine Freigabe erfinden.

## Erlaubte Dateien

- prototype/web/index.html
- tools/run-balance-suite.mjs nur für echte neue Verträge/Messungen
- CHANGELOG.md
- docs/WORK_REPORT.md
- docs/ASSET_PROVENANCE.md nur bei unerwartetem neuem Runtime-Asset; vor
  Import stoppen

Geschützt: ROADMAP.md, README.md, AGENTS.md, CLAUDE.md,
docs/DECISIONS.md, docs/TESTPLAN.md, docs/CURRENT_TASK.md und Konzeptbilder.

## Rückgabe

docs/WORK_REPORT.md vollständig nach docs/WORKFLOW.md ersetzen, zusätzlich:

- Gates mit Diff/Test, Subagenten und eigene Diffprüfung;
- neun Seeds vorher/nachher;
- Dichte vor/während/nach AEGIS sowie vor/während NEXUS;
- Beleg: Rückzug ohne Kills/Belohnung;
- NEXUS-Benchmark für schwachen und repräsentativen Build;
- Renderkosten, Browsergrößen/FPS, Risiken und nicht mögliche Prüfungen;
- lokale Commits, finaler Git-Status und Empfehlung an Codex.

Lokale kleine Commits nach grünen Tests erlaubt. Kein Push, kein Folgeauftrag.
