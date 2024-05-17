"use client";
import React from "react";

type ShowTimeProps = {
  id: number;
  date: string;
  title: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export default function ShowTime({
  id,
  date,
  title,
  isSelected,
  onSelect,
}: ShowTimeProps) {
  const handleClick = () => {
    onSelect(id);
    console.log(`Title: ${title}, Date: ${date}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center px-3 py-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl ${
        isSelected ? "bg-purple-500" : "bg-slate-800"
      }`}
    >
      <p className="text-white text-lg">{title}</p>
      <p className="text-white text-md">{date}</p>
    </div>
  );
}
