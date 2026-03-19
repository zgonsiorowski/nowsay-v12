'use client';

import { clients } from '@/lib/data';

export default function ClientsSection() {
  return (
    <section style={{
      background: '#F5F0EB',
      padding: 'clamp(60px, 8vh, 120px) clamp(24px, 6vw, 120px)',
      borderTop: '1px solid #D4CFC8',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: '#6B6560',
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}>
        Clients
      </div>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(12px, 1.2vw, 15px)',
        letterSpacing: '0.1em',
        color: '#6B6560',
        textTransform: 'uppercase',
        lineHeight: 2,
        wordBreak: 'break-word',
      }}>
        {clients.join(' \u2014 ')}
      </p>
    </section>
  );
}
