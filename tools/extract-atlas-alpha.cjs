const fs = require('fs');
const path = require('path');

const [source, destination, moduleRoot] = process.argv.slice(2);
if (!source || !destination || !moduleRoot) {
  console.error('Usage: node extract-atlas-alpha.cjs <source> <destination> <node_modules>');
  process.exit(2);
}

const sharp = require(path.join(moduleRoot, 'sharp'));

function looksLikeChecker(data, offset) {
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min >= 226 && max - min <= 12;
}

function looksLikeEdgeHalo(data, offset) {
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min >= 154 && max - min <= 24;
}

async function main() {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const count = width * height;
  let clear = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0;
  let tail = 0;

  function enqueue(index) {
    if (!clear[index] && looksLikeChecker(data, index * channels)) {
      clear[index] = 1;
      queue[tail++] = index;
    }
  }

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    if (x > 0) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (index >= width) enqueue(index - width);
    if (index + width < count) enqueue(index + width);
  }

  // Closed bow strings, legs, or rune shapes can enclose checker pixels that
  // are not reachable from the outside. Exact near-neutral background pixels
  // are safe to remove globally; the looser halo rule below remains connected.
  for (let index = 0; index < count; index++) {
    if (looksLikeChecker(data, index * channels)) clear[index] = 1;
  }

  // Remove the neutral antialiasing fringe touching the connected background.
  for (let pass = 0; pass < 2; pass++) {
    const next = clear.slice();
    for (let index = 0; index < count; index++) {
      if (clear[index] || !looksLikeEdgeHalo(data, index * channels)) continue;
      const x = index % width;
      if ((x > 0 && clear[index - 1]) ||
          (x + 1 < width && clear[index + 1]) ||
          (index >= width && clear[index - width]) ||
          (index + width < count && clear[index + width])) {
        next[index] = 1;
      }
    }
    clear = next;
  }

  for (let index = 0; index < count; index++) {
    data[index * channels + 3] = clear[index] ? 0 : 255;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
  console.log(`${path.basename(destination)}: ${width}x${height}, ${tail} background pixels removed`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
