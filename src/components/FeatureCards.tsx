import { Brain, Palette, Shirt, Gem, Sparkles, GitCompareArrows, Heart, Share2 } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Colour Analysis', description: 'Get an approximate reading of your skin tone, undertone and colour season.' },
  { icon: Palette, title: 'Personal Colour Palette', description: 'Discover 15-20 colours selected to complement your unique colouring.' },
  { icon: Shirt, title: 'Dress Colour Matching', description: 'Check whether a dress or outfit colour works with your palette.' },
  { icon: Gem, title: 'Jewellery Suggestions', description: 'Find the metals that harmonise with your warm, cool or neutral undertone.' },
  { icon: Sparkles, title: 'Makeup Colour Suggestions', description: 'Explore lip, blush, eyeshadow and nail shades made for your season.' },
  { icon: GitCompareArrows, title: 'Colour Comparison', description: 'Try any colour against your personal palette for instant styling guidance.' },
  { icon: Heart, title: 'Save Your Palette', description: 'Keep your results and favourite colours close for your next shopping trip.' },
  { icon: Share2, title: 'Share Your Results', description: 'Create a beautiful result card to share with friends and family.' },
];

export default function FeatureCards() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-3">Everything in one place</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900">
              Your colour,
              <br />your confidence.
            </h2>
          </div>
          <p className="text-lg text-neutral-500 max-w-md leading-relaxed">
            From first scan to finished look, ColorMatch AI helps you make more confident colour choices every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 bg-white rounded-2xl border border-neutral-100 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
              >
                <Icon className="w-6 h-6 text-neutral-700 mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
