import type { RGB, HSL, ColourInfo } from '@/types';

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  const hn = h / 360;
  const sn = s / 100;
  const ln = l / 100;
  let r: number, g: number, b: number;

  if (sn === 0) {
    r = g = b = ln;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hue2rgb(p, q, hn + 1 / 3);
    g = hue2rgb(p, q, hn);
    b = hue2rgb(p, q, hn - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

export function colourDistance(a: RGB, b: RGB): number {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function colourDistanceHsl(a: HSL, b: HSL): number {
  const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180;
  const ds = (a.s - b.s) / 100;
  const dl = (a.l - b.l) / 100;
  return Math.sqrt(dh * dh * 4 + ds * ds + dl * dl * 2);
}

export function getContrastColour(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1a1a' : '#ffffff';
}

export function isLightColour(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55;
}

export function warmCoolScore(rgb: RGB): number {
  const hsl = rgbToHsl(rgb);
  let score = 0;
  if (hsl.h >= 20 && hsl.h <= 50) score += 2;
  else if (hsl.h >= 200 && hsl.h <= 280) score -= 2;
  else if (hsl.h >= 50 && hsl.h <= 100) score += 1;
  else if (hsl.h >= 180 && hsl.h <= 200) score -= 1;
  if (hsl.s < 20) score *= 0.3;
  return score;
}

export function makeColourInfo(
  name: string,
  hex: string,
  category: ColourInfo['category'] = 'best',
  extras?: Partial<ColourInfo>
): ColourInfo {
  const rgb = hexToRgb(hex);
  return {
    name,
    hex,
    rgb,
    bestSeasons: extras?.bestSeasons ?? [],
    combinations: extras?.combinations ?? [],
    clothingTypes: extras?.clothingTypes ?? [],
    jewelleryPairing: extras?.jewelleryPairing ?? [],
    category,
  };
}
