'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorldTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const brightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bright = brightRef.current;
    if (!section || !bright) return;

    // Start with bright world clipped to center (0px radius = invisible)
    gsap.set(bright, { clipPath: 'circle(0% at 50% 50%)' });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const radius = p * 150; // 0% → 150%
        if (bright) {
          gsap.set(bright, { clipPath: `circle(${radius}% at 50% 50%)` });
        }
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div ref={sectionRef} style={{ position: 'relative', height: '50vh', overflow: 'hidden', background: '#000' }}>
      {/* The bright world reveals via iris */}
      <div
        ref={brightRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#F5F0EB',
          willChange: 'clip-path',
        }}
      />
    </div>
  );
}
