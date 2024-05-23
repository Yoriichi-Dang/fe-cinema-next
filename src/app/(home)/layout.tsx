import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { useAppContext } from "@/Context/AppContext";
import { TicketProvider } from "@/Context/TicketAppContext";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TicketProvider>
      <div className="min-h-screen w-full bg-dark select-none">
        <Navbar />
        <main className="min-w-full">{children}</main>
        <Footer />
      </div>
    </TicketProvider>
  );
}
