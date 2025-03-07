"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/components/atoms/Button";
import {
  SectionFolder,
  SectionModal,
  SectionModify,
} from "@/app/components/molecules/Modal";
import { FolderListData } from "@/app/types/folder";
import { useSession } from "next-auth/react";
import Image from "next/image";
import speach_bubble from "../../../../public/speech_bubble.svg";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@/app/api/folders";
import apiClient, { setAuthToken } from "@/app/utils/api";

const HomePage = () => {
  const { data: session } = useSession();
  const token = session?.user?.aiTutorToken;

  const [folders, setFolders] = useState<FolderListData[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderListData | null>(
    null
  );
  const [showModify, setShowModify] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchFolders();
    }
  }, [token]);

  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("폴더 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    try {
      await createFolder({
        folderName: subject,
        professorName: professor,
      });
      setShowModal(false);
      setSubject("");
      setProfessor("");
      fetchFolders();
    } catch (error) {
      console.error("폴더 생성 실패:", error);
    }
  };

  const handleUpdateFolder = async () => {
    if (!selectedFolder) return;
    try {
      await updateFolder({
        folderId: selectedFolder.folderId,
        folderName: subject,
        professorName: professor,
      });
      setShowModify((prevState) => ({
        ...prevState,
        [selectedFolder.folderId]: false,
      }));
      setShowModal(false);
      fetchFolders();
    } catch (error) {
      console.error("폴더 수정 실패:", error);
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    try {
      await deleteFolder(folderId);
      setSelectedFolder(null);
      fetchFolders();
    } catch (error) {
      console.error("폴더 삭제 실패:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col h-full rounded-t-xl rounded-r-ml rounded-l-ml bg-black-90">
        <div className="flex flex-col justify-between p-5 gap-8">
          <div className="text-4xl font-semibold text-white">
            <span className="flex gap-2">
              <Image src={speach_bubble} alt="speach_bubble" />
              <span> 안녕하세요!</span>
            </span>
            <span className="text-primary">{session?.user.name}</span> 교수님을
            도와드릴 AI Tutor예요
          </div>
          <div className="w-full align-middle flex pt-5">
            <div className="flex flex-row w-full">
              <p className="flex flex-col text-white font-semibold text-lg">
                홈
              </p>
            </div>
            <Button
              label="새 과목 만들기"
              variant="create"
              onClick={() => {
                setIsEditMode(false);
                setSubject("");
                setProfessor("");
                setShowModal(true);
              }}
            />
          </div>
        </div>

        <div className="bg-black-80 rounded-lg rounded-b-none mx-4 h-full">
          {folders.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-center text-white">
              <p className="text-xl font-bold mb-4">
                강의 과목 폴더를 만들어 보세요.
              </p>
              <p className="text-base text-black-70">
                새 과목 만들기 버튼을 누르면 강의 과목 폴더를 만들어 수업을
                관리할 수 있어요
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-start items-start gap-4 mx-5 py-4">
              {folders.map((folder) => (
                <div
                  key={folder.folderId}
                  className="relative flex flex-col items-center"
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
                          setIsEditMode(true);
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
        </div>

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
