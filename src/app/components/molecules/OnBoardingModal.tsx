import React, { useState } from 'react';

import Image from 'next/image';
import OnBoardingCarousel from './OnBoardingCarousel';
import { slides } from '@/app/constants/OnBoardingModalImageList';

interface OnBoardingModalProps {
  onClose: () => void;
  //필요 props 추가할거 있으면 해야할듯 합니다.
}

const OnBoardingModal: React.FC<OnBoardingModalProps> = ({ onClose }) => {
  //carousel IMG Array
  const [slideIndex, setSlideIndex] = useState(0);

  const handleSlideClicked = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div
      className="fixed flex flex-col z-50 inset-0 items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
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
            src={slides[slideIndex].background}
            alt="온보딩 배경"
            width={600}
            height={100}
            priority
          ></Image>
        </div>
        <OnBoardingCarousel
          slides={slides}
          onSlideChange={handleSlideClicked}
        ></OnBoardingCarousel>{' '}
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
