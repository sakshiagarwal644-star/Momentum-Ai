import { User, Users, Calendar } from 'lucide-react';

export default function ProfileSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center mb-4">
          <User size={40} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-1">@yourhandle</h3>
        <p className="text-sm text-[#545454] mb-4">Fitness Coach</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-[#F6F9F8] rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-[#A4D8C8]" />
            <span className="text-sm font-semibold text-[#1A1A1A]">Followers</span>
          </div>
          <p className="text-2xl font-extrabold text-[#1A1A1A]">12.4K</p>
        </div>

        <div className="p-4 bg-[#F6F9F8] rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-[#FFCFAE]" />
            <span className="text-sm font-semibold text-[#1A1A1A]">Posting Frequency</span>
          </div>
          <p className="text-2xl font-extrabold text-[#1A1A1A]">5x/week</p>
        </div>
      </div>

      <button className="w-full mt-6 py-3 border-2 border-[#A4D8C8] text-[#A4D8C8] font-semibold rounded-xl hover:bg-[#A4D8C8]/10 transition-all">
        Edit Profile
      </button>
    </div>
  );
}
