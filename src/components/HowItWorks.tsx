import { Hand, Sparkles, Palette, Shirt } from 'lucide-react';

const steps = [
  {
    icon: Hand,
    title: 'Show your hand',
    description: 'Place your hand inside the camera guide. Natural daylight works best for accurate results.',
  },
  {
    icon: Sparkles,
    title: 'AI analyzes your skin tone',
    description: 'Our system detects the skin region and estimates your skin tone and warm or cool undertone.',
  },
  {
    icon: Palette,
    title: 'Discover your colour palette',
    description: 'Get 15-20 personalised colours based on your colour season — spring, summer, autumn or winter.',
  },
  {
    icon: Shirt,
    title: 'Explore personalised recommendations',
    description: 'Receive fashion, jewellery and makeup suggestions tailored to your unique colour profile.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Four simple steps to discover your perfect colour palette.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-neutral-50 hover:bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-6 right-6 text-6xl font-display font-bold text-neutral-100 group-hover:text-neutral-200 transition-colors">
                  {i + 1}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
