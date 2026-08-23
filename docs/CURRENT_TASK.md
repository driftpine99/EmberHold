# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-23-02
- **Status:** FREIGEGEBEN_FUER_CLAUDE
- **Auftraggeber und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P0 – vor einem weiteren Feldlauf und vor neuen Animationen
- **Ausgangscommit:** Claude trägt `git rev-parse HEAD` vor der ersten Änderung
  in `docs/WORK_REPORT.md` ein.

## Ausgangslage

Der saubere Wächterring-Feldlauf vom 23.08.2026 endete bei 7:06. Die
Renderentlastung wirkt bis dorthin technisch: 202 sichtbar gezeichnete Gegner,
1-%-Low 58 FPS und nur 0,7 % der Proben unter 55 FPS. Das Spielgefühl-Gate ist
trotzdem nicht bestanden:

- Die linke Seite ist mit Meta-Boni, Ausrüstung, Meisterschaften, Relikten,
  Waffen, Passiven und mehreren Evolutionskarten gleichzeitig überladen.
- Der Besitzer verlor den Warden im Pulk und kam wegen der weiter
  eskalierenden Verstärkungen kaum zu ihm durch.
- Langbogen 5 plus Sehne 3 erfüllten den Evolutionsvertrag, trotzdem kam vor
  dem Tod keine Evolution: Das System verlangte noch einen weiteren
  Kartenzug.
- Splitterköcher wirkte deutlich mächtiger als Blitz und Rundenklinge. Dafür
  fehlt aber eine Schadensaufschlüsselung; ein Zahlen-Nerf aus einem einzelnen
  Eindruck ist nicht freigegeben.

Die verbindliche Produktentscheidung dazu steht in D-035. Dieser Auftrag setzt
nur diese Entscheidung um.

## Freigegebener Scope

### 1. Warden als lesbare Kampfphase

- Führe eine benannte Konstante `BOSS_ADD_TARGET = 90` ein.
- Solange der Warden lebt, darf das Nachspawnziel für normale Gegner höchstens
  90 betragen. Boss und Eliten zählen nicht zu diesem Ziel und werden nicht
  entfernt.
- Bereits vorhandene normale Gegner werden nicht schlagartig gelöscht. Durch
  Kills und das vorhandene Recycling soll sich die Menge natürlich auf das
  Bossziel absenken. Nach dem Boss-Tod gilt wieder die normale Dichtekurve und
  der vorhandene Spawn-Deckel baut sie schrittweise auf.
- Keine Beute, XP oder Kills für technisch entfernte Gegner erzeugen.
- Ergänze eine dauerhafte Warden-Ortung: Ist er außerhalb des zentralen
  Kampfausschnitts, zeigt ein klarer rot-goldener Randpfeil in seine Richtung.
  Ist er sichtbar, steht ein gut lesbarer Chevron über ihm. Beides verschwindet
  sofort nach seinem Tod.
- Der Marker muss sich deutlich von Aelrics Geschossen unterscheiden, die
  Safe-Area respektieren und darf keine Simulations- oder Zielwahllogik ändern.
- Bossleiste und vorhandene Bosspriorisierung der Waffen bleiben erhalten.

### 2. Standard-HUD entschlacken, Details in die Pause verschieben

- Links im laufenden Kampf stehen standardmäßig nur aktive Waffen, aktive
  Passive und genau **ein** Evolutionspfad.
- Der eine Pfad ist der am weitesten fortgeschrittene noch nicht evolutionierte
  Pfad. Die Auswahl ist deterministisch; bei Gleichstand gilt die bestehende
  Waffenreihenfolge.
- Wächterbogen-Bonus, Ausrüstung, Meisterschaften und Elite-Relikte verschwinden
  aus der dauerhaften linken Liste. Sie bleiben vollständig in der Pause unter
  einem klar benannten Abschnitt `Run-Boni` sichtbar.
- Die Pause zeigt außerdem den vollständigen Build und alle begonnenen
  Evolutionspfade. Es darf keine Information verloren gehen, sie wird nur aus
  dem Kampfbild verlagert.
- Der konkrete Feldtest-Build aus D-035 darf im Kampf links höchstens acht
  kompakte Einträge erzeugen: fünf Waffen, zwei Passive, ein Fokuspfad.
- 1422×613 sowie die bestehenden niedrigen Querformate dürfen weder horizontal
  überlaufen noch Bossmarker, Pause oder Stoß verdecken.

### 3. Evolutionsabschluss zuverlässig machen

- Setze den Fokus-Schutz von 5:30 auf 4:00 (`EVO_FOCUS_AT = 240`).
- Der Fokus-Schutz verfolgt den am weitesten fortgeschrittenen gültigen Pfad,
  nicht pauschal die erste Waffe im Katalog.
- Wenn die gerade gewählte Waffen- oder Passivkarte die Voraussetzung
  Waffe 5 plus zugehöriges Passiv 3 vervollständigt, entsteht die Evolution
  sofort innerhalb desselben Kartenzugs. Ein zusätzlicher Zufallszug ist nicht
  mehr nötig.
- Toast, HUD und Run-Bericht müssen diesen unmittelbaren Abschluss korrekt
  anzeigen. Der folgende Kartenzug ist wieder ein normales Angebot und darf
  keine bereits ausgelöste Evolution anbieten.
- Die beiden übrigen Kartenplätze, Rerolls, frühe Zufallsvielfalt und alle
  Karten-Gewichte bleiben unverändert.

### 4. Waffenschaden messbar machen, noch nicht neu balancieren

- Erfasse tatsächlich abgezogenen Schaden getrennt für alle sechs Waffen.
  Overkill zählt nur bis zu den vor dem Treffer verbleibenden Lebenspunkten.
- Folgeeffekte werden ihrer Ursprungswaffe zugerechnet: Feuerboden der
  Feuerkugel, Frostsplitter der Frostnova und Evolutionswirkungen ihrer
  jeweiligen Grundwaffe.
- Erfasse zusätzlich je Waffe den Anteil am Schaden gegen Bossgegner.
- Ergänze den kopierbaren Run-Bericht um zwei kompakte, nur für aktive Waffen
  ausgegebene Zeilen: Gesamtschaden je Waffe und Boss-Schaden je Waffe.
- Die Erfassung darf im dichten Gegnerpfad keine Objekte pro Treffer oder Frame
  erzeugen. Feste Arrays oder feste Felder sind vorzuziehen.
- An den Schadenswerten, Trefferzahlen, Abklingzeiten und Waffenmechaniken wird
  in diesem Auftrag nichts geändert.

### 5. Vorbestehenden Todesframe-Befund nicht mitziehen

Der in der Roadmap notierte Telemetriefehler, dass im Todesframe einzelne
Splitter nach `endRun()` eingesammelt werden können, bleibt außerhalb dieses
Auftrags. Nicht nebenbei reparieren.

## Verbindliche Abnahmekriterien

Claude ergänzt verhaltensbasierte Tests, mindestens:

1. `bossCombatPocket`: normales Ziel vor dem Boss unverändert, während eines
   lebenden Bosses höchstens 90, nach Boss-Tod wieder normale Kurve; keine
   künstlichen Kills oder Beute.
2. `bossLocatorState`: Randpfeil nur bei lebendem Boss außerhalb des
   Kampfausschnitts, Chevron nur bei sichtbarem Boss, beide nach Tod aus.
   Die Richtungsberechnung muss mindestens links, rechts, oben und unten
   prüfen.
3. `compactCombatHud`: Der D-035-Feldbuild erzeugt höchstens acht
   Kampfeinträge und genau einen Fokuspfad; ausgeblendete Meta-Boni sind in der
   Pause vollständig vorhanden.
4. `evolutionCompletion`: Fokus ab 4:00 auf dem am weitesten
   fortgeschrittenen Pfad; unmittelbare Evolution sowohl beim letzten
   Waffenlevel als auch beim letzten Passivlevel; keine doppelte Evolution.
5. `weaponDamageReport`: tatsächlicher statt überzählter Overkill-Schaden,
   korrekte Quellzuordnung mindestens für Projektil, Kettenblitz, Klinge,
   Feuerboden und Frostsplitter sowie getrennte Bosswerte.

Danach:

- `npm test`
- `git diff --check`
- finale Kontrolle aller bisherigen Checks, insbesondere `configStable`,
  `aspectIndependent`, `densityOvershoot`, `bossTargeting`,
  `bossDurability`, `evolutionReachable`, `healOrbFlow`, Hold-, Vertrags- und
  Frühverlustchecks.
- Vorher-/Nachher-Tabelle über alle neun Referenzseeds: erster Kartenzug,
  Kartenzüge, Evolutionen, Kills, Zieldichte, Feldspitze und Boss-Tötungen.

Die Dichte- und Evolutionsänderung ist beabsichtigt, aber bestehende
Testschwellen dürfen nicht nur zum Grünwerden gelockert werden. Falls ein
Regressionsanker durch die neue Produktregel nicht mehr sinnvoll ist, mit
Messreihe `BLOCKIERT` melden; Codex entscheidet über eine Neureferenzierung.

Ein sichtbarer Browser-Smoke bei 1422×613 ist erwünscht. Wenn die Browser-Pane
keine Frames rendert, exakt dokumentieren und nicht behaupten, die Darstellung
sei manuell geprüft. Die subjektive Abnahme bleibt beim Besitzer.

## Außerhalb des Scopes

- globale Dichtekurve außerhalb der lebenden Bossphase;
- neue Gegner, Waffen, Karten, Relikte, Ausrüstung oder Grafiken;
- numerisches Waffenbalancing;
- Änderungen an XP-Kurve, Beute, Erz, Gegner-HP oder Boss-HP;
- weitere Gegneranimationen, Audio, Backend, Monetarisierung oder Enginewechsel;
- Save-Reset oder inkompatible Save-Version;
- der vorbestehende Todesframe-Telemetriefehler;
- neue Roadmap-Prioritäten.

## Dokumentation und Übergabe

Wenn Code und Tests grün sind:

- `CHANGELOG.md` knapp unter `Unreleased` aktualisieren;
- D-035 in `docs/DECISIONS.md` nur um belegte Umsetzungswerte ergänzen;
- neue automatische und manuelle Checks in `docs/TESTPLAN.md` ergänzen;
- `docs/WORK_REPORT.md` vollständig durch den Bericht dieses Tasks ersetzen;
- `ROADMAP.md`, `docs/CURRENT_TASK.md`, `AGENTS.md`, `CLAUDE.md` und
  `docs/WORKFLOW.md` nicht ändern.

Claude darf einen günstigen, einfacheren Subagenten für eine klar isolierte
CSS-/HUD- oder Testaufgabe einsetzen. Der Hauptagent muss dessen vollständigen
Diff selbst prüfen, die Integration verstehen und alle Tests anschließend
selbst erneut ausführen. Aussagen eines Subagenten gelten nie als Abnahme.

Höchstens zwei kleine lokale Commits: erst Laufzeitcode und Tests, dann
Dokumentation. Kein Push, keine Folgeaufgabe. Danach stoppen und Codex die
Commits sowie `docs/WORK_REPORT.md` zur unabhängigen Prüfung übergeben.
