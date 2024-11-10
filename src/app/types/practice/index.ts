// app/api/practice/types.ts

export interface CreatePracticeResponse {
    questions: {
      practiceNumber: number;
      content: string;
      result: string;
      solution: string;
      practiceType: "OX" | "SHORT";
    }[];
    summary: string;
  }
  

export interface PracticeRequest {
    practiceNumber: number;
    content: string;
    additionalResults: string[];
    solution: string;
    result: string;
    practiceType: "OX" | "SHORT";
  }