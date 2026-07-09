// app/api/song/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { CreateSongForm } from '@/lib/types';

/**
 * POST /api/song
 * Accepts a CreateSongForm JSON payload and returns a mock song ID.
 * This placeholder can later be replaced with real Supabase insertion.
 */
export async function POST(req: Request) {
  try {
    const data: CreateSongForm = await req.json();
    // Basic validation (ensure required fields exist)
    if (!data.prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    const mockId = `tmp-${uuidv4()}`;
    // Return the mock ID – front‑end will log it.
    return NextResponse.json({ id: mockId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
