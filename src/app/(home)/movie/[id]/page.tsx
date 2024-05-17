"use client";
import React, { useState, Fragment } from "react";
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

export default function Page({ params }: { params: { id: string } }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const title = "Doraemon: Nobita và bản giao hưởng địa cầu";
  const content =
    "Phim Điện Ảnh Doraemon: Nobita Và Bản Giao Hưởng Địa Cầu là một tác phẩm điện ảnh đặc biệt, mang đến cho khán giả không chỉ những phút giây giải trí mà còn là cơ hội để khám phá và trải nghiệm thế giới của âm nhạc. Truyện kể về cuộc phiêu lưu của Doraemon, Nobita và nhóm bạn trong việc cứu cung điện âm nhạc trên hành tinh Farre. Họ phải tìm kiếm 'virtuoso' - những bậc thầy âm nhạc để cùng biểu diễn và khôi phục lại cung điện này.Từ việc chơi nhạc, hòa tấu cùng Micca đến việc đối mặt với những thách thức và nguy hiểm, câu chuyện mang đến những thông điệp về tình bạn, sự đoàn kết và quan trọng nhất là giá trị của âm nhạc trong cuộc sống của chúng ta.";
  const rating = 9.5;
  const genre = "Comic";
  const timeWatch = 115;
  const country = "Japan";
  const dateRealse = "16/05/2024";
  const actors = "Mizuta Wasabi";
  const director = "Kazuaki Imai";
  const language = "English";
  const age = 16;
  const views = 1234;
  const linkPoster = "/assets/movies/movie_4.jpg";
  const showTimes = [
    { id: 1, date: "17/05", title: "Today" },
    { id: 2, date: "20/05", title: "Saturday" },
    { id: 3, date: "21/05", title: "Monday" },
  ];
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10">
      <div className="flex w-3/4 min-h-screen">
        <div className="flex w-full h-full">
          <div className="w-1/4 h-full flex flex-col items-center gap-4 ">
            <Image
              src={linkPoster}
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
              <h1 className="font-extrabold text-2xl">{title}</h1>
              <div className="border-2 border-solid rounded-xl px-4">
                <h3 className="italic font-bold text-lg">{age}+</h3>
              </div>
            </div>
            <div className="w-full h-0.5 bg-slate-400 mt-4"></div>
            <div className="flex my-4 gap-6">
              <div className="flex items-center justify-center ">
                <FontAwesomeIcon className="size-6  text-white" icon={faEye} />
                <p className="text-white ml-2 text-base">{views} views</p>
              </div>
              <div className="flex items-center justify-center ">
                <FontAwesomeIcon
                  className="size-6  text-yellow-300"
                  icon={faStar}
                />
                <p className="text-white ml-2 text-base">{rating}/10</p>
              </div>
              <p className="text-white text-base">{timeWatch}ph</p>
              <p className="text-white text-base">Release Date: {dateRealse}</p>
            </div>
            <div className="w-full h-0.5 bg-slate-400"></div>
            <div className="w-full flex gap-6 mt-4">
              <div className=" h-full ">
                <h1 className="text-white text-xl">Details</h1>
                <ul className="mt-6  w-full">
                  <li className="text-white text-base mb-2">
                    Genre:
                    <span className="text-slate-400 text-base ml-1">
                      {genre}
                    </span>
                  </li>
                  <li className="text-white text-base mb-2">
                    Director:
                    <span className="text-slate-400 text-base ml-1">
                      {director}
                    </span>
                  </li>
                  <li className="text-white text-base mb-2">
                    Country:
                    <span className="text-slate-400 text-base ml-1">
                      {country}
                    </span>
                  </li>
                  <li className="text-white text-base mb-2">
                    Language:
                    <span className="text-slate-400 text-base ml-1">
                      {language}
                    </span>
                  </li>
                  <li className="text-white text-base mb-2">
                    Actors:
                    <span className="text-slate-400 text-base ml-1">
                      {actors}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full h-0.5 bg-slate-500 mt-2"></div>
            <div>
              <h2 className="text-white text-xl mt-4">Content Movie</h2>
              <p className="text-white mt-2 text-sm text-justify">{content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex items-center">
          <div className="h-8 w-1 bg-white"></div>
          <p className="text-white ml-2 text-xl font-bold">Show Times</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5 mt-8 ml-10">
            {showTimes.map((showTime) => (
              <ShowTime
                key={showTime.id}
                id={showTime.id}
                date={showTime.date}
                title={showTime.title}
                isSelected={selectedId === showTime.id}
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
            <h1 className="text-white font-bold text-lg">
              Victory Dien Bien Phu
            </h1>
            <div className="flex items-center justify-between gap-5 my-6">
              <h1 className="text-white mr-10">2D Sub</h1>
              <div className="flex items-center justify-center text-white  border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-out  rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
              <div className="flex items-center justify-center text-white  border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-outv rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
              <div className="flex items-center justify-center text-white border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-out rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-300 my-6"></div>
          <div className="flex flex-col items-start mt-4">
            <h1 className="text-white font-bold text-lg">Victory Nui Thanh</h1>
            <div className="flex items-center justify-between gap-5 my-4">
              <h1 className="text-white mr-10">2D Sub</h1>
              <div className="flex items-center justify-center text-white  border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-out  rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
              <div className="flex items-center justify-center text-white  border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-outv rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
              <div className="flex items-center justify-center text-white border-solid border-2 border-white hover:bg-purple-600 transition-all duration-500 ease-in-out rounded-xl py-3 px-5 cursor-pointer">
                16:30
              </div>
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
                      <source
                        src={"/assets/videos/doraemon.mp4"}
                        type="video/mp4"
                      />
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
