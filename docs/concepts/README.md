# Orbitblade-Konzeptbilder

Diese Bilder sind interne Designreferenzen. Sie sind keine fertigen
Produktionsassets und werden vom Spielcode nicht geladen.

## Verbindliche Kampf- und UI-Richtung v2

Datei: `orbitblade-combat-ui-direction-v2.png`

Der Besitzer hat am 25.08.2026 den dritten von drei neuen Entwürfen als
Zielrichtung ausgewählt. Verbindlich sind nicht die exakten Bilddetails,
sondern die folgenden Gestaltungsregeln:

- ein ruhiges, mittelhelles Orbitaldeck ohne sichtbar abgeschnittene
  Dekorationsränder;
- eine sehr kleine Rand-UI mit Gesundheit und Erfahrung oben links,
  `BOSS: AEGIS` oben mittig, Pause oben rechts und kompakten Waffensymbolen
  unten;
- klare weiß-goldene Spieler-, violette Boss- und cyanfarbene
  Angriffs-Silhouetten;
- eine große, sofort lesbare AEGIS-Figur mit geometrischen Warnflächen und
  freiem Kampfraum;
- gemalte 2D-Sci-Fantasy-Figuren mittlerer Detailstufe, die mit kleinen
  Animationsatlanten umsetzbar bleiben.

Die geringe Gegnerzahl im Konzeptbild ist **keine** Balancevorgabe für den
ersten Grafikpass. Gegnerdichte, Bossverstärkung und Waffenwerte werden in
einem späteren, getrennt messbaren Auftrag verändert.

### Finale Promptvorgabe

```text
Use case: ui-mockup
Asset type: shippable 16:9 desktop gameplay mockup for a lightweight 2D HTML Canvas bullet-heaven game
Project and visual identity: ORBITBLADE, an original solo sci-fantasy arena game. Use deep navy space, a medium-light blue-gray orbital battlefield, violet danger, cyan energy and white-gold player technology.
Primary request: Create visual direction C, “Tactical Sci-Fantasy”: a balanced middle ground between premium polish and affordable 2D implementation, with boss combat readability as the visual centerpiece. The screen must feel like an actual fun game, not a cinematic painting.
Scene/backdrop: an open rectangular orbital-deck combat zone whose playable floor reaches every screen edge, avoiding a cropped decorative circular rim. Broad calm metal panels, subtle geometric rings and a few cracks; distant space is visible only through two small broken peripheral gaps. The useful play area is not visually cut off.
Subject: a clearly animated-looking upright white-gold Orbit Carrier hero below center throwing a cyan energy blade; a large violet Aegis boss above center with two readable floating armor wings; 8 ordinary drones held mostly near the outer third of the field so the boss duel has breathing room.
Style/medium: stylized hand-painted 2D sci-fantasy game sprites, medium detail, clean strong silhouettes, selective comic-like edge highlights, modest texture, designed for 6-to-8-frame sprite animations; clearly more polished than basic pixel art but achievable without 3D rendering. No photorealism and no cinematic depth-of-field.
Boss encounter readability: show a true boss phase. A thin segmented violet projectile ring expands from the boss with one large safe wedge; two large red-orange floor lanes telegraph a coming cross attack; the boss armor wings glow as clear vulnerable targets. Keep the number of simultaneous effects low. Add a small white-gold objective arrow above the boss only if helpful.
Composition/framing: high top-down three-quarter camera, generous negative space around hero and boss, clear safe route, no enemy carpet, no important unit under the HUD.
Minimal UI: top-left a small portrait, one green health bar and one slim cyan experience bar only; top-center one clean boss bar with exact text “BOSS: AEGIS” plus two tiny phase markers; top-right one pause button; bottom-center five compact semi-transparent weapon tokens with cooldown arcs. The HUD uses less than 15 percent of the screen. No left-side stat text, no side panels, no minimap, no resource counters, no debug data, no redundant labels.
Lighting/mood: cool controlled deck lighting, strong cyan player trail, restrained violet boss glow and sparing warm gold accents. Calm enough to read, dramatic enough to invite another run.
Constraints: practical HTML Canvas layout, sprites must remain distinct at modest resolution, no cut-off decorative arena border, no characters cut off, no logos, no watermark, no franchise references, no extra text beyond “BOSS: AEGIS”, no dense swarm, no excessive bloom, no particle fog.
```

Die ursprünglichen beiden Entwürfe wurden mit dem eingebauten ImageGen-Werkzeug erzeugt. Die
Vorgaben wurden bewusst ohne vorhandene Orbitblade-Bilddateien als direkte
Eingaben formuliert; so prüfen sie die beschlossene Richtung, ohne alte
Kompositionen zu kopieren.

## Kampfansicht v1

Datei: `orbitblade-combat-direction-v1.png`

### Finale Promptvorgabe

```text
Use case: stylized-concept
Asset type: landscape game combat design mockup for a mobile/desktop solo action roguelite
Primary request: show the approved ORBITBLADE combat direction as an actual playable top-down scene, not cinematic key art
Scene/backdrop: a medium-light blue-gray asteroid platform and ancient orbital deck above a violet planet; subtle nebula and ring structures only beyond the playable floor
Subject: one readable human-sized orbit bearer near center in porcelain-white and warm-gold sci-fantasy armor with a navy undersuit; a curved cyan energy blade with a physical metallic core is visibly thrown through enemies, arcs briefly around a large priority target, and returns along a second luminous path
Enemies: several small but fully embodied corrupted machines in spaced clusters, each with distinct silhouettes and magenta, orange, or violet luminous cores; one unmistakable larger Aegis boss toward the upper area with a bright outline; no abstract circles or shadow placeholders
Style/medium: polished hand-painted 2D game concept, simplified low-resolution-friendly forms, crisp silhouettes, practical production design, cosmic sci-fantasy but wholly original
Composition/framing: 16:9 landscape, high three-quarter top-down gameplay camera, player and enemies large enough to read on a phone; calm open lanes between groups; show both outbound and returning blade trajectories without clutter
UI: extremely restrained game HUD integrated at edges: compact health and XP bars at upper left, one boss bar at upper center, small pause button at upper right, six compact icon slots along the lower edge; no long text columns
Lighting/mood: clear cool ambient light across the floor, white-gold hero is the brightest body, cyan blade is the main action accent, violet boss is secondary accent
Color palette: navy, violet, cyan, porcelain white, warm gold, restrained plasma orange
Constraints: no text, no title, no logo, no damage numbers, no watermark; no lightsaber, Jedi, Star Wars, Star Trek, phaser, or recognizable franchise design; no excessive enemy carpet; no clipped side panels or black safe-area bars; no photorealism; prioritize gameplay readability over spectacle
```

## Stationsansicht v1

Datei: `orbitblade-station-direction-v1.png`

### Finale Promptvorgabe

```text
Use case: stylized-concept
Asset type: landscape game meta-hub design mockup for a solo sci-fantasy roguelite
Primary request: show the approved ORBITBLADE orbital-station hub as a practical between-runs game screen, visually matching the combat concept
Scene/backdrop: a damaged but rebuilding orbital station floating above a cracked violet planet, with distant debris ring and restrained starfield
Subject: one coherent white-gold and navy station organized around a luminous cyan circular core; six clearly distinct connected modules are visible as parts of the same station: asteroid probe and drone dock near small mineable rocks, matter fabricator, flux laboratory with violet energy chamber, simulation deck, equipment bay and holographic star map; some modules are repaired and brightly powered, others visibly damaged and dark
Style/medium: polished hand-painted 2D game environment and UI concept, simplified low-resolution-friendly shapes, practical production design, original cosmic sci-fantasy
Composition/framing: 16:9 landscape, high three-quarter isometric view, station fills most of the frame; modules form an understandable ring around the core; a small white-gold orbit bearer stands on a central platform for scale; one unrepaired module is subtly highlighted as the next objective
UI: minimal unobtrusive interface around the edges, compact resource icons along the top, one highlighted objective card without readable text at lower left, a large clear launch control at lower right represented by an original shuttle/orbit symbol; avoid dense panels
Lighting/mood: hopeful reconstruction amid cosmic ruins; cool cyan power lines connect repaired modules, warm gold task lighting around inhabited areas, violet planet glow from below
Color palette: deep navy and violet in space, porcelain white and warm gold station structure, cyan technology, restrained orange work lights
Materials/textures: ceramic armor plating, brushed dark metal, worn gold trim, glass energy chambers, small repair scaffolds
Constraints: no text, no title, no logo, no watermark; no Star Wars, Star Trek, lightsaber, phaser, or recognizable franchise design; not a medieval castle; not a generic gray military station; no excessive menus; all six modules must read as parts of one manageable hub rather than a city-building game
```
