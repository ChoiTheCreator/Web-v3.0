import {
  NoteResponse,
  FolderInfo,
  CreateNoteRequest,
  DeleteNoteResponse,
} from "@/app/types/note";
import { baseURL } from "..";
import apiClient from "@/app/utils/api";
import toast from "react-hot-toast";

export const fetchNotes = async (folderId: number): Promise<NoteResponse> => {
  const response = await apiClient.get(
    `${baseURL}/api/v1/folders/${folderId}/notes`
  );

  return response.data;
};

//새 노트 만들기
export const createNote = async (
  folderId: number,
  noteData: CreateNoteRequest
): Promise<any> => {
  const response = await apiClient.post(
    `/api/v1/folders/${folderId}/notes`,
    noteData
  );
  return response.data;
};

export const createSTT = async (
  folderId: number,
  noteId: number,
  file: File
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/api/v1/folders/${folderId}/notes/${noteId}/stt`,
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("STT 처리 중 오류가 발생했습니다.");
  }
};

export const createNoteSTT = async (
  folderId: number,
  noteId: number,
  keywords: string | null,
  requirement: string | null
): Promise<any> => {
  try {
    const formData = new FormData();
    if (keywords && keywords.trim()) {
      formData.append("keywords", keywords.trim());
    }
    if (requirement && requirement.trim()) {
      formData.append("requirement", requirement.trim());
    }

    const res = await apiClient.post(
      `/api/v1/professor/practice/${noteId}/new`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    if ((error as any)?.response) {
      const axiosError = error as any;
    } else {
    }

    throw error;
  } finally {
  }
};

export const fetchFolderInfo = async (
  folderId: number
): Promise<FolderInfo> => {
  const response = await apiClient.get(
    `${baseURL}/api/v1/professor/note/${folderId}/info`
  );
  return response.data;
};

export const deleteNote = async (
  folderId: any,
  noteId: number
): Promise<DeleteNoteResponse> => {
  const response = await apiClient.delete(
    `${baseURL}/api/v1/folders/${folderId}/notes/${noteId}`
  );
  return response.data;
};

export const summaryNote = async (
  folderId: number,
  noteId: number,
  keywords: string,
  requirement: string
): Promise<any> => {
  try {
    const response = await apiClient.post(
      `/api/v1/folders/${folderId}/notes/${noteId}/summaries`,
      {
        keywords: keywords.trim(),
        requirement: requirement.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    toast.error("요약 생성 중 오류가 발생했습니다.");
  }
};
