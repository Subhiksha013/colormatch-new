import type {
  AnalysisResult,
  ColourProfile,
  ColourSeason,
  FashionRecommendations,
  JewelleryRecommendation,
  MakeupRecommendations,
  MatchLevel,
  RGB,
  SkinTone,
  Undertone,
} from '@/types';
import { colourDistance, hexToRgb, makeColourInfo, rgbToHsl, warmCoolScore } from '@/utils/colour';
import {
  coolSummerColours,
  coolWinterColours,
  demoProfiles,
  getPaletteForSeason,
  warmAutumnColours,
  warmSpringColours,
} from '@/data/palettes';

export function classifySkinTone(rgb: RGB): SkinTone {
  const hsl = rgbToHsl(rgb);
  const lightness = hsl.l;

  if (lightness >= 80) return 'Very Light';
  if (lightness >= 65) return 'Light';
  if (lightness >= 50) return 'Medium';
  if (lightness >= 35) return 'Tan';
  return 'Deep';
}

export function classifyUndertone(rgb: RGB): Undertone {
  const score = warmCoolScore(rgb);
  if (score > 0.5) return 'Warm';
  if (score < -0.5) return 'Cool';
  return 'Neutral';
}

export function determineSeason(skinTone: SkinTone, undertone: Undertone): ColourSeason {
  if (undertone === 'Neutral') return 'Neutral';

  if (undertone === 'Warm') {
    if (skinTone === 'Very Light' || skinTone === 'Light') return 'Warm Spring';
    return 'Warm Autumn';
  }

  // Cool
  if (skinTone === 'Very Light' || skinTone === 'Light') return 'Cool Summer';
  return 'Cool Winter';
}

export function calculateConfidence(rgb: RGB): number {
  const hsl = rgbToHsl(rgb);
  let confidence = 75;
  if (hsl.s > 15 && hsl.s < 60) confidence += 8;
  if (hsl.l > 20 && hsl.l < 85) confidence += 7;
  const variance = Math.abs(rgb.r - rgb.g) + Math.abs(rgb.g - rgb.b) + Math.abs(rgb.r - rgb.b);
  if (variance > 20 && variance < 120) confidence += 5;
  return Math.min(confidence, 95);
}

export function getAverageColour(data: Uint8ClampedArray): RGB {
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 128) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return { r: 200, g: 180, b: 160 };
  return { r: r / count, g: g / count, b: b / count };
}

// Skin detection heuristic: pixels that look like skin
export function isSkinPixel(r: number, g: number, b: number): boolean {
  // Standard skin detection rules
  const rNorm = r / 255;
  const gNorm = g / 255;

  // Rule 1: R > G > B
  const rule1 = r > g && g > b;
  // Rule 2: R channel dominance
  const rule2 = r > 95 && g > 40 && b > 20;
  // Rule 3: max - min spread
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const rule3 = max - min > 15;
  // Rule 4: R - G difference
  const rule4 = Math.abs(r - g) > 15;
  // Rule 5: Not too saturated (not red objects)
  const rule5 = rNorm - gNorm < 0.4;

  return rule1 && rule2 && rule3 && rule4 && rule5;
}

export function extractSkinRegion(
  imageData: ImageData
): { avgColour: RGB; skinPixels: number; totalPixels: number } {
  const data = imageData.data;
  let r = 0, g = 0, b = 0, skinCount = 0;
  const totalPixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];
    const pa = data[i + 3];
    if (pa < 128) continue;
    if (isSkinPixel(pr, pg, pb)) {
      r += pr;
      g += pg;
      b += pb;
      skinCount++;
    }
  }

  if (skinCount === 0) {
    return {
      avgColour: getAverageColour(data),
      skinPixels: 0,
      totalPixels,
    };
  }

  return {
    avgColour: { r: r / skinCount, g: g / skinCount, b: b / skinCount },
    skinPixels: skinCount,
    totalPixels,
  };
}

export function checkImageQuality(imageData: ImageData): {
  tooDark: boolean;
  tooBright: boolean;
  ok: boolean;
} {
  const data = imageData.data;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
    count++;
  }
  const avg = sum / count;
  return {
    tooDark: avg < 40,
    tooBright: avg > 240,
    ok: avg >= 40 && avg <= 240,
  };
}

export function getDominantColour(imageData: ImageData): RGB {
  // Simple quantized histogram for dominant colour
  const data = imageData.data;
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue;
    // Skip near-white and near-black backgrounds
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max > 245 && min > 245) continue;
    if (max < 15) continue;

    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.count++;
      existing.r += r;
      existing.g += g;
      existing.b += b;
    } else {
      buckets.set(key, { count: 1, r, g, b });
    }
  }

  let best: { count: number; r: number; g: number; b: number } | null = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.count > best.count) best = bucket;
  }

  if (!best) return { r: 128, g: 128, b: 128 };
  return { r: best.r / best.count, g: best.g / best.count, b: best.b / best.count };
}

export function nearestColourName(rgb: RGB): string {
  const allColours = [
    ...warmSpringColours,
    ...coolSummerColours,
    ...warmAutumnColours,
    ...coolWinterColours,
  ];
  let closest = allColours[0];
  let minDist = Infinity;
  for (const c of allColours) {
    const dist = colourDistance(rgb, c.rgb);
    if (dist < minDist) {
      minDist = dist;
      closest = c;
    }
  }
  return closest.name;
}

export function generateStyleGuide(profile: ColourProfile): string {
  const { undertone, season } = profile;
  const seasonLower = season.toLowerCase();

  if (undertone === 'Warm' && seasonLower.includes('spring')) {
    return 'Your warm undertone shines with bright, fresh colours. Try coral, peach, golden yellow and light green for clothing, and pair them with gold or rose gold accessories for a radiant spring look.';
  }
  if (undertone === 'Warm' && seasonLower.includes('autumn')) {
    return 'Your warm undertone works beautifully with earthy and rich colours. Try olive, terracotta, mustard and chocolate brown for clothing, and pair them with warm metallic accessories like gold and bronze.';
  }
  if (undertone === 'Cool' && seasonLower.includes('summer')) {
    return 'Your cool undertone is complemented by soft, muted colours. Try dusty rose, lavender, powder blue and soft grey for clothing, and pair them with silver or white gold accessories for an elegant summer look.';
  }
  if (undertone === 'Cool' && seasonLower.includes('winter')) {
    return 'Your cool undertone is stunning in deep, high-contrast colours. Try emerald, royal blue, burgundy and true red for clothing, and pair them with silver or platinum accessories for a striking winter look.';
  }
  return 'Your neutral undertone gives you the flexibility to wear both warm and cool colours. Try mixing soft teals, dusty rose, sage green and warm beige for a versatile and balanced look.';
}

export function generateJewelleryRecommendations(undertone: Undertone): JewelleryRecommendation[] {
  if (undertone === 'Warm') {
    return [
      { metal: 'Gold', hex: '#FFD700', match: 'Excellent Match', description: 'Gold beautifully enhances your warm undertone.' },
      { metal: 'Rose Gold', hex: '#B76E79', match: 'ExcellentMatch' as MatchLevel, description: 'Rose gold complements your warm golden tones.' },
      { metal: 'Silver', hex: '#C0C0C0', match: 'Good Match', description: 'Silver can work but may appear slightly cool against your skin.' },
      { metal: 'Mixed Metal', hex: '#B8A990', match: 'Good Match', description: 'Mixing gold and silver gives you flexibility.' },
    ];
  }
  if (undertone === 'Cool') {
    return [
      { metal: 'Silver', hex: '#C0C0C0', match: 'Excellent Match', description: 'Silver perfectly complements your cool undertone.' },
      { metal: 'White Gold', hex: '#E8E8E8', match: 'Excellent Match', description: 'White gold enhances your cool tones beautifully.' },
      { metal: 'Gold', hex: '#FFD700', match: 'Moderate Match', description: 'Gold can work but may feel warm against your skin.' },
      { metal: 'Mixed Metal', hex: '#B8A990', match: 'Good Match', description: 'Mixing metals gives you versatile styling options.' },
    ];
  }
  return [
    { metal: 'Mixed Metal', hex: '#B8A990', match: 'Excellent Match', description: 'Your neutral undertone suits both warm and cool metals.' },
    { metal: 'Gold', hex: '#FFD700', match: 'Good Match', description: 'Gold works well with your balanced undertone.' },
    { metal: 'Silver', hex: '#C0C0C0', match: 'Good Match', description: 'Silver also complements your neutral tone.' },
    { metal: 'Rose Gold', hex: '#B76E79', match: 'Good Match', description: 'Rose gold adds warmth without overwhelming.' },
  ];
}

export function generateMakeupRecommendations(season: ColourSeason): MakeupRecommendations {
  const seasonLower = season.toLowerCase();

  if (seasonLower.includes('spring')) {
    return {
      lipColours: [
        makeColourInfo('Coral Pink', '#FF6F61'),
        makeColourInfo('Warm Peach', '#FFCBA4'),
        makeColourInfo('Rose', '#FF7F50'),
        makeColourInfo('Tomato Red', '#E34234'),
      ],
      blush: [
        makeColourInfo('Peach Blush', '#FFDAB9'),
        makeColourInfo('Coral Blush', '#E9967A'),
        makeColourInfo('Warm Rose', '#FFB6C1'),
      ],
      eyeshadow: [
        makeColourInfo('Champagne', '#F7E7CE'),
        makeColourInfo('Gold', '#FFD700'),
        makeColourInfo('Bronze', '#CD7F32'),
        makeColourInfo('Soft Green', '#90EE90'),
      ],
      nailColours: [
        makeColourInfo('Coral', '#FF7F50'),
        makeColourInfo('Peach', '#FFDAB9'),
        makeColourInfo('Salmon', '#FA8072'),
        makeColourInfo('Marigold', '#EAA221'),
      ],
    };
  }
  if (seasonLower.includes('summer')) {
    return {
      lipColours: [
        makeColourInfo('Dusty Rose', '#DCAE96'),
        makeColourInfo('Soft Mauve', '#E0B0FF'),
        makeColourInfo('Cool Pink', '#FFB6C1'),
        makeColourInfo('Berry', '#8E4585'),
      ],
      blush: [
        makeColourInfo('Soft Rose', '#DCAE96'),
        makeColourInfo('Lavender Blush', '#FDF0F5'),
        makeColourInfo('Cool Pink', '#FFB6C1'),
      ],
      eyeshadow: [
        makeColourInfo('Lavender', '#B57EDC'),
        makeColourInfo('Powder Blue', '#B0E0E6'),
        makeColourInfo('Soft Grey', '#D3D3D3'),
        makeColourInfo('Mauve', '#E0B0FF'),
      ],
      nailColours: [
        makeColourInfo('Dusty Rose', '#DCAE96'),
        makeColourInfo('Lavender', '#B57EDC'),
        makeColourInfo('Sky Blue', '#87CEEB'),
        makeColourInfo('Mauve', '#E0B0FF'),
      ],
    };
  }
  if (seasonLower.includes('autumn')) {
    return {
      lipColours: [
        makeColourInfo('Terracotta', '#C65D3B'),
        makeColourInfo('Warm Brick', '#A0522D'),
        makeColourInfo('Rust', '#B7410E'),
        makeColourInfo('Spicy Brown', '#8B4513'),
      ],
      blush: [
        makeColourInfo('Warm Terracotta', '#C65D3B'),
        makeColourInfo('Apricot', '#FBCEB1'),
        makeColourInfo('Bronze Blush', '#CD7F32'),
      ],
      eyeshadow: [
        makeColourInfo('Bronze', '#CD7F32'),
        makeColourInfo('Olive', '#708238'),
        makeColourInfo('Chocolate', '#5C4033'),
        makeColourInfo('Gold', '#FFD700'),
      ],
      nailColours: [
        makeColourInfo('Terracotta', '#C65D3B'),
        makeColourInfo('Mustard', '#D4A017'),
        makeColourInfo('Burgundy', '#800020'),
        makeColourInfo('Chocolate', '#5C4033'),
      ],
    };
  }
  // Winter
  return {
    lipColours: [
      makeColourInfo('True Red', '#FF0000'),
      makeColourInfo('Burgundy', '#800020'),
      makeColourInfo('Ruby', '#E0115F'),
      makeColourInfo('Magenta', '#FF00FF'),
    ],
    blush: [
      makeColourInfo('Cool Rose', '#FFB6C1'),
      makeColourInfo('Icy Pink', '#FFD1DC'),
      makeColourInfo('Plum', '#8E4585'),
    ],
    eyeshadow: [
      makeColourInfo('Sapphire', '#0F52BA'),
      makeColourInfo('Silver', '#C0C0C0'),
      makeColourInfo('Deep Purple', '#36013F'),
      makeColourInfo('Icy Blue', '#D6F6FF'),
    ],
    nailColours: [
      makeColourInfo('True Red', '#FF0000'),
      makeColourInfo('Burgundy', '#800020'),
      makeColourInfo('Navy', '#000080'),
      makeColourInfo('Icy Pink', '#FFD1DC'),
    ],
  };
}

export function generateFashionRecommendations(season: ColourSeason): FashionRecommendations {
  const palette = getPaletteForSeason(season);
  const all = [...palette.best, ...palette.accents];

  return {
    dresses: all.slice(0, 6),
    sarees: all.slice(2, 8),
    blouses: [...palette.neutrals.slice(0, 3), ...all.slice(0, 3)],
    shirtsTops: all.slice(4, 10),
    accessories: [...all.slice(0, 4), ...palette.neutrals.slice(0, 2)],
  };
}

export function buildAnalysisResult(profile: ColourProfile): AnalysisResult {
  const palette = getPaletteForSeason(profile.season);
  return {
    profile,
    bestColours: palette.best,
    neutralColours: palette.neutrals,
    accentColours: palette.accents,
    lessRecommendedColours: palette.less,
    styleGuide: generateStyleGuide(profile),
    jewelleryRecommendations: generateJewelleryRecommendations(profile.undertone),
    makeupRecommendations: generateMakeupRecommendations(profile.season),
    fashionRecommendations: generateFashionRecommendations(profile.season),
  };
}

export function analyseFromImage(imageData: ImageData): {
  result: AnalysisResult | null;
  error: string | null;
} {
  const quality = checkImageQuality(imageData);
  if (quality.tooDark) {
    return { result: null, error: 'The image appears too dark. Try moving into natural light and recapture.' };
  }
  if (quality.tooBright) {
    return { result: null, error: 'The image appears too bright. Avoid direct harsh light and try again.' };
  }

  const { avgColour, skinPixels, totalPixels } = extractSkinRegion(imageData);
  const skinRatio = skinPixels / totalPixels;

  if (skinPixels === 0 || skinRatio < 0.02) {
    return {
      result: null,
      error: "We couldn't clearly detect your hand. Try moving into natural light and placing your hand inside the guide.",
    };
  }

  const skinTone = classifySkinTone(avgColour);
  const undertone = classifyUndertone(avgColour);
  const season = determineSeason(skinTone, undertone);
  const confidence = calculateConfidence(avgColour);
  const hex = `#${Math.round(avgColour.r).toString(16).padStart(2, '0')}${Math.round(avgColour.g).toString(16).padStart(2, '0')}${Math.round(avgColour.b).toString(16).padStart(2, '0')}`;

  const profile: ColourProfile = {
    skinTone,
    undertone,
    season,
    confidence,
    representativeColour: hex,
  };

  return { result: buildAnalysisResult(profile), error: null };
}

export function getDemoResult(profileIndex?: number): AnalysisResult {
  const index = profileIndex ?? Math.floor(Math.random() * demoProfiles.length);
  const demo = demoProfiles[index];
  const profile: ColourProfile = {
    skinTone: demo.skinTone,
    undertone: demo.undertone,
    season: demo.season,
    confidence: demo.confidence,
    representativeColour: demo.representativeColour,
  };
  return buildAnalysisResult(profile);
}

export function compareColourWithProfile(
  targetHex: string,
  result: AnalysisResult
): { match: MatchLevel; distance: number } {
  const targetRgb = hexToRgb(targetHex);
  const allRecommended = [...result.bestColours, ...result.accentColours, ...result.neutralColours];
  const lessRecommended = result.lessRecommendedColours;

  let minDist = Infinity;
  for (const c of allRecommended) {
    const d = colourDistance(targetRgb, c.rgb);
    if (d < minDist) minDist = d;
  }

  for (const c of lessRecommended) {
    const d = colourDistance(targetRgb, c.rgb);
    if (d < minDist) minDist = d;
  }

  if (minDist < 30) return { match: 'Excellent Match', distance: minDist };
  if (minDist < 60) return { match: 'Good Match', distance: minDist };
  if (minDist < 100) return { match: 'Moderate Match', distance: minDist };
  return { match: 'Less Recommended', distance: minDist };
}

export function getMatchColour(match: MatchLevel): string {
  switch (match) {
    case 'Excellent Match': return '#22c55e';
    case 'Good Match': return '#eab308';
    case 'Moderate Match': return '#f97316';
    case 'Less Recommended': return '#ef4444';
  }
}
