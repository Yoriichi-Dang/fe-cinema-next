"use client";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import Image from "next/image";
import Room from "@/components/home/booking/Room";
import FoodPage from "@/components/home/booking/FoodPage";
import QRTicket from "@/components/home/booking/QRTicket";
import { FoodItemProps, useTicket } from "@/Context/TicketAppContext";

export default function Page({ params }: { params: { id: string } }) {
  const [pages, setPages] = useState(1);
  const seatBuys = ["A1", "B5"];
  const { ticket, setTicket } = useTicket();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodItemProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setSelectedSeatIds(ticket.seats);
  }, [ticket.seats]);
  useEffect(() => {
    setSelectedFoods(ticket.food.foods);
  }, [ticket.food.foods]);
  useEffect(() => {
    let total = selectedSeatIds.length * 50;
    selectedFoods.forEach((food) => {
      total += food.count * food.cost;
    });
    setTotalPrice(total);
  }, [selectedSeatIds, selectedFoods]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 mb-32">
      <div className="flex w-5/6 min-h-screen">
        {pages < 3 && (
          <div className="w-1/4 flex flex-col items-center ">
            <div className="flex flex-col">
              <Image
                src="/assets/movies/movie_4.jpg"
                alt="movie"
                width={240}
                height={240}
                className="object-contain rounded-2xl"
              />
              <h1 className="text-white xl:text-lg text-sm mt-4">
                Doraemon: Nobita bảng giao hưởng địa cầu
              </h1>
              <div className="h-0.5 w-full bg-slate-300 mt-4"></div>

              <p className="text-white text-sm mt-4">
                2D-Sub:
                <span className="text-white font-bold ml-3 py-1 px-3 bg-yellow-400 rounded-lg">
                  16+
                </span>
              </p>
              <p className="text-white text-sm mt-4">
                Victory
                <span className="text-white font-bold ml-3 py-1 px-3 bg-sky-400 rounded-lg">
                  Nui Thanh
                </span>
              </p>
              <p className="text-white text-sm mt-4">
                Room:
                <span className="text-white font-bold ml-3 py-1 px-3 bg-orange-400 rounded-lg">
                  5
                </span>
              </p>
              <p className="text-white text-sm mt-4">
                Time:
                <span className="text-white font-bold mx-2 py-1 px-3 bg-green-400 rounded-lg">
                  14:15
                </span>
              </p>
              <p className="text-white text-sm mt-4">
                Date:
                <span className="text-white font-bold mx-2 py-1 px-3 bg-purple-400 rounded-lg">
                  17/05/2024
                </span>
              </p>
              <div className="h-0.5 w-full bg-slate-300 mt-4"></div>
              <div className="flex mt-4 gap-2">
                <p className="text-white text-sm font-bold">Seats: </p>
                <p className="text-white text-sm">
                  {selectedSeatIds.join(", ")}
                </p>
              </div>
              {selectedFoods.length > 0 && (
                <>
                  <div className="h-0.5 w-full bg-slate-300 mt-4"></div>
                  <div className="flex flex-col mt-4 gap-2">
                    {selectedFoods.map((item, index) => (
                      <p key={index} className="text-white text-sm">
                        {item.count} x {item.title}
                      </p>
                    ))}
                  </div>
                </>
              )}

              <div className="h-0.5 w-full bg-slate-300 mt-4"></div>
              <div className="flex mt-4 gap-2">
                <p className="text-white text-sm font-bold">Total payment:</p>
                <p className="text-white text-sm">
                  <span className="p-2 bg-green-500 rounded-lg font-bold mx-2">
                    {totalPrice}.000
                  </span>
                  VND
                </p>
              </div>
              <div className="h-0.5 w-full bg-slate-300 mt-4"></div>
              <div className="flex w-full gap-2 mt-4">
                <button
                  onClick={() => setPages((prev) => (prev == 1 ? 1 : prev - 1))}
                  className="py-4 px-6 border-2 border-solid border-white rounded-xl text-white font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setPages((prev) => (prev == 3 ? 3 : prev + 1))}
                  className="p-4 text-center w-full bg-sky-400 hover:bg-transparent border-2 border-solid border-sky-400 duration-500 transition-all rounded-xl text-white font-bold"
                >
                  {pages == 2 ? "Confirm" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
        {pages == 1 && (
          <Room rows={9} numberGroup={4} colInGroup={4} seatBuys={seatBuys} />
        )}
        {pages == 2 && <FoodPage />}
        {pages == 3 && <QRTicket id={"123456"} />}
      </div>
    </div>
  );
}
