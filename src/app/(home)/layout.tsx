import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen w-full bg-dark select-none">
      <Navbar />
      <main className="min-w-full">{children}</main>
      <Footer />
    </div>
  );
}
