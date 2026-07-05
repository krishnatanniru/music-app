'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Pencil,
  Copy,
  Trash2,
  Mic,
  User,
  UserCircle,
  Circle,
  Check,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { useVoiceStore } from '@/lib/store/index';
import type { VoiceProfile, VoiceGender, VoiceTrainingStatus } from '@/lib/types';
import TrainingProgress from './TrainingProgress';

// ── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getGenderGradient(gender: VoiceGender): string {
  switch (gender) {
    case 'male':
      return 'from-blue-600 to-cyan-500';
    case 'female':
      return 'from-fuchsia-600 to-pink-500';
    case 'neutral':
      return 'from-violet-600 to-indigo-500';
  }
}

function getGenderIcon(gender: VoiceGender) {
  switch (gender) {
    case 'male':
      return <User className="h-4 w-4" />;
    case 'female':
      return <UserCircle className="h-4 w-4" />;
    case 'neutral':
      return <Mic className="h-4 w-4" />;
  }
}

interface StatusConfig {
  dot: string;
  label: string;
  pulse: boolean;
}

function getStatusConfig(status: VoiceTrainingStatus): StatusConfig {
  switch (status) {
    case 'ready':
      return { dot: 'bg-emerald-400', label: 'Ready to use', pulse: false };
    case 'training':
      return { dot: 'bg-orange-400', label: 'Training...', pulse: true };
    case 'uploading':
      return { dot: 'bg-blue-400', label: 'Uploading', pulse: false };
    case 'cleaning':
      return { dot: 'bg-yellow-400', label: 'Cleaning Audio', pulse: false };
    case 'failed':
      return { dot: 'bg-red-500', label: 'Error', pulse: false };
  }
}

// ── VoiceCard ────────────────────────────────────────────────────────────────

interface VoiceCardProps {
  voice: VoiceProfile;
}

export default function VoiceCard({ voice }: VoiceCardProps) {
  const { updateVoice, removeVoice, addVoice } = useVoiceStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(voice.name);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const statusConfig = getStatusConfig(voice.status);
  const gradientClass = getGenderGradient(voice.gender);
  const initials = getInitials(voice.name);

  // ── Rename ──────────────────────────────────────────────────────────────
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditName(voice.name);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const handleSaveName = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== voice.name) {
      updateVoice(voice.id, { name: trimmed });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSaveName();
    if (e.key === 'Escape') setIsEditing(false);
  };

  // ── Play preview ────────────────────────────────────────────────────────
  const handlePlayToggle = () => {
    if (!voice.url) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(voice.url);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // ── Duplicate ───────────────────────────────────────────────────────────
  const handleDuplicate = () => {
    const copy: VoiceProfile = {
      ...voice,
      id: `voice-${Date.now()}`,
      name: `${voice.name} (Copy)`,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      voiceId: `v-${Date.now()}`,
    };
    addVoice(copy);
  };

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = () => {
    removeVoice(voice.id);
  };

  // ── Duration display ─────────────────────────────────────────────────────
  const durationDisplay =
    voice.duration != null
      ? `${(voice.duration / 60).toFixed(1)} min of training audio`
      : '—';

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl border border-white/8 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-900/20"
    >
      {/* ── Avatar ── */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} text-sm font-bold text-white shadow-lg`}
        >
          {initials}
          {/* Gender icon badge */}
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-[#0d0d1a] text-white/70">
            {getGenderIcon(voice.gender)}
          </span>
        </div>

        {/* Name / Edit */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex items-center gap-1.5">
              <input
                ref={inputRef}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveName}
                className="min-w-0 flex-1 rounded-lg border border-violet-500/50 bg-white/10 px-2 py-0.5 text-sm font-semibold text-white outline-none"
              />
              <button
                onClick={handleSaveName}
                className="rounded p-0.5 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded p-0.5 text-red-400 hover:bg-red-500/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartEdit}
              className="w-full truncate text-left text-sm font-semibold text-white hover:text-violet-300 transition-colors"
            >
              {voice.name}
            </button>
          )}

          {/* Language + gender badges */}
          <div className="mt-1 flex items-center gap-1.5">
            <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium capitalize text-white/60">
              {voice.language}
            </span>
            <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium capitalize text-white/60">
              {voice.gender}
            </span>
          </div>
        </div>
      </div>

      {/* ── Status indicator ── */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${statusConfig.dot} flex-shrink-0 ${
            statusConfig.pulse ? 'animate-pulse' : ''
          }`}
        />
        <span className="text-xs text-white/60">{statusConfig.label}</span>
      </div>

      {/* ── Training progress stepper ── */}
      {voice.status !== 'ready' && voice.status !== 'failed' && (
        <div className="mb-4">
          <TrainingProgress
            status={voice.status}
            progress={voice.trainingProgress}
          />
        </div>
      )}

      {/* ── Progress bar (non-ready) ── */}
      {voice.status !== 'ready' && voice.status !== 'failed' && (
        <div className="mb-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${voice.trainingProgress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-1 text-right text-[10px] text-white/40">
            {voice.trainingProgress}%
          </p>
        </div>
      )}

      {/* ── Meta info ── */}
      <div className="mb-4 space-y-1">
        <p className="text-xs text-white/40">{durationDisplay}</p>
        <p className="text-xs text-white/40">
          Created {format(new Date(voice.createdAt), 'MMM d, yyyy')}
        </p>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex items-center gap-2">
        {/* Play — only if ready */}
        {voice.status === 'ready' && (
          <button
            onClick={handlePlayToggle}
            title="Play preview"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/70 transition-all hover:bg-violet-600 hover:text-white active:scale-90"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
          </button>
        )}

        {/* Rename */}
        <button
          onClick={handleStartEdit}
          title="Rename"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/70 transition-all hover:bg-white/12 hover:text-white active:scale-90"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>

        {/* Duplicate */}
        <button
          onClick={handleDuplicate}
          title="Duplicate"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/70 transition-all hover:bg-white/12 hover:text-white active:scale-90"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>

        {/* Delete with confirmation */}
        <div className="relative ml-auto">
          <AnimatePresence>
            {showDeleteConfirm ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="absolute bottom-10 right-0 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#13131f] p-2 shadow-xl"
              >
                <span className="whitespace-nowrap text-xs text-white/70">
                  Delete voice?
                </span>
                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-red-600/90 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-600 active:scale-95"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg bg-white/8 px-2.5 py-1 text-xs font-semibold text-white/60 hover:text-white active:scale-95"
                >
                  No
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/8 text-red-400/70 transition-all hover:bg-red-500/20 hover:text-red-400 active:scale-90"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-violet-500/50 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
