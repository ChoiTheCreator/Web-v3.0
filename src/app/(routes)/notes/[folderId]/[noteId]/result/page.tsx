'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReviewQuestions from '@/app/components/organisms/ReviewQuestions';
import Info from '@/app/components/molecules/Info';
import { usePracticeContext } from '@/app/context/PracticeContext';
import {
  getPractice,
  PracticeItemResponse,
} from '@/app/api/practice/getPractice';
import toast from 'react-hot-toast';

const ResultPage = () => {
  const params = useParams<{ folderId: string; noteId: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<
    PracticeItemResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { folderName, professor, setQuestions } = usePracticeContext();
  const [noteTitle, setNoteTitle] = useState('');
  const [professorName, setProfessorName] = useState('');
  const noteId = Number(params.noteId);

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        setIsLoading(true);
        const data = await getPractice(noteId);
        if (
          data &&
          data.information &&
          Array.isArray(data.information.reqList)
        ) {
          setPracticeQuestions(data.information.reqList);
          setQuestions(data.information.reqList);
          setNoteTitle(data.information.noteTitle || '');
          setProfessorName(data.information.professorName || '');
        } else {
          setPracticeQuestions([]);
          setQuestions([]);
          setNoteTitle('');
          setProfessorName('');
          console.warn('API 응답에 reqList 필드가 없습니다.', data);
        }
      } catch (e) {
        toast.error('문제를 가져오는데 실패했어요.');
        setPracticeQuestions([]);
        setQuestions([]);
        setNoteTitle('');
        setProfessorName('');
      } finally {
        setIsLoading(false);
      }
    };
    if (noteId) fetchPractice();
  }, [noteId, setQuestions]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">문제를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start w-full mb-4 px-5 pt-6">
        <p className="text-2xl mb-2 font-semibold text-white">{noteTitle}</p>
        <p className="text-base text-white">{professorName}</p>
      </div>
      <div className="flex flex-col">
        {practiceQuestions.length > 0 ? (
          <ReviewQuestions noteId={Number(params.noteId)} />
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-lg text-gray-500">등록된 문제가 없습니다.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPage;
