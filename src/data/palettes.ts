import type { ColourInfo, ColourSeason, DemoProfile } from '@/types';
import { makeColourInfo } from '@/utils/colour';

export const demoProfiles: DemoProfile[] = [
  {
    name: 'Warm Spring',
    skinTone: 'Light',
    undertone: 'Warm',
    season: 'Warm Spring',
    representativeColour: '#F5C5A0',
    confidence: 87,
  },
  {
    name: 'Cool Summer',
    skinTone: 'Light',
    undertone: 'Cool',
    season: 'Cool Summer',
    representativeColour: '#E8C4B8',
    confidence: 82,
  },
  {
    name: 'Warm Autumn',
    skinTone: 'Medium',
    undertone: 'Warm',
    season: 'Warm Autumn',
    representativeColour: '#C19A6B',
    confidence: 89,
  },
  {
    name: 'Cool Winter',
    skinTone: 'Deep',
    undertone: 'Cool',
    season: 'Cool Winter',
    representativeColour: '#8D5524',
    confidence: 85,
  },
];

const baseCombinations: Record<string, string[]> = {
  spring: ['Gold', 'Cream', 'Ivory', 'Light Grey'],
  summer: ['Silver', 'Soft Grey', 'White', 'Dusty Blue'],
  autumn: ['Gold', 'Brown', 'Cream', 'Olive'],
  winter: ['Silver', 'Black', 'White', 'Charcoal'],
};

const baseClothingTypes: Record<string, string[]> = {
  spring: ['Light dresses', 'Cotton tops', 'Spring scarves', 'Casual blouses'],
  summer: ['Flowy dresses', 'Linen shirts', 'Light blouses', 'Soft cardigans'],
  autumn: ['Knitted sweaters', 'Wool coats', 'Autumn dresses', 'Leather jackets'],
  winter: ['Formal wear', 'Structured coats', 'Silk blouses', 'Bold dresses'],
};

const baseJewellery: Record<string, string[]> = {
  spring: ['Gold', 'Rose Gold', 'Pearls'],
  summer: ['Silver', 'White Gold', 'Pearls'],
  autumn: ['Gold', 'Bronze', 'Copper'],
  winter: ['Silver', 'Platinum', 'White Gold'],
};

function buildColour(
  name: string,
  hex: string,
  seasonKey: string,
  category: ColourInfo['category'] = 'best'
): ColourInfo {
  return makeColourInfo(name, hex, category, {
    bestSeasons: [seasonKey],
    combinations: baseCombinations[seasonKey] ?? [],
    clothingTypes: baseClothingTypes[seasonKey] ?? [],
    jewelleryPairing: baseJewellery[seasonKey] ?? [],
  });
}

// Warm Spring palette
export const warmSpringColours: ColourInfo[] = [
  buildColour('Coral', '#FF7F50', 'spring'),
  buildColour('Peach', '#FFDAB9', 'spring'),
  buildColour('Warm Pink', '#FFB6C1', 'spring'),
  buildColour('Golden Yellow', '#FFD700', 'spring'),
  buildColour('Light Green', '#90EE90', 'spring'),
  buildColour('Salmon', '#FA8072', 'spring'),
  buildColour('Ivory', '#FFFFF0', 'spring', 'neutral'),
  buildColour('Warm Beige', '#F5F5DC', 'spring', 'neutral'),
  buildColour('Soft Camel', '#C19A6B', 'spring'),
  buildColour('Apricot', '#FBCEB1', 'spring'),
  buildColour('Turquoise', '#40E0D0', 'spring'),
  buildColour('Bright Aqua', '#00C4B4', 'spring'),
  buildColour('Lime Light', '#C0FF00', 'spring'),
  buildColour('Warm Red', '#E34234', 'spring', 'accent'),
  buildColour('Marigold', '#EAA221', 'spring'),
  buildColour('Periwinkle', '#CCCCFF', 'spring'),
  buildColour('Champagne', '#F7E7CE', 'spring', 'neutral'),
  buildColour('Tomato', '#FF6347', 'spring', 'accent'),
];

// Cool Summer palette
export const coolSummerColours: ColourInfo[] = [
  buildColour('Dusty Rose', '#DCAE96', 'summer'),
  buildColour('Lavender', '#B57EDC', 'summer'),
  buildColour('Powder Blue', '#B0E0E6', 'summer'),
  buildColour('Soft Grey', '#D3D3D3', 'summer', 'neutral'),
  buildColour('Mauve', '#E0B0FF', 'summer'),
  buildColour('Sage Green', '#9CAF88', 'summer'),
  buildColour('Soft Fuchsia', '#FF77FF', 'summer'),
  buildColour('Cool Taupe', '#8B8589', 'summer', 'neutral'),
  buildColour('Sky Blue', '#87CEEB', 'summer'),
  buildColour('Pale Lilac', '#DBDBFF', 'summer'),
  buildColour('Seafoam', '#71EEB8', 'summer'),
  buildColour('Soft Teal', '#7AC9C0', 'summer'),
  buildColour('Blue Grey', '#A0AEC0', 'summer', 'neutral'),
  buildColour('Raspberry', '#E30B5C', 'summer', 'accent'),
  buildColour('Plum', '#8E4585', 'summer'),
  buildColour('Cool Pink', '#FFB6C1', 'summer'),
  buildColour('Ice Blue', '#A5F2F3', 'summer'),
  buildColour('Wisteria', '#C9A0DC', 'summer'),
];

// Warm Autumn palette
export const warmAutumnColours: ColourInfo[] = [
  buildColour('Terracotta', '#C65D3B', 'autumn'),
  buildColour('Olive', '#708238', 'autumn'),
  buildColour('Mustard', '#D4A017', 'autumn'),
  buildColour('Rust', '#B7410E', 'autumn'),
  buildColour('Chocolate Brown', '#5C4033', 'autumn'),
  buildColour('Deep Teal', '#006D6F', 'autumn'),
  buildColour('Cream', '#FFFDD0', 'autumn', 'neutral'),
  buildColour('Burgundy', '#800020', 'autumn', 'accent'),
  buildColour('Warm Beige', '#F5F5DC', 'autumn', 'neutral'),
  buildColour('Deep Green', '#2E6320', 'autumn'),
  buildColour('Burnt Orange', '#CC5500', 'autumn'),
  buildColour('Camel', '#C19A6B', 'autumn'),
  buildColour('Pumpkin', '#FF7518', 'autumn'),
  buildColour('Bronze', '#CD7F32', 'autumn'),
  buildColour('Forest Green', '#228B22', 'autumn'),
  buildColour('Golden Brown', '#996515', 'autumn'),
  buildColour('Mahogany', '#C04000', 'autumn', 'accent'),
  buildColour('Sand', '#C2B280', 'autumn', 'neutral'),
];

// Cool Winter palette
export const coolWinterColours: ColourInfo[] = [
  buildColour('Emerald', '#50C878', 'winter'),
  buildColour('Royal Blue', '#4169E1', 'winter'),
  buildColour('Burgundy', '#800020', 'winter', 'accent'),
  buildColour('Black', '#000000', 'winter', 'neutral'),
  buildColour('Icy Pink', '#FFD1DC', 'winter'),
  buildColour('True Red', '#FF0000', 'winter', 'accent'),
  buildColour('Navy Blue', '#000080', 'winter'),
  buildColour('Pure White', '#FFFFFF', 'winter', 'neutral'),
  buildColour('Charcoal', '#36454F', 'winter', 'neutral'),
  buildColour('Sapphire', '#0F52BA', 'winter'),
  buildColour('Magenta', '#FF00FF', 'winter', 'accent'),
  buildColour('Icy Blue', '#D6F6FF', 'winter'),
  buildColour('Cool Grey', '#90A4AE', 'winter', 'neutral'),
  buildColour('Deep Purple', '#36013F', 'winter'),
  buildColour('Ruby', '#E0115F', 'winter', 'accent'),
  buildColour('Pine Green', '#01796F', 'winter'),
  buildColour('Frost', '#E5F2F6', 'winter', 'neutral'),
  buildColour('Cobalt', '#0047AB', 'winter'),
];

// Less recommended colours per season
export const lessRecommendedBySeason: Record<string, ColourInfo[]> = {
  spring: [
    buildColour('Black', '#000000', 'spring', 'less'),
    buildColour('Deep Burgundy', '#4A0E0E', 'spring', 'less'),
    buildColour('Charcoal Grey', '#36454F', 'spring', 'less'),
  ],
  summer: [
    buildColour('Bright Orange', '#FF5F00', 'summer', 'less'),
    buildColour('Golden Yellow', '#FFD700', 'summer', 'less'),
    buildColour('Black', '#000000', 'summer', 'less'),
  ],
  autumn: [
    buildColour('Icy Blue', '#D6F6FF', 'autumn', 'less'),
    buildColour('Hot Pink', '#FF69B4', 'autumn', 'less'),
    buildColour('Pure White', '#FFFFFF', 'autumn', 'less'),
  ],
  winter: [
    buildColour('Mustard', '#D4A017', 'winter', 'less'),
    buildColour('Peach', '#FFDAB9', 'winter', 'less'),
    buildColour('Warm Beige', '#F5F5DC', 'winter', 'less'),
  ],
};

export function getPaletteForSeason(season: ColourSeason): {
  best: ColourInfo[];
  neutrals: ColourInfo[];
  accents: ColourInfo[];
  less: ColourInfo[];
} {
  let all: ColourInfo[];
  let seasonKey: string;

  switch (season) {
    case 'Warm Spring':
      all = warmSpringColours;
      seasonKey = 'spring';
      break;
    case 'Cool Summer':
      all = coolSummerColours;
      seasonKey = 'summer';
      break;
    case 'Warm Autumn':
      all = warmAutumnColours;
      seasonKey = 'autumn';
      break;
    case 'Cool Winter':
      all = coolWinterColours;
      seasonKey = 'winter';
      break;
    case 'Neutral':
    default:
      // Blend autumn and summer for neutral
      all = [...warmAutumnColours.slice(0, 9), ...coolSummerColours.slice(0, 9)];
      seasonKey = 'autumn';
      break;
  }

  return {
    best: all.filter((c) => c.category === 'best'),
    neutrals: all.filter((c) => c.category === 'neutral'),
    accents: all.filter((c) => c.category === 'accent'),
    less: lessRecommendedBySeason[seasonKey] ?? [],
  };
}

// Explore palettes — standalone collections
export interface ExplorePalette {
  name: string;
  description: string;
  colours: { name: string; hex: string }[];
}

export const explorePalettes: ExplorePalette[] = [
  {
    name: 'Spring',
    description: 'Bright, warm and fresh colours.',
    colours: [
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Peach', hex: '#FFDAB9' },
      { name: 'Golden Yellow', hex: '#FFD700' },
      { name: 'Light Green', hex: '#90EE90' },
      { name: 'Salmon', hex: '#FA8072' },
      { name: 'Turquoise', hex: '#40E0D0' },
      { name: 'Warm Pink', hex: '#FFB6C1' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Apricot', hex: '#FBCEB1' },
      { name: 'Marigold', hex: '#EAA221' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Lime Light', hex: '#C0FF00' },
    ],
  },
  {
    name: 'Summer',
    description: 'Soft, cool and muted colours.',
    colours: [
      { name: 'Dusty Rose', hex: '#DCAE96' },
      { name: 'Lavender', hex: '#B57EDC' },
      { name: 'Powder Blue', hex: '#B0E0E6' },
      { name: 'Soft Grey', hex: '#D3D3D3' },
      { name: 'Mauve', hex: '#E0B0FF' },
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Pale Lilac', hex: '#DBDBFF' },
      { name: 'Seafoam', hex: '#71EEB8' },
      { name: 'Soft Teal', hex: '#7AC9C0' },
      { name: 'Blue Grey', hex: '#A0AEC0' },
      { name: 'Wisteria', hex: '#C9A0DC' },
    ],
  },
  {
    name: 'Autumn',
    description: 'Warm, earthy and rich colours.',
    colours: [
      { name: 'Terracotta', hex: '#C65D3B' },
      { name: 'Olive', hex: '#708238' },
      { name: 'Mustard', hex: '#D4A017' },
      { name: 'Rust', hex: '#B7410E' },
      { name: 'Chocolate Brown', hex: '#5C4033' },
      { name: 'Deep Teal', hex: '#006D6F' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Burnt Orange', hex: '#CC5500' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Forest Green', hex: '#228B22' },
      { name: 'Bronze', hex: '#CD7F32' },
      { name: 'Pumpkin', hex: '#FF7518' },
    ],
  },
  {
    name: 'Winter',
    description: 'Cool, deep and high-contrast colours.',
    colours: [
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Black', hex: '#000000' },
      { name: 'True Red', hex: '#FF0000' },
      { name: 'Navy Blue', hex: '#000080' },
      { name: 'Sapphire', hex: '#0F52BA' },
      { name: 'Magenta', hex: '#FF00FF' },
      { name: 'Icy Blue', hex: '#D6F6FF' },
      { name: 'Pine Green', hex: '#01796F' },
      { name: 'Cobalt', hex: '#0047AB' },
      { name: 'Ruby', hex: '#E0115F' },
    ],
  },
  {
    name: 'Warm',
    description: 'Golden, amber and sun-kissed tones.',
    colours: [
      { name: 'Golden Yellow', hex: '#FFD700' },
      { name: 'Amber', hex: '#FFBF00' },
      { name: 'Terracotta', hex: '#C65D3B' },
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Mustard', hex: '#D4A017' },
      { name: 'Rust', hex: '#B7410E' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Peach', hex: '#FFDAB9' },
      { name: 'Burnt Orange', hex: '#CC5500' },
      { name: 'Bronze', hex: '#CD7F32' },
      { name: 'Apricot', hex: '#FBCEB1' },
      { name: 'Honey', hex: '#EBB4A0' },
    ],
  },
  {
    name: 'Cool',
    description: 'Crisp blues, greens and icy tones.',
    colours: [
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Sapphire', hex: '#0F52BA' },
      { name: 'Powder Blue', hex: '#B0E0E6' },
      { name: 'Lavender', hex: '#B57EDC' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Icy Blue', hex: '#D6F6FF' },
      { name: 'Mauve', hex: '#E0B0FF' },
      { name: 'Navy Blue', hex: '#000080' },
      { name: 'Cool Grey', hex: '#90A4AE' },
      { name: 'Seafoam', hex: '#71EEB8' },
      { name: 'Pine Green', hex: '#01796F' },
      { name: 'Cobalt', hex: '#0047AB' },
    ],
  },
  {
    name: 'Neutral',
    description: 'A balanced blend of warm and cool.',
    colours: [
      { name: 'Soft Taupe', hex: '#B9A281' },
      { name: 'Dusty Rose', hex: '#DCAE96' },
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Soft Teal', hex: '#7AC9C0' },
      { name: 'Warm Beige', hex: '#F5F5DC' },
      { name: 'Cool Taupe', hex: '#8B8589' },
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Soft Grey', hex: '#D3D3D3' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Mauve', hex: '#E0B0FF' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Ivory', hex: '#FFFFF0' },
    ],
  },
  {
    name: 'Pastel',
    description: 'Soft, light and delicate hues.',
    colours: [
      { name: 'Peach', hex: '#FFDAB9' },
      { name: 'Powder Blue', hex: '#B0E0E6' },
      { name: 'Lavender', hex: '#B57EDC' },
      { name: 'Pale Pink', hex: '#FADADD' },
      { name: 'Mint Green', hex: '#98FF98' },
      { name: 'Pale Yellow', hex: '#FDFD96' },
      { name: 'Icy Pink', hex: '#FFD1DC' },
      { name: 'Pale Lilac', hex: '#DBDBFF' },
      { name: 'Seafoam', hex: '#71EEB8' },
      { name: 'Icy Blue', hex: '#D6F6FF' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Wisteria', hex: '#C9A0DC' },
    ],
  },
  {
    name: 'Earth Tones',
    description: 'Natural, grounded and organic colours.',
    colours: [
      { name: 'Terracotta', hex: '#C65D3B' },
      { name: 'Olive', hex: '#708238' },
      { name: 'Chocolate Brown', hex: '#5C4033' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Forest Green', hex: '#228B22' },
      { name: 'Rust', hex: '#B7410E' },
      { name: 'Deep Teal', hex: '#006D6F' },
      { name: 'Bronze', hex: '#CD7F32' },
      { name: 'Clay', hex: '#B66A50' },
      { name: 'Moss', hex: '#8A9A5B' },
      { name: 'Walnut', hex: '#5D432C' },
    ],
  },
  {
    name: 'Bold Colours',
    description: 'Vibrant, striking and confident hues.',
    colours: [
      { name: 'True Red', hex: '#FF0000' },
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Magenta', hex: '#FF00FF' },
      { name: 'Cobalt', hex: '#0047AB' },
      { name: 'Ruby', hex: '#E0115F' },
      { name: 'Sapphire', hex: '#0F52BA' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Hot Pink', hex: '#FF69B4' },
      { name: 'Tangerine', hex: '#F28500' },
      { name: 'Violet', hex: '#7F00FF' },
      { name: 'Crimson', hex: '#DC143C' },
    ],
  },
  {
    name: 'Minimal Neutrals',
    description: 'Understated, versatile and timeless.',
    colours: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Soft Grey', hex: '#D3D3D3' },
      { name: 'Cool Grey', hex: '#90A4AE' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Black', hex: '#000000' },
      { name: 'Warm Beige', hex: '#F5F5DC' },
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Navy Blue', hex: '#000080' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Cool Taupe', hex: '#8B8589' },
    ],
  },
];
