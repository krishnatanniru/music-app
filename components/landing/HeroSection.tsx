'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NOTES = ['♩', '♪', '♫', '♬', '𝄞', '𝄢']

interface FloatingNote {
  id: number
  note: string
  left: number
  delay: number
  duration: number
  size: number
  color: string
}

const NOTE_COLORS = [
  'text-purple-400',
  'text-pink-400',
  'text-blue-400',
  'text-cyan-400',
  'text-violet-300',
]

// EQ bar heights used for the waveform visual
const EQ_HEIGHTS = [
  30, 55, 80, 65, 90, 45, 70, 35, 85, 60,
  95, 50, 75, 40, 88, 62, 78, 33, 91, 57,
  68, 44, 83, 52, 72, 38, 87, 64, 76, 48,
]

export default function HeroSection() {
  const [notes, setNotes] = useState<FloatingNote[]>([])
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // Generate floating notes on the client only (avoids hydration mismatch)
    const generated: FloatingNote[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      note: NOTES[i % NOTES.length],
      left: Math.random() * 96 + 2,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 10,
      size: 14 + Math.floor(Math.random() * 20),
      color: NOTE_COLORS[i % NOTE_COLORS.length],
    }))
    setNotes(generated)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% 0%, #1a0533 0%, #0d0221 40%, #05050f 100%)',
      }}
    >
      {/* ── Animated gradient orbs ── */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          animation: 'orb-float 18s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #db2777 0%, transparent 70%)',
          animation: 'orb-float 22s ease-in-out infinite reverse',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse, #2563eb 0%, transparent 70%)',
          animation: 'orb-float 26s ease-in-out infinite',
        }}
      />

      {/* ── Floating music notes ── */}
      {mounted &&
        notes.map((n) => (
          <span
            key={n.id}
            className={`pointer-events-none absolute bottom-0 select-none font-bold ${n.color}`}
            style={{
              left: `${n.left}%`,
              fontSize: `${n.size}px`,
              opacity: 0,
              animationName: 'note-drift',
              animationDuration: `${n.duration}s`,
              animationDelay: `${n.delay}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
            }}
          >
            {n.note}
          </span>
        ))}

      {/* ── Subtle grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border"
          style={{
            background: 'rgba(168, 85, 247, 0.12)',
            borderColor: 'rgba(168, 85, 247, 0.3)',
            color: '#d8b4fe',
            animation: 'fade-up 0.6s ease both',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
              style={{ animation: 'pulse-ring 1.4s ease-out infinite' }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
          </span>
          AI-Powered Music Generation · Now in Beta
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ animation: 'fade-up 0.7s ease 0.1s both' }}
        >
          <span className="block text-white">Create Music That</span>
          <span className="shimmer-text block">Sounds Like You</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="max-w-2xl text-lg md:text-xl text-zinc-300 leading-relaxed mb-10"
          style={{ animation: 'fade-up 0.7s ease 0.2s both' }}
        >
          Generate complete songs with AI using your own cloned voice. Lyrics,
          melody, instrumentals — all in minutes.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center mb-6"
          style={{ animation: 'fade-up 0.7s ease 0.3s both' }}
        >
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
              boxShadow: '0 0 40px rgba(124, 58, 237, 0.35)',
            }}
          >
            <span>Start Creating Free</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              }}
            />
          </Link>

          <button
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/60 hover:bg-white/5 hover:scale-105"
          >
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Listen to Examples
          </button>
        </div>

        {/* Social proof */}
        <p
          className="text-sm text-zinc-500"
          style={{ animation: 'fade-up 0.7s ease 0.4s both' }}
        >
          <span className="text-zinc-300 font-medium">5,000+ songs created</span>
          {' '}·{' '}
          No credit card required
        </p>

        {/* ── Animated Equalizer Waveform ── */}
        <div
          className="mt-16 flex items-end justify-center gap-[3px] h-24 w-full max-w-lg mx-auto"
          style={{ animation: 'fade-up 0.8s ease 0.5s both' }}
          aria-hidden="true"
        >
          {EQ_HEIGHTS.map((h, i) => {
            // Vary color along the waveform
            const hue = 270 + (i / EQ_HEIGHTS.length) * 80
            const delay = (i * 0.07) % 1.8

            return (
              <div
                key={i}
                className="rounded-full origin-bottom flex-1"
                style={{
                  height: `${h}%`,
                  minWidth: '4px',
                  maxWidth: '10px',
                  background: `hsl(${hue}, 80%, 65%)`,
                  opacity: 0.85,
                  transformOrigin: 'bottom',
                  animationName: 'eq-bar',
                  animationDuration: `${0.6 + (i % 5) * 0.12}s`,
                  animationDelay: `${delay}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDirection: i % 2 === 0 ? 'alternate' : 'alternate-reverse',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500"
        style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
