import apiClient from "@/app/utils/api";
import { toast } from "react-hot-toast";
import axios from "axios";

interface CreatePracticeRequest {
  noteId: number;
  createPracticeReq: {
    practiceSize?: number;
    type: string;
    keywords?: string;
    requirement?: string;
  };
}

export const createPractice = async ({
  noteId,
  createPracticeReq,
}: CreatePracticeRequest) => {
  try {
    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}/generate-and-save`,

      createPracticeReq,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("문제 생성 실패:", error);
    if (axios.isAxiosError(error)) {
      toast.error(
        `문제 생성 에러: ${
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        }`
      );
    } else {
      toast.error(
        `문제 생성 중 오류 발생: ${
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        }`
      );
    }
    throw error;
  }
};
