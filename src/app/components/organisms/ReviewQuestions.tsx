import React, { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button";
import { usePracticeContext } from "@/app/context/PracticeContext";

interface ReqList {
  practiceNumber: number;
  content: string;
  result: string;
  solution: string;
  practiceType: "OX" | "SHORT";
}

interface ReviewQuestionsProps {
  noteId: number; // noteId를 props로 받음
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ noteId }) => {
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [filteredQuestions, setFilteredQuestions] = useState<ReqList[] | null>(null); // 가공된 데이터를 저장
  const { questions } = usePracticeContext(); // 전역 상태에서 문제 목록 불러오기

  useEffect(() => {
    // 문제 목록을 가공하여 상태에 저장
    setFilteredQuestions(questions);
    console.log("context에서 불러온 questions: ", questions);
  }, [questions]);

  // 로딩 상태일 경우 로딩 메시지 표시
  if (loading) {
    return <p>Loading...</p>;
  }

  // 문제가 없을 경우 처리
  if (!filteredQuestions || filteredQuestions.length === 0) {
    return <p>문제를 불러올 수 없습니다.</p>;
  }

  return (
    <div className="w-full h-full">
      {/* 테이블을 렌더링 */}
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="bg-secondaryGray text-center justify-center items-center">
            <th className="p-4">번호</th>
            <th className="p-4">문제</th>
            <th className="p-4">답</th>
            <th className="p-4">문제 유형</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.practiceNumber} className="border-none bg-secondaryGray/45 text-center justify-center items-center">
              <td className="p-4">{question.practiceNumber}</td>
              <td className="p-4 text-start">{question.content}</td>
              <td className="p-4">{question.result}</td>
              <td className="p-4 m-auto flex justify-center items-center">
                <Button
                  label={question.practiceType === "OX" ? "O X 퀴즈" : "단답형"}
                  variant="select"
                  disabled={true}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewQuestions;

//ReviewQuestions 컴포넌트에는 해당 기능이 포함되어야 해.
//1. 문제 생성 후 응답값 중 필요한 정보만 테이블로 표시 (practiceNumer, content, result, practiceType, result)
//2. 문제 내용을 수정 가능하게 해야함 (FormInput 컴포넌트 사용)
//3. 저장버튼을 누르면 noteId와 함께 체크된 문제만 저장해야함(POST요청)
//4. 저장 후 페이지 이동 없이 체크된 문제만 보여지도록 하기 