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
  