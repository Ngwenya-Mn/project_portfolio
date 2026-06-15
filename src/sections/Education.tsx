import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  School,
  MapPin,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
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
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    date: "2025",
    image: "https://www.credly.com/badges/6b6d4f8d-aec2-4b51-bb14-8f56ce02f729",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    date: "2025",
    image: "https://www.credly.com/badges/6b6d4f8d-aec2-4b51-bb14-8f56ce02f729",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const certificateCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 3 >= CERTIFICATES.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, CERTIFICATES.length - 3) : prev - 1
    );
  };

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

      // Certificate cards animation
      const validCertCards = certificateCardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCertCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative z-[2] py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Education Header */}
        <div ref={labelRef} className="mb-10 md:mb-12 opacity-0 flex items-center gap-3 md:gap-4">
          <span className="text-[var(--color-primary)] font-mono text-lg md:text-xl font-bold">
            03.
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">
            Education
          </h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        {/* Education Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {EDUCATION.map((edu, idx) => {
            const Icon = edu.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="glass-card p-5 md:p-7 opacity-0 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-secondary)]" />
                </div>

                <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] leading-snug">
                  {edu.degree}
                </h3>

                <p className="mt-2 text-sm md:text-[15px] font-medium text-[var(--text-primary)]/80">
                  {edu.institution}
                </p>

                <div className="mt-4 md:mt-5 flex flex-col gap-2 md:gap-2.5 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="text-xs md:text-sm">{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="font-mono text-xs md:text-sm">{edu.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificates Subsection */}
        <div className="relative">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-3 md:gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                Certificates
              </h3>
              <div className="w-12 md:w-20 h-px bg-slate-200/80"></div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Buttons - Only show if there are more certificates than visible items */}
            {CERTIFICATES.length > (isMobile ? 1 : 3) && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-slate-200"
                  aria-label="Previous certificates"
                >
                  <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-slate-200"
                  aria-label="Next certificates"
                >
                  <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
              </>
            )}

            {/* Carousel Track */}
            <div className="overflow-hidden px-2">
              <div
                ref={carouselContainerRef}
                className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out certificate-carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)`,
                }}
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
                      className={`flex-shrink-0 ${
                        isMobile ? "w-full" : "w-1/3"
                      } glass-card p-5 md:p-6 opacity-0 hover:border-[var(--color-primary)]/30 transition-all duration-300 block certificate-card`}
                      style={{
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-3 md:mb-4">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-secondary)]" />
                      </div>

                      <h4 className="text-sm md:text-base font-bold text-[var(--text-primary)] leading-snug mb-1 md:mb-2">
                        {cert.title}
                      </h4>

                      <p className="text-xs md:text-sm text-[var(--text-primary)]/80 font-medium">
                        {cert.issuer}
                      </p>

                      <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-[var(--color-primary)] flex-shrink-0" />
                        <span className="font-mono text-xs md:text-sm">{cert.date}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Dots Indicator */}
            {CERTIFICATES.length > (isMobile ? 1 : 3) && (
              <div className="flex justify-center gap-2 mt-6 md:mt-8">
                {Array.from({ length: Math.ceil(CERTIFICATES.length / (isMobile ? 1 : 3)) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * (isMobile ? 1 : 3))}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / (isMobile ? 1 : 3)) === idx
                        ? "w-8 bg-[var(--color-primary)]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}