"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const Home = () => {
  const router = useRouter();

  const handleProfessorClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-row bg-black-90 w-full h-full justify-center items-center">
      <div className="w-1/2 h-lvh flex flex-col justify-center items-center">
        <div className="font-Pretendard font-semibold text-primary">
          <div className="font-Pretendard font-semibold text-3xl text-primary whitespace-nowrap text-center">
            회원님의 신분을 선택해주세요
          </div>
          <div className="flex justify-center items-center flex-row gap-4 mt-4">
            <button
              className="bg-black-80 text-white font-Pretendard text-xl flex flex-col justify-center items-center gap-2 p-4 px-10 hover:bg-primary active:bg-primary rounded-lg w-1/2"
              onClick={handleProfessorClick}
            >
              <Image src="professor.svg" alt="logo" width={100} height={100} />
              <p className="font-Pretendard font-normal text-2xl whitespace-nowrap ">
                교수자
              </p>
            </button>
            <button
              className="bg-black-80 text-black-60 font-Pretendard text-xl rounded-lg w-1/2 flex flex-col gap-2 p-4 px-10 justify-center items-center"
              disabled
            >
              <Image
                src="student.svg"
                alt="logo"
                width={100}
                height={100}
                style={{ opacity: 0.2 }}
              />
              <p className="font-Pretendard font-normal text-2xl whitespace-nowrap">
                학생
              </p>
            </button>
          </div>
          <p className="font-Pretendard font-normal text-base text-center text-gray-500 mt-2">
            학생 서비스는 현재 준비중입니다 :)
            <br />
            빠른 시일 내로 준비하도록 하겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
