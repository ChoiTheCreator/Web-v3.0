// folderApi.ts
import { FolderListData, FolderListResponse, PatchFolderProps, PostFolderProps } from "@/app/types/folder";
import { baseURL } from "..";
import axios from "axios";

// 폴더 목록 가져오기
export const getFolders = async (): Promise<FolderListData[]> => {
  const response = await axios.get("https://ai-tutor.co.kr/api/v1/folder/", {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.information; // `information` 배열만 반환
};

// 폴더 생성
export const createFolder = async ({ folderName, professorName }: PostFolderProps) => {
const response = await axios.post(`${baseURL}/api/v1/folder/`, {
  folderName,
  professorName,
}, {
  headers: {
    "Content-Type": "application/json",
  },
});

return response.data;
};

// 폴더 수정
export const updateFolder = async ({ folderId, folderName, professorName }: PatchFolderProps) => {
const response = await axios.patch(`${baseURL}/api/v1/folder/${folderId}`, {
  folderName,
  professorName,
}, {
  headers: {
    "Content-Type": "application/json",
  },
});

return response.data;
};

// 폴더 삭제
export const deleteFolder = async (folderId: number) => {
const response = await axios.delete(`${baseURL}/api/v1/folder/${folderId}`, {
  headers: {
    "Content-Type": "application/json",
  },
});

return response.data;
};