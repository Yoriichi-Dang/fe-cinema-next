import React from "react";
import Link from "next/link";

type ItemSidebarProps = {
  children: React.ReactNode;
  title: string;
  link: string;
  isActive?: boolean;
  onShow?: () => void;
};

export default function ItemSidebar({
  children,
  title,
  link,
  isActive,
  onShow,
}: ItemSidebarProps) {
  return (
    <Link
      href={link}
      className={`py-4 px-4 w-full flex items-center justify-between gap-4 cursor-pointer ${
        isActive
          ? " border-l-4 border-purple-500 text-white"
          : " text-slate-400"
      }`}
      onClick={onShow}
    >
      {children}
      <div className="w-full flex justify-start items-center">
        <p className={`text-lg font-bold `}>{title}</p>
      </div>
    </Link>
  );
}
