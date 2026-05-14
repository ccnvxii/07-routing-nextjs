import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';

interface PageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { tag } = await params;
  const currentTag = tag?.[0] || 'all';

  const queryClient = new QueryClient();

  // Попереднє завантаження на сервері з урахуванням обраного тегу
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () => fetchNotes(1, '', currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаємо поточний тег у клієнтський компонент */}
      <NotesClient activeTag={currentTag} />
    </HydrationBoundary>
  );
}
