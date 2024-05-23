"use client";
import React, { useContext, createContext, useState } from "react";
const AppContext = createContext({
  sessionToken: "",
  expiresToken: new Date(),
  setSessionToken: (sessionToken: string) => {},
  setExpiresToken: (expires_in: Date) => {},
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const [expiresToken, setExpiresToken] = useState(new Date());
  return (
    <AppContext.Provider
      value={{ sessionToken, setSessionToken, expiresToken, setExpiresToken }}
    >
      {children}
    </AppContext.Provider>
  );
}
