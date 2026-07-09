// app/song/create/page.tsx
'use client';

import { useState } from 'react';
import { useSongStore } from '@/lib/store/songStore';
import { useVoiceStore } from '@/lib/store/voiceStore';
import { useGenerationStore } from '@/lib/store/generation-store';
import { CreateSongForm, Genre, Mood, Tempo, MusicalKey, Language } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import styles from './SongCreate.module.css';

export default function CreateSongPage() {
  const [form, setForm] = useState<CreateSongForm>(
    {
      prompt: '',
      genre: 'pop',
      mood: 'happy',
      tempo: 'medium',
      key: 'C major',
      language: 'english',
      duration: 3,
      bpm: null,
      voiceProfileId: null,
      useCustomVoice: false,
      generateCoverArt: false,
      isPublic: false,
      tags: [],
    }
  );
  const [submitting, setSubmitting] = useState(false);
  const { voices } = useVoiceStore(state => ({ voices: state.voices }));
  const { openModal } = useGenerationStore();

  const handleChange = (field: keyof CreateSongForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Save draft locally
      const draftId = uuidv4();
      useSongStore.getState().saveDraft(draftId, form);

      // Create song via API
      const songRes = await fetch('/api/song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!songRes.ok) throw new Error('Failed to create song');
      const { id: songId } = await songRes.json();

      // Start generation and open modal
      const genRes = await fetch('/api/generation/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId }),
      });
      if (!genRes.ok) throw new Error('Failed to start generation');
      const { jobId } = await genRes.json();

      openModal(jobId, songId);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Song</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Prompt */}
        <label className={styles.label}>Prompt</label>
        <textarea
          className={styles.textarea}
          value={form.prompt}
          onChange={e => handleChange('prompt', e.target.value)}
          placeholder="Describe the vibe, story, or any ideas for the song..."
          rows={4}
          required
        />

        {/* Advanced Settings – collapsible */}
        <details className={styles.advanced} open>
          <summary className={styles.summary}>Advanced Settings</summary>
          <div className={styles.grid}>
            {/* Genre */}
            <div className={styles.field}>
              <label className={styles.label}>Genre</label>
              <select
                className={styles.select}
                value={form.genre}
                onChange={e => handleChange('genre', e.target.value as Genre)}
              >
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip‑hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="electronic">Electronic</option>
                <option value="cinematic">Cinematic</option>
                <option value="r&b">R&amp;B</option>
                <option value="country">Country</option>
                <option value="metal">Metal</option>
                <option value="folk">Folk</option>
                <option value="ambient">Ambient</option>
              </select>
            </div>
            {/* Mood */}
            <div className={styles.field}>
              <label className={styles.label}>Mood</label>
              <select
                className={styles.select}
                value={form.mood}
                onChange={e => handleChange('mood', e.target.value as Mood)}
              >
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="energetic">Energetic</option>
                <option value="calm">Calm</option>
                <option value="romantic">Romantic</option>
                <option value="dark">Dark</option>
                <option value="uplifting">Uplifting</option>
                <option value="melancholic">Melancholic</option>
                <option value="aggressive">Aggressive</option>
                <option value="dreamy">Dreamy</option>
              </select>
            </div>
            {/* Tempo */}
            <div className={styles.field}>
              <label className={styles.label}>Tempo</label>
              <select
                className={styles.select}
                value={form.tempo}
                onChange={e => handleChange('tempo', e.target.value as Tempo)}
              >
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
                <option value="very-fast">Very Fast</option>
              </select>
            </div>
            {/* Key */}
            <div className={styles.field}>
              <label className={styles.label}>Key</label>
              <select
                className={styles.select}
                value={form.key}
                onChange={e => handleChange('key', e.target.value as MusicalKey)}
              >
                <option value="C major">C Major</option>
                <option value="C minor">C Minor</option>
                <option value="D major">D Major</option>
                <option value="D minor">D Minor</option>
                <option value="E major">E Major</option>
                <option value="E minor">E Minor</option>
                {/* ... add other keys as needed */}
              </select>
            </div>
            {/* Language */}
            <div className={styles.field}>
              <label className={styles.label}>Language</label>
              <select
                className={styles.select}
                value={form.language}
                onChange={e => handleChange('language', e.target.value as Language)}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="portuguese">Portuguese</option>
                <option value="hindi">Hindi</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="mandarin">Mandarin</option>
                <option value="arabic">Arabic</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
              </select>
            </div>
            {/* Duration */}
            <div className={styles.field}>
              <label className={styles.label}>Duration (min)</label>
              <input
                type="number"
                min={1}
                max={20}
                className={styles.input}
                value={form.duration}
                onChange={e => handleChange('duration', Number(e.target.value))}
                required
              />
            </div>
            {/* BPM */}
            <div className={styles.field}>
              <label className={styles.label}>BPM (optional)</label>
              <input
                type="number"
                min={60}
                max={240}
                className={styles.input}
                value={form.bpm ?? ''}
                onChange={e => handleChange('bpm', e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            {/* Voice Profile */}
            <div className={styles.field}>
              <label className={styles.label}>Voice Profile</label>
              <select
                className={styles.select}
                value={form.voiceProfileId ?? ''}
                onChange={e => handleChange('voiceProfileId', e.target.value || null)}
              >
                <option value="">None (default)</option>
                {voices.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Custom Voice toggle */}
            <div className={styles.fieldCheckbox}>
              <input
                type="checkbox"
                id="customVoice"
                checked={form.useCustomVoice}
                onChange={e => handleChange('useCustomVoice', e.target.checked)}
              />
              <label htmlFor="customVoice" className={styles.checkboxLabel}>Use Custom Voice (upload later)</label>
            </div>
            {/* Cover Art */}
            <div className={styles.fieldCheckbox}>
              <input
                type="checkbox"
                id="coverArt"
                checked={form.generateCoverArt}
                onChange={e => handleChange('generateCoverArt', e.target.checked)}
              />
              <label htmlFor="coverArt" className={styles.checkboxLabel}>Generate Cover Art</label>
            </div>
            {/* Visibility */}
            <div className={styles.fieldCheckbox}>
              <input
                type="checkbox"
                id="public"
                checked={form.isPublic}
                onChange={e => handleChange('isPublic', e.target.checked)}
              />
              <label htmlFor="public" className={styles.checkboxLabel}>Publicly visible</label>
            </div>
            {/* Tags */}
            <div className={styles.field}>
              <label className={styles.label}>Tags (comma separated)</label>
              <input
                type="text"
                className={styles.input}
                value={form.tags.join(', ')}
                onChange={e =>
                  handleChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))
                }
                placeholder="e.g. chill, summer, acoustic"
              />
            </div>
          </div>
        </details>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={submitting}
        >
          {submitting ? 'Creating…' : 'Create Song'}
        </button>
      </form>
    </div>
  );
}
