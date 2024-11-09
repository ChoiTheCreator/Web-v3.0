// api/practiceApi.ts
import axios from "axios";
import { baseURL } from "../index";
import { PracticeRequest } from "@/app/types/practice";

// 함수 정의
export default async function savePracticeQuestions(noteId: number, questions: PracticeRequest[]) {
  try {
    const response = await axios.post(`${baseURL}/api/v1/professor/practice/${noteId}`, questions);
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error("Error saving practice questions:", error);
    throw error;
  }
};
