'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReviewQuestions from '@/app/components/organisms/ReviewQuestions';
import SummaryText from '@/app/components/organisms/SummaryText';
import Info from '@/app/components/molecules/Info';
import { usePracticeContext } from '@/app/context/PracticeContext';
import { getPractice } from '@/app/api/Professor';
import { savePractice } from '@/app/api/Professor';
import ReviewQuestionResult from '@/app/components/molecules/ReviewQuestionResult';

const ResultPage = () => {
  const params = useParams<{ folderId: string; noteId: string }>();
  const [isSaving, setIsSaving] = useState(false); // 저장 상태
  const [activeTab, setActiveTab] = useState<'questions' | 'summary'>(
    'questions'
  );
  const {
    folderName,
    professor,
    questions,
    setQuestions,
    summary,
    setSummary,
  } = usePracticeContext();
  const noteId = Number(params.noteId);
  const handleTabChange = (tab: 'questions' | 'summary') => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        const data = await getPractice(noteId);
        setQuestions(data.reqList); //data fetching Resonse 구조임 아마 배열일듯?
      } catch (e) {
        console.log('컴포넌트 단에서 getPractice 망가짐', e);
      }
      if (noteId) fetchPractice();
    };
  }, [noteId]);

  const handleSaveQuestions = async () => {
    try {
      setIsSaving(true);
      const payload = {
        minute: 60,
        second: 59,
        endDate: new Date().toISOString(),
        reqList: questions, // context에서 가져온 문제 목록
      };
      await savePractice(noteId, payload);
      alert('✅ 문제가 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('문제 저장 실패', error);
      alert('❌ 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Info folderName={folderName} professorName={professor} />
      </div>

      <div className="flex flex-col">
        <div className="w-full flex justify-center items-stretch">
          <button
            className={`w-full py-2 border-b-2 font-medium ${
              activeTab === 'questions'
                ? 'border-primary text-primary bg-black-90'
                : 'border-black-80 text-white bg-black-90'
            }`}
            onClick={() => handleTabChange('questions')}
          >
            복습 문제 확인 및 선택
          </button>
          <button
            className={`w-full py-2 border-b-2 font-medium ${
              activeTab === 'summary'
                ? 'border-primary text-primary bg-black-90'
                : 'border-black-80 text-white bg-black-90'
            }`}
            onClick={() => handleTabChange('summary')}
          >
            요약문 확인
          </button>
          <ReviewQuestionResult></ReviewQuestionResult>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Info folderName={folderName} professorName={professor} />

          {activeTab === 'questions' && (
            <button
              className="px-4 py-2 bg-primary text-white rounded"
              onClick={handleSaveQuestions}
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '문제 저장'}
            </button>
          )}
        </div>

        {activeTab === 'questions' && (
          <ReviewQuestions noteId={Number(params.noteId)} />
        )}
        {activeTab === 'summary' && (
          <SummaryText
            noteId={Number(params.noteId)}
            folderId={Number(params.folderId)}
          />
        )}
      </div>
    </>
  );
};

export default ResultPage;
