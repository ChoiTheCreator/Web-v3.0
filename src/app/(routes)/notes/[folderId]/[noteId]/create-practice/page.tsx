'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePracticeContext } from '@/app/context/PracticeContext';
import NewPracticeForm from '@/app/components/organisms/NewPracticeForm';
import Button from '@/app/components/atoms/Button';
import { createPractice } from '@/app/api/practice/createPractice';
import Loader from '@/app/components/utils/Loader';
import { createNoteSTT } from '@/app/api/notes';
import apiClient from '@/app/utils/api';

const CreatePracticePage = () => {
  const router = useRouter();
  const { folderId, noteId } = useParams();
  const {
    file,
    keywords,
    requirement,
    practiceSize,
    setQuestions,
    setSummary,
    type,
    setType,
  } = usePracticeContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePractice = async () => {
    if (!noteId || !file || file.size === 0) {
      alert('파일이 업로드되지 않았습니다. 파일을 선택해주세요.');
      return;
    }

    if (!type) {
      alert('문제 유형을 최소 하나 선택해야 합니다.');
      return;
    }

    try {
      setIsLoading(true);

      // 1️⃣ 입력값 확인
      console.log('📥 입력값 확인');
      console.log('noteId:', noteId);
      console.log('folderId:', folderId);
      console.log('file:', file);
      console.log('keywords:', keywords);
      console.log('requirement:', requirement);
      console.log('type:', type);
      console.log('practiceSize:', practiceSize);

      // 2️⃣ STT 요청
      console.log('🎧 createNoteSTT 호출 시작');
      await createNoteSTT(
        Number(folderId),
        Number(noteId),
        keywords,
        requirement
      );
      console.log('✅ createNoteSTT 성공');

      // 3️⃣ 문제 생성 요청
      const createPayLoad = {
        practiceSize,
        type,
        keywords,
        requirement,
      };
      console.log('🧾 문제 생성 요청 payload:', createPayLoad);

      const createRes = await apiClient.post(
        `/api/v1/professor/practice/${noteId}/new`,
        createPayLoad
      );
      console.log('✅ 문제 미리 생성 성공:', createRes.data);

      // 4️⃣ 페이지 이동
      router.push(`/notes/${folderId}/${noteId}/result?tab=questions`);
    } catch (error) {
      alert('지금은 요청이 많아, 생성이 어려워요. 5분 후에 다시 시도해주세요.');

      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          console.log('❌ 응답 에러 데이터: ', axiosError.response.data);
          console.log('❌ 응답 상태 코드: ', axiosError.response.status);
          console.log('❌ 응답 헤더: ', axiosError.response.headers);
        } else {
          console.log('❌ 일반 에러 메시지: ', error.message);
        }
      } else {
        console.log('❌ 알 수 없는 에러 객체: ', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader
            message="노트만드는중 stt 기반으로"
            subMessage="1분정도걸림 ㄱㄷ"
          />
        </div>
      )}
      <div className="flex flex-col justify-between h-full p-8">
        <div className="flex flex-row w-full justify-between items-center align-middle pb-8">
          <div className="flex flex-col justify-start gap-2">
            <p className="text-white text-2xl font-bold">새로운 수업</p>
            <p className="text-white text-sm font-normal">
              복습 문제 옵션을 선택하세요
            </p>
          </div>
          <div>
            <Button
              label="만들기"
              variant="next"
              onClick={handleCreatePractice}
            />
          </div>
        </div>

        <NewPracticeForm />
      </div>
    </>
  );
};

export default CreatePracticePage;
