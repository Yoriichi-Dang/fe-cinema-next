import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const pages = {
    "Movie Rating": "/rating",
    Movie: "/movie",
    About: "/about",
    Event: "/event",
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
        <Link href="/login">
          <Button
            type="button"
            className="bg-white text-darkBlue"
            title="Login"
          />
        </Link>
        <Link href="/signup">
          <Button className="text-white" type="button" title="Sign Up" />
        </Link>
      </div>
    </nav>
  );
}
