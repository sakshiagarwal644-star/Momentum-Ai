import { useState } from 'react';
import { Grid, List, MoreVertical, Play, Edit, Download } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: 'Idea' | 'Script' | 'Final Edit';
  platform: string;
  status: 'Draft' | 'Ready' | 'Published';
  lastUpdated: string;
  gradient: string;
}

export default function RecentContent() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const content: ContentItem[] = [
    {
      id: 1,
      title: '5 Morning Habits for Peak Performance',
      type: 'Script',
      platform: 'Instagram',
      status: 'Ready',
      lastUpdated: '2 hours ago',
      gradient: 'from-[#A4D8C8] to-[#B4C7E7]',
    },
    {
      id: 2,
      title: 'How to Build Consistency as a Coach',
      type: 'Final Edit',
      platform: 'YouTube',
      status: 'Published',
      lastUpdated: '1 day ago',
      gradient: 'from-[#FFCFAE] to-[#F7E6FF]',
    },
    {
      id: 3,
      title: 'Client Transformation Stories',
      type: 'Idea',
      platform: 'TikTok',
      status: 'Draft',
      lastUpdated: '3 days ago',
      gradient: 'from-[#B4C7E7] to-[#F7E6FF]',
    },
    {
      id: 4,
      title: 'Top 3 Nutrition Mistakes',
      type: 'Script',
      platform: 'Instagram',
      status: 'Ready',
      lastUpdated: '4 days ago',
      gradient: 'from-[#F7E6FF] to-[#FFCFAE]',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-[#A4D8C8]/20 text-[#A4D8C8]';
      case 'Ready':
        return 'bg-[#B4C7E7]/20 text-[#B4C7E7]';
      case 'Draft':
        return 'bg-[#FFCFAE]/20 text-[#FFCFAE]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#1A1A1A]">My Recent Content</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'cards'
                ? 'bg-[#A4D8C8] text-white'
                : 'bg-[#F6F9F8] text-[#545454] hover:bg-[#A4D8C8]/20'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-[#A4D8C8] text-white'
                : 'bg-[#F6F9F8] text-[#545454] hover:bg-[#A4D8C8]/20'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/10 overflow-hidden hover:shadow-pastel-lg transition-all"
            >
              <div className={`h-32 bg-gradient-to-br ${item.gradient} relative`}>
                <div className="absolute top-3 right-3">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                    <MoreVertical size={16} className="text-[#545454]" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-[#1A1A1A] mb-2 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#545454] mb-4">
                  <span className="font-semibold">{item.type}</span>
                  <span>•</span>
                  <span>{item.platform}</span>
                </div>
                <div className="text-xs text-[#545454] mb-4">{item.lastUpdated}</div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#A4D8C8] text-white rounded-lg hover:bg-[#8fc7b5] transition-colors flex items-center justify-center gap-1">
                    <Play size={14} />
                    <span className="text-sm font-semibold">Open</span>
                  </button>
                  <button className="p-2 bg-[#F6F9F8] rounded-lg hover:bg-[#A4D8C8]/20 transition-colors">
                    <Edit size={16} className="text-[#545454]" />
                  </button>
                  <button className="p-2 bg-[#F6F9F8] rounded-lg hover:bg-[#A4D8C8]/20 transition-colors">
                    <Download size={16} className="text-[#545454]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F6F9F8] border-b border-[#A4D8C8]/10">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Title
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Platform
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Last Updated
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#1A1A1A]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {content.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#A4D8C8]/10 hover:bg-[#F6F9F8] transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#1A1A1A]">{item.title}</span>
                  </td>
                  <td className="py-4 px-6 text-[#545454]">{item.type}</td>
                  <td className="py-4 px-6 text-[#545454]">{item.platform}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#545454]">{item.lastUpdated}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-[#A4D8C8]/20 rounded-lg transition-colors">
                        <Play size={16} className="text-[#A4D8C8]" />
                      </button>
                      <button className="p-2 hover:bg-[#A4D8C8]/20 rounded-lg transition-colors">
                        <Edit size={16} className="text-[#545454]" />
                      </button>
                      <button className="p-2 hover:bg-[#A4D8C8]/20 rounded-lg transition-colors">
                        <Download size={16} className="text-[#545454]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
