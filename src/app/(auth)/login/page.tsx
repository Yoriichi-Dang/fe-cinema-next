"use client";
import Header from "@/components/auth/Header";
import InputForm from "@/components/auth/InputForm";
import Link from "next/link";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
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
  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    console.log(data);
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
