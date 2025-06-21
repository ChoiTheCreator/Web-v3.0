import apiClient from "@/app/utils/api";
import toast from "react-hot-toast";

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
  try {
    const response = await apiClient.patch(
      `/api/v1/professor/practice/${noteId}/${practiceId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("문제가 수정되었습니다.");
    return response.data;
  } catch (error) {
    toast.error("문제 수정에 실패했습니다.");
    return null;
  }
}
