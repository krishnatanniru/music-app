// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || 'https://example.supabase.co';
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
