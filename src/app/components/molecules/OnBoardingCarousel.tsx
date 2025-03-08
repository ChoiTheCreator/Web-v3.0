import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import React from 'react';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl cursor-pointer z-10"
    >
      ❮
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl cursor-pointer z-10"
    >
      ❯
    </div>
  );
};

const OnBoardingCarousel = () => {
  const carouselSetting = {
    dots: true,

    customPaging: (i) => <div className="w-1 h-1 rounded-full bg-gray-300" />,

    appendDots: (dots) => (
      <ul className=" flex justify-center gap-3 list-none absolute w-full top-1">
        {dots.map((dot, index) => {
          const isActive =
            dot.props.className && dot.props.className.includes('slick-active');
          return (
            <li
              key={index}
              onClick={dot.props.onClick}
              className="cursor-pointer"
            >
              <div
                className={`w-3  h-3 rounded-full relative bottom-6 ${
                  isActive ? 'bg-primary' : 'bg-gray-300'
                }`}
              ></div>
            </li>
          );
        })}
      </ul>
    ),
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative w-full h-[130px] bg-white">
      <Slider className="w-full h-full" {...carouselSetting}>
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-black font-semibold mt-4">
            {' '}
            새 과목 폴더를 만들어보세요.
          </h2>
          <p className="mt-2 text-black">
            이미 만든 폴더는 수정하거나 삭제할 수 있어요!
          </p>
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-black font-semibold">📁 강의 관리하기</h2>
          <p className="mt-2 text-black">강의 내용을 효과적으로 관리하세요!</p>
        </div>
        <div className="flex flex-col justify-center items-center h-full ">
          <h2 className="text-black font-semibold">🎯 목표 설정</h2>
          <p className="mt-2 text-black">학습 목표를 설정하고 달성해 보세요!</p>
        </div>
      </Slider>
    </div>
  );
};

export default OnBoardingCarousel;
