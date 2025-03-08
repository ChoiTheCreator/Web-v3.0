import {
  FolderListData,
  FolderListResponse,
  PatchFolderProps,
  PostFolderProps,
} from "@/app/types/folder";
import { baseURL } from "..";
import axios from "axios";
import apiClient from "@/app/utils/api";

export const getFolders = async (): Promise<FolderListData[]> => {
  const response = await apiClient.get(`${baseURL}/api/v1/folder`);
  return response.data.information;
};

export const createFolder = async ({
  folderName,
  professorName,
}: PostFolderProps) => {
  const response = await apiClient.post(`${baseURL}/api/v1/folder`, {
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
    `${baseURL}/api/v1/folder/${folderId}`
  );

  return response.data;
};

export const fetchFolderName = async () => {
  const response = await apiClient.get(`${baseURL}/api/v1/folder/names`);
  return response.data;
};
