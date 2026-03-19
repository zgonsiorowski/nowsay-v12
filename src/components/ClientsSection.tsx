'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clients } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power3.out',
        }),
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#F5F0EB',
        padding: 'clamp(60px, 8vh, 120px) clamp(24px, 6vw, 120px)',
        borderTop: '1px solid #D4CFC8',
      }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: '#6B6560',
        textTransform: 'uppercase',
        marginBottom: '48px',
      }}>
        Clients
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'center',
      }}>
        {clients.map((client, i) => (
          <span
            key={client}
            ref={el => { itemsRef.current[i] = el; }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(16px, 2vw, 24px)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: '#4A4540',
              willChange: 'opacity, transform',
              transition: 'color 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1A1A1A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4A4540')}
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}
