import axios from "axios";
import { baseURL } from "..";
import apiClient from "@/app/utils/api";

// Only noteId is required for fetching summary
interface FetchSummaryRequest {
  folderId: number;
  noteId: number;
}

export const fetchSummary = async ({
  folderId,
  noteId,
}: FetchSummaryRequest) => {
  try {
    const response = await apiClient.get(
      `/api/v1/folders/${folderId}/notes/${noteId}/summaries`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("노트 요약문 조회 실패:", error);
    throw error;
  }
};
