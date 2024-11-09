import React, { useEffect } from "react";
import { baseURL } from "@/app/api/index";
import { usePracticeContext } from "@/app/context/PracticeContext";
import axios from "axios";

interface SummaryTextProps {
  noteId: number;
}

const SummaryText: React.FC<SummaryTextProps> = ({ noteId }) => {
  const { summary, setSummary } = usePracticeContext(); // 전역 상태에서 요약문 불러오기 및 설정 함수 가져오기

  useEffect(() => {
    // 만약 summary가 없다면 API 호출하여 가져오기
    if (!summary) {
      const fetchSummary = async () => {
        try {
          const response = await axios.get(`${baseURL}/summary/${noteId}`);
          setSummary(response.data.summary); // 가져온 요약문을 Context에 저장
        } catch (error) {
          console.error("Failed to fetch summary:", error);
        }
      };
      fetchSummary();
    }
  }, [summary, noteId, setSummary]);

  return (
    <div className="h-full overflow-y-auto bg-secondaryGray/45 text-white p-8 max-w-full mx-auto leading-10 ">
      {summary ? <p>{summary}</p> : <p>요약문을 불러오는 중입니다...</p>}
    </div>
  );
};

export default SummaryText;
