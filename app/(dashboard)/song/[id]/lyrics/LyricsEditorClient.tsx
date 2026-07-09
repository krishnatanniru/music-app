'use client';

import { useState, useRef, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Download,
  Music2,
  Plus,
  ChevronUp,
  ChevronDown,
  Layers,
  CheckCircle2,
  Hash,
  AlignLeft,
  RotateCcw,
  Copy,
} from 'lucide-react';
import styles from './LyricsEditor.module.css';
import type { LyricsSection, LyricsSectionType } from '@/lib/types';

/* ── Mock sections ────────────────────────────────────────── */
const INITIAL_SECTIONS: LyricsSection[] = [
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
    content: 'Dawn is breaking, the city wakes\nBut these neon dreams I\'ll keep\nUntil we meet again tonight\nUnder the glow so deep...',
    lineCount: 4,
    order: 4,
  },
];

const SECTION_TYPE_COLORS: Record<LyricsSectionType, string> = {
  intro:      '#67e8f9',
  verse:      '#c084fc',
  chorus:     '#f472b6',
  bridge:     '#fbbf24',
  'pre-chorus': '#a78bfa',
  outro:      '#6ee7b7',
  hook:       '#fb923c',
};

const SECTION_TYPE_ABBREV: Record<LyricsSectionType, string> = {
  intro:       'IN',
  verse:       'V',
  chorus:      'CH',
  bridge:      'BR',
  'pre-chorus': 'PC',
  outro:       'OT',
  hook:        'HK',
};

const NEW_SECTION_TYPES: { type: LyricsSectionType; label: string }[] = [
  { type: 'verse',      label: 'Verse' },
  { type: 'chorus',     label: 'Chorus' },
  { type: 'bridge',     label: 'Bridge' },
  { type: 'pre-chorus', label: 'Pre-Chorus' },
  { type: 'outro',      label: 'Outro' },
  { type: 'hook',       label: 'Hook' },
];

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

function countLines(text: string): number {
  return text === '' ? 0 : text.split('\n').length;
}

interface LyricsEditorClientProps {
  songId: string;
}

export default function LyricsEditorClient({ songId }: LyricsEditorClientProps) {
  const router = useRouter();

  const [sections, setSections] = useState<LyricsSection[]>(INITIAL_SECTIONS);
  const [activeId, setActiveId] = useState<string>(INITIAL_SECTIONS[0].id);
  const [saved, setSaved] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0];

  /* ── Update section content ───────────────────────────────── */
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setSections((prev) =>
        prev.map((s) =>
          s.id === activeId
            ? { ...s, content: value, lineCount: countLines(value) }
            : s
        )
      );
      setSaved(false);
    },
    [activeId]
  );

  /* ── Save ─────────────────────────────────────────────────── */
  const handleSave = useCallback(() => {
    console.log('[LyricsEditor] Saving sections:', sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [sections]);

  /* ── Keyboard shortcut: Ctrl+S ────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave]);

  /* ── Reorder sections ─────────────────────────────────────── */
  const moveSection = useCallback((id: string, direction: 'up' | 'down') => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.length - 1) return prev;

      const next = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  /* ── Add section ──────────────────────────────────────────── */
  const addSection = useCallback((type: LyricsSectionType) => {
    const existingCount = sections.filter((s) => s.type === type).length;
    const title =
      type === 'chorus' && existingCount === 0
        ? 'Chorus'
        : `${type.charAt(0).toUpperCase() + type.slice(1)} ${existingCount + 1}`;

    const newSection: LyricsSection = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      content: '',
      lineCount: 0,
      order: sections.length,
    };

    setSections((prev) => [...prev, newSection]);
    setActiveId(newSection.id);
    setShowAddMenu(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, [sections]);

  /* ── Copy section ─────────────────────────────────────────── */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(activeSection.content);
    } catch {
      /* ignore */
    }
  }, [activeSection]);

  /* ── Export ───────────────────────────────────────────────── */
  const handleExport = useCallback(() => {
    const fullText = sections
      .map((s) => `[${s.title.toUpperCase()}]\n${s.content}`)
      .join('\n\n');
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyrics.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [sections]);

  /* ── Line numbers ─────────────────────────────────────────── */
  const lines = activeSection.content.split('\n');
  const lineNumbers = lines.map((_, i) => i + 1);

  /* ── Sync textarea scroll with line numbers ───────────────── */
  const lineNumRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (textareaRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /* ── Stats ────────────────────────────────────────────────── */
  const wordCount = countWords(activeSection.content);
  const charCount = activeSection.content.length;
  const lineCount = countLines(activeSection.content);

  return (
    <div className={styles.page}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <motion.button
            className={styles.backBtn}
            onClick={() => router.back()}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowLeft size={16} />
            Back to Song
          </motion.button>
          <div>
            <p className={styles.pageHeading}>Lyrics Editor</p>
            <p className={styles.songSubtitle}>Neon Dreams at Midnight · {sections.length} sections</p>
          </div>
        </div>

        <div className={styles.topBarRight}>
          <button className={styles.exportBtn} onClick={handleExport}>
            <Download size={14} />
            Export
          </button>
          <motion.button
            className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
          >
            {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {saved ? 'Saved!' : 'Save'}
          </motion.button>
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className={styles.editorLayout}>

        {/* ── Left: Editor pane ─────────────────────────────── */}
        <div className={styles.editorPane}>
          {/* Section tabs */}
          <div className={styles.sectionTabs}>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`${styles.tab} ${section.id === activeId ? styles.tabActive : ''}`}
                onClick={() => setActiveId(section.id)}
              >
                <span
                  className={styles.tabDot}
                  style={{ background: SECTION_TYPE_COLORS[section.type] }}
                />
                {section.title}
              </button>
            ))}
          </div>

          {/* Editor header */}
          <div className={styles.editorHeader}>
            <span className={styles.sectionLabel}>{activeSection.title}</span>
            <span className={styles.lineCount}>
              {lineCount} {lineCount === 1 ? 'line' : 'lines'}
            </span>
          </div>

          {/* Editor body */}
          <div className={styles.editorContainer}>
            {/* Line numbers */}
            <div className={styles.lineNumbers} ref={lineNumRef}>
              {lineNumbers.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className={styles.editorTextarea}
              value={activeSection.content}
              onChange={handleContentChange}
              onScroll={handleScroll}
              placeholder={`Write your ${activeSection.type} lyrics here...\n\nTip: Each line becomes a lyric line.\nUse blank lines to separate stanzas.`}
              spellCheck
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          {/* Footer */}
          <div className={styles.editorFooter}>
            <div className={styles.footerStats}>
              <span className={styles.footerStat}>
                <span>{wordCount}</span> words
              </span>
              <span className={styles.footerStat}>
                <span>{charCount}</span> chars
              </span>
              <span className={styles.footerStat}>
                <span>{lineCount}</span> lines
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                className={styles.exportBtn}
                style={{ padding: '0.3rem 0.7rem', fontSize: '0.72rem' }}
                onClick={handleCopy}
              >
                <Copy size={12} />
                Copy
              </button>
              <span className={styles.footerHint}>Ctrl+S to save</span>
            </div>
          </div>
        </div>

        {/* ── Right: Structure panel ─────────────────────────── */}
        <div className={styles.structurePanel}>
          <div className={styles.structureHeader}>
            <span className={styles.structureTitle}>
              <Layers size={14} className={styles.structureIcon} />
              Song Structure
            </span>
          </div>

          <div className={styles.structureList}>
            <AnimatePresence initial={false}>
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`${styles.sectionCard} ${section.id === activeId ? styles.sectionCardActive : ''}`}
                    onClick={() => setActiveId(section.id)}
                  >
                    {/* Type icon */}
                    <div
                      className={styles.sectionCardIcon}
                      style={{ color: SECTION_TYPE_COLORS[section.type] }}
                    >
                      {SECTION_TYPE_ABBREV[section.type]}
                    </div>

                    {/* Info */}
                    <div className={styles.sectionCardInfo}>
                      <p className={styles.sectionCardTitle}>{section.title}</p>
                      <p className={styles.sectionCardMeta}>
                        {section.content.trim() === ''
                          ? 'Empty'
                          : `${countWords(section.content)} words · ${section.lineCount} lines`}
                      </p>
                    </div>

                    {/* Up/Down controls */}
                    <div className={styles.orderBtns}>
                      <button
                        className={styles.orderBtn}
                        onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <ChevronUp size={10} />
                      </button>
                      <button
                        className={styles.orderBtn}
                        onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}
                        disabled={index === sections.length - 1}
                        title="Move down"
                      >
                        <ChevronDown size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add section */}
          <div style={{ position: 'relative' }}>
            <button
              className={styles.addSectionBtn}
              onClick={() => setShowAddMenu((v) => !v)}
            >
              <Plus size={14} />
              Add Section
            </button>

            <AnimatePresence>
              {showAddMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(13, 13, 26, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    zIndex: 10,
                  }}
                >
                  {NEW_SECTION_TYPES.map(({ type, label }) => (
                    <button
                      key={type}
                      onClick={() => addSection(type)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        width: '100%',
                        padding: '0.6rem 0.875rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                        transition: 'background 150ms',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'none';
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          borderRadius: '0.3rem',
                          background: `${SECTION_TYPE_COLORS[type]}22`,
                          color: SECTION_TYPE_COLORS[type],
                          fontSize: '0.6rem',
                          fontWeight: 800,
                        }}
                      >
                        {SECTION_TYPE_ABBREV[type]}
                      </span>
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
