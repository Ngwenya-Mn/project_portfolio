import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Cloud,
  GitBranch,
  BarChart3,
  Wrench,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    name: 'Programming Languages',
    skills: [
      'Python (pandas, NumPy)',
      'SQL',
      'Shell Scripting (Bash)',
      'JavaScript',
      'HTML5',
    ],
  },
  {
    icon: Database,
    name: 'Databases & Storage',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Data Modeling',
      'Database Design',
      'Query Optimization',
    ],
  },
  {
    icon: Cloud,
    name: 'Cloud Platforms',
    skills: [
      'AWS (S3, Lambda, Glue)',
      'GCP (BigQuery, Cloud Storage)',
      'Azure Fundamentals',
    ],
  },
  {
    icon: GitBranch,
    name: 'Data Engineering Core',
    skills: [
      'ETL / ELT Pipelines',
      'Apache Spark (PySpark)',
      'Apache Airflow',
      'Docker',
      'Data Warehousing',
      'Data Validation',
      'Data Wrangling',
    ],
  },
  {
    icon: BarChart3,
    name: 'Visualization',
    skills: [
      'Power BI',
      'Tableau',
      'Apache Superset',
      'Dashboards',
    ],
  },
  {
    icon: Wrench,
    name: 'Frameworks & Tools',
    skills: [
      'FastAPI',
      'REST APIs',
      'Git / GitHub',
      'CI/CD Basics',
      'Linux / Unix CLI',
      'Jupyter Notebooks',
      'VS Code',
      'Django',
      'React',
    ],
  },
];

export default function Skills() {
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
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching the rest of the site */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Skills & Technologies</h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="glass-card p-6 md:p-8 opacity-0 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100/80 text-[var(--text-primary)] border border-slate-200/60 hover:border-[var(--color-primary)]/40 hover:bg-blue-50/50 hover:text-[var(--color-primary)] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}