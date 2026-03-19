'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    // Header reveal
    gsap.set(header, { clipPath: 'inset(0 100% 0 0)' });
    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => gsap.to(header, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out' }),
    });

    // Rows stagger in
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.set(row, { opacity: 0, x: -20 });
      ScrollTrigger.create({
        trigger: row,
        start: 'top 85%',
        onEnter: () => gsap.to(row, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.07,
          ease: 'power3.out',
        }),
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: '#F5F0EB',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 6vw, 120px)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(48px, 7vw, 120px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#1A1A1A',
          lineHeight: 1,
          marginBottom: 'clamp(48px, 6vh, 96px)',
          willChange: 'clip-path',
        }}
      >
        What We Do
      </div>

      {/* Service rows */}
      <div style={{ borderTop: '1px solid #D4CFC8' }}>
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={el => { rowsRef.current[i] = el; }}
            className={`service-row${openIndex === i ? ' open' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className="service-row-header">
              <div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(20px, 2.5vw, 36px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#1A1A1A',
                }}>
                  {service.title}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  color: '#6B6560',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}>
                  {service.tagline}
                </div>
              </div>
              <svg
                className="service-arrow"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                style={{ flexShrink: 0, marginLeft: '24px' }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>

            {/* Expandable body */}
            <div className="service-body">
              <div style={{ padding: '0 0 32px 0', maxWidth: '680px' }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '17px',
                  color: '#6B6560',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.details.map((d) => (
                    <li
                      key={d}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '13px',
                        color: '#1A1A1A',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ color: '#E8503E', fontSize: '10px' }}>▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
