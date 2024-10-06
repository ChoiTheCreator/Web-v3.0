import React from "react";

interface PopoverProps {
  type: "OX" | "단답형";
  position: { top: string; left: string };
}

const Popover: React.FC<PopoverProps> = ({ type, position }) => (
  <div
    className="absolute bg-[#343434] text-white w-[380px] p-4 rounded-lg shadow-lg"
    style={{ top: position.top, left: position.left }}
  >
    {type === "OX" ? (
      <>
        <p className="text-left text-sm">문제 예시</p>
        <p className="text-[20px] font-bold my-2 text-center">수요 곡선은 일반적으로 우하향한다.</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="px-4 py-2 rounded-md text-[18px] bg-black text-white flex justify-center items-center">O</div>
          <div className="px-4 py-2 rounded-md text-[18px] bg-black text-white flex justify-center items-center">X</div>
        </div>
      </>
    ) : (
      <>
        <p className="text-left text-sm">문제 예시</p>
        <p className="text-[20px] font-bold my-2 text-center">컴퓨터의 주기억장치는?</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="px-4 py-2 rounded-md text-[18px] bg-black text-white flex justify-center items-center">RAM</div>
        </div>
      </>
    )}
  </div>
);

export default Popover;
