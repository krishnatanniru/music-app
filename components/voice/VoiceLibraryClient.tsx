'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Plus } from 'lucide-react';
import { useVoiceStore } from '@/lib/store/index';
import type { VoiceProfile } from '@/lib/types';
import VoiceCard from './VoiceCard';
import AddVoiceModal from './AddVoiceModal';

// ── Mock seed data ──────────────────────────────────────────────────────────

const SEED_VOICES: VoiceProfile[] = [
  {
    id: 'seed-1',
    name: 'My Voice',
    gender: 'neutral',
    language: 'english',
    description: 'Primary cloned voice profile',
    audioSamples: [],
    voiceId: 'v-seed-1',
    status: 'ready',
    trainingProgress: 100,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isDefault: true,
  },
  {
    id: 'seed-2',
    name: 'Deep Voice',
    gender: 'male',
    language: 'english',
    description: 'Deep baritone voice clone',
    audioSamples: [],
    voiceId: 'v-seed-2',
    status: 'ready',
    trainingProgress: 100,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isDefault: false,
  },
  {
    id: 'seed-3',
    name: 'Training Voice',
    gender: 'female',
    language: 'spanish',
    description: 'Voice currently being trained',
    audioSamples: [],
    voiceId: 'v-seed-3',
    status: 'training',
    trainingProgress: 62,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isDefault: false,
  },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function VoiceLibraryClient() {
  const { voices, setVoices } = useVoiceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Seed store once on first mount if empty
  useEffect(() => {
    if (voices.length === 0) {
      setVoices(SEED_VOICES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmpty = voices.length === 0;

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      {/* ── Page header ── */}
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Voice Library</h1>
          <p className="mt-1 text-sm text-white/50">
            Your custom AI voice profiles
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-violet-800/60 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add Voice
        </button>
      </div>

      {/* ── Content area ── */}
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            {/* Icon orb */}
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 ring-1 ring-white/10">
                <Mic className="h-9 w-9 text-violet-400" />
              </div>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-white">
              No voice profiles yet
            </h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/50">
              Clone your voice in minutes. Record a sample or upload audio and
              our AI will create a unique voice model just for you.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:from-violet-500 hover:to-fuchsia-500 active:scale-95"
            >
              <Mic className="h-4 w-4" />
              Clone your first voice
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            <AnimatePresence>
              {voices.map((voice: VoiceProfile, i: number) => (
                <motion.div
                  key={voice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <VoiceCard voice={voice} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Add Voice modal ── */}
      <AddVoiceModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
