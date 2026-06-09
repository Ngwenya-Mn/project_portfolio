import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo(leftRef.current, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo(rightRef.current, { x: 30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  setSending(true);

  try {
    await emailjs.sendForm(serviceId, templateId, formRef.current, {
      publicKey,
    });

    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  } catch (error) {
    console.error('Email send failed:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    setSending(false);
  }
};

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={labelRef} className="mb-16 opacity-0 flex items-center gap-4">
          <span className="text-[var(--color-primary)] font-mono text-xl font-bold">05.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Get In Touch</h2>
          <div className="flex-1 h-px bg-slate-200/80"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div ref={leftRef} className="flex-1 opacity-0">
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">
              Let's Connect
            </h3>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
              I'm always open to new opportunities, collaborations, and data engineering discussions.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:militongcobi@outlook.com"
                className="flex items-center gap-4 glass-card px-5 py-4 font-medium text-sm text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] hover:-translate-y-1 group"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">Email</div>
                  <div className="text-sm font-semibold">militongcobi@outlook.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/milton-ngwenya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card px-5 py-4 font-medium text-sm text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--color-secondary)]/50 hover:text-[var(--color-secondary)] hover:-translate-y-1 group"
              >
                <div className="p-2 rounded-lg bg-teal-50 text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">LinkedIn</div>
                  <div className="text-sm font-semibold">linkedin.com/in/milton-ngwenya</div>
                </div>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="flex-1 opacity-0">
            <div className="glass-card p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 text-3xl mb-4 ring-8 ring-green-500/10">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text-primary)]">
                    Message Sent!
                  </h4>
                  <p className="mt-2 text-[var(--text-secondary)]">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/60 border border-slate-200/80 rounded-xl px-5 py-3.5 text-sm text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/60 border border-slate-200/80 rounded-xl px-5 py-3.5 text-sm text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/60 border border-slate-200/80 rounded-xl px-5 py-3.5 text-sm text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}