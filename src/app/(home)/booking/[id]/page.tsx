"use client";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import Image from "next/image";
import Seat from "@/components/home/Seat";

export default function Page({ params }: { params: { id: string } }) {
  const rowLabel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const seatBuys = ["A1", "B5"];
  const numberGroup = 4;
  const colInGroup = 4;
  const [selectedSeats, setSelectedSeats] = useState<{
    [key: string]: boolean;
  }>({});
  //    const handleSelect = (id: string) => {
  //      setSelectedSeats((prevSelectedSeats) => ({
  //        ...prevSelectedSeats,
  //        [id]: !prevSelectedSeats[id], // Toggle the selection state
  //      }));
  //    };
  const selectedSeatIds = Object.keys(selectedSeats);
  const totalPrice = selectedSeatIds.length * 50;
  const handleSelect = useCallback((id: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = { ...prevSelectedSeats };
      if (newSelectedSeats[id]) {
        delete newSelectedSeats[id]; // Remove id if it was selected
      } else {
        newSelectedSeats[id] = true; // Add id if it was not selected
      }
      return newSelectedSeats;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 mb-32">
      <div className="flex w-5/6 min-h-screen">
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
              <p className="text-white text-sm">{selectedSeatIds.join(", ")}</p>
            </div>
            <div className="h-0.5 w-full bg-slate-300 mt-4"></div>
            <div className="flex mt-4 gap-2">
              <p className="text-white text-sm font-bold">Total payment:</p>
              <p className="text-white text-sm">
                <span className="p-2 bg-green-500 rounded-lg font-bold">
                  {totalPrice}.000
                </span>
                VND
              </p>
            </div>
          </div>
        </div>
        <div className="w-3/4 ">
          <div className="m-4 w-full pr-[50px] border-t-[40px] border-l-[40px] border-l-transparent border-r-[40px] border-t-slate-200 border-transparent "></div>
          <div className="flex justify-center items-center mt-2">
            <p className="text-slate-400 font-bold text-xl">Screen</p>
          </div>
          <div className="flex justify-between m-10">
            <div className="flex flex-col items-start justify-center space-y-4">
              {rowLabel.map((row, index) => (
                <p
                  key={index}
                  className="text-slate-600 font-bold  text-center"
                >
                  {row}
                </p>
              ))}
            </div>
            {Array.from({ length: numberGroup }, (_, group) => (
              <div key={group} className="flex gap-3">
                {Array.from({ length: colInGroup }, (_, colGroup) => (
                  <div
                    key={colGroup}
                    className="flex flex-col items-start  gap-3"
                  >
                    {rowLabel.map((row, indexRow) => (
                      <Seat
                        key={indexRow}
                        id={
                          row + (colInGroup * group + colGroup + 1).toString()
                        }
                        isSelected={
                          !!selectedSeats[
                            row + (colInGroup * group + colGroup + 1).toString()
                          ]
                        } // Convert undefined to false
                        isBuy={seatBuys.hasOwnProperty(
                          (row + (colInGroup * group + colGroup + 1)).toString()
                        )}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex flex-col items-start justify-center space-y-4">
              {rowLabel.map((row, index) => (
                <p
                  key={index}
                  className="text-slate-600 font-bold  text-center"
                >
                  {row}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="flex gap-3 justify-between items-center">
              <Seat isBuy={false} isSelected={false} />
              <p className="text-white">Empty Seat</p>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <Seat isBuy={false} isSelected={true} />
              <p className="text-white">Select Seat</p>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <Seat isBuy={true} />
              <p className="text-white">Seat Buy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
