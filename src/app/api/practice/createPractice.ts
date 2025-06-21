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
    throw error;
  }
};
