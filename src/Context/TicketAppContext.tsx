"use client";
import React, { createContext, useContext, useState } from "react";
export type ShowTimeProps = {
  id: number; //id of showtime
  name: string;
  image: string;
  age: number;
  date: string;
  room: number;
  time: string;
};

export type FoodItemProps = {
  id: string;
  title: string;
  cost: number;
  count: number;
};
export type FoodProps = {
  foods: FoodItemProps[];
};
export type TicketProps = {
  id: string;
  showtime: ShowTimeProps;
  seats: string[];
  food: FoodProps;
};
const defaultShowTime: ShowTimeProps = {
  id: 0,
  name: "",
  image: "",
  age: 0,
  date: "",
  room: 0,
  time: "",
};

const defaultFood: FoodProps = { foods: [] };

const defaultTicket: TicketProps = {
  id: "",
  showtime: defaultShowTime,
  seats: [],
  food: defaultFood,
};

type TicketContextType = {
  ticket: TicketProps;
  setTicket: React.Dispatch<React.SetStateAction<TicketProps>>;
};
const TicketContext = createContext<TicketContextType>({
  ticket: defaultTicket,
  setTicket: () => {},
});

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ticket, setTicket] = useState<TicketProps>(defaultTicket);

  return (
    <TicketContext.Provider value={{ ticket, setTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);

export default TicketContext;
