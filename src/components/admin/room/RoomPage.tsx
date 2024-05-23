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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/admin/Button";
import { Textarea } from "../../ui/textarea";
import RoomTable from "./RoomTable";
import { useAppContext } from "@/Context/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function fetchRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();
  return movies;
}

export default function RoomPage() {
  const { sessionToken } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("n_cols", data.n_cols);
    formDataToSend.append("n_rows", data.n_rows);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/create/`,
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
        setMessage("Error add new genre");
        throw Error("Failed to post data");
      }
      if (response.ok) {
        // const data = await response.json();
        fetchRooms().then((data) => {
          setRooms(data);
          setIsPending(false);
          setIsSuccess(true);
          setMessage("Successfully add new rooms");
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
      fetchRooms().then((data) => {
        setRooms(data);
      });
    }
  };
  useEffect(() => {
    fetchRooms().then((data) => {
      setRooms(data);
    });
  }, []);
  return (
    <div className="w-full h-full mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => {}}>New Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>
              Enter information about new room
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    {...register("name")}
                    id="name"
                    className="col-span-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="n_rows" className="text-right">
                    Row
                  </Label>
                  <Input
                    type="number"
                    min={5}
                    {...register("n_rows")}
                    id="n_rows"
                    className="col-span-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="n_cols" className="text-right">
                    Column
                  </Label>
                  <Input
                    min={8}
                    type="number"
                    {...register("n_cols")}
                    id="n_cols"
                    className="col-span-2"
                  />
                </div>
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
        <RoomTable handleDelete={handleDelete} rooms={rooms} />
      </Suspense>
    </div>
  );
}
