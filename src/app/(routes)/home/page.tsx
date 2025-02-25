"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button";
import {
  SectionFolder,
  SectionModal,
  SectionModify,
} from "@/app/components/molecules/Modal";
import { FolderListData } from "@/app/types/folder";
import { useFolderStore } from "@/app/store/useFolderStore";

const HomePage = () => {
  // zustand store 폴더 관련 상태 및 함수 가져오기
  const folders = useFolderStore((state) => state.folders);
  const fetchFolders = useFolderStore((state) => state.fetchFolders);
  const addFolder = useFolderStore((state) => state.addFolder);
  const updateFolder = useFolderStore((state) => state.updateFolder);
  const removeFolder = useFolderStore((state) => state.removeFolder);

  // 폴더 관련 상태관리
  const [selectedFolder, setSelectedFolder] = useState<FolderListData | null>(
    null
  );
  const [showModify, setShowModify] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // 컴포넌트 마운트 시 폴더 목록 조회
  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  // 폴더 생성
  const handleCreateFolder = async () => {
    await addFolder(subject, professor);
    setSubject("");
    setProfessor("");
    setShowModal(false);
  };

  // 폴더 수정
  const handleUpdateFolder = async () => {
    if (selectedFolder) {
      await updateFolder(selectedFolder.folderId, subject, professor);
      setShowModify((prevState) => ({
        ...prevState,
        [selectedFolder.folderId]: false,
      }));
      setShowModal(false);
    }
  };

  // 폴더 삭제
  const handleDeleteFolder = async (folderId: number) => {
    await removeFolder(folderId);
    setSelectedFolder(null);
  };

  return (
    <div className="flex flex-col justify-between h-screen w-full bg-bgDeepGray">
      {/* 1. 폴더 생성 */}
      <div className="flex flex-col h-[600px] rounded-t-xl rounded-r-ml rounded-l-ml bg-black-90">
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row gap-2 ">
            <p className="flex flex-col text-white place-items-center m-auto font-semibold text-lg">
              홈
            </p>
          </div>
          {/* 폴더 생성 버튼 */}
          <Button
            label="새 과목 만들기"
            variant="create"
            onClick={() => {
              setIsEditMode(false);
              setSubject("");
              setProfessor("");
              setShowModal(true);
            }}
            disabled={folders.length > 11 ? true : false}
          />
        </div>
        {/* 폴더가 없을 때 */}
        {folders.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center text-white">
            <p className="text-xl font-bold mb-4">
              강의 과목 폴더를 만들어 보세요.
            </p>
            <p className="text-base text-black-70">
              새 과목 만들기 버튼을 누르면 강의 과목 폴더를 만들어 수업을 관리할
              수 있어요
            </p>
          </div>
        ) : (
          // 폴더가 있을 때
          <div className="flex flex-wrap gap-4 mx-5 h-full">
            {folders.map((folder) => (
              <div
                key={folder.folderId}
                className="relative min-w-60 min-h-48 flex flex-col items-center"
              >
                <SectionFolder
                  section={folder}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setSubject(folder.folderName);
                    setProfessor(folder.professor);
                  }}
                  onMenuClick={() =>
                    setShowModify((prevState) => ({
                      ...prevState,
                      [folder.folderId]: !prevState[folder.folderId],
                    }))
                  }
                  showModify={showModify[folder.folderId] || false}
                />
                {showModify[folder.folderId] && (
                  <div className="absolute top-full right-3 z-50">
                    <SectionModify
                      section={folder}
                      onEditClick={() => {
                        setIsEditMode(true); // 수정 모드
                        setShowModify((prevState) => ({
                          ...prevState,
                          [folder.folderId]: false,
                        }));
                        setSelectedFolder(folder);
                        setSubject(folder.folderName);
                        setProfessor(folder.professor);
                        setShowModal(true);
                      }}
                      onDelete={() => handleDeleteFolder(folder.folderId)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 폴더 생성/수정 모달 */}
        {showModal && (
          <SectionModal
            subject={subject}
            professor={professor}
            setSubject={setSubject}
            setProfessor={setProfessor}
            onSave={() => {
              if (isEditMode) {
                handleUpdateFolder();
              } else {
                handleCreateFolder();
              }
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
