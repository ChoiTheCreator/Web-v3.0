"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PracticeContextType {
    file: File | null;
    keywords: string;
    requirement: string;
    practiceSize: number | null;
    type: "OX" | "SHORT";
    setFile: (file: File | null) => void;
    setKeywords: (keywords: string) => void;
    setRequirement: (requirement: string) => void;
    setPracticeSize: (size: number | null) => void;
    setType: (type: "OX" | "SHORT") => void;
  
    // 추가된 상태들
    questions: any[];
    summary: string;
    setQuestions: (questions: any[]) => void;
    setSummary: (summary: string) => void;
  
    // Info 정보를 위한 상태
    folderName: string;
    professor: string;
    setFolderName: (name: string) => void;
    setProfessor: (professor: string) => void;

    practiceData: any[];
    setPracticeData: (practiceData: any[]) => void;
  }
  
  const PracticeContext = createContext<PracticeContextType | undefined>(undefined);
  
  export const PracticeProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [keywords, setKeywords] = useState("");
    const [requirement, setRequirement] = useState("");
    const [practiceSize, setPracticeSize] = useState<number | null>(null);
    const [type, setType] = useState<"OX" | "SHORT">("OX");
    const [questions, setQuestions] = useState<any[]>([]);
    const [practiceData, setPracticeData] = useState<any[]>([]);
    const [summary, setSummary] = useState<string>("");
  
    // 새로운 상태 추가
    const [folderName, setFolderName] = useState<string>("");
    const [professor, setProfessor] = useState<string>("");
  
    return (
      <PracticeContext.Provider
        value={{
          file,
          keywords,
          requirement,
          practiceSize,
          type,
          setFile,
          setKeywords,
          setRequirement,
          setPracticeSize,
          setType,
          practiceData,
          setPracticeData,
          summary,
          questions,
          setQuestions,
          setSummary,
          folderName,  // 폴더명 상태
          professor,   // 교수명 상태
          setFolderName,  // 폴더명 설정 함수
          setProfessor,   // 교수명 설정 함수
        }}
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
  