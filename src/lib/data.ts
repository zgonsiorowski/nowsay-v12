export const projects = [
  { id: "new-age-athlete",       title: "New Age Athlete",        category: "Brand Film",   vimeoId: "1109413902", hash: "bd4c361b90" },
  { id: "mt-olive-pickles",      title: "Mt. Olive Pickles",      category: "Commercial",   vimeoId: "1053521156", hash: "d1d259ec39" },
  { id: "collins-aerospace",     title: "Collins Aerospace",      category: "Corporate",    vimeoId: "1053521126", hash: "ac50c1494f" },
  { id: "volvo-trucks",          title: "Volvo Trucks",           category: "Brand Film",   vimeoId: "1053521241", hash: "d9574dd1f5" },
  { id: "carolina-east-medical", title: "Carolina East Medical",  category: "Healthcare",   vimeoId: "1053521082", hash: "81cfc321d1" },
  { id: "innovate-energy",       title: "Innovate Energy Group",  category: "Corporate",    vimeoId: "1053521067", hash: "70d4e265a5" },
  { id: "dalton-sargeant",       title: "Dalton Sargeant",        category: "Documentary",  vimeoId: "1053521146", hash: "ea9575e29f" },
  { id: "go-ski-nc",             title: "Go Ski NC",              category: "Tourism",      vimeoId: "1053521194", hash: "1cb826447e" },
  { id: "peter-millar",          title: "Peter Millar",           category: "Lifestyle",    vimeoId: "1053521218", hash: "8ad0fb6ff8" },
  { id: "coca-cola-panthers",    title: "Coca-Cola / Panthers",   category: "Sports",       vimeoId: "1053521203", hash: "3391089493" },
  { id: "crowntown-landscapes",  title: "Crown Town Landscapes",  category: "Commercial",   vimeoId: "1053521234", hash: "0758a848ca" },
] as const;

export const services = [
  {
    title: "Video Strategy",
    tagline: "Vision Before Production",
    description: "Every great film starts with a clear vision. We define objectives, identify audiences, and craft content strategy that drives measurable results. No camera rolls until the strategy is locked.",
    details: ["Brand audit & content gap analysis", "Audience persona development", "Content calendar & distribution strategy", "ROI framework & KPI definition"],
  },
  {
    title: "Video Production",
    tagline: "From Script to Screen",
    description: "Full-service production with cinema-grade equipment and crews who've worked on national campaigns. Pre-production through post — color grading, sound design, motion graphics.",
    details: ["Scriptwriting & storyboarding", "Multi-camera 4K/6K production", "Professional color grading", "Sound design & mixing", "Motion graphics & VFX"],
  },
  {
    title: "Specialized Content",
    tagline: "Beyond Traditional Video",
    description: "Animated explainers, product demos, training series, testimonial packages — specialized formats that require deep expertise and creative problem-solving.",
    details: ["2D & 3D animation", "Product demonstration videos", "Training & onboarding series", "Testimonial & case study packages"],
  },
  {
    title: "Social Media Videos",
    tagline: "Scroll-Stopping Content",
    description: "Platform-native content engineered for engagement. Vertical, square, horizontal — optimized for every feed algorithm. Short-form that punches above its weight.",
    details: ["Platform-specific content optimization", "Reels, Shorts & TikTok production", "Social-first storytelling", "Trend analysis & rapid response"],
  },
  {
    title: "Social Posting & Automation",
    tagline: "Consistent Presence, Zero Effort",
    description: "We don't just create the content — we deploy it. Scheduling, posting, community management, and analytics reporting across all platforms.",
    details: ["Content scheduling & publishing", "Community engagement & management", "Analytics & performance reporting", "Audience growth strategy"],
  },
  {
    title: "Retainer Packages",
    tagline: "Your Production Team on Call",
    description: "Monthly retainers give you priority scheduling, consistent brand voice, and economies of scale that one-off projects can't match.",
    details: ["Dedicated creative team", "Priority scheduling & fast turnaround", "Monthly content planning sessions", "Volume pricing & budget predictability"],
  },
  {
    title: "Drone & Aerial",
    tagline: "Perspectives That Elevate",
    description: "FAA-certified drone pilots with cinema-grade aerial rigs. From sweeping landscape reveals to precise real estate flythroughs.",
    details: ["FAA Part 107 certified pilots", "4K aerial cinematography", "FPV drone capabilities", "Real estate & construction aerials"],
  },
  {
    title: "Photography",
    tagline: "Moments, Frozen in Light",
    description: "The same cinematic eye we bring to motion, applied to stills. Brand photography, headshots, product shoots, and event coverage.",
    details: ["Brand & lifestyle photography", "Corporate headshots & team photos", "Product photography", "Event coverage"],
  },
] as const;

export const testimonials = [
  {
    quote: "Nowsay transformed how our customers experience our brand. The quality of their work rivals agencies three times their size — and they're genuinely great people to work with.",
    author: "Director of Marketing",
    company: "Coca-Cola Consolidated",
  },
  {
    quote: "They took our vision and elevated it beyond anything we imagined. The final product didn't just meet our goals — it redefined them.",
    author: "Owner",
    company: "Crowntown Landscapes",
  },
  {
    quote: "Working with Nowsay is like working with a creative partner, not a vendor. They challenge our thinking, push boundaries, and consistently deliver beyond expectations.",
    author: "Owner",
    company: "Sumner Group",
  },
  {
    quote: "The team at Nowsay brought a level of storytelling to our organization that we didn't know was possible. They captured the heart of our mission beautifully.",
    author: "Director of Marketing",
    company: "Jeff Gordon Children's Foundation",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Schedule a Call",
    description: "Every great project starts with a conversation. Tell us about your brand, your vision, and your goals. We'll listen, ask the right questions, and determine if we're the right fit.",
    detail: "15 minutes. No pitch. Just a real conversation about what you need.",
  },
  {
    number: "02",
    title: "Creative Treatment",
    description: "We develop a full creative treatment — concept, visual approach, shot list, timeline, and budget. You'll see exactly what we're building before a single camera rolls.",
    detail: "A complete blueprint. No surprises. No scope creep.",
  },
  {
    number: "03",
    title: "Production & Delivery",
    description: "We bring the vision to life with precision production, meticulous post-production, and final delivery in every format you need. On time. On budget. Beyond expectations.",
    detail: "From first frame to final cut — every detail matters.",
  },
] as const;

export const clients = [
  "Coca-Cola Consolidated",
  "Toyota",
  "Collins Aerospace",
  "Volvo Trucks",
  "Peter Millar",
  "Jeff Gordon Foundation",
  "Mt. Olive Pickles",
] as const;
