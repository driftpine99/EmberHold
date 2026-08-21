# Kampf-Asset-Prompts v2

Die Prototyp-Atlanten wurden mit
`docs/concepts/combat-look-concepts-v1.png` als reine Stil-, Material-,
Paletten- und Kamerareferenz erzeugt. Für Aelric gilt anschließend die
freigegebene moderne, gemalte Low-Res-Richtung. Die Generierung verlangte
jeweils echte Transparenz; da die
Ausgabe das Vorschau-Schachbrett dennoch als Pixel enthielt, entfernt
`tools/extract-atlas-alpha.cjs` dieses deterministisch und speichert RGBA-PNGs.

## Aelric

> Production-ready transparent 2D animation sheet for Aelric, Emberhold's lone
> Warden archer, in modern painterly low-resolution style. Exact 4×3 grid,
> facing screen-right in a consistent top-down three-quarter camera: row one
> four-frame idle loop, row two four-frame run loop with alternating contacts,
> row three ready/full-draw/release/recovery bow shot. Medium graphite armor,
> cool ash material rim, burnt-orange scarf and restrained amber rune bow.
> Identical identity, proportions, scale, foot anchor, camera and lighting in
> every cell; generous transparent padding; no ground, cast shadow, aura,
> checkerboard, labels, ghost frames, motion blur, scenery or watermark.

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
