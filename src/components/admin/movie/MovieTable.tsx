"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
type MovieTableProps = {
  movies: any;
  handleDelete: (id: string) => void;
};

export default function MovieTable({ movies, handleDelete }: MovieTableProps) {
  return (
    <Table className="bg-darkBlueGray mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">ID</TableHead>
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-white text-right">Time watch</TableHead>
          <TableHead className="text-right text-white">Date Release</TableHead>
          <TableHead className="text-right text-white">Genre</TableHead>
          <TableHead className="text-right text-white">Status</TableHead>
          <TableHead className="text-right text-white">Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies?.map((movie: any, index: number) => (
          <TableRow className="text-white" key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{movie.title}</TableCell>
            <TableCell className="text-right">{movie["duration"]}</TableCell>
            <TableCell className="text-right">
              {movie["release_date"]}
            </TableCell>
            <TableCell className="text-right">{movie.category}</TableCell>
            <TableCell className="text-right">{movie["status"]}</TableCell>
            <TableCell className="text-right">
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-500 font-bold p-2 rounded-xl mr-2"
              >
                Delete
              </button>
              <Link
                className="bg-sky-500 font-bold p-2 rounded-xl "
                href={`/admin/movie/${movie.id}`}
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
