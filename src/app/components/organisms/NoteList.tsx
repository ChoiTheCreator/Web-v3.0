import React from "react";
import { NoteData } from "@/app/types/note";

interface NoteListProps {
  notes: NoteData[];
  onDeleteNote: (noteId: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  return (
    <div className="mx-8">
    {/* 컬럼 헤더 */}
    <div
      className="grid grid-cols-4 text-center text-gray-400 p-4 border-b border-gray-600"
      style={{ gridTemplateColumns: "5fr 1.5fr 1.5fr 0.4fr" }}
    >
      <div>수업명</div>
      <div>생성일</div>
      <div>문제 개수</div>
      <div>삭제</div>
    </div>
    
    {/* 노트 데이터 */}
    {notes.map((note) => (
      <div
        key={note.noteId}
        className="grid grid-cols-4 text-center flex-shrink-0 text-white p-4 border-b border-gray-600"
        style={{ gridTemplateColumns: "5fr 1.5fr 1.5fr 0.4fr" }}
      >
        <div className="text-start">{note.title}</div>
        <div>{note.createdAt}</div>
        <div>{note.practiceSize}문제</div>
        <button onClick={() => onDeleteNote(note.noteId)} className="text-red-400">
          삭제
        </button>
      </div>
    ))}
  </div>
  );
};

export default NoteList;
