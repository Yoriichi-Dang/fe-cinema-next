"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import {
  faFilm,
  faList,
  faDoorOpen,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import ItemSidebar from "@/components/admin/ItemSidebar";
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="min-h-screen w-full bg-darkBlueGray-200 select-none ">
      <div className="grid grid-cols-6 gap-10">
        <div className="col-span-1 rounded-r-2xl min-h-screen bg-darkBlueGray-100">
          <div className="flex flex-col items-start justify-evenly">
            <div className="w-full flex items-center justify-center">
              <Link href="/" className="mt-10">
                <Image
                  src="/assets/logo/victory_trans.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            <div className="flex flex-col w-full justify-center mt-14 gap-4">
              <ItemSidebar
                link="/admin/movie"
                title="Movie"
                isActive={activeIndex == 0}
                onShow={() => setActiveIndex(0)}
              >
                <FontAwesomeIcon className=" size-4 " icon={faFilm} />
              </ItemSidebar>
              <ItemSidebar
                link="/admin/genre"
                title="Genre Movie"
                isActive={activeIndex == 1}
                onShow={() => setActiveIndex(1)}
              >
                <FontAwesomeIcon className=" size-4" icon={faList} />
              </ItemSidebar>
              <ItemSidebar
                link="/admin/room"
                title="Room"
                isActive={activeIndex == 2}
                onShow={() => setActiveIndex(2)}
              >
                <FontAwesomeIcon className=" size-4" icon={faDoorOpen} />
              </ItemSidebar>
              <ItemSidebar
                link="/admin/schedules"
                title="Show Times"
                isActive={activeIndex == 3}
                onShow={() => setActiveIndex(3)}
              >
                <FontAwesomeIcon className=" size-4" icon={faTicket} />
              </ItemSidebar>
            </div>
          </div>
        </div>
        <div className="col-span-5 p-6">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
              <p className="text-slate-400">Manage Cinema Page</p>
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
