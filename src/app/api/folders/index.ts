import {
  FolderListData,
  PatchFolderProps,
  PostFolderProps,
} from '@/app/types/folder';
import { baseURL } from '..';

import apiClient from '@/app/utils/api';

export const getFolders = async (): Promise<FolderListData[]> => {
  //folder -> folders로 수정
  try {
    const response = await apiClient.get(`${baseURL}/api/v1/folders`);
    console.log('폴더 펫칭 성공했습니다.');
    return response.data.information;
  } catch (e) {
    console.log('폴더 펫칭중 에러 발생', e);
  }
  return [];
};

export const createFolder = async ({
  folderName,
  professorName,
}: PostFolderProps) => {
  const response = await apiClient.post(`${baseURL}/api/v1/folders`, {
    folderName,
    professorName,
  });

  return response.data;
};

export const updateFolder = async ({
  folderId,
  folderName,
  professorName,
}: PatchFolderProps) => {
  const response = await apiClient.patch(
    `${baseURL}/api/v1/folder/${folderId}`,
    {
      folderName,
      professorName,
    }
  );

  return response.data;
};

export const deleteFolder = async (folderId: number) => {
  const response = await apiClient.delete(
    `${baseURL}/api/v1/folders/${folderId}`
  );

  return response.data;
};

export const fetchFolderName = async () => {
  const response = await apiClient.get(`${baseURL}/api/v1/folders/names`);
  return response.data;
};
