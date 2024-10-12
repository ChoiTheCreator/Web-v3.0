// app/api/practice/fetchPractice.ts

import axios from "axios";
import { baseURL } from "..";

interface FetchPracticeResponse {
  practiceResList: {
    practiceNumber: number;
    content: string;
    result: string;
    practiceType: "OX" | "SHORT";
  }[];
  summary: string;
}

// 생성된 문제 목록을 가져오는 API
export const fetchPractice = async (noteId: number): Promise<FetchPracticeResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/professor/practice/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching practice questions:", error);
    throw error;
  }
};
