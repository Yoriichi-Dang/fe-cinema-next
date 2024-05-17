import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  faGoogle,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-darkPurple h-80 flex justify-center items-center">
      <div className=" w-2/3 h-full">
        <div className="flex flex-col">
          <div className="flex items-start justify-between mt-10">
            <Link href="/rating" className="text-white">
              Movie Rating
            </Link>
            <div>
              <p className="text-white mb-4">Movie</p>
              <ul>
                <li className="text-slate-500">
                  <Link href="/movie/playing">Playing</Link>
                </li>
                <li className="text-slate-500">
                  <Link href="/movie/playing">Up Coming</Link>
                </li>
              </ul>
            </div>
            <Link href="/about" className="text-white">
              About
            </Link>
            <div>
              <p className="text-white mb-4">Event</p>
              <ul>
                <li className="text-slate-500">
                  <Link href="/event/preferential">Preferential</Link>
                </li>
                <li className="text-slate-500">
                  <Link href="/event/bestMovie">Best Movie Month</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-start items-center">
              <Image
                src="/assets/logo/victory_trans.png"
                width={100}
                height={100}
                alt="logo"
              />
              <div className="flex gap-2 mt-6">
                <FontAwesomeIcon
                  className="size-8 text-white cursor-pointer"
                  icon={faGoogle}
                />
                <FontAwesomeIcon
                  className="size-8 text-white cursor-pointer"
                  icon={faFacebook}
                />
                <FontAwesomeIcon
                  className="size-8 text-white cursor-pointer"
                  icon={faYoutube}
                />
              </div>
            </div>
          </div>
          <div className="h-0.5 min-w-full bg-white mt-10"></div>
          <div className="flex justify-start items-center mt-4">
            <Image
              className="object-contain"
              src="/assets/logo/victory_trans.png"
              width={100}
              height={100}
              alt="logo"
            />
            <div className="flex flex-col ml-4">
              <p className="font-bold text-xl text-white">Victory Cinema</p>
              <div className="flex gap-4">
                <div className="flex gap-1 justify-center items-center text-slate-400 text-xs">
                  <FontAwesomeIcon className="size-4" icon={faPhone} />
                  <p>0941295687</p>
                </div>
                <div className="flex gap-1 justify-center items-center text-slate-400 text-xs">
                  <FontAwesomeIcon className="size-4" icon={faEnvelope} />
                  <p>hoangnguyen241003@gmail.com</p>
                </div>
                <div className="flex gap-1 justify-center items-center text-slate-400 text-xs">
                  <FontAwesomeIcon className="size-4" icon={faLocationDot} />
                  <p>198 Nguyễn Lương Bằng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
