'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const videoWrap = videoWrapRef.current;
    const overlay = overlayRef.current;
    if (!section || !text || !videoWrap || !overlay) return;

    // Initial state: text visible, video hidden
    gsap.set(videoWrap, { opacity: 0 });
    // text starts visible (no gsap.set opacity:0 — CSS handles initial visibility)

    // Scroll-driven: pin for 300vh
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // 0-25%: Letters spread
    scrollTl.to(text, {
      letterSpacing: '0.6em',
      duration: 0.25,
      ease: 'none',
    });

    // 25-50%: Video bleeds in as letters keep spreading
    scrollTl.to(videoWrap, {
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    }, '<');

    // 50-75%: Letters fade out (video is now dominant)
    scrollTl.to(text, {
      opacity: 0,
      duration: 0.15,
      ease: 'none',
    });

    // 75-100%: Overlay fades (full video moment)
    scrollTl.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: 'none',
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
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle ambient poster (visible while video loads) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, #111118 0%, #080808 50%, #000 100%)',
        zIndex: 0,
      }} />

      {/* Vimeo background video */}
      <div
        ref={videoWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {/* Scale iframe to cover aspect ratio mismatch */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '177.78vh', /* 16/9 aspect */
          height: '56.25vw', /* 9/16 aspect */
          minWidth: '100%',
          minHeight: '100%',
        }}>
          <iframe
            src="https://player.vimeo.com/video/1109413902?h=bd4c361b90&background=1&autoplay=1&loop=1&muted=1&quality=1080p"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              border: 'none',
              pointerEvents: 'none',
            }}
            allow="autoplay; fullscreen"
          />
        </div>
      </div>

      {/* Dark overlay on top of video */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 2,
        }}
      />

      {/* NOWSAY text */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 3,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(80px, 12vw, 180px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'white',
          userSelect: 'none',
          textAlign: 'center',
          lineHeight: 1,
          willChange: 'letter-spacing, opacity',
        }}
      >
        NOWSAY
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.5,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'white',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, white, transparent)',
        }} />
      </div>
    </section>
  );
}
