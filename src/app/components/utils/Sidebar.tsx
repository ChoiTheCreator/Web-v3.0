"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../atoms/Icon";
import { useFetchFolders } from "@/app/hooks/folder/useFetchFolders";
import { setAuthToken } from "@/app/utils/api";
import { useSession } from "next-auth/react";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.user?.aiTutorToken;
  const [isAuthSet, setIsAuthSet] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setIsAuthSet(true);
    }
  }, [token]);

  const { data: folders = [], isLoading, error } = useFetchFolders();

  const [showSections, setShowSections] = useState(false);
  const toggleSections = () => setShowSections(!showSections);

  return (
    <div className="min-w-[220px] h-screen justify-between flex flex-col z-20 bg-black px-2">
      <div className="flex flex-col h-full rounded-lg bg-black">
        <Link href="/home">
          <div className="flex items-center justify-center px-2">
            <Icon label="icon" className="w-[110px] h-[70px] m-auto" />
          </div>
        </Link>
        <div>
          <div className="hover:bg-black-70 hover:rounded-lg cursor-pointer transition-colors duration-200 rounded-lg">
            <Link href="/home">
              <div className="px-8 py-2 flex flex-row text-center gap-3">
                <Icon
                  label="ic_side_home"
                  className="w-[20px] h-[20px] my-auto"
                />
                <p className="text-white">홈</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col">
            <div
              className="px-8 py-2 flex flex-row text-center gap-3 cursor-pointer hover:bg-[#3c3c3c] hover:rounded-md rounded-md transition-colors duration-200"
              onClick={toggleSections}
            >
              <Icon
                label="ic_side_folder"
                className="w-[20px] h-[20px] m-auto"
              />
              <p className="text-white mr-8 flex-shrink-0">강의 과목</p>
              <Icon
                label="arrow_sidebar"
                className={`h-[16px] w-[16px] my-auto invert transition-transform ${
                  showSections ? "rotate-90" : ""
                }`}
              />
            </div>
            {showSections &&
              folders.map((folder) => (
                <Link key={folder.folderId} href={`/notes/${folder.folderId}`}>
                  <div className="px-8 py-2 flex flex-row text-center gap-3 hover:bg-[#3c3c3c] hover:rounded-md cursor-pointer transition-colors duration-200">
                    <Icon
                      label="ic_side_folder"
                      className="w-[20px] h-[20px] my-auto"
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
        <div className="hover:bg-black-80 hover:rounded-md cursor-pointer transition-colors duration-200 rounded-md">
          <div className="flex flex-row px-[35px] py-2 gap-3">
            <Icon label="guide" className="w-[20px] h-[20px] my-auto" />
            <p className="text-white">가이드보기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
