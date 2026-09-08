import { ArrowRight, Sparkles, Camera, Palette } from 'lucide-react';
import type { Page } from '@/types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-neutral-700" />
          <span className="text-sm font-medium text-neutral-700">AI-Powered Colour Analysis</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 mb-6 animate-fade-in-up delay-100">
          Discover the colours
          <br />
          that bring out your <span className="italic">best</span>.
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200 text-balance">
          Use your camera to explore colours recommended for your skin tone, undertone and personal colour profile.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <button
            onClick={() => onNavigate('camera')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium text-base hover:bg-neutral-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-neutral-900/10"
          >
            <Camera className="w-5 h-5" />
            Find My Colours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 px-8 py-4 glass text-neutral-700 rounded-full font-medium text-base hover:bg-white/80 transition-all duration-300 hover:scale-105"
          >
            <Palette className="w-5 h-5" />
            Explore Palettes
          </button>
        </div>

        {/* Visual demonstration */}
        <div className="mt-20 animate-fade-in-up delay-500">
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">Hand</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-8 h-px bg-neutral-300" />
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">AI Analysis</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-8 h-px bg-neutral-300" />
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-px">
                  <div className="bg-rose-400" />
                  <div className="bg-amber-400" />
                  <div className="bg-teal-500" />
                  <div className="bg-emerald-600" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">Colour Palette</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
