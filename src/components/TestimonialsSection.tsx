'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const total = testimonials.length;

    // Set initial states
    quotesRef.current.forEach((q, i) => {
      if (!q) return;
      gsap.set(q, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${total * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const rawIdx = self.progress * (total - 1);
          const idx = Math.round(rawIdx);
          setCurrentIndex(idx);

          // Crossfade between testimonials
          quotesRef.current.forEach((q, i) => {
            if (!q) return;
            const distance = Math.abs(i - rawIdx);
            const opacity = Math.max(0, 1 - distance * 2);
            const yOffset = (i - rawIdx) * 40;
            gsap.set(q, { opacity, y: yOffset });
          });
        },
      },
    });

    tl.to({}, { duration: 1 }); // hold duration for pin

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const bgColors = ['#F5F0EB', '#EDE7E0', '#F0EBE6', '#EAE5DF'];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: bgColors[currentIndex],
        transition: 'background 600ms ease',
      }}
    >
      {/* Quotes layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vh, 120px) clamp(24px, 8vw, 160px)',
      }}>
        {testimonials.map((t, i) => (
          <div
            key={t.company}
            ref={el => { quotesRef.current[i] = el; }}
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '900px',
              textAlign: 'center',
              willChange: 'opacity, transform',
              padding: '0 clamp(24px, 8vw, 160px)',
            }}
          >
            <blockquote style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(22px, 3vw, 44px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              lineHeight: 1.35,
              marginBottom: '40px',
            }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#6B6560',
                textTransform: 'uppercase',
              }}>
                {t.author} — {t.company}
              </div>
            </footer>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
      }}>
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`testimonial-dot${i === currentIndex ? ' active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
