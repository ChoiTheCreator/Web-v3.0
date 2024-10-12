// pages/notes/[folderId]/[noteId]/create-practice/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import NewPracticeForm from "@/app/components/organisms/NewPracticeForm";
import Button from "@/app/components/atoms/Button";
import { createPractice } from "@/app/api/practice/createPractice";
import { submitPractice } from "@/app/api/practice/submitPractice";

const CreatePracticePage = () => {
  const router = useRouter();
  const { folderId, noteId } = useParams(); // `folderId`, `noteId` 추출
  const searchParams = useSearchParams();

  // query로 받은 데이터 추출
  const fileUrl = searchParams.get("file");
  const keywords = searchParams.get("keywords") || "";
  const requirement = searchParams.get("requirement") || "";

  // 상태 관리
  const [practiceSize, setPracticeSize] = useState<number | null>(null);
  const [practiceType, setPracticeType] = useState<"OX" | "SHORT" | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // 기존에 전달된 fileUrl이 있으면 Blob으로 변환
  useEffect(() => {
    if (fileUrl) {
      fetch(fileUrl)
        .then((res) => res.blob())
        .then((blob) => setFile(new File([blob], "uploadedFile")));
    }
  }, [fileUrl]);

  // 문제 개수 선택 옵션 상태 추가 (AI 추천 또는 직접 입력)
  const [countOption, setCountOption] = useState<"AI" | "manual">("AI");

  // 복습 문제 생성 핸들러
  const handleCreatePractice = async () => {
    if (!noteId || !file) {
      console.log("Missing noteId or file:", { noteId, file });
      return;
    }

    try {
      // `practiceSize`가 `null`이면 기본값 `0`으로 설정
      const validPracticeSize = practiceSize !== null ? practiceSize : 0;

      // createPracticeReq 객체 생성
      const createPracticeReq: {
        type: "OX" | "SHORT";
        keywords: string;
        requirement: string;
        practiceSize: number;
      } = {
        type: practiceType as "OX" | "SHORT", // `practiceType`이 null이 아님을 확신할 경우
        keywords,
        requirement,
        practiceSize: validPracticeSize,
      };

      // 요청 객체 콘솔 출력
      console.log("createPracticeReq:", createPracticeReq);

      // 문제 생성 API 호출
      const practiceResponse = await createPractice({
        createPracticeReq,
        file,
      });

      // 생성된 문제 저장
      const questions = practiceResponse.practiceResList.map((q: any) => ({
        question: q.content,
        answer: q.result,
      }));

      await submitPractice({
        noteId: Number(noteId),
        questions,
      });

      // 성공적으로 문제를 저장했다면 라우팅
      router.push(`/notes/${folderId}/${noteId}/result?tab=questions`);
    } catch (error) {
      console.error("문제 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-8">
      <div className="flex flex-col justify-start mb-8">
        <p className="text-white text-sm font-normal">복습 문제 생성 옵션을 선택해주세요</p>
        <p className="text-white text-2xl font-normal">
          새로운 복습 문제지
        </p>
      </div>
      {/* NewPracticeForm에 상태 전달 */}
      <NewPracticeForm
        // practiceSize={practiceSize}
        // setPracticeSize={setPracticeSize}
        // practiceType={practiceType}
        // setPracticeType={setPracticeType}
        // countOption={countOption}
        // setCountOption={setCountOption}
      />

      {/* 복습 문제 생성 버튼 */}
      <div className="flex justify-end">
        <Button
          label="복습 문제 생성"
          variant="next"
          onClick={handleCreatePractice}
        />
      </div>
    </div>
  );
};

export default CreatePracticePage;