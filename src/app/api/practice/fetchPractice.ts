  // app/api/practice/fetchPractice.ts

  import axios from "axios";
  import { baseURL } from "..";

  interface FetchPracticeResponse {
    information: {
      practiceId: number;
      practiceNumber: number;
      content: string;
      result: string;
      additionalResults: string | null;
      solution: string;
      practiceType: "OX" | "SHORT";
    }[];
  }

  // 생성된 문제 목록을 가져오는 API
  export const fetchPractice = async (noteId: number): Promise<FetchPracticeResponse> => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/professor/practice/${noteId}`);
      console.log("fetchPractice response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching practice questions:", error);
      throw error;
    }
  };
