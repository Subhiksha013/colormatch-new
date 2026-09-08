import { Check, Copy, Heart, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { ColourInfo } from '@/types';
import { getContrastColour } from '@/utils/colour';

interface ColourCardProps { colour: ColourInfo; onSelect?: (colour: ColourInfo) => void; isFavourite?: boolean; onFavourite?: () => void; compact?: boolean; }

export default function ColourCard({ colour, onSelect, isFavourite = false, onFavourite, compact = false }: ColourCardProps) {
  const [copied, setCopied] = useState(false);
  const copyHex = async () => { await navigator.clipboard?.writeText(colour.hex); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  return <div className={`group rounded-2xl overflow-hidden border border-neutral-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${compact ? '' : 'min-w-[180px]'}`}>
    <button className={`w-full ${compact ? 'h-24' : 'h-36'} relative`} style={{ backgroundColor: colour.hex }} onClick={() => onSelect?.(colour)} aria-label={`View ${colour.name}`}>
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      <MoreHorizontal className="absolute right-3 top-3 w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity" style={{ color: getContrastColour(colour.hex) }} />
    </button>
    <div className="p-4"><div className="flex items-start justify-between gap-2"><div><h4 className="font-semibold text-sm text-neutral-900">{colour.name}</h4><button onClick={copyHex} className="mt-1 flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied' : colour.hex.toUpperCase()}</button></div>{onFavourite && <button onClick={onFavourite} aria-label="Favourite colour" className="p-1"><Heart className={`w-4 h-4 transition-colors ${isFavourite ? 'fill-rose-500 text-rose-500' : 'text-neutral-300 hover:text-rose-400'}`} /></button>}</div>{!compact && <p className="mt-2 text-[11px] text-neutral-400">RGB {Math.round(colour.rgb.r)}, {Math.round(colour.rgb.g)}, {Math.round(colour.rgb.b)}</p>}</div>
  </div>;
}
