import axios from "axios";
import { baseURL } from "..";
import apiClient from "@/app/utils/api";

interface CreatePracticeRequest {
  noteId: number;
  createPracticeReq: {
    practiceSize?: number;
    type: string;
    keywords?: string;
    requirement?: string;
  };
  file: File;
}

export const createPractice = async ({
  noteId,
  createPracticeReq,
  file,
}: CreatePracticeRequest) => {
  try {
    const formData = new FormData();

    formData.append(
      "createPracticeReq",
      new Blob([JSON.stringify(createPracticeReq)], {
        type: "application/json",
      })
    );

    formData.append("file", file);

    const response = await apiClient.post(
      `/api/v1/professor/practice/${noteId}/new`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API 응답:", response.data);

    return response.data;
  } catch (error) {
    console.error("문제 생성 실패:", error);
    throw error;
  }
};
