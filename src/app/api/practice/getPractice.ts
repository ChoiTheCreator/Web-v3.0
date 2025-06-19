import apiClient from "@/app/utils/api";
import { toast } from "react-hot-toast";

export interface PracticeItemResponse {
  praticeId: number;
  practiceNumber: number;
  content: string;
  additionalResults: string[];
  result: string;
  solution: string;
  practiceType: "OX" | "SHORT" | string;
}

export interface PracticeGetResponse {
  check: boolean;
  information: PracticeItemResponse[];
}
export interface PracticeRequestItem {
  practiceNumber: number;
  content: string;
  result: string;
  solution: string;
  practiceType: string;
}

export interface SavePracticeRequest {
  minute: number;
  second: number;
  endDate: string;
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
