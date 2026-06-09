import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

// Harmonized with your CSS variables (Primary Blue, Secondary Teal, Tertiary Rose)
const COLORS = ['#2563EB', '#0D9488', '#F43F5E', '#3B82F6', '#8B5CF6'];
const CONNECTION_DISTANCE = 150;
const MOUSE_DISTANCE = 200;
const PARTICLE_SPEED = 0.5;
const LINE_OPACITY_BASE = 0.15;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    function resize() {
      // FIX: Account for High-DPI / Retina displays so it's razor-sharp
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);

      initParticles();
    }

    function initParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // FIX: Reduced density slightly for a cleaner, more premium "breathing room" look
      const count = Math.floor((w * h) / 12000);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          radius: 1 + Math.random() * 1.5, // Slightly smaller for elegance
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      particlesRef.current = particles;
    }

    function updateParticle(p: Particle) {
      p.x += p.vx;
      p.y += p.vy;

      const w = window.innerWidth;
      const h = window.innerHeight;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DISTANCE && dist > 0) {
        const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * 0.02;
        p.vy += Math.sin(angle) * force * 0.02;
        p.vx *= 0.99;
        p.vy *= 0.99;
      }
    }

    function drawParticle(p: Particle) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      // FIX: Removed shadowBlur. On light backgrounds, glows look like muddy smudges.
      // Crisp dots look much more modern and premium.
      ctx!.globalAlpha = 0.8; // Slightly translucent to blend nicely
      ctx!.fill();
      ctx!.globalAlpha = 1.0;
    }

    function drawConnections(particles: Particle[]) {
      const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
      const mouseDistSq = MOUSE_DISTANCE * MOUSE_DISTANCE;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const pi = particles[i];

        // Mouse connection - Changed to match your Primary Blue
        const mdx = pi.x - mouseRef.current.x;
        const mdy = pi.y - mouseRef.current.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouseDistSq && mDistSq > 0) {
          const mDist = Math.sqrt(mDistSq);
          const opacity = (1 - mDist / MOUSE_DISTANCE) * 0.4;
          ctx!.beginPath();
          ctx!.moveTo(pi.x, pi.y);
          ctx!.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx!.strokeStyle = `rgba(37, 99, 235, ${opacity})`; // Matches --color-primary
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }

        if (isMobile) continue; // Skip particle-particle connections on mobile

        // Particle connections - Changed to match your Secondary Teal
        const step = len > 150 ? 2 : 1;
        const startJ = i % step;
        for (let j = startJ; j < len; j += step) {
          if (j <= i) continue;
          const pj = particles[j];
          const ddx = pi.x - pj.x;
          const ddy = pi.y - pj.y;
          const dDistSq = ddx * ddx + ddy * ddy;
          if (dDistSq < connDistSq) {
            const dDist = Math.sqrt(dDistSq);
            const opacity = (1 - dDist / CONNECTION_DISTANCE) * LINE_OPACITY_BASE;
            ctx!.beginPath();
            ctx!.moveTo(pi.x, pi.y);
            ctx!.lineTo(pj.x, pj.y);
            ctx!.strokeStyle = `rgba(13, 148, 136, ${opacity})`; // Matches --color-secondary
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const particles = particlesRef.current;

      for (const p of particles) {
        updateParticle(p);
        drawParticle(p);
      }

      drawConnections(particles);

      animFrameRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    const handleResize = () => {
      clearTimeout((resize as any)._debounce);
      (resize as any)._debounce = setTimeout(resize, 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      mouseTimeoutRef.current = setTimeout(() => {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}