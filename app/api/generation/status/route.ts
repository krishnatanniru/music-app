// app/api/generation/status/route.ts
import { NextResponse } from 'next/server';
import { jobStore } from '@/app/api/generation/start/route';
import type { GenerationStep } from '@/lib/types';

const STEPS: GenerationStep[] = [
  'queued',
  'generating-lyrics',
  'generating-music',
  'synthesizing-voice',
  'mixing',
  'mastering',
  'finalizing',
];

const STEP_MESSAGES: Record<GenerationStep, string> = {
  queued: 'Your song is queued for generation...',
  'generating-lyrics': 'AI is crafting your lyrics...',
  'generating-music': 'Composing the musical arrangement...',
  'synthesizing-voice': 'Synthesizing vocals with your voice profile...',
  mixing: 'Blending all audio tracks together...',
  mastering: 'Applying final mastering touches...',
  finalizing: 'Finalizing and packaging your song...',
};

/**
 * GET /api/generation/status?jobId=…
 * Returns GenerationProgress-shaped JSON.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
  }

  const job = jobStore.get(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  const stepIndex = job.stepIndex;
  const step = STEPS[stepIndex] as GenerationStep;
  const totalSteps = STEPS.length;
  // overall 0-100
  const progress = Math.round((stepIndex / (totalSteps - 1)) * 100);

  return NextResponse.json({
    jobId,
    songId: job.songId,
    step,
    stepIndex,
    totalSteps,
    progress,
    stepProgress: job.completedAt ? 100 : 50,
    message: STEP_MESSAGES[step],
    estimatedSecondsRemaining: job.completedAt ? 0 : (totalSteps - stepIndex) * 2,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
    audioUrl: job.audioUrl,
    error: job.error,
  });
}
