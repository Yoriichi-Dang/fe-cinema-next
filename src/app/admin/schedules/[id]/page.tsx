"use client";
import Room from "@/components/home/booking/Room";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [schedule, setSchedule] = useState<any>();
  useEffect(() => {
    const fetchSchedule = async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}/`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    };
    fetchSchedule(params.id).then((data) => setSchedule(data));
  }, [params.id]);
  return (
    <div className="mt-10">
      <Room
        rows={schedule?.room["n_rows"]}
        numberGroup={1}
        colInGroup={schedule?.room["n_cols"]}
        seatBuys={schedule?.tickets}
      />
    </div>
  );
}
