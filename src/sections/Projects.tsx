import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FolderGit2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching the rest of the site */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">
            04.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        {/* Premium "Coming Soon" Card */}
        <div ref={contentRef} className="flex justify-center opacity-0">
          <div className="glass-card p-10 md:p-16 text-center max-w-2xl w-full">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[var(--color-primary)] mb-6">
              <FolderGit2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Exciting Things in Progress
            </h3>
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
              I am currently building and deploying new data engineering and AI
              projects. Check back soon to see my latest work, or connect with
              me for updates!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-400 border-2 border-gray-300 bg-gray-100 cursor-not-allowed pointer-events-none opacity-60"
                aria-disabled="true"
                tabIndex={-1}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
