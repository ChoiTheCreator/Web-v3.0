import React, { useState } from "react";

export default function ToggleSelect({
  onClick,
  isSelected,
  items,
}: {
  onClick: (selectedItem: string) => void;
  isSelected: boolean;
  items: string[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(isSelected ? 1 : 0);

  const handleClick = (index: number, item: string) => {
    setSelectedIndex(index);
    onClick(item);
  };

  return (
    <div className="relative flex bg-black-80 whitespace-nowrap rounded-full text-white font-semibold h-fit py-0.5 px-0.5">
      <div
        className="absolute left-0 top-0 h-full w-1/2 bg-primary rounded-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      ></div>

      {items.map((item, index) => (
        <button
          key={index}
          className={`relative z-10 flex-1 text-base px-5 pl-7 py-1.5 rounded-full transition-all duration-300`}
          onClick={() => handleClick(index, item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
