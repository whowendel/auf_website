// Usage: node scripts/sustainability-image.mjs "<input image>" <article-slug> <output-name>
// Writes public/assets/sustainability/<slug>/<name>.jpg (max 1600px wide) and prints the JSON image entry.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [input, slug, name] = process.argv.slice(2);
if (!input || !slug || !name) {
  console.error('Usage: node scripts/sustainability-image.mjs "<input>" <slug> <name>');
  process.exit(1);
}

const dir = path.join("public", "assets", "sustainability", slug);
fs.mkdirSync(dir, { recursive: true });

sharp(input)
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(dir, `${name}.jpg`))
  .then((r) => console.log(JSON.stringify({ file: name, w: r.width, h: r.height })));
