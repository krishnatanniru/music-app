import type { Metadata } from 'next';
import SongResultClient from './SongResultClient';

export const metadata: Metadata = {
  title: 'Song Result – EchoVerse',
  description: 'View and manage your AI-generated song.',
};

export default async function SongResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SongResultClient id={id} />;
}
