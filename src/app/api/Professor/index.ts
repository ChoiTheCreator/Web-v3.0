import apiClient from "@/app/utils/api";
import { toast } from "react-hot-toast";

export interface PracticeItemResponse {
  praticeId: number; // ← 서버 스펠링 그대로 유지 (오타라면 서버에 수정 요청하는게 좋음)
  practiceNumber: number;
  content: string;
  additionalResults: string[];
  result: string;
  solution: string;
  practiceType: "OX" | "SHORT" | string;
}

export interface PracticeGetResponse {
  minute: number;
  second: number;
  endDate: string;
  reqList: PracticeItemResponse[];
}
export interface PracticeRequestItem {
  practiceNumber: number;
  content: string;
  additionalResults: string[];
  result: string; // "O", "X" 등
  solution: string;
  practiceType: string;
}

export interface SavePracticeRequest {
  minute: number;
  second: number;
  endDate: string; // ISO
  reqList: PracticeRequestItem[];
}

export interface PracticeCreateItem {
  practiceSize: number;
  type: string;
  keywords: string;
  requirement: string;
}
export const getPractice = async (
  noteId: number
): Promise<PracticeGetResponse> => {
  try {
    const response = await apiClient.get(
      `/api/v1/professor/practice/${noteId}`
    );
    return response.data;
  } catch (e) {
    toast.error("문제를 가져오는 중 오류가 발생했습니다.");
    throw e;
  }
};

export const savePractice = async (
  noteId: number,
  payload: SavePracticeRequest
) => {
  try {
    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}`,
      payload
    );
    return response.data;
  } catch (e) {
    toast.error("문제 저장 중 오류가 발생했습니다.");
    throw e;
  }
};

export const createPractice = async (
  noteId: number,
  createRequestItem: PracticeCreateItem
) => {
  try {
    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}/new`,
      createRequestItem
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
