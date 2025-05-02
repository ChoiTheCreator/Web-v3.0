//STT 변환 API
import apiClient from '../api';

const uploadNoteAudio = async (
  folderId: number,
  noteId: number,
  file: File
) => {
  const formData = new FormData();
  //스웨거 필드값
  formData.append('file', file);
  try {
    apiClient.post(
      `/api/v1/folders/${folderId}/notes/${noteId}/stt`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } catch (error) {
    console.log('api 함수 계층 에러 : 노트 요약 STT 생성 에러');
    throw error;
  }
};

export default uploadNoteAudio;
