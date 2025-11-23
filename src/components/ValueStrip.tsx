import { Search, Edit3, Video, Scissors, Upload } from 'lucide-react';

export default function ValueStrip() {
  const items = [
    { icon: Search, text: 'Niche Research' },
    { icon: Edit3, text: 'Script Writing' },
    { icon: Video, text: 'Shooting Tips' },
    { icon: Scissors, text: 'Clip Editing' },
    { icon: Upload, text: 'Upload-Ready Exports' },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-[#FFCFAE] to-[#F7E6FF] overflow-hidden">
      <div className="flex animate-scroll">
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <item.icon size={24} className="text-[#1A1A1A]" strokeWidth={1.5} />
            <span className="text-[#1A1A1A] font-medium">{item.text}</span>
            <span className="text-[#A4D8C8] text-2xl">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}
