import { Sparkles, TrendingUp, Music, Target } from 'lucide-react';

export default function AISuggestionsPanel() {
  const suggestions = [
    {
      icon: TrendingUp,
      title: 'Trending Topic',
      description: '5-minute morning routines are gaining traction in your niche',
      color: 'text-[#A4D8C8]',
    },
    {
      icon: Music,
      title: 'Audio Trend',
      description: 'Motivational voiceovers with calm background music performing well',
      color: 'text-[#FFCFAE]',
    },
    {
      icon: Target,
      title: 'Engagement Insight',
      description: 'Your audience engages 40% more with carousel posts on Wednesdays',
      color: 'text-[#B4C7E7]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-pastel border border-[#A4D8C8]/20 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} className="text-[#A4D8C8]" />
        <h2 className="text-xl font-extrabold text-[#1A1A1A]">
          AI Suggestions for Your Niche
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 bg-[#F6F9F8] rounded-xl hover:bg-[#A4D8C8]/10 transition-colors"
          >
            <div className={`flex-shrink-0 ${suggestion.color}`}>
              <suggestion.icon size={24} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1">
                {suggestion.title}
              </h3>
              <p className="text-sm text-[#545454] leading-relaxed">
                {suggestion.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 border-2 border-[#A4D8C8] text-[#A4D8C8] font-semibold rounded-xl hover:bg-[#A4D8C8]/10 transition-all">
        Generate More Suggestions
      </button>
    </div>
  );
}
