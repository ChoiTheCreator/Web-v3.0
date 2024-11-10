import axios from 'axios';
import { baseURL } from '..';
interface SubmitPracticeRequest {
  noteId: number;
  summary: string;
}

// 노트에 생성된 문제를 저장하는 함수
export const fetchSummary = async (noteId: number) => {
  try {
    // 문제 저장을 위한 API 호출
    const response = await axios.get(
      `${baseURL}/api/v1/professor/summary/${noteId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('노트에 문제 저장 실패:', error);
    throw error;
  }
};
