import { Mail, FileText, HelpCircle, Shield, MessageCircle } from 'lucide-react';

export default function Footer() {
  const links = [
    { icon: FileText, text: 'About', href: '#about' },
    { icon: FileText, text: 'Pricing', href: '#pricing' },
    { icon: HelpCircle, text: 'Help Center', href: '#help' },
    { icon: Shield, text: 'Privacy Policy', href: '#privacy' },
    { icon: MessageCircle, text: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-16 px-6 lg:px-8 bg-[#F6F9F8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7]"></div>
              <span className="text-2xl font-extrabold text-[#1A1A1A]">
                Momentum<span className="text-[#A4D8C8]">AI</span>
              </span>
            </div>

            <p className="text-[#545454] leading-relaxed max-w-md">
              MomentumAI helps coaches create consistent, high-quality content effortlessly.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 text-[#545454] hover:text-[#1A1A1A] transition-colors"
                >
                  <link.icon size={18} className="text-[#A4D8C8]" strokeWidth={1.5} />
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#A4D8C8]/20 text-center text-sm text-[#545454]">
          © 2025 MomentumAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
