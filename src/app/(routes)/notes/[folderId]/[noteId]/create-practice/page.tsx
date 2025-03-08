"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePracticeContext } from "@/app/context/PracticeContext";
import NewPracticeForm from "@/app/components/organisms/NewPracticeForm";
import Button from "@/app/components/atoms/Button";
import { createPractice } from "@/app/api/practice/createPractice";
import Loader from "@/app/components/utils/Loader";

const CreatePracticePage = () => {
  const router = useRouter();
  const { folderId, noteId } = useParams();
  const {
    file,
    keywords,
    requirement,
    practiceSize,
    setQuestions,
    setSummary,
    type,
    setType,
  } = usePracticeContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePractice = async () => {
    if (!noteId || !file || file.size === 0) {
      alert("파일이 업로드되지 않았습니다. 파일을 선택해주세요.");
      return;
    }

    if (!type) {
      alert("문제 유형을 최소 하나 선택해야 합니다.");
      return;
    }

    try {
      setIsLoading(true);

      interface CreatePracticeReq {
        type: "OX" | "SHORT" | "BOTH";
        keywords: string;
        requirement: string;
        practiceSize?: number;
      }

      const createPracticeReq: CreatePracticeReq = {
        type,
        keywords: keywords || "",
        requirement: requirement || "",
      };

      if (practiceSize !== null) {
        createPracticeReq.practiceSize = practiceSize;
      }

      const practiceResponse = await createPractice({
        noteId: Number(noteId),
        createPracticeReq,
        file,
      });

      if (practiceResponse && practiceResponse.information) {
        const { practiceResList, summary } = practiceResponse.information;
        console.log("practiceResList: ", practiceResList);
        const formattedQuestions = practiceResList.map((question: any) => ({
          ...question,
          content: question.content.replace(/^\d+:\s*/, ""),
        }));

        setQuestions(formattedQuestions);

        setSummary(summary);
      } else {
        console.log("응답 데이터에 information이 없습니다.", practiceResponse);
      }

      router.push(`/notes/${folderId}/${noteId}/result?tab=questions`);
    } catch (error) {
      alert("지금은 요청이 많아, 생성이 어려워요. 5분 후에 다시 시도해주세요.");

      if (error instanceof Error) {
        if ((error as any).response) {
          const axiosError = error as any;
          console.log("응답 데이터: ", axiosError.response.data);
          console.log("응답 상태 코드: ", axiosError.response.status);
          console.log("응답 헤더: ", axiosError.response.headers);
        } else if (error.message) {
          console.log("오류 메시지: ", error.message);
        }
      } else {
        console.log("알 수 없는 오류 발생", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="flex flex-col justify-between h-full p-8">
        <div className="flex flex-col justify-start mb-8">
          <p className="text-white text-sm font-normal">
            복습 문제 생성 옵션을 선택해주세요
          </p>
          <p className="text-white text-2xl font-normal">새로운 복습 문제지</p>
        </div>

        <NewPracticeForm />

        <div className="flex justify-end">
          <Button
            label="복습 문제 생성"
            variant="next"
            onClick={handleCreatePractice}
          />
        </div>
      </div>
    </>
  );
};

export default CreatePracticePage;
