import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  School,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);


const EDUCATION = [
  {
    icon: GraduationCap,
    degree: "Master of Computer Science & IT",
    institution: "Lobachevsky State University",
    location: "Nizhny Novgorod, Russia",
    date: "10/2025 – 09/2027",
  },
  {
    icon: BookOpen,
    degree: "Bachelor of Computer Science & IT",
    institution: "Lobachevsky State University",
    location: "Nizhny Novgorod, Russia",
    date: "10/2019 – 09/2023",
  },
  {
    icon: School,
    degree: "National Senior Certificate",
    institution: "Hluzingqondo Senior Secondary School",
    location: "Kwaggafontein, South Africa",
    date: "01/2014 – 11/2016",
  },
];


const CERTIFICATES = [
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "2025",
    image: "https://www.credly.com/badges/61cd189a-5db5-42d4-abb5-dd92d0952ba6",
  },
  {
    title: "Understanding Data Engineering",
    issuer: "DataCamp",
    date: "2025",
    image: "https://www.datacamp.com/completed/statement-of-accomplishment/course/2e5e067560a1ab7690bb517d0defe6b7baf5b7bc",
  },
];


export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const certificateCardsRef = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
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


      // Education cards animation
      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );


      // Certificates section header animation
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current.querySelector("h3"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          },
        );


        // Certificate cards animation
        const validCertCards = certificateCardsRef.current.filter(Boolean);
        gsap.fromTo(
          validCertCards,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          },
        );


        // Carousel horizontal scroll animation
        gsap.to(carouselRef.current, {
          x: -200,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }
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
        {/* Education Header */}
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">
            03.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Education
          </h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>


        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {EDUCATION.map((edu, idx) => {
            const Icon = edu.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="glass-card p-7 opacity-0 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
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


        {/* Certificates Subsection */}
        <div className="text-center mb-12">
          <div ref={carouselRef} className="inline-flex items-center gap-4">
            <div className="mb-12 flex items-center gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                Certificates
              </h3>
              <div className="flex-1 h-px bg-slate-200/80"></div>
            </div>
          </div>


          <div className="overflow-x-hidden max-w-5xl mx-auto">
            <div
              className="flex gap-6 px-2"
              style={{ width: "calc(100% + 100px)" }}
            >
              {CERTIFICATES.map((cert, idx) => {
                const Icon = Award;
                return (
                  <a
                    key={idx}
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={(el) => {
                      certificateCardsRef.current[idx] = el;
                    }}
                    className="flex-shrink-0 w-64 glass-card p-6 opacity-0 hover:border-[var(--color-primary)]/30 transition-all duration-300 block"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>


                    <h4 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-2">
                      {cert.title}
                    </h4>


                    <p className="text-sm text-[var(--text-primary)]/80 font-medium">
                      {cert.issuer}
                    </p>


                    <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                      <span className="font-mono">{cert.date}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}