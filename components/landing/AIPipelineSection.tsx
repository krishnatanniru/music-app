'use client'

import { useEffect, useRef, useState } from 'react'

interface PipelineStep {
  icon: string
  title: string
  description: string
  duration: number // ms active before advancing
  color: string
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    icon: '✍️',
    title: 'Writing Lyrics',
    description: 'AI crafts emotionally resonant verses, chorus, and bridge tailored to your prompt and language.',
    duration: 1800,
    color: '#a855f7',
  },
  {
    icon: '🎵',
    title: 'Creating Melody',
    description: 'A melodic line is composed that fits the lyrical cadence and chosen genre perfectly.',
    duration: 1600,
    color: '#ec4899',
  },
  {
    icon: '🎸',
    title: 'Generating Music',
    description: 'Full instrumentation — guitar, bass, drums, strings — rendered in studio quality.',
    duration: 2000,
    color: '#3b82f6',
  },
  {
    icon: '🎤',
    title: 'Synthesizing Voice',
    description: 'Your cloned voice model sings every syllable with accurate pitch, timing, and emotion.',
    duration: 2200,
    color: '#06b6d4',
  },
  {
    icon: '🎛️',
    title: 'Mixing',
    description: 'Vocals, instruments, and effects are balanced for a professional stereo mix.',
    duration: 1400,
    color: '#10b981',
  },
  {
    icon: '💿',
    title: 'Mastering',
    description: 'Final loudness normalization, EQ polish, and stereo enhancement for streaming platforms.',
    duration: 1200,
    color: '#f59e0b',
  },
  {
    icon: '🎉',
    title: 'Finalizing Song',
    description: 'Your song is packaged with cover art, metadata, and exported as MP3, WAV, or stems.',
    duration: 1000,
    color: '#f43f5e',
  },
]

export default function AIPipelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepRef = useRef(0)

  // Start animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.25 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  // Run through steps sequentially once hasStarted
  useEffect(() => {
    if (!hasStarted) return

    function advance() {
      const step = stepRef.current
      if (step >= PIPELINE_STEPS.length) {
        // Loop: reset after a pause
        timerRef.current = setTimeout(() => {
          stepRef.current = 0
          setActiveStep(-1)
          setCompletedSteps(new Set())
          timerRef.current = setTimeout(advance, 600)
        }, 2500)
        return
      }

      setActiveStep(step)
      timerRef.current = setTimeout(() => {
        setCompletedSteps((prev) => new Set(prev).add(step))
        stepRef.current = step + 1
        timerRef.current = setTimeout(advance, 200)
      }, PIPELINE_STEPS[step].duration)
    }

    timerRef.current = setTimeout(advance, 400)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [hasStarted])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #05050f 0%, #0f0520 50%, #05050f 100%)',
      }}
    >
      {/* Decorative orb */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
            Under The Hood
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Watch the Magic Happen
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Our 7-step AI pipeline handles everything — from blank page to finished song.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical track */}
          <div
            className="pointer-events-none absolute left-8 top-0 bottom-0 w-px md:left-12"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            aria-hidden="true"
          />

          {PIPELINE_STEPS.map((step, i) => {
            const isActive = activeStep === i
            const isDone = completedSteps.has(i)

            return (
              <div
                key={i}
                className="relative flex gap-6 md:gap-10 pb-10 last:pb-0"
              >
                {/* Circle node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all duration-500"
                    style={{
                      background: isDone
                        ? `radial-gradient(circle, ${step.color}33, ${step.color}11)`
                        : isActive
                        ? `radial-gradient(circle, ${step.color}44, ${step.color}11)`
                        : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${
                        isDone
                          ? step.color
                          : isActive
                          ? `${step.color}cc`
                          : 'rgba(255,255,255,0.08)'
                      }`,
                      boxShadow: isActive ? `0 0 30px ${step.color}55` : isDone ? `0 0 16px ${step.color}33` : 'none',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {isDone ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={step.color}
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <span style={{ filter: isActive ? 'none' : 'grayscale(0.7) opacity(0.5)' }}>
                        {step.icon}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 glass-card rounded-2xl p-5 md:p-6 transition-all duration-500"
                  style={{
                    borderColor: isActive
                      ? `${step.color}55`
                      : isDone
                      ? `${step.color}22`
                      : 'rgba(255,255,255,0.06)',
                    boxShadow: isActive ? `0 0 40px ${step.color}22` : 'none',
                    opacity: !hasStarted || isActive || isDone ? 1 : 0.45,
                  }}
                >
                  {/* Step header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: step.color }}
                    >
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    {isDone && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${step.color}22`, color: step.color }}
                      >
                        Complete
                      </span>
                    )}
                    {isActive && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${step.color}22`, color: step.color }}
                      >
                        Processing…
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-lg font-bold mb-1 transition-colors duration-300"
                    style={{ color: isActive || isDone ? '#fff' : '#94a3b8' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Progress bar */}
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full transition-none"
                      style={{
                        width: isDone ? '100%' : isActive ? '100%' : '0%',
                        background: `linear-gradient(90deg, ${step.color}, ${step.color}aa)`,
                        transition: isActive
                          ? `width ${step.duration}ms linear`
                          : isDone
                          ? 'none'
                          : 'none',
                        transitionDelay: isActive ? '0ms' : '0ms',
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
