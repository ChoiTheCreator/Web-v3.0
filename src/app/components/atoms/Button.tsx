import React from "react";
import Image from "next/image";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  imgSrc?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "select" | "next" | "create" | "cancel" | "save";
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  label = "",
  disabled = false,
  imgSrc,
  imgAlt = "icon",
  isSelected = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type = "button",
  variant = "create",
  iconPosition = "right",
  iconPosition = "right",
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "select":
        return `rounded-full ${isSelected ? "bg-primary" : "bg-black-70"}`;
      case "next":
      case "create":
        return `bg-black-70 rounded-full border border-black-60 hover:bg-black-80`;
      case "cancel":
        return `bg-[#3F3F3F] rounded-[10px] border border-[#565656] hover:bg-[#222222]`;
      case "save":
        return `bg-mainGreen rounded-[10px] border border-[#4CE5A9] hover:bg-[#00A264]`;
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      className={`flex items-center justify-center py-1.5 px-4 text-white whitespace-nowrap ${getButtonStyles()}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {imgSrc && iconPosition === "left" && (
        <Image src={`/${imgSrc}.svg`} alt={imgAlt} width={16} height={16} />
      )}

      <p className="font-Pretendard rounded-full font-normal text-center text-base">
        {label}
      </p>

      {imgSrc && iconPosition === "right" && (
        <Image src={`/${imgSrc}.svg`} alt={imgAlt} width={16} height={16} />
      )}
    </button>
  );
};

export default Button;
