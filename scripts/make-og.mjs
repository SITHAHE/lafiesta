// Рендер OG-картинки (1200x630) из SVG в JPG через sharp.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, '..', 'public', 'og-image.jpg');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="68%" cy="22%" r="90%">
      <stop offset="0%" stop-color="#3d1466"/>
      <stop offset="45%" stop-color="#1b0e34"/>
      <stop offset="100%" stop-color="#080510"/>
    </radialGradient>
    <radialGradient id="ball" cx="38%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#e6c8f7"/>
      <stop offset="55%" stop-color="#9b3fd4"/>
      <stop offset="100%" stop-color="#2a0e47"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d16bf0" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#d16bf0" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="c"><circle cx="900" cy="315" r="175"/></clipPath>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="900" cy="315" r="300" fill="url(#halo)"/>
  <circle cx="900" cy="315" r="175" fill="url(#ball)"/>
  <g clip-path="url(#c)" stroke="rgba(8,5,16,0.4)" stroke-width="3">
    ${Array.from({ length: 13 }).map((_, i) => `<line x1="${725 + i * 25}" y1="140" x2="${725 + i * 25}" y2="490"/>`).join('')}
    ${Array.from({ length: 13 }).map((_, i) => `<line x1="725" y1="${165 + i * 25}" x2="1075" y2="${165 + i * 25}"/>`).join('')}
  </g>
  <ellipse cx="845" cy="260" rx="42" ry="26" fill="#ffffff" opacity="0.8"/>

  <text x="90" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="42" fill="#d16bf0" font-style="italic">La Fiesta</text>
  <text x="88" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="#ffffff">Студия красоты</text>
  <text x="88" y="425" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="#cf8ff0">и праздника</text>
  <text x="92" y="495" font-family="Arial, sans-serif" font-size="30" fill="#dcc0f4">Санкт-Петербург · м. Лесная · рейтинг 5,0</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out);
console.log('OG saved:', out);
