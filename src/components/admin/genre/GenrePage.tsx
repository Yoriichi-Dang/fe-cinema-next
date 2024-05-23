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
import GenreTable from "./GenreTable";
import { useAppContext } from "@/Context/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function fetchGenres() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();
  return movies;
}

export default function MoviePage() {
  const { sessionToken } = useAppContext();
  const [genres, setGenres] = useState([]);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}/destroy/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    if (response.ok) {
      fetchGenres().then((data) => {
        setGenres(data);
      });
    }
  };
  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/create/`,
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
        const data = await response.json();
        fetchGenres().then((data) => {
          setGenres(data);
          setIsPending(false);
          setIsSuccess(true);
          setMessage("Successfully add new genre");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data);
    });
  }, []);
  return (
    <div className="w-full h-full mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => {}}>New Genre</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Genre</DialogTitle>
            <DialogDescription>
              Enter information about new genre
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    {...register("name")}
                    id="name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    {...register("description")}
                    id="description"
                    className="col-span-3"
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Suspense fallback={<p>Loading feed...</p>}>
        <GenreTable handleDelete={handleDelete} genres={genres} />
      </Suspense>
    </div>
  );
}
