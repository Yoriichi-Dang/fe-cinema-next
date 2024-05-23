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
type GenreTableProps = {
  genres: any;
  handleDelete: (id: string) => void;
};

export default function GenreTable({ genres, handleDelete }: GenreTableProps) {
  return (
    <Table className="bg-darkBlueGray mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">ID</TableHead>
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-right text-white">Description</TableHead>
          <TableHead className="text-right text-white">Features</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {genres?.map((item: any, index: number) => (
          <TableRow className="text-white" key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">{item["description"]}</TableCell>
            <TableCell className="text-right">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 font-bold p-2 rounded-xl mr-2"
              >
                Delete
              </button>
              <Link
                className="bg-sky-500 font-bold p-2 rounded-xl "
                href={`/admin/movie/${item.id}`}
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
