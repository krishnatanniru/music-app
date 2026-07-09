import type { Metadata } from 'next';
import LyricsEditorClient from './LyricsEditorClient';

export const metadata: Metadata = {
  title: 'Lyrics Editor – EchoVerse',
  description: 'Edit and arrange your AI-generated song lyrics.',
};

export default async function LyricsEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LyricsEditorClient songId={id} />;
}
