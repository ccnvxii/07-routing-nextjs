import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params; // Змінили tag на slug
  const currentTag = slug?.[0] || 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () => fetchNotes(1, '', currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient activeTag={currentTag} />
    </HydrationBoundary>
  );
}
