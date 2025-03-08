import React, { useEffect, useRef, useState } from "react";
import Button from "@/app/components/atoms/Button";
import CountInput from "@/app/components/atoms/CountInput";
import Popover from "@/app/components/molecules/PopOver";
import { usePracticeContext } from "@/app/context/PracticeContext";

const NewPracticeForm: React.FC = () => {
  const { practiceSize, setPracticeSize, type, setType } = usePracticeContext();
  const [countOption, setCountOption] = useState<"AI" | "manual">("AI");

  const [showPopover, setShowPopover] = useState<"OX" | "SHORT" | null>(null);
  const oxRef = useRef<HTMLDivElement>(null); // OX 버튼에 대한 ref
  const shortRef = useRef<HTMLDivElement>(null); // 단답형 버튼에 대한 ref

  const [oxPopoverPosition, setOXPopoverPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: "0px",
    left: "0px",
  });
  const [shortPopoverPosition, setShortPopoverPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: "0px",
    left: "0px",
  });

  useEffect(() => {
    if (oxRef.current) {
      const rect = oxRef.current.getBoundingClientRect();
      setOXPopoverPosition({
        top: `${rect.bottom + window.scrollY + 15}px`,
        left: `${rect.left + window.scrollX}`,
      });
    }
    if (shortRef.current) {
      const rect = shortRef.current.getBoundingClientRect();
      setShortPopoverPosition({
        top: `${rect.bottom + window.scrollY + 15}px`,
        left: `${rect.left + window.scrollX}`,
      });
    }
  }, [oxRef, shortRef]);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setPracticeSize(isNaN(newSize) ? 0 : newSize);
  };

  const toggleType = (selectedType: "OX" | "SHORT") => {
    if (type === "") {
      setType(selectedType);
    } else if (type === "OX" && selectedType === "OX") {
      setType("");
    } else if (type === "SHORT" && selectedType === "SHORT") {
      setType("");
    } else if (type === "OX" && selectedType === "SHORT") {
      setType("BOTH");
    } else if (type === "SHORT" && selectedType === "OX") {
      setType("BOTH");
    } else if (type === "BOTH" && selectedType === "OX") {
      setType("SHORT");
    } else if (type === "BOTH" && selectedType === "SHORT") {
      setType("OX");
    }
  };

  return (
    <div className="flex flex-col justify-start h-full">
      <div className="flex flex-row gap-4 mb-8">
        <span className="text-white flex flex-col justify-start items-start mt-2">
          문제 개수
        </span>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-row items-center gap-4">
            <Button
              label="AI 추천"
              variant="select"
              isSelected={countOption === "AI"}
              onClick={() => {
                setCountOption("AI");
                setPracticeSize(0);
              }}
            />
            <p className="text-white">복습에 필요한 진짜 문제를 제공해드려요</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              label="직접 입력"
              variant="select"
              isSelected={countOption === "manual"}
              onClick={() => setCountOption("manual")}
            />

            {countOption === "manual" && (
              <CountInput
                name="count"
                defaultValue={
                  practiceSize !== null ? practiceSize.toString() : ""
                }
                onChange={handleCountChange}
                placeholder="0"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-white">문제 유형</span>
        <div
          ref={oxRef}
          onMouseEnter={() => setShowPopover("OX")}
          onMouseLeave={() => setShowPopover(null)}
        >
          <Button
            label="O X 퀴즈"
            variant="select"
            isSelected={type === "OX" || type === "BOTH"}
            onClick={() => toggleType("OX")}
          />
          {showPopover === "OX" && (
            <Popover type="OX" position={oxPopoverPosition} />
          )}
        </div>
        <div
          ref={shortRef}
          onMouseEnter={() => setShowPopover("SHORT")}
          onMouseLeave={() => setShowPopover(null)}
        >
          <Button
            label="단답형"
            variant="select"
            isSelected={type === "SHORT" || type === "BOTH"}
            onClick={() => toggleType("SHORT")}
          />
          {showPopover === "SHORT" && (
            <Popover type="단답형" position={shortPopoverPosition} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPracticeForm;
