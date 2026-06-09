import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-[2] mt-12 border-t border-slate-200/60 bg-white/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Copyright & Tagline */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Milton Ngcobile Ngwenya  &copy; {currentYear}
          </p>
        </div>

        {/* Center: Built with (Optional, but looks very professional) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span className="text-[var(--color-primary)] font-semibold">Learning</span>
          <span>•</span>
          <span className="text-[var(--color-secondary)] font-semibold">Building</span>
          <span>•</span>
          <span className="text-[var(--color-tertiary)] font-semibold">Mastering</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:bg-blue-50 transition-all duration-300"
          aria-label="Scroll to top"
        >
          Back to Top
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
}