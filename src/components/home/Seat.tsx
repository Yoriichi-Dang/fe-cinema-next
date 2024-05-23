import React from "react";

type SeatProps = {
  id?: string;
  isSelected?: boolean;
  isBuy?: boolean;
  onSelect?: (id: string) => void;
};

export default function Seat({ id, isSelected, isBuy, onSelect }: SeatProps) {
  const handleClick = () => {
    if (id && !isBuy && onSelect) {
      onSelect(id);
      console.log(`${id}`);
    }
    if (isBuy) {
      console.log("Buy");
      console.log(`${id}`);
    }
  };

  return (
    <div onClick={handleClick} className={`flex gap-4 items-center`}>
      <div className="flex flex-col gap-1 ">
        <div
          className={`rounded-md px-3 py-2 ${
            isBuy
              ? "bg-red-500"
              : isSelected
              ? "bg-purple-400 cursor-pointer"
              : "bg-slate-400  cursor-pointer "
          }`}
        >
          {/* {colInGroup * group + colGroup + 1} */}
        </div>
        <div
          className={`rounded-md p-0.5 ${
            isBuy
              ? "bg-red-500"
              : isSelected
              ? "bg-purple-400  cursor-pointer"
              : "bg-slate-400  cursor-pointer"
          }`}
        ></div>
        <div></div>
      </div>
    </div>
  );
}
