import { Search, Sparkles, Share2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Research',
      description: 'AI studies your niche, audience, and trending topics.',
      gradient: 'from-[#A4D8C8] to-[#B4C7E7]',
    },
    {
      icon: Sparkles,
      title: 'Create',
      description: 'Generates scripts, talking points, thumbnails, and automatically edits your videos.',
      gradient: 'from-[#FFCFAE] to-[#F7E6FF]',
    },
    {
      icon: Share2,
      title: 'Share',
      description: 'Exports upload-ready clips, captions, hashtags, and more.',
      gradient: 'from-[#B4C7E7] to-[#F7E6FF]',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            From idea to upload-ready videos — in minutes.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 shadow-pastel-lg hover:shadow-pastel-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6`}>
                <step.icon size={32} className="text-white" strokeWidth={2} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#1A1A1A] mb-4">
                Step {index + 1} — {step.title}
              </h3>

              <p className="text-[#545454] text-lg leading-relaxed">
                {step.description}
              </p>

              <div className="absolute top-8 right-8 text-6xl font-extrabold text-[#A4D8C8]/10">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
