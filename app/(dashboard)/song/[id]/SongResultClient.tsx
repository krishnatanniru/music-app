'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Play,
  Pause,
  Download,
  Share2,
  Edit3,
  Sliders,
  Volume2,
  Heart,
  ChevronDown,
  ArrowLeft,
  Play as PlayIcon,
  BarChart2,
  Clock,
  Zap,
  Tag,
  Music2,
  Eye,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import styles from './SongResult.module.css';
import type { Song } from '@/lib/types';

/* ── Mock song data (replace with real fetch in production) ── */
function getMockSong(id: string): Song {
  return {
    id,
    title: 'Neon Dreams at Midnight',
    prompt: 'A dreamy electronic track with lush synth pads and a melancholic melody, perfect for a late-night city drive',
    genre: 'electronic',
    mood: 'dreamy',
    tempo: 'medium',
    key: 'A minor',
    language: 'english',
    duration: 212,
    bpm: 98,
    lyrics: [
      {
        id: 'intro-1',
        type: 'intro',
        title: 'Intro',
        content: 'The city breathes at midnight\nNeon signs flicker like dreams\nI walk these empty sidewalks\nLost in electric streams',
        lineCount: 4,
        order: 0,
      },
      {
        id: 'verse-1',
        type: 'verse',
        title: 'Verse 1',
        content: 'Streetlights paint the pavement gold\nEvery shadow tells a story untold\nSynths cascade like waterfalls of light\nI lose myself in this electric night\n\nMemories flicker on glass facades\nEchoes of a love that somehow fades\nBut here beneath these neon-kissed skies\nI see the world through different eyes',
        lineCount: 8,
        order: 1,
      },
      {
        id: 'chorus-1',
        type: 'chorus',
        title: 'Chorus',
        content: 'Neon dreams at midnight\nPulse through every vein\nNeon dreams at midnight\nWash away the pain\nFloat above the city\nLet the music take you higher\nNeon dreams at midnight\nSet your soul on fire',
        lineCount: 8,
        order: 2,
      },
      {
        id: 'bridge-1',
        type: 'bridge',
        title: 'Bridge',
        content: 'We are made of starlight and static\nCaught between the real and the magic\nIn this infinite loop of sensation\nWe find our perfect constellation',
        lineCount: 4,
        order: 3,
      },
      {
        id: 'outro-1',
        type: 'outro',
        title: 'Outro',
        content: `Dawn is breaking, the city wakes\nBut these neon dreams I'll keep\nUntil we meet again tonight\nUnder the glow so deep...`,
        lineCount: 4,
        order: 4,
      },
    ],
    audioUrl: null,
    instrumentalUrl: null,
    vocalsUrl: null,
    coverArtUrl: null,
    thumbnailUrl: null,
    waveformData: Array.from({ length: 60 }, () => Math.random() * 0.8 + 0.1),
    voiceProfileId: null,
    status: 'ready',
    jobId: null,
    plays: 1248,
    likes: 342,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1',
    isPublic: true,
    tags: ['electronic', 'synthwave', 'dreamy', 'midnight', 'city-pop', 'lo-fi'],
  };
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

interface SongResultClientProps {
  id: string;
}

export default function SongResultClient({ id }: SongResultClientProps) {
  const router = useRouter();
  const song = getMockSong(id);

  /* ── Player state ─────────────────────────────────────────── */
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);           // 0–100
  const [currentTime, setCurrentTime] = useState(0);     // seconds
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Lyrics panel ─────────────────────────────────────────── */
  const [lyricsExpanded, setLyricsExpanded] = useState(true);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ── Simulated playback (no real audio src) ──────────────── */
  const totalDuration = song.duration;

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return t + 0.5;
        });
      }, 500);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, totalDuration]);

  useEffect(() => {
    setProgress((currentTime / totalDuration) * 100);
  }, [currentTime, totalDuration]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.round(pct * totalDuration));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const playedBars = Math.round((progress / 100) * song.waveformData.length);

  return (
    <div className={styles.page}>
      {/* Back button */}
      <motion.button
        className={styles.backBtn}
        onClick={() => router.back()}
        whileHover={{ x: -3 }}
        transition={{ duration: 0.15 }}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </motion.button>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cover Art */}
        <motion.div
          className={styles.coverArt}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className={styles.coverPulse} />
          <Music size={80} className={styles.coverIcon} />
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Ready
          </span>
        </motion.div>

        {/* Info */}
        <div className={styles.heroInfo}>
          <motion.h1
            className={styles.songTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {song.title}
          </motion.h1>

          {/* Badges */}
          <motion.div
            className={styles.badgeRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`${styles.badge} ${styles.badgeGenre}`}>
              <Music2 size={11} /> {song.genre}
            </span>
            <span className={`${styles.badge} ${styles.badgeMood}`}>
              {song.mood}
            </span>
            <span className={`${styles.badge} ${styles.badgeTempo}`}>
              {song.tempo}
            </span>
            <span className={`${styles.badge} ${styles.badgeKey}`}>
              {song.key}
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { label: 'Plays',    value: formatCount(song.plays) },
              { label: 'Likes',    value: formatCount(song.likes) },
              { label: 'Duration', value: formatDuration(song.duration) },
              { label: 'BPM',      value: song.bpm.toString() },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className={styles.actionButtons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
              <Download size={15} />
              Download
            </button>
            <button className={styles.actionBtn} onClick={handleShare}>
              <Share2 size={15} />
              Share
            </button>
            <Link
              href={`/song/${id}/lyrics`}
              className={styles.actionBtn}
              style={{ textDecoration: 'none' }}
            >
              <Edit3 size={15} />
              Edit Lyrics
            </Link>
            <button className={styles.actionBtn}>
              <Sliders size={15} />
              Open Mixer
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => setLiked((l) => !l)}
              style={liked ? { color: '#ec4899', borderColor: 'rgba(236,72,153,0.4)' } : {}}
            >
              <Heart size={15} fill={liked ? '#ec4899' : 'none'} />
              {liked ? 'Liked' : 'Like'}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Audio Player ─────────────────────────────────────── */}
      <motion.div
        className={styles.playerSection}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <p className={styles.playerTitle}>Now Playing</p>

        {/* Waveform */}
        <div className={styles.waveform} style={{ marginBottom: '1rem' }}>
          {song.waveformData.map((h, i) => (
            <div
              key={i}
              className={`${styles.waveBar} ${i < playedBars ? styles.played : ''}`}
              style={{ height: `${h * 100}%` }}
              onClick={() => setCurrentTime(Math.round((i / song.waveformData.length) * totalDuration))}
            />
          ))}
        </div>

        <div className={styles.playerControls}>
          {/* Play/Pause */}
          <button className={styles.playBtn} onClick={handlePlayPause}>
            {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
          </button>

          {/* Progress */}
          <div className={styles.progressArea}>
            <div className={styles.progressTrack} onClick={handleProgressClick}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.timeRow}>
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className={styles.volumeArea}>
            <Volume2 size={16} />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={styles.volumeSlider}
            />
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={song.audioUrl ?? undefined} preload="none" />
      </motion.div>

      {/* ── Stats & Tags Grid ─────────────────────────────────── */}
      <div className={styles.gridSection}>
        {/* Stats Card */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>
              <BarChart2 size={15} className={styles.panelIcon} />
              Track Stats
            </span>
          </div>
          <div className={styles.statsGrid}>
            {[
              { icon: <Eye size={14} />,      label: 'Total Plays',  value: formatCount(song.plays) },
              { icon: <Heart size={14} />,     label: 'Likes',        value: formatCount(song.likes) },
              { icon: <Clock size={14} />,     label: 'Duration',     value: formatDuration(song.duration) },
              { icon: <Zap size={14} />,       label: 'BPM',          value: song.bpm.toString() },
              { icon: <Music2 size={14} />,    label: 'Genre',        value: song.genre },
              { icon: <Music size={14} />,     label: 'Key',          value: song.key },
            ].map((item) => (
              <div key={item.label} className={styles.statCard}>
                <span className={styles.statCardIcon}>{item.icon}</span>
                <span className={styles.statCardValue}>{item.value}</span>
                <span className={styles.statCardLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tags Card */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>
              <Tag size={15} className={styles.panelIcon} />
              Tags &amp; Info
            </span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem', fontWeight: 600 }}>
              Tags
            </p>
            <div className={styles.tagsRow}>
              {song.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem', fontWeight: 600 }}>
              Prompt
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
              &ldquo;{song.prompt}&rdquo;
            </p>
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link
              href={`/song/${id}/lyrics`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#a855f7',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
            >
              <ExternalLink size={13} />
              Open Full Lyrics Editor
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Lyrics Preview Panel ──────────────────────────────── */}
      <motion.div
        className={styles.lyricsPanel}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div
          className={styles.lyricsPanelHeader}
          onClick={() => setLyricsExpanded((v) => !v)}
        >
          <span className={styles.lyricsPanelTitle}>
            <Music2 size={15} style={{ color: '#a855f7' }} />
            Lyrics Preview
          </span>
          <ChevronDown
            size={18}
            className={`${styles.lyricsChevron} ${lyricsExpanded ? styles.expanded : ''}`}
          />
        </div>

        <AnimatePresence initial={false}>
          {lyricsExpanded && (
            <motion.div
              key="lyrics-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className={styles.lyricsPanelBody}>
                {/* Show first two sections */}
                {song.lyrics.slice(0, 2).map((section) => (
                  <div key={section.id} className={styles.lyricsSection}>
                    <p className={styles.lyricsSectionLabel}>{section.title}</p>
                    <p className={styles.lyricsText}>{section.content}</p>
                  </div>
                ))}

                <Link href={`/song/${id}/lyrics`} className={styles.viewAllBtn}>
                  <Edit3 size={13} />
                  View &amp; Edit All Lyrics
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Share copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className={styles.copied}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            ✓ Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
