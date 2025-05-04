import React, { useState } from 'react';

interface TabProps {
  onKeywordChange: (keywords: string) => void;
  onRequirementChange: (requirement: string) => void;
  labelClassName?: string;
}

const TabComponent: React.FC<TabProps> = ({
  onKeywordChange,
  onRequirementChange,
  labelClassName,
}) => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'requirements'>(
    'keywords'
  );

  const [keywords, setKeywords] = useState('');
  const [requirement, setRequirement] = useState('');

  const handleTabChange = (tab: 'keywords' | 'requirements') => {
    setActiveTab(tab);
  };

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
    <div className="flex flex-row ">
      <p
        className={`text-white text-base font-normal flex-shrink-0 ${labelClassName}`}
      >
        중요 내용
      </p>
      <div className="w-full max-w-[730px] bg-black-80 rounded-lg">
        <div className="flex">
          <button
            onClick={() => handleTabChange('keywords')}
            className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${
              activeTab === 'keywords'
                ? 'bg-[#05D686] text-black'
                : 'bg-[#5F5F5F] text-white'
            } rounded-tl-md`}
          >
            핵심 키워드 입력
          </button>
          <button
            onClick={() => handleTabChange('requirements')}
            className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${
              activeTab === 'requirements'
                ? 'bg-[#05D686] text-black'
                : 'bg-[#5F5F5F] text-white'
            } rounded-tr-md`}
          >
            요구사항 입력
          </button>
        </div>

        <div className="p-6 bg-[#252424] rounded-b-lg">
          {activeTab === 'keywords' && (
            <div>
              <p className="text-gray-300 mb-2">
                요약문을 작성할 때 강조하고 싶은 키워드를 입력해주세요.
              </p>
              <textarea
                className="w-full h-20 p-2 bg-[#1C1C1C] text-white rounded resize-none outline-none"
                value={keywords}
                onChange={handleKeywordChange}
                placeholder="해당 키워드를 더욱 신경 써서 반영한 요약문을 제공해드리겠습니다."
              />
            </div>
          )}
          {activeTab === 'requirements' && (
            <div>
              <p className="text-gray-300 mb-2">
                강의에서 강조하고 싶은 내용 혹은 어투, 분량을 정해주세요!
              </p>
              <textarea
                className="w-full h-20 p-2 bg-[#1C1C1C] text-white rounded resize-none outline-none"
                value={requirement}
                onChange={handleRequirementChange}
                maxLength={300}
                placeholder="예시) '10줄 이내로 요약해줘' 등"
              />
              <div className="text-right text-gray-500 text-sm">
                {requirement.length}/300
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
