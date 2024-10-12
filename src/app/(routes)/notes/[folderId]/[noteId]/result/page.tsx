// notes/[folderId]/[noteId]/result/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ReviewQuestions from "@/app/components/organisms/ReviewQuestions";
import SummaryText from "@/app/components/organisms/SummaryText";

const ResultPage = () => {
  const { folderId, noteId } = useParams(); // URL에서 `folderId`, `noteId` 추출
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"questions" | "summary">("questions");
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    // `useSearchParams`를 사용하여 쿼리 파라미터로 전달된 `questions` 파싱
    const queryQuestions = searchParams.get("questions");
    if (queryQuestions) {
      setQuestions(JSON.parse(decodeURIComponent(queryQuestions)));
    }
  }, [searchParams]);

  // 탭 변경 핸들러
  const handleTabChange = (tab: "questions" | "summary") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col p-8">
      {/* 탭 메뉴 */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 text-white ${activeTab === "questions" ? "bg-green-500" : "bg-gray-700"}`}
          onClick={() => handleTabChange("questions")}
        >
          생성된 복습 문제 확인 및 선택
        </button>
        <button
          className={`px-4 py-2 text-white ${activeTab === "summary" ? "bg-green-500" : "bg-gray-700"}`}
          onClick={() => handleTabChange("summary")}
        >
          생성된 요약문 확인
        </button>
      </div>

      {/* 각 탭에 맞는 컴포넌트 렌더링 */}
      {activeTab === "questions" &&  (
        <ReviewQuestions noteId={Number(noteId)} />
      )}
      {activeTab === "summary" && noteId && (
        <SummaryText noteId={Number(noteId)} />
      )}
    </div>
  );
};

export default ResultPage;
