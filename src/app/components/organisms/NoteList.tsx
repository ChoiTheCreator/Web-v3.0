import React from "react";
import { NoteData } from "@/app/types/note";
import { useRouter } from "next/navigation";
import Image from "next/image";
import delete_bin from "../../../../public/delete_bin_red.svg";
import delete_red from "../../../../public/delete_red.svg";

interface NoteListProps {
  notes: NoteData[];
  onDeleteNote: (noteId: number) => void;
  folderId: number;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onDeleteNote,
  folderId,
}) => {
  const router = useRouter();

  const handleNoteClick = (noteId: number, folderId: number) => {
    router.push(`/notes/${folderId}/${noteId}/result`);
  };

  return (
    <div className="mx-8">
      <div className="flex gap-0.5 items-center flex-row justify-around text-center text-white border-b border-gray-600 whitespace-nowrap">
        <div className="w-1/6 py-6 bg-black-80"> </div>
        <div className="w-2/3 bg-black-80 py-3">수업명</div>
        <div className="w-1/4 bg-black-80 py-3">생성일</div>
        <div className="w-1/4 bg-black-80 py-3">문제 개수</div>
        <div className="w-1/6 bg-black-80 flex justify-center items-center py-3.5">
          <Image src={delete_bin} alt="delete" className="w-5 h-5" />
        </div>
      </div>

      {notes.map((note, id) => (
        <div
          key={note.noteId}
          className="flex justify-around text-center flex-shrink-0 text-white py-3 border-b border-gray-600 hover:bg-black-80 hover:cursor-pointer whitespace-nowrap"
          onClick={() => handleNoteClick(note.noteId, folderId)}
        >
          <div className="w-1/6">{id + 1}</div>
          <div className="w-2/3 text-start px-2">{note.title}</div>
          <div className="w-1/4">{note.createdAt}</div>
          <div className="w-1/4">{note.practiceSize}문제</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.noteId);
            }}
            className="text-red-400 w-1/6 flex justify-center items-center"
          >
            <Image src={delete_red} alt="delete" className="w-5 h-5" />
          </button>{" "}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
