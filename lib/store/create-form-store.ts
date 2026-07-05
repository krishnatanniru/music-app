'use client';

// ─────────────────────────────────────────────
//  EchoVerse AI — Create Song Form Store (Zustand)
// ─────────────────────────────────────────────

import { create } from 'zustand';
import { DEFAULT_CREATE_FORM } from '@/lib/constants';
import type { CreateSongForm, Genre, Mood, Tempo, Language, MusicalKey } from '@/lib/types';

interface CreateFormState extends CreateSongForm {
  explicitLyrics: boolean;
  // Actions
  setPrompt: (prompt: string) => void;
  setGenre: (genre: Genre) => void;
  setMood: (mood: Mood) => void;
  setTempo: (tempo: Tempo) => void;
  setKey: (key: MusicalKey | 'Auto') => void;
  setLanguage: (language: Language) => void;
  setDuration: (duration: number) => void;
  setVoiceProfileId: (id: string | null) => void;
  setExplicitLyrics: (value: boolean) => void;
  setIsPublic: (value: boolean) => void;
  setField: <K extends keyof CreateSongForm>(key: K, value: CreateSongForm[K]) => void;
  resetForm: () => void;
}

const DEFAULT_STATE: CreateSongForm & { explicitLyrics: boolean } = {
  ...DEFAULT_CREATE_FORM,
  explicitLyrics: false,
};

export const useCreateFormStore = create<CreateFormState>()((set) => ({
  ...DEFAULT_STATE,

  setPrompt: (prompt) => set({ prompt }),
  setGenre: (genre) => set({ genre }),
  setMood: (mood) => set({ mood }),
  setTempo: (tempo) => set({ tempo }),
  setKey: (key) => set({ key: key === 'Auto' ? 'C major' : (key as MusicalKey) }),
  setLanguage: (language) => set({ language }),
  setDuration: (duration) => set({ duration }),
  setVoiceProfileId: (voiceProfileId) => set({ voiceProfileId }),
  setExplicitLyrics: (explicitLyrics) => set({ explicitLyrics }),
  setIsPublic: (isPublic) => set({ isPublic }),

  setField: (key, value) => set({ [key]: value } as Partial<CreateFormState>),

  resetForm: () => set(DEFAULT_STATE),
}));
