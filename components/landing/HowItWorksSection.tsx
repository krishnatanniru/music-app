// Server Component — no 'use client' needed

const steps = [
  {
    number: '01',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Clone Your Voice',
    description: 'Upload 3+ minutes of your speaking or singing audio. Our AI captures every nuance of your vocal identity.',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    number: '02',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: 'Describe Your Song',
    description: 'Write a prompt describing your vision — mood, theme, language, style. "A romantic Hindi ballad with piano."',
    color: '#db2777',
    glow: 'rgba(219,39,119,0.4)',
  },
  {
    number: '03',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'AI Generates',
    description: 'Our 7-step AI pipeline writes lyrics, composes melody, creates instrumentation, synthesizes your voice — simultaneously.',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
  },
  {
    number: '04',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: 'Download & Share',
    description: 'Export your song as MP3, WAV, or individual stems. Plus auto-generated cover art. Share with one click.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
  },
]

export default function HowItWorksSection() {
  return (
    <section
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #05050f 0%, #080318 100%)' }}
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Create a Song in 4 Steps
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            From idea to finished song — faster than writing a single verse by hand.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block pointer-events-none absolute top-14 left-[12.5%] right-[12.5%] h-px"
            style={{
              background: 'linear-gradient(90deg, #7c3aed, #db2777, #0ea5e9, #10b981)',
              opacity: 0.35,
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group relative">
              {/* Step number badge */}
              <div
                className="relative z-10 w-28 h-28 rounded-2xl flex flex-col items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${step.glow.replace('0.4', '0.2')}`,
                  boxShadow: `0 0 40px ${step.glow}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  className="text-xs font-bold mb-1 tracking-widest"
                  style={{ color: step.color }}
                >
                  STEP {step.number}
                </span>
                <span style={{ color: step.color }}>{step.icon}</span>

                {/* Pulse ring on hover */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 0 4px ${step.glow.replace('0.4', '0.15')}`,
                  }}
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-[220px]">
                {step.description}
              </p>

              {/* Mobile connector arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden mt-6 mb-2 text-zinc-600">
                  <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
