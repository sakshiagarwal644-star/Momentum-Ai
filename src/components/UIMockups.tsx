import { Calendar, FileText, Edit3 } from 'lucide-react';

export default function UIMockups() {
  const mockups = [
    {
      icon: Calendar,
      title: 'Your Content Calendar',
      gradient: 'from-[#A4D8C8] to-[#B4C7E7]',
    },
    {
      icon: FileText,
      title: 'Your Script Output',
      gradient: 'from-[#FFCFAE] to-[#F7E6FF]',
    },
    {
      icon: Edit3,
      title: 'Your Editing Guide',
      gradient: 'from-[#B4C7E7] to-[#F7E6FF]',
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {mockups.map((mockup, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-pastel hover:shadow-pastel-lg transition-all duration-300 overflow-hidden border border-[#A4D8C8]/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mockup.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-[#A4D8C8] flex items-center justify-center mb-6">
                  <mockup.icon size={24} className="text-white" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-extrabold text-[#1A1A1A] mb-6">
                  {mockup.title}
                </h3>

                <div className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-[#F6F9F8] to-white rounded-xl border border-[#A4D8C8]/20"></div>
                  <div className="h-24 bg-gradient-to-br from-[#F6F9F8] to-white rounded-xl border border-[#A4D8C8]/20"></div>
                  <div className="h-20 bg-gradient-to-br from-[#F6F9F8] to-white rounded-xl border border-[#A4D8C8]/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
