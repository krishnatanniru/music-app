'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Music2,
  Mic2,
  Play,
  Zap,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Clock,
  Headphones,
  Library,
} from 'lucide-react';
import styles from './Dashboard.module.css';

/* ─── Mock data ─────────────────────────────────────────── */
const stats = [
  {
    label: 'Total Songs',
    value: '12',
    icon: Music2,
    colorClass: styles.statIconBlue,
    sparkColor: '#4f8dff',
    bars: [40, 55, 35, 70, 60],
    trend: '+3 this week',
    trendUp: true,
  },
  {
    label: 'Voice Profiles',
    value: '3',
    icon: Mic2,
    colorClass: styles.statIconPurple,
    sparkColor: '#a855f7',
    bars: [60, 40, 80, 50, 90],
    trend: '+1 new',
    trendUp: true,
  },
  {
    label: 'Total Plays',
    value: '1,248',
    icon: Headphones,
    colorClass: styles.statIconPink,
    sparkColor: '#ec4899',
    bars: [30, 55, 45, 80, 65],
    trend: '+124 today',
    trendUp: true,
  },
  {
    label: 'Credits',
    value: '45',
    icon: Zap,
    colorClass: styles.statIconGreen,
    sparkColor: '#10b981',
    bars: [90, 75, 60, 50, 45],
    trend: '–5 used',
    trendUp: false,
  },
];

const quickActions = [
  {
    label: 'Create Song',
    href: '/song/create',
    desc: 'Generate a new AI-powered track with custom voice, genre, and mood.',
    iconClass: styles.iconCreate,
    glowClass: styles.glowCreate,
    Icon: Music2,
  },
  {
    label: 'Voice Library',
    href: '/voice-library',
    desc: 'Manage and train your custom AI voice profiles for unique vocals.',
    iconClass: styles.iconVoice,
    glowClass: styles.glowVoice,
    Icon: Library,
  },
  {
    label: 'AI Chat',
    href: '/chat',
    desc: 'Chat with your AI music assistant for creative ideas and lyrics.',
    iconClass: styles.iconChat,
    glowClass: styles.glowChat,
    Icon: MessageSquare,
  },
];

const recentSongs = [
  {
    title: 'Neon Skyline',
    genre: 'Electronic',
    genreColor: '#4f8dff',
    duration: '3:24',
    plays: 342,
    emoji: '🌃',
    bg: 'linear-gradient(135deg, #1e3a5f, #0d1a3a)',
  },
  {
    title: 'Midnight Reverie',
    genre: 'Ambient',
    genreColor: '#a855f7',
    duration: '4:11',
    plays: 218,
    emoji: '🌙',
    bg: 'linear-gradient(135deg, #2d1b4e, #1a0d33)',
  },
  {
    title: 'Fire & Rain',
    genre: 'Pop',
    genreColor: '#ec4899',
    duration: '2:58',
    plays: 512,
    emoji: '🔥',
    bg: 'linear-gradient(135deg, #4e1b2d, #330d1a)',
  },
  {
    title: 'Urban Pulse',
    genre: 'Hip-Hop',
    genreColor: '#10b981',
    duration: '3:45',
    plays: 89,
    emoji: '🎤',
    bg: 'linear-gradient(135deg, #1b4e2d, #0d331a)',
  },
  {
    title: 'Crystal Echoes',
    genre: 'Cinematic',
    genreColor: '#06b6d4',
    duration: '5:02',
    plays: 67,
    emoji: '💎',
    bg: 'linear-gradient(135deg, #1b3a4e, #0d2233)',
  },
];

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ─── Component ──────────────────────────────────────────── */
export default function DashboardPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* ── Welcome Banner ─────────────────────────────────── */}
      <motion.div variants={itemVariants} className={styles.welcomeBanner}>
        <div className={styles.welcomeBannerBg} />
        <div className={styles.welcomeBannerOrbs}>
          <div className={`${styles.orb} ${styles.orbBlue}`} />
          <div className={`${styles.orb} ${styles.orbPurple}`} />
          <div className={`${styles.orb} ${styles.orbPink}`} />
        </div>
        <div className={styles.welcomeContent}>
          <p className={styles.welcomeGreeting}>👋 Welcome back</p>
          <h1 className={styles.welcomeTitle}>Your Music Studio Awaits</h1>
          <p className={styles.welcomeSubtitle}>
            Create, remix, and share AI-powered music that sounds uniquely you.
          </p>
          <div className={styles.welcomeBadge}>
            <span className={styles.welcomeBadgeDot} />
            Studio Pro — 45 credits remaining
          </div>
        </div>
      </motion.div>

      {/* ── Stats Row ──────────────────────────────────────── */}
      <motion.div variants={itemVariants} className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIconWrap} ${stat.colorClass}`}>
                  <Icon size={18} />
                </div>
                <div className={styles.statSparkline}>
                  {stat.bars.map((h, i) => (
                    <div
                      key={i}
                      className={styles.sparkBar}
                      style={{
                        height: `${h}%`,
                        background: stat.sparkColor,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div
                className={`${styles.statTrend} ${
                  stat.trendUp ? styles.trendUp : styles.trendDown
                }`}
              >
                <TrendingUp size={10} />
                {stat.trend}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Quick Actions ───────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionTitleAccent} />
            Quick Actions
          </div>
        </div>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action) => {
            const Icon = action.Icon;
            return (
              <Link key={action.href} href={action.href} className={styles.quickActionCard}>
                <div className={`${styles.quickActionGlow} ${action.glowClass}`} />
                <div className={`${styles.quickActionIcon} ${action.iconClass}`}>
                  <Icon size={20} />
                </div>
                <div className={styles.quickActionLabel}>{action.label}</div>
                <div className={styles.quickActionDesc}>{action.desc}</div>
                <div className={styles.quickActionArrow}>
                  Get started <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Recent Activity ─────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionTitleAccent} />
            Recent Songs
          </div>
          <Link href="/song/create" className={styles.sectionLink}>
            View all →
          </Link>
        </div>

        <div className={styles.recentList}>
          {recentSongs.map((song, i) => (
            <motion.div
              key={song.title}
              className={styles.recentItem}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
            >
              <div className={styles.recentCover} style={{ background: song.bg }}>
                {song.emoji}
              </div>
              <div className={styles.recentInfo}>
                <div className={styles.recentTitle}>{song.title}</div>
                <div className={styles.recentMeta}>
                  <span
                    className={styles.genreBadge}
                    style={{
                      background: `${song.genreColor}22`,
                      color: song.genreColor,
                      border: `1px solid ${song.genreColor}44`,
                    }}
                  >
                    {song.genre}
                  </span>
                </div>
              </div>
              <div className={styles.recentStats}>
                <div className={styles.recentStat}>
                  <Clock size={11} />
                  {song.duration}
                </div>
                <div className={styles.recentStat}>
                  <Play size={11} />
                  {song.plays.toLocaleString()}
                </div>
              </div>
              <button
                className={styles.playButton}
                onClick={() => setPlayingId(playingId === i ? null : i)}
                aria-label={`Play ${song.title}`}
              >
                <Play size={12} fill="white" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}