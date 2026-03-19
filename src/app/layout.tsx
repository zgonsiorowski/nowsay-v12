import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nowsay — Charlotte Video Production',
  description: 'Nowsay is a Charlotte, NC video production agency. Utilizing a results-driven approach, we help businesses connect, engage, and thrive in a digital world.',
  openGraph: {
    title: 'Nowsay — Charlotte Video Production',
    description: 'Award-quality video production in Charlotte, NC. Brand films, commercials, corporate video, aerial, and more.',
    url: 'https://nowsay.com',
    siteName: 'Nowsay',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
