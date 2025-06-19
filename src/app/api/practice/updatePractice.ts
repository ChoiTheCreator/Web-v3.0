import apiClient from "@/app/utils/api";

export interface UpdatePracticeReq {
  practiceNumber: number;
  content: string;
  additionalResults: string[];
  result: string;
  solution: string;
  practiceType: "OX" | "SHORT" | string;
}

export default async function updatePractice(
  noteId: number,
  practiceId: number,
  data: UpdatePracticeReq
) {
  const response = await apiClient.patch(
    `/api/v1/professor/practice/${noteId}/${practiceId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}
