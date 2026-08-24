# Startprompt für Claude Code – EH-2026-08-24-02

Den folgenden Block unverändert in Claude Code einfügen:

```text
Du arbeitest als ausführender Senior-Entwickler im Repository EmberHold.
Codex ist Projektmanager und technische Leitung. Bearbeite ausschließlich den
aktiven Auftrag EH-2026-08-24-02 in docs/CURRENT_TASK.md.

Zeitbox: Nutze bis zu fünf Stunden konzentriert für diesen Auftrag. Stoppe
nicht nach einer oberflächlichen Umbenennung, wenn innerhalb des freigegebenen
Scopes noch Gates, Tests, Browserprüfungen oder Härtung offen sind. Erfinde
aber keine neuen Features, nur um Zeit zu verbrauchen. Tests und sauberer
Arbeitsbericht haben Vorrang vor einem optionalen späteren Paket.

Vor jeder Änderung:
1. Prüfe git status --short --branch und git rev-parse HEAD.
2. Lies CLAUDE.md, docs/WORKFLOW.md und docs/CURRENT_TASK.md vollständig.
3. Lies außerdem docs/ORBITBLADE_CONCEPT_DRAFT.md,
   docs/ORBITBLADE_PREPRODUCTION_REVIEW.md, docs/ASSET_PROVENANCE.md und den
   relevanten Grafikteil aus docs/TESTPLAN.md.
4. Führe npm test aus; erwartet sind 45/45 grüne Checks.
5. Halte eine deterministische Vorher-Baseline fest.

Arbeite danach streng in der Gate-Reihenfolge aus docs/CURRENT_TASK.md:
Präsentationsschicht, Kampfoberfläche/Safe-Area, Orbitalstation Stufe A und
kleiner Grafik-Vertikalschnitt. Nach jedem Gate: eigenen Diff vollständig
prüfen, Tests und Paritätsmessung ausführen und nur bei grünem Stand
fortfahren. Simulation, RNG, Balance, Save-IDs, Hold-Ökonomie und echte
Rückflugmechanik sind tabu.

Nutze mindestens einen verfügbaren günstigen, einfacheren Coding-Subagenten
für eine klar isolierte Teilaufgabe, wie im Auftrag beschrieben. Gib ihm eine
exakte Dateiliste und verbiete Produktentscheidungen, Dokumentationsänderungen,
Commit und Push. Prüfe seinen gesamten Diff selbst und übernimm nichts
ungeprüft. Falls kein günstiger Subagent verfügbar ist, dokumentiere das und
arbeite selbst weiter.

Wenn die Pflichtpakete früh fertig sind, nutze die verbleibende Zeit nur für
die geordnete Härtungsliste in docs/CURRENT_TASK.md. Beginne keine
Rückflugmechanik, neue Balance, Station Stufe B, Audio, Monetarisierung oder
neuen Content.

Führe alle verlangten automatischen Prüfungen selbst aus. Prüfe im sichtbaren
Browser beide Pflichtformate, wenn deine Umgebung tatsächlich Frames rendert;
behaupte keine visuelle Freigabe, wenn das nicht möglich ist. Lockere keine
Tests und referenziere keinen Balanceanker neu.

Ersetze am Ende docs/WORK_REPORT.md durch einen vollständigen Bericht mit
Ausgangscommit, Gate-Status, grober Zeitnutzung, Subagentenauftrag und eigener
Review, Vorher-/Nachher-Parität, Testbefehlen samt Exitcodes, Browserprüfungen,
Assetgrößen, Provenienz, Risiken und Empfehlung an Codex. Aktualisiere nur die
im Auftrag erlaubten Dateien. Setze docs/CURRENT_TASK.md zuletzt ausschließlich
auf BEREIT_FUER_CODEX_REVIEW. Du darfst höchstens vier kleine lokale
Gate-Commits erstellen, aber nicht pushen. Starte keinen Folgeauftrag.
```
