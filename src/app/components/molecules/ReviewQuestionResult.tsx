import React from 'react';
import { usePracticeContext } from '@/app/context/PracticeContext';

const ReviewQuestionResult = () => {
  const { questions } = usePracticeContext();

  if (!questions || questions.length === 0) {
    return <p className="text-white">문제가 아직 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, idx) => (
        <div
          key={q.practiceNumber}
          className="bg-black-80 text-white p-4 rounded border border-primary"
        >
          <p className="font-bold mb-1">
            {q.practiceNumber}. {q.content}
          </p>
          <p className="text-sm text-gray-400">정답: {q.result}</p>
          <p className="text-sm text-gray-300">해설: {q.solution}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewQuestionResult;
