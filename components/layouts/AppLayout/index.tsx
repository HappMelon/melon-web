import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default function Index({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar className="h-full w-auto" />
      <div className="flex flex-col w-full mr-[4.75rem]">
        <Header />
        {children}
      </div>
    </div>
  );
}
