# Nowsay v12 — Builder Instructions

You are building a single-page video production company portfolio site for Nowsay (Charlotte, NC).
This must look like it was built by a top design studio — not an AI. GSAP + Lenis scroll architecture mandatory.

## Git Config
```
user.email: zgonsiorowski@xobiz.com
user.name: zgonsiorowski
```

## The Design

### Two Worlds
1. DARK ROOM (#000000): Hero, portfolio reel, contact — cinema
2. BRIGHT ROOM (#F5F0EB): Services, testimonials, process — trust

### Typography
- Headlines: Space Grotesk, 700 weight, tight negative tracking
- Body: Inter, 18px 
- Labels: JetBrains Mono, 12px uppercase
- Load from Google Fonts

### Colors
- Dark bg: #000000, text: #FFFFFF, secondary: #737373
- Bright bg: #F5F0EB, text: #1A1A1A, secondary: #6B6560
- Accent: #E8503E (MAX 5 uses total — CTA button, playhead, active states)

### BANNED
- Fade-up animations (opacity + translateY)
- Framer Motion
- Gold accents, film grain, rounded video boxes
- Testimonial carousels
- Centered headers with subtitle-above-title lockup
- Bounce/elastic entrance animations
