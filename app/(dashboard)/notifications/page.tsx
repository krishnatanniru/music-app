'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Music2,
  Heart,
  MessageCircle,
  UserPlus,
  Zap,
  Clock,
} from 'lucide-react';
import styles from './Notifications.module.css';

/* ─── Types ──────────────────────────────────────────────── */
type NotifType = 'generation-complete' | 'like' | 'comment' | 'follow' | 'system';

interface AppNotification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

/* ─── Mock Data ──────────────────────────────────────────── */
const initialNotifications: AppNotification[] = [
  {
    id: 1,
    type: 'generation-complete',
    title: 'Song Ready!',
    message: 'Your track <em>Neon Dreams at Dusk</em> has finished generating. Click to listen.',
    timeAgo: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'like',
    title: 'New Like',
    message: '<em>SynthWave_Nova</em> liked your song <em>Burning Skies</em>.',
    timeAgo: '15 min ago',
    read: false,
  },
  {
    id: 3,
    type: 'comment',
    title: 'New Comment',
    message: '<em>MelodyForge</em> commented: "This beat is absolutely fire! 🔥"',
    timeAgo: '1h ago',
    read: false,
  },
  {
    id: 4,
    type: 'follow',
    title: 'New Follower',
    message: '<em>CelestialTones</em> started following you.',
    timeAgo: '2h ago',
    read: false,
  },
  {
    id: 5,
    type: 'generation-complete',
    title: 'Generation Complete',
    message: 'Your voice profile <em>EchoVoice v2</em> has been trained and is ready to use.',
    timeAgo: '4h ago',
    read: true,
  },
  {
    id: 6,
    type: 'like',
    title: '12 New Likes',
    message: '<em>12 people</em> liked your song <em>Crystal Echoes</em> in the last hour.',
    timeAgo: '5h ago',
    read: true,
  },
  {
    id: 7,
    type: 'system',
    title: 'Credits Refilled',
    message: 'Your monthly credit refill of <em>50 credits</em> is now available.',
    timeAgo: '1d ago',
    read: true,
  },
  {
    id: 8,
    type: 'comment',
    title: 'Reply on your track',
    message: '<em>RhythmAlchemist</em> replied to your comment on <em>Jazz in the Machine</em>.',
    timeAgo: '2d ago',
    read: true,
  },
];

/* ─── Config maps ────────────────────────────────────────── */
const iconConfig: Record<NotifType, { Icon: React.ElementType; className: string; badgeColor: string; badgeText: string }> = {
  'generation-complete': {
    Icon: Music2,
    className: styles.iconGeneration,
    badgeColor: '#10b981',
    badgeText: 'Generated',
  },
  like: {
    Icon: Heart,
    className: styles.iconLike,
    badgeColor: '#ec4899',
    badgeText: 'Like',
  },
  comment: {
    Icon: MessageCircle,
    className: styles.iconComment,
    badgeColor: '#4f8dff',
    badgeText: 'Comment',
  },
  follow: {
    Icon: UserPlus,
    className: styles.iconFollow,
    badgeColor: '#a855f7',
    badgeText: 'Follow',
  },
  system: {
    Icon: Zap,
    className: styles.iconSystem,
    badgeColor: '#f59e0b',
    badgeText: 'System',
  },
};

const filterTabs = ['All', 'Unread'];

/* ─── Animation variants ─────────────────────────────────── */
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.25 } },
};

/* ─── Component ──────────────────────────────────────────── */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread'>('All');
  const [allRead, setAllRead] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setAllRead(true);
  };

  const filteredNotifications =
    activeFilter === 'Unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            Notifications
            {unreadCount > 0 && (
              <span className={styles.unreadCount}>{unreadCount}</span>
            )}
          </h1>
          <p className={styles.pageSubtitle}>
            Stay updated on your songs, fans, and activity.
          </p>
        </div>

        <button
          className={`${styles.markAllBtn} ${allRead ? styles.markAllBtnDone : ''}`}
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={14} />
          {allRead || unreadCount === 0 ? 'All caught up!' : 'Mark all read'}
        </button>
      </div>

      {/* ── Filter Bar ───────────────────────────────────── */}
      <div className={styles.filterBar}>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.filterTab} ${
              activeFilter === tab ? styles.filterTabActive : ''
            }`}
            onClick={() => setActiveFilter(tab as 'All' | 'Unread')}
          >
            {tab}
            {tab === 'Unread' && unreadCount > 0 && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* ── Notification List ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filteredNotifications.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyIcon}>
              <Bell size={40} strokeWidth={1.5} />
            </div>
            <div className={styles.emptyTitle}>No unread notifications</div>
            <div className={styles.emptyText}>
              You&apos;re all caught up! Check back later for new updates.
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeFilter}
            className={styles.notificationList}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredNotifications.map((notif) => {
              const config = iconConfig[notif.type];
              const Icon = config.Icon;

              return (
                <motion.div
                  key={notif.id}
                  variants={itemVariants}
                  className={`${styles.notifItem} ${
                    !notif.read ? styles.notifItemUnread : ''
                  }`}
                  layout
                >
                  {/* Icon */}
                  <div className={`${styles.iconWrap} ${config.className}`}>
                    <Icon size={18} />
                  </div>

                  {/* Content */}
                  <div className={styles.notifContent}>
                    <div className={styles.notifTitle}>{notif.title}</div>
                    <div
                      className={styles.notifMessage}
                      dangerouslySetInnerHTML={{ __html: notif.message }}
                    />
                    <div className={styles.notifMeta}>
                      <span className={styles.notifTime}>
                        <Clock size={10} />
                        {notif.timeAgo}
                      </span>
                      <span
                        className={styles.notifTypeBadge}
                        style={{
                          background: `${config.badgeColor}22`,
                          color: config.badgeColor,
                          border: `1px solid ${config.badgeColor}44`,
                        }}
                      >
                        {config.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Unread dot */}
                  <div
                    className={`${styles.unreadDot} ${
                      notif.read ? styles.unreadDotHidden : ''
                    }`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
