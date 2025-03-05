// src/app/store/useFolderStore.ts
import { create } from "zustand";
import { FolderListData } from "@/app/types/folder";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@/app/api/folders";

// zustand 상태 저장소 타입 정의
interface FolderState {
  folders: FolderListData[];
  fetchFolders: () => Promise<void>;
  addFolder: (folderName: string, professorName: string) => Promise<void>;
  updateFolder: (
    folderId: number,
    folderName: string,
    professorName: string
  ) => Promise<void>;
  removeFolder: (folderId: number) => Promise<void>;
}

export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],

  fetchFolders: async () => {
    try {
      const token = "";
      const data = await getFolders(token);
      set({ folders: data });
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  },

  addFolder: async (folderName, professorName) => {
    try {
      const token = "";
      await createFolder({ token, folderName, professorName });
      await get().fetchFolders();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  },

  updateFolder: async (folderId, folderName, professorName) => {
    try {
      const token = "";
      await updateFolder({ token, folderId, folderName, professorName });
      await get().fetchFolders();
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  },

  removeFolder: async (folderId) => {
    try {
      const token = "";
      await deleteFolder(token, folderId);
      await get().fetchFolders();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  },
}));
