"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFolderStore } from "@/app/store/useFolderStore"; // zustand store import

const Sidebar: React.FC = () => {
  const folders = useFolderStore((state) => state.folders);
  const fetchFolders = useFolderStore((state) => state.fetchFolders);
  const [showSections, setShowSections] = useState(false);

  // 컴포넌트가 마운트될 때 폴더 목록을 가져옴
  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const toggleSections = () => setShowSections(!showSections);

  return (
    <div className="min-w-[180px] h-screen justify-between flex flex-col z-20 bg-mainBlack px-2">
      <div className="flex flex-col h-full rounded-lg bg-mainBlack">
        <Link href="/home">
          <div className="px-8 py-8">
            <Image src="/icon.svg" alt="logo" width={100} height={100} />
          </div>
        </Link>
        <div>
          <div className="hover:bg-[#3c3c3c] hover:rounded-lg cursor-pointer transition-colors duration-200 rounded-lg">
            <Link href="/home">
              <div className="px-8 py-2 flex flex-row text-center gap-3">
                <Image
                  src="ic_side_home.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
                <p className="text-white">홈</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <div
              className="px-8 py-2 flex flex-row text-center gap-3 cursor-pointer hover:bg-[#3c3c3c] hover:rounded-md transition-colors duration-200"
              onClick={toggleSections}
            >
              <Image src="ic_side_all.svg" alt="logo" width={20} height={20} />
              <p className="text-white mr-8 flex-shrink-0">강의 과목</p>
              <Image
                src="arrow_sidebar.svg"
                alt="arrow"
                width={7}
                height={7}
                className={`invert transition-transform ${
                  showSections ? "rotate-90" : ""
                }`}
              />
            </div>
            {showSections &&
              folders.map((folder) => (
                <Link key={folder.folderId} href="/classNotes">
                  <div className="px-8 py-2 flex flex-row text-center gap-3 hover:bg-[#3c3c3c] hover:rounded-md cursor-pointer transition-colors duration-200">
                    <Image
                      src="ic_side_folder.svg"
                      alt="folder"
                      width={20}
                      height={20}
                    />
                    <p className="text-sm text-white flex-shrink-0">
                      {folder.folderName}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="pb-8">
        <div className="hover:bg-[#3c3c3c] hover:rounded-md cursor-pointer transition-colors duration-200">
          <div className="flex flex-row px-[35px] py-2 gap-3">
            <Image src="guide.svg" alt="logo" width={18} height={18} />
            <p className="text-white">가이드보기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
