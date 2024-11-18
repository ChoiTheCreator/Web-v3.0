// folderApi.ts
import { FolderListData, FolderListResponse, PatchFolderProps, PostFolderProps } from "@/app/types/folder";
import { baseURL } from "..";
import axios from "axios";

// 폴더 목록 가져오기
export const getFolders = async (): Promise<FolderListData[]> => {
    const response = await fetch(`${baseURL}folder/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to fetch folders');
    }
  
    const data: FolderListResponse = await response.json();
    return data.information; // `information` 배열만 반환
  };

// 폴더 생성
export const createFolder = async ({ folderName, professorName }: PostFolderProps) => {
  const response = await fetch(`${baseURL}folder/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderName,
      professorName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create folder");
  }

  return response.json();
};

// 폴더 수정
export const updateFolder = async ({ folderId, folderName, professorName }: PatchFolderProps) => {
  const response = await fetch(`${baseURL}folder/${folderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderName,
      professorName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update folder");
  }

  return response.json();
};

// 폴더 삭제
export const deleteFolder = async (folderId: number) => {
  const response = await fetch(`${baseURL}folder/${folderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete folder");
  }

  return response.json();
};
