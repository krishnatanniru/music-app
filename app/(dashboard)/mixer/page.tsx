'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Play, Square, Volume2 } from 'lucide-react';
import styles from './Mixer.module.css';

// ── Types ────────────────────────────────────────────────────
interface Channel {
  id: string;
  name: string;
  volume: number;   // 0–100
  muted: boolean;
  peakLevel: number; // 0–18 segments
}

interface EQSettings {
  bassBoost: number;
  treble: number;
  reverb: number;
  compression: number;
}

// ── Initial Channel Data ─────────────────────────────────────
const INITIAL_CHANNELS: Channel[] = [
  { id: 'vocals',      name: 'Vocals',      volume: 80, muted: false, peakLevel: 12 },
  { id: 'instruments', name: 'Instruments', volume: 70, muted: false, peakLevel: 10 },
  { id: 'bass',        name: 'Bass',        volume: 65, muted: false, peakLevel: 8  },
  { id: 'drums',       name: 'Drums',       volume: 75, muted: false, peakLevel: 14 },
  { id: 'fx',          name: 'FX',          volume: 45, muted: false, peakLevel: 6  },
  { id: 'master',      name: 'Master',      volume: 90, muted: false, peakLevel: 16 },
];

const EQ_LABELS: { key: keyof EQSettings; label: string }[] = [
  { key: 'bassBoost',    label: 'Bass Boost'   },
  { key: 'treble',       label: 'Treble'       },
  { key: 'reverb',       label: 'Reverb'       },
  { key: 'compression',  label: 'Compression'  },
];

// ── Peak Meter Segment Colours ────────────────────────────────
function segmentColor(index: number, total: number): string {
  const pct = index / total;
  if (pct > 0.85) return '#ef4444'; // red – clip zone
  if (pct > 0.65) return '#f59e0b'; // amber – hot
  return '#10b981';                  // green – safe
}

// ── PeakMeter Component ───────────────────────────────────────
function PeakMeter({ level }: { level: number }) {
  const SEGMENTS = 18;
  return (
    <div className={styles.peakMeter} aria-hidden="true">
      {Array.from({ length: SEGMENTS }, (_, i) => {
        const active = i < level;
        const color  = segmentColor(i, SEGMENTS);
        return (
          <div
            key={i}
            className={`${styles.peakSegment} ${active ? styles.peakSegmentActive : ''}`}
            style={active ? { background: color, color } : undefined}
          />
        );
      })}
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────
export default function MixerPage() {
  const [channels, setChannels]       = useState<Channel[]>(INITIAL_CHANNELS);
  const [eq, setEQ]                   = useState<EQSettings>({ bassBoost: 50, treble: 50, reverb: 30, compression: 40 });
  const [masterVolume, setMasterVolume] = useState(80);
  const [isPlaying, setIsPlaying]     = useState(false);

  // Animate peak meters when playing
  const rafRef = useRef<number | null>(null);

  const animatePeaks = useCallback(() => {
    setChannels(prev =>
      prev.map(ch => {
        if (ch.muted) return { ...ch, peakLevel: 0 };
        const base     = Math.round((ch.volume / 100) * 16);
        const jitter   = Math.round((Math.random() - 0.5) * 4);
        const newLevel = Math.max(0, Math.min(18, base + jitter));
        return { ...ch, peakLevel: newLevel };
      })
    );
    rafRef.current = requestAnimationFrame(() => {
      setTimeout(animatePeaks, 100);
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animatePeaks();
    } else {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      setChannels(prev => prev.map(ch => ({ ...ch, peakLevel: ch.muted ? 0 : Math.round((ch.volume / 100) * 14) })));
    }
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, animatePeaks]);

  const updateVolume = (id: string, value: number) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, volume: value } : ch));
  };

  const toggleMute = (id: string) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, muted: !ch.muted } : ch));
  };

  const updateEQ = (key: keyof EQSettings, value: number) => {
    setEQ(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Music Mixer</h1>
        <p className={styles.subtitle}>Fine-tune every channel with precision controls</p>
      </div>

      {/* ── Channel Grid ── */}
      <div className={styles.channelGrid}>
        {channels.map(ch => (
          <div
            key={ch.id}
            className={`${styles.channelStrip} ${ch.muted ? styles.channelStripMuted : ''}`}
          >
            {/* Name */}
            <span className={styles.channelName}>{ch.name}</span>

            {/* Fader + Peak Meter */}
            <div className={styles.faderArea}>
              <div className={styles.faderWrap}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ch.volume}
                  onChange={e => updateVolume(ch.id, Number(e.target.value))}
                  className={styles.faderVertical}
                  aria-label={`${ch.name} volume`}
                  style={{ writingMode: 'vertical-lr', direction: 'rtl' } as React.CSSProperties}
                />
              </div>
              <PeakMeter level={ch.peakLevel} />
            </div>

            {/* Volume % */}
            <div className={styles.volumeDisplay}>{ch.volume}%</div>

            {/* Mute Toggle */}
            <button
              onClick={() => toggleMute(ch.id)}
              className={`${styles.muteBtn} ${ch.muted ? styles.muteBtnActive : ''}`}
              aria-label={ch.muted ? `Unmute ${ch.name}` : `Mute ${ch.name}`}
              title={ch.muted ? 'Unmute' : 'Mute'}
            >
              {ch.muted
                ? <MicOff size={14} />
                : <Mic size={14} />
              }
            </button>
          </div>
        ))}
      </div>

      {/* ── EQ / Effects Section ── */}
      <div className={styles.eqSection}>
        <p className={styles.eqTitle}>Effects & EQ</p>
        <div className={styles.eqGrid}>
          {EQ_LABELS.map(({ key, label }) => (
            <div key={key} className={styles.eqControl}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={styles.eqLabel}>{label}</span>
                <span className={styles.eqValue}>{eq[key]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={eq[key]}
                onChange={e => updateEQ(key, Number(e.target.value))}
                className={styles.sliderHorizontal}
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Master Section ── */}
      <div className={styles.masterSection}>
        {/* Play/Stop */}
        <button
          onClick={() => setIsPlaying(p => !p)}
          className={styles.playStopBtn}
          aria-label={isPlaying ? 'Stop mix' : 'Play mix'}
        >
          {isPlaying
            ? <><Square size={16} fill="white" /> Stop</>
            : <><Play  size={16} fill="white" /> Play Mix</>
          }
        </button>

        {/* Master Volume */}
        <span className={styles.masterLabel}><Volume2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Master</span>
        <div className={styles.masterSliderWrap}>
          <input
            type="range"
            min={0}
            max={100}
            value={masterVolume}
            onChange={e => setMasterVolume(Number(e.target.value))}
            className={styles.masterSlider}
            aria-label="Master volume"
          />
          <span className={styles.masterValue}>{masterVolume}%</span>
        </div>
      </div>
    </div>
  );
}
