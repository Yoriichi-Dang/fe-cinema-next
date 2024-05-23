"use client";
import React, { useContext, useEffect } from "react";
import { useState, useCallback } from "react";
import Seat from "../Seat";
import { useTicket } from "@/Context/TicketAppContext";

type RoomProps = {
  rows: number;
  numberGroup: number;
  colInGroup: number;
  seatBuys: string[];
};

export default function Room({
  rows,
  numberGroup,
  colInGroup,
  seatBuys,
}: RoomProps) {
  const { ticket, setTicket } = useTicket();
  const rowLabel = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const rowRoom = rowLabel.slice(0, rows);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSelectSeat = useCallback((id: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      let newSelectedSeats: string[];
      if (prevSelectedSeats.includes(id)) {
        newSelectedSeats = prevSelectedSeats.filter((seatId) => seatId !== id);
      } else {
        newSelectedSeats = [...prevSelectedSeats, id];
      }
      return newSelectedSeats;
    });
  }, []);
  useEffect(() => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      seats: selectedSeats.map((seatId) => seatId),
    }));
  }, [selectedSeats, setTicket]);
  return (
    <div className="w-3/4 ">
      <div className="m-4 w-full pr-[50px] border-t-[40px] border-l-[40px] border-l-transparent border-r-[40px] border-t-slate-200 border-transparent "></div>
      <div className="flex justify-center items-center mt-2">
        <p className="text-slate-400 font-bold text-xl">Screen</p>
      </div>
      <div className="flex justify-between m-10">
        <div className="flex flex-col items-start justify-center space-y-4">
          {rowRoom.map((row, index) => (
            <p key={index} className="text-slate-600 font-bold  text-center">
              {row}
            </p>
          ))}
        </div>
        {Array.from({ length: numberGroup }, (_, group) => (
          <div key={group} className="flex gap-3">
            {Array.from({ length: colInGroup }, (_, colGroup) => (
              <div key={colGroup} className="flex flex-col items-start  gap-3">
                {rowRoom.map((row, indexRow) => (
                  <Seat
                    key={indexRow}
                    id={row + (colInGroup * group + colGroup + 1).toString()}
                    isSelected={selectedSeats.includes(
                      (row + (colInGroup * group + colGroup + 1)).toString()
                    )}
                    isBuy={seatBuys.includes(
                      (row + (colInGroup * group + colGroup + 1)).toString()
                    )}
                    onSelect={handleSelectSeat}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-col items-start justify-center space-y-4">
          {rowRoom.map((row, index) => (
            <p key={index} className="text-slate-600 font-bold  text-center">
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
  );
}
