import React, { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button";
import Icon from "@/app/components/atoms/Icon";
import CheckCircle from "@/app/components/atoms/CheckCircle";
import { FormInput } from "@/app/components/atoms/FormInput";
import { usePracticeContext } from "@/app/context/PracticeContext";
import savePracticeQuestions from "@/app/api/practice/savePracticeQuestions";
import { PracticeRequest } from "@/app/types/practice";

interface ReqList {
  practiceNumber: number;
  content: string;
  result: string;
  solution: string;
  practiceType: "OX" | "SHORT";
}

interface ReviewQuestionsProps {
  noteId: number;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ noteId }) => {
  const [loading, setLoading] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<ReqList[] | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedQuestions, setEditedQuestions] = useState<{ [key: number]: { content: string; result: string } }>({});
  const { questions } = usePracticeContext();

  useEffect(() => {
    setFilteredQuestions(questions);
    console.log("context에서 불러온 questions: ", questions);
  }, [questions]);

  // 선택된 문제 배열에 문제 번호 추가 또는 제거
  const toggleSelect = (practiceNumber: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(practiceNumber) ? prev.filter((num) => num !== practiceNumber) : [...prev, practiceNumber]
    );
  };

  // 수정 모드 활성화 또는 비활성화
  const toggleEditMode = (practiceNumber: number) => {
    setEditMode((prev) => ({ ...prev, [practiceNumber]: !prev[practiceNumber] }));

    if (!editMode[practiceNumber] && filteredQuestions) {
      // 수정 모드가 처음 활성화될 때 원본 데이터를 editedQuestions에 설정
      const question = filteredQuestions.find((q) => q.practiceNumber === practiceNumber);
      if (question) {
        setEditedQuestions((prev) => ({
          ...prev,
          [practiceNumber]: { content: question.content, result: question.result },
        }));
      }
    } else if (editMode[practiceNumber]) {
      // 수정 모드가 비활성화될 때 (수정 완료 시), 수정된 내용을 filteredQuestions에 반영
      const updatedContent = editedQuestions[practiceNumber]?.content;
      const updatedResult = editedQuestions[practiceNumber]?.result;

      setFilteredQuestions((prev) =>
        prev?.map((q) =>
          q.practiceNumber === practiceNumber
            ? { ...q, content: updatedContent, result: updatedResult }
            : q
        ) || null
      );
    }
  };

  // 문제나 답 수정 시 editedQuestions 상태 업데이트
  const handleInputChange = (practiceNumber: number, field: "content" | "result", value: string) => {
    setEditedQuestions((prev) => ({
      ...prev,
      [practiceNumber]: { ...prev[practiceNumber], [field]: value },
    }));
  };

  // 선택된 문제들 저장 기능
  const saveSelectedQuestions = async () => {
    setLoading(true);
    try {
      const dataToSave: PracticeRequest[] = selectedQuestions.map((practiceNumber) => {
        // 선택된 문제를 원본 데이터에서 찾기
        const originalQuestion = questions.find((q) => q.practiceNumber === practiceNumber);
        const editedQuestion = editedQuestions[practiceNumber];
        
        return {
          practiceNumber,
          content: editedQuestion?.content || originalQuestion?.content || "", // 수정된 내용이 있으면 사용, 없으면 원본 사용
          additionalResults: "", // 요구사항에 따라 빈 값으로 유지
          result: editedQuestion?.result || originalQuestion?.result || "", // 수정된 답이 있으면 사용, 없으면 원본 사용
          solution: "", // 요구사항에 따라 빈 값으로 유지
          practiceType: originalQuestion?.practiceType || "OX", // 원본 문제 유형 사용
        };
      });

      console.log("백엔드에 보낼 데이터:", dataToSave); // 백엔드로 보낼 데이터 확인

      await savePracticeQuestions(noteId, dataToSave);
      alert("선택된 문제들이 저장되었습니다.");
    } catch (error) {
      console.error("문제 저장 중 오류 발생:", error);
      alert("문제 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return <p>문제를 불러올 수 없습니다.</p>;
  }

  return (
    <div className="w-full h-full relative ">
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="bg-secondaryGray text-center">
            <th className="p-4">선택</th>
            <th className="p-4">문제</th>
            <th className="p-4">답</th>
            <th className="p-4">문제 유형</th>
            <th className="p-4">수정</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.practiceNumber} className="border-none bg-secondaryGray/45 text-center">
              <td className="p-4">
                <CheckCircle
                  isChecked={selectedQuestions.includes(question.practiceNumber)}
                  onChange={() => toggleSelect(question.practiceNumber)}
                />
              </td>
              <td className="p-4 text-start">
                {editMode[question.practiceNumber] ? (
                  <FormInput
                    name="content"
                    defaultValue={editedQuestions[question.practiceNumber]?.content || question.content}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(question.practiceNumber, "content", e.target.value)}
                    className="flex p-2 w-full"
                  />
                ) : (
                  question.content
                )}
              </td>
              <td className="p-4">
                {editMode[question.practiceNumber] ? (
                  <FormInput
                    name="result"
                    defaultValue={editedQuestions[question.practiceNumber]?.result || question.result}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(question.practiceNumber, "result", e.target.value)}
                    className="m-auto w-[60px]"
                  />
                ) : (
                  question.result
                )}
              </td>
              <td className="p-4 flex justify-center">
                <Button
                  label={question.practiceType === "OX" ? "O X 퀴즈" : "단답형"}
                  variant="select"
                  disabled={true}
                />
              </td>
              <td className="p-4">
                <div className="flex justify-center">
                  <Icon
                    label="update"
                    size={20}
                    onClick={() => toggleEditMode(question.practiceNumber)}
                    alt="수정 아이콘"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="z-40 mt-[-80px] mr-[40px] flex justify-end">
        <Button
          label="저장"
          variant="next"
          onClick={saveSelectedQuestions}
        />
      </div>
    </div>
  );
};

export default ReviewQuestions;
