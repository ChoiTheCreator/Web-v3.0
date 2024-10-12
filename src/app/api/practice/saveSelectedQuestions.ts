// app/api/practice/saveSelectedQuestions.ts

import axios from "axios";
import { baseURL } from ".."

interface SaveSelectedQuestionsPayload {
  noteId: number;
  selectedQuestions: number[];
}

// 선택된 문제 저장을 위한 API
export const saveSelectedQuestions = async (payload: SaveSelectedQuestionsPayload) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/professor/practice/${payload.noteId}/selection`, payload.selectedQuestions);
    return response.data;
  } catch (error) {
    console.error("Error saving selected questions:", error);
    throw error;
  }
};
