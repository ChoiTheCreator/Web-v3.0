import React from "react";
import { baseURL } from "@/app/api/index";
import { usePracticeContext } from "@/app/context/PracticeContext";
import axios from "axios";
import Button from "../atoms/Button";

interface SummaryTextProps {
  noteId: number;
}

const SummaryText: React.FC<SummaryTextProps> = ({ noteId }) => {
  const { summary, setSummary } = usePracticeContext();

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/professor/summary/${noteId}`
      );
      console.log("API response:", response);
      console.log("Fetched summary:", response.data.information.summary);

      // Store the summary in the context
      setSummary(response.data.information.summary);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    }
  };

  fetchSummary();

  return (
    <div className="w-full h-full overflow-y-auto bg-secondaryGray/45 text-white max-w-full mx-auto leading-10">
      {summary ? (
        <div>
          <p className="p-8">{summary}</p>{" "}
          <div className="z-40 w-full flex justify-end p-10 bottom-0">
            <Button label="PDF 변환" variant="next" />
          </div>
        </div>
      ) : (
        <div className="flex h-[84vh] justify-center items-center">
          <p className="text-gray-400 text-lg">
            아직 생성된 요약문이 없어요. 다시 요약문을 생성해주세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryText;
