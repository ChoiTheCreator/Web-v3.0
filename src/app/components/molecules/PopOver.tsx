import React from "react";

interface PopoverProps {
  type: "OX" | "단답형";
  position: { top: string; left: string };
}

const Popover: React.FC<PopoverProps> = ({ type, position }) => (
  <div
    className="absolute text-white z-50"
    style={{
      top: position.top,
      left: position.left,
      transform: "translate(0%, 0)",
    }}
  >
    <p className="py-2 text-black-70">* 문제 예시</p>
    <div className="bg-black-80 w-[300px] p-4 rounded-lg shadow-lg">
      {type === "OX" ? (
        <>
          <p className="text-base font-semibold text-white">
            Q. 수요 곡선은 일반적으로 우하향한다.
          </p>
          <div className="flex justify-end gap-4 mt-2">
            <div className=" text-white">A : O</div>
          </div>
        </>
      ) : (
        <>
          <p className="text-base text-white font-semibold">
            Q. 컴퓨터의 주기억장치는?
          </p>
          <div className="flex justify-end gap-4 mt-2">
            <div className=" rounded-md text-white">A : RAM</div>
          </div>
        </>
      )}
    </div>
  </div>
);

export default Popover;
