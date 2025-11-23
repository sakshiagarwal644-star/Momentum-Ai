import { useState, useRef, useEffect } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7]"></div>
            <span className="text-xl font-extrabold text-[#1A1A1A]">
              Momentum<span className="text-[#A4D8C8]">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-[#F6F9F8] hover:bg-[#A4D8C8]/20 flex items-center justify-center transition-colors relative">
              <Bell size={20} className="text-[#545454]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFCFAE] rounded-full"></span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F6F9F8] hover:bg-[#A4D8C8]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-[#545454]" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-pastel-lg border border-[#A4D8C8]/20 py-2 animate-slide-left">
                  <button className="w-full px-4 py-2.5 text-left text-[#1A1A1A] hover:bg-[#F6F9F8] transition-colors">
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-[#1A1A1A] hover:bg-[#F6F9F8] transition-colors">
                    Settings
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-[#1A1A1A] hover:bg-[#F6F9F8] transition-colors">
                    Billing
                  </button>
                  <div className="border-t border-[#A4D8C8]/20 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-[#545454] hover:bg-[#F6F9F8] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
