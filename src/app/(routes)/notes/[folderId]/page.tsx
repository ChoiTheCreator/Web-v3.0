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
          // 폴더 리스트 가져오기
          const folders = await getFolders();
          console.log("Fetched Folders:", folders);
          
          // 현재 `folderId`에 해당하는 폴더 찾기
          const currentFolder = folders.find(folder => folder.folderId === Number(folderId));
          if (currentFolder) {
            setFolderInfo({
              folderName: currentFolder.folderName,
              professor: currentFolder.professor,
            });
          } else {
            console.error("Folder not found");
          }
  
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

  const handleCreateNote = async () => {
    try {
      // 노트 생성 요청 보내기 (생성 요청 시 `folderId`만 전송)
      await createNote(Number(folderId), { noteName: "새 노트" });
  
      // 노트 생성 후 해당 폴더의 노트 목록을 다시 가져오기
      const notesData: NoteResponse = await fetchNotes(Number(folderId));
      
      // 방금 생성된 노트의 ID 가져오기
      const newNote = notesData.noteListDetailRes[notesData.noteListDetailRes.length - 1]; // 마지막 노트가 방금 생성된 노트라고 가정
      
      // newNote의 noteId로 라우팅
      router.push(`/notes/${folderId}/${newNote.noteId}`);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-start">
        {/* 로딩 중일 때 스켈레톤 UI 보여주기 */}
        <div className="flex flex-row justify-between p-8">
          {/* 폴더 정보 로딩 */}
          <div className="flex flex-col">
            <Skeleton width="200px" height="24px" /> {/* 제목 스켈레톤 */}
            <Skeleton width="150px" height="18px" className="mt-2" /> {/* 부제목 스켈레톤 */}
          </div>
          {/* 노트 생성 버튼 */}
          <div className="flex flex-col justify-center items-center pr-2">
            <Skeleton width="120px" height="40px" className="rounded-full" /> {/* 버튼 스켈레톤 */}
          </div>
        </div>

        {/* 노트 목록 로딩 */}
        <div className="p-8 mt-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton width="100%" height="40px" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* 폴더 정보 */}
      <div className="flex flex-row justify-between">
        <Info folderName={folderInfo.folderName} professorName={folderInfo.professor} />
        <div className="flex flex-col justify-center items-center pr-8">
          {/* '새 노트 만들기' 버튼 클릭 시 라우팅 */}
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
