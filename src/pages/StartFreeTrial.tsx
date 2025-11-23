import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Video } from 'lucide-react';

export default function StartFreeTrial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6 py-12 animate-fade-in">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-6 leading-tight">
              Start your free MomentumAI trial.
            </h1>
            <p className="text-xl text-[#545454] leading-relaxed">
              Create your account to access personalized content workflows tailored to your coaching niche.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-10 py-4 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-2xl hover:bg-[#8fc7b5] transition-all shadow-pastel-lg text-lg"
            >
              Create Account
            </button>
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-[#545454] hover:text-[#1A1A1A] underline transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-pastel-lg p-8 space-y-6">
            <div className="bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-white" />
                <span className="text-sm font-semibold text-white">Content Calendar</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(21)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg ${
                      i % 4 === 0 ? 'bg-white' : 'bg-white/40'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FFCFAE] to-[#F7E6FF] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} className="text-[#1A1A1A]" />
                <span className="text-sm font-semibold text-[#1A1A1A]">Script Preview</span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-white/70 rounded-full w-full"></div>
                <div className="h-2.5 bg-white/70 rounded-full w-5/6"></div>
                <div className="h-2.5 bg-white/70 rounded-full w-4/6"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#B4C7E7] to-[#F7E6FF] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video size={20} className="text-[#1A1A1A]" />
                <span className="text-sm font-semibold text-[#1A1A1A]">Content Tiles</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/70 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
