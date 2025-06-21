import React, { useState } from "react";

interface TextInputSectionProps {
  onKeywordChange: (keywords: string) => void;
  onRequirementChange: (requirement: string) => void;
  labelClassName?: string;
}

const TextInputSection = ({
  onKeywordChange,
  onRequirementChange,
  labelClassName,
}: TextInputSectionProps) => {
  const [keywords, setKeywords] = useState("");
  const [requirement, setRequirement] = useState("");

  const handleKeywordChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setKeywords(value);
    onKeywordChange(value);
  };

  const handleRequirementChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setRequirement(value);
    onRequirementChange(value);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[830px] rounded-lg">
        <div className="flex flex-col space-y-4 p-6 rounded-b-lg">
          <div>
            <p className="text-gray-300 mb-2 font-semibold">핵심 키워드</p>
            <textarea
              className="w-full h-44 p-2 px-3 bg-black-80 placeholder:text-black-70 text-white rounded-lg resize-none outline-none"
              value={keywords}
              onChange={handleKeywordChange}
              placeholder="해당 키워드를 더욱 신경 써서 반영한 요약문을 제공해드리겠습니다."
            />
          </div>

          <div>
            <p className="text-gray-300 mb-2 font-semibold">요구사항</p>
            <textarea
              className="w-full h-44 p-2 px-3 bg-black-80 placeholder:text-black-70 text-white rounded-lg resize-none outline-none"
              value={requirement}
              onChange={handleRequirementChange}
              maxLength={300}
              placeholder="강의에서 강조하고 싶은 내용, 어투와 문장 등을 작성하세요."
            />
            <div className="text-right text-black-60 text-sm">
              {requirement.length}/300
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInputSection;
