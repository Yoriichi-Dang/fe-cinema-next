import React from "react";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export default function Button({
  type,
  title,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} group flex gap-2 rounded-3xl px-6 py-2 items-center justify-center border-solid border-2 border-white transition-all duration-300 ease-in-out hover:cursor-pointer  hover:scale-105`}
    >
      {children}
      <label className="font-bold xl:text-lg text-md group-hover:cursor-pointer">
        {title}
      </label>
    </button>
  );
}
