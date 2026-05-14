'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '../Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // Вимога менторів GoIT
  });

  const handleClose = () => {
    router.back(); // Повертає на маршрут, з якого відкрили модалку
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading preview...</p>}
      {isError || !note ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={css.container}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
        </div>
      )}
    </Modal>
  );
}
