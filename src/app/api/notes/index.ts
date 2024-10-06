import axios from 'axios';
import { NoteResponse, FolderInfo, CreateNoteRequest, DeleteNoteResponse } from '@/app/types/note';
import { baseURL } from '..';
// Fetch notes by folder ID
export const fetchNotes = async (folderId: number): Promise<NoteResponse> => {
  const response = await axios.get(`${baseURL}/api/v1/professor/note/${folderId}`);
  return response.data;
};

// Create a new note
export const createNote = async (folderId: number, noteData: CreateNoteRequest): Promise<{ message: string }> => {
  const response = await axios.post(`${baseURL}/api/v1/professor/note/${folderId}`, noteData);
  return response.data;
};

// Fetch folder info by folder ID
export const fetchFolderInfo = async (folderId: number): Promise<FolderInfo> => {
  const response = await axios.get(`${baseURL}/api/v1/professor/note/${folderId}/info`);
  return response.data;
};

// Delete note by note ID
export const deleteNote = async (noteId: number): Promise<DeleteNoteResponse> => {
  const response = await axios.delete(`${baseURL}/api/v1/professor/note/${noteId}`);
  return response.data;
};
