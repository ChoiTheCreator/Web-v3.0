"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchSummary } from "@/app/api/summaries/fetchSummary";
import Icon from "@/app/components/atoms/Icon";

export default function SummaryPage() {
  const { folderId, noteId } = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!folderId || !noteId) return;
      setLoading(true);
      try {
        const data = await fetchSummary({
          folderId: Number(folderId),
          noteId: Number(noteId),
        });
        setSummary(data.information.summary || "");
      } catch (error) {
        setSummary("요약문을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [folderId, noteId]);

  return (
    <div className="flex min-h-screen bg-black-100 p-8 flex-col">
      <div className="flex flex-col items-start w-full">
        <p className="text-xl mb-2 font-semibold text-white">새로운 수업</p>
        <p className="text-base text-white">
          강의 녹화 파일을 업로드하면 복습 문제 생성이 가능해요
        </p>
      </div>

      <div className="flex flex-row w-full pt-12 h-full top-0 items-start">
        <div className="flex-1 flex flex-col justify-center w-full">
          <p className="text-gray-300 mb-2 font-semibold">요약문</p>
          <textarea
            className="w-full h-64 p-2 px-3 bg-black-80 placeholder:text-black-70 text-white rounded-lg resize-none outline-none"
            maxLength={300}
            placeholder="강의에서 강조하고 싶은 내용, 어투와 문장 등을 작성하세요."
            value={loading ? "불러오는 중..." : summary}
            readOnly
          />
        </div>

        <div className="w-px bg-black-70 mx-8" style={{ minHeight: "500px" }} />

        <div className="flex flex-col gap-3.5 justify-center min-w-[220px]">
          <p className="text-white font-semibold">복습 자료 만들기</p>
          <button
            className="bg-black-80 text-white px-8 py-6 rounded-lg text-left flex justify-between items-center"
            onClick={() =>
              router.push(`/notes/${folderId}/${noteId}/create-practice`)
            }
          >
            복습 퀴즈 생성
            <Icon label="arrow_next" className="w-4 h-4" />
          </button>
          <button className="bg-black-80 text-white px-8 py-6 rounded-lg text-left flex justify-between items-center">
            하이라이트 영상 제작
            <Icon label="arrow_next" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
