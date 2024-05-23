"use client";
import Header from "@/components/auth/Header";
import InputForm from "@/components/auth/InputForm";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (
    data
  ) => {
    const form = new FormData();
    form.append("email", data.email);
    form.append("fullname", data.fullName);
    form.append("password", data.password);
    form.append("password_confirm", data.password);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      }
    );
    if (!response.ok) {
      throw new Error("Account have been existed before");
    } else {
      alert("Sign up successfully");
    }
  };
  return (
    <div className="w-4/5 sm:p-2 md:p-4">
      <div className="pb-0 pt-2 flex items-start">
        <Header title="Sign Up" content="Enter your details to sign up!" />
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            {...register("email")}
            error={errors.email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <InputForm
            {...register("fullName")}
            error={errors.fullName}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
          <InputForm
            {...register("password")}
            error={errors.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <InputForm
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="w-full bg-darkBlue text-white py-2 rounded-lg font-bold transition duration-300 ease-in-out border-solid border-2 hover:border-darkBlue hover:border-2 hover:bg-white hover:text-darkBlue"
          >
            SignUp
          </button>
        </form>
        <Link
          className="text-darkBlue flex justify-center items-center mt-5 hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
