"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ReviewQuestions from "@/app/components/organisms/ReviewQuestions";
import SummaryText from "@/app/components/organisms/SummaryText";
import Info from "@/app/components/molecules/Info";
import { usePracticeContext } from "@/app/context/PracticeContext"; // Context 사용

const ResultPage = () => {
  const { noteId } = useParams();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"questions" | "summary">("questions");
  const { folderName, professor } = usePracticeContext(); // Context에서 가져옴
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const queryQuestions = searchParams.get("questions");
    if (queryQuestions) {
      setQuestions(JSON.parse(decodeURIComponent(queryQuestions)));
    }
  }, [searchParams]);

  const handleTabChange = (tab: "questions" | "summary") => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-between items-center">   
        <Info folderName={folderName} professorName={professor} />  
      </div>
      {/* Info Component */}
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

      {activeTab === "questions" && <ReviewQuestions noteId={Number(noteId)} />}
      {/* {activeTab === "summary" && <SummaryText noteId={Number(noteId)} />} */}
    </div>
    </>
  );
};

export default ResultPage;
