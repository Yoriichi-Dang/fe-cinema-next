"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/admin/Button";
import { Textarea } from "../../ui/textarea";
import RoomTable from "./ScheduleTable";
import { useAppContext } from "@/Context/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function fetchSchedule() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();
  return movies;
}
async function fetchMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();
  return movies;
}
async function fetchRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const rooms = await res.json();
  return rooms;
}

export default function SchedulePage() {
  const { sessionToken } = useAppContext();
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = async (data: any) => {
    setIsPending(true);
    const formDataToSend = new FormData();
    formDataToSend.append("movie", data.movie);
    formDataToSend.append("room", data.room);
    formDataToSend.append("start_time", data.start_time);
    formDataToSend.append("cost", data.cost);
    console.log(formDataToSend);
    // formDataToSend.append("name", data.name);
    // formDataToSend.append("n_cols", data.n_cols);
    // formDataToSend.append("n_rows", data.n_rows);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/create/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        setIsPending(false);
        setIsSuccess(false);
        setMessage("Error add new show time movie");
        throw Error("Failed to post data");
      }
      if (response.ok) {
        // const data = await response.json();
        fetchSchedule().then((data) => {
          setSchedules(data);
          setIsPending(false);
          setIsSuccess(true);
          setMessage("Successfully add new show time movie");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}/destroy/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    if (response.ok) {
      fetchSchedule().then((data) => {
        setSchedules(data);
      });
    }
  };
  useEffect(() => {
    fetchSchedule().then((data) => {
      setSchedules(data);
    });
    fetchMovies().then((data) => {
      setMovies(data);
    });
    fetchRooms().then((data) => {
      setRooms(data);
    });
  }, []);
  const selectedMovie = watch("movie");
  const selectRoom = watch("room");
  return (
    <div className="w-full h-full mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => {}}>New Schedule</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Schedule Movie Show</DialogTitle>
            <DialogDescription>
              Enter information about new shedule
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="movie" className="text-right ">
                  Movie
                </Label>
                <input type="hidden" {...register("movie")} />
                <Select
                  value={selectedMovie}
                  onValueChange={(value) => setValue("movie", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Movie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {movies &&
                        movies.map((item: any, index: number) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <input type="hidden" {...register("room")} />
                <Select
                  value={selectRoom}
                  onValueChange={(value) => setValue("room", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {rooms &&
                        rooms.map((item: any, index: number) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_time" className="text-right">
                  Start Time
                </Label>
                <Input
                  {...register("start_time")}
                  type="datetime-local"
                  id="start_time"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Cost Seat
                </Label>
                <Input
                  {...register("cost")}
                  type="number"
                  min={1}
                  id="cost"
                  className="col-span-3"
                />
              </div>
              <div className="col-span-full ">
                <Alert
                  className={`${show ? "block" : "hidden"} ${
                    isPending
                      ? "bg-purple-500"
                      : isSuccess
                      ? "bg-green-500"
                      : "bg-red-500"
                  } `}
                >
                  <AlertTitle>{isPending ? "Loading..." : message}</AlertTitle>
                  <AlertDescription></AlertDescription>
                </Alert>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShow(true)} type="submit">
                Add
              </Button>
              {/* <DialogClose asChild>
              </DialogClose> */}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Suspense fallback={<p>Loading feed...</p>}>
        <RoomTable handleDelete={handleDelete} schedules={schedules} />
      </Suspense>
    </div>
  );
}
