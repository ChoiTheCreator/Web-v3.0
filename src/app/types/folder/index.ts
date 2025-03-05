export interface FolderListData {
  folderId: number;
  folderName: string;
  professor: string;
}

export interface FolderListResponse {
  information: FolderListData[];
}

export interface PostFolderProps {
  token: string;
  folderName: string;
  professorName: string;
}

export interface PatchFolderProps {
  token: string;
  folderName: string;
  professorName: string;
  folderId: number;
}
