import React from "react";

interface FormInputProps {
  name: string;
  defaultValue?: string; // 초기값 설정
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: "round" | "square"; // round 또는 square로 className 지정
  labelClassName?: string; // 라벨 커스텀 스타일
}
export const FormInput: React.FC<FormInputProps> = ({
  name,
  defaultValue = "",
  placeholder = "",
  onChange,
  label,
  variant = "square", // 기본적으로 "square" 설정
  labelClassName = "",
}) => {
  // `variant`에 따른 클래스명 분리
  const inputClassName =
    variant === "round"
      ? "bg-[#252424] text-white rounded-full outline-none px-4 py-2"
      : "bg-[#252424] text-white rounded-md outline-none px-4 py-2";

  return (
    <div className="flex flex-row place-items-center">
      {label && (
        <label className={` text-mainWhite text-base text-start ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue} // 초기값은 defaultValue로 지정
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
};

