"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { usePracticeContext } from "@/app/context/PracticeContext"; // Context 사용
import NewPracticeForm from "@/app/components/organisms/NewPracticeForm";
import Button from "@/app/components/atoms/Button";
import { createPractice } from "@/app/api/practice/createPractice";

const CreatePracticePage = () => {
  const router = useRouter();
  const { folderId, noteId } = useParams(); // URL에서 folderId와 noteId 추출
  const { file, keywords, requirement, practiceSize, setQuestions, setSummary, type } = usePracticeContext(); // PracticeContext에서 전역 상태 사용

  // 복습 문제 생성 핸들러
  const handleCreatePractice = async () => {
    // 파일 검증: 파일이 빈 파일이면 오류 처리
    if (!noteId || !file || file.size === 0) { // 파일은 반드시 존재해야 함
      alert("파일이 업로드되지 않았습니다. 파일을 선택해주세요.");
      console.log("Missing noteId or file:", { noteId, file });
      return;
    }

    try {
      console.log("파일 및 문제 설정 준비 완료");
      console.log("file: ", file);
      console.log("practiceSize: ", practiceSize);
      console.log("keywords: ", keywords);
      console.log("requirement: ", requirement);
      console.log("type: ", type);

      // createPracticeReq 객체 생성
      const createPracticeReq: {
        type: "OX" | "SHORT";
        keywords: string;
        requirement: string;
        practiceSize?: number; // 문제 개수는 optional로 설정
      } = {
        type: type as "OX" | "SHORT", // 문제 유형
        keywords: keywords || "", // 키워드 (없으면 빈 문자열)
        requirement: requirement || "", // 요구사항 (없으면 빈 문자열)
      };

      // AI 추천이 아닌 경우에만 practiceSize 추가
      if (practiceSize !== null) { // practiceSize가 null이 아닐 때만 추가
        createPracticeReq.practiceSize = practiceSize;
      }

      console.log("createPracticeReq: ", createPracticeReq); // 요청 데이터 출력
      
      // 문제 생성 API 호출
      const practiceResponse = await createPractice({
        noteId: Number(noteId), // noteId를 URL로 전달
        createPracticeReq,
        file, // Context에서 불러온 파일
      });
      
      console.log("API 응답1: ", practiceResponse); // API 응답 출력
  
      if (practiceResponse && practiceResponse.information) {
        const { practiceResList, summary } = practiceResponse.information;
        console.log("practiceResList: ", practiceResList); // 문제 목록 출력
        // practiceResList의 각 항목에서 content의 번호와 콜론을 제거
        const formattedQuestions = practiceResList.map((question: any) => ({
          ...question,
          content: question.content.replace(/^\d+:\s*/, "") // 숫자와 콜론, 공백 제거
        }));
        
        // formattedQuestions 배열을 questions로 설정
        setQuestions(formattedQuestions); 
        // summary 문자열 설정
        setSummary(summary);       
      } else {
        console.log("응답 데이터에 information이 없습니다.", practiceResponse);
      }
  
      

      // 문제 생성 성공 시 결과 페이지로 이동
      router.push(`/notes/${folderId}/${noteId}/result?tab=questions`);
    } catch (error) {
      console.error("문제 생성 중 오류 발생");

      // 타입스크립트에서 `error`는 기본적으로 `unknown` 타입이므로, 형식 좁히기를 통해 처리
      if (error instanceof Error) {
        // AxiosError일 가능성이 있을 경우 추가 처리
        if ((error as any).response) {
          const axiosError = error as any; // AxiosError 타입 단언
          console.log("응답 데이터: ", axiosError.response.data); // 오류 발생 시 응답 데이터 출력
          console.log("응답 상태 코드: ", axiosError.response.status); // 오류 발생 시 상태 코드 출력
          console.log("응답 헤더: ", axiosError.response.headers); // 오류 발생 시 헤더 출력
        } else if (error.message) {
          console.log("오류 메시지: ", error.message);
        }
      } else {
        console.log("알 수 없는 오류 발생", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-8">
      <div className="flex flex-col justify-start mb-8">
        <p className="text-white text-sm font-normal">복습 문제 생성 옵션을 선택해주세요</p>
        <p className="text-white text-2xl font-normal">새로운 복습 문제지</p>
      </div>

      {/* 문제 설정을 위한 폼 */}
      <NewPracticeForm />

      {/* 복습 문제 생성 버튼 */}
      <div className="flex justify-end">
        <Button label="복습 문제 생성" variant="next" onClick={handleCreatePractice} />
      </div>
    </div>
  );
};

export default CreatePracticePage;