import type { ColourInfo } from '@/types';
import ColourCard from '@/components/ColourCard';

interface PaletteGridProps { title: string; description?: string; colours: ColourInfo[]; onSelect: (colour: ColourInfo) => void; favourites: string[]; onFavourite: (hex: string) => void; }
export default function PaletteGrid({ title, description, colours, onSelect, favourites, onFavourite }: PaletteGridProps) {
  return <section><div className="flex items-end justify-between gap-4 mb-6"><div><h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">{title}</h2>{description && <p className="text-sm text-neutral-500 mt-2">{description}</p>}</div><span className="text-xs text-neutral-400">{colours.length} colours</span></div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">{colours.map((colour) => <ColourCard key={`${colour.name}-${colour.hex}`} colour={colour} onSelect={onSelect} isFavourite={favourites.includes(colour.hex)} onFavourite={() => onFavourite(colour.hex)} />)}</div></section>;
}
