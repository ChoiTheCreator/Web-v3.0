'use client';
import { useEffect, useState } from 'react';
import Button from '@/app/components/atoms/Button';
import TextInputSection from '@/app/components/atoms/TextInputSection';
import { usePracticeContext } from '@/app/context/PracticeContext';
import { createSTT, summaryNote } from '@/app/api/notes';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

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
    if (!file) return;
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
        message="음성 변환 중이에요."
        subMessage="30초 정도만 기다려 주세요!"
      ></Loader>
    );
  }

  const handleNoteFinalBtn = () => {
    try {
      summaryNote(Number(folderId), Number(noteId), keywords, requirement);
      router.push(`/notes/${folderId}/${noteId}/create-practice`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center p-8 justify-between">
          <div className="flex flex-col justify-center items-center text-center text-white h-full">
            <div className="flex flex-col items-start">
              <p className="text-xl mb-2 font-semibold">새로운 수업</p>
              <p className="text-base text-white">
                강의 녹화 파일을 업로드하면 복습 문제 생성이 가능해요
              </p>
            </div>
          </div>
          <Button
            label="다음"
            variant="next"
            onClick={handleNoteFinalBtn}
          ></Button>
        </div>

        <div className="flex w-full flex-row justify-start px-2">
          <TextInputSection
            onKeywordChange={setKeywords}
            onRequirementChange={setRequirement}
          ></TextInputSection>
          <hr className="border-t-[0.5px] border-black-80 my-4" />
          <div className="flex flex-col items-start font-semibold gap-2 w-2/5 pt-8 px-4">
            <p>강의 파일</p>
            <p className="text-black-60 font-normal">
              * 파일 업로드 중에 다른 페이지로 이동하면 입력한 내용이 모두
              사라져요!
            </p>
            <p className="text-base border-[0.5px] py-3 px-4 w-full border-black-80 rounded-md p-2 text-black-70 flex font-semibold gap-4">
              <Image
                src={`/active_folder.svg`}
                alt={'active_folder'}
                width={40}
                height={40}
              />
              <div className="flex flex-col gap-1 whitespace-nowrap">
                <div className="text-white">{file?.name}</div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmNotePage;
