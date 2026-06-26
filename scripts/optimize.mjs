// Конвертирует все картинки в public/img в .webp (≤1400px, q78) и удаляет оригиналы.
import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const dir = new URL('../public/img/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const files = readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const f of files) {
  const src = join(dir, f);
  const out = join(dir, basename(f, extname(f)) + '.webp');
  const info = await sharp(src)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  unlinkSync(src);
  console.log(`${f} -> ${basename(out)}  ${Math.round(info.size / 1024)} KB`);
}
console.log('done');
