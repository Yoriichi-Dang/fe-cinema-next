"use client";
import React, { useEffect, useState } from "react";
import CardFood from "./CardFood";
import { useTicket } from "@/Context/TicketAppContext";

type FoodItem = {
  title: string;
  cost: number;
  description: string;
  image: string;
};

export default function FoodPage() {
  const { ticket, setTicket } = useTicket();
  const [data, setData] = useState<FoodItem[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/foods.json");
        if (res.ok) {
          const data = await res.json();
          setData(data);
          const initialCounts: { [key: string]: number } = {};
          data.forEach((item: any) => {
            initialCounts[item.title] = 0;
          });
          setCounts(initialCounts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleIncrement = (id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
    }));
  };
  useEffect(() => {
    const updatedFoods = Object.keys(counts)
      .map((title) => {
        const item = data.find((food) => food.title === title);
        return {
          id: title,
          title: title,
          cost: item ? item.cost : 0,
          count: counts[title],
        };
      })
      .filter((item) => item.count > 0);

    setTicket((prevTicket) => ({
      ...prevTicket,
      food: {
        foods: updatedFoods,
      },
    }));
  }, [counts, setTicket, data]);
  return (
    <div className="w-3/4 ml-3">
      <div className="flex flex-col gap-3 ">
        {data.map((item, index) => (
          <CardFood
            key={index}
            title={item.title}
            cost={item.cost}
            description={item.description}
            image={item.image}
            count={counts[item.title]}
            onIncrement={() => handleIncrement(item.title)}
            onDecrement={() => handleDecrement(item.title)}
          />
        ))}
      </div>
    </div>
  );
}
