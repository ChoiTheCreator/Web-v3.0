import React, { useState } from 'react';
import { useOnboardingstore } from '@/app/store/useOnboardingStore';
import Image from 'next/image';
import OnBoardingCarousel from './OnBoardingCarousel';
import { slides } from '@/app/constants/OnBoardingModalImageList';

const OnBoardingModal: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleSlideClicked = (index: number) => {
    setSlideIndex(index);
  };

  const { isOpen, close } = useOnboardingstore();

  if (!isOpen) return null;
  return (
    <div
      className="fixed flex flex-col z-50 inset-0 items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[800px] max-w-full bg-transparent items-center justify-center
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
          onClick={close}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default OnBoardingModal;
