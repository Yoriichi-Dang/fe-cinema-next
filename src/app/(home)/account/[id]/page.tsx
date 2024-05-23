"use client";
import Profile from "@/components/home/account/Profile";
import Transactions from "@/components/home/account/Transactions";
import React, { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="w-full bg-black p-4 rounded-xl gap-10 flex items-center justify-start mb-4 md:mt-4 xl:mt-0">
        <div
          className="flex flex-col gap-2 items-center ml-4 cursor-pointer"
          onClick={() => setActiveIndex(0)}
        >
          <div className="text-purple-400 text-lg font-bold  hover:text-white duration-300 transition-all ">
            Profile
          </div>
          <div
            className={`w-full  bg-purple-600 text-center ${
              activeIndex == 0 && "h-[2px]"
            }`}
          ></div>
        </div>
        <div
          className="flex flex-col gap-2 items-center cursor-pointer"
          onClick={() => setActiveIndex(1)}
        >
          <div className="text-purple-400 text-lg font-bold  hover:text-white duration-300 transition-all ">
            History Payments
          </div>
          <div
            className={`w-full  bg-purple-600 text-center ${
              activeIndex == 1 && "h-[2px]"
            }`}
          ></div>
        </div>
        <div
          className="flex flex-col gap-2 items-center cursor-pointer"
          onClick={() => setActiveIndex(2)}
        >
          <div className="text-purple-400 text-lg font-bold  hover:text-white duration-300 transition-all  ">
            Change Password
          </div>
          <div
            className={`w-full  bg-purple-600 text-center 
          ${activeIndex == 2 && "h-[2px]"}
          `}
          ></div>
        </div>
      </div>
      {activeIndex === 0 && <Profile isActive={true} />}
      {activeIndex === 1 && <Transactions isActive={true} />}
    </>
  );
}
