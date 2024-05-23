"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
type ScheduleTableProps = {
  schedules: any;
  handleDelete: (id: string) => void;
};

export default function ScheduleTable({
  schedules,
  handleDelete,
}: ScheduleTableProps) {
  return (
    <Table className="bg-darkBlueGray mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">ID</TableHead>
          <TableHead className="text-white">Movie</TableHead>
          <TableHead className="text-right text-white">Room</TableHead>
          <TableHead className="text-right text-white">Start Time</TableHead>
          <TableHead className="text-right text-white">End Time</TableHead>
          <TableHead className="text-right text-white">Features</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules?.map((item: any, index: number) => (
          <TableRow className="text-white" key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{item.movie.title}</TableCell>
            <TableCell className="text-right">{item.room.name}</TableCell>
            <TableCell className="text-right">
              {item["start_date"]} - {item["start_time"]}
            </TableCell>
            <TableCell className="text-right">
              {item["end_date"]} - {item["end_time"]}
            </TableCell>

            <TableCell className="text-right">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 font-bold p-2 rounded-xl mr-2"
              >
                Delete
              </button>
              <Link
                className="bg-sky-500 font-bold p-2 rounded-xl "
                href={`/admin/schedules/${item.id}`}
              >
                Detail
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
