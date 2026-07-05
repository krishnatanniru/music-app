// ─────────────────────────────────────────────
//  EchoVerse AI — Mock Job Queue + Progress Emitter
//  (Replace with BullMQ / Inngest / Trigger.dev in prod)
// ─────────────────────────────────────────────

import type { GenerationProgress, GenerationStep, CreateSongForm } from '@/lib/types';
import type { JobQueueProvider, ProgressEmitter } from '@/lib/services/providers';

// ── Progress Emitter ───────────────────────────────────────────────────────
//  A simple event-emitter that allows any number of subscribers
//  to receive GenerationProgress updates keyed by jobId.

type ProgressCallback = (progress: GenerationProgress) => void;

class ClientProgressEmitter implements ProgressEmitter {
  private listeners: Map<string, Set<ProgressCallback>> = new Map();

  subscribe(jobId: string, callback: ProgressCallback): () => void {
    if (!this.listeners.has(jobId)) {
      this.listeners.set(jobId, new Set());
    }
    this.listeners.get(jobId)!.add(callback);

    return () => {
      const callbacks = this.listeners.get(jobId);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.listeners.delete(jobId);
        }
      }
    };
  }

  emit(jobId: string, progress: GenerationProgress): void {
    const callbacks = this.listeners.get(jobId);
    if (callbacks) {
      callbacks.forEach((cb) => cb(progress));
    }
  }
}

export const progressEmitter = new ClientProgressEmitter();

// ── Step Definitions ───────────────────────────────────────────────────────

const STEP_SEQUENCE: Array<{
  step: GenerationStep;
  label: string;
  durationMs: number;
  messages: string[];
}> = [
  {
    step: 'queued',
    label: 'Queued',
    durationMs: 800,
    messages: [
      'Adding to generation queue...',
      'Checking available resources...',
    ],
  },
  {
    step: 'generating-lyrics',
    label: 'Writing Lyrics',
    durationMs: 3500,
    messages: [
      'Analyzing prompt and extracting musical themes...',
      'Crafting verse 1 with emotional arc...',
      'Building pre-chorus transition...',
      'Writing powerful chorus hook...',
      'Composing verse 2 with narrative depth...',
      'Designing bridge with harmonic contrast...',
      'Polishing rhyme scheme and syllable count...',
    ],
  },
  {
    step: 'generating-music',
    label: 'Composing Music',
    durationMs: 4000,
    messages: [
      'Selecting key signature and time signature...',
      'Composing chord progression in G minor...',
      'Building melodic motif for verse...',
      'Generating instrumental arrangement...',
      'Adding layered strings and acoustic guitar...',
      'Crafting dynamic build for chorus...',
      'Finalizing orchestral outro...',
    ],
  },
  {
    step: 'synthesizing-voice',
    label: 'Synthesizing Voice',
    durationMs: 4500,
    messages: [
      'Loading voice profile and characteristics...',
      'Generating verse 1 of 2...',
      'Rendering pre-chorus with emotion curve...',
      'Synthesizing chorus with power inflection...',
      'Processing verse 2 vocal performance...',
      'Adding breath control and vibrato...',
      'Rendering bridge with voice modulation...',
    ],
  },
  {
    step: 'mixing',
    label: 'Mixing Tracks',
    durationMs: 2500,
    messages: [
      'Aligning vocal timing with instrumental...',
      'Balancing frequency spectrum...',
      'Applying EQ to cut muddiness at 300Hz...',
      'Adding stereo width and spatial effects...',
      'Setting compression ratios for dynamics...',
    ],
  },
  {
    step: 'mastering',
    label: 'Mastering Audio',
    durationMs: 2000,
    messages: [
      'Running final loudness normalization...',
      'Applying multiband compression...',
      'Enhancing high-end clarity and brightness...',
      'Limiting peaks to -1dBFS...',
    ],
  },
  {
    step: 'finalizing',
    label: 'Finalizing',
    durationMs: 1500,
    messages: [
      'Encoding to high-quality MP3 and FLAC...',
      'Generating waveform visualization data...',
      'Saving to your music library...',
      'Song ready! 🎵',
    ],
  },
];

// ── Job Queue ──────────────────────────────────────────────────────────────

class MockJobQueue implements JobQueueProvider {
  private activeJobs: Map<string, boolean> = new Map();

  async enqueueGenerationJob(
    params: CreateSongForm & { userId: string; songId: string },
  ): Promise<{ jobId: string }> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.activeJobs.set(jobId, true);

    // Start async simulation — does not block the caller
    this.simulateGeneration(jobId, params.songId);

    return { jobId };
  }

  async getJobStatus(jobId: string): Promise<GenerationProgress | null> {
    if (!this.activeJobs.has(jobId)) return null;
    // In a real implementation this would query the queue backend
    return null;
  }

  async cancelJob(jobId: string): Promise<void> {
    this.activeJobs.delete(jobId);
  }

  private async simulateGeneration(jobId: string, songId: string): Promise<void> {
    const totalSteps = STEP_SEQUENCE.length;

    for (let stepIndex = 0; stepIndex < totalSteps; stepIndex++) {
      // Check if cancelled
      if (!this.activeJobs.get(jobId)) return;

      const stepDef = STEP_SEQUENCE[stepIndex];
      const tickInterval = stepDef.durationMs / 20; // 20 progress ticks per step
      const messageInterval = Math.floor(20 / Math.max(stepDef.messages.length, 1));

      for (let tick = 0; tick <= 20; tick++) {
        if (!this.activeJobs.get(jobId)) return;

        const stepProgress = Math.round((tick / 20) * 100);
        const overallProgress = Math.round(
          ((stepIndex + tick / 20) / totalSteps) * 100,
        );

        const messageIdx = Math.min(
          Math.floor(tick / messageInterval),
          stepDef.messages.length - 1,
        );

        const now = new Date().toISOString();
        const progress: GenerationProgress = {
          jobId,
          songId,
          step: stepDef.step,
          stepIndex,
          totalSteps,
          progress: overallProgress,
          stepProgress,
          message: stepDef.messages[messageIdx],
          estimatedSecondsRemaining: Math.round(
            ((totalSteps - stepIndex - tick / 20) * (stepDef.durationMs / 1000)) * 0.9,
          ),
          startedAt: now,
          completedAt: stepIndex === totalSteps - 1 && tick === 20 ? now : null,
          error: null,
        };

        progressEmitter.emit(jobId, progress);

        await sleep(tickInterval);
      }
    }

    // Mark as done
    this.activeJobs.delete(jobId);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const jobQueue = new MockJobQueue();
