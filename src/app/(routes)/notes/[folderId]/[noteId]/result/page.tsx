"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewQuestions from "@/app/components/organisms/ReviewQuestions";
import SummaryText from "@/app/components/organisms/SummaryText";
import Info from "@/app/components/molecules/Info";
import { usePracticeContext } from "@/app/context/PracticeContext";
import { fetchPractice } from "@/app/api/practice/fetchPractice";
import { fetchSummary } from "@/app/api/summaries/fetchSummary";

const ResultPage = () => {
  const { noteId } = useParams();
  const [activeTab, setActiveTab] = useState<"questions" | "summary">("questions");
  const { folderName, professor, questions, setQuestions, summary, setSummary } = usePracticeContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (tab: "questions" | "summary") => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-between items-center">   
        <Info folderName={folderName} professorName={professor} />  
      </div>

      <div className="flex flex-col">
        {/* 탭 메뉴 */}
        <div className="w-full flex justify-center items-stretch">
          <button
            className={`w-full py-2 text-white ${activeTab === "questions" ? "bg-mainGreen" : "bg-primaryLightGray"}`}
            onClick={() => handleTabChange("questions")}
          >
            생성된 복습 문제 확인 및 선택
          </button>
          <button
            className={`w-full py-2 text-white ${activeTab === "summary" ? "bg-mainGreen" : "bg-primaryLightGray"}`}
            onClick={() => handleTabChange("summary")}
          >
            생성된 요약문 확인
          </button>
        </div>

        {/* 로딩 상태 표시 */}
        {loading && <p className="text-center text-white">데이터를 불러오는 중입니다...</p>}

        {/* 에러 메시지 표시 */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 탭에 따른 컴포넌트 렌더링 */}
        {!loading && !error && activeTab === "questions" && (
          <ReviewQuestions noteId={Number(noteId)} />
        )}
        {!loading && !error && activeTab === "summary" && (
          <SummaryText noteId={Number(noteId)} />
        )}
      </div>
    </>
  );
};

export default ResultPage;
