"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchFolderInfo, fetchNotes, deleteNote, createNote } from "@/app/api/notes";
import Info from "@/app/components/molecules/Info";
import NoteList from "@/app/components/organisms/NoteList";
import Button from "@/app/components/atoms/Button";
import { NoteData, NoteResponse } from "@/app/types/note";

const NotesPage = () => {
  const router = useRouter();
  const { folderId } = useParams(); // URL에서 `folderId` 추출
  const [folderInfo, setFolderInfo] = useState<{ folderName: string; professor: string }>({ folderName: '기본 폴더명', professor: '기본 교수자명' });
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);

  // 폴더 정보와 노트 목록 가져오기
  useEffect(() => {
    if (folderId) {
      // `folderId`로 폴더 정보와 노트 목록 가져오기
      const loadNotes = async () => {
        try {
          // 폴더 정보 가져오기
          const folderData = await fetchFolderInfo(Number(folderId));
          console.log("Fetched Folder Info:", folderData);
  
          // `information` 객체에서 `folderName`과 `professor` 추출하여 업데이트
          setFolderInfo({
            folderName: folderData.information.folderName,
            professor: folderData.information.professor,
          });
  
          // 노트 목록 가져오기
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
      // 삭제 후 노트 목록 다시 가져오기
      const notesData: NoteResponse = await fetchNotes(Number(folderId));
      setNotes(notesData.noteListDetailRes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // 노트 생성 핸들러
  const handleCreateNote = async () => {
    // 간단한 예제: 노트 생성 시 `noteName`으로 새 노트를 생성
    try {
      await createNote(Number(folderId), { noteName: "새 노트" });
      // 생성 후 노트 목록 다시 가져오기
      const notesData: NoteResponse = await fetchNotes(Number(folderId));
      setNotes(notesData.noteListDetailRes);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col justify-between">
      {/* 폴더 정보 */}
      <div className="flex flex-row justify-between">
        <Info folderName={folderInfo.folderName} professorName={folderInfo.professor} />
        <div className="flex flex-col justify-center items-center pr-8">
        <Button label="새 노트 만들기" variant="create" onClick={handleCreateNote} />
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        {/* 노트 목록 또는 노트 생성 버튼 */}
        {notes.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center text-white h-full">
          <p className="text-2xl mb-2">새로운 수업을 만들어 보세요.</p>
          <p className="text-base text-gray-400 mb-8">
            강의 녹화 파일을 업로드하면 복습 문제 생성이 가능해요
          </p>
          <Button label="새 노트 만들기" variant="create" onClick={handleCreateNote} />
        </div>
        ) : (
          // 노트 목록 표시
          <div>
            <NoteList notes={notes} onDeleteNote={handleDeleteNote} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
