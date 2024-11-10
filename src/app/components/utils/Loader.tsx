// src/components/Loader.tsx
import React from "react";
import Lottie from "lottie-react";  
import ProgressBar from "../../../../public/Progress.json";

const Loader: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center h-screen w-full bg-bgDeepGray/40">
      <div className="flex flex-col items-center justify-center">
      <div className="w-1/4 md:w-1/4 flex flex-rowjustify-center items-center">
        <Lottie animationData={ProgressBar} loop={true} className="w-[100px] h-[100px] m-auto flex flex-row justify-center items-center "/>
      </div>
      <p className="text-white text-center text-xl mt-2 animate-subtleBlink">
         복습문제와 요약문을 생성하는 중이에요.
        </p>
          <p className="text-gray-400 text-center text-base mt-2">약 1분 정도 소요될 수 있어요!</p>
      </div>
    </div>
  );
};

export default Loader;
