export type SkinTone = 'Very Light' | 'Light' | 'Medium' | 'Tan' | 'Deep';

export type Undertone = 'Warm' | 'Cool' | 'Neutral';

export type ColourSeason =
  | 'Warm Spring'
  | 'Cool Summer'
  | 'Warm Autumn'
  | 'Cool Winter'
  | 'Neutral';

export type MatchLevel = 'Excellent Match' | 'Good Match' | 'Moderate Match' | 'Less Recommended';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColourInfo {
  name: string;
  hex: string;
  rgb: RGB;
  bestSeasons: string[];
  combinations: string[];
  clothingTypes: string[];
  jewelleryPairing: string[];
  category: 'best' | 'neutral' | 'accent' | 'less';
}

export interface ColourProfile {
  skinTone: SkinTone;
  undertone: Undertone;
  season: ColourSeason;
  confidence: number;
  representativeColour: string;
}

export interface AnalysisResult {
  profile: ColourProfile;
  bestColours: ColourInfo[];
  neutralColours: ColourInfo[];
  accentColours: ColourInfo[];
  lessRecommendedColours: ColourInfo[];
  styleGuide: string;
  jewelleryRecommendations: JewelleryRecommendation[];
  makeupRecommendations: MakeupRecommendations;
  fashionRecommendations: FashionRecommendations;
}

export interface JewelleryRecommendation {
  metal: string;
  hex: string;
  match: MatchLevel;
  description: string;
}

export interface MakeupCategory {
  category: string;
  colours: ColourInfo[];
}

export interface MakeupRecommendations {
  lipColours: ColourInfo[];
  blush: ColourInfo[];
  eyeshadow: ColourInfo[];
  nailColours: ColourInfo[];
}

export interface FashionCategory {
  category: string;
  colours: ColourInfo[];
}

export interface FashionRecommendations {
  dresses: ColourInfo[];
  sarees: ColourInfo[];
  blouses: ColourInfo[];
  shirtsTops: ColourInfo[];
  accessories: ColourInfo[];
}

export type Page = 'home' | 'camera' | 'results' | 'explore' | 'guide' | 'about';

export interface DemoProfile {
  name: string;
  skinTone: SkinTone;
  undertone: Undertone;
  season: ColourSeason;
  representativeColour: string;
  confidence: number;
}
