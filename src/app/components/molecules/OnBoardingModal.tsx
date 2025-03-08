import React from 'react';

import Image from 'next/image';
import OnBoardingCarousel from './OnBoardingCarousel';

interface OnBoardingModalProps {
  onClose: () => void;
  //필요 props 추가할거 있으면 해야할듯 합니다.
}

const OnBoardingModal: React.FC<OnBoardingModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed flex inset-0 items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[800px] h-[200px] max-w-full bg-transparent -translate-y-20
      "
      >
        <div className="relative w-full">
          <Image
            className="w-full object-cover rounded-t-lg"
            src="/IMG/onboardingBg.jpeg"
            alt="온보딩 배경"
            width={600}
            height={100}
          ></Image>
        </div>
        <OnBoardingCarousel></OnBoardingCarousel>{' '}
        <button
          className="absolute top-4 right-1 bg-transparent text-white px-3 py-1 rounded-md"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default OnBoardingModal;
