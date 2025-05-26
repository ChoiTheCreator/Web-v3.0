import apiClient from '@/app/utils/api';
import { toHexUtil } from 'pdfjs-dist/types/src/shared/util';
export interface PracticeCreateRequestType {
  minute: number;
  second: number;
  endDate: string; // ISO 문자열 ("2025-05-26T07:20:01.035Z" 형식)
  reqList: PracticeRequestItem[];
}

export interface PracticeRequestItem {
  practiceNumber: number;
  content: string;
  additionalResultUs: string[];
  result: string; // 예: "O" 또는 "X"
  solution: string;
  practiceType: string; // 예: "OX", "객관식", 등
}

export interface PracticeCreateItem {
  practiceSize: number;
  type: string; //OX
  keywords: string;
  requirement: string;
}
export const getPractice = async (noteId: number): Promise<any> => {
  try {
    const response = await apiClient.get(
      `/api/v1/professor/practice/${noteId}`
    );
    return response.data;
  } catch (e) {
    console.log('getPractice 함수단에서 에러 발생', e);
    throw e;
  }
};

export const savePractice = async (
  noteId: number,
  savePracticeList: PracticeRequestItem
) => {
  try {
    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}`,
      savePracticeList //Req Body
    );
    return response.data;
  } catch (e) {
    console.log('savePractice단에서 오류 발생', e);
    throw e;
  }
};

export const createPractice = async (
  noteId: number,
  createRequestItem: PracticeCreateItem
) => {
  try {
    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}`,
      createRequestItem
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
