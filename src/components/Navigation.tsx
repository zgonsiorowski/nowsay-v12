'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Start hidden, reveal after hero unpins (~300vh)
    gsap.set(nav, { opacity: 0, y: -10 });

    ScrollTrigger.create({
      start: '290vh top',
      onEnter: () => gsap.to(nav, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(nav, { opacity: 0, y: -10, duration: 0.4 }),
    });

    // Background change on scroll
    ScrollTrigger.create({
      start: '300vh top',
      onEnter: () => { nav.style.background = 'rgba(0,0,0,0.9)'; nav.style.backdropFilter = 'blur(12px)'; },
      onLeaveBack: () => { nav.style.background = 'transparent'; nav.style.backdropFilter = 'none'; },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 4vw, 80px)',
        zIndex: 1000,
        transition: 'background 300ms, backdrop-filter 300ms',
        background: 'transparent',
      }}
    >
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'white',
      }}>
        NOWSAY
      </span>
      <div style={{ display: 'flex', gap: '40px' }}>
        {['Work', 'Services', 'Contact'].map((label) => (
          <button
            key={label}
            onClick={() => scrollTo(label.toLowerCase())}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              padding: '4px 0',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
