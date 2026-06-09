import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "2", label: "Years Experience" },
  { value: "2", label: "Companies" },
  { value: "MSc", label: "In Progress" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

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
        [p1Ref.current, p2Ref.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        avatarRef.current,
        { scale: 0.8, opacity: 0, x: 30 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with modern horizontal line */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">
            01.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            About Me
          </h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex-1 lg:w-[60%]">
            <p
              ref={p1Ref}
              className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed opacity-0"
            >
              I'm Milton Ngcobile Ngwenya, a results-driven Data Engineer with
              hands-on experience building ETL pipelines, cleaning and
              transforming data with SQL and Python, and creating dashboards in
              Power BI and Apache Superset. My background spans software
              development and database management, with a focus on delivering
              quality data workflows for reporting and analysis.
            </p>

            <p
              ref={p2Ref}
              className="mt-5 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed opacity-0"
            >
              Currently pursuing my Master's in Computer Science at Lobachevsky
              State University, I'm passionate about turning raw data into
              actionable insights. I thrive in cross-functional teams and adapt
              quickly to new tools and technologies. When I'm not optimizing
              queries, you'll find me exploring new data frameworks or
              contributing to data-driven projects.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-3 gap-4 md:gap-8"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="opacity-0 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Avatar / Visual Placeholder */}
          <div
            ref={avatarRef}
            className="hidden lg:flex lg:w-[40%] flex-1 justify-center opacity-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-full blur-3xl"></div>

              {/* Main Glass Card */}
              <div className="relative w-full h-full glass-card flex items-center justify-center overflow-hidden">
                {/* Abstract geometric background inside the card */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[var(--color-primary)] rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-[var(--color-secondary)] rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
