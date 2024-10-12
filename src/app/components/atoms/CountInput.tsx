import React from "react";
import { FormInput } from "../atoms/FormInput"; // 경로에 따라 수정하세요.

interface CountInputProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; // disabled prop 추가
}

const CountInput: React.FC<CountInputProps> = ({
  name,
  defaultValue = "",
  placeholder = "",
  onChange,
  disabled = false, // 기본값은 false
}) => {
  return (
    <div className="flex flex-row items-center pl-5">
      {/* FormInput을 활용하여 숫자 입력 */}
      <FormInput
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        variant="square" // 필요한 경우 "round"로 변경 가능
        labelClassName="mr-2" // 라벨 스타일 커스텀 (필요 시)
        disabled={disabled} // disabled prop 전달
      />
      {/* "개" 단위 표시 */}
      <p className="pl-2 text-white">개</p>
    </div>
  );
};

export default CountInput;
