import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default function Index({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-auto h-full">
      <Header />
      <div className="pt-[6.75rem] relative h-[100vh]">
        <Sidebar
          className={`bg-white w-[14.8125rem] fixed left-[2.6875rem] top-[6.75rem] bottom-[5rem] h-auto rounded-[.9375rem]`}
        />
        <div className="ml-[17.5rem] mr-[2.6875rem] h-full">{children}</div>
      </div>
    </div>
  );
}
