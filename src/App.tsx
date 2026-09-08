import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FeatureCards from '@/components/FeatureCards';
import CameraAnalyzer from '@/components/CameraAnalyzer';
import AnalysisLoader from '@/components/AnalysisLoader';
import ColourProfile from '@/components/ColourProfile';
import PaletteGrid from '@/components/PaletteGrid';
import ExplorePalettes from '@/components/ExplorePalettes';
import { AboutPage, GuidePage } from '@/components/AboutGuide';
import { ColourComparison, DressAnalyzer, ColourDetail } from '@/components/ColourTools';
import { RecommendationSections, ShareSave, StyleGuide } from '@/components/StyleSections';
import type { AnalysisResult, ColourInfo, Page } from '@/types';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [detail, setDetail] = useState<ColourInfo | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => { const saved = localStorage.getItem('colormatch-profile'); if (saved) { try { const parsed = JSON.parse(saved) as { result?: AnalysisResult; favourites?: string[] }; if (parsed.result) setResult(parsed.result); if (parsed.favourites) setFavourites(parsed.favourites); } catch { /* ignore invalid local data */ } } }, []);
  const navigate = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const startAnalysis = (analysis: AnalysisResult) => { setLoadingStep(0); let step = 0; const interval = window.setInterval(() => { step += 1; setLoadingStep(step); if (step >= 4) { window.clearInterval(interval); window.setTimeout(() => { setResult(analysis); setLoadingStep(null); navigate('results'); }, 400); } }, 550); };
  const toggleFavourite = (hex: string) => setFavourites(current => current.includes(hex) ? current.filter(item => item !== hex) : [...current, hex]);
  const allColours = useMemo(() => result ? [...result.bestColours, ...result.neutralColours, ...result.accentColours] : [], [result]);

  const home = <><Hero onNavigate={navigate} /><HowItWorks /><FeatureCards /><section className="py-20 px-4 bg-white"><div className="max-w-4xl mx-auto rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 text-center"><p className="text-xs uppercase tracking-widest text-white/50 mb-4">Your colours are waiting</p><h2 className="font-display text-4xl sm:text-5xl font-bold">Ready to find your palette?</h2><p className="text-white/60 max-w-lg mx-auto mt-4">A few seconds with your camera can unlock a whole new way to think about your wardrobe.</p><button onClick={() => navigate('camera')} className="mt-8 px-7 py-3.5 rounded-full bg-white text-neutral-900 font-medium hover:bg-neutral-100 transition-colors">Find My Colours</button></div></section></>;
  const results = result && <div className="min-h-screen bg-neutral-50 pt-28 pb-20 px-4"><div className="max-w-7xl mx-auto"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10"><div><p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Your analysis is complete</p><h1 className="font-display text-4xl sm:text-5xl font-bold">Your Personal Colour Palette</h1><p className="text-neutral-500 mt-3">A considered starting point for your everyday style.</p></div><button onClick={() => navigate('camera')} className="text-sm font-medium px-4 py-2.5 rounded-xl border border-neutral-200 bg-white">Analyse again</button></div><div className="space-y-10"><ColourProfile profile={result.profile} /><StyleGuide result={result} /><ShareSave result={result} favourites={favourites} /><PaletteGrid title="Your Best Colours" description="The shades most likely to harmonise with your natural colouring." colours={result.bestColours} onSelect={setDetail} favourites={favourites} onFavourite={toggleFavourite} /><PaletteGrid title="Your Neutrals" description="Everyday foundations that make getting dressed effortless." colours={result.neutralColours} onSelect={setDetail} favourites={favourites} onFavourite={toggleFavourite} /><PaletteGrid title="Your Accent Colours" description="Stronger shades for dresses, accessories and memorable moments." colours={result.accentColours} onSelect={setDetail} favourites={favourites} onFavourite={toggleFavourite} /><PaletteGrid title="Colours to Use Less" description="Less recommended for your current palette — but personal style has no strict rules." colours={result.lessRecommendedColours} onSelect={setDetail} favourites={favourites} onFavourite={toggleFavourite} /><ColourComparison result={result} colours={allColours} onSelect={setDetail} /><DressAnalyzer result={result} onSelect={setDetail} /><RecommendationSections result={result} onSelect={setDetail} /></div></div>{detail && <ColourDetail colour={detail} onClose={() => setDetail(null)} />}</div>;

  let content: React.ReactNode;
  if (page === 'home') content = home;
  else if (page === 'camera') content = loadingStep !== null ? <div className="min-h-screen bg-neutral-50 pt-28 px-4"><div className="max-w-2xl mx-auto"><AnalysisLoader step={loadingStep} /></div></div> : <CameraAnalyzer onComplete={startAnalysis} onBack={() => navigate('home')} />;
  else if (page === 'results') content = results ?? <div className="min-h-screen pt-32 text-center"><p>No analysis yet.</p><button onClick={() => navigate('camera')} className="mt-4 underline">Find your colours</button></div>;
  else if (page === 'explore') content = <ExplorePalettes onSelect={setDetail} />;
  else if (page === 'guide') content = <GuidePage />;
  else content = <AboutPage />;
  return <><Navbar currentPage={page} onNavigate={navigate} />{content}<Footer onNavigate={navigate} />{detail && page !== 'results' && <ColourDetail colour={detail} onClose={() => setDetail(null)} />}</>;
}
