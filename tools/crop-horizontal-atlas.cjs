const path = require('path');

const [source, destination, moduleRoot, columnArg] = process.argv.slice(2);
const columns = Number(columnArg);
if (!source || !destination || !moduleRoot || !Number.isInteger(columns) || columns < 1) {
  console.error('Usage: node crop-horizontal-atlas.cjs <source> <destination> <node_modules> <columns>');
  process.exit(2);
}

const sharp = require(path.join(moduleRoot, 'sharp'));

async function main() {
  const image = sharp(source).ensureAlpha();
  const metadata = await image.metadata();
  const cell = Math.floor(metadata.width / columns);
  if (metadata.height < cell) {
    throw new Error(`Atlas is too short for ${columns} square cells: ${metadata.width}x${metadata.height}`);
  }
  const width = cell * columns;
  const left = Math.floor((metadata.width - width) / 2);
  const top = Math.floor((metadata.height - cell) / 2);
  await image
    .extract({ left, top, width, height: cell })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);
  console.log(`${path.basename(destination)}: ${width}x${cell}, ${columns} square cells`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
