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
import MovieTable from "./MovieTable";
import { useAppContext } from "@/Context/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export async function fetchMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/all/`, {});
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
const format_date = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

export default function MoviePage() {
  const router = useRouter();
  const { sessionToken, expiresToken } = useAppContext();
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = async (data: any) => {
    setIsPending(true);
    const formDataToSend = new FormData();
    const release_date = format_date(new Date(data.release_date));
    formDataToSend.append("title", data.title);
    formDataToSend.append("category", data.categories);
    formDataToSend.append("thumbnail_file", data.thumbnail_file[0]);
    formDataToSend.append("producer", data.producer);
    formDataToSend.append("actor", data.actor);
    formDataToSend.append("nation", data.nation);
    formDataToSend.append("release_date", release_date);
    formDataToSend.append("age", data.age);
    formDataToSend.append("trailer_file", data.trailer_file[0]);
    formDataToSend.append("content", data.content);
    formDataToSend.append("duration", data.duration);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/create/`,
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
        setMessage("Error add new movie");
        throw Error("Failed to post data");
      }
      if (response.ok) {
        // const data = await response.json();
        fetchMovies().then((data) => {
          setMovies(data);
          setIsPending(false);
          setIsSuccess(true);
          setMessage("Successfully add new movie");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectedCategory = watch("category");
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/all/`
      );
      if (!res.ok) {
        throw Error("Failed fetch data");
      }
      const data = await res.json();
      return data;
    };
    fetchCategories().then((data) => setCategories(data));
  }, []);
  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        router.push("/login");
      });
  }, [sessionToken, router]);
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/destroy/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    if (response.ok) {
      fetchMovies().then((data) => {
        setMovies(data);
      });
    }
  };
  return (
    <div className="w-full h-full mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => {}}>New Movie</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
            <DialogDescription>
              Enter information about new movie
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    {...register("title")}
                    id="title"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="thumbnail_file" className="text-right">
                    Thumbnail
                  </Label>
                  <Input
                    {...register("thumbnail_file")}
                    id="thumbnail_file"
                    type="file"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="producer" className="text-right">
                    Producer
                  </Label>

                  <Input
                    {...register("producer")}
                    id="producer"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="actor" className="text-right">
                    Actors
                  </Label>

                  <Input
                    {...register("actor")}
                    id="actor"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nation" className="text-right">
                    Nation
                  </Label>
                  <Input
                    {...register("nation")}
                    id="nation"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="release_date" className="text-right">
                    Release Date
                  </Label>
                  <Input
                    {...register("release_date")}
                    id="release_date"
                    type="date"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Label htmlFor="age" className="text-right">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min={0}
                    max={20}
                    {...register("age")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trailer_file" className="text-right">
                    Trailer
                  </Label>
                  <Input
                    {...register("trailer_file")}
                    id="trailer_file"
                    type="file"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Label htmlFor="content" className="text-right ">
                    Content
                  </Label>
                  <Textarea
                    {...register("content")}
                    className="col-span-3"
                    placeholder="Type your message here."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Label htmlFor="duration" className="text-right ">
                    Time Watch
                  </Label>
                  <Input
                    {...register("duration")}
                    id="duration"
                    min={1}
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Label htmlFor="categories" className="text-right ">
                    Genre Movie
                  </Label>
                  <input type="hidden" {...register("category")} />
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Genre Movie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories &&
                          categories.map((item: any, index: number) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                    <AlertTitle>
                      {isPending ? "Loading..." : message}
                    </AlertTitle>
                    <AlertDescription></AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShow(true)} type="submit">
                Save changes
              </Button>
              {/* <DialogClose asChild>
              </DialogClose> */}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Suspense fallback={<p>Loading feed...</p>}>
        <MovieTable handleDelete={handleDelete} movies={movies} />
      </Suspense>
    </div>
  );
}
