import { useRef, useEffect } from "react";
import gsap from "gsap";

const CODE_SNIPPET = [
  { text: "# ETL Pipeline for Data Warehouse", type: "comment" },
  { text: "import pandas as pd", type: "keyword" },
  { text: "import sqlalchemy as sa", type: "keyword" },
  { text: "", type: "empty" },
  { text: "def extract_transform_load():", type: "keyword" },
  { text: "    # Extract from source systems", type: "comment" },
  { text: '    raw_data = pd.read_sql("SELECT * FROM sales")', type: "string" },
  { text: "", type: "empty" },
  { text: "    # Transform and clean", type: "comment" },
  { text: "    clean_data = raw_data.dropna()", type: "code" },
  { text: "", type: "empty" },
  { text: "    # Load to warehouse", type: "comment" },
  { text: "    clean_data.to_sql('warehouse', engine)", type: "string" },
  { text: '    return "ETL Complete"', type: "keyword" },
];

function getTokenColor(type: string) {
  switch (type) {
    case "comment":
      return "#94A3B8";
    case "keyword":
      return "#2563EB";
    case "string":
      return "#0D9488";
    case "code":
    default:
      return "#0F172A";
  }
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLDivElement>(null);
  const name2Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        statusRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          name1Ref.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.25
        )
        .fromTo(
          name2Ref.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.42
        )
        .fromTo(
          roleRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.65
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.85
        )
        .fromTo(
          buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.12 },
          1.0
        )
        .fromTo(
          editorRef.current,
          { x: 40, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.9 },
          0.55
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] flex items-center z-[2]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 lg:max-w-[55%] text-center lg:text-left">
            <div ref={name1Ref} className="opacity-0">
              <span className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)]">
                Hi, I&apos;m
              </span>
            </div>

            <div ref={name2Ref} className="mt-2 opacity-0">
              <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-gradient leading-tight">
                Milton N. Ngwenya
              </h1>
            </div>

            <div ref={roleRef} className="mt-4 opacity-0">
              <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                Data Engineer & Analytics Builder
              </span>
            </div>

            <p
              ref={taglineRef}
              className="mt-6 text-base md:text-lg text-[var(--text-secondary)] opacity-0 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              I design ETL pipelines, dashboards, and data workflows that help teams turn raw data into clear, actionable decisions.
            </p>

            <div
              ref={buttonsRef}
              className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                onClick={(e) => handleNav(e, "#contact")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 hover:-translate-y-1"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Get In Touch
              </a>

              <a
                href="#experience"
                onClick={(e) => handleNav(e, "#experience")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-[var(--color-primary)] border-2 border-[var(--color-primary)] bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:-translate-y-1"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Experience
              </a>
            </div>
          </div>

          <div
            ref={editorRef}
            className="hidden lg:block w-[500px] flex-shrink-0 opacity-0"
          >
            <div
              className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)]/30"
              style={{ boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.15)" }}
            >
              <div className="h-10 bg-gradient-to-r from-white/90 to-slate-50/90 flex items-center px-4 gap-2 border-b border-slate-200/50">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:opacity-80 transition" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition" />
                </div>
                <span className="flex-1 text-center font-mono text-xs text-[var(--text-secondary)] font-medium">
                  etl_pipeline.py
                </span>
                <div className="w-14"></div>
              </div>

              <div className="p-5 overflow-x-auto bg-slate-50/30">
                <pre className="font-mono text-[13px] leading-relaxed text-[var(--text-primary)]">
                  {CODE_SNIPPET.map((line, i) => (
                    <div
                      key={i}
                      className="flex hover:bg-slate-100/50 transition-colors rounded px-1"
                    >
                      <span className="text-slate-400 w-6 text-right mr-4 select-none flex-shrink-0">
                        {i + 1}
                      </span>
                      <span
                        style={{ color: getTokenColor(line.type) }}
                        className="whitespace-pre"
                      >
                        {line.text}
                        {i === CODE_SNIPPET.length - 1 && (
                          <span className="animate-pulse text-[var(--color-primary)] font-bold">
                            |
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}