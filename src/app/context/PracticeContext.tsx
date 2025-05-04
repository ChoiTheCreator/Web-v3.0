'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PracticeContextType {
  file: File | null;
  keywords: string;
  requirement: string;
  practiceSize: number | null;
  type: 'OX' | 'SHORT' | 'BOTH' | ''; // 타입 수정
  setFile: (file: File | null) => void;
  setKeywords: (keywords: string) => void;
  setRequirement: (requirement: string) => void;
  setPracticeSize: (size: number | null) => void;
  setType: (type: 'OX' | 'SHORT' | 'BOTH' | '') => void; // 타입에 따라 문자열로 설정
  questions: any[];
  summary: string;
  setQuestions: (questions: any[]) => void;
  setSummary: (summary: string) => void;
  folderName: string;
  professor: string;
  setFolderName: (name: string) => void;
  setProfessor: (professor: string) => void;
  practiceData: any[];
  setPracticeData: (practiceData: any[]) => void;
  sttLoading: boolean;
  setSttLoading: (value: boolean) => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(
  undefined
);

export const PracticeProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState('');
  const [requirement, setRequirement] = useState('');
  const [practiceSize, setPracticeSize] = useState<number | null>(null);
  const [type, setType] = useState<'OX' | 'SHORT' | 'BOTH' | ''>('OX'); // 기본값 설정
  const [questions, setQuestions] = useState<any[]>([]);
  const [practiceData, setPracticeData] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');
  const [professor, setProfessor] = useState<string>('');
  const [sttLoading, setSttLoading] = useState<boolean>(false);
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
        folderName,
        professor,
        setFolderName,
        setProfessor,
        sttLoading,
        setSttLoading,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error(
      'usePracticeContext must be used within a PracticeProvider'
    );
  }
  return context;
};
