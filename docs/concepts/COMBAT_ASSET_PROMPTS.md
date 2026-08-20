# Kampf-Asset-Prompts v1

Die beiden Prototyp-Atlanten wurden mit
`docs/concepts/combat-look-concepts-v1.png` als reine Stil-, Material-,
Paletten- und Kamerareferenz erzeugt. Der rechte Warden-Arena-Entwurf bleibt
die Zielrichtung. Die Generierung verlangte jeweils echte Transparenz; da die
Ausgabe das Vorschau-Schachbrett dennoch als Pixel enthielt, entfernt
`tools/extract-atlas-alpha.cjs` dieses deterministisch und speichert RGBA-PNGs.

## Aelric

> Production game character sprite atlas: Aelric, Emberhold's lone Warden
> archer, as six consistent full-body top-down three-quarter gameplay sprites.
> Lean charcoal leather-and-light-plate ranger, ember-orange scarf and cloak,
> recurved amber-rune bow and practical quiver. Exact 3×2 grid: idle, left run,
> right run, fully drawn bow, release/recoil, forward dash. Same identity,
> scale, foot anchor, camera and lighting in every cell; faces upper right.
> Genuine transparent background; no floor, shadow, haze, boxes, labels,
> scenery, duplicate limbs or watermark; full character and bow inside cells.

## Gegner

> Production game enemy sprite atlas in polished hand-painted 2.5D
> dark-fantasy action-RPG style, exact 4×2 grid, top-down three-quarter camera,
> transparent background and one centered enemy per cell. Cell order:
> iron beetle-hound Schwärmer; crimson shard-hound Stürmer; violet masked void
> caster Speier; moss-green plated splitting brood-creature Teiler; gold and
> basalt Warden automaton Wahrer; large orange-red elite charger; red-black
> crystal-crowned Warden boss; same boss in radial-attack stance. Crisp small
> silhouettes, consistent materials and lighting; no floor, haze, dividers,
> text, scenery, extra creatures, gore or watermark.

Die achte Gegnerzelle bleibt im Build ungenutzt: Ihre integrierte Runengrafik
würde mit der besser lesbaren prozeduralen Boss-Telegraphie konkurrieren.
