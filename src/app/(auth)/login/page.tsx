"use client";
import Header from "@/components/auth/Header";
import InputForm from "@/components/auth/InputForm";
import Link from "next/link";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context/AppContext";
export default function LoginForm() {
  const router = useRouter();
  const { setSessionToken, setExpiresToken } = useAppContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw data;
    } else {
      data = await response.json();
      const resultNextServer = await fetch("/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const token = await resultNextServer.json();
      if (resultNextServer.ok) {
        setSessionToken(token.accessToken);
        setExpiresToken(token.date);
        router.push("/");
      }
    }
  };

  return (
    <div className="w-4/5 sm:p-2 md:p-4">
      <div className="pb-0 pt-2 flex items-start">
        <Header title="Login" content="Login if you already have account!" />
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            {...register("email")}
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
          />
          <InputForm
            {...register("password")}
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full bg-darkBlue text-white py-2 rounded-lg font-bold transition duration-300 ease-in-out border-solid border-2 hover:border-darkBlue hover:border-2 hover:bg-white hover:text-darkBlue"
          >
            Login
          </button>
        </form>
        <Link
          className="text-darkBlue flex justify-center items-center mt-5 hover:underline"
          href="/signup"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
