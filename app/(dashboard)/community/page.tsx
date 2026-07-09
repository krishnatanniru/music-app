'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Play, Users, TrendingUp, Hash } from 'lucide-react';
import styles from './Community.module.css';

/* ─── Types ──────────────────────────────────────────────── */
interface CommunityPost {
  id: number;
  username: string;
  handle: string;
  avatarColor: string;
  avatarInitial: string;
  songTitle: string;
  genre: string;
  genreColor: string;
  mood: string;
  moodColor: string;
  plays: number;
  likes: number;
  waveBars: number[];
  timeAgo: string;
}

/* ─── Mock Data ──────────────────────────────────────────── */
const mockPosts: CommunityPost[] = [
  {
    id: 1,
    username: 'SynthWave_Nova',
    handle: '@nova',
    avatarColor: 'linear-gradient(135deg, #4f8dff, #a855f7)',
    avatarInitial: 'N',
    songTitle: 'Neon Dreams at Dusk',
    genre: 'Electronic',
    genreColor: '#4f8dff',
    mood: 'Dreamy',
    moodColor: '#a855f7',
    plays: 2843,
    likes: 412,
    waveBars: [30,55,40,80,60,45,70,35,90,50,65,40,75,55,85,45,60,35,70,50],
    timeAgo: '2h ago',
  },
  {
    id: 2,
    username: 'MelodyForge',
    handle: '@forged',
    avatarColor: 'linear-gradient(135deg, #ec4899, #f97316)',
    avatarInitial: 'M',
    songTitle: 'Burning Skies',
    genre: 'Pop',
    genreColor: '#ec4899',
    mood: 'Energetic',
    moodColor: '#f97316',
    plays: 5921,
    likes: 1024,
    waveBars: [60,35,80,45,70,55,90,40,65,75,30,85,50,60,40,75,55,80,45,65],
    timeAgo: '4h ago',
  },
  {
    id: 3,
    username: 'DeepBeats_AI',
    handle: '@deepbeats',
    avatarColor: 'linear-gradient(135deg, #10b981, #06b6d4)',
    avatarInitial: 'D',
    songTitle: 'Underground Frequency',
    genre: 'Hip-Hop',
    genreColor: '#10b981',
    mood: 'Dark',
    moodColor: '#475569',
    plays: 1337,
    likes: 287,
    waveBars: [70,50,85,35,60,80,45,90,55,40,75,60,35,80,55,70,40,85,50,65],
    timeAgo: '6h ago',
  },
  {
    id: 4,
    username: 'CelestialTones',
    handle: '@celestial',
    avatarColor: 'linear-gradient(135deg, #a855f7, #ec4899)',
    avatarInitial: 'C',
    songTitle: 'Stardust Serenade',
    genre: 'Cinematic',
    genreColor: '#06b6d4',
    mood: 'Calm',
    moodColor: '#06b6d4',
    plays: 3208,
    likes: 601,
    waveBars: [40,60,30,75,50,85,45,65,35,80,55,40,70,60,45,85,35,65,50,75],
    timeAgo: '8h ago',
  },
  {
    id: 5,
    username: 'RhythmAlchemist',
    handle: '@rhythmalch',
    avatarColor: 'linear-gradient(135deg, #f97316, #ec4899)',
    avatarInitial: 'R',
    songTitle: 'Jazz in the Machine',
    genre: 'Jazz',
    genreColor: '#f97316',
    mood: 'Happy',
    moodColor: '#fbbf24',
    plays: 892,
    likes: 154,
    waveBars: [55,35,70,50,80,40,65,85,30,75,45,60,80,35,55,70,45,90,60,40],
    timeAgo: '12h ago',
  },
  {
    id: 6,
    username: 'VoiceOfCode',
    handle: '@voc',
    avatarColor: 'linear-gradient(135deg, #06b6d4, #4f8dff)',
    avatarInitial: 'V',
    songTitle: 'Binary Lullaby',
    genre: 'Ambient',
    genreColor: '#a855f7',
    mood: 'Melancholic',
    moodColor: '#94a3b8',
    plays: 4475,
    likes: 789,
    waveBars: [45,70,35,85,55,40,75,60,80,30,65,50,85,40,70,55,35,80,60,45],
    timeAgo: '1d ago',
  },
];

const featuredArtists = [
  {
    name: 'AuroraBeats',
    meta: '1.2k songs • 48k followers',
    emoji: '🌌',
    bg: 'linear-gradient(135deg, #1a0533, #0d1a3a)',
  },
  {
    name: 'PixelHarmony',
    meta: '847 songs • 29k followers',
    emoji: '🎹',
    bg: 'linear-gradient(135deg, #0d2233, #1b1a0a)',
  },
  {
    name: 'SoundSculptor',
    meta: '2.1k songs • 92k followers',
    emoji: '🎛️',
    bg: 'linear-gradient(135deg, #1a0d2e, #0a1a1a)',
  },
];

const trendingTags = [
  { tag: '#lofi', count: '2.4k' },
  { tag: '#electronic', count: '5.8k' },
  { tag: '#ambient', count: '1.9k' },
  { tag: '#hiphop', count: '7.2k' },
];

const filterTabs = ['All', 'Trending', 'New', 'Following'];

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ─── Component ──────────────────────────────────────────── */
export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Community Feed</h1>
        <p className={styles.pageSubtitle}>
          Discover what fellow creators are making with EchoVerse AI
        </p>
      </div>

      <div className={styles.page}>
        {/* ── Main Feed ────────────────────────────────── */}
        <div className={styles.feedColumn}>
          {/* Filter Bar */}
          <div className={styles.filterBar}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.filterTab} ${
                  activeFilter === tab ? styles.filterTabActive : ''
                }`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Feed Cards */}
          <motion.div
            className={styles.feed}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {mockPosts.map((post) => {
              const isLiked = likedPosts.has(post.id);
              const likeCount = post.likes + (isLiked ? 1 : 0);

              return (
                <motion.div key={post.id} variants={cardVariants} className={styles.communityCard}>
                  {/* Card Top */}
                  <div className={styles.cardTop}>
                    <div className={styles.cardUser}>
                      <div
                        className={styles.avatar}
                        style={{ background: post.avatarColor }}
                      >
                        {post.avatarInitial}
                      </div>
                      <div>
                        <div className={styles.userName}>{post.username}</div>
                        <div className={styles.userHandle}>
                          {post.handle} · {post.timeAgo}
                        </div>
                      </div>
                    </div>
                    <div className={styles.cardBadges}>
                      <span
                        className={styles.badge}
                        style={{
                          background: `${post.genreColor}22`,
                          color: post.genreColor,
                          border: `1px solid ${post.genreColor}44`,
                        }}
                      >
                        {post.genre}
                      </span>
                      <span
                        className={styles.badge}
                        style={{
                          background: `${post.moodColor}22`,
                          color: post.moodColor,
                          border: `1px solid ${post.moodColor}44`,
                        }}
                      >
                        {post.mood}
                      </span>
                    </div>
                  </div>

                  {/* Song Title */}
                  <div className={styles.songTitle}>{post.songTitle}</div>

                  {/* Waveform */}
                  <div className={styles.waveform}>
                    {post.waveBars.map((height, i) => (
                      <div
                        key={i}
                        className={styles.waveBar}
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(180deg, ${post.genreColor}, ${post.moodColor})`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: `${0.6 + (i % 5) * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className={styles.cardActions}>
                    <button className={styles.actionBtn} aria-label="Play song">
                      <Play size={13} />
                      Play
                    </button>
                    <button
                      className={`${styles.actionBtn} ${isLiked ? styles.likedBtn : ''}`}
                      onClick={() => toggleLike(post.id)}
                      aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                      {likeCount.toLocaleString()}
                    </button>
                    <button className={styles.actionBtn} aria-label="Share">
                      <Share2 size={13} />
                      Share
                    </button>
                    <div className={styles.cardStats}>
                      <span className={styles.statText}>
                        <Play size={10} />
                        {post.plays.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div className={styles.sidebarColumn}>
          {/* Featured Artists */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>
              <div className={styles.sidebarTitleDot} />
              Featured Artists
            </div>
            {featuredArtists.map((artist) => (
              <div key={artist.name} className={styles.artistCard}>
                <div
                  className={styles.artistAvatar}
                  style={{ background: artist.bg }}
                >
                  {artist.emoji}
                </div>
                <div className={styles.artistInfo}>
                  <div className={styles.artistName}>{artist.name}</div>
                  <div className={styles.artistMeta}>{artist.meta}</div>
                </div>
                <button className={styles.followBtn}>Follow</button>
              </div>
            ))}
          </div>

          {/* Trending Tags */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>
              <div className={styles.sidebarTitleDot} />
              Trending Tags
            </div>
            {trendingTags.map((t) => (
              <div key={t.tag} className={styles.trendingTag}>
                <Hash size={13} style={{ opacity: 0.6 }} />
                {t.tag}
                <span className={styles.trendingTagCount}>{t.count} posts</span>
              </div>
            ))}
          </div>

          {/* Community Stats */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>
              <div className={styles.sidebarTitleDot} />
              Community
            </div>
            <div
              style={{
                padding: '1rem',
                borderRadius: '0.875rem',
                background: 'rgba(168, 85, 247, 0.07)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                }}
              >
                <Users size={16} style={{ color: '#a855f7' }} />
                24,819 creators
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.7)' }}>
                Sharing music globally with EchoVerse AI
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: '0.6rem',
                  fontSize: '0.72rem',
                  color: '#10b981',
                  fontWeight: 600,
                }}
              >
                <TrendingUp size={11} />
                +342 joined this week
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
