import { Palette, Heart } from 'lucide-react';
import type { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <Palette className="w-4 h-4 text-neutral-900" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                ColorMatch AI
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Discover the colours that bring out your best through AI-powered personal colour analysis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('camera')} className="hover:text-white transition-colors">Find My Colours</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">Explore Palettes</button></li>
              <li><button onClick={() => onNavigate('guide')} className="hover:text-white transition-colors">Colour Guide</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>AI Colour Analysis</li>
              <li>Personal Colour Palette</li>
              <li>Dress Colour Matching</li>
              <li>Jewellery & Makeup Guide</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">What is ColorMatch AI?</button></li>
              <li>Privacy & Data</li>
              <li>Important Notes</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            Results are approximate and for fashion guidance only. Not medical or dermatological advice.
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 fill-current text-neutral-400" /> for colour enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}
