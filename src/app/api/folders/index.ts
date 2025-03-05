import {
  FolderListData,
  FolderListResponse,
  PatchFolderProps,
  PostFolderProps,
} from "@/app/types/folder";
import { baseURL } from "..";
import axios from "axios";
import apiClient from "@/app/utils/api";

export const getFolders = async (token: string): Promise<FolderListData[]> => {
  const response = await apiClient.get(`${baseURL}/api/v1/folder`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data.information;
};

export const createFolder = async ({
  token,
  folderName,
  professorName,
}: PostFolderProps) => {
  const response = await apiClient.post(
    `${baseURL}/api/v1/folder`,
    {
      folderName,
      professorName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

export const updateFolder = async ({
  token,
  folderId,
  folderName,
  professorName,
}: PatchFolderProps) => {
  const response = await apiClient.patch(
    `${baseURL}/api/v1/folder/${folderId}`,
    {
      folderName,
      professorName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

export const deleteFolder = async (token: string, folderId: number) => {
  const response = await apiClient.delete(
    `${baseURL}/api/v1/folder/${folderId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

export const fetchFolderName = async (token: string) => {
  const response = await apiClient.get(`${baseURL}/api/v1/folder/names`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
};
