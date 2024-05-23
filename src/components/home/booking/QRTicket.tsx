import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Image from "next/image";
export default function QRTicket({ id }: any) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, id, (error: any) => {
        if (error) console.error(error);
      });
    }
  }, [id]);
  const imageLink = "/assets/movies/movie_2.jpg";
  const title = "Vây Hãm: Kẻ Trừng Phạt";
  const description = "2D Sub";
  const age = 18;
  const room = 5;
  const time = "20:45";
  const date = "7/5/2024";
  const seats = ["A1", "A2", "B1"];
  const cost = 100;
  return (
    <div className="flex w-full justify-center ">
      <div className="flex flex-col items-center  bg-darkPurple rounded-xl shadow-2xl w-1/3">
        <div className="p-6 mt-8 w-full">
          <div className="flex flex-col justify-start items-center gap-4">
            <div className="w-40 flex justify-center items-center">
              <Image
                className="object-cover rounded-xl"
                src={imageLink}
                width={150}
                height={150}
                alt="movie"
              />
            </div>
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <div className="flex items-center  gap-3">
              <p className="text-slate-300 text-base">{description}</p>
              {age && (
                <span className="px-3 py-1 bg-purple-400 font-bold rounded-lg">
                  T{age}+
                </span>
              )}
            </div>
            <div className="border-t-2 border-dashed w-full m-8"></div>
          </div>
          <div className="flex flex-col  items-start justify-center mb-4">
            <p className="text-white font-bold text-md">Room {room}</p>
            <div className="flex items-center justify-start gap-4">
              <p className="text-white font-bold text-md">Show Time: {time}</p>
              <span className="text-white text-xl">-</span>
              <p className="text-white font-bold text-md">Date: {date}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <canvas width={400} height={400} ref={canvasRef} />
            <div className="border-t-2 border-dashed w-full m-8"></div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-slate-400 text-md">Seats </span>
            <span className="text-slate-400 text-md"> - </span>
            <p className="text-semibold text-white text-md">
              {seats.join(", ")}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="border-t-2 border-dashed w-full m-8"></div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col items-start justify-center">
                <h2 className="text-slate-400 text-base font-semibold">
                  ID Ticket
                </h2>
                <p className="text-white text-base">{id}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-slate-400 text-base font-semibold">
                  Points
                </h2>
                <p className="text-white text-base">{seats.length * 2}</p>
              </div>
              <div className="flex flex-col items-end justify-center">
                <h2 className="text-slate-400 text-base font-semibold">Cost</h2>
                <p className="text-white text-base">{cost}.000 VND</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
