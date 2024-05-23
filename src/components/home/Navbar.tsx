"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { cookies } from "next/headers";
import { useAppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { sessionToken } = useAppContext();

  const pages = {
    "Movie Rating": "#",
    Playing: "/playing",
    "Up Coming": "/upcoming",
    About: "#",
    Event: "#",
  };
  const renderLinks = (pages: any) => {
    return Object.entries(pages).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <li
            key={key}
            className="text-white text-lg font-bold relative group hover:cursor-pointer"
          >
            <Link href={value}>{key}</Link>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
          </li>
        );
      } else if (typeof value === "object") {
        return (
          <li
            key={key}
            className="text-white text-lg font-bold hover:cursor-pointer"
          >
            {key}
            {/* <ul className="group-hover:flex">{renderLinks(value)}</ul> */}
          </li>
        );
      }
      return null;
    });
  };
  return (
    <nav className="h-20 flex items-center justify-between px-20 py-14 relative z-30 ">
      <Link href="/">
        <Image
          src="/assets/logo/victory_trans.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <ul className="flex gap-10 justify-between items-center">
        {renderLinks(pages)}
      </ul>
      <div className="flex flex-row gap-5">
        {!sessionToken && (
          <>
            <Link
              href="/login"
              className="bg-white flex justify-center items-center  py-2 px-5 rounded-3xl text-xl font-extrabold hover:scale-105 duration-500 transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="border-2 flex justify-center items-center border-solid border-white rounded-3xl hover:scale-105 duration-500 transition-all text-white text-center text-xl font-extrabold  py-2 px-5"
            >
              Sign Up
            </Link>
          </>
        )}
        {sessionToken && (
          <div className="flex gap-3 justify-center items-center p-3 bg-purple-600 cursor-pointer  border-2 border-solid border-purple-600 rounded-3xl hover:bg-transparent duration-300 transition-all ease-in">
            <FontAwesomeIcon icon={faUser} className="text-white size-4" />
            <Link href="/account/1" className="text-white font-bold text-lg">
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
