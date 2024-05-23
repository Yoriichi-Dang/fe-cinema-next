import React, { useEffect, useState } from "react";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/home/Button";
import Link from "next/link";

export default function Hero() {
  const [movie, setMovie] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies/all/`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        } else {
          return await res.json();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const loadMovie = async () => {
      const data = await fetchData();
      if (data) {
        // setMovie(
        //   data
        //   .filter((item: any) => item.status == "Outdated")
        //   .sort((a: any, b: any) => b.average_rating - a.average_rating)[0]
        // );
        setMovie(
          data.sort((a: any, b: any) => b.average_rating - a.average_rating)[0]
        );
      }
    };
    loadMovie();
  }, []);

  return (
    <div className="flex justify-between items-start mt-10">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-5">
          {movie.category && (
            <p className="bg-orange-400 px-3 py-2 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105">
              {movie.category}
            </p>
          )}
        </div>
        <p className="text-white font-extrabold text-5xl">{movie?.title}</p>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="size-6 text-yellow-300 text-center"
            />
            <p className="text-white text-lg font-semibold">
              {movie?.average_rating}
              <span className="text-sm font-normal">/10</span>
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="text-white flex gap-1">
              <p>Run Time:</p>
              <span>{movie?.duration}ph</span>
            </div>
            <div className="text-white flex gap-1">
              <p>Nation:</p>
              <span>{movie?.nation}</span>
            </div>
          </div>
        </div>
        <Link
          href={`/movie/${movie?.id}`}
          className="p-3 bg-purple-400 rounded-2xl text-white font-bold text-center w-32 hover:scale-105 duration-300 transition-all ease-in border-2 border-solid border-white"
        >
          Read More
        </Link>
      </div>

      <div className="ml-20 shadow-2xl hover:scale-105 duration-500 transition-all hover:cursor-pointer">
        <Image
          src={movie?.thumbnail}
          width={250}
          height={250}
          className="rounded-2xl min-h-full w-full object-cover"
          alt="movies"
        />
      </div>
    </div>
  );
}
