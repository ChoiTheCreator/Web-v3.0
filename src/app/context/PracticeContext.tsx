"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface PracticeContextType {
  file: File | null;
  keywords: string;
  requirement: string;
  practiceSize: number; // `number`로만 지정
  type: "OX" | "SHORT";
  setFile: (file: File | null) => void;
  setKeywords: (keywords: string) => void;
  setRequirement: (requirement: string) => void;
  setPracticeSize: Dispatch<SetStateAction<number>>; // `setPracticeSize`는 항상 `number`
  setType: (type: "OX" | "SHORT") => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export const PracticeProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState("");
  const [requirement, setRequirement] = useState("");
  const [practiceSize, setPracticeSize] = useState<number>(0); // 기본값을 `0`으로 설정
  const [type, setType] = useState<"OX" | "SHORT">("OX");

  return (
    <PracticeContext.Provider
      value={{ file, keywords, requirement, practiceSize, type, setFile, setKeywords, setRequirement, setPracticeSize, setType }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePracticeContext must be used within a PracticeProvider");
  }
  return context;
};
