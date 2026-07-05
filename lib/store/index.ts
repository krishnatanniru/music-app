'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export const useSongStore = create((set) => ({
  songs: [],
  setSongs: (songs: any) => set({ songs }),
}));

export const useVoiceStore = create((set) => ({
  voices: [],
  setVoices: (voices: any) => set({ voices }),
  addVoice: (voice: any) => set((state: any) => ({ voices: [...state.voices, voice] })),
}));
