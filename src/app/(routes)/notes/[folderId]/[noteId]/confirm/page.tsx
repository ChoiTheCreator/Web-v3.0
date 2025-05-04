'use client';
import { useEffect, useState } from 'react';
import Button from '@/app/components/atoms/Button';
import TabComponent from '@/app/components/atoms/Tab';
import { usePracticeContext } from '@/app/context/PracticeContext';
import { createSTT, sumamryNote } from '@/app/api/notes';
import { useParams, useRouter } from 'next/navigation';

import Loader from '@/app/components/utils/Loader';

const ConfirmNotePage = () => {
  //라우팅 경로의 useParams 중 fileID, folderID는 이전 페이지에서 확보
  const { file, setKeywords, setRequirement, keywords, requirement } =
    usePracticeContext();
  const [sttLoading, setSttLoading] = useState(true);
  //STT의 await을 차라리 여기 UseEffect에서 해버리는 구조가 더 적절해보임
  const { folderId, noteId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const runSTT = async () => {
      if (file) {
        try {
          console.log('🎧 STT 변환 시작 - 파일:', file);
          await createSTT(Number(folderId), Number(noteId), file);
          alert('✅ STT 변환 성공');
        } catch (error) {
          console.error('❌ STT 변환 실패:', error);
          alert('STT 처리 중 오류가 발생했습니다.');
        } finally {
          setSttLoading(false);
        }
      } else {
        console.warn('⚠️ STT 변환 생략 - 파일 없음');
      }
    };

    runSTT();
  }, [file, folderId, noteId]);
  if (sttLoading) {
    return (
      <Loader
        message="STT 변환중입니다."
        subMessage="30초 정도 기다려주셈"
      ></Loader>
    );
  }

  const handleNoteFinalBtn = () => {
    try {
      sumamryNote(Number(folderId), Number(noteId), keywords, requirement);
      router.push(`/notes/${folderId}/${noteId}/create-practice`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TabComponent
        onKeywordChange={setKeywords}
        onRequirementChange={setRequirement}
      ></TabComponent>
      <Button
        label="STT 기반 노트 생성"
        variant="create"
        onClick={handleNoteFinalBtn}
      ></Button>
    </>
  );
};

export default ConfirmNotePage;
