/**
 * Slices the Sanivex brand assets into individually animatable pieces.
 *  - brand-icon-white.png      -> 4 wing tips + 1 circle head
 *  - sanivex-text-white.png    -> 7 letters (S A N I V E X)
 * Output: public/logos/loader/*.png + src/app/lab-3d/logo-geometry.json
 * Run: node scripts/slice-logo.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'logos', 'loader');
const GEO_OUT = path.join(ROOT, 'src', 'app', 'lab-3d', 'logo-geometry.json');
const ALPHA_MIN = 24;

fs.mkdirSync(OUT_DIR, { recursive: true });

async function load(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/** 8-connected component labelling over alpha > ALPHA_MIN */
function components({ data, w, h }) {
  const labels = new Int32Array(w * h).fill(-1);
  const comps = [];
  const stack = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (labels[i] !== -1 || data[i * 4 + 3] <= ALPHA_MIN) continue;
      const id = comps.length;
      const c = { id, minX: x, maxX: x, minY: y, maxY: y, area: 0, sumX: 0, sumY: 0 };
      stack.push(i);
      labels[i] = id;
      while (stack.length) {
        const cur = stack.pop();
        const cx = cur % w;
        const cy = (cur - cx) / w;
        c.area++;
        c.sumX += cx;
        c.sumY += cy;
        if (cx < c.minX) c.minX = cx;
        if (cx > c.maxX) c.maxX = cx;
        if (cy < c.minY) c.minY = cy;
        if (cy > c.maxY) c.maxY = cy;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            const ni = ny * w + nx;
            if (labels[ni] === -1 && data[ni * 4 + 3] > ALPHA_MIN) {
              labels[ni] = id;
              stack.push(ni);
            }
          }
        }
      }
      comps.push(c);
    }
  }
  return { labels, comps };
}

/** Writes a PNG containing only the pixels belonging to `ids`, trimmed to bbox (+pad) */
async function cutPiece({ data, w, h }, labels, ids, name, pad = 2) {
  const set = new Set(ids);
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let i = 0; i < w * h; i++) {
    if (set.has(labels[i])) {
      const x = i % w, y = (i - x) / w;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1, ch = maxY - minY + 1;
  const out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const si = (y + minY) * w + (x + minX);
      if (set.has(labels[si]) || (pad && labels[si] === -1 && data[si * 4 + 3] > 0 && neighbourInSet(labels, set, w, h, x + minX, y + minY, pad))) {
        const di = (y * cw + x) * 4;
        out[di] = data[si * 4];
        out[di + 1] = data[si * 4 + 1];
        out[di + 2] = data[si * 4 + 2];
        out[di + 3] = data[si * 4 + 3];
      }
    }
  }
  await sharp(out, { raw: { width: cw, height: ch, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, name));
  return { x: minX, y: minY, w: cw, h: ch };
}

function neighbourInSet(labels, set, w, h, x, y, r) {
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (set.has(labels[ny * w + nx])) return true;
    }
  }
  return false;
}

async function main() {
  const geometry = {};

  // ---------------- ICON ----------------
  const icon = await load(path.join(ROOT, 'public', 'logos', 'brand-icon-white.png'));
  const iconCC = components(icon);
  const big = iconCC.comps.filter((c) => c.area > 40).sort((a, b) => b.area - a.area);
  console.log('ICON components (area>40):');
  big.forEach((c) => console.log(' ', c.id, { x: c.minX, y: c.minY, w: c.maxX - c.minX + 1, h: c.maxY - c.minY + 1, area: c.area }));

  // global icon bbox
  let gMinX = icon.w, gMaxX = 0, gMinY = icon.h, gMaxY = 0;
  big.forEach((c) => {
    gMinX = Math.min(gMinX, c.minX); gMaxX = Math.max(gMaxX, c.maxX);
    gMinY = Math.min(gMinY, c.minY); gMaxY = Math.max(gMaxY, c.maxY);
  });
  const cx = (gMinX + gMaxX) / 2;
  const cy = (gMinY + gMaxY) / 2;

  // head = roundish component near top centre
  const head = big.find((c) => Math.abs((c.sumX / c.area) - cx) < 60 && (c.sumY / c.area) < cy - 100 && (c.maxX - c.minX) < 260);
  const wingComp = big.find((c) => c !== head);
  console.log('head:', head && head.id, 'wings component:', wingComp && wingComp.id);

  // The 4 tips are joined by a hairline at the centre: split them on the central axes.
  // Vertical gap between top and bottom tips sits at ~y=517 (rows 515-520 are empty).
  const splitX = cx;
  const splitY = 517.5;
  const QUAD_BASE = 100;
  const quadNames = ['tl', 'tr', 'bl', 'br'];
  for (let i = 0; i < icon.w * icon.h; i++) {
    if (iconCC.labels[i] === wingComp.id) {
      const x = i % icon.w, y = (i - x) / icon.w;
      const q = (y < splitY ? 0 : 2) + (x < splitX ? 0 : 1);
      iconCC.labels[i] = QUAD_BASE + q;
    }
  }

  geometry.icon = { source: { w: icon.w, h: icon.h }, bbox: { x: gMinX, y: gMinY, w: gMaxX - gMinX + 1, h: gMaxY - gMinY + 1 }, center: { x: cx, y: cy }, pieces: {} };
  if (head) geometry.icon.pieces.head = await cutPiece(icon, iconCC.labels, [head.id], 'head.png');
  for (let q = 0; q < 4; q++) {
    geometry.icon.pieces[quadNames[q]] = await cutPiece(icon, iconCC.labels, [QUAD_BASE + q], `wing-${quadNames[q]}.png`);
  }

  // ---------------- TEXT ----------------
  const text = await load(path.join(ROOT, 'public', 'logos', 'sanivex-text-white.png'));
  const textCC = components(text);
  const tcomps = textCC.comps.filter((c) => c.area > 4).sort((a, b) => a.minX - b.minX);
  // merge components that overlap/are closer than GAP px horizontally into one letter
  const GAP = 8;
  const groups = [];
  for (const c of tcomps) {
    const last = groups[groups.length - 1];
    if (last && c.minX <= last.maxX + GAP) {
      last.ids.push(c.id);
      last.maxX = Math.max(last.maxX, c.maxX);
    } else {
      groups.push({ ids: [c.id], minX: c.minX, maxX: c.maxX });
    }
  }
  console.log('TEXT groups:', groups.length, groups.map((g) => [g.minX, g.maxX]));
  const names = ['s', 'a', 'n', 'i', 'v', 'e', 'x'];
  geometry.text = { source: { w: text.w, h: text.h }, letters: {} };
  for (let i = 0; i < groups.length && i < names.length; i++) {
    geometry.text.letters[names[i]] = await cutPiece(text, textCC.labels, groups[i].ids, `letter-${names[i]}.png`, 0);
  }

  fs.writeFileSync(GEO_OUT, JSON.stringify(geometry, null, 2));
  console.log('\nGEOMETRY\n', JSON.stringify(geometry, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
