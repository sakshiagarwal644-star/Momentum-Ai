export default function DashboardFooter() {
  return (
    <footer className="mt-16 py-8 border-t border-[#A4D8C8]/10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#545454]">
        <span>© MomentumAI</span>
        <button className="hover:text-[#1A1A1A] transition-colors">Terms</button>
        <button className="hover:text-[#1A1A1A] transition-colors">Privacy</button>
        <button className="hover:text-[#1A1A1A] transition-colors">Support</button>
      </div>
    </footer>
  );
}
