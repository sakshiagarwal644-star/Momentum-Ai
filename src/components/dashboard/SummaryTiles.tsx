import { Lightbulb, FileText, Video, Calendar, TrendingUp } from 'lucide-react';

export default function SummaryTiles() {
  const tiles = [
    {
      title: 'Ideas Generated',
      subtitle: 'This Week',
      value: '12',
      icon: Lightbulb,
      action: 'Generate New Idea',
      gradient: 'from-[#A4D8C8] to-[#B4C7E7]',
    },
    {
      title: 'Scripts Created',
      subtitle: 'Ready to Use',
      value: '8',
      icon: FileText,
      action: 'Create Script',
      gradient: 'from-[#FFCFAE] to-[#F7E6FF]',
    },
    {
      title: 'Raw Clips',
      subtitle: 'Awaiting Edit',
      value: '5',
      icon: Video,
      action: 'Upload Clips',
      gradient: 'from-[#B4C7E7] to-[#F7E6FF]',
    },
    {
      title: 'Scheduled Posts',
      subtitle: 'Next 7 Days',
      value: '14',
      icon: Calendar,
      action: 'View Calendar',
      gradient: 'from-[#F7E6FF] to-[#FFCFAE]',
    },
    {
      title: 'Consistency Score',
      subtitle: 'Weekly Average',
      value: '87%',
      icon: TrendingUp,
      action: 'View Insights',
      gradient: 'from-[#A4D8C8] to-[#FFCFAE]',
      showProgress: true,
      progress: 87,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-pastel hover:shadow-pastel-lg transition-all border border-[#A4D8C8]/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}>
              <tile.icon size={24} className="text-white" strokeWidth={2} />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">
              {tile.value}
            </h3>
            <p className="text-sm font-semibold text-[#1A1A1A]">{tile.title}</p>
            <p className="text-xs text-[#545454]">{tile.subtitle}</p>
          </div>

          {tile.showProgress && (
            <div className="mb-4">
              <div className="h-2 bg-[#F6F9F8] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${tile.gradient} transition-all`}
                  style={{ width: `${tile.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button className="text-sm text-[#A4D8C8] hover:text-[#8fc7b5] font-semibold transition-colors">
            {tile.action} →
          </button>
        </div>
      ))}
    </div>
  );
}
