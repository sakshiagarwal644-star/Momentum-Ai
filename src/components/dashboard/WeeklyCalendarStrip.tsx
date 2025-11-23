import { useState } from 'react';
import { Grid, List, Video, FileText, Image, Plus } from 'lucide-react';

export default function WeeklyCalendarStrip() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date,
        content: i % 3 === 0 ? ['reel', 'script'] : i % 2 === 0 ? ['carousel'] : [],
      });
    }
    return days;
  };

  const days = getNext7Days();

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'reel':
        return <Video size={16} className="text-[#A4D8C8]" />;
      case 'script':
        return <FileText size={16} className="text-[#FFCFAE]" />;
      case 'carousel':
        return <Image size={16} className="text-[#B4C7E7]" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#1A1A1A]">7-Day Content Calendar</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
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

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((day, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-4 shadow-pastel border transition-all ${
              index === 0
                ? 'border-[#A4D8C8] shadow-pastel-lg'
                : 'border-[#A4D8C8]/10 hover:border-[#A4D8C8]/30'
            }`}
          >
            <div className="text-center mb-3">
              <div className="text-xs text-[#545454] mb-1">{day.day}</div>
              <div className="text-2xl font-extrabold text-[#1A1A1A]">{day.date}</div>
            </div>

            {day.content.length > 0 ? (
              <div className="space-y-2">
                {day.content.map((type, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center p-2 bg-[#F6F9F8] rounded-lg"
                  >
                    {getContentIcon(type)}
                  </div>
                ))}
              </div>
            ) : (
              <button className="w-full py-2 border-2 border-dashed border-[#A4D8C8]/30 rounded-lg hover:border-[#A4D8C8] hover:bg-[#A4D8C8]/5 transition-all flex items-center justify-center gap-1">
                <Plus size={16} className="text-[#A4D8C8]" />
                <span className="text-xs text-[#A4D8C8] font-semibold">Add</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
