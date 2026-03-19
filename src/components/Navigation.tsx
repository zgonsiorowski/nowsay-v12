'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { opacity: 0, y: -10 });

    ScrollTrigger.create({
      start: '290vh top',
      onEnter: () => gsap.to(nav, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(nav, { opacity: 0, y: -10, duration: 0.4 }),
    });

    ScrollTrigger.create({
      start: '300vh top',
      onEnter: () => { nav.style.background = 'rgba(0,0,0,0.9)'; nav.style.backdropFilter = 'blur(12px)'; },
      onLeaveBack: () => { nav.style.background = 'transparent'; nav.style.backdropFilter = 'none'; },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['Work', 'Services', 'Contact'];

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

      {/* Desktop links */}
      <div className="nav-desktop" style={{ display: 'flex', gap: '40px' }}>
        {links.map((label) => (
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

      {/* Mobile hamburger */}
      <button
        className="nav-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '32px',
          height: '32px',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          background: 'white',
          transition: 'all 300ms ease',
          transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
        }} />
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          background: 'white',
          transition: 'all 300ms ease',
          opacity: mobileOpen ? 0 : 1,
        }} />
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          background: 'white',
          transition: 'all 300ms ease',
          transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
        }} />
      </button>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '48px',
          zIndex: 999,
        }}>
          {links.map((label) => (
            <button
              key={label}
              onClick={() => scrollTo(label.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'white',
                padding: '8px 0',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
