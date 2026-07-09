// app/api/generation/cancel/route.ts
import { NextResponse } from 'next/server';
import { jobStore } from '@/app/api/generation/start/route';

/**
 * POST /api/generation/cancel
 * Body: { jobId: string }
 * Removes the job from the store to simulate cancellation.
 */
export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
    }

    if (!jobStore.has(jobId)) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    jobStore.delete(jobId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
