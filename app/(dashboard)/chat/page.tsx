'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, Bot } from 'lucide-react';
import styles from './Chat.module.css';

// ── Types ────────────────────────────────────────────────────
type Role = 'user' | 'ai';

interface Message {
  id: string;
  role: Role;
  text: string;
  ts: string;
}

// ── Helpers ───────────────────────────────────────────────────
function nowStr(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ── Seed Messages ────────────────────────────────────────────
const SEED_MESSAGES: Message[] = [
  {
    id: uid(),
    role: 'ai',
    text: "Hey there! I'm Echo, your AI music production assistant. I can help you craft lyrics, suggest chord progressions, pick the perfect mood for your track, or just geek out about music theory. What shall we create today? 🎵",
    ts: '9:00 AM',
  },
  {
    id: uid(),
    role: 'user',
    text: "Can you suggest a chord progression for a melancholic lo-fi hip-hop track?",
    ts: '9:01 AM',
  },
  {
    id: uid(),
    role: 'ai',
    text: "Great choice — lo-fi sadness hits different. Try this: **Am7 → Dm7 → Fmaj7 → E7** in the key of A minor. Use a slow, swung 16th-note groove around 75 BPM. Layer a vinyl crackle sample underneath and detune your keys by ±15 cents for that dreamy, slightly-off feel. Want me to suggest some complementary lyrics for the vibe?",
    ts: '9:01 AM',
  },
];

// ── AI Reply Pool ────────────────────────────────────────────
const AI_REPLIES: string[] = [
  "Ooh, that's a spicy creative direction! Have you considered adding a minor 6th chord right before the chorus drop? It creates this gorgeous tension that resolves beautifully. 🎹",
  "I love where your mind is going. For that sound, try layering a 808 sub at -12dB with a tighter kick transient around 60ms. The contrast will make both elements punch harder in the mix.",
  "Musically speaking, that's gold. Pro tip: automate a subtle high-pass filter sweep on your reverb return during the chorus — it'll make the verse feel even more intimate by comparison.",
  "Now we're talking! The best breakdowns are 50% silence. Strip everything back to just kick and bass for 4 bars before the drop. Let the tension breathe. Your listeners' dopamine will thank you. 🎧",
  "I'm digging this concept. For the lyrics, try contrast — pair brutal emotional honesty with completely mundane imagery. Think 'I'm falling apart at the grocery store, cart full of frozen things.' Hits harder than direct metaphors.",
  "Brilliant idea. The key to great AI-assisted music is using it for the 20% you're unsure about, and trusting yourself for the 80% you already hear in your head. What does your gut say about the key?",
  "That reminds me of a golden era West Coast sample flip. If you're going for that nostalgic feel, chop your sample on the 16th-note grid and pitch-shift individual slices ±2 semitones. Magic happens. ✨",
  "Smart thinking! Compression is basically a vibe sculptor — set your attack around 20ms to let the transient breathe, then crush the sustain with a 6:1 ratio. The result: instant groove and punch without losing dynamics.",
  "Your instincts are 100% correct. The best musical decisions are often the uncomfortable ones. Sit with that dissonance — it's telling you something your ears already know but your brain hasn't confirmed yet.",
];

// ── Animation Variants ────────────────────────────────────────
const msgVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ── Main Component ────────────────────────────────────────────
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const replyIndexRef           = useRef(0);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    // Add user message
    const userMsg: Message = { id: uid(), role: 'user', text, ts: nowStr() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // After 1.5s, add mock AI reply
    setTimeout(() => {
      const replyText = AI_REPLIES[replyIndexRef.current % AI_REPLIES.length];
      replyIndexRef.current += 1;
      const aiMsg: Message = { id: uid(), role: 'ai', text: replyText, ts: nowStr() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }, [input, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatRoot}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconWrap}>
            <Bot size={22} color="#fff" />
          </div>
          <h1 className={styles.title}>AI Chat Assistant</h1>
        </div>
        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Echo AI is online · Music production expert</span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className={styles.messagesWrap}>
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              variants={msgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : styles.messageRowAI}`}
            >
              {msg.role === 'ai' && (
                <div className={styles.avatarAI}>AI</div>
              )}

              <div className={`${styles.bubbleWrap} ${msg.role === 'user' ? styles.bubbleWrapUser : styles.bubbleWrapAI}`}>
                <div className={msg.role === 'user' ? styles.bubbleUser : styles.bubbleAI}>
                  {msg.text}
                </div>
                <span className={styles.timestamp}>{msg.ts}</span>
              </div>

              {msg.role === 'user' && (
                <div className={styles.avatarUser}>You</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              key="typing"
              variants={msgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.typingRow}
            >
              <div className={styles.avatarAI}>AI</div>
              <div className={styles.typingBubble}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input Bar ── */}
      <div className={styles.inputBar}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Echo anything about music production..."
          className={styles.inputField}
          disabled={isTyping}
          aria-label="Chat message"
          maxLength={500}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
          className={styles.sendBtn}
          aria-label="Send message"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}
