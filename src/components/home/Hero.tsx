"use client";
import React from "react";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/home/Button";

export default function Hero() {
  const posterGenreMovie = ["Action", "Criminal", "Comedy"];
  return (
    <div className="flex justify-between items-center mt-10">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-5">
          {posterGenreMovie.map((movie, index) => (
            <p
              key={index}
              className={`${
                index % 3 == 0
                  ? "bg-orange-500"
                  : index % 3 == 1
                  ? "bg-sky-500"
                  : "bg-green-500"
              } px-3 py-2  text-white text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 `}
            >
              {movie}
            </p>
          ))}
        </div>
        <p className="text-white font-extrabold text-5xl">
          Vây hãm kẻ trừng phạt
        </p>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="size-6 text-yellow-300 text-center"
            />
            <p className="text-white text-lg font-semibold">
              7.4<span className="text-sm font-normal">/10</span>
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="text-white flex gap-1">
              <p>Run Time:</p>
              <span>130ph</span>
            </div>
            <div className="text-white flex gap-1">
              <p>Nation:</p>
              <span>Korea</span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          title="Read More"
          className="bg-purple-600 w-1/3 text-white "
        />
      </div>

      <div
        className="ml-20 shadow-2xl hover:scale-105 duration-500 transition-all hover:cursor-pointer"
        onClick={() => alert("hello")}
      >
        <Image
          src="/assets/movies/movie_3.jpg"
          width={250}
          height={250}
          className="rounded-2xl min-h-full w-full object-cover"
          alt="movies"
        />
      </div>
    </div>
  );
}
