import React from "react";
import Image from "next/image";
import { faStar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type CardProps = {
  id: string;
  linkImage: string;
  title: string;
  rating: number;
};

export default function CardMovie({ id, linkImage, title, rating }: CardProps) {
  return (
    <div className="h-full group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow rounded-2xl">
      <Image
        src={linkImage}
        width={500}
        height={500}
        alt={title}
        className="object-cover h-full w-full rounded-2xl group-hover:rotate-3 duration-500 group-hover:scale-125  transition-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[100%] group-hover:translate-y-0 transition-all ease-in-out duration-500">
        <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            icon={faStar}
            className="size-4 text-yellow-300 text-center"
          />
          <p className="text-white text-lg font-semibold">
            {rating}
            <span className="text-sm font-normal">/10</span>
          </p>
        </div>

        {/* <p className="text-lg italic text-white mb-3 group-hover:opacity-100 duration-300 transition-opacity">
                        Phim hay của tháng
                      </p> */}
        <Link
          href={`/movie/${id}`}
          className="rounded-2xl flex items-center justify-center mt-2 bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white hover:bg-white hover:text-darkBlue duration-500 transition-all ease-in-out"
        >
          <FontAwesomeIcon className="mr-2 size-3" icon={faTicket} />
          Buy ticket
        </Link>
      </div>
    </div>
  );
}
