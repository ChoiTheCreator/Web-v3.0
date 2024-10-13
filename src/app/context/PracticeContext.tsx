"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface PracticeContextType {
  file: File | null; // 파일은 필수, null이 될 수 없도록 변경
  keywords: string; // 키워드 (필수 아님)
  requirement: string; // 요구사항 (필수 아님)
  practiceSize: number | null; // 문제 개수, null 가능 (AI 추천 시)
  type: "OX" | "SHORT"; // 문제 유형
  setFile: Dispatch<SetStateAction<File | null>>;
  setKeywords: Dispatch<SetStateAction<string>>;
  setRequirement: Dispatch<SetStateAction<string>>;
  setPracticeSize: Dispatch<SetStateAction<number | null>>; // practiceSize는 null 가능
  setType: Dispatch<SetStateAction<"OX" | "SHORT">>;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const PracticeProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null); // 파일을 기본값으로 null로 설정
  const [keywords, setKeywords] = useState<string>(""); // 키워드를 빈 문자열로 초기화
  const [requirement, setRequirement] = useState<string>(""); // 요구사항을 빈 문자열로 초기화
  const [practiceSize, setPracticeSize] = useState<number | null>(null); // 문제 개수 기본값은 null
  const [type, setType] = useState<"OX" | "SHORT">("OX"); // 문제 유형 기본값 OX

  return (
    <PracticeContext.Provider
      value={{ file, keywords, requirement, practiceSize, type, setFile, setKeywords, setRequirement, setPracticeSize, setType }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

// Context에서 전역 상태를 가져오는 커스텀 훅
export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePracticeContext must be used within a PracticeProvider");
  }
  return context;
};
