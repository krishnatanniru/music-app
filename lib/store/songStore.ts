// lib/store/songStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CreateSongForm } from '@/lib/types';

interface SongState {
  drafts: Record<string, CreateSongForm>;
  saveDraft: (id: string, data: CreateSongForm) => void;
  deleteDraft: (id: string) => void;
}

export const useSongStore = create<SongState>()(
  devtools(set => ({
    drafts: {},
    saveDraft: (id, data) => set(state => ({ drafts: { ...state.drafts, [id]: data } })),
    deleteDraft: id => set(state => ({ drafts: Object.fromEntries(Object.entries(state.drafts).filter(([k]) => k !== id)) })),
  }))
);
