import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
type CardFoodProps = {
  title: string;
  cost: number;
  description: string;
  image: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function CardFood({
  title,
  cost,
  description,
  image,
  count,
  onIncrement,
  onDecrement,
}: CardFoodProps) {
  return (
    <div
      className={
        "flex justify-between w-full items-center bg-black rounded-xl px-4  transition-all ease-in duration-300 hover:scale-105"
      }
    >
      <div className="flex justify-start items-center ">
        <div className="h-32 flex justify-center items-center rounded-lg">
          <Image
            src={image}
            width={150}
            height={200}
            alt="food"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start justify-center ml-6 gap-1">
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="text-sm text-slate-400">{description}</p>
          <h2 className="text-lg  text-white">
            Cost:
            <span className="ml-3">{cost}.000 VND</span>
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center bg-darkBlueGray-100 rounded-lg">
        <div className="flex justify-between items-center">
          <div
            className="p-2 border-solid border-white cursor-pointer"
            onClick={onDecrement}
          >
            <FontAwesomeIcon className="text-white size-4" icon={faMinus} />
          </div>
          <p className="text-base font-bold text-white m-2">{count}</p>
          <div
            className="p-2 border-solid border-white cursor-pointer"
            onClick={onIncrement}
          >
            <FontAwesomeIcon className="text-white size-4" icon={faPlus} />
          </div>
        </div>
      </div>
    </div>
  );
}
