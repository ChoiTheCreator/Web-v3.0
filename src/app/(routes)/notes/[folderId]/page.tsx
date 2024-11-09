"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchNotes, deleteNote, createNote } from "@/app/api/notes";
import { getFolders } from "@/app/api/folders";
import Info from "@/app/components/molecules/Info";
import NoteList from "@/app/components/organisms/NoteList";
import Button from "@/app/components/atoms/Button";
import { NoteData, NoteResponse } from "@/app/types/note";
import Skeleton from "@/app/components/utils/Skeleton";
import NewNoteForm from "@/app/components/organisms/NewNoteForm";
import { usePracticeContext } from "@/app/context/PracticeContext"; // PracticeContext 가져옴

const NotesPage = () => {
  const router = useRouter();
  const { folderId } = useParams(); // URL에서 `folderId` 추출
  const { setFile, setKeywords, setRequirement, setFolderName, setProfessor } = usePracticeContext(); // Context에서 상태 업데이트 함수 가져옴
  const [folderInfo, setFolderInfo] = useState<{ folderName: string; professor: string }>({
    folderName: '기본 폴더명',
    professor: '기본 교수자명',
  });
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false); // 폼 열기 상태 추가
  const [noteName, setNoteName] = useState(""); // 새로운 노트 이름 상태 추가

  // 폴더 정보와 노트 목록 가져오기
  useEffect(() => {
    if (folderId) {
      const loadNotes = async () => {
        try {
          const folders = await getFolders();
          console.log("Fetched Folders:", folders);

          const currentFolder = folders.find(folder => folder.folderId === Number(folderId));
          if (currentFolder) {
            setFolderName(currentFolder.folderName);
            setProfessor(currentFolder.professor);
          } else {
            console.error("Folder not found");
          }

          const notesData: NoteResponse = await fetchNotes(Number(folderId));
          setNotes(notesData.noteListDetailRes);
        } catch (error) {
          console.error("Failed to load notes:", error);
        } finally {
          setLoading(false);
        }
      };

      loadNotes();
    }
  }, [folderId]);

  // 노트 삭제 핸들러
  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      const notesData: NoteResponse = await fetchNotes(Number(folderId));
      setNotes(notesData.noteListDetailRes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // 노트 생성 핸들러 (folderId와 noteName을 전달)
  const handleCreateNote = async () => {
    try {
      if (!noteName) {
        alert("노트 이름을 입력해 주세요.");
        return;
      }

      const createdNoteResponse = await createNote(Number(folderId), { title: noteName });

      if (createdNoteResponse) {
        const notesData: NoteResponse = await fetchNotes(Number(folderId));
        const newNote = notesData.noteListDetailRes[notesData.noteListDetailRes.length - 1];

        // 생성된 노트 페이지로 리다이렉트
        router.push(`/notes/${folderId}/${newNote.noteId}/create-practice`);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col justify-start">
        <div className="flex flex-row justify-between p-8">
          <div className="flex flex-col">
            <Skeleton width="200px" height="24px" />
            <Skeleton width="150px" height="18px" className="mt-2" />
          </div>
          <div className="flex flex-col justify-center items-center pr-2">
            <Skeleton width="120px" height="40px" className="rounded-full" />
          </div>
        </div>

        <div className="p-8 mt-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton width="100%" height="40px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Info 또는 수업 정보 */}
      {isFormOpen ? (
        <div className="flex flex-col justify-start p-8">
          <p className="text-white text-sm font-normal">수업 정보를 입력해 주세요</p>
          <p className="text-white text-2xl font-normal">새로운 수업</p>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <Info folderName={usePracticeContext().folderName} professorName={usePracticeContext().professor} />
          <div className="flex flex-col justify-center items-center pr-8">
            {/* '새 노트 만들기' 버튼 클릭 시 폼 열기 */}
            <Button label="새 노트 만들기" variant="create" onClick={() => setIsFormOpen(true)} />
          </div>
        </div>
      )}

      {/* 노트 생성 폼 */}
      {isFormOpen && (
        <NewNoteForm
          folderId={Number(folderId)}
          noteId={0} // 노트가 생성되기 전이므로 0으로 설정
          setNoteName={setNoteName} // 노트 이름 설정
          setFile={setFile}         // 파일 설정 (Context에서 불러옴)
          setKeywords={setKeywords}  // 키워드 설정 (Context에서 불러옴)
          setRequirement={setRequirement} // 요구사항 설정 (Context에서 불러옴)
        />
      )}

      <div className="h-full flex flex-col justify-between">
        {isFormOpen ? null : notes.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center text-white h-full">
            <p className="text-2xl mb-2">새로운 수업을 만들어 보세요.</p>
            <p className="text-base text-gray-400 mb-8">
              강의 녹화 파일을 업로드하면 복습 문제 생성이 가능해요
            </p>
            <Button label="새 노트 만들기" variant="create" onClick={() => setIsFormOpen(true)} />
          </div>
        ) : (
          <div>
            <NoteList notes={notes} onDeleteNote={handleDeleteNote} />
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      {isFormOpen && (
        <div className="flex justify-end p-8">
          <Button label="다음" variant="next" imgSrc="arrow_next" onClick={handleCreateNote} />
        </div>
      )}
    </div>
  );
};

export default NotesPage;
