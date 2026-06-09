import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, School, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    icon: GraduationCap,
    degree: 'Master of Computer Science & IT',
    institution: 'Lobachevsky State University',
    location: 'Nizhny Novgorod, Russia',
    date: '10/2025 – 09/2027',
  },
  {
    icon: BookOpen,
    degree: 'Bachelor of Computer Science & IT',
    institution: 'Lobachevsky State University',
    location: 'Nizhny Novgorod, Russia',
    date: '10/2019 – 09/2023',
  },
  {
    icon: School,
    degree: 'National Senior Certificate',
    institution: 'Hluzingqondo Senior Secondary School',
    location: 'Kwaggafontein, South Africa',
    date: '01/2014 – 11/2016',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching About.tsx & Experience.tsx */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Education</h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => {
            const Icon = edu.icon;
            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="glass-card p-7 opacity-0 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                {/* Icon with subtle background */}
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                  <Icon className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                  {edu.degree}
                </h3>

                <p className="mt-2 text-[15px] font-medium text-[var(--text-primary)]/80">
                  {edu.institution}
                </p>

                <div className="mt-5 flex flex-col gap-2.5 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="font-mono">{edu.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}