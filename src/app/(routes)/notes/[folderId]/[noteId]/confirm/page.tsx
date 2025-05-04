'use client';
import { useEffect, useState } from 'react';

import TabComponent from '@/app/components/atoms/Tab';
import { usePracticeContext } from '@/app/context/PracticeContext';
import { createSTT } from '@/app/api/notes';
import { useParams } from 'next/navigation';
const ConfirmNotePage = () => {
  //라우팅 경로의 useParams 중 fileID, folderID는 이전 페이지에서 확보
  const { file } = usePracticeContext();
  const [sttLoading, setSttLoading] = useState(false);
  //STT의 await을 차라리 여기 UseEffect에서 해버리는 구조가 더 적절해보임
  const { folderId, noteId } = useParams();
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
        }
      } else {
        console.warn('⚠️ STT 변환 생략 - 파일 없음');
      }
    };

    runSTT();
  }, []);

  // router.push(`/notes/${folderId}/${newNote.noteId}/create-practice`);
  return <TabComponent></TabComponent>;
};

export default ConfirmNotePage;
