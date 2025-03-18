import React from "react";
import { FormInput } from "../atoms/FormInput";

interface CountInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const CountInput: React.FC<CountInputProps> = ({
  name,
  defaultValue = "",
  placeholder = "",
  onChange,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 20) {
      alert("20개 이하로 입력해 주세요.");
      return;
    }
    onChange(event);
  };

  return (
    <div className="flex flex-row items-center pl-5">
      <FormInput
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
        variant="square"
        labelClassName="mr-2"
        disabled={disabled}
      />
      <p className="pl-2 text-white">개</p>
    </div>
  );
};

export default CountInput;
