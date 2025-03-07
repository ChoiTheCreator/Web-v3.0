import React from 'react';

import Image from 'next/image';
import OnBoardingCarousel from './OnBoardingCarousel';
interface OnBoardingModalProps {
  onClose: () => void;
}

const OnBoardingModal: React.FC<OnBoardingModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="relative w-[600px] max-w-full bg-transparent">
        <div className="relative w-full">
          <Image
            className="w-full object-cover rounded-t-lg"
            src="/IMG/onboardingBg.jpeg"
            alt="온보딩 배경"
            width={600}
            height={200}
          ></Image>
        </div>
        <OnBoardingCarousel></OnBoardingCarousel>
      </div>
    </div>
  );
};

export default OnBoardingModal;
