// lib/store/voiceStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { VoiceProfile } from '@/lib/types';

interface VoiceState {
  voices: VoiceProfile[];
  setVoices: (voices: VoiceProfile[]) => void;
  fetchVoices: () => Promise<void>;
  addVoice: (file: File, name: string) => Promise<void>;
  deleteVoice: (id: string) => Promise<void>;
  renameVoice: (id: string, newName: string) => Promise<void>;
}

export const useVoiceStore = create<VoiceState>()(
  devtools((set, get) => ({
    voices: [],
    setVoices: (voices: VoiceProfile[]) => set({ voices }),
    fetchVoices: async () => {
      const res = await fetch('/api/voice');
      if (!res.ok) throw new Error('Failed to fetch voices');
      const data: VoiceProfile[] = await res.json();
      set({ voices: data });
    },
    addVoice: async (file, name) => {
      const form = new FormData()
      form.append('file', file)
      form.append('name', name)
      const res = await fetch('/api/voice', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Failed to upload voice')
      await get().fetchVoices()
    },
    deleteVoice: async (id) => {
      const res = await fetch(`/api/voice/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete voice')
      await get().fetchVoices()
    },
    renameVoice: async (id, newName) => {
      const res = await fetch(`/api/voice/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      })
      if (!res.ok) throw new Error('Failed to rename voice')
      await get().fetchVoices()
    },
  }))
)
