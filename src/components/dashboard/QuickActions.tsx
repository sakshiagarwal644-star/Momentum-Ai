import { FileText, Search, Camera, Scissors, Calendar, Download } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: FileText, label: 'Generate Script', color: 'from-[#A4D8C8] to-[#B4C7E7]' },
    { icon: Search, label: 'Research Ideas', color: 'from-[#FFCFAE] to-[#F7E6FF]' },
    { icon: Camera, label: 'Shooting Tips', color: 'from-[#B4C7E7] to-[#F7E6FF]' },
    { icon: Scissors, label: 'Edit Content', color: 'from-[#F7E6FF] to-[#FFCFAE]' },
    { icon: Calendar, label: 'Content Calendar', color: 'from-[#A4D8C8] to-[#FFCFAE]' },
    { icon: Download, label: 'Download Content', color: 'from-[#B4C7E7] to-[#A4D8C8]' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-2xl p-6 shadow-pastel hover:shadow-pastel-lg transition-all border border-[#A4D8C8]/10 flex flex-col items-center gap-3 group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon size={28} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A] text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
