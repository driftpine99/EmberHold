# Zusammenarbeit: Besitzer, Codex und Claude

Dieses Dokument ist der verbindliche Arbeitsablauf für Emberhold. Es trennt
Produktentscheidungen, Umsetzung und Abnahme, damit der Besitzer keine
technischen Übergaben koordinieren muss.

## Rollen

### Besitzer

- entscheidet über Spielgefühl, Produktumfang und sichtbare Freigaben;
- führt manuelle Spieltests aus, wenn ein Auftrag sie ausdrücklich verlangt;
- muss keine Code-, Git- oder Architekturentscheidungen treffen.

### Codex – Projektmanager und technische Leitung

- priorisiert die Roadmap und zerlegt Arbeit in kleine prüfbare Aufträge;
- schreibt genau einen aktiven Auftrag in `docs/CURRENT_TASK.md`;
- entscheidet Scope, Abnahmekriterien und erlaubte Dokumentationsänderungen;
- prüft Claudes Diff, Tests und `docs/WORK_REPORT.md`;
- aktualisiert nach bestandener Review Roadmap, Entscheidungen und Testplan;
- entscheidet über Nacharbeit und pusht den freigegebenen Stand.

### Claude – ausführender Entwickler

- bearbeitet ausschließlich den freigegebenen Auftrag in
  `docs/CURRENT_TASK.md`;
- trifft keine neue Produkt-, Scope- oder Prioritätsentscheidung;
- darf günstige Coding-Subagenten für klar begrenzte mechanische Teilaufgaben
  einsetzen, bleibt aber selbst für Architektur, Review und Tests
  verantwortlich;
- dokumentiert sein Ergebnis in `docs/WORK_REPORT.md` und – wenn Code oder
  Assets geändert wurden – im `CHANGELOG.md`;
- ändert weitere Projektdokumente nur, wenn der aktive Auftrag sie ausdrücklich
  freigibt;
- pusht nicht. Lokale, kleine Commits sind nur erlaubt, wenn der Auftrag sie
  erlaubt und alle verlangten Prüfungen grün sind.

## Verbindliche Quellen

| Frage | Einzige verbindliche Quelle | Eigentümer |
|---|---|---|
| Was wird jetzt bearbeitet? | `docs/CURRENT_TASK.md` | Codex |
| Was hat Claude tatsächlich getan? | `docs/WORK_REPORT.md` | Claude |
| Was kommt als Nächstes? | `ROADMAP.md` | Codex |
| Warum gilt eine Designentscheidung? | `docs/DECISIONS.md` | Codex |
| Wie wird manuell abgenommen? | `docs/TESTPLAN.md` | Codex |
| Welche ausgelieferte Änderung existiert? | `CHANGELOG.md` | ausführender Entwickler, Review durch Codex |

Die Rollenabschnitte in `AGENTS.md` und `CLAUDE.md` sind dauerhaft. Dortiger
historischer Produktkontext ist keine Auftragsquelle. Bei Widersprüchen gilt
für den aktuellen Auftrag immer `docs/CURRENT_TASK.md`.

## Ablauf eines Auftrags

1. Codex prüft Repository, Roadmap, Entscheidungen und Tests.
2. Codex ersetzt `docs/CURRENT_TASK.md` durch genau einen Auftrag mit Status
   `FREIGEGEBEN_FUER_CLAUDE`.
3. Der Besitzer gibt Claude nur den von Codex formulierten Startprompt.
4. Claude liest `CLAUDE.md`, dieses Dokument und den vollständigen Auftrag.
5. Claude notiert den Ausgangscommit und den anfänglichen Git-Status im
   Arbeitsbericht.
6. Claude implementiert nur den freigegebenen Scope. Günstige Subagenten sind
   für isolierte Coding- oder Testaufgaben erwünscht; Claude muss deren Diff
   vollständig prüfen und darf ihre Aussagen nicht ungeprüft übernehmen.
7. Claude führt alle im Auftrag verlangten automatischen und manuellen
   Prüfungen aus. Behauptete Ergebnisse müssen aus der aktuellen Arbeitskopie
   stammen.
8. Claude ersetzt `docs/WORK_REPORT.md` durch den ausgefüllten Bericht, erstellt
   gegebenenfalls erlaubte lokale Commits und stoppt. Kein nächster
   Roadmap-Punkt, kein Push.
9. Codex prüft Code und Bericht unabhängig. Nur Codex markiert den Auftrag als
   abgenommen, aktualisiert die kanonischen Projektdokumente und pusht.
10. Benötigt die Abnahme Spielgefühl oder echte Renderleistung, erhält der
    Besitzer von Codex eine kurze verständliche Testanleitung.

## Stoppsignale für Claude

Claude stoppt und dokumentiert den Blocker, statt selbst zu entscheiden, wenn:

- der Auftrag eine neue Produktentscheidung erfordern würde;
- Scope oder Abnahmekriterien einander widersprechen;
- fremde oder unerwartete lokale Änderungen den Auftrag berühren;
- ein bestehender Spielstand ohne dokumentierte Migration verloren gehen
  könnte;
- der Balancevertrag nur durch eine gelockerte Schwelle statt durch eine echte
  Korrektur grün würde;
- ein benötigter visueller Test in der Umgebung nicht möglich ist;
- eine Änderung außerhalb des erlaubten Scopes erforderlich erscheint.

Ein Blockerbericht ist ein korrektes Ergebnis. Claude eröffnet trotzdem keine
eigene Folgeaufgabe.

## Pflichtinhalt des Arbeitsberichts

`docs/WORK_REPORT.md` muss nach jedem Auftrag enthalten:

1. Task-ID, Status (`FERTIG`, `TEILWEISE` oder `BLOCKIERT`) und Ausgangscommit;
2. kurze Zusammenfassung des tatsächlich erreichten Ergebnisses;
3. geänderte Dateien und lokale Commits;
4. Zuordnung jedes Abnahmekriteriums zu Beleg oder Test;
5. exakte Testbefehle mit Ergebnis und Exitcode;
6. manuell geprüfte Punkte und nicht mögliche Prüfungen;
7. Risiken, Nebenwirkungen, offene Fragen und Abweichungen vom Auftrag;
8. abschließenden `git status --short --branch`;
9. eine klare Empfehlung an Codex: abnehmen, nacharbeiten oder blockiert lassen.

Große Konsolenausgaben werden zusammengefasst. Relevante Messwerte und
Fehlermeldungen werden wörtlich und ohne Beschönigung übernommen.
