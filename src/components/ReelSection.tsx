'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ReelSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const playhead = playheadRef.current;
    if (!section || !track || !playhead) return;

    const totalPanels = projects.length;
    const totalScroll = (totalPanels - 1) * 100; // percent

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'reel',
        trigger: section,
        start: 'top top',
        end: () => `+=${section.offsetWidth * (totalPanels - 1)}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (totalPanels - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power3.inOut',
        },
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (totalPanels - 1));
          setCurrentIndex(idx);

          // Update playhead
          if (playhead) {
            gsap.set(playhead, { width: `${((idx + 1) / totalPanels) * 100}%` });
          }
        },
      },
    });

    tl.to(track, {
      xPercent: -totalScroll,
      ease: 'none',
    });

    return () => {
      const t = ScrollTrigger.getById('reel');
      if (t) t.kill();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: `${projects.length * 100}vw`,
          height: '100vh',
          willChange: 'transform',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* Fullscreen Vimeo */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '177.78vh',
              height: '56.25vw',
              minWidth: '100%',
              minHeight: '100%',
            }}>
              <iframe
                src={`https://player.vimeo.com/video/${project.vimeoId}?h=${project.hash}&background=1&autoplay=1&loop=1&muted=1`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: 'none',
                }}
                allow="autoplay; fullscreen"
              />
            </div>

            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            }} />

            {/* Film splice: black strip between panels (except last) */}
            {i < projects.length - 1 && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: '3px',
                height: '100%',
                background: '#000',
                zIndex: 10,
              }} />
            )}

            {/* Project metadata — bottom left, film credit style */}
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: 'clamp(24px, 4vw, 80px)',
              zIndex: 5,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} — {project.category}
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(28px, 3.5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'white',
                lineHeight: 1,
              }}>
                {project.title}
              </div>
            </div>

            {/* View on Vimeo link */}
            <div style={{
              position: 'absolute',
              bottom: '80px',
              right: 'clamp(24px, 4vw, 80px)',
              zIndex: 5,
            }}>
              <a
                href={`https://vimeo.com/${project.vimeoId}/${project.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  paddingBottom: '2px',
                  transition: 'color 200ms, border-color 200ms',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'white';
                  (e.target as HTMLElement).style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                Watch ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Playhead — red timeline scrubber */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255,255,255,0.08)',
        zIndex: 20,
      }}>
        <div
          ref={playheadRef}
          style={{
            height: '100%',
            background: '#E8503E',
            width: `${(1 / projects.length) * 100}%`,
            transition: 'width 200ms ease',
          }}
        />
      </div>

      {/* Panel counter top-right */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: 'clamp(24px, 4vw, 80px)',
        zIndex: 20,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}>
        Showreel — {String(currentIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
      </div>
    </section>
  );
}
