"use client";

import React, { useState } from 'react';
import Button from '@/app/components/atoms/Button';
import CheckCircle from '@/app/components/atoms/CheckCircle';
import FormInput from '@/app/components/atoms/FormInput';
import FileUpload from '@/app/components/atoms/FileUpload';
import { request } from 'http';
import Icon from '@/app/components/atoms/Icon';
import TabComponent from '@/app/components/atoms/Tab';

const Page = ({ onClose }: { onClose: () => void }) => {
  // SelectButton의 상태관리 (여기서 두 개의 `SelectButton` 상태를 관리
  const [isSelected, setIsSelected] = useState([false, false]);

  // CheckCircle의 상태관리 (여기서 두 개의 `CheckCircle` 상태를 관리)
  const [checkedStates, setCheckedStates] = useState([false, false]);

  // FormInput 상태 관리
  const [formInputValue, setFormInputValue] = useState("");

  // 부모 컴포넌트에서 상태 관리
  const [noteName, setNoteName] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [keywords, setKeywords] = useState("");
  const [requirement, setRequirement] = useState("");

  // 키워드 입력값 변경 핸들러
  const handleKeywordChange = (value: string) => {
    setKeywords(value);
  };

  // 요구사항 입력값 변경 핸들러
  const handleRequirementChange = (value: string) => {
    setRequirement(value);
  };

  const [responseData, setResponseData] = useState<string | null>(null); // 응답 데이터 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태


  // 업로드 성공 시 콜백
  const handleUploadSuccess = (response: any) => {
    setResponseData(response);
    setError(null); // 에러 초기화
  };

  // 업로드 실패 시 콜백
  const handleUploadError = (err: any) => {
    setResponseData(null);
    setError("업로드 중 오류가 발생했습니다.");
    console.error("Upload Error:", err);
  };
  //Button의 상태관리
  const handleSelectClick = (index: number) => {
    setIsSelected((prevState) =>
      prevState.map((selected, i) => (i === index ? !selected : selected))
    );
  };


  //CheckCircle의 상태관리  
  const handleCheckCircleClick = (index: number) => {
    setCheckedStates((prevState) =>
      prevState.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  // FormInput onChange 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputValue(event.target.value);
    };

    // // 파일이 선택되었을 때 처리
    // const handleFileSelect = (file: File | null) => {
    //   setSelectedFile(file);
    // };
  
  return (
    <>
    <h1>Button</h1>
      {/* SelectButton - 선택 여부에 따라 스타일 변경 */}
      <Button
        label="Button 1"
        variant="select"
        isSelected={isSelected[0]}
        onClick={() => handleSelectClick(0)}
      />
      <Button
        label="Button 2"
        variant="select"
        isSelected={isSelected[1]}
        onClick={() => handleSelectClick(1)}
      />

      {/* NextButton */}
      <Button
        label="복습 문제 생성"
        variant="next"
        imgSrc="arrow_next"
      />

      {/* CreateButton */}
      <Button
        label="새로 만들기"
        variant="create"
      />

      {/* Cancel Button */}
      <Button
        label="취소"
        variant="cancel"
        onClick={onClose}
      />

      {/* Save Button */}
      <Button
        label="저장"
        variant="save"
        type="submit"
      />

    <h1>CheckedCircle</h1>
    {checkedStates.map((isChecked, index) => (
        <CheckCircle
          key={index}
          isChecked={isChecked}
          onChange={() => handleCheckCircleClick(index)}
          size={40} // 필요에 따라 크기를 조절할 수 있습니다
        />
      ))}

    <h1>Form</h1>
    <FormInput
        name="noteName"
        defaultValue="기본 노트 이름" // 입력 필드의 초기값만 설정
        placeholder="노트 이름을 입력하세요"
        onChange={handleInputChange}
        label="노트 이름"
        variant="round" // 스타일: "square" 또는 "round"
        labelClassName="mr-10"
      />
    <FormInput
        name="noteName"
        defaultValue="기본 노트 이름" // 입력 필드의 초기값만 설정
        placeholder="노트 이름을 입력하세요"
        onChange={handleInputChange}
        label="노트 이름"
        variant="round" // 스타일: "square" 또는 "round"
        labelClassName="mr-10"
      />

      <h1>Form Example</h1>
      
      {/* FileUpload 컴포넌트 사용 */}
      <FileUpload
        request={{ keywords, requirement }} // 추가 데이터 전달
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        label="파일 업로드"
        description="드래그하거나 클릭하여 파일을 업로드하세요."
      />

      <TabComponent
        onKeywordChange={handleKeywordChange}
        onRequirementChange={handleRequirementChange}
      />

      {/* 업로드 성공 시 응답 데이터 표시 */}
      {responseData && (
        <div className="mt-4 p-4 bg-gray-700 text-white rounded">
          <h2>서버 응답</h2>
          <div className="overflow-auto h-9"> {/* 추가된 div로 텍스트가 삐져나오지 않도록 함 */}
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        </div>
      )}


      {/* 업로드 실패 시 에러 메시지 표시 */}
      <h1>Icon Component</h1>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <Icon label="ic_side_all" />
      <Icon label="ic_side_home" />
      <Icon label="ic_side_folder" />
      <Icon label="guide" />
      <Icon label="kebab-menu" invert={true}/>
      <Icon label="kebab-menu" invert={false}/>
      <Icon label="delete-icon" />


    </>
  );
};

export default Page;
