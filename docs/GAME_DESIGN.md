# EMBERHOLD
### Game Design Document & Technischer Bauplan
**Arbeitstitel · Version 1.2 Solo-PvE · August 2026**

Plattformen: Browser (primär) · Android · iOS · Steam
Genre: Idle-RPG × Bullet-Heaven · High Fantasy
Modell: Free-to-Play (Mobile/Web) + Premium (Steam)
Spielmodus: **Reines Solo-PvE** · offline spielbar · kein PvP, Koop, Gilden oder Ranglisten

---

## Inhalt

1. [Kurzfassung](#1-kurzfassung)
2. [Designphilosophie: Die sieben Regeln](#2-designphilosophie-die-sieben-regeln)
3. [Setting & Fiktion](#3-setting--fiktion)
4. [Struktur: Die drei Schichten](#4-struktur-die-drei-schichten)
5. [Schicht 1 — Die Sortie (aktives Spiel)](#5-schicht-1--die-sortie-aktives-spiel)
6. [Schicht 2 — Der Hold (Idle)](#6-schicht-2--der-hold-idle)
7. [Schicht 3 — Die Karte (die Brücke)](#7-schicht-3--die-karte-die-brücke)
8. [Helden](#8-helden)
9. [Waffen, Karten & Evolutionen](#9-waffen-karten--evolutionen)
10. [Meta-Progression](#10-meta-progression)
11. [Balancing — alle Formeln](#11-balancing--alle-formeln)
12. [Erste Sitzung (FTUE)](#12-erste-sitzung-ftue)
13. [Art Direction & Audio](#13-art-direction--audio)
14. [UX & Steuerung](#14-ux--steuerung)
15. [Technischer Bauplan](#15-technischer-bauplan)
16. [Monetarisierung & Geschäftsmodell](#16-monetarisierung--geschäftsmodell)
17. [Solo-PvE-Content & Roadmap](#17-solo-pve-content--roadmap)
18. [Entwicklungsplan & Scope](#18-entwicklungsplan--scope)
19. [Risiken & Gegenmaßnahmen](#19-risiken--gegenmaßnahmen)
20. [Was bewusst NICHT ins Spiel kommt](#20-was-bewusst-nicht-ins-spiel-kommt)
21. [Quellen](#21-quellen)

---

## 1. Kurzfassung

**EMBERHOLD** ist ein Idle-RPG mit Bullet-Heaven-Kern. Du verwaltest eine
Festung, die rund um die Uhr Erz, Essenz und Runen produziert — und du reitest
selbst aus, in 3- bis 20-minütigen Kämpfen gegen Hunderte von Gegnern
gleichzeitig, als Bogenschütze, Magier oder Runenwächter.

Das gesamte Spiel ist als **persönliche Solo-PvE-Reise** konzipiert. Es gibt
keinen Wettbewerb und keine Abhängigkeit von anderen Spielern. Persönliche
Bestzeiten, höchste Korruptionsstufen und abgeschlossene Herausforderungen
werden nur im eigenen Profil festgehalten.

**Der eine Satz:** *Deine Festung schmiedet die Ausrüstung. Deine Ausrüstung
entscheidet, welche Karten dir im Kampf angeboten werden. Deine Kämpfe erobern
das Land, das deine Festung versorgt.*

Das ist keine Aufzählung zweier Spiele, die nebeneinander laufen. Es ist eine
geschlossene Schleife, in der jede Schicht die andere begrenzt und freischaltet.
Wer nur idlet, kommt voran — langsam. Wer nur kämpft, läuft in Materialwände.
Wer beides tut, spielt das Spiel, das wir gebaut haben.

### Warum dieses Konzept trägt

| Vorbild | Was wir übernehmen | Was wir reparieren |
|---|---|---|
| **Vampire Survivors** | 0-auf-100-Machtfantasie in jedem Run; ein einziges Verb (Bewegung); Waffen-Evolutionen als Run-Ziel | Der zähe Frühlauf; Bosse, die den Build statt den Spieler prüfen; der Endgame-Grind im permanenten Upgrade-Baum |
| **Obelisk Miner** | Mehrstufige Ressourcenkette; Lagerkapazität als Tor; Prestige durch einen **besiegten Boss**, nicht durch einen Knopf | Reine Zahlenlastigkeit ohne aktives Können |
| **Archero** | Geteilte Steuerung (Spieler bewegt, Spiel schießt); „Dominant Strategy Denial" beim Kartenzug | Der Gear-Wall ab Kapitel 20; 3-gleiche-Items-Fusion; toter Loot ohne Konvertierung; Energie-System |
| **Melvor Idle** | 24 h Offline-Fortschritt, ehrlich simuliert | — |

### Kennzahlen-Ziele

| | Ziel | Branchen-Median 2026 |
|---|---|---|
| D1-Retention | 38 % | 26 % |
| D7-Retention | 18 % | 10 % |
| D30-Retention | 8 % | 3–4 % |
| Sessions/Tag | 4,2 | — |
| Session-Länge | 9 Min | — |
| ARPDAU (blended) | 0,066 $ | Hybrid-Casual 0,15–0,50 $ |

Der bewusst niedrige ARPDAU ist eine **Entscheidung**, keine Schwäche — siehe
[Kapitel 16](#16-monetarisierung--geschäftsmodell). Wir verkaufen keine Macht.
Das kostet Umsatz pro Nutzer und zahlt sich in Retention, Bewertungen und
organischer Reichweite aus. Der Steam-Premium-Kanal fängt die Differenz auf.

---

## 2. Designphilosophie: Die sieben Regeln

Diese Regeln sind aus der Analyse dessen entstanden, woran vergleichbare Spiele
gescheitert sind. Sie sind nicht verhandelbar; jede Feature-Entscheidung wird
gegen sie geprüft.

> ### Regel 1 — Jede Sitzung bringt Fortschritt. Ohne Ausnahme.
> Ein verlorener Run kostet nie die Basis-Belohnung, nur den freiwilligen
> Overtime-Bonus. Es gibt keine Sitzung, aus der man mit leeren Händen geht.
> *(Metasystem-Prinzip: „a player should make progress in every meaningful play
> session")*

> ### Regel 2 — Jedes Material hat zwei Wege. Immer.
> Alles, was man braucht, ist auf einem **Idle-Weg** (langsam, garantiert,
> zeit-gegated) und einem **Aktiv-Weg** (schnell, könnens-gegated) erreichbar.
> Es gibt keine harten Wände, nur Geschwindigkeitsunterschiede.
> *Das ist die direkte Antwort auf Archeros Gear-Wall.*

> ### Regel 3 — Es gibt keinen toten Loot.
> Jeder Gegenstand zerlegt sich in **Emberstaub** + einen Rang-Splitter. Jeder
> Drop, den man nicht will, zahlt trotzdem auf den Gegenstand ein, den man will.
> *Archeros größter Fehler war die 3-identische-Items-Fusion ohne Konvertierung.*

> ### Regel 4 — Prestige wird verdient, nicht gedrückt.
> Aufstieg (Ascension) verlangt den Sieg über einen **Warden** in einem aktiven
> Kampf. Der Reset ist ein Triumph, kein Buchhaltungsvorgang.
> *(Obelisk-Miner-Muster)*

> ### Regel 5 — Der Rhythmus ist absichtlich ungleichmäßig.
> Level-Ups kommen nicht gleichmäßig. Minute 0–1: ein Pick, du bist verwundbar.
> Minute 2–5: zwei pro Minute, Druck. Minute 6–8: vier bis fünf, Rausch.
> Dieselbe Handlung bedeutet dreimal etwas anderes.
> *(„Core Spiral" statt Core Loop)*

> ### Regel 6 — Wir verkaufen Bequemlichkeit, nie Macht.
> Kein verkaufbares Gear, keine Statboosts, keine Energie, kein Pay-to-Win.
> Verkauft werden: Zeitersparnis, Kosmetik, Komfort, Saison-Inhalte.

> ### Regel 7 — Abwesenheit wird nie bestraft.
> Gebäude laufen voll und stoppen. Territorien gehen nie verloren. Es gibt keinen
> Verfall, keine Strafe, kein FOMO. Häufigeres Einloggen erhöht den Durchsatz;
> selteneres Einloggen kostet nichts.

---

## 3. Setting & Fiktion

### Die Prämisse

Vor sieben Generationen erloschen die **Feuerwachten** — eine Kette von
Leuchtfeuern, die das Land gegen die **Aschung** hielten, eine Erscheinung, die
Farbe, Wärme und Erinnerung aus der Welt zieht. Die Aschung frisst nicht, sie
*entleert*. Was sie berührt, wird grau, still und vergisst, was es war.

Du erbst **Emberhold**, die letzte Feuerwacht mit einem noch glimmenden Kern.
Der Hold ist halb Ruine, halb Werkstatt. Von hier aus schickst du Kämpfer in
das entfärbte Land, um Gebiete zurückzuerobern — und mit jedem Gebiet kehrt die
Farbe zurück, kehren Ressourcen zurück, kehrt der Hold ein Stück weit heim.

### Warum diese Prämisse mechanisch trägt

Die Fiktion ist kein Anstrich, sie ist die Regel-Erklärung:

- **Die Aschung entfärbt** → das Art-Konzept (Silhouetten, entsättigte Welt) ist
  Story, nicht Sparmaßnahme.
- **Farbe kehrt mit Macht zurück** → im Run wächst ein Lichtradius um dich, je
  stärker dein Build wird. Die Machtfantasie ist im Bild sichtbar, nicht nur in
  Zahlen.
- **Der Hold ist die letzte Glut** → warum alles hier gefertigt wird.
- **Wardens sind das, was die Aschung aus alten Wächtern gemacht hat** → Bosse
  mit Persönlichkeit und einem Grund, warum ihr Tod einen Aufstieg auslöst.

### Ton

Melancholisch, nicht düster. Tolkiens Register: Verlust, Beharrlichkeit, kleine
Leute gegen große Dunkelheit. Kein Grimdark, kein Zynismus, keine Ironie.
Texte sind knapp und in einer leicht altertümlichen, aber lesbaren Sprache.

### Fraktionen & Völker

| Volk | Rolle | Beitrag zum Hold |
|---|---|---|
| **Die Wächterschaft** (Menschen) | Deine Erbschaft, die Hold-Verwaltung | Schmiede, Übungshof |
| **Die Sylvani** (Waldvolk) | Bogenschützen, Naturmagie | Holzfälle, Sehnen, Gifte |
| **Die Grauklamm-Sippe** (Zwerge) | Bergbau, Runenschmiede | Tiefmine, Runenwebstuhl |
| **Der Zirkel von Ashvale** (Magier) | Essenz, Wissen | Arkanum, Skriptorium |
| **Die Aschung** | Antagonist | — |

Jedes Volk wird durch eroberte Territorien freigeschaltet und bringt ein
Hold-Gebäude *und* einen spielbaren Helden mit. Territorium → Volk → Gebäude →
Held ist die Freischaltungskette, die die Karte zu einem Fortschrittspfad macht.

---

## 4. Struktur: Die drei Schichten

```
┌─────────────────────────────────────────────────────────────────┐
│  SCHICHT 3 — DIE KARTE (Brücke)                                 │
│  20 Territorien · 5 Biome · Korruptionsstufen T0–T10            │
│  Erobert im Kampf → wird zum Produktionsknoten des Holds        │
└───────────────┬─────────────────────────────────┬───────────────┘
                │ schaltet frei                   │ liefert Boni
                ▼                                 ▼
┌───────────────────────────────┐   ┌─────────────────────────────┐
│  SCHICHT 1 — DIE SORTIE       │   │  SCHICHT 2 — DER HOLD       │
│  aktiv · 3–20 Min             │   │  idle · 24/7 · offline      │
│                               │   │                             │
│  Bullet-Heaven                │◄──┤  8 Gebäude, 8 Taktungen     │
│  Ein Verb: Bewegung           │   │  Erz → Barren → Waffen      │
│  + eine Fähigkeit: Ember-Stoß │   │  Essenz → Runen             │
│  21 Kartenzüge in 8 Min       │   │  Zeit → Helden-XP           │
│                               ├──►│                             │
│  liefert: Material, Relikte,  │   │  liefert: Ausrüstung, Runen,│
│  Territorien, Warden-Kills    │   │  Kartenpool-Erweiterungen   │
└───────────────────────────────┘   └─────────────────────────────┘
                │                                 │
                └──────────────┬──────────────────┘
                               ▼
                ┌──────────────────────────────┐
                │  AUFSTIEG (Ascension)        │
                │  Gate: Warden besiegen       │
                │  Reset: Hold, Gold, Baum     │
                │  Behalten: Helden, Gear,     │
                │  Runen, Freischaltungen      │
                └──────────────────────────────┘
```

### Die Zwei-Wege-Abhängigkeit im Detail

**Hold → Sortie.** Der Hold bestimmt drei Dinge im Kampf:
1. **Startwerte** — Ausrüstung gibt Basis-HP, -Schaden, -Tempo.
2. **Kartenpool-Inhalt** — jedes Ausrüstungsteil ab Rang *Selten* trägt eine
   **Kartensaat**: eine spezifische Karte, die dadurch überhaupt erst im Pool
   erscheint. Ein „Uralter Eibenbogen" fügt *Splitterschuss* hinzu. Damit wird
   Ausrüstung mechanisch interessant statt nur additiv.
3. **Run-Ressourcen** — Rerolls, Verbannungen (banish), das vierte Kartenslot.

**Sortie → Hold.** Der Kampf bestimmt vier Dinge in der Festung:
1. **Territorien** — der einzige Weg, neue Produktionsknoten zu erschließen.
2. **Seltene Materialien** — Tier-8+-Materialien droppen ausschließlich aktiv.
3. **Relikte** — verändern Hold-Regeln (z. B. „Tiefmine produziert auch während
   eines Runs weiter").
4. **Warden-Kills** — das Aufstiegs-Tor.

---

## 5. Schicht 1 — Die Sortie (aktives Spiel)

### 5.1 Steuerung

Ein Daumen. Immer.

| Aktion | Mobile | Desktop/Web |
|---|---|---|
| Bewegen | Schwebender Joystick (erscheint, wo man tippt, linke Bildschirmhälfte) | WASD / Pfeiltasten |
| Angreifen | **automatisch** | automatisch |
| Ember-Stoß | Tipp auf rechte Bildschirmhälfte | Leertaste |
| Karte wählen | Tipp | Klick / 1-2-3 |
| Pause | Tipp auf Uhr | Esc |

**Kein zweiter Stick, keine Zielhilfe, keine Item-Leiste.** Die geteilte
Steuerung (Spieler bewegt, Spiel schießt) ist das Erfolgsrezept von Archero und
Vampire Survivors gleichermaßen: sie gibt Handlungsmacht ohne Komplexität.

### 5.2 Der Ember-Stoß — die eine Fähigkeit

Vampire Survivors' größte Schwäche sind Bosse, die „den Build prüfen statt den
Spieler". Wir geben dem Spieler genau ein Werkzeug, um Können auszudrücken:

**Ember-Stoß** — 12 Sek Abklingzeit, 0,35 Sek Unverwundbarkeit, kurzer Sprint in
Bewegungsrichtung. Pro Held anders gefärbt:

- **Aelric** hinterlässt eine Pfeilsalve auf der Strecke
- **Sylwen** lässt Dornen auf der Strecke wachsen
- **Maerhold** entzündet die Strecke
- **Vashti** blitzt an den Zielpunkt (Teleport statt Sprint)
- **Dorn** rammt Gegner beiseite und gewinnt Schild
- **Kaelen** wird kurz unsichtbar; der nächste Treffer ist ein garantierter Krit

**Konsequenz für Boss-Design:** Alle Boss-Angriffe sind mit Bewegung **allein**
ausweichbar; der Ember-Stoß macht es komfortabel, nicht möglich. Damit ist ein
Boss ein Können-Test, kein Statvergleich — und ein schwacher Build kann durch
gutes Spiel gewinnen. Das ist der wichtigste Unterschied zu allen Vorbildern.

### 5.3 Run-Längen

| Modus | Dauer | Kartenzüge | Build-Fertigstellung | Zweck |
|---|---|---|---|---|
| **Scharmützel** | 3 Min | 5 | 8 % | Die Wartezimmer-Session |
| **Sortie** | 8 Min | 21 | 35 % | Der Standard |
| **Tiefenzug** | 15 Min | 39 | 65 % | Evolutionen zuverlässig erreichbar |
| **Wardenjagd** | ~20 Min | 50 | 83 % | Das Aufstiegs-Tor |

Build-Fertigstellung = Anteil der 60 möglichen Upgrade-Schritte
(6 Waffenslots + 6 Passivslots, je 5 Stufen). **Man erreicht nie 100 %.**
Auch die längste Jagd lässt ein Sechstel offen — es gibt immer ein „was wäre,
wenn ich diesmal anders gewählt hätte".

Die vier Längen sind **mechanisch** verschieden, nicht nur zeitlich: Eine
Waffen-Evolution braucht Waffenstufe 5 + Passivstufe 3. Im Scharmützel
unmöglich, in der Sortie mit Fokus knapp machbar, im Tiefenzug regelmäßig.

### 5.4 Timeline einer 8-Minuten-Sortie

Alle Werte aus der Balancing-Simulation, nicht geschätzt.

| Zeit | Ereignis | Picks bis dahin | Gefühl |
|---|---|---|---|
| 0:00 | Start, 22 Gegner | 0 | **Verwundbar** — ein Treffer tut weh |
| 0:35 | **Erster Kartenzug** | 1 | Erste Entscheidung |
| 1:13 | Zweiter Kartenzug | 2 | Build zeichnet sich ab |
| 2:00 | **Erster Elite** (benannt, telegrafiert) | 3 | Erste Truhe |
| 2:00–4:10 | Dichte verdreifacht sich | 3–7 | **Druck** — Rückzüge nötig |
| 4:10 | **Mittelboss** — Musterkampf | 7 | Können-Test, Rate sinkt bewusst |
| 5:00 | Dichte-Spitze, ~1.000 Gegner | 10 | **Wende** — du drehst es um |
| 6:00–7:00 | Vier Kartenzüge in einer Minute | 13–17 | **Macht** |
| 7:00 | **Schatzflut** — Truhenwelle + Magnetpuls | 17 | Belohnungsrausch |
| 8:00 | **Extraktion** | 21 | Entscheidung |

Der Mittelboss bei 4:10 senkt die XP-Rate absichtlich um 30 % — die Minute, in
der man ausweicht statt tötet. Ohne dieses Tal gibt es keinen Berg danach.

Die Schatzflut bei 7:00 ist Vampire Survivors' bester Trick, formalisiert:
angesammelter Aufwand wird in einem sichtbaren Schwall ausgeschüttet. Das ist
befriedigender als dieselbe Menge gleichmäßig verteilt.

### 5.5 Extraktion & Overtime

Bei 8:00 hält das Spiel an und fragt:

**[ AUSRÜCKEN ]** — Belohnungen sicher, zurück zum Hold.
**[ WEITER ]** — Overtime.

**Overtime-Regeln:**
- Läuft bis zum Tod oder freiwilligen Ausstieg (jederzeit möglich)
- Gegnerschaden +15 % alle 10 Sek, kumulativ
- Belohnungsmultiplikator ×1,5 pro Minute (1,5× / 2,25× / 3,4× / …)
- **Bei Tod verliert man ausschließlich den Overtime-Bonus.** Die Basis-Belohnung
  aus den ersten 8 Minuten ist bereits gebucht und unantastbar.

Das ist Regel 1 in Reinform: Risiko ist ein Angebot, keine Bedingung. Ein
Spieler, der stirbt, hat trotzdem 8 Minuten Fortschritt gemacht. Kein Tilt,
kein Neuladen, keine verlorene Zeit.

### 5.6 Gegner-Design

Fünf Familien pro Biom, unterschieden durch **Bewegungsmuster**, nicht durch
Werte. Werte skalieren mit dem Territorium-Tier; Muster bleiben lesbar.

| Familie | Verhalten | Gegenmittel |
|---|---|---|
| **Schwärmer** | Direkte Verfolgung, schwach, viele | Flächenschaden |
| **Stürmer** | Telegrafiert 0,8 Sek, dann Linien-Sprint | Seitwärts ausweichen |
| **Speier** | Hält Abstand, langsame Projektile | Anrennen oder Ember-Stoß |
| **Teiler** | Zerfällt beim Tod in zwei kleinere | Nicht in Panik killen |
| **Wahrer** | Schildet Gegner im Umkreis, greift nicht an | Priorisieren |

**Elite** alle 2 Minuten: benannt, eigene Silhouette, eigenes Muster, garantierte
Truhe. **Bosse** bei festen Zeitmarken mit 3–4 telegrafierten Angriffsmustern.

Regel für jedes Bossmuster: **Mit reiner Bewegung ausweichbar.** Wird beim
Design mit einem Held ohne Ausrüstung auf Stufe 1 getestet. Wenn es so nicht
geht, ist das Muster falsch.

### 5.7 Kartensystem

Bei jedem Level-Up: 3 Karten aus einem Pool von ~38 (hero-abhängig).

**„Dominant Strategy Denial"** — verifiziert per Simulation: Bei Pool 38, 3
Angeboten und 3 Wunschkarten liegt die Trefferquote bei **22 %**. Der Spieler
bekommt seinen Wunsch selten geschenkt und muss improvisieren. Genau richtig.

**Hold-Upgrade „Weitsicht"** erweitert auf 4 Angebote → 29 %. Spürbar, aber
nicht lösend. Das ist die Meta-Belohnung, die sich richtig anfühlt, ohne die
Spannung zu töten.

**Run-Ressourcen** (im Hold gefertigt, pro Run begrenzt):
- **Reroll** — Angebot neu ziehen (Standard: 1, ausbaubar auf 4)
- **Verbannen** — eine Karte dauerhaft aus diesem Run entfernen (Standard: 0,
  ausbaubar auf 3). Das ist das eigentliche Build-Werkzeug für Fortgeschrittene.
- **Überspringen** — Kartenzug gegen Gold eintauschen

---

## 6. Schicht 2 — Der Hold (Idle)

### 6.1 Das Multi-Clock-Prinzip

Acht Gebäude mit acht verschiedenen Füllzeiten. Der Kern des Idle-Designs: Jede
Rückkehr-Taktung — 30 Minuten, 2 Stunden, über Nacht, Wochenende — findet etwas
Volles vor.

| Gebäude | Volk | Produziert | Füllzeit | Zielspieler |
|---|---|---|---|---|
| **Tiefmine** | Zwerge | Eisenerz, Silbererz | 25 Min | Der Pausen-Spieler |
| **Holzfälle** | Sylvani | Eibenholz, Sehne | 40 Min | Der Pausen-Spieler |
| **Emberschmiede** | Menschen | Barren *(verbraucht Erz)* | 2 h | Zweimal täglich |
| **Arkanum** | Zirkel | Essenz | 4 h | Zweimal täglich |
| **Runenwebstuhl** | Zwerge | Runen *(verbraucht Essenz)* | 8 h | Über Nacht |
| **Übungshof** | Menschen | Helden-XP *(verbraucht Rationen)* | 12 h | Über Nacht |
| **Skriptorium** | Zirkel | Foliant *(Kartenpool-Mods)* | 24 h | Täglich |
| **Wardenkammer** | — | Aufstiegs-Splitter | 48 h | Wochenende |

**Simulierte Abdeckung:**

| Abwesenheit | Volle Gebäude |
|---|---|
| 30 Min | 1 / 8 |
| 2 h | 3 / 8 |
| 8 h (Arbeitstag) | 5 / 8 |
| 12 h (über Nacht) | 6 / 8 |
| 24 h | 7 / 8 |
| 72 h (Wochenende) | 8 / 8 |

Nie „nichts zu tun". Nie „alles verpasst".

### 6.2 Die Ressourcenkette

```
Territorium ──► Roherz ──┐
                         ├──► Barren ──┬──► Waffe / Rüstung ──► Kartensaat
Territorium ──► Holz ────┘             │
                                       └──► Emberstaub (Zerlegung)
Territorium ──► Essenz ──► Runenrohling ──► Rune (RNG-Substats)
Zeit + Rationen ──► Helden-XP
Materialien ──► Foliant ──► Kartenpool-Erweiterung / Umschichtung
```

Drei Stufen: **roh → verarbeitet → gefertigt.** Jede Stufe hat eigenes Lager,
eigene Füllzeit, eigenen Engpass. Das erzeugt die Entscheidung, die Idle-Spiele
interessant macht: *Welchen Engpass löse ich als nächstes?*

### 6.3 Lagerkapazität als Tor

Gebäude produzieren, bis das Lager voll ist, dann stoppen sie. Lagerausbau ist
ein eigener Upgrade-Pfad.

Das ist absichtlich das **einzige** Tor. Kein Timer, keine Energie, keine
tägliche Sperre. Wer öfter einloggt, erntet mehr Durchsatz — wer selten
einloggt, verliert nichts, sondern erreicht nur die Kappe.

### 6.4 Offline-Fortschritt

- **Basiskappe: 24 h** (Melvor-Standard)
- **Ausbaubar auf 72 h** über Hold-Stufen, Aufstiegs-Perks und das Steward-Abo
- **Ehrliche Simulation:** Der lokale `sim-core` rechnet den Zeitraum bei der
  Rückkehr deterministisch nach, inklusive Verbrauchsketten (die Schmiede stoppt
  wirklich, wenn das Erz alle ist). Bei aktiviertem Cloud-Save kann die
  Serverzeit als Plausibilitätscheck dienen, sie ist aber keine Spielvoraussetzung.
- **Rückkehr-Bildschirm:** Eine Zusammenfassung, ein Knopf, fertig. Kein
  mehrseitiges Belohnungs-Theater.

Die Kappen-Erweiterung ist bewusst ein Monetarisierungshebel — sie verkauft
**Bequemlichkeit** (weniger einloggen müssen), nicht Macht. Regel 6.

---

## 7. Schicht 3 — Die Karte (die Brücke)

### 7.1 Aufbau

20 Territorien in 5 Biomen. Jedes Territorium ist gleichzeitig:
- ein **Sortie-Szenario** (eigenes Gegner-Set, eigenes Layout, eigene Musik)
- ein **Produktionsknoten** für den Hold, sobald erobert
- die **einzige Quelle** einer bestimmten Ressource

| Biom | Territorien | Tier-Bereich | Volk | Unikat-Ressource |
|---|---|---|---|---|
| **Die Grenzmark** | 4 | T0–T3 | Menschen | Eisenerz, Rationen |
| **Der Alte Forst** | 4 | T2–T5 | Sylvani | Eibenholz, Sehne, Nachtgift |
| **Die Nebelmoore** | 4 | T4–T7 | — | Moorsalz, Irrlichtessenz |
| **Die Grauklamm** | 4 | T6–T9 | Zwerge | Sternstahl, Runenrohling |
| **Die Aschenstadt** | 4 | T8–T10 | Zirkel | Ascheglas, Wardenherz |

### 7.2 Korruptionsstufen (T0–T10)

Jedes Territorium wird auf einer Stufe gespielt. Höhere Stufe = härterer Kampf =
besserer Produktionsknoten. Man steigt Stufen, indem man das Territorium auf
der nächsthöheren Stufe erneut erobert.

**Verifizierte Skalierung:**

| Größe | Wachstum pro Stufe |
|---|---|
| Gegner-HP & -Schaden | ×1,35 |
| Belohnung & Knotenertrag | ×1,38 |
| Erreichbare Spielermacht | ×1,36 (Gear ×1,28 · Runen ×1,06 · Baum) |

| Tier | Gegner-HP | Spielermacht | Machtquote | Belohnung |
|---|---|---|---|---|
| 0 | 1,00 | 1,00 | 1,00 | 1,00 |
| 3 | 2,46 | 3,40 | 1,38 | 2,63 |
| 6 | 6,05 | 10,73 | 1,77 | 6,91 |
| 10 | 20,11 | 46,51 | 2,31 | 25,05 |

Die Machtquote steigt langsam über 1,0 — jede Stufe ist schaffbar, aber erst
nach Hold-Ausbau. Und weil die Belohnung (1,38) schneller wächst als die
Schwierigkeit (1,35), lohnt sich das Hochpushen **immer**. Es gibt keinen Punkt,
an dem Farmen auf niedriger Stufe effizienter wäre.

### 7.3 Keine Verfalls-Mechanik

Erobertes Gebiet bleibt erobert. Für immer. Kein Rückfall, keine
Verteidigungspflicht, kein Timer. Regel 7.

Die Rückkehr-Motivation kommt aus vollen Lagern und offenen Zielen, nicht aus
Angst vor Verlust. Verfallsmechaniken erhöhen kurzfristig die Session-Zahl und
zerstören langfristig D30 — genau die Kennzahl, von der dieses Spiel lebt.

---

## 8. Helden

Sechs zum Start. Jeder ist über eine **eigene Auto-Angriffs-Regel** definiert —
das ist das Einzige, was der Spieler nicht steuert, und deshalb das, was das
Spielgefühl bestimmt. Jede Regel erzwingt ein anderes Bewegungsmuster.

---

### ⟡ Aelric Fernstreich — *Der Langbogenschütze*
**Volk:** Menschen · **Freischaltung:** Start

> **Auto-Angriff:** Priorisiert **Boss, dann Elite, dann das nächste Ziel**.
> Ein auf den Boss gerichteter Pfeil durchschlägt die Add-Wand.
>
> **Ember-Stoß:** Rückwärts-Sprung mit Salve auf die Ausgangsposition.
>
> **Bewegungsmuster:** Kiten. Aelric will Abstand und will Gegner in einer Linie.
> Der Spieler lernt, Gegnermassen zu „sortieren".
>
> **Signatur — Salve:** Jede Durchbohrung erhöht den Schaden des nächsten
> Treffers statt ihn zu senken. Kehrt die Kernregel um.

---

### ⟡ Sylwen Dornsang — *Die Dornsängerin*
**Volk:** Sylvani · **Freischaltung:** Alter Forst, Territorium 2

> **Auto-Angriff:** Suchende Pfeile, die beim Aufprall **Dornengestrüpp**
> pflanzen — ein bleibendes Schadensfeld für 6 Sekunden.
>
> **Ember-Stoß:** Kurzer Sprint, der eine Dornenspur zieht.
>
> **Bewegungsmuster:** Flächenkontrolle. Sylwen baut ein Labyrinth aus eigenen
> Feldern und lockt Gegner hinein. Man bewegt sich in Kreisen statt zu fliehen.
>
> **Signatur — Wurzelfeld:** Dornenfelder, die sich berühren, verbinden sich zu
> einem Netz mit erhöhtem Schaden auf allen Knoten.

---

### ⟡ Maerhold Glutwirker — *Der Emberwright*
**Volk:** Zirkel · **Freischaltung:** Grenzmark, Territorium 4

> **Auto-Angriff:** Langsame, schwere Feuerkugeln, die explodieren. Schaden
> skaliert mit der **Anzahl der Gegner im Explosionsradius**.
>
> **Ember-Stoß:** Entzündet die durchlaufene Strecke für 4 Sekunden.
>
> **Bewegungsmuster:** Ködern. Maerhold ist schwach gegen wenige Gegner und
> vernichtend gegen viele. Der Spieler lernt, Massen zu *sammeln* statt zu fliehen
> — die Umkehrung des Instinkts.
>
> **Signatur — Feuersbrunst:** Getötete Gegner entzünden Nachbarn. Kettenreaktion.

---

### ⟡ Vashti Sturmruf — *Die Sturmruferin*
**Volk:** Zirkel · **Freischaltung:** Nebelmoore, Territorium 1

> **Auto-Angriff:** Kettenblitz vom **nächsten** Gegner ausgehend, springt auf
> bis zu 4 weitere. Reichweite ist kurz.
>
> **Ember-Stoß:** Blinzelt (teleportiert) an den Zielpunkt.
>
> **Bewegungsmuster:** Gefährliche Nähe. Vashti ist Aelrics Gegenteil: sie muss
> mitten hinein. Der Teleport ist ihre Lebensversicherung.
>
> **Signatur — Statisches Feld:** Jede Sekunde ohne erlittenen Treffer erhöht die
> Sprungzahl um 1, bis zu +6. Zurückgesetzt bei Schaden. Belohnt perfektes Spiel.

---

### ⟡ Dorn Steinbart — *Der Runenwächter*
**Volk:** Zwerge · **Freischaltung:** Grauklamm, Territorium 1

> **Auto-Angriff:** Kein Projektil. Rotierende Runensteine im Nahbereich plus
> ein pulsierender Schadensaura.
>
> **Ember-Stoß:** Rammt Gegner beiseite, gewinnt Schild pro getroffenem Gegner.
>
> **Bewegungsmuster:** Durchpflügen. Dorn läuft geradeaus durch die Masse. Der
> einzige Held, der nicht ausweicht — er nimmt Schaden und wandelt ihn um.
>
> **Signatur — Bollwerk:** 40 % des erlittenen Schadens werden zu Schild. Bei
> vollem Schild explodiert er in einem Ring.

---

### ⟡ Kaelen Schattenmal — *Der Schattenmark*
**Volk:** Menschen (abtrünnig) · **Freischaltung:** Aschenstadt, Territorium 1

> **Auto-Angriff:** Zielt auf den Gegner mit den **meisten aktuellen HP**.
> Hinrichtung unter 18 % HP.
>
> **Ember-Stoß:** Kurze Unsichtbarkeit; der nächste Angriff ist ein garantierter
> Kritischer Treffer.
>
> **Bewegungsmuster:** Elitenjagd. Kaelen ignoriert Schwärmer und tötet, was
> zählt. Der Spieler muss die Masse überleben statt sie zu bekämpfen.
>
> **Signatur — Ernte:** Jede Hinrichtung setzt den Ember-Stoß zurück.

---

### 8.1 Warum diese Sechs

| Held | Reichweite | Ziel-Logik | Erzwungenes Verhalten |
|---|---|---|---|
| Aelric | Weit | Fernster | Kiten, sortieren |
| Sylwen | Mittel | Suchend | Kreisen, Felder bauen |
| Maerhold | Mittel | Cluster | Ködern, sammeln |
| Vashti | Kurz | Nächster | Hineingehen, ausweichen |
| Dorn | Nah | Umkreis | Durchpflügen |
| Kaelen | Mittel | Höchste HP | Elitenjagd, überleben |

Zwei Bogenschützen, zwei Magier, ein Wächter, ein Meuchler — aber die
Unterscheidung läuft über *Verhalten*, nicht über Klassennamen. Zwei
Bogenschützen spielen sich völlig verschieden.

### 8.2 Helden leveln offline

Der **Übungshof** produziert Helden-XP, während man nicht spielt — für einen
Helden, den man gerade **nicht** benutzt. Man kann also Held 4 hochziehen,
während man Held 1 spielt.

Das ist die direkte Antwort auf das Metasystem-Prinzip „Multi-Hero-Investment":
Statt den Spieler zu zwingen, mehrere Helden zu grinden, schenkt man ihm den
Fortschritt für die Helden, die er nicht spielt. Der Anreiz, den Helden zu
wechseln, entsteht dann von selbst — der andere ist ja schon stark.

---

## 9. Waffen, Karten & Evolutionen

### 9.1 Waffen (12 zum Start)

| # | Waffe | Verhalten |
|---|---|---|
| 1 | **Langbogen** | Durchbohrende Linie |
| 2 | **Splitterköcher** | Dreier-Fächer nach vorn |
| 3 | **Sturmpfeil** | Suchend, kurvt |
| 4 | **Efeuranke** | Bodenfeld, bleibend |
| 5 | **Feuerkugel** | Langsam, explodiert |
| 6 | **Kettenblitz** | Springt zwischen Zielen |
| 7 | **Frostnova** | Puls um den Spieler, verlangsamt |
| 8 | **Rundenklinge** | Umkreisende Klingen |
| 9 | **Wurfaxt** | Bogen, kehrt zurück |
| 10 | **Schattendolch** | Zielt auf niedrigste HP |
| 11 | **Runenglyphe** | Stationärer Geschützturm |
| 12 | **Sternenfall** | Meteore von oben, zufällig |

### 9.2 Passive (10)

Sehne *(Angriffstempo)* · Köcher *(Projektilzahl)* · Federung *(Lauftempo)* ·
Umhang *(Rüstung)* · Amulett *(Abklingzeit)* · Linse *(Wirkungsfläche)* ·
Wetzstein *(Schaden)* · Herzstein *(Max-HP)* · Magnetstein *(Aufsammelradius)* ·
Glücksmünze *(Seltenheitschance)*

### 9.3 Evolutionen (12)

**Bedingung:** Waffe auf Stufe 5 **+** zugehöriges Passiv auf Stufe 3.
Die Evolution ersetzt die Waffe und verändert ihr Verhalten grundlegend — nicht
nur ihre Zahlen. Das ist Vampire Survivors' bester Haken und der Grund, warum
Runs ein Ziel jenseits des Überlebens haben.

| Waffe | + Passiv | → Evolution | Neues Verhalten |
|---|---|---|---|
| Langbogen | Sehne | **Windriss** | Unbegrenzte Durchbohrung, Sogschneise hinter dem Pfeil |
| Splitterköcher | Köcher | **Pfeilregen** | 180°-Fächer statt Dreier |
| Sturmpfeil | Linse | **Jägerschwarm** | 5 Pfeile, die nach Kill neu anvisieren |
| Efeuranke | Wetzstein | **Dornenwald** | Felder verbinden sich zu einem Gitter |
| Feuerkugel | Linse | **Höllenschlund** | Explosion hinterlässt brennenden Boden |
| Kettenblitz | Amulett | **Sturmherz** | Dauerhafte Bögen zu den 8 nächsten Gegnern |
| Frostnova | Umhang | **Ewiger Winter** | Frier-Aura; gefrorene Gegner zerspringen |
| Rundenklinge | Federung | **Klingenzyklon** | Rotiert schneller, je mehr man sich bewegt |
| Wurfaxt | Wetzstein | **Richtbeil** | Hinrichtung unter 20 % HP |
| Schattendolch | Glücksmünze | **Meuchelmond** | Krits springen auf ein neues Ziel |
| Runenglyphe | Herzstein | **Wachtturm** | Türme bleiben und stapeln sich |
| Sternenfall | Magnetstein | **Himmelssturz** | Meteore ziehen Gegner erst zusammen |

### 9.4 Slot-Ökonomie

6 Waffenslots · 6 Passivslots · je 5 Stufen = **60 Upgrade-Schritte**.
Selbst die 20-Minuten-Wardenjagd erreicht nur 82 %. Man ist nie „fertig".

---

## 10. Meta-Progression

Fünf Systeme, absichtlich unterschiedlich in Tempo und Zielgruppe.

### 10.1 Ausrüstung & Emberstaub — *das Anti-Archero-System*

**6 Slots:** Waffe · Helm · Brust · Umhang · Ring · Talisman
**6 Ränge:** Gewöhnlich → Fein → Selten → Uralt → Mythisch → Aufgestiegen

**Der Kernmechanismus:** Es gibt **keine** Fusion identischer Gegenstände.
Stattdessen:

```
Jeder ungewollte Gegenstand  ──Zerlegen──►  Emberstaub + Rang-Splitter
Emberstaub + Splitter        ──Aufwerten──►  das Teil, das man WIRKLICH will
```

| Rang | Zerlegungsertrag | Aufstiegskosten | Nötige Drops |
|---|---|---|---|
| Gewöhnlich | 4 Staub | — | — |
| Fein | 14 | 40 | 10,0 |
| Selten | 50 | 160 | 11,4 |
| Uralt | 190 | 640 | 12,8 |
| Mythisch | 720 | 2.600 | 13,7 |
| Aufgestiegen | 2.800 | 10.500 | 14,6 |

Rund 11–15 beliebige Drops pro Rangaufstieg — konstant, planbar, nie von
Glück abhängig. **Kein Drop ist je wertlos.** Archero verlor Spieler genau
hier; wir schließen den Fehler strukturell aus.

**Kartensaaten:** Jedes Teil ab Rang *Selten* trägt eine Karte in den Run-Pool.
Das macht Ausrüstung zu einer Build-Entscheidung, nicht zu einer Statliste.
Ein *Uralter Eibenbogen* mit *Splitterschuss* ist etwas anderes als einer mit
*Sengender Pfeil*, auch bei identischen Werten.

### 10.2 Runen — *die Tiefe für Optimierer*

Am Runenwebstuhl gefertigt, in Ausrüstung gesockelt (2–4 Sockel je nach Rang).
Jede Rune hat einen festen Hauptwert und **3 zufällig gerollte Nebenwerte**,
die beim Aufwerten weiter rollen (Summoners-War-Muster).

Runen sind die Antwort auf „was mache ich im Endgame". Sie sind bewusst
tief, optional und nicht erforderlich, um Inhalte zu sehen — nur, um sie
effizient zu spielen. Hier leben die Theoriebastler.

**6 Runensets**, je 2 oder 4 Teile für einen Bonus:
Jäger *(Krit)* · Wächter *(Rüstung)* · Wandler *(Tempo)* ·
Zehrer *(Lebensraub)* · Anrufer *(Abklingzeit)* · Aschenkind *(Schaden bei
niedriger HP)*

### 10.3 Der Ember-Baum — *bewusst klein*

Kontoweiter Permanent-Upgrade-Baum, mit Gold gekauft. **40 Knoten. Fertig in
~30 Stunden.**

Das ist Absicht. Vampire Survivors' größte Endgame-Beschwerde ist die
„schiere Zahl permanenter Upgrades mit eskalierenden Goldkosten" — ein
Treadmill, der Experimentierfreude durch Optimierungsdruck ersetzt. Unser
Baum ist ein *Tutorial für Macht*, kein Langzeitsystem. Die Langzeitsysteme
sind Runen und Aufstieg.

### 10.4 Aufstieg (Ascension) — *das Prestige*

**Tor:** Einen **Warden** in einer Wardenjagd besiegen. Fünf Wardens, einer pro
Biom.

| Wird zurückgesetzt | Bleibt erhalten |
|---|---|
| Hold-Gebäudestufen | Helden & Heldenstufen |
| Gold & Rohressourcen | Ausrüstung & Runen |
| Ember-Baum | Freigeschaltete Helden, Waffen, Rezepte |
| Territorium-Stufen | Folianten & Kartenpool-Erweiterungen |
| | Aufstiegs-Splitter & -Perks |

**Splitter-Formel** (AdVenture-Capitalist-Muster, sanfteste der untersuchten
Kurven — angemessen, weil unser Aufstieg zusätzlich durch einen Bosskampf
gegated ist):

```
Splitter = 10 × √(Spitzenertrag_Ember_pro_Stunde / 10.000)
```

→ **4-facher Ertrag = doppelte Splitter.** (Cookie Clicker verlangt 8×, Egg Inc
sogar 128×; beides wäre hier zu hart.)

**Zyklusdauer (simuliert):**

| Zyklus | Splitter-Bonus | Splitter dazu | Dauer |
|---|---|---|---|
| 1 | 1,00× | 10,0 | 6 h |
| 3 | 1,47× | 18,2 | 8 h |
| 6 | 3,02× | 47,9 | 11 h |
| 10 | 9,95× | 159,7 | 12 h |
| 12 | 16,81× | 207,6 | 11 h |

Die Zyklen bleiben stabil im 6–12-h-Korridor. Sie werden nicht länger — nur
wertvoller. Das ist der Unterschied zwischen einem Prestige-System, das trägt,
und einem, das ermüdet.

**Aufstiegs-Perks** — mit Splittern gekauft. Entscheidend: nicht nur
Multiplikatoren, sondern **Regeländerungen**:

- *Vorgeglüht* — Runs starten auf Stufe 3
- *Wachende Glut* — Tiefmine produziert während eines Runs weiter
- *Zweite Wahl* — ein zusätzlicher Reroll pro Run
- *Langer Atem* — Offline-Kappe +12 h
- *Doppelschlag* — 8 % Chance, dass ein Kartenzug zwei Karten gibt
- *Ascheblick* — Elite-Gegner zeigen ihre Drops vor dem Kampf

Regeländerungen halten Prestige interessant über Zyklus 5 hinaus. Reine
Multiplikatoren tun das nicht.

### 10.5 Aufstiegspfade — *ab Aufstieg 3*

Pro Held ein Pfad, der die **Auto-Angriffs-Regel** verändert. Beispiel Aelric:

- **Windläufer** — schießt auf den *nächsten* Gegner, doppeltes Tempo
- **Todesschütze** — schießt nur alle 1,5 Sek, aber 4× Schaden und volle
  Durchbohrung
- **Falkenauge** — schießt auf den Gegner mit den *meisten* HP im Bildschirm

Drei Pfade × sechs Helden = 18 grundverschiedene Spielweisen. Das ist die
tiefste Wiederspielbarkeitsquelle im Spiel und der Grund, nach 100 Stunden
noch da zu sein.

---

## 11. Balancing — alle Formeln

Alle Formeln wurden simuliert und gegen die Designziele geprüft. Die
Simulationsskripte gehören ins Repository und laufen in der CI mit.

### 11.1 Hold-Ökonomie

```
Kosten(n)   = Basis × 1,11^n
Ertrag(n)   = Basis_Ertrag × n × 2^⌊n/25⌋
Massenkauf  = b × r^k × (r^n − 1)/(r − 1)
```

Der Term `2^⌊n/25⌋` erzeugt Meilenstein-Verdopplungen bei Stufe 25/50/75/100.
Zwischen den Meilensteinen steigt die Amortisationszeit exponentiell; beim
Meilenstein fällt sie schlagartig. Das sind die „Bumps", die Idle-Ökonomien
am Leben halten.

**Simulierter Idle-Herzschlag** (Wartezeit bis zum nächsten Upgrade):

| Hold-Stufe | Wartezeit | Bewertung |
|---|---|---|
| 5–35 | 1,2–2,3 Min | Aktive Schleife |
| 40–60 | 3,4–9,1 Min | Idle-Pause |
| 65–80 | 14–28 Min | Zäh |
| **85+** | **44 Min+** | **Wall** |

**Design-Regel daraus:** Der Warden von Zyklus 1 muss bei **Hold-Stufe 60**
besiegbar sein — 25 Stufen Puffer vor der Wall. Der Spieler steigt auf, bevor
er stecken bleibt, nicht weil er stecken geblieben ist.

**Zeit bis Aufstieg 1:** ~3,1 h reine Fortschrittszeit. Bei 35–50 Min/Tag
sind das 4–5 Tage — genau das Fenster, in dem die meisten Spieler sonst
abspringen. Das erste Prestige ist unser D7-Instrument.

### 11.2 Run-XP

```
xp_bedarf(L) = 82 × L^0,70
```

Für Phase 0 ist dies die im ausführbaren Kampfprototyp getestete Kurve. Der
erste Kartenzug zielt auf 35 Sekunden; über die feste Seed-Suite gilt ein
akzeptierter Mittelwert von 25–45 Sekunden und 21 ± 3 Züge in 8 Minuten. Die
XP-Rate **sättigt**:

```
rate(t) = 8,6 × Dichte(t) × Buildstärke(t) × Bossdelle(t) × Schatzflut(t)

Dichte(t)      = 1 + 3,4 × t^1,6 / (t^1,6 + 210^1,6)      → sättigt bei 4,4×
Buildstärke(t) = 1 + 7,0 × t^1,7 / (t^1,7 + 300^1,7)      → sättigt bei 8,0×
Bossdelle(t)   = 1 − 0,30 × exp(−(t−250)² / (2×75²))
Schatzflut(t)  = 1 + 0,45 × exp(−(t−420)² / (2×55²))
```

**Der Grund für die Sättigung ist technisch und wird zum Designvorteil:** Die
Gegnerdichte kann nicht unbegrenzt wachsen, weil das Entity-Budget bei ~700
Gegnern liegt. Technik und Design ziehen hier in dieselbe Richtung — die
Sättigung, die die Engine erzwingt, ist genau die, die lange Runs im Zaum hält.

### 11.3 Territorium-Skalierung

```
Gegner_HP(T)  = Basis × 1,35^T
Belohnung(T)  = Basis × 1,38^T
Spielermacht  = 1,28^T (Gear) × 1,06^T (Runen) × (1 + 0,12·min(T,10)) (Baum)
```

Belohnung > Schwierigkeit ⇒ Hochpushen lohnt sich immer.
Spielermacht > Schwierigkeit ⇒ jede Stufe ist erreichbar, aber nur mit Ausbau.

### 11.4 Aufstieg

```
Splitter    = 10 × √(Spitzenertrag / 10.000)
Splitterbonus = 1 + 0,02 × Splitter_gesamt
```

### 11.5 Täglicher Soft-Cap statt Energie

| Run # | Multiplikator |
|---|---|
| 1–6 | 100 % |
| 7–12 | 55 % |
| 13+ | 30 % |

**Ertrag pro Minute** fällt von 267 auf 156 — ein natürlicher Ausstiegspunkt
nach etwa 100 Minuten. Kein Energiebalken, keine Sperre, keine Paywall. Wer
weiterspielen will, darf; es lohnt sich nur weniger. Das ist der zivilisierte
Ersatz für Archeros Energie-System.

### 11.6 Idle-vs-Aktiv-Wertigkeit

| Szenario | Idle-Ertrag | Run-Ertrag | Run-Anteil |
|---|---|---|---|
| 12 h offline, keine Runs | 5.307 | 0 | 0 % |
| 12 h offline, 2 Runs | 5.307 | 4.800 | 47 % |
| 0 h offline, 4 Runs (32 Min) | 0 | 9.600 | 100 % |
| 12 h offline, 6 Runs | 5.307 | 14.400 | 73 % |

**32 Minuten aktives Spiel schlagen 12 Stunden reines Idle.** Aber reines Idle
bringt spürbaren Fortschritt. Zielverhältnis erreicht: aktiv 60–70 %, idle
30–40 %.

---

## 12. Erste Sitzung (FTUE)

Die ersten zehn Minuten entscheiden über D1. Vampire Survivors' zugestandene
Schwäche ist der langsame, repetitive Frühlauf. Wir drehen das um:

| Zeit | Was passiert |
|---|---|
| **0:00** | **Kaltstart.** Du bist mitten im Kampf, Stufe 30, vier Waffen evolviert, der Bildschirm explodiert. 45 Sekunden purer Machtrausch. Keine Erklärung. |
| **0:45** | Schnitt. Der Hold fällt. Die Aschung rollt heran. Bildschirm verliert die Farbe. |
| **1:00** | Du wachst als Stufe-1-Überlebender auf. Erstes **Scharmützel** (3 Min) als Aelric. Kartenzüge geführt, aber echt. |
| **4:00** | Rückkehr zum zerstörten Hold. Ein Knopf: **Tiefmine reparieren.** Erste Produktion startet, sichtbar. |
| **5:00** | Zweite Sortie — jetzt mit einer Waffe aus dem eigenen Erz. Der Zusammenhang wird ohne Text klar. |
| **8:00** | Erstes Territorium erobert. Der Hold-Ertrag springt sichtbar. **Die Schleife ist geschlossen.** |
| **10:00** | Erst jetzt: Frage nach Benachrichtigungen. Nach dem Wert, nie davor. |
| **Tag-1-Ziel** | Hold-Stufe 20, Held 2 freigeschaltet, drei Territorien. |

Der Kaltstart ist die wichtigste Designentscheidung der FTUE: Der Spieler
erlebt das Versprechen des Spiels in Sekunde 5, nicht in Stunde 3. Alles
danach ist der Weg zurück zu einem Gefühl, das er schon kennt.

---

## 13. Art Direction & Audio

### 13.1 Der visuelle Kern: Silhouette-First

**2D-Draufsicht, gemalte Silhouetten.**

- **Gegner** sind fast schwarze Silhouetten mit **einer** Akzentfarbe, die ihre
  Familie kodiert (rot = Stürmer, violett = Speier, gold = Wahrer). Bei 1.000
  Gegnern auf einem 6-Zoll-Display ist Lesbarkeit alles.
- **Der Held** ist das einzige voll ausgeleuchtete, gesättigte Objekt.
- **Die Welt** ist entsättigt — das ist die Aschung.
- **Der Lichtradius wächst mit der Buildstärke.** Um den Spieler herum kehrt die
  Farbe in die Welt zurück, je mächtiger er wird. Bei Minute 7 ist der halbe
  Bildschirm wieder farbig.

Das ist gleichzeitig:
- **billig** — Silhouetten brauchen weniger Detail als ausgearbeitete Sprites
- **lesbar** — genau die Anforderung bei extremer Entity-Dichte
- **eigenständig** — die meisten Survivors-likes sind Pixel-Art oder generisches 3D
- **erzählend** — die Mechanik *ist* die Fiktion
- **clipbar** — der Moment, in dem die Farbe zurückkommt, ist von Natur aus
  TikTok-Material. Survivor.ios Durchbruch war TikTok-getrieben; das ist kein
  Zufall, sondern eine Eigenschaft, die man ins Spiel einbauen kann.

### 13.2 VFX-Budget

Das gesamte VFX-Budget geht in **Projektile und Evolutionen**. Das ist, was
Spieler screenshotten und teilen. Umgebungspartikel: minimal.

### 13.3 Der Hold

Der Hold ist ein **gemaltes Diorama**, keine 3D-Szene. Jedes ausgebaute Gebäude
verändert sichtbar das Bild — mehr Rauch, mehr Licht, mehr Leute. Nach 20
Stunden sieht der Hold anders aus. Ein einziges großes Bild mit ~60
austauschbaren Ebenen kostet einen Bruchteil einer echten Basisbau-Szene und
liefert 90 % des Gefühls.

### 13.4 Audio

- **Musik:** Streicher und Holzbläser, ein Cello-Motiv für Emberhold. Der
  Kampf-Track baut in vier Lagen auf, die mit der Buildstärke einsetzen — die
  Machtfantasie ist auch hörbar.
- **Sound:** Getrennte Klangsignaturen pro Waffe. Der Aufsammel-Ton für
  Erfahrungssplitter ist der wichtigste Sound im Spiel und wird gestapelt (bei
  der Schatzflut ein Rauschen aus hundert Tönen).
- **Der Hold** hat keinen Musikloop, sondern eine Klangkulisse: Hammer, Wind,
  Feuer. Ruhe nach dem Kampf.

---

## 14. UX & Steuerung

### 14.1 Mobile-First-Regeln

1. **Alles Wichtige in Daumenreichweite** — untere 40 % des Bildschirms
2. **Keine Textwand** — jede Erklärung passt in eine Zeile oder ist ein Bild
3. **Der Hold ist der Startbildschirm** — nicht ein Menü, nicht ein Laden
4. **Maximal zwei Taps zu einem Run** — Hold → Karte → Territorium → Start ist
   schon einer zu viel; deshalb hat der Hold einen „Letzte Sortie
   wiederholen"-Knopf
5. **Keine Popups beim Start.** Belohnungen sammeln sich in einem Postfach.

### 14.2 Die Bildschirme

```
      ┌─────────────┐
      │   DER HOLD  │◄── Startbildschirm, Sammeln, Ausbauen
      └──┬───┬───┬──┘
         │   │   └────────────┐
    ┌────▼─┐ │            ┌───▼────┐
    │KARTE │ │            │ SCHMIEDE│ Ausrüstung, Runen, Zerlegen
    └──┬───┘ │            └────────┘
       │     └───────┐
  ┌────▼────┐   ┌────▼─────┐
  │ SORTIE  │   │  HELDEN  │ Stufen, Pfade, Ausrüstung anlegen
  └─────────┘   └──────────┘
```

Vier Bildschirme. Mehr braucht das Spiel nicht.

### 14.3 Plattform-Anpassungen

| | Mobile | Web/Desktop |
|---|---|---|
| Steuerung | Schwebender Joystick | WASD + Leertaste |
| Hold-Ansicht | Vertikal scrollend | Breitbild-Diorama |
| Kartenzug | Große Tap-Ziele | Klick oder 1/2/3 |
| Speichern | Automatisch + Cloud | Automatisch + Cloud |

---

## 15. Technischer Bauplan

### 15.1 Engine-Entscheidung: **Defold**

| Kriterium | Defold | Godot 4.x | Unity 6 |
|---|---|---|---|
| HTML5-Build (leer, komprimiert) | **0,83 MB** | ~5 MB | ~7,7 MB |
| Android (leer) | **2,56 MB** | ~25 MB | ~20 MB |
| iOS (leer) | **1,35 MB** | ~30 MB | ~25 MB |
| Entities | „zehntausende ohne zu zucken" | gut mit MultiMesh | mittel |
| Mobile-Browser | explizit ausgelegt | seit 4.3 brauchbar | seit U6, Speicherprobleme |
| Sprache | Lua | GDScript *(C# geht nicht ins Web)* | C# |
| Kosten | frei | frei | ab Schwelle |
| Ökosystem | **klein** | groß | sehr groß |

**Warum Defold gewinnt:** Ein 0,83-MB-Web-Build lädt in unter zwei Sekunden.
Das ist kein technisches Detail, sondern unser wichtigster Marketingkanal —
siehe Kapitel 16. Ein Godot-Web-Build mit Assets landet bei 20–35 MB; damit ist
„klick den Link und spiel sofort" tot. Dazu kommt, dass Defold für genau unser
Profil gebaut ist: viele Objekte, schwache Geräte, ein Codestand für Web,
Android und iOS ohne Wrapper.

**Das Risiko** ist das kleine Ökosystem: weniger Plugins, weniger Entwickler auf
dem Markt, weniger Stack-Overflow-Antworten. Die Architektur unten entschärft
das, indem sie die Hälfte des Spiels engine-unabhängig hält.

**Fallback:** Godot 4.x mit GDScript, falls Team-Erfahrung schwerer wiegt.
Dann Web-Build als Demo mit reduzierten Assets. **Nicht** Unity — der
Speicherverbrauch im Mobile-Browser ist für unser Entity-Profil riskant.

### 15.2 Architektur: Zwei getrennte Hälften

```
┌───────────────────────────────────────────────────────────────┐
│  sim-core        (reines Lua, KEINE Engine-Abhängigkeit)      │
│                                                               │
│  • Vollständige Idle-Ökonomie                                 │
│  • Speicherstand & Migrationen                                │
│  • Offline-Berechnung (deterministisch, tickweise)            │
│  • Fortschritts-Mathematik, Kostenkurven, Aufstieg            │
│  • Loot-Tabellen & Drop-Auflösung (seeded RNG)                │
│                                                               │
│  → kopflos testbar · läuft im Client und in CI-Simulationen   │
└──────────────────────────┬────────────────────────────────────┘
                           │ klare API-Grenze
┌──────────────────────────▼────────────────────────────────────┐
│  game-client     (Defold)                                     │
│                                                               │
│  • Bullet-Heaven-ECS (Structure-of-Arrays)                    │
│  • Rendering, Eingabe, UI, Audio                              │
│  • Hold-Diorama                                               │
└───────────────────────────────────────────────────────────────┘
```

**Warum diese Trennung die wichtigste technische Entscheidung ist:**

1. **Balance ist testbar.** Die Simulationsskripte aus Kapitel 11 laufen gegen
   denselben Code wie das Spiel. Eine Balanceänderung, die die Aufstiegs-Zyklen
   aus dem 6–12-h-Korridor wirft, lässt die CI rot werden.
2. **Balance-Läufe dauern Sekunden, nicht Stunden.** 10.000 simulierte
   Spielerkarrieren vor dem Frühstück.
3. **Spielstände bleiben beherrschbar.** Derselbe Kern verwaltet lokale Saves,
   Migrationen und optionale Cloud-Synchronisierung. Es gibt keine
   Ranglisten-Daten, die autoritativ nachgerechnet werden müssten.
4. **Engine-Wechsel bleibt möglich.** Wenn Defold in drei Jahren ein Problem
   wird, wird der Client neu geschrieben — nicht das Spiel.

### 15.3 Bullet-Heaven-Performance

**Vorläufiges Phase-0-Budget** (Zielgerät: Android-Mittelklasse, 60 fps):

| | Hartes Budget | Referenzziel bei Min 8 |
|---|---:|---:|
| Gegner | 700 | ca. 300 sichtbar |
| Spielerprojektile | 800 | neu zu messen |
| Gegnerprojektile | 240 | neu zu messen |
| Aufsammelbares | 3.000 | neu zu messen |

Die früheren Spitzenwerte mit über 1.000 Gegnern sind nach dem realen
28-FPS-Feldtest verworfen. Reserve und tatsächliche Spitzen werden in P0.3 auf
Desktop und echten Mobilgeräten neu gemessen.

**Umsetzungsregeln:**

- **Structure-of-Arrays statt Objekte.** Gegner sind parallele Zahlenfelder
  (`x[]`, `y[]`, `hp[]`, `typ[]`), keine Tabellen pro Entität. Cache-freundlich
  und GC-frei.
- **Räumliches Hash-Gitter**, Zellengröße 64 px, für Kollisionen. Niemals
  Paarvergleich.
- **Objekt-Pools für alles.** Null Allokation in der Frame-Schleife.
- **Fester Sim-Tick 60 Hz**, entkoppelt vom Rendering. Auf schwachen Geräten
  30 Hz Sim + Interpolation.
- **Degradations-Reihenfolge** bei Last: (1) Schadenszahlen aus, (2) Partikel
  halbieren, (3) Aufsammelbares verschmelzen, (4) Sim auf 30 Hz, (5)
  Spawn-Deckel senken. Nie Framerate opfern.
- **Ein Draw-Call pro Sprite-Ebene** über Instanzierung.

### 15.4 Optionales Backend

**Supabase** (Postgres + Auth + Edge Functions), alternativ Firebase. Das
Backend ist Komfort- und Betriebsinfrastruktur, keine Voraussetzung für das
Solo-Spiel. Ein lokaler Speicherstand funktioniert ohne Konto und ohne
Internetverbindung.

| Aufgabe | Umsetzung |
|---|---|
| **Optionaler Cloud-Save** | Derselbe Fortschritt in Web, Android und iOS; lokales Spielen bleibt möglich |
| **Zeit-Plausibilisierung** | Erkennt grobe Uhrmanipulation, sperrt aber keinen Solo-Fortschritt |
| **Remote Config** | Balance-Werte ohne App-Update ändern — ab Soft Launch empfohlen |
| **Emberpass-Zustand** | Saisonfortschritt |
| **Kaufbeleg-Prüfung** | Apple / Google / Stripe |
| **Analytik** | Eigene Events + GameAnalytics |

**Speicherstand-Konflikte:** Letzter-Schreiber-gewinnt ist bei einem Idle-Spiel
falsch. Wir nutzen einen monoton steigenden Zähler plus serverseitige
Zusammenführung: bei Konflikt gewinnt der Stand mit dem höheren Gesamtfortschritt,
der Spieler wird informiert. Nie stillschweigend Fortschritt löschen.

### 15.5 Spielstand-Integrität statt Cheat-Abwehr

In einem reinen Solo-Spiel schadet ein manipuliertes Save ausschließlich dem
eigenen Erlebnis. Deshalb gibt es keine Replays, Ergebnisvalidierung oder
permanente Onlinepflicht.

- Lokale Saves besitzen Schema-Version, Prüfsumme und automatische Backups.
- Migrationen werden gegen alte Speicherstände getestet.
- Cloud-Saves werden vor dem Überschreiben versioniert; mindestens ein älterer
  Stand bleibt wiederherstellbar.
- Kaufbelege werden serverseitig geprüft, Spielfortschritt dagegen nicht
  bestraft oder verworfen.
- Uhrsprünge erzeugen höchstens einen Hinweis. Fortschritt wird nie kommentarlos
  gelöscht.

### 15.6 Build-Pipeline

```
git push
   │
   ├─► CI: sim-core Unit-Tests + Balance-Regressionstests
   │       (Zyklusdauer, Pick-Kadenz, Machtquoten, Wall-Positionen)
   │
   ├─► Defold Build Server ──┬─► HTML5  ──► CDN (Brotli, COOP/COEP)
   │                         ├─► Android ──► Play Internal Testing
   │                         ├─► iOS     ──► TestFlight
   │                         └─► Desktop ──► Steam Beta-Branch
   │
   └─► Remote-Config-Schema-Prüfung
```

**Balance-Regressionstests in der CI** sind das ungewöhnliche und wichtigste
Element: Jede Änderung an einer Kostenkurve läuft automatisch gegen die
Designziele aus Kapitel 11. Balance kann nicht mehr versehentlich kaputtgehen.

---

## 16. Monetarisierung & Geschäftsmodell

### 16.1 Der Grundsatz

**Wir verkaufen Bequemlichkeit, Kosmetik und Saison-Inhalte. Niemals Macht.**

Nicht verkäuflich: Ausrüstung, Runen, Statboosts, Aufstiegs-Splitter,
Territorien, Helden-Macht.

Das kostet messbar Umsatz pro Nutzer. Es kauft: Bewertungen, Mundpropaganda,
D30-Retention und die Glaubwürdigkeit, die eine Steam-Version braucht.

### 16.2 Kein Energie-System

Archeros Energie gehört zu den Ursachen seines LTV-Problems und ist 2026
nutzerfeindlich. Ersatz: der **tägliche Soft-Cap** aus Kapitel 11.5. Der
Spieler wird nie blockiert; nur die Effizienz sinkt.

### 16.3 Gestaffelte Einführung

Empfehlung aus der Marktrecherche: *„Establish one revenue stream, measure it
on your own cohorts, then add the next."* Alles gleichzeitig zu starten macht
unmessbar, was wirkt.

**Phase 1 — Launch: nur Rewarded Video**

| Platzierung | Belohnung | Deckel |
|---|---|---|
| Nach der Extraktion | Run-Belohnung ×2 | 4 / Tag |
| Hold-Sofortabholung | Doppelte gedeckelte Ernte | 3 / Tag |
| Kartenzug-Reroll | Ein zusätzlicher Reroll | 2 / Run |

Plus **ein** IAP: **„Werbefrei + Steward"** — 6,99 €, dauerhaft. Entfernt
Interstitials, gibt tägliche Gratis-Boni.

**Phase 2 — Monat 2: Emberpass**

Battle Pass, 4,99 € pro Saison, 4 Wochen. Frei-Spur + Premium-Spur.
Inhalte: Kosmetik, Emberstaub, ein Held, Offline-Kappen-Erweiterungen.
*(Battle Passes finden sich in ~60 % der umsatzstärksten mobilen Spiele.)*

**Phase 3 — Monat 3+: Laden & Abo**

- Emberstaub-Pakete *(Zerlegungswährung — spart Zeit, nicht Macht)*
- Helden-Freischaltungen *(alle Helden bleiben auch kostenlos erspielbar)*
- Kosmetik: Skins, Ember-Stoß-Farben, Hold-Banner, Titel
- **Steward-Abo** 3,99 €/Monat: +24 h Offline-Kappe, Auto-Abholung, zweite
  Sortie-Warteschlange, Kosmetik-Rahmen
  *(Abo-Anteil in Hybrid-Spielen stieg von 4 % auf 7 % zwischen Anfang 2025 und
  Anfang 2026; Abo-Nutzer zeigen 14 % D30 gegenüber 5,4 % bei werbefinanzierten)*

**Nie: Interstitials im ersten Monat.** Interstitials kommen erst, wenn D7 steht.

### 16.4 Umsatzmodell — drei Szenarien

| Szenario | Ads | IAP | Pass | Abo | **ARPDAU** | Ad-Anteil | **LTV180** |
|---|---|---|---|---|---|---|---|
| Konservativ | 0,0201 | 0,0048 | 0,0071 | 0,0011 | **0,033 $** | 61 % | **0,21 $** |
| **Basis** | 0,0389 | 0,0131 | 0,0116 | 0,0020 | **0,066 $** | 59 % | **0,62 $** |
| Optimistisch | 0,0577 | 0,0293 | 0,0169 | 0,0037 | **0,108 $** | 54 % | **1,32 $** |

Der Ad/IAP-Split von ~59/41 entspricht dem Hybrid-Casual-Muster
(56 % Werbung / 40 % IAP / 7 % Abo).

**Umsatz pro Monat (Basis-Szenario):**

| DAU | Umsatz/Monat |
|---|---|
| 5.000 | 9.800 $ |
| 25.000 | 49.200 $ |
| 100.000 | 196.700 $ |
| 400.000 | 786.800 $ |

### 16.5 Der wichtigste strategische Befund

> **Der tragbare CPI liegt bei 0,21–1,32 $. Tier-1-CPIs liegen bei 1,50–3,00 $.
> Bezahlte Nutzerakquise im großen Stil funktioniert bei diesem
> Monetarisierungsmodell nicht.**

Das ist keine Panne, sondern die direkte Folge von Regel 6. Die Konsequenz ist
eine andere Wachstumsstrategie:

**1. Der Web-Build ist der Hauptkanal.**
0,83 MB laden in unter zwei Sekunden. Ein Link — kein Store, keine
Installation, kein Konto. Das ist ein CPI von null. Deshalb ist die
Engine-Entscheidung eine Marketing-Entscheidung.

**2. Organisches Kurzvideo.**
Survivor.ios Durchbruch war TikTok-getrieben. Wir bauen die clipbare Sekunde
absichtlich ein: der Moment bei ~5:00, in dem die Farbe zurückkehrt und der
Bildschirm kippt. Jeder Run erzeugt diesen Moment. Ein Ein-Tap-„Clip
speichern" nach der Extraktion nimmt die letzten 15 Sekunden auf.

**3. Steam-Premium als gleichrangiger Kanal — nicht als Nachgedanke.**

| Verkäufe | Netto (nach MwSt & Steam-Cut, 6,99 $) | Entspricht F2P-Monaten @25k DAU |
|---|---|---|
| 5.000 | 19.800 $ | 0,4 |
| 25.000 | 99.100 $ | 2,0 |
| 100.000 | 396.300 $ | 8,1 |
| 500.000 | 1.981.700 $ | 40,3 |

25.000 Steam-Verkäufe — für ein gut präsentiertes Survivors-like realistisch —
entsprechen zwei Monaten F2P-Umsatz bei 25.000 DAU, ohne einen Cent UA. Vampire
Survivors selbst ist ein Premium-Titel. Der Steam-Build ist derselbe Code ohne
Werbung und mit allen Helden freigeschaltet.

**4. Bezahlte UA erst später und selektiv.**
Nur wenn D30 nachweislich über 8 % liegt, und nur in Tier-2/3-Märkten mit
CPI unter 0,60 $.

---

## 17. Solo-PvE-Content & Roadmap

Alle nachgereichten Inhalte erweitern das persönliche PvE-Spiel. Es gibt keine
Ranglisten, Gildenaufgaben oder kooperativen Modi. Neue Territorien, Karten und
Wardens werden nach ihrer Veröffentlichung dauerhaft verfügbar; verpasste
Zeiträume erzeugen keine Lücken im Fortschritt.

### 17.1 Saison-Rhythmus: 4 Wochen

Jede Saison bringt:

- **Ein neues Territorium** (wird dauerhafter Bestandteil)
- **Ein Kartenset** (4–6 neue Karten, gültig für alle Helden)
- **Einen Warden** mit eigenem Muster
- **Eine Emberpass-Spur** mit Kosmetik
- **Eine Wochenend-Modifikation** (siehe unten)

### 17.2 Optionale Wochenend-Modifikationen

Bestehende Inhalte werden umgewidmet statt neu gebaut — die
kosteneffizienteste Content-Form. Jede Modifikation kann später im persönlichen
**Chronik-Archiv** erneut gespielt werden; nur der anfängliche Bonuszeitraum ist
begrenzt:

- **Aschensturm** — alle Territorien +2 Tier, ×2 Belohnung, 48 h
- **Ein Ödland** — nur ein zufälliger Held erlaubt, hohe Belohnung
- **Der lange Zug** — 30-Minuten-Runs, alle Slots doppelt
- **Glutfluss** — Hold produziert ×3, aber Runs geben kein Material
- **Blindzug** — Karten sind verdeckt, bis man wählt

### 17.3 Content-Fahrplan nach Launch

| Quartal | Inhalt |
|---|---|
| Q1 | Saisons 1–3 · Held 7 & 8 · Chronik-Archiv für abgeschlossene Herausforderungen |
| Q2 | **Sechstes Biom** (4 Territorien) · Runen-Aufwertung Stufe 2 · persönliche Warden-Prüfungen |
| Q3 | **Aufstiegspfade Stufe 2** (je 3 weitere pro Held) · Endlos-Modus mit persönlichen Rekorden |
| Q4 | **Expeditionen** — verzweigte Solo-Ketten aus drei Territorien mit einer gemeinsamen Build-Ökonomie · Saison 10 |

**Mehrspieler bleibt dauerhaft ausgeschlossen.** Zusätzliche Entwicklungszeit
fließt stattdessen in Heldenvielfalt, Bossmuster, Solo-Herausforderungen,
Barrierefreiheit und bessere Wiederspielbarkeit vorhandener Inhalte.

---

## 18. Entwicklungsplan & Scope

### Phase 0 — Prototyp · 6–8 Wochen · 1–2 Personen

**Nur eine Frage:** *Machen acht Minuten Kämpfen Spaß?*

Ein Held, ein Territorium, 15 Karten, keine Meta, keine Grafik (Platzhalter-
Formen). Keine Speicherung, kein Hold, kein Backend.

> **Implementierungsnotiz:** Nach einem positiven internen Kampftest enthält
> der Browserbuild gemäß D-010 einen bewusst isolierten Zwei-Gebäude-Hold zur
> Validierung des Rückkehrloops. Er hebt das externe Phase-0-Gate nicht auf und
> ist noch nicht der vollständige Phase-1-Vertical-Slice.

> **Abbruchkriterium:** Wenn zehn externe Testpersonen nicht freiwillig einen
> zweiten Run starten, wird das Projekt hier beendet. Nicht angepasst — beendet.

### Phase 1 — Vertical Slice · 3 Monate

**Frage:** *Erzeugt die Idle↔Run-Schleife den Wunsch zurückzukehren?*

2 Helden · 3 Territorien · Hold mit 4 Gebäuden · Ausrüstung + Zerlegung ·
Offline-Berechnung · lokaler Speicherstand · finale Art-Direction an einem Biom
bewiesen. Kein Konto und kein Backend erforderlich.

> **Messung:** 30 Testspieler über 14 Tage. Zielwert D7 ≥ 25 % in dieser
> kleinen, freundlichen Gruppe. Darunter → Schleife überdenken.

### Phase 2 — Soft Launch · 5–6 Monate

4 Helden · 12 Territorien · voller Hold · Runen · Ember-Baum · Aufstieg ·
Rewarded Ads · Remote Config · Analytik · optionaler Cloud-Save.

Start in 2–3 kleinen Märkten: **Philippinen, Polen, Kanada.**
**Mindestens 8 Wochen laufen lassen und iterieren.**

> Archeros Probleme entstanden nachweislich aus einem zu kurzen Soft Launch,
> in dem die Meta-Systeme nachträglich und ungetestet eingebaut wurden. Diese
> Phase wird nicht gekürzt.

**Freigabe für Phase 3 nur bei:** D1 ≥ 32 % · D7 ≥ 14 % · D30 ≥ 6 %

### Phase 3 — Globaler Launch · Monat 9–12

6 Helden · 20 Territorien · Emberpass · volle Monetarisierung ·
Web-Build als Marketing-Kanal · Steam-Premium gleichzeitig.

### Team

| Rolle | Auslastung |
|---|---|
| Gameplay-Entwicklung (Defold/Lua) | Vollzeit |
| Systeme & Plattformintegration (sim-core, Saves, Store-SDKs) | Vollzeit ab Phase 2 |
| Grafik (2D, Silhouetten, VFX, UI) | Vollzeit |
| Game Design & Balance | Vollzeit *(kann Ben sein)* |
| Audio | Auftrag, ~6 Wochen gesamt |
| QA | Teilzeit ab Phase 2 |

**Solo-Variante:** 18–24 Monate. Machbar, weil das Kunstkonzept bewusst
günstig ist und der Scope in Phasen abbrechbar ist. Empfehlung dann: Phase 0
und 1 solo, danach Grafik zukaufen.

---

## 19. Risiken & Gegenmaßnahmen

| Risiko | Schwere | Gegenmaßnahme |
|---|---|---|
| **Survivors-Genre ist übersättigt** | Hoch | Der Idle-Layer ist die Differenzierung, nicht der Kampf. Wir konkurrieren nicht mit Vampire Survivors, sondern mit einer Kombination, die es so nicht gibt. Das Kunstkonzept trennt uns visuell sofort ab. |
| **Zwei Spiele, die sich nicht verbinden** | Hoch | Die Zwei-Wege-Abhängigkeit (Kap. 4) ist keine Verzierung, sondern die Struktur. **Phase-1-Testfrage prüft genau das.** Wenn sie scheitert, wird nicht poliert, sondern umgebaut. |
| **LTV zu niedrig für bezahlte UA** | Hoch | Bekannt und eingepreist (Kap. 16.5). Wachstumsstrategie ist Web + organisch + Steam-Premium, nicht UA. |
| **Defold-Ökosystem zu klein** | Mittel | `sim-core` ist engine-unabhängig. Ein Client-Neuschrieb kostet ~3 Monate, nicht das Projekt. Ad-SDKs (AdMob) und IAP existieren als Defold-Erweiterungen — **vor Phase 1 verifizieren.** |
| **Mobile-Browser-Performance bricht ein** | Mittel | Entity-Budget mit 27 % Reserve; definierte Degradations-Reihenfolge. **Ab Phase 0 auf echten Geräten testen**, nicht im Desktop-Chrome. |
| **Idle-Layer trivialisiert das Kämpfen** | Mittel | Simuliert und ausbalanciert (Kap. 11.6): aktiv 60–70 %. Wird als CI-Regressionstest überwacht. |
| **Mid-Game-Wall wie bei Archero** | Mittel | Regel 2 (zwei Wege für jedes Material) + Regel 3 (kein toter Loot) schließen den Mechanismus strukturell aus. Wall-Detektor läuft in der CI. |
| **iOS-Store-Ablehnung** | Niedrig | Keine Lootboxen mit Echtgeld, klare Abo-Bedingungen, Kinderschutz-Konformität von Anfang an. |
| **Markenrecht am Namen** | Niedrig | „Emberhold" ist ein Arbeitstitel. **Vor Phase 2 durch eine Marken- und App-Store-Recherche prüfen lassen.** |

---

## 20. Was bewusst NICHT ins Spiel kommt

Diese Liste ist so wichtig wie das Feature-Set. Jede dieser Ideen wird
irgendwann jemand vorschlagen; die Antwort steht hier schon.

| Nicht enthalten | Begründung |
|---|---|
| **Energie-System** | Bestraft Spielen. Ersetzt durch den täglichen Soft-Cap. |
| **Verkaufbare Macht** | Regel 6. Der gesamte Retention-Ansatz hängt daran. |
| **Territorien-Verfall** | Erhöht kurzfristig Sessions, zerstört D30. Regel 7. |
| **Tägliche Login-Serien mit Verlust** | Bestraft Abwesenheit. Belohnungen sammeln sich stattdessen an. |
| **PvP** | Erzwingt Balance-Kompromisse im gesamten Build-System und macht Pay-to-Win-Vorwürfe unvermeidlich. |
| **Koop / Mehrspieler** | Netzwerk-Synchronisation, Gruppenbalance und Matchmaking erhöhen den Aufwand, ohne den Kernloop zu verbessern. |
| **Gilden & soziale Pflichten** | Das Spiel soll im eigenen Rhythmus funktionieren und keine Abhängigkeit von anderen Spielern erzeugen. |
| **Globale Bestenlisten** | Erzeugen Cheat-Abwehr, Serverkosten und Optimierungsdruck. Persönliche Rekorde reichen für Solo-Motivation. |
| **Onlinepflicht** | Der gesamte PvE-Fortschritt muss lokal spielbar bleiben. Cloud-Save und Live-Inhalte sind optional. |
| **Echtgeld-Lootboxen** | Regulatorisch riskant, rufschädigend, für dieses Design unnötig. |
| **Zeitlich exklusive Helden** | Erzeugt FOMO und dauerhafte Ungleichheit. Kosmetik darf exklusiv sein, Spielinhalt nicht. |
| **Bau-Timer mit Verkürzung gegen Geld** | Klassisches Mobile-Muster, das genau die Spieler vergrault, die dieses Spiel finden sollen. |
| **Automatischer Kampf / Auto-Battle-Knopf** | Der Kampf **ist** das Spiel. Wer nicht kämpfen will, hat den Idle-Layer — der ist bereits die Auto-Battle-Antwort. |
| **Mehr als sechs Helden zum Launch** | Sechs, die sich wirklich unterschiedlich spielen, schlagen zwölf mit Farbvarianten. |

---

## 21. Quellen

**Genre- & Design-Analyse**
- [Vampire Survivors Design Analysis — Power Fantasy (Kokutech)](https://www.kokutech.com/blog/gamedev/design-patterns/power-fantasy/vampire-survivors)
- [How Vampire Survivors Made Me Rethink the Core Gameplay Loop (Lost Attic Games)](https://www.lostatticgames.com/post/how-vampire-survivors-made-me-rethink-the-concept-of-the-core-gameplay-loop)
- [Why Archero Banked $25M But Leaves $25M Hanging (Deconstructor of Fun)](https://www.deconstructoroffun.com/blog/2019/8/9/why-archero-banked-25m-but-leaves-25m-hanging-hlx9n)
- [Archero 2's Early Levels Are Excellent (Mobile Game Report)](https://www.mobilegamereport.com/articles/archero-2-build-momentum-2026)
- [Metasystems Matter in Roguelite Games](https://jwittsf.design.blog/2020/04/06/metasystems-matter-in-roguelite-games/)
- [Idle Obelisk Miner — Master Guide & Review](https://idle-obelisk-miner.pages.dev/posts/idle-obelisk-miner/)

**Idle-Mathematik**
- [The Math of Idle Games, Part I (Kongregate / Game Developer)](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i)
- [The Math of Idle Games, Part III — Prestige (Game Developer)](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii)
- [Idle Game Design Principles (Eric Guan)](https://ericguan.substack.com/p/idle-game-design-principles)
- [Melvor Idle — Offline Progression](https://wiki.melvoridle.com/w/Offline_Progression)

**Monetarisierung & Marktdaten**
- [F2P Monetization Models 2026 (Game Growth Advisor)](https://gamegrowthadvisor.com/blog/2026-04-02-f2p-monetization-models-comparison-2026/)
- [Hybrid Monetization in Mobile Games — Practical Guide (CAS.ai)](https://cas.ai/blog/hybrid-monetization-in-mobile-games-a-practical-guide/)
- [D1/D7/D30 Retention Benchmarks 2026 (Playio)](https://blog.playio.co/d1-d7-d30-retention-benchmarks-2026)
- [How Survivor.io Continues to Pull in $5M a Month (Gamesforum)](https://www.gf.symphonyonline.co.uk/news/how-survivor.io-continues-to-pull-in-5-million-a-month-three-years-later)

**Technik**
- [Defold — Product Overview (Bundle-Größen, Plattformen)](https://defold.com/product/)
- [Godot vs Unity for Web Games 2026 (Cinevva)](https://app.cinevva.com/guides/godot-vs-unity-web-games)
- [Web Game Engines Compared 2026 (Cinevva)](https://app.cinevva.com/guides/web-game-engines-comparison)
- [Godot 4 Web Export Optimization Guide](https://best-games.io/blog/godot-web-export-optimization-guide)
- [Godot Forum — C# Web Export Status](https://forum.godotengine.org/t/is-there-an-update-on-exporting-c-projects-to-web/128821)

---

*Langfristige Ökonomieformeln in Kapitel 6, 7, 10 und 11 stammen aus dem
beiliegenden Workbook und sind noch nicht im Spiel validiert. Für den
Phase-0-Kampf gelten die Laufzeitwerte aus D-006; der integrierte Headless-Pfad
läuft über `npm test` als Regressionstest in der CI.*
