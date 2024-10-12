import axios from 'axios';
import { baseURL } from '..';

interface CreatePracticeRequest {
  createPracticeReq: {
    practiceSize: number;
    type: 'OX' | 'SHORT';
    keywords?: string;
    requirement?: string;
  };
  file: File;
}

// 문제 생성 함수
export const createPractice = async ({
  createPracticeReq,
  file,
}: CreatePracticeRequest) => {
  try {
    // multipart/form-data용 FormData 생성
    const formData = new FormData();

    // createPracticeReq 객체를 JSON으로 변환하여 FormData에 추가
    formData.append(
      'createPracticeReq',
      new Blob([JSON.stringify(createPracticeReq)], { type: 'application/json' })
    );

    // 파일을 FormData에 추가
    formData.append('file', file);

    // API 호출
    const response = await axios.post(
      `${baseURL}/api/v1/professor/practice`, // 필요한 경우 올바른 base URL로 변경
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('문제 생성 실패:', error);
    throw error;
  }
};
