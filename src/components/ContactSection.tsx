'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MagneticEl({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const darkBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const darkBg = darkBgRef.current;
    const content = contentRef.current;
    if (!section || !darkBg || !content) return;

    // Dark world returns via reverse iris
    gsap.set(darkBg, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(content, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const radius = p * 150;
        if (darkBg) gsap.set(darkBg, { clipPath: `circle(${radius}% at 50% 50%)` });
        if (content) gsap.set(content, { opacity: p, y: 30 * (1 - p) });
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#F5F0EB',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 6vw, 120px)',
      }}
    >
      {/* Dark world returns */}
      <div
        ref={darkBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          willChange: 'clip-path',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          willChange: 'opacity, transform',
        }}
      >
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(48px, 7vw, 120px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'white',
          lineHeight: 1,
          marginBottom: 'clamp(40px, 6vh, 80px)',
        }}>
          Let&apos;s create something.
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(20px, 3vh, 32px)',
          marginBottom: 'clamp(48px, 8vh, 96px)',
        }}>
          <MagneticEl>
            <a
              href="tel:7046250364"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(20px, 2.5vw, 36px)',
                fontWeight: 400,
                color: 'white',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                display: 'block',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8503E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              (704) 625-0364
            </a>
          </MagneticEl>

          <MagneticEl>
            <a
              href="mailto:info@nowsay.com"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(20px, 2.5vw, 36px)',
                fontWeight: 400,
                color: '#737373',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                display: 'block',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#737373')}
            >
              info@nowsay.com
            </a>
          </MagneticEl>
        </div>

        <MagneticEl>
          <a
            href="https://calendly.com/nowsay"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Book a Call
          </a>
        </MagneticEl>

        <div style={{
          marginTop: 'clamp(60px, 8vh, 100px)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          letterSpacing: '0.12em',
          color: '#404040',
          textTransform: 'uppercase',
        }}>
          Charlotte, North Carolina
        </div>
      </div>
    </section>
  );
}
