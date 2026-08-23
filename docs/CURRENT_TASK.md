# Aktiver Arbeitsauftrag

## Steuerung

- **Task-ID:** EH-2026-08-23-01
- **Status:** ABGENOMMEN_DURCH_CODEX
- **Auftraggeber und Abnahme:** Codex
- **Ausführung:** Claude Code
- **Priorität:** P1 – vor dem nächsten manuellen 8-Minuten-Lauf
- **Ausgangscommit:** Claude trägt `git rev-parse HEAD` vor der ersten Änderung
  in `docs/WORK_REPORT.md` ein.

## Ziel

Den von Codex geprüften Stand nach D-034 absichern, bevor der Besitzer erneut
spielt. Der Auftrag schließt einen Fortschritts-Exploit, vervollständigt den
Gluttropfen-Vertrag und bereinigt die dadurch betroffenen technischen
Erwartungswerte. Keine neue Spielinhalts- oder Grafikbaustelle eröffnen.

## Freigegebener Scope

### 1. Früh verlorene Runs dürfen kein optimaler Farmweg sein

Der aktuelle Erzboden zahlt auch bei null Beute vier Erz. Ein absichtlich
untätiger Spieler stirbt laut Vertragslauf nach ungefähr 38 Sekunden; damit
ist der schlechteste Lauf pro Minute deutlich ertragreicher als die typische
8-Minuten-Sortie. Zusätzlich ist zu prüfen, ob der garantierte Ausrüstungsfund
denselben Kurzlauf-Exploit offenhält.

Implementiere die kleinste robuste Korrektur mit folgenden verbindlichen
Eigenschaften:

- Regel 1 bleibt verständlich: bereits verdiente Basis-Beute wird bei einem Tod
  nicht gelöscht, und ein echter Versuch zahlt nie null Erz.
- Der vorhandene Headless-Lauf `stationary: true`, `immortal: false`,
  `noPicks: true` muss über den echten Run-Ende-/Auszahlungspfad geprüft werden.
  Sein Ertrag pro Minute darf den typischen 8-Minuten-Anker von 14/8 = 1,75 Erz
  pro Minute nicht übersteigen.
- Ein absichtlich sehr früh verlorener Run darf keinen garantierten
  Ausrüstungsfund liefern. Die normale 3-Minuten-Scharmützel- und
  8-Minuten-Sortie-Auszahlung bleibt erhalten.
- Die vier bestehenden Beuteanker bleiben erhalten, sofern eine Abweichung
  nicht zwingend zur Exploitkorrektur nötig und im Bericht begründet ist:
  `1412 → 5`, `17290 → 14`, `28425 → 17`, `137872 → 32` Erz.
- Späte Tode behalten ihre tatsächlich erspielte Basis-Beute; nur ein
  Overtime-Bonus geht wie bisher verloren.
- Vertragsmultiplikatoren werden weiterhin genau einmal angewendet.
- Bestehende lokale Spielstände bleiben kompatibel.
- Der neue Test muss das Verhalten über `endRun()` beziehungsweise
  `depositRunReward()` prüfen, nicht nur eine isolierte Hilfsfunktion.

Wenn diese Eigenschaften mit einer kleinen Änderung nicht gleichzeitig
erfüllbar sind, nicht eigenmächtig eine Produktregel ändern. Im Arbeitsbericht
die Varianten mit Messwerten darstellen und `BLOCKIERT` melden.

### 2. Gluttropfen-Test muss den echten Dropweg prüfen

Erweitere `healOrbFlow`, sodass mindestens belegt ist:

- Ein Gegnerkill nach abgelaufener Abklingzeit erzeugt genau einen
  Gluttropfen.
- Weitere Kills innerhalb der Abklingzeit erzeugen keinen zweiten.
- Nach erneut abgelaufener Abklingzeit kann wieder genau ein Tropfen entstehen.
- Heilwert, fehlende XP-Gutschrift und kleinerer Sog bleiben geprüft.

Die Dropfrequenz, Heilmenge und Sogwerte selbst nicht neu balancieren, sofern
der Verhaltenstest keinen echten Laufzeitfehler nachweist.

### 3. Technische Dokumentationswerte bereinigen

Nur wenn Code und Tests dieses Auftrags grün sind:

- `CHANGELOG.md` unter `Unreleased` knapp aktualisieren.
- Die automatischen Ist-Werte in `docs/TESTPLAN.md` aus genau dem finalen
  `npm test` übernehmen; Fokus-Schutz muss überall 5:30 und die
  Evolutionsschwelle mindestens 2/9 lauten.
- In `docs/DECISIONS.md` D-034 um die von Codex beauftragte
  Frühverlust-Absicherung ergänzen. Keine neue, nicht beauftragte Entscheidung
  eröffnen.
- `ROADMAP.md` nur dann anfassen, wenn ein durch diesen Auftrag unmittelbar
  falscher technischer Wert verbleibt. Prioritäten und Checkboxen gehören
  weiterhin Codex.
- `AGENTS.md`, `CLAUDE.md`, `docs/WORKFLOW.md` und diese Datei nicht ändern.

## Außerhalb des Scopes

- neue Gegneranimationen oder Assets;
- Änderungen an Dichte, XP, Kartenauswahl, Waffen oder Bossen;
- Hold-Erweiterungen, neue Ausrüstung oder neue Verträge;
- Audio, Monetarisierung, Backend, Mobile-Ausbau oder Enginewechsel;
- neue Roadmap-Prioritäten;
- Änderungen an Testschwellen, nur damit ein fehlerhafter Stand grün wird.

## Verlangte Prüfungen

1. Gezielte neue Tests für Frühverlust und Gluttropfen-Dropweg.
2. `npm test`
3. `git diff --check`
4. Kontrolle, dass die finale Testausgabe `configStable`,
   `aspectIndependent`, `densityOvershoot`, `evolutionReachable`,
   `healOrbFlow`, Hold- und Vertragschecks weiterhin grün meldet.
5. `git status --short --branch`

Ein Browserlauf ist für diesen technischen Auftrag nicht zwingend. Sichtbare
Textänderungen am Run-Ende müssen Claude jedoch im Bericht nennen, damit Codex
entscheidet, ob ein kurzer manueller Smoke nötig ist.

## Commit- und Übergaberegel

Claude darf höchstens zwei kleine lokale Commits erstellen: einen für
Code/Tests und optional einen für erlaubte Dokumentation. Kein Push und keine
Folgeaufgabe. Abschließend `docs/WORK_REPORT.md` vollständig ausfüllen und
stoppen.

## Codex-Abnahme

**Abgenommen am 23.08.2026.** Geprüft wurden die lokalen Commits `42d7e29`
(Code und Tests) und `7eab3e6` (Dokumentation). Der unabhängige Lauf von
`npm test` meldet 38/38 Checks grün; `git diff 091edd0..HEAD --check` ist
sauber. Der Auftrag ist vollständig erfüllt und eröffnet keine neue
Balance-, Content- oder Grafikbaustelle.

Die gemeinsame Drei-Minuten-Grenze für Erzdeckel und garantierten
Ausrüstungsfund wird für Phase 0 bewusst beibehalten: Sie entspricht der
kürzesten angebotenen Sortie und bleibt für Spieler verständlich. Die
mathematische Ausnahme unter rund 35 Sekunden ist akzeptiert, weil der
verbindliche Boden von einem Erz sonst nicht gleichzeitig gelten könnte. Die
neun echten stationären Verlustläufe sterben erst nach 37,98 bis 45,60
Sekunden, bleiben mit höchstens 1,58 Erz pro Minute unter dem Referenzwert und
liefern kein Teil.

Der nächste Schritt ist kein neuer Claude-Auftrag, sondern der manuelle
8-Minuten-Gesamttest durch den Besitzer gemäß `docs/TESTPLAN.md`.
