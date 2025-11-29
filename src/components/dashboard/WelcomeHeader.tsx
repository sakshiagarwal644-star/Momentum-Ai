import { Sparkles } from 'lucide-react';

export default function WelcomeHeader() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mb-2">
          Hello, @usename
        </h1>
        <p className="text-[#545454] text-lg">
          Here's your content workspace for today.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <span className="text-sm text-[#545454]">{today}</span>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#A4D8C8]/20 to-[#B4C7E7]/20 rounded-full border border-[#A4D8C8]/30">
          <Sparkles size={16} className="text-[#A4D8C8]" />
          <span className="text-sm font-semibold text-[#1A1A1A]">AI Suggestions</span>
        </div>
      </div>
    </div>
  );
}
