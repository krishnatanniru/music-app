// app/api/generation/start/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { GenerationStep } from '@/lib/types';

/**
 * In-memory mock store for job states.
 * Key: jobId, Value: current progress state.
 * In production this would be replaced by a real job queue (e.g. Supabase + Redis).
 */
export const jobStore = new Map<
  string,
  {
    songId: string;
    stepIndex: number;
    steps: GenerationStep[];
    audioUrl: string | null;
    error: string | null;
    startedAt: string;
    completedAt: string | null;
  }
>();

const STEPS: GenerationStep[] = [
  'queued',
  'generating-lyrics',
  'generating-music',
  'synthesizing-voice',
  'mixing',
  'mastering',
  'finalizing',
];

/**
 * POST /api/generation/start
 * Body: { songId: string }
 * Returns: { jobId: string }
 */
export async function POST(req: Request) {
  try {
    const { songId } = await req.json();
    if (!songId) {
      return NextResponse.json({ error: 'songId is required' }, { status: 400 });
    }

    const jobId = uuidv4();
    jobStore.set(jobId, {
      songId,
      stepIndex: 0,
      steps: STEPS,
      audioUrl: null,
      error: null,
      startedAt: new Date().toISOString(),
      completedAt: null,
    });

    // Simulate progression in background (non-blocking)
    simulateProgress(jobId);

    return NextResponse.json({ jobId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/** Advances the mock job through steps every 2 seconds */
function simulateProgress(jobId: string) {
  const interval = setInterval(() => {
    const job = jobStore.get(jobId);
    if (!job) {
      clearInterval(interval);
      return;
    }

    if (job.stepIndex < STEPS.length - 1) {
      jobStore.set(jobId, { ...job, stepIndex: job.stepIndex + 1 });
    } else {
      // Final step – mark complete with a mock audio URL
      jobStore.set(jobId, {
        ...job,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        completedAt: new Date().toISOString(),
      });
      clearInterval(interval);
    }
  }, 2000);
}
