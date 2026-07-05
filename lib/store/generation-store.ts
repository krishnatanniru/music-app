'use client';

// ─────────────────────────────────────────────
//  EchoVerse AI — Generation Store (Zustand)
// ─────────────────────────────────────────────

import { create } from 'zustand';
import type { GenerationProgress, GenerationStep } from '@/lib/types';

interface GenerationState {
  // Active generation
  isModalOpen: boolean;
  jobId: string | null;
  songId: string | null;
  progress: GenerationProgress | null;
  isComplete: boolean;
  isCancelled: boolean;
  error: string | null;

  // Actions
  openModal: (jobId: string, songId: string) => void;
  closeModal: () => void;
  setProgress: (progress: GenerationProgress) => void;
  markComplete: () => void;
  markCancelled: () => void;
  setError: (error: string) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  isModalOpen: false,
  jobId: null,
  songId: null,
  progress: null,
  isComplete: false,
  isCancelled: false,
  error: null,
};

export const useGenerationStore = create<GenerationState>()((set) => ({
  ...DEFAULT_STATE,

  openModal: (jobId, songId) =>
    set({ isModalOpen: true, jobId, songId, isComplete: false, isCancelled: false, error: null }),

  closeModal: () => set({ isModalOpen: false }),

  setProgress: (progress) => set({ progress }),

  markComplete: () => set({ isComplete: true }),

  markCancelled: () => set({ isCancelled: true, isModalOpen: false }),

  setError: (error) => set({ error }),

  reset: () => set(DEFAULT_STATE),
}));

// ── Convenience selector ───────────────────────
export const selectCurrentStepIndex = (state: GenerationState): number =>
  state.progress?.stepIndex ?? 0;

export const selectOverallProgress = (state: GenerationState): number =>
  state.progress?.progress ?? 0;

export const selectCurrentStep = (state: GenerationState): GenerationStep | null =>
  state.progress?.step ?? null;
