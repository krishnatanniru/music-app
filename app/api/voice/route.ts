// app/api/voice/route.ts
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

/**
 * GET /api/voice
 * Returns the list of voice profiles for the authenticated user.
 */
export async function GET(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }
  const { data, error } = await supabase
    .from('voice_profiles')
    .select('id, name, url, created_at, duration')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const voices = data.map(v => ({
    id: v.id,
    name: v.name,
    url: v.url,
    createdAt: v.created_at,
    duration: v.duration,
  }));
  return NextResponse.json(voices);
}

/**
 * POST /api/voice
 * Accepts multipart/form-data with fields:
 *   - file: WAV audio blob
 *   - name: voice name
 * Stores the file in Supabase Storage bucket "voice-files" and inserts a DB row.
 */
export async function POST(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const name = form.get('name') as string | null;
  if (!file || !name) {
    return NextResponse.json({ error: 'Missing file or name' }, { status: 400 });
  }
  if (file.type !== 'audio/wav') {
    return NextResponse.json({ error: 'Only WAV files are accepted' }, { status: 400 });
  }
  const filePath = `${user.id}/${Date.now()}_${file.name}`;
  const { data: storageData, error: storageError } = await supabase.storage
    .from('voice-files')
    .upload(filePath, file, { upsert: false, contentType: 'audio/wav' });
  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }
  const publicUrl = supabase.storage.from('voice-files').getPublicUrl(filePath).data.publicUrl;
  const duration = await getAudioDuration(file);
  const { data: dbData, error: dbError } = await supabase
    .from('voice_profiles')
    .insert({
      user_id: user.id,
      name,
      url: publicUrl,
      duration,
    })
    .select();
  if (dbError) {
    await supabase.storage.from('voice-files').remove([filePath]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
  const inserted = dbData[0];
  const profile = {
    id: inserted.id,
    name: inserted.name,
    url: inserted.url,
    createdAt: inserted.created_at,
    duration: inserted.duration,
  };
  return NextResponse.json(profile, { status: 201 });
}

/** Utility: extract duration (seconds) from a File via Audio element */
function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      const dur = audio.duration;
      URL.revokeObjectURL(url);
      resolve(Math.round(dur));
    });
    setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve(0);
    }, 3000);
  });
}
