import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7]"></div>
            <span className="text-xl font-extrabold text-[#1A1A1A]">
              Momentum<span className="text-[#A4D8C8]">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-[#545454] hover:text-[#1A1A1A] transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-[#545454] hover:text-[#1A1A1A] transition-colors">
              FAQ
            </a>
            <a href="#login" className="text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Login
            </a>
            <button className="px-6 py-2.5 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all shadow-pastel">
              Start Free Trial
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#1A1A1A]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <a href="#features" className="block text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="block text-[#545454] hover:text-[#1A1A1A] transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="block text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="block text-[#545454] hover:text-[#1A1A1A] transition-colors">
              FAQ
            </a>
            <a href="#login" className="block text-[#545454] hover:text-[#1A1A1A] transition-colors">
              Login
            </a>
            <button className="w-full px-6 py-2.5 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all shadow-pastel">
              Start Free Trial
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
