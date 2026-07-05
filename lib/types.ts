// ─────────────────────────────────────────────
//  EchoVerse AI Music Studio — Core Types
// ─────────────────────────────────────────────

// ── Enumerations ──────────────────────────────

export type Genre =
  | 'pop'
  | 'rock'
  | 'hip-hop'
  | 'jazz'
  | 'classical'
  | 'electronic'
  | 'cinematic'
  | 'r&b'
  | 'country'
  | 'metal'
  | 'folk'
  | 'ambient';

export type Mood =
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'calm'
  | 'romantic'
  | 'dark'
  | 'uplifting'
  | 'melancholic'
  | 'aggressive'
  | 'dreamy';

export type Tempo = 'slow' | 'medium' | 'fast' | 'very-fast';

export type MusicalKey =
  | 'C major'
  | 'C minor'
  | 'D major'
  | 'D minor'
  | 'E major'
  | 'E minor'
  | 'F major'
  | 'F minor'
  | 'G major'
  | 'G minor'
  | 'A major'
  | 'A minor'
  | 'B major'
  | 'B minor'
  | 'C# major'
  | 'C# minor'
  | 'Eb major'
  | 'Eb minor'
  | 'F# major'
  | 'F# minor'
  | 'Ab major'
  | 'Ab minor'
  | 'Bb major'
  | 'Bb minor';

export type Language =
  | 'english'
  | 'spanish'
  | 'french'
  | 'portuguese'
  | 'hindi'
  | 'japanese'
  | 'korean'
  | 'mandarin'
  | 'arabic'
  | 'german'
  | 'italian';

export type SongStatus =
  | 'draft'
  | 'generating'
  | 'ready'
  | 'failed'
  | 'published';

export type LyricsSectionType =
  | 'verse'
  | 'chorus'
  | 'bridge'
  | 'pre-chorus'
  | 'outro'
  | 'intro'
  | 'hook';

export type GenerationStep =
  | 'queued'
  | 'generating-lyrics'
  | 'generating-music'
  | 'synthesizing-voice'
  | 'mixing'
  | 'mastering'
  | 'finalizing';

export type VoiceGender = 'male' | 'female' | 'neutral';

export type VoiceTrainingStatus =
  | 'uploading'
  | 'cleaning'
  | 'training'
  | 'ready'
  | 'failed';

export type NotificationType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'generation-complete';

// ── Lyrics ────────────────────────────────────

export interface LyricsSection {
  id: string;
  type: LyricsSectionType;
  title: string;
  content: string;
  lineCount: number;
  order: number;
}

// ── Voice Profile ──────────────────────────────

export interface VoiceProfile {
  id: string;
  name: string;
  gender: VoiceGender;
  language: Language;
  description: string;
  audioSamples: string[];
  previewUrl?: string;
  voiceId: string;
  status: VoiceTrainingStatus;
  trainingProgress: number;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

// ── Song ──────────────────────────────────────

export interface Song {
  id: string;
  title: string;
  prompt: string;
  genre: Genre;
  mood: Mood;
  tempo: Tempo;
  key: MusicalKey;
  language: Language;
  duration: number;
  bpm: number;
  lyrics: LyricsSection[];
  audioUrl: string | null;
  instrumentalUrl: string | null;
  vocalsUrl: string | null;
  coverArtUrl: string | null;
  thumbnailUrl: string | null;
  waveformData: number[];
  voiceProfileId: string | null;
  status: SongStatus;
  jobId: string | null;
  plays: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  tags: string[];
}

// ── Create-Song Form ──────────────────────────

export interface CreateSongForm {
  prompt: string;
  genre: Genre;
  mood: Mood;
  tempo: Tempo;
  key: MusicalKey;
  language: Language;
  duration: number;
  bpm: number | null;
  voiceProfileId: string | null;
  useCustomVoice: boolean;
  generateCoverArt: boolean;
  isPublic: boolean;
  tags: string[];
}

// ── Generation Progress ───────────────────────

export interface GenerationProgress {
  jobId: string;
  songId: string;
  step: GenerationStep;
  stepIndex: number;
  totalSteps: number;
  progress: number;
  stepProgress: number;
  message: string;
  estimatedSecondsRemaining: number | null;
  startedAt: string;
  completedAt: string | null;
  error: string | null;
}

// ── Mixer Settings ────────────────────────────

export interface MixerSettings {
  vocalsVolume: number;
  instrumentalVolume: number;
  bassBoost: number;
  trebleBoost: number;
  reverb: number;
  delay: number;
  compression: number;
  masterVolume: number;
  pan: number;
  eq: {
    low: number;
    mid: number;
    high: number;
  };
}

// ── Notification ──────────────────────────────

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  songId: string | null;
  actionUrl: string | null;
}

// ── User Profile ──────────────────────────────

export interface UserProfile {
  id: string;
  clerkId: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string;
  planTier: 'free' | 'pro' | 'studio';
  generationsUsed: number;
  generationsLimit: number;
  createdAt: string;
}

// ── Waveform Data ─────────────────────────────

export type WaveformData = number[];
