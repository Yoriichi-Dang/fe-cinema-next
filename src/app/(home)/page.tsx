"use client";
import Hero from "@/components/home/Hero";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  faArrowRight,
  faCirclePlay,
  faStar,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardMovie from "@/components/home/CardMovie";

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(true);
  const onPlaying = [
    {
      src: "/assets/movies/movie_1.jpg",
      label: "Hành tinh khỉ",
      description:
        "Some representative placeholder content for the first slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Lật mặt",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Vây hãm",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Third slide label",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Third slide label",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Third slide label",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Second slide label",
      description:
        "Some representative placeholder content for the second slide.",
    },
  ];
  const upComing = [
    {
      src: "/assets/movies/movie_1.jpg",
      label: "Hành tinh khỉ",
      description:
        "Some representative placeholder content for the first slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Lật mặt",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Vây hãm",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Lật mặt",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      src: "/assets/movies/movie_3.jpg",
      label: "Third slide label",
      description:
        "Some representative placeholder content for the third slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Lật mặt",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      src: "/assets/movies/movie_2.jpg",

      label: "Second slide label",
      description:
        "Some representative placeholder content for the second slide.",
    },
  ];
  let slides = [];
  if (isPlaying) slides = [...onPlaying];
  else slides = [...upComing];
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/3">
        <Hero />
        <div className="flex items-center mt-12">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-1 bg-white"></div>
            <p className="text-white text-2xl  font-extrabold">Movie</p>
          </div>
          <div className="flex gap-8 ml-12 mt-2">
            <div
              className="relative group hover:cursor-pointer"
              onClick={() => {
                setIsPlaying(true);
              }}
            >
              <p
                className={`${
                  isPlaying ? "text-white" : "text-slate-400"
                } font-bold text-xl`}
              >
                On Playing
              </p>
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
            </div>
            <div className="relative group hover:cursor-pointer">
              <p
                className={`${
                  isPlaying ? "text-slate-400" : "text-white"
                } font-bold text-xl`}
                onClick={() => {
                  setIsPlaying(false);
                }}
              >
                Up Coming
              </p>
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-14 h-96">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full md:max-w-2xl xl:max-w-4xl "
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem
                  className="basis-1/4 group hover:cursor-pointer "
                  key={index}
                >
                  <CardMovie
                    title={slide.label}
                    linkImage={slide.src}
                    rating={9.4}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
