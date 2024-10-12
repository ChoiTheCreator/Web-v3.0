import React, { useState, useEffect } from "react";
import Button from "@/app/components/atoms/Button";
import { FormInput } from "@/app/components/atoms/FormInput";
import { fetchPractice } from "@/app/api/practice/fetchPractice"; // 문제 목록 가져오기 API
import { submitPractice } from "@/app/api/practice/submitPractice"; // 수정된 문제 저장 API
import { saveSelectedQuestions } from "@/app/api/practice/saveSelectedQuestions"; // 선택된 문제 저장 API

interface Question {
  practiceNumber: number;
  content: string;
  result: string;
  practiceType: "OX" | "SHORT";
}

interface ReviewQuestionsProps {
  noteId: number; // noteId 추가
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ noteId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]); // 선택된 문제의 번호 저장
  const [editableQuestionId, setEditableQuestionId] = useState<number | null>(null); // 현재 수정 중인 문제 번호

  // 문제 목록 불러오기
  useEffect(() => {
    const loadPracticeQuestions = async () => {
      try {
        const data = await fetchPractice(noteId);
        setQuestions(data.practiceResList); // 문제 목록을 상태에 저장
      } catch (error) {
        console.error("Error loading practice questions:", error);
      }
    };

    loadPracticeQuestions();
  }, [noteId]);

  // 문제 선택 핸들러
  const handleSelectQuestion = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  // 문제 수정 모드 활성화
  const handleEditQuestion = (id: number) => {
    setEditableQuestionId(id);
  };

  // 문제 내용 변경 핸들러
  const handleContentChange = (id: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.practiceNumber === id ? { ...q, content: value } : q
      )
    );
  };

  // 저장 버튼 클릭 시
  const handleSaveChanges = async () => {
    try {
      // 수정된 문제 저장 API 호출
      const payload = {
        noteId,
        questions: questions.map((q) => ({
          question: q.content,
          answer: q.result,
        })),
      };
      await submitPractice(payload);

      // 선택된 문제 저장 API 호출
      const selectionPayload = {
        noteId,
        selectedQuestions,
      };
      await saveSelectedQuestions(selectionPayload);

      console.log("Questions and selections saved successfully!");
      setEditableQuestionId(null); // 수정 완료 처리
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-4">선택</th>
            <th className="p-4">문제</th>
            <th className="p-4">답</th>
            <th className="p-4">문제 유형</th>
            <th className="p-4">수정</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.practiceNumber} className="border-b">
              {/* 선택된 문제 */}
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.practiceNumber)}
                  onChange={() => handleSelectQuestion(question.practiceNumber)}
                />
              </td>
              {/* 문제 내용 (수정 가능) */}
              <td className="p-4">
                {editableQuestionId === question.practiceNumber ? (
                  <FormInput
                    name={`content-${question.practiceNumber}`}
                    defaultValue={question.content}
                    onChange={(e) =>
                      handleContentChange(question.practiceNumber, e.target.value)
                    }
                    variant="square"
                    placeholder="문제 내용"
                  />
                ) : (
                  question.content
                )}
              </td>
              {/* 정답 */}
              <td className="p-4">{question.result}</td>
              {/* 문제 유형 (Button 컴포넌트로 표시, 수정 불가) */}
              <td className="p-4">
                <Button
                  label={question.practiceType === "OX" ? "O X 퀴즈" : "단답형"}
                  variant="select"
                  disabled={true} // 문제 유형은 수정 불가
                />
              </td>
              {/* 수정 버튼 */}
              <td className="p-4">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditQuestion(question.practiceNumber)}
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 저장 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 px-4 py-2 text-white"
          onClick={handleSaveChanges}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ReviewQuestions;
