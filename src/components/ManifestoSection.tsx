'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!section || !line1 || !line2) return;

    // Initial state: clipped (invisible)
    gsap.set(line1, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(line2, { clipPath: 'inset(0 100% 0 0)' });

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

    // 0-40%: line1 wipes in from left
    tl.to(line1, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.4,
      ease: 'none',
    });

    // 40-50%: pause (empty timeline beat)
    tl.to({}, { duration: 0.1 });

    // 50-90%: line2 wipes in
    tl.to(line2, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.4,
      ease: 'none',
    });

    // 90-100%: hold
    tl.to({}, { duration: 0.1 });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const textStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(40px, 5.5vw, 88px)',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    color: 'white',
    lineHeight: 1.1,
    willChange: 'clip-path',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(24px, 6vw, 120px)',
        overflow: 'hidden',
      }}
    >
      <div ref={line1Ref} style={textStyle}>
        We don&apos;t make videos.
      </div>
      <div
        ref={line2Ref}
        style={{
          ...textStyle,
          marginTop: 'clamp(16px, 2vw, 32px)',
          color: '#737373',
        }}
      >
        We make moments that move people.
      </div>
    </section>
  );
}
