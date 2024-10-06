import React, { MouseEvent } from "react";

interface IconProps {
  label: string; // 아이콘 이름 (public/ 폴더의 아이콘 파일 이름)
  size?: number; // 아이콘의 크기 (기본값: 24)
  alt?: string; // 접근성을 위한 대체 텍스트 (기본값: label)
  className?: string; // 추가 스타일을 위한 클래스
  invert?: boolean; // 색상 반전 여부
  onClick?: (e: MouseEvent<HTMLImageElement>) => void; // 아이콘 클릭 시 실행될 이벤트 핸들러
}

const Icon: React.FC<IconProps> = ({
  label,
  size,
  alt,
  className = "",
  invert = false,
  onClick,
}) => {
  // 아이콘의 이미지 경로 설정
  const iconPath = `/${label}.svg`;

  // 색상 반전 스타일
  const invertStyle = invert ? "invert" : "";

  return (
    <img
      src={iconPath}
      alt={alt || label}
      width={size}
      height={size}
      className={`${className} ${invertStyle} cursor-pointer`} // 색상 반전과 클래스 적용
      onClick={(e) => {
        if (onClick) onClick(e); // onClick 이벤트 핸들러가 있는 경우 실행
      }}
    />
  );
};

export default Icon;
