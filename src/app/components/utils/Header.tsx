import React from "react";
import Icon from "../atoms/Icon";

export default function Header() {
  return (
    <div className="bg-black-90 w-full border-b border-black-80 sticky top-0 z-10">
      <div className="flex justify-end items-center gap-6 p-4">
        <Icon
          label="guide"
          className="w-5 text-white cursor-pointer hover:opacity-80"
        />

        <div className="h-6 w-[1px] bg-black-80"></div>

        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <Icon label="profile" className="w-5 text-white" />
          <p className="text-white text-sm border-b border-transparent hover:border-white transition-all">
            프로필
          </p>
        </div>
      </div>
    </div>
  );
}
