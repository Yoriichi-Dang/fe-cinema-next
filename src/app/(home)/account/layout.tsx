"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  console.log(pathName.split("/")[2]);
  return (
    <div className="grid-cols-1 md:grid-cols-4 lg:grid-cols-3 my-10 mx-auto  lg:max-w-7xl md:py-10 py-5 md:gap-[30px] xl:gap-16 px-4 md:px-[45px] xl:px-0 xl:grid">
      <div className="h-72 bg-black md:col-span-2 lg:col-span-1 rounded-2xl shadow-2xl  hover:scale-105 duration-700 transition-all ease-in-out">
        <div className="p-6">
          <div className="flex flex-wrap gap-10">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <Image
                src="/assets/avatar/avatar.png"
                alt="avatar"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-base xl:text-lg text-white font-bold mb-3">
                Đặng Hoàng Nguyên
              </p>
              <div className="flex gap-1 items-center justify-start">
                <FontAwesomeIcon
                  className="size-4 text-red-400"
                  icon={faGift}
                />
                <p className=" ml-2 text-slate-400 font-semibold">100</p>
                <p className="text-slate-400 font-semibold">Points</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-600 my-10"></div>
          <div className="flex gap-4">
            <p className="font-extrabold text-xl text-white">Total Payments:</p>
            <p className="font-extrabold text-xl text-white">
              <span className="text-white mr-2 bg-purple-500 p-2 rounded-xl">
                100.000
              </span>
              VND
            </p>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-2 col-span-2  rounded-2xl shadow-2xl flex flex-col">
        {children}
      </div>
    </div>
  );
}
