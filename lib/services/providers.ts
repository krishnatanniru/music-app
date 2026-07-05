// ─────────────────────────────────────────────
//  EchoVerse AI Music Studio — Provider Interfaces
//  Swap any implementation for a real AI API without
//  touching a single call-site.
// ─────────────────────────────────────────────

import type {
  Song,
  VoiceProfile,
  CreateSongForm,
  LyricsSection,
  GenerationProgress,
  GenerationStep,
} from '@/lib/types';

// Keep the re-exports here so callers only need one import path.
export type {
  Song,
  VoiceProfile,
  CreateSongForm,
  LyricsSection,
  GenerationProgress,
  GenerationStep,
};

// ── Lyrics Provider ───────────────────────────
//  Swap with: OpenAI / Claude / Gemini / Mistral

export interface LyricsProvider {
  /**
   * Generate a complete structured lyric set from a natural-language prompt.
   */
  generateLyrics(params: {
    prompt: string;
    genre: string;
    mood: string;
    language: string;
    duration: number;
  }): Promise<{
    sections: LyricsSection[];
    rawLyrics: string;
    title: string;
  }>;

  /**
   * Rewrite a single LyricsSection according to a free-text instruction.
   * e.g. "Make it more melancholic" or "Add an AABB rhyme scheme"
   */
  rewriteSection(
    section: LyricsSection,
    instruction: string,
  ): Promise<LyricsSection>;

  /**
   * Translate every section into the target language while preserving
   * section structure.
   */
  translateLyrics(
    lyrics: LyricsSection[],
    targetLanguage: string,
  ): Promise<LyricsSection[]>;

  /**
   * Return up to 6 rhyming words for the given input word.
   */
  suggestRhymes(word: string, language: string): Promise<string[]>;

  /**
   * Generate a creative song title given a prompt and genre.
   */
  generateTitle(prompt: string, genre: string): Promise<string>;
}

// ── Music Provider ────────────────────────────
//  Swap with: Suno / Udio / MusicGen / Stable Audio / ACE-Step

export interface MusicProvider {
  /**
   * Generate a full audio track (with separate instrumental stem) from lyrics
   * and musical parameters.
   */
  generateMusic(params: {
    lyrics: LyricsSection[];
    genre: string;
    mood: string;
    tempo: string;
    key: string;
    duration: number;
    bpm?: number;
  }): Promise<{
    audioUrl: string;
    instrumentalUrl: string;
    waveformData: number[];
    bpm: number;
  }>;

  /**
   * Extend an already-generated song by additional seconds.
   */
  extendSong(
    songId: string,
    additionalSeconds: number,
  ): Promise<{ audioUrl: string }>;

  /**
   * Remix an existing song according to a free-text instruction.
   * e.g. "Add a string section in the bridge"
   */
  remixSong(
    songId: string,
    instruction: string,
  ): Promise<{ audioUrl: string }>;

  /**
   * Generate a MIDI melody for use downstream in voice synthesis or mixing.
   */
  generateMelody(params: {
    genre: string;
    mood: string;
    key: string;
    bpm: number;
  }): Promise<{ midiData: string }>;
}

// ── Voice Provider ────────────────────────────
//  Swap with: ElevenLabs / Cartesia / XTTS / OpenVoice / Fish Speech

export interface VoiceProvider {
  /**
   * Clone a voice from one or more reference audio file URLs.
   * Returns a provider-assigned voiceId and the initial training status.
   */
  cloneVoice(params: {
    audioFiles: string[];
    name: string;
    language: string;
    gender: string;
  }): Promise<{ voiceId: string; status: string }>;

  /**
   * Synthesise singing vocals for the given lyrics and melody.
   */
  synthesizeSinging(params: {
    voiceId: string;
    lyrics: string;
    melody: string;
    genre: string;
  }): Promise<{ vocalsUrl: string }>;

  /**
   * Generate a short spoken preview of the voice with the provided text.
   */
  previewVoice(voiceId: string, text: string): Promise<{ audioUrl: string }>;

  /**
   * Permanently remove a cloned voice from the provider.
   */
  deleteVoice(voiceId: string): Promise<void>;

  /**
   * Poll the current training status and progress percentage (0-100).
   */
  getTrainingStatus(
    voiceId: string,
  ): Promise<{ status: string; progress: number }>;
}

// ── Image Provider ────────────────────────────
//  Swap with: OpenAI DALL-E / Stable Diffusion / Flux / Ideogram

export interface ImageProvider {
  /**
   * Generate album cover art and a thumbnail variant.
   */
  generateCoverArt(params: {
    prompt: string;
    genre: string;
    mood: string;
    title: string;
  }): Promise<{ imageUrl: string; thumbnailUrl: string }>;
}

// ── Job Queue Provider ────────────────────────
//  Swap with: BullMQ + Redis / Inngest / Trigger.dev

export interface JobQueueProvider {
  /**
   * Enqueue a full song-generation job.
   * Returns immediately with the assigned jobId.
   */
  enqueueGenerationJob(
    params: CreateSongForm & { userId: string; songId: string },
  ): Promise<{ jobId: string }>;

  /**
   * Return the current GenerationProgress snapshot for a job,
   * or null if the job does not exist.
   */
  getJobStatus(jobId: string): Promise<GenerationProgress | null>;

  /**
   * Cancel a running job and clean up any in-flight work.
   */
  cancelJob(jobId: string): Promise<void>;
}

// ── Progress Emitter ──────────────────────────
//  Swap with: WebSockets / Server-Sent Events / Pusher / Ably

export interface ProgressEmitter {
  /**
   * Subscribe to progress updates for a given jobId.
   * Returns an unsubscribe function — call it to stop receiving updates.
   */
  subscribe(
    jobId: string,
    callback: (progress: GenerationProgress) => void,
  ): () => void;

  /**
   * Publish a progress update to all subscribers for a given jobId.
   */
  emit(jobId: string, progress: GenerationProgress): void;
}
