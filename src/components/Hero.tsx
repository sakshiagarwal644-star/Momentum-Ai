import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-[#F6F9F8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-tight">
              Create 30 Days of Niche-Specific Content in Under 10 Minutes.
            </h1>

            <p className="text-xl text-[#545454] leading-relaxed">
              MomentumAI helps service-based coaches research, write, edit, and prepare short-form content effortlessly—so you get more time to teach, coach, and grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-2xl hover:bg-[#8fc7b5] transition-all shadow-pastel-lg text-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-2xl hover:bg-[#A4D8C8]/10 transition-all text-lg flex items-center justify-center gap-2">
                <Play size={20} />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-pastel-lg p-8 space-y-6">
              <div className="bg-gradient-to-br from-[#FFCFAE] to-[#F7E6FF] rounded-2xl p-6">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-3">Content Calendar</div>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg ${
                        i % 3 === 0 ? 'bg-[#A4D8C8]' : 'bg-white/50'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#B4C7E7] to-[#A4D8C8] rounded-2xl p-6">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-3">Script Generator</div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/70 rounded-full w-full"></div>
                  <div className="h-3 bg-white/70 rounded-full w-5/6"></div>
                  <div className="h-3 bg-white/70 rounded-full w-4/6"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#F7E6FF] to-[#FFCFAE] rounded-2xl p-6">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-3">Quick Export</div>
                <div className="flex gap-2">
                  <div className="flex-1 h-12 bg-white/70 rounded-xl"></div>
                  <div className="flex-1 h-12 bg-white/70 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
