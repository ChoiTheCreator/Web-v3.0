import React from 'react';
import Image from 'next/image';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  imgSrc?: string;
  imgAlt?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'select' | 'next' | 'create' | 'cancel' | 'save';
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = '',
  disabled = false,
  imgSrc,
  imgAlt = 'icon',
  isSelected = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type = 'button',
  variant = 'create',
  iconPosition = 'right',
  className = '',
}) => {
  const getButtonStyles = () => {
    let base = '';

    switch (variant) {
      case 'select':
        base = `rounded-full w-full transition-all duration-300 ease-in-out transform ${
          isSelected ? 'bg-primary shadow-lg' : 'bg-black-80 opacity-80'
        }`;
        break;
      case 'next':
        base = `rounded-full border-black-70 border hover:bg-black-80 transition-all duration-300 ease-in-out`;
        break;
      case 'create':
        base = `bg-black-70 rounded-full border border-black-60 hover:bg-black-80 transition-all duration-300`;
        break;
      case 'cancel':
        base = `bg-[#3F3F3F] rounded-[10px] border border-[#565656] hover:bg-[#222222] transition-all duration-300`;
        break;
      case 'save':
        base = `bg-mainGreen rounded-[10px] border border-[#4CE5A9] hover:bg-[#00A264] transition-all duration-300`;
        break;
      default:
        base = '';
    }

    if (disabled) {
      base +=
        ' opacity-40 grayscale brightness-75 cursor-not-allowed pointer-events-none';
    }

    return base;
  };

  return (
    <button
      type={type}
      className={`flex px-8 items-center font-semibold justify-center gap-2 pt-2 pb-1.5 flex-row text-white whitespace-nowrap align-middle ${getButtonStyles()} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {imgSrc && iconPosition === 'left' && (
        <Image src={`/${imgSrc}.svg`} alt={imgAlt} width={16} height={16} />
      )}

      <p className="font-Pretendard rounded-full flex flex-col text-center text-base align-middle items-center">
        {label}
      </p>

      {imgSrc && iconPosition === 'right' && (
        <Image src={`/${imgSrc}.svg`} alt={imgAlt} width={10} height={10} />
      )}
    </button>
  );
};

export default Button;
