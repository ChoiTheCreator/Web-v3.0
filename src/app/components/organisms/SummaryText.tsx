import React, { useEffect, useState } from "react";
import { baseURL } from "@/app/api/index";

interface SummaryTextProps {
  noteId: number;
}

const SummaryText: React.FC<SummaryTextProps> = ({ noteId }) => {
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    // 요약문 조회 API 호출
    const fetchSummary = async () => {
      try {
        // noteId를 사용하여 요약문을 조회
        const response = await fetch(`${baseURL}/api/v1/professor/practice/${noteId}/summary`); // 실제 요약문 API 경로로 변경 필요
        const data = await response.text();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
  }, [noteId]);

  return (
    <div className="h-full overflow-y-auto bg-gray-800 text-white p-4">
      {summary ? <p>{summary}</p> : <p>요약문을 불러오는 중입니다...</p>}
    </div>
  );
};

export default SummaryText;
