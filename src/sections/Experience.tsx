import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ExternalLink } from 'lucide-react'; // Added ExternalLink icon

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: 'Data Engineer',
    company: 'EPF Innovation Campus',
    url:'#',
    date: '04/2024 – 07/2025',
    responsibilities: [
      'Designed ETL processes for data extraction, transformation, and loading into the data warehouse',
      'Cleaned and preprocessed raw data to ensure quality and integrity for analysis',
      'Developed algorithms for data aggregation to support trend analysis and predictive modeling',
      'Created data visualizations using Apache Superset and Power BI for stakeholder insights',
      'Automated data pipelines for timely information delivery to end users',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Digication',
    url: '#',
    date: '04/2024 – 03/2025',
    responsibilities: [
      'Developed web applications with Vue.js and JavaScript',
      'Integrated machine learning models using Python and SQL',
      'Collaborated with data scientists to optimize algorithms',
      'Created and maintained efficient databases for data storage',
      'Participated in code reviews, sprint planning, and daily stand-ups',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Timeline line draws
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, ease: 'power2.inOut',
          transformOrigin: 'top',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Cards stagger in
      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Dots appear
      const validDots = dotsRef.current.filter(Boolean);
      gsap.fromTo(
        validDots,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Experience</h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            ref={timelineRef}
            className="absolute left-[5px] md:left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] opacity-40"
          />

          {/* Job Cards */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative flex items-start">
                {/* Timeline dot */}
                <div
                  ref={(el) => { dotsRef.current[idx] = el; }}
                  className="absolute left-0 top-6 w-3 h-3 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] border-2 border-white z-10 opacity-0 shadow-lg shadow-blue-500/20"
                />

                {/* Card */}
                <div
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="ml-8 md:ml-10 flex-1 glass-card p-6 md:p-8 opacity-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                        {exp.title}
                      </h3>
                      
                      {/* UPDATED: Clickable Company Name with External Link Icon */}
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 font-semibold text-sm bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                      >
                        {exp.company}
                        <ExternalLink className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                      </a>
                    </div>
                    
                    {/* Premium Date Badge */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] bg-slate-100/80 px-3 py-1.5 rounded-full self-start sm:self-center border border-slate-200/50">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {exp.date}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="text-[15px] text-[var(--text-secondary)] leading-relaxed flex gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
