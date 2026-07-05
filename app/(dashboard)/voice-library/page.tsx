import type { Metadata } from 'next';
import VoiceLibraryClient from '@/components/voice/VoiceLibraryClient';

export const metadata: Metadata = {
  title: 'Voice Library | EchoVerse AI',
  description:
    'Manage your custom AI voice profiles. Clone your voice, train it, and use it to generate songs.',
};

export default function VoiceLibraryPage() {
  return <VoiceLibraryClient />;
}
