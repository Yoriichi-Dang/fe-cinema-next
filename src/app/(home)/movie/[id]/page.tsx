"use client";
import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/home/Button";
import { faPlay, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowTime from "@/components/home/ShowTime";
import { Dialog, Transition } from "@headlessui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTicket } from "@/Context/TicketAppContext";
const getDayOnWeek = (date: Date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();
  return {
    dayOfWeek,
    date: `${year}-${month}-${day}`,
  };
};
const getCurrentDayAndDate = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = today.getFullYear();

  return {
    dayOfWeek,
    date: `${year}-${month}-${day}`,
  };
};
const add_day = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
const format_date = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export default function Page({ params }: { params: { id: string } }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { ticket, setTicket } = useTicket();
  const [movie, setMovie] = useState<any>();
  const { date: currentDate } = getCurrentDayAndDate();
  const [showTime, setShowTime] = useState([]);
  const [showTimeDate, setShowTimeDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const show_times = [];
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      show_times.push({
        date: format_date(add_day(new Date(currentDate), i)),
        dayOfWeek: "Today",
      });
    } else {
      show_times.push({
        date: format_date(add_day(new Date(currentDate), i)),
        dayOfWeek: daysOfWeek[add_day(new Date(currentDate), i).getDay()],
      });
    }
  }
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies/${params.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setMovie(data);
        } else {
          throw Error("Failed fetch movie");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [params.id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/showtimes.json");
        if (res.ok) {
          const data = await res.json();
          setShowTime(data);
          setSelectedDate(format_date(new Date()));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newShowTime = showTime.filter(
      (item: any) => item.date == selectedDate
    );
    setShowTimeDate(newShowTime);
  }, [showTime, selectedDate]);

  const handleSelect = (date: string) => {
    setSelectedDate(date);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10">
      <div className="flex w-3/4 min-h-screen">
        {movie && (
          <div className="flex w-full h-full">
            <div className="w-1/4 h-full flex flex-col items-center gap-4 ">
              <Image
                src={movie.thumbnail}
                alt="movie"
                width={270}
                height={270}
                className="object-cover rounded-3xl hover:scale-105 transition-all duration-500"
              />
              <Button
                type="button"
                title="Watch Trailer"
                className="bg-transparent text-white hover:bg-white hover:text-darkBlue"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <FontAwesomeIcon className="size-5" icon={faPlay} />
              </Button>
            </div>
            <div className="w-3/4 h-full flex flex-col ml-10">
              <div className="flex text-white justify-start items-center gap-10">
                <h1 className="font-extrabold text-2xl">{movie.title}</h1>
                <div className="border-2 border-solid rounded-xl px-4">
                  {movie.age && (
                    <h3 className="italic font-bold text-lg">{movie.age}+</h3>
                  )}
                </div>
              </div>
              <div className="w-full h-0.5 bg-slate-400 mt-4"></div>
              <div className="flex my-4 gap-6">
                <div className="flex items-center justify-center ">
                  <FontAwesomeIcon
                    className="size-6  text-white"
                    icon={faEye}
                  />
                  <p className="text-white ml-2 text-base">10000 views</p>
                </div>
                <div className="flex items-center justify-center ">
                  <FontAwesomeIcon
                    className="size-6  text-yellow-300"
                    icon={faStar}
                  />
                  <p className="text-white ml-2 text-base">
                    {movie.average_rating}/10
                  </p>
                </div>
                <p className="text-white text-base">{movie.duration}ph</p>
                <p className="text-white text-base">
                  Release Date: {movie.release_date}
                </p>
              </div>
              <div className="w-full h-0.5 bg-slate-400"></div>
              <div className="w-full flex gap-6 mt-4">
                <div className=" h-full ">
                  <h1 className="text-white text-xl">Details</h1>
                  <ul className="mt-6  w-full">
                    <li className="text-white text-base mb-2">
                      Genre:
                      <span className="text-slate-400 text-base ml-1">
                        {movie.categories}
                      </span>
                    </li>
                    <li className="text-white text-base mb-2">
                      Director:
                      <span className="text-slate-400 text-base ml-1">
                        {movie.producer}
                      </span>
                    </li>
                    <li className="text-white text-base mb-2">
                      Country:
                      <span className="text-slate-400 text-base ml-1">
                        {movie.nation}
                      </span>
                    </li>
                    {/* <li className="text-white text-base mb-2">
                      Language:
                      <span className="text-slate-400 text-base ml-1">
                        {language}
                      </span>
                    </li> */}
                    <li className="text-white text-base mb-2">
                      Actors:
                      <span className="text-slate-400 text-base ml-1">
                        {movie.actor}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-0.5 bg-slate-500 mt-2"></div>
              <div>
                <h2 className="text-white text-xl mt-4">Content Movie</h2>
                <p className="text-white mt-2 text-sm text-justify">
                  {movie.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex items-center">
          <div className="h-8 w-1 bg-white"></div>
          <p className="text-white ml-2 text-xl font-bold">Show Times</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5 mt-8 ml-10">
            {show_times.map((item, index) => (
              <ShowTime
                key={index}
                id={index.toString()}
                date={item.date}
                title={item.dayOfWeek}
                isSelected={selectedDate == item.date}
                onSelect={handleSelect}
              />
            ))}
          </div>
          <div className="mt-10">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="danang">Đà Nẵng</SelectItem>
                  <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                  <SelectItem value="hn">Hà Nội</SelectItem>
                  <SelectItem value="haiphong">Hải Phòng</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full h-0.5 bg-white mt-4"></div>
        <div className="mt-10">
          <div className="flex flex-col items-start my-4">
            <h1 className="text-white font-bold text-lg">Victory Nui Thanh</h1>
            <div className="flex items-center justify-between gap-5 my-6">
              <h1 className="text-white mr-10">2D Sub</h1>
              {showTimeDate.map((item: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-white  border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-out  rounded-xl py-3 px-5 cursor-pointer"
                >
                  {item.time}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-300 my-6"></div>
          <Transition
            show={modalOpen}
            as="div"
            className="fixed inset-0 z-[99999]"
          >
            <Dialog onClose={() => setModalOpen(false)}>
              {/* 1. The backdrop layer */}
              <Transition.Child
                as="div"
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                aria-hidden="true"
              />

              {/* 2. The modal video */}
              <Transition.Child
                as="div"
                className="fixed inset-0 flex items-center justify-center p-6 mt-20"
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-75"
                enterTo="opacity-100 scale-100"
                leave="transition ease-out duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <div className="max-w-5xl mx-auto h-full">
                  <Dialog.Panel className="w-full max-h-full rounded-3xl shadow-2xl aspect-video bg-black overflow-hidden">
                    <video width="1920" height="1080" loop controls>
                      {movie && (
                        <source src={`${movie.trailer}`} type="video/mp4" />
                      )}
                      Your browser does not support the video tag.
                    </video>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}
