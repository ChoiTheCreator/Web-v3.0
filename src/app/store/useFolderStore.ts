// src/app/store/useFolderStore.ts
import { create } from 'zustand';
import { FolderListData } from '@/app/types/folder';
import { getFolders, createFolder, updateFolder, deleteFolder } from '@/app/api/folders';

// zustand 상태 저장소 타입 정의
interface FolderState {
  folders: FolderListData[];
  fetchFolders: () => Promise<void>;
  addFolder: (folderName: string, professorName: string) => Promise<void>;
  updateFolder: (folderId: number, folderName: string, professorName: string) => Promise<void>;
  removeFolder: (folderId: number) => Promise<void>;
}

// zustand 저장소 생성
export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],

  // 폴더 목록을 가져오는 함수
  fetchFolders: async () => {
    try {
      const data = await getFolders();
      set({ folders: data }); // 폴더 목록 상태 업데이트
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  },

  // 폴더 생성 함수
  addFolder: async (folderName, professorName) => {
    try {
      await createFolder({ folderName, professorName });
      await get().fetchFolders(); // 폴더 목록 재갱신
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  },

  // 폴더 업데이트 함수
  updateFolder: async (folderId, folderName, professorName) => {
    try {
      await updateFolder({ folderId, folderName, professorName });
      await get().fetchFolders(); // 폴더 목록 재갱신
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  },

  // 폴더 삭제 함수
  removeFolder: async (folderId) => {
    try {
      await deleteFolder(folderId);
      await get().fetchFolders(); // 폴더 목록 재갱신
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  },
}));
