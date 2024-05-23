import React from "react";
import Image from "next/image";
import Link from "next/link";

type TransactionCardProps = {
  id: string;
  linkImage: string;
  title: string;
  description: string;
  branch?: string;
  room?: string;
  time: string;
  date: string;
  age?: number;
};

export default function TransactionCard({
  id,
  linkImage,
  title,
  description,
  branch,
  room,
  time,
  date,
  age,
}: TransactionCardProps) {
  return (
    <div className="w-full h-26 bg-black rounded-xl flex items-center hover:scale-105 duration-500 transition-all ease-in-out">
      <div className="p-4 w-full flex justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-26">
            <Image
              src={linkImage}
              alt="ticket"
              width={60}
              height={60}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-md font-extrabold">{title}</h1>
            <div className="flex justify-start items-center gap-3 mt-3">
              <p className="text-slate-300">{description}</p>
              {age && (
                <div className="py-1 px-3 rounded-lg bg-purple-500">{age}+</div>
              )}
            </div>
          </div>
        </div>

        <div>
          {room && (
            <h1 className="text-lg font-extrabold text-white">Room {room}</h1>
          )}
          <div className="flex  items-center gap-4">
            <p className="text-white font-bold text-md">{time}</p>
            <p className="text-white font-bold text-md">-</p>
            <p className="text-white font-bold text-md">{date}</p>
          </div>
        </div>
        <Link
          className="text-purple-400 text-lg font-semibold mr-6"
          href={`/account/transaction/detail/${id}`}
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
