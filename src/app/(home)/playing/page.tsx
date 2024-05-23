import CardMovie from "@/components/home/CardMovie";
import React from "react";

async function fetchMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Page() {
  const data = await fetchMovies();
  const movies = data.filter((item: any) => item.status == "Playing");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center m-10">
      <div className="w-3/4 flex flex-col min-h-screen ">
        <h1 className="text-white font-extrabold text-2xl">Movie Playing</h1>
        <div className=" grid grid-cols-4 w-full h-full gap-20 mt-10">
          {movies.map((movie: any, index: number) => (
            <CardMovie
              id={movie.id}
              key={index}
              title={movie["title"]}
              linkImage={movie["thumbnail"]}
              rating={movie["average_rating"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
