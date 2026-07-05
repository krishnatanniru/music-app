'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create<any>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state: any) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export const useSongStore = create<any>((set) => ({
  songs: [],
  setSongs: (songs: any) => set({ songs }),
}));

export const useVoiceStore = create<any>((set) => ({
  voices: [],
  setVoices: (voices: any) => set({ voices }),
  addVoice: (voice: any) => set((state: any) => ({ voices: [...state.voices, voice] })),
  updateVoice: (id: string, updates: any) => set((state: any) => ({
    voices: state.voices.map((v: any) => v.id === id ? { ...v, ...updates } : v)
  })),
  removeVoice: (id: string) => set((state: any) => ({
    voices: state.voices.filter((v: any) => v.id !== id)
  })),
}));
