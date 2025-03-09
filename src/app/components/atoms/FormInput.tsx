import React from "react";

interface FormInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  variant?: "round" | "square";
  labelClassName?: string;
  disabled?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  defaultValue = "",
  placeholder = "",
  onChange,
  label,
  variant = "square",
  labelClassName = "",
  disabled = false,
  className = "",
}) => {
  const inputClassName =
    variant === "round"
      ? "bg-black-90 text-white rounded-full outline-none px-4 py-2"
      : "bg-black-80 text-white rounded-md outline-none px-4 py-2";

  return (
    <div className="flex flex-row w-full">
      {label && (
        <label className={`text-white text-base text-start ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${inputClassName} ${className} ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      />
    </div>
  );
};
