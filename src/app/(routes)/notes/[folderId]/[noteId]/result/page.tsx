"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewQuestions from "@/app/components/organisms/ReviewQuestions";
import Info from "@/app/components/molecules/Info";
import { usePracticeContext } from "@/app/context/PracticeContext";
import { getPractice } from "@/app/api/Professor";
import { savePractice } from "@/app/api/Professor";
import { PracticeItemResponse } from "@/app/api/Professor";

const ResultPage = () => {
  const params = useParams<{ folderId: string; noteId: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<
    PracticeItemResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { folderName, professor, setQuestions } = usePracticeContext();
  const noteId = Number(params.noteId);

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        setIsLoading(true);
        const data = await getPractice(noteId);
        if (data && data.information) {
          setPracticeQuestions(data.information);
          setQuestions(data.information);
        } else {
          setPracticeQuestions([]);
          setQuestions([]);
          console.warn("API 응답에 information 필드가 없습니다.", data);
        }
      } catch (e) {
        console.error("문제 조회 실패", e);
        setPracticeQuestions([]);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (noteId) fetchPractice();
  }, [noteId, setQuestions]);

  const handleSaveQuestions = async () => {
    try {
      setIsSaving(true);
      const formattedQuestions = practiceQuestions.map((question, index) => ({
        practiceNumber: index + 1,
        content: question.content,
        practiceType: question.practiceType,
        result: question.result,
        solution: question.solution,
      }));

      await savePractice(noteId, formattedQuestions);
      alert("✅ 문제가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("문제 저장 실패", error);
      alert("❌ 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">문제를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Info folderName={folderName} professorName={professor} />
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={handleSaveQuestions}
          disabled={isSaving}
        >
          {isSaving ? "저장 중..." : "문제 저장"}
        </button>
      </div>

      <div className="flex flex-col">
        {practiceQuestions && practiceQuestions.length > 0 ? (
          <ReviewQuestions noteId={Number(params.noteId)} />
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-lg text-gray-500">등록된 문제가 없습니다.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPage;
