// pages/notes/[folderId]/[noteId]/page.tsx

"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NewNoteForm from "@/app/components/organisms/NewNoteForm";
import Button from "@/app/components/atoms/Button";

const NotePage = () => {
  const router = useRouter();
  const { folderId, noteId } = useParams(); // `folderId`와 `noteId` 추출
  const [noteName, setNoteName] = useState(""); // 노트 이름 상태
  const [file, setFile] = useState<File | null>(null); // 파일 상태
  const [keywords, setKeywords] = useState(""); // 키워드 상태
  const [requirement, setRequirement] = useState(""); // 요구사항 상태

  // "다음" 버튼 클릭 시 `create-practice` 페이지로 라우팅
  const handleNext = () => {
    // 쿼리 문자열 생성
    const query = new URLSearchParams({
      keywords,
      requirement,
    }).toString();

    // 경로와 함께 쿼리 문자열을 포함하여 라우팅
    router.push(`/notes/${folderId}/${noteId}/create-practice?${query}`);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col justify-start p-8">
          <p className="text-white text-sm font-normal">수업 정보를 입력해 주세요</p>
          <p className="text-white text-2xl font-normal">새로운 수업</p>
        </div>
        {/* 노트 생성 폼 */}
        <div>
          <NewNoteForm
            folderId={Number(folderId)}
            noteId={Number(noteId)}
            setNoteName={setNoteName}
            setFile={setFile}
            setKeywords={setKeywords}
            setRequirement={setRequirement}
          />
          {/* Next Button */}
        </div>
      </div>
      <div className="flex justify-end p-8">
        <Button
          label="다음"
          variant="next"
          imgSrc="arrow_next"
          onClick={handleNext} // `create-practice` 페이지로 라우팅
        />
      </div>
    </div>
  );
};

export default NotePage;
