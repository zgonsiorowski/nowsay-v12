'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    // Initial states
    gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
    stepsRef.current.forEach(s => s && gsap.set(s, { opacity: 0, x: 40 }));
    numbersRef.current.forEach(n => n && gsap.set(n, { opacity: 0 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Timeline line grows
    tl.to(line, { scaleY: 1, duration: 1, ease: 'none' });

    // Steps and numbers reveal staggered
    const stepDuration = 1 / processSteps.length;
    processSteps.forEach((_, i) => {
      const stepEl = stepsRef.current[i];
      const numEl = numbersRef.current[i];
      const offset = i * stepDuration;

      if (numEl) {
        tl.to(numEl, { opacity: 1, duration: stepDuration * 0.3, ease: 'none' }, offset * 1);
      }
      if (stepEl) {
        tl.to(stepEl, { opacity: 1, x: 0, duration: stepDuration * 0.5, ease: 'power2.out' }, offset * 1 + 0.1);
      }
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#F5F0EB',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gap: 'clamp(40px, 6vw, 120px)',
        padding: 'clamp(60px, 10vh, 140px) clamp(24px, 6vw, 120px)',
        alignContent: 'center',
      }}
    >
      {/* Left: section label + vertical timeline */}
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: '#6B6560',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}>
          How It Works
        </div>
        {/* Vertical line */}
        <div style={{ position: 'relative', height: '280px', width: '1px', background: '#D4CFC8' }}>
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '100%',
              background: '#1A1A1A',
              transformOrigin: 'top',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* Right: steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vh, 72px)', justifyContent: 'center' }}>
        {processSteps.map((step, i) => (
          <div key={step.number} style={{ position: 'relative' }}>
            {/* Ghost number */}
            <div
              ref={el => { numbersRef.current[i] = el; }}
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-10px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(80px, 10vw, 160px)',
                fontWeight: 300,
                color: '#E8E0D8',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                willChange: 'opacity',
              }}
            >
              {step.number}
            </div>

            {/* Content */}
            <div
              ref={el => { stepsRef.current[i] = el; }}
              style={{ position: 'relative', zIndex: 1, willChange: 'opacity, transform' }}
            >
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#1A1A1A',
                marginBottom: '12px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#6B6560',
                lineHeight: 1.65,
                maxWidth: '520px',
                marginBottom: '8px',
              }}>
                {step.description}
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#1A1A1A',
                letterSpacing: '0.02em',
              }}>
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
