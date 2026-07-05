// ─────────────────────────────────────────────
//  EchoVerse AI Music Studio — Constants
// ─────────────────────────────────────────────

import type {
  CreateSongForm,
  MixerSettings,
  Genre,
  Mood,
  Tempo,
  MusicalKey,
  Language,
  GenerationStep,
} from '@/lib/types';

// ── Default Form State ────────────────────────

export const DEFAULT_CREATE_FORM: CreateSongForm = {
  prompt: '',
  genre: 'pop',
  mood: 'happy',
  tempo: 'medium',
  key: 'C major',
  language: 'english',
  duration: 120,
  bpm: null,
  voiceProfileId: null,
  useCustomVoice: false,
  generateCoverArt: true,
  isPublic: false,
  tags: [],
};

// ── Default Mixer Settings ────────────────────

export const DEFAULT_MIXER_SETTINGS: MixerSettings = {
  vocalsVolume: 80,
  instrumentalVolume: 70,
  bassBoost: 0,
  trebleBoost: 0,
  reverb: 20,
  delay: 10,
  compression: 40,
  masterVolume: 85,
  pan: 0,
  eq: {
    low: 0,
    mid: 0,
    high: 0,
  },
};

// ── Genre Options ─────────────────────────────

export const GENRES: { value: Genre; label: string; emoji: string }[] = [
  { value: 'pop', label: 'Pop', emoji: '🎵' },
  { value: 'rock', label: 'Rock', emoji: '🎸' },
  { value: 'hip-hop', label: 'Hip-Hop', emoji: '🎤' },
  { value: 'jazz', label: 'Jazz', emoji: '🎷' },
  { value: 'classical', label: 'Classical', emoji: '🎻' },
  { value: 'electronic', label: 'Electronic', emoji: '🎹' },
  { value: 'cinematic', label: 'Cinematic', emoji: '🎬' },
  { value: 'r&b', label: 'R&B', emoji: '🎶' },
  { value: 'country', label: 'Country', emoji: '🤠' },
  { value: 'metal', label: 'Metal', emoji: '🤘' },
  { value: 'folk', label: 'Folk', emoji: '🪕' },
  { value: 'ambient', label: 'Ambient', emoji: '🌊' },
];

// ── Mood Options ──────────────────────────────

export const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'romantic', label: 'Romantic', emoji: '💕' },
  { value: 'dark', label: 'Dark', emoji: '🌑' },
  { value: 'uplifting', label: 'Uplifting', emoji: '🌟' },
  { value: 'melancholic', label: 'Melancholic', emoji: '🌧' },
  { value: 'aggressive', label: 'Aggressive', emoji: '🔥' },
  { value: 'dreamy', label: 'Dreamy', emoji: '✨' },
];

// ── Tempo Options ─────────────────────────────

export const TEMPOS: { value: Tempo; label: string; bpmRange: string }[] = [
  { value: 'slow', label: 'Slow', bpmRange: '60–80 BPM' },
  { value: 'medium', label: 'Medium', bpmRange: '80–110 BPM' },
  { value: 'fast', label: 'Fast', bpmRange: '110–150 BPM' },
  { value: 'very-fast', label: 'Very Fast', bpmRange: '150–200 BPM' },
];

// ── Musical Keys ──────────────────────────────

export const MUSICAL_KEYS: MusicalKey[] = [
  'C major',
  'C minor',
  'C# major',
  'C# minor',
  'D major',
  'D minor',
  'Eb major',
  'Eb minor',
  'E major',
  'E minor',
  'F major',
  'F minor',
  'F# major',
  'F# minor',
  'G major',
  'G minor',
  'Ab major',
  'Ab minor',
  'A major',
  'A minor',
  'Bb major',
  'Bb minor',
  'B major',
  'B minor',
];

// ── Language Options ──────────────────────────

export const LANGUAGES: { value: Language; label: string; nativeName: string }[] = [
  { value: 'english', label: 'English', nativeName: 'English' },
  { value: 'spanish', label: 'Spanish', nativeName: 'Español' },
  { value: 'french', label: 'French', nativeName: 'Français' },
  { value: 'portuguese', label: 'Portuguese', nativeName: 'Português' },
  { value: 'hindi', label: 'Hindi', nativeName: 'हिन्दी' },
  { value: 'japanese', label: 'Japanese', nativeName: '日本語' },
  { value: 'korean', label: 'Korean', nativeName: '한국어' },
  { value: 'mandarin', label: 'Mandarin', nativeName: '普通话' },
  { value: 'arabic', label: 'Arabic', nativeName: 'العربية' },
  { value: 'german', label: 'German', nativeName: 'Deutsch' },
  { value: 'italian', label: 'Italian', nativeName: 'Italiano' },
];

// ── Duration Options (seconds) ────────────────

export const DURATION_OPTIONS: { value: number; label: string }[] = [
  { value: 30, label: '0:30' },
  { value: 60, label: '1:00' },
  { value: 120, label: '2:00' },
  { value: 180, label: '3:00' },
  { value: 240, label: '4:00' },
];

// ── Generation Steps ──────────────────────────

export const GENERATION_STEPS: GenerationStep[] = [
  'queued',
  'generating-lyrics',
  'generating-music',
  'synthesizing-voice',
  'mixing',
  'mastering',
  'finalizing',
];

export const GENERATION_STEP_LABELS: Record<GenerationStep, string> = {
  queued: 'Queued',
  'generating-lyrics': 'Writing Lyrics',
  'generating-music': 'Composing Music',
  'synthesizing-voice': 'Synthesizing Voice',
  mixing: 'Mixing Tracks',
  mastering: 'Mastering Audio',
  finalizing: 'Finalizing Song',
};

export const GENERATION_STEP_MESSAGES: Record<GenerationStep, string> = {
  queued: 'Your song is in the queue...',
  'generating-lyrics':
    'Our AI is crafting lyrics tailored to your prompt and genre...',
  'generating-music':
    'Composing the perfect musical arrangement...',
  'synthesizing-voice':
    'Your voice clone is singing the lyrics...',
  mixing: 'Blending vocals, instruments, and effects...',
  mastering: 'Applying final polish and dynamic range optimization...',
  finalizing: 'Saving your masterpiece to your library...',
};

// ── App Config ────────────────────────────────

export const APP_NAME = 'EchoVerse AI';
export const APP_TAGLINE = 'Create Extraordinary Music with AI';
export const MAX_TAGS = 10;
export const MAX_PROMPT_LENGTH = 500;
export const WAVEFORM_SAMPLE_COUNT = 200;
export const MAX_VOICE_SAMPLES = 10;
export const MIN_VOICE_SAMPLE_SECONDS = 5;
export const MAX_VOICE_SAMPLE_SECONDS = 60;

// ── Plan Limits ───────────────────────────────

export const PLAN_LIMITS = {
  free: { generationsPerMonth: 5, maxDurationSeconds: 60, voiceClones: 1 },
  pro: { generationsPerMonth: 50, maxDurationSeconds: 180, voiceClones: 5 },
  studio: { generationsPerMonth: 500, maxDurationSeconds: 240, voiceClones: 20 },
} as const;
