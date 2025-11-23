import { Search, FileText, Camera, Scissors, Download, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Search,
      title: 'Niche-Specific Research',
      description: 'AI analyzes your industry and audience needs',
    },
    {
      icon: FileText,
      title: 'Script Generator',
      description: 'Create engaging content scripts instantly',
    },
    {
      icon: Camera,
      title: 'Shooting Tips',
      description: 'Get professional guidance for every video',
    },
    {
      icon: Scissors,
      title: 'Auto Editing Instructions',
      description: 'Step-by-step editing guides tailored to you',
    },
    {
      icon: Download,
      title: 'Smart Export',
      description: 'Upload-ready content with captions and hashtags',
    },
    {
      icon: Clock,
      title: 'Save Hours Weekly',
      description: 'Turn 4-hour tasks into 10-minute workflows',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-[#F6F9F8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-pastel hover:shadow-pastel-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#A4D8C8] flex items-center justify-center mb-6">
                <feature.icon size={28} className="text-white" strokeWidth={2} />
              </div>

              <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-3">
                {feature.title}
              </h3>

              <p className="text-[#545454] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
