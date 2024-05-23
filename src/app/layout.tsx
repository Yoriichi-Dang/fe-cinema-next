import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/Context/AppContext";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Victory",
  description: "Slaver cinema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  return (
    <html lang="en">
      <link rel="icon" href="/assets/logo/victory.png" />
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppProvider
          initialSessionToken={cookieStore.get("accessToken")?.value}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
