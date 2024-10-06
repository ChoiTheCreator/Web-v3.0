//노트 상세 정보
export interface NoteData {
    noteId: number;
    title: string;
    createdAt: string;
    practiceSize: number;
    code: string;
  }
  
//노트 응답 시
  export interface NoteResponse {
    folderName: string;
    professor: string;
    noteListDetailRes: NoteData[];
  }
  
//노트에 대한 폴더 정보 조회 
  export interface FolderInfo {
    folderName: string;
    professor: string;
  }
  
//노트 삭제
  export interface CreateNoteRequest {
    noteName: string;
  }
  
  // Delete Note Response Type
  export interface DeleteNoteResponse {
    message: string;
  }
  