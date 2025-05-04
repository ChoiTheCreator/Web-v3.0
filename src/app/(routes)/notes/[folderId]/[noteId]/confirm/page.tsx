'use client';
import { useEffect, useState } from 'react';

import TabComponent from '@/app/components/atoms/Tab';
import { usePracticeContext } from '@/app/context/PracticeContext';
import { createSTT } from '@/app/api/notes';
const ConfirmNotePage = () => {
  //라우팅 경로의 useParams 중 fileID, folderID는 이전 페이지에서 확보
  const { file, sttLoading, setSttLoading } = usePracticeContext();
  //STT의 await을 차라리 여기 UseEffect에서 해버리는 구조가 더 적절해보임
  // useEffect(() => {
  //   if (file) {
  //     console.log('🎧 STT 변환 시작 - 파일:', file);
  //     const newNote =
  //       notesData.noteListDetailRes[notesData.noteListDetailRes.length - 1];
  //     console.log('🆕 새 노트 정보:', newNote);
  //     await createSTT(Number(folderId), newNote.noteId, file);
  //     alert('✅ STT 변환 성공');
  //   } else {
  //     console.warn('⚠️ STT 변환 생략 - 파일 없음');
  //   }
  // }, []);

  // router.push(`/notes/${folderId}/${newNote.noteId}/create-practice`);
  return <TabComponent></TabComponent>;
};

export default ConfirmNotePage;
