import axios from 'axios';
import type { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({ 
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/json',
    },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1, 
  search: string = '', 
  tag?: string
): Promise<FetchNotesResponse> => {
  const queryParams: Record<string, any> = { page, search, perPage: 12 };
  
  if (tag && tag !== 'all') {
    queryParams.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};