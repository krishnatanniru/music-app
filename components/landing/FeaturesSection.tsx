'use client';

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  glow: string
  bgGlow: string
}

const MicIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
)

const FileTextIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const MusicIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
  </svg>
)

const LayersIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>
)

const SlidersIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
)

const Share2Icon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
)

const FEATURES: Feature[] = [
  {
    icon: <MicIcon />,
    title: 'AI Voice Cloning',
    description: 'Clone your voice in minutes with just 3–10 minutes of audio. Your unique timbre, your songs.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.35)',
    bgGlow: 'rgba(59,130,246,0.06)',
  },
  {
    icon: <FileTextIcon />,
    title: 'Smart Lyrics',
    description: 'AI writes emotionally resonant lyrics in 12 languages. From heartbreak to devotion.',
    color: 'text-purple-400',
    glow: 'rgba(168,85,247,0.35)',
    bgGlow: 'rgba(168,85,247,0.06)',
  },
  {
    icon: <MusicIcon />,
    title: 'Full Instrumentation',
    description: 'Complete orchestration: guitar, drums, strings, piano and more — all AI-composed.',
    color: 'text-pink-400',
    glow: 'rgba(236,72,153,0.35)',
    bgGlow: 'rgba(236,72,153,0.06)',
  },
  {
    icon: <LayersIcon />,
    title: 'Genre Mastery',
    description: '12 distinct genres from Pop to Cinematic to Devotional. Each with its own authentic sound.',
    color: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.35)',
    bgGlow: 'rgba(34,211,238,0.06)',
  },
  {
    icon: <SlidersIcon />,
    title: 'Studio Mixer',
    description: 'Fine-tune every track: vocals, bass, reverb, tempo, and key — a full studio in your browser.',
    color: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.35)',
    bgGlow: 'rgba(52,211,153,0.06)',
  },
  {
    icon: <Share2Icon />,
    title: 'Community & Sharing',
    description: 'Share your creations, follow artists, go viral. Your audience is waiting.',
    color: 'text-orange-400',
    glow: 'rgba(251,146,60,0.35)',
    bgGlow: 'rgba(251,146,60,0.06)',
  },
]

export default function FeaturesSection() {
  return (
    <section
      className="relative py-28 px-4"
      style={{
        background:
          'linear-gradient(180deg, #05050f 0%, #0a0520 50%, #05050f 100%)',
      }}
    >
      {/* Decorative top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05050f] to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Everything You Need to Create
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Professional-grade AI tools, no music experience required.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 cursor-default"
              style={{
                background: feature.bgGlow,
                // hover glow handled via inline style + group
              }}
              onMouseEnter={() => {}}
            >
              {/* Icon container */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `rgba(255,255,255,0.05)`,
                  boxShadow: `0 0 24px ${feature.glow}`,
                  border: `1px solid ${feature.glow.replace('0.35', '0.2')}`,
                }}
              >
                <span className={feature.color}>{feature.icon}</span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className="mt-auto h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${feature.glow}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05050f] to-transparent" />
    </section>
  )
}
