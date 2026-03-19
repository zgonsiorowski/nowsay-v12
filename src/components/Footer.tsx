'use client';

export default function Footer() {
  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid #1A1A1A',
      padding: 'clamp(40px, 6vh, 64px) clamp(24px, 6vw, 120px)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '40px',
      alignItems: 'center',
    }}>
      {/* Left: brand */}
      <div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'white',
          marginBottom: '8px',
        }}>
          NOWSAY
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          letterSpacing: '0.1em',
          color: '#737373',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>
          Charlotte, NC
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          letterSpacing: '0.05em',
          color: '#404040',
        }}>
          © {new Date().getFullYear()} Nowsay Media. All rights reserved.
        </div>
      </div>

      {/* Center: empty breathing room */}
      <div />

      {/* Right: social links */}
      <div style={{
        display: 'flex',
        gap: '32px',
        justifyContent: 'flex-end',
      }}>
        {[
          { label: 'Instagram', href: 'https://instagram.com/nowsaymedia' },
          { label: 'Vimeo', href: 'https://vimeo.com/nowsaymedia' },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/nowsay' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.1em',
              color: '#737373',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = '#737373')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
