# EMBERHOLD — Prototyp Phase 0

Ein Held (Aelric), ein Territorium, 8-Minuten-Run und ein kleiner funktionaler
Kraterhold. Kein Backend. Der Kampf bleibt unverändert messbar; zusätzlich wird
geprüft, ob `Sortie → Produktion → Verbesserung → Sortie` verständlich ist.

`../prototype/web/index.html` ist eigenständig — Doppelklick genügt, kein
Server, keine Installation. Läuft auf Desktop und Handy.

## Steuerung

| | |
|---|---|
| Bewegen | WASD / Pfeiltasten · mobil: links wischen |
| Ember-Stoß | Leertaste · mobil: rechts tippen |
| Karte wählen | Klick oder 1 / 2 / 3 |
| Neu ziehen | R |
| Pause | `Esc` oder `P` · Pausenbutton oben rechts |
| **T** | **Live-Tuning** — Dichte, Schaden, HP, XP-Kurve. Wirkt sofort, auch mitten im Run. |
| **F3** | Entwickler-Anzeige — FPS, Entities, Pick-Zeiten gegen die Spezifikation |

## Hold-MVP testen

1. Tiefmine kostenlos reparieren.
2. Nach 15 Sekunden das erste Erz einsammeln oder direkt ein
   3-Minuten-Scharmützel spielen.
3. Nach der Rückkehr Sortiebeute und Minenlager einsammeln.
4. Emberschmiede für 10 Erz reparieren; sie verbraucht automatisch 5 Erz je
   Barren und benötigt dafür 30 Sekunden.
5. Zwei Barren einsammeln und den Wächterbogen verstärken.
6. Im nächsten Run muss links `Wächterbogen +10 %` erscheinen.
7. Arkanum für 15 Erz reparieren, Essenz sammeln und für 2 Essenz einen
   zusätzlichen Reroll vorbereiten. Der nächste Run startet dann mit 2 statt 1.
8. Übungshof für 3 Barren reparieren, Trainingsmarken sammeln und einen der
   drei Utility-Pfade lernen. Die Meisterschaft muss im nächsten Run links
   sichtbar sein und den angegebenen Wert verändern.
9. Seite neu laden: Ressourcen, Gebäude, Vorbereitung und Meisterschaften
   müssen erhalten sein.

Die kurzen Timer dienen nur dazu, den vollständigen Loop innerhalb weniger
Minuten zu testen. Die langfristigen GDD-Zeiten sind noch nicht aktiv.

## Manueller Gesamttest des Phase-0.5-Slices

> **Diesen Test kann nur der Besitzer fahren.** In der Claude-Code-Umgebung wird
> die Browser-Pane nicht angezeigt. Die Seite komponiert dann keine Frames,
> `requestAnimationFrame` feuert null Mal und die Rundenuhr bleibt bei 0:00
> stehen — gemessen am 22.08.2026: 0 Frames in 14,4 Sekunden, Screenshot
> ebenfalls nicht möglich. FPS und `peakVisibleEnemies` entstehen ausschließlich
> beim echten Rendern und lassen sich nicht ersatzweise berechnen.

### Vorbereitung

1. `prototype/web/index.html` per Doppelklick öffnen. Kein Server nötig.
2. `F3` drücken. Die Entwickleranzeige zeigt oben rechts FPS und Minimum,
   darunter getrennt Gesamtgegner, SIM-Radius und tatsächlich sichtbare Gegner.
3. Fenster im **Querformat** lassen, möglichst 16:9. Hochformat ist laut D-017
   kein unterstützter Kampfmodus.

### Durchgang A — Hold → Run → Hold

Die neun Schritte aus **Hold-MVP testen** der Reihe nach. Danach zusätzlich:

10. Sortietafel: einmal **Sturmbruch** und einmal **Aschengruft** wählen. Beide
    müssen im HUD und im Run-Bericht namentlich erscheinen, und die Erzbeute
    muss sichtbar höher ausfallen als beim Wächterring.
11. Ein Ausrüstungsteil anlegen und ein zweites zerlegen. Der Staub muss steigen,
    das zerlegte Teil verschwinden, und nichts darf ohne Rückfrage verloren gehen.
12. **Seite neu laden.** Erz, Barren, Essenz, Marken, Staub, Gebäudestufen,
    Vorbereitung, Meisterschaften, Ausrüstung und der gewählte Vertrag müssen
    vollständig erhalten sein.

### Durchgang B — Vollständiger 8-Minuten-Run

**Wächterring** wählen — nur dieser Vertrag ist die Balance-Referenz. Dann
durchspielen und unterwegs auf Folgendes achten:

| Zeit | Worauf achten |
|---|---|
| 0:00–1:00 | Startet der Run ohne Erklärung verständlich? Erster Kartenzug bei etwa 25–35 s? |
| 2:00 | Erste Elite: eigene Silhouette, orangefarbener Prioritätsrahmen erkennbar? |
| 3:00–5:00 | **Schwärmer im Pulk:** wirken sie ruhig und geerdet, oder marschieren sie sichtbar im Gleichschritt? Haftet der Kontaktschatten am Fuß? |
| 4:10 | Warden-Einstieg: **ist er vollständig sichtbar oder oben/unten angeschnitten?** (offener Vorbehalt aus D-017) |
| 6:00–8:00 | **Das eigentliche Lastfenster.** Minimum-FPS im Auge behalten. Hier steht die Dichte bei rund 300 Gegnern, nicht bei den 53 des alten Smoke-Tests. |
| 8:00 | Extraktion: ist der nächste sinnvolle Schritt eindeutig? |

Danach **„Bericht kopieren"** drücken und den Text unverändert zurückgeben. Er
enthält bereits Seed, Vertrag, Build, Evolutionen, Elite-Relikte, Ausrüstung,
Hold-Vorbereitung, beide Telemetriespitzen und den Kampfausschnitt. Seit
D-024 zusätzlich drei Zeilen, die den Bericht selbsterklärend machen:

| Zeile | Wozu |
|---|---|
| `Anzeige: 1280×720 CSS · 1920×1080 px · DPR 1.50` | Die Füllrate hängt an der echten Pixelzahl. Auf einem HiDPI-Gerät rechnet dieselbe Szene mit einem Vielfachen. |
| `Tuning: unverändert` | Bewegte Live-Regler werden namentlich gemeldet. Ein getunter Lauf ist damit nicht mehr von einem sauberen zu verwechseln. |
| `FPS 1-%-Low` und `Anteil unter 55 FPS` | Die schlechteste halbe Sekunde allein sagt wenig; ein einzelner Aussetzer setzt sie dauerhaft. Erst diese beiden Zahlen zeigen, ob es ruckelt oder einmal gehakt hat. |
| `Gluttropfen eingesammelt` | Wie oft du wirklich hingelaufen bist. Null hieße: Der Tropfen ist zu unauffällig oder zu riskant zu holen. |

**Worauf bei den Zahlen besonders zu achten ist:** `Spitze sichtbar gezeichnet`
sollte deutlich unter den 294 des letzten Laufs liegen — das ist der Wert, an
dem laut D-029 die Bildrate hängt. Und `Anteil unter 55 FPS` sollte weit unter
den 40 % von damals liegen.

### Sechs Fragen, die der Bericht nicht beantworten kann

**Stand 23.08.2026, nach D-035.** Bitte den vollständigen
8-Minuten-Wächterring-Lauf ohne Live-Tuning spielen. Danach den gesamten
Run-Bericht kopieren; die beiden neuen Schadenszeilen sind die Grundlage für
den späteren Waffenvergleich.

**1. Warden-Kampfphase.** Solange der Warden lebt, sinkt das Nachspawnziel auf
90 normale Gegner. Bereits vorhandene Gegner verschwinden nicht künstlich;
nach dem Boss baut sich die normale Kurve wieder auf.

> Kommst du jetzt gezielt zum Warden und kannst ihn im Fernkampf sinnvoll
> bekämpfen? Fühlt sich die Phase klarer an, ohne plötzlich leer zu werden?

**2. Warden-Ortung.** Außerhalb des Kampfausschnitts weist ein rot-goldener
Randpfeil zum Boss; im Bild steht ein Chevron über ihm.

> War jederzeit klar, wo der Warden ist? Waren Pfeil und Chevron gut sichtbar,
> ohne mit Aelrics Geschossen verwechselt zu werden?

**3. Kampf-HUD und Pause.** Links stehen nur aktive Waffen, aktive Passive und
ein führender Evolutionspfad. Run-Boni, vollständiger Build und alle Pfade
liegen in der Pause.

> Ist die linke Seite jetzt ruhig genug? Fehlt dir im Kampf etwas Wichtiges?
> Findest du die ausgelagerten Details in der Pause ohne Suchen?

**4. Evolution.** Ab 4:00 hält ein Kartenplatz den am weitesten
fortgeschrittenen Pfad offen. Waffe 5 plus Passiv 3 löst die Evolution sofort
mit derselben Kartenwahl aus.

> Konntest du mindestens eine Evolution planbar abschließen? Wirkte der
> Kartenweg nachvollziehbar oder weiterhin überwiegend glücksabhängig?

**5. Heilung und Hold-Zweck.** Gluttropfen müssen weiterhin bewusst
eingesammelt werden. Hold und Run-Ende zeigen genau ein nächstes Ausbauziel.

> Waren Heilung und nächster Hold-Schritt verständlich? Hat sich die
> Run-Belohnung als Fortschritt angefühlt?

**6. Der zweite Run.** Das bleibt das Phase-0-Gate.

> Hattest du am Ende Lust, sofort noch einen Run zu starten? Nicht nur „war es
> okay": Was hat gezogen — oder was hat noch gefehlt?

**Weiterhin nicht Teil dieses Laufs:** neue Gegneranimationen, Änderungen der
seitlichen Safe-Area und numerisches Waffenbalancing. Der Bericht misst die
Waffen jetzt erst einmal; Codex entscheidet danach anhand der Daten.

### Bisherige Feldläufe

| Datum | Modus | Sauber? | Sichtbar | Erster Zug | Züge | Erz | FPS schlecht. | 1-%-Low | unter 55 |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|
| 22.08.2026 | 8 Min | **nein**, Regler bewegt | 339 | 26,9 s | 50 | 17 | 21 | – | – |
| 22.08.2026 | 3 Min | ja | 60 | 34,9 s | 6 | 10 | 57 | – | – |
| 22.08.2026 | 8 Min | ja | 218 | 35,2 s | 36 | 15 | 35 | **58** | **0,5 %** |
| 22.08.2026 | 8 Min | ja | 294 | 33,9 s | 28 | 14 | 34 | **38** | **40,0 %** |
| 23.08.2026 | 8 Min | **ja, gefallen 7:06** | 202 | 31,8 s | 15 | 9 | 35 | **58** | **0,7 %** |

Der fünfte Lauf ist sauber, aber kein vollständiger 8-Minuten-Nachweis. Bis
zum Tod ist die Renderentlastung deutlich: 202 statt 294 sichtbar
gezeichnete Gegner und nur 0,7 % statt 40,0 % der Proben unter 55 FPS.
`Schlechteste FPS 35` war bei einem 1-%-Low von 58 ein einzelner Aussetzer,
kein dauerhafter Einbruch. Ob die letzten 54 Sekunden ebenfalls tragen,
bleibt offen.

Das Spielgefühl-Gate ist dagegen klar negativ. Frage 1 scheitert: Der
Besitzer kam wegen der Gegnermenge kaum zum Warden und verlor seine Position
im Pulk. Frage 2 scheitert: Langbogen 5 plus Sehne 3 waren vollständig, aber
ohne einen weiteren Kartenzug entstand keine Evolution. Frage 5 scheitert
nicht an abgeschnittenen Einträgen, sondern an massiver Informationsdichte
links. Neun eingesammelte Gluttropfen belegen, dass die Heilobjekte
wahrgenommen und genutzt wurden; Planbarkeit, Hold-Zweck und freiwilliger
zweiter Run wurden in diesem Bericht nicht beantwortet.

Konsequenz D-035: Warden-Kampfphase, Bossortung, kompaktes HUD,
unmittelbarer Evolutionsabschluss und Waffenschaden-Telemetrie sind inzwischen
technisch abgenommen. Die nächste Gegneranimation bleibt gesperrt, bis der
Besitzer denselben vollständigen Feldtest erfolgreich wiederholt.

Der dritte Lauf ist der erste saubere 8-Minuten-Referenzpunkt und der erste mit
der neuen Metrik. Er löst den FPS-Befund auf: 1-%-Low 58 bei 0,5 % Zeitanteil
unter der Zielmarke, also rund 2,3 Sekunden von 480. Details und die Widerlegung
der Lichtkreis-Hypothese in D-024. Die Abweichung der Kartenzüge vom Botkorridor
ist als D-026 festgehalten.

### Freigabe

Erst wenn dieser Lauf keine neue Rotations-, Sichtbarkeits- oder deutliche
Performance-Regression zeigt und Frage 1 positiv ausfällt, darf der Stürmer als
nächste Gegnerfamilie animiert werden.

## Automatisierter Balance-Vertrag

`npm test` lädt den echten Headless-Spielpfad ohne zusätzliche
Projektabhängigkeiten. GitHub Actions führt denselben Test bei relevanten
Änderungen automatisch aus.

Getestet werden neun feste Seeds: 1701, 1709, 1721, 1733, 1741, 1753, 1777,
1789 und der Feldtest-Seed 2474367456. Der aktuelle Stand:

**Wichtig zur Lesart seit D-030:** Die Spalte „Vertrag" nennt, was `npm test`
tatsächlich prüft — und das ist beim Kartenzug ein **Regressionsanker auf dem
Bot**, kein Designziel. Der Bot bildet die menschliche Kurve nicht ab (D-026).
Das Designziel von 21 Kartenzügen steht unverändert in `CFG.PICK_TARGETS` und
wird an Menschenläufen geprüft, siehe die Feldlauf-Tabelle weiter oben.

| Größe | Ist | Vertrag (Bot) | Designziel (Mensch) |
|---|---:|---:|---:|
| Erster Kartenzug, Mittelwert | 31,6 s | 25–45 s | 35 s |
| Kartenzüge in 8 Min, Mittelwert | 21,67 | 21,7 ± 3 | 21 |
| Rhythmus pro Minute | 1,44 · 1,67 · 1,67 · 1,89 · 1,67 · 1,89 · 3,56 · 7,89 | — | 1 · 2 · 2 · 2 · 3 · 3 · 4 · 4 |
| Kartenzüge bei −10 % XP-Kosten | 33,56 | — | — |
| Kartenzüge bei +10 % XP-Kosten | 22,44 | — | — |
| Verhältnis der beiden Varianten | 1,495 | ≤ 1,75 | — |
| Runs mit Evolution | 9 / 9 | mindestens 2 / 9 (Bodenschwelle) | in einer Sortie erreichbar |
| Evolutionen je Run, Mittelwert | 1,89 | — | — |
| Spitze im Feld, Maximum | 312 | ≤ 331 (Zieldichte +10 %) | — |
| Elite-Reliktwahlen | 2 in 9 / 9 Runs | exakt 2 pro vollständigem Run | — |
| Erz aus absichtlich untätigem Lauf | 1 Erz, schlechteste Rate 1,58/Min | ≤ 1,75 Erz je Minute | — |

Alle Ist-Werte dieser Tabelle stammen aus der grünen `npm test`-Ausgabe mit
43/43 Checks bei der Codex-Abnahme vom 23.08.2026.

Ein Wiederholungslauf mit demselben Seed muss bitgenau dasselbe Ergebnis
liefern. Der Test endet mit Fehlercode, sobald ein Korridor oder diese
Reproduzierbarkeit verletzt wird.

Die neun Baseline-Runs werden mit einer fokussierten, aber nicht
allwissenden Kartenstrategie gespielt. Mindestens zwei davon müssen in einer
normalen 8-Minuten-Sortie eine Evolution abschließen. Ab 4:00 hält das Angebot
den am weitesten fortgeschrittenen Evolutionspfad als eine von drei optionalen
Karten sichtbar. Die Voraussetzungen bleiben Waffenstufe 5 plus Passivstufe 3;
die abschließende Karte löst die Evolution sofort im selben Kartenzug aus.
`evolutionCatalog` erzwingt außerdem ein Angebot und die Kernmechanik jedes
der sechs Pfade. `eliteChoices` prüft den Weg vom Elite-Kill zur einmaligen
3er-Auswahl, alle vier Relikteffekte und die zweite Entscheidung nach dem Boss.

Fünf Checks sichern D-035 zusätzlich:

- `bossCombatPocket` prüft Ziel 90 ohne künstliche Kills oder Beute und den
  Wiederaufbau nach dem Boss.
- `bossLocatorState` prüft vier Pfeilrichtungen, sichtbaren Chevron, Tod und
  den knappen oberen 16:9-Rand.
- `compactCombatHud` prüft acht Einträge beim Feldbuild und alle
  ausgelagerten Informationen in der Pause.
- `evolutionCompletion` prüft Fokuszeit, führenden Pfad, Sofortabschluss und
  Schutz vor doppelter Evolution.
- `weaponDamageReport` prüft Overkill-Deckel, sechs Quellen einschließlich
  Feuerboden und Frostsplitter sowie getrennten Boss-Schaden.

Seit D-017 führt der Test `resize()` tatsächlich aus und prüft fünf
Querformate mit demselben Seed:

| Fenster | SCALE | Kampfausschnitt | Safe-Area je Seite | Zieldichte 8:00 |
|---|---:|---|---:|---:|
| 1000×700 (Referenz) | 1,000 | 1000 × 700 | 0 px | 301 |
| 1280×720 | 1,280 | 1000 × 563 | 0 px | 301 |
| 1536×864 | 1,536 | 1000 × 563 | 0 px | 301 |
| 844×390 | 0,693 | 1000 × 563 | 75 px | 301 |
| 2560×1080 (21:9) | 1,920 | 1000 × 563 | 320 px | 301 |

Vier Prüfungen hängen daran:

- `aspectIndependent` — bitgenau identische Laufergebnisse über alle Formate.
- `minCombatHeight` — mindestens 562 sichtbare Welteinheiten Höhe. Ohne die
  Deckelung bei 16:9 fiel 844×390 auf 462 und 21:9 auf 422.
- `bossInsideCombat` — der Warden-Einstieg (280 Welteinheiten) liegt innerhalb
  des Kampfausschnitts. **Achtung:** Die Reserve beträgt ab 16:9 nur 1,25
  Einheiten; siehe den offenen Vorbehalt in D-017.
- `telemetrySeparated` — die Rendertelemetrie erreicht die Simulation nicht.
- `visibleCountsCulling` — `render()` wird im Shim wirklich ausgeführt: Ein
  Gegner außerhalb des Kampfausschnitts, aber innerhalb des Simulationskreises,
  erscheint nur in `nearbyEnemies`. Der Lauf deckt beide Renderpfade ab, mit
  und ohne seitliche Safe-Area.

`holdExpansion` prüft zusätzlich die Save-Migration, deterministische
Offline-Produktion des Arkanums und Übungshofs, deren Lagerkappen, maximal zwei
vorbereitete Rerolls, steigende Meisterschaftskosten und die Isolation aller
Hold-Boni aus der Seed-Baseline.

`equipmentFlow` fährt den gesamten Rüstkammerpfad: Save-v3→v4, neuer Fund,
sofortige Staubgutschrift bei einem Duplikat, gezielte Rangaufwertung, Anlegen,
Zerlegen und einmalige Run-Auszahlung. Die seltene Runenfibel muss Runenfunke
garantiert in ein Kartenangebot säen; nach der Wahl steigen Projektilzahl und
Angriffstempo. In der Headless-Baseline bleiben alle Ausrüstungswerte null.

`earlyLossGuard` schließt seit EH-2026-08-23-01 den Frühverlust-Farmweg. Der
Check fährt den absichtlich untätigen Lauf (`stationary`, sterblich, ohne
Kartenzüge) mit allen neun Seeds über den **echten** Weg
`damagePlayer()` → `endRun(false)` → `depositRunReward()` — nicht über eine
isolierte Hilfsfunktion, denn genau dort lag der Fehler. Geprüft wird:

- Der Ertrag je Minute übersteigt nie den Anker des typischen Laufs von
  1,75 Erz je Minute. Gemessen: 1 Erz je Lauf, schlechteste Rate 1,58/Min.
  Gegen den Stand vor der Korrektur wird der Check rot (6,32 Erz/Min).
- Regel 1 hält in beide Richtungen: Die erspielte Basis-Beute bleibt gebucht
  und ein echter Versuch zahlt nie null Erz.
- Ein Abbruch liefert **keinen** garantierten Ausrüstungsfund; weder ein Teil
  noch Runenstaub kommt im Hold an.
- Die Auszahlung erfolgt genau einmal; ein zweiter Aufruf gibt 0 zurück.
- Die normalen Auszahlungen sind unverändert: Scharmützel bei 3:00, typische,
  gute und Ausnahme-Sortie, ein später Tod mit magerer Beute sowie der
  Grenzfall Tod exakt bei 3:00 zahlen alle den vollen Kurvenwert und den Fund.

`oreCurve` fragt die vier Beuteanker zusätzlich **mit** ihrer echten Laufdauer
ab. Die Abbruchgrenze darf keinen von ihnen verschieben.

`healOrbFlow` prüft die Abklingzeit des Gluttropfens als vollständige Leiter:
Ein Gegnerkill nach abgelaufener Abklingzeit erzeugt genau einen Tropfen, 50
weitere Kills innerhalb der Abklingzeit erzeugen keinen zweiten, und nach
erneutem Ablauf entsteht wieder genau einer. Die 50 Kills werden mitgezählt —
ohne diese Zahl wäre der Check auch dann grün, wenn gar kein Gegner entstanden
wäre. Heilmenge, fehlende XP-Gutschrift und der kleinere Sog gegenüber einem
Splitter bleiben unverändert geprüft.

Hochformat ist laut D-017 kein unterstützter Kampfmodus und wird bewusst nicht
geprüft; der geplante „Gerät drehen"-Hinweis steht unter P0.3.

**Simulations- und Rendertelemetrie sind zwei verschiedene Zahlen.** Wer sie
verwechselt, misst das Falsche:

| Größe | Bedeutung | Hängt am Fenster? | Darf in die Balance? |
|---|---|---|---|
| `nearbyEnemies` | Gegner im festen Kreis `SIM_DIAG*1.15`, steuert das Nachspawnen | nein | **ja, ausschließlich diese** |
| `peakNearbyEnemies` | Spitzenwert davon über den Run | nein | ja |
| `visibleEnemies` | Gegner, die das Render-Culling wirklich durchlässt | ja | nein |
| `peakVisibleEnemies` | Spitzenwert davon über den Run | ja | nein |

Entwickleranzeige (`F3`), Performancebericht und Run-Bericht weisen Gesamtzahl,
Simulationsradius und sichtbare Gegner getrennt aus. Im Node-Test bleiben die
Renderwerte zwangsläufig auf 0, weil nicht gerendert wird — genau das prüft
`telemetrySeparated`. Ein realer Wert für `peakVisibleEnemies` entsteht erst im
manuellen Run.

Der Check `configStable` verlangt zusätzlich, dass die gesamte
Balancekonfiguration nach `runBalanceSuite()` exakt dem Ausgangszustand
entspricht. Die Suite verstellt `XP_C` für ihre Sensitivitätsläufe bewusst; ein
nicht zurückgesetzter Wert würde jede spätere Messung still entwerten (D-018).

Zusätzlich prüft derselbe abhängigkeitfreie Test den UX-Fluss: Ein
3-Minuten-Scharmützel muss im gleichen Modus neu starten, der kopierbare
Run-Bericht muss seine Pflichtfelder enthalten und `D` darf nicht erneut mit
der Entwickleranzeige kollidieren. Pause und Fortsetzen müssen den Run zudem
im selben Modus und ohne Zustandsverlust weiterführen.

Der zusätzliche Hold-Check prüft Mine und Schmiede mit festen Zeitstempeln,
lokale Speicherung, die einmalige Auszahlung einer Run-Belohnung, Rückkehr in
den Hold und die Übernahme des +10-%-Schadensbonus in den nächsten Run. Die
Kampf-Balance-Suite läuft immer ohne Hold-Bonus.

Der Check `contractFlow` prüft zusätzlich die Sortietafel aus P0.5.1:

- Ein alter Hold-Spielstand ohne Vertragsfeld migriert verlustfrei auf
  Save-Version 2 und wählt den Wächterring als sicheren Standard.
- Die Auswahl eines Vertrags bleibt nach Speichern und Laden erhalten.
- Sturmbruch verändert bei identischem Seed reproduzierbar die Verteilung der
  Gegnerfamilien und zahlt den ausgewiesenen Erzbonus genau einmal aus.
- Ein Headless-Lauf ohne expliziten Vertrag verwendet immer den Wächterring und
  bleibt bitgenau mit der bisherigen Balance-Referenz identisch.

Manuell müssen die drei Vertragskarten im Hold auf Desktop und Mobil lesbar
sein. Im Run müssen Vertragsname und leicht veränderte Bodenstimmung erkennbar
bleiben, ohne Gegner- oder Telegrafiefarben zu überdecken.

Nach einer **vollständig gespielten** Sortie muss im Endbildschirm genau ein
Ausrüstungsfund oder dessen automatische Staubverwertung stehen. Nach einem
Abbruch vor 3:00 steht dort seit EH-2026-08-23-01 bewusst „kein Fund"; das ist
die einzige sichtbare Textänderung dieser Korrektur. In der Rüstkammer sind fehlende, besessene
und angelegte Teile unterscheidbar; Aufwerten ist nur mit genügend Staub aktiv.
Die Sortietafel und beide Startknöpfe bleiben auf einem normalen Desktop ohne
Scrollen sichtbar, auch wenn die Rüstkammer weiter unten liegt.

Der Visual-Smoke-Check stellt zusätzlich sicher, dass die drei aktiven
Raster-Assets (`aelric-atlas-v2.png`, `enemy-atlas-v1.png` und
`enemy-swarmer-atlas-v2.png`) als echte RGBA-PNGs vorhanden sind, der
Bildlader eingebunden ist und ein Langbogenschuss den rein visuellen
Release-Zustand auslöst.

Der letzte technische Browser-Smoke mit dem animierten Schwärmer erreichte
vorläufig mindestens 59 FPS bei 53 sichtbaren Gegnern nach ungefähr 30
Sekunden. Diese frühe Messung ist weder der vollständige 8-Minuten-Stresstest
noch die P0.3-Abnahme auf echten Referenzgeräten.

**Einordnung dieser Zahl (gemessen am 21.08.2026, aktualisiert nach D-017).**
53 Gegner ist nicht irgendein Zwischenwert, sondern praktisch das *Minimum* des
gesamten Runs. Seit der Entkopplung nach D-017 ist die Zieldichte auf allen
Querformaten identisch:

| Zeitpunkt | Zieldichte | Spitze im Feld | max. gezählt |
|---|---:|---:|---:|
| 0:30 | 42 | — | — |
| 8:00 | 301 | 382 | 355 |

Der alte Smoke-Wert von 53 Gegnern stammt aus einem 16:9-Fenster vor der
Entkopplung und ist damit doppelt überholt. Entscheidend bleibt: Die Dichte
steigt über den Run um etwa das Siebenfache, der Schwärmer stellt ab etwa 3:00
die Mehrheit dieser Figuren. Die FPS-Abnahme muss deshalb ausdrücklich das
Fenster **6:00–8:00** abdecken; eine Messung bei 0:30 ist für P0.3 ohne
Aussagekraft.

## Manueller Grafikcheck

1. Aelric muss beim Laufen alle vier Kontaktphasen zeigen, immer aufrecht
   bleiben und bei einem horizontalen Richtungswechsel sauber spiegeln.
2. Kurz vor einem Langbogenschuss ist die gespannte Pose sichtbar; beim Schuss
   folgen Release-Linie, Rückstoßpose und Pfeil.
3. Die fünf Gegnerfamilien müssen auch ohne Farblegende an ihrer Silhouette
   unterscheidbar sein. Schwärmer müssen zusätzlich vier klar verschiedene,
   asynchron laufende Beinkontaktphasen zeigen.
4. Gegner bleiben ebenfalls aufrecht und spiegeln horizontal, ohne bei einem
   Richtungswechsel sichtbar aus ihrer Position zu springen.
   Entfernung und Lichtkreis dürfen sie niemals durch Kreise oder abstrakte
   Silhouetten ersetzen oder am Bildschirmrand nachträglich abdunkeln.
5. Beim Stürmer muss die rote Laufbahn exakt dem folgenden Sprint entsprechen;
   beim Speier muss die violette Ziellinie vor dem Projektil sichtbar sein.
6. Teiler (grüne Teilungsbögen), Wahrer (goldener Zielrahmen) und Elite
   (orangefarbener Prioritätsrahmen) bleiben auch im Gegnerpulk erkennbar.
7. Beim Mittelboss erscheinen eine kurze Regelwarnung, rote Angriffsflächen,
   die goldene sichere Lücke und eine dauerhafte Warden-Lebensanzeige.
8. Falls Bilder nicht laden, müssen prozedurale Figuren erscheinen und der Run
   weiterhin spielbar bleiben.
9. Auf einem Monitor über 60 Hz muss die Weltbewegung auch zwischen zwei
   Gameplay-Ticks weiterlaufen; die Visual Clock hängt am Browser-Frame.
   Die Rasterposen selbst dürfen bewusst mit etwa 10 Bildern/s wechseln und
   dabei keine halbtransparenten Doppelkonturen erzeugen.
10. Aelrics dunkle Rüstung und normale Gegner müssen auf dem mittelgrauen
    Basalt auch außerhalb des warmen Lichtkerns als Silhouette lesbar bleiben.
11. Schnelle Richtungswechsel dürfen Aelric nicht um 90 oder 180 Grad kippen
   lassen. Nur Zielhilfen und Projektile dürfen frei rotieren.
12. Sobald der Boss in Waffenreichweite ist, zielt der nächste Langbogenpfeil
   auf ihn und erreicht ihn auch durch normale Gegner hindurch.
13. Dauerhaftes Stehen im Gegnerpulk muss deutlich riskanter sein als Kiten;
   Fernkampf darf keinen Nahkampf-Build voraussetzen, um den Boss zu besiegen.
14. Vor der Animation der nächsten Gegnerfamilie einen vollständigen
    8-Minuten-Run spielen. Run-Bericht und schlechteste FPS kopieren und
    zusätzlich notieren, ob Schwärmer bei hoher Dichte ruhig, geerdet und ohne
    synchrones Marschieren wirken.
15. Erst wenn dieser Lauf keine neue Rotations-, Sichtbarkeits- oder deutliche
    Performance-Regression zeigt, darf der Stürmer als nächste Familie
    animiert werden.

Die Einzelruns streuen derzeit stark: erster Zug 21,0–30,7 Sekunden und
10–35 Kartenzüge. Der Vertrag bewertet deshalb vorerst den Seed-Mittelwert;
die Streuung bleibt ein Tuningthema vor dem externen Spieltest.

Nach D-017 sind im manuellen Grafikcheck zusätzlich drei Sichtfragen zu
beantworten, die keine Messung ersetzen kann:

1. Wirkt der Kampfausschnitt auf 16:9 (1000 × 563 statt 1000 × 700
   Welteinheiten) zu eng? Fällt das Urteil negativ aus, ist Pillarboxing bis zur
   vollen Referenzhöhe der dokumentierte Gegenentwurf.
2. Sieht die seitliche Safe-Area auf Formaten breiter als 16:9 ruhig und
   gerahmt aus — oder wirkt sie wie ein abgeschnittenes Bild?
3. Ist der Warden beim Einstieg vollständig sichtbar? Bei senkrechtem Einstieg
   ist ein Anschnitt zu erwarten (Reserve nur 1,25 Welteinheiten).

Die alte manuelle Browserreferenz mit 1.039 Gegnern ist nach D-014 ungültig.
FPS und tatsächliche Spitzenzahl müssen mit dem reduzierten Entity-Budget neu
auf Desktop und echten Mobilgeräten gemessen werden.

## Was der Prototyp bereits enthält

- 6 Waffen, 8 Passive und 6 unterschiedliche Evolutionen
- 5 Gegnerfamilien mit **unterschiedlichen Bewegungsmustern**, nicht nur Werten
- Elite mit eigener 3er-Reliktwahl bei 2:00 und 6:00, Mittelboss mit
  ausweichbaren Mustern bei 4:10,
  Schatzflut bei 7:00, Extraktion bei 8:00 mit Overtime-Angebot
- Ember-Stoß mit 0,35 s Unverwundbarkeit
- Lichtradius, der mit der Buildstärke wächst
- Nicht blockierendes First-Run-Onboarding und deutliche Warden-Ankündigung
- Klarer Extraktions-/Neustartfluss mit kopierbarem Run-Bericht
- Kraterhold mit Tiefmine, Emberschmiede, Arkanum und Übungshof
- Lokale Offline-Produktion mit 24-Stunden-Kappe
- Erste dauerhafte Hold→Run-Verbesserung über den Wächterbogen
- Herstellbare zusätzliche Rerolls und drei kleine Utility-Meisterschaften
- Rüstkammer mit sechs Teilen, drei Slots, direkter Duplikatverwertung und
  gezielter Rangaufwertung
- Seltene Runenfibel, die Runenfunke in den Kartenpool des Runs sät
- Balanceziele für vier Run-Längen (3 / 8 / 15 / 20 Min); die Phase-0-UI bietet
  bewusst nur 3 und 8 Minuten an
- Regel 1 umgesetzt: Tod kostet nur den Overtime-Bonus, nie die Basis

## Bekannte Abweichungen

1. **Der erste Zug liegt am frühen Rand des Korridors — aber nur beim Bot.**
   Der Testbot erreicht ihn im Mittel nach 26,5 Sekunden bei einer Streuung von
   21,0 bis 30,7. Der erste saubere Menschenlauf am 22.08.2026 lag bei
   **34,9 Sekunden** und damit fast exakt auf dem Designziel von 35 — und
   oberhalb der gesamten Bot-Streuung. Das legt nahe, dass nicht das Spiel zu
   schnell ist, sondern der Bot im Frühlauf besser spielt als ein Mensch. Ein
   einzelner Lauf ist noch kein Beweis; zwei bis drei weitere saubere
   Menschenläufe würden es klären. Falls es sich bestätigt, ist die Kalibrierung
   der Baseline gegen den Bot systematisch zu schnell.
2. **Die Build-Streuung ist hoch.** Ein starker Build schneeballt weiterhin.
   Die ±10-%-Prüfung kippt die mittlere Kartenzahl nicht mehr um Faktor zwei,
   einzelne Seeds liegen aber weit auseinander.
3. **Der Test-Bot beendet den Run selten.** Er plant 0,45 s voraus und wählt
   aus 16 Richtungen — ein Mensch ist deutlich besser. Die Zahl sagt wenig
   über die tatsächliche Schwierigkeit; dafür brauchst du echte Spieler.
4. **15- und 20-Minuten-Runs sind noch nicht über die Start-UI erreichbar.**
   Ihre Zielwerte sind bereits definiert, sie sind aber nicht Teil des
   Phase-0-Spieltests.
5. Kein Ton. Bewusst — Phase 0 testet Bewegung und Rhythmus.

## Der Fehler, der am meisten Zeit gekostet hat

Das räumliche Hash-Gitter (`cellHead`) wird nur in `rebuildGrid()` mit −1
initialisiert, ist beim Laden aber mit Nullen gefüllt. Die allererste
Nachbarschaftsabfrage lief dadurch in eine Endlosschleife `0 → 0 → 0` und
der Browser fror ein — aber nur beim allerersten Aufruf, danach nie wieder.
Fix: `new Int32Array(CFG.NCELLS).fill(-1)` plus `cellHead.fill(-1)` bei
jedem Run-Start.

## Abbruchkriterium aus dem GDD

> Wenn zehn externe Testpersonen nicht freiwillig einen zweiten Run starten,
> wird das Projekt hier beendet. Nicht angepasst — beendet.

Das ist der Zweck dieses Builds. Schick ihn herum, bevor irgendetwas
anderes gebaut wird.
