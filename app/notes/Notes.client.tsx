'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api'; // Перевірте, чи шлях правильний
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

interface NotesClientProps {
  activeTag?: string;
}

export default function NotesClient({ activeTag = 'all' }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, activeTag],
    queryFn: () => fetchNotes(page, search, activeTag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            forcePage={page - 1}
            onPageChange={p => setPage(p + 1)}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes.</p>}
        {data?.notes.length === 0 && !isLoading && (
          <p className={css.empty}>No notes found.</p>
        )}
        {data && <NoteList notes={data.notes} />}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
