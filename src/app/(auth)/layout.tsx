"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [width, height] = useWindowSize();
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  useEffect(() => {
    setIsMediumScreen(width < 800); // Breakpoint for 'md' screen size
    console.log(width);
  }, [width]);
  return (
    <main className="min-h-screen w-full bg-dark select-none flex justify-center items-center">
      <div className="flex justify-between w-3/5 rounded-2xl shadow-2xl  bg-darkBlue">
        <div
          className={`${
            isMediumScreen ? "w-full  rounded-2xl" : "w-4/5 "
          } rounded-l-2xl bg-white flex flex-col items-center justify-center `}
        >
          {children}
        </div>
        <div className={`${isMediumScreen ? "hidden" : "w-3/5"}`}>
          <div>
            <Image
              src="/assets/images/image_1.jpg"
              className="rounded-r-2xl min-h-full w-full object-cover"
              width="500"
              height="500"
              alt="logo"
            ></Image>
          </div>
        </div>
      </div>
    </main>
  );
}
