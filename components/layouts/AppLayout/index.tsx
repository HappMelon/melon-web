import TopicsAndAuthors from "@/components/thread/TopicsAndAuthors";
import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default function Index({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-auto h-full">
      <Header />
      <div className="mt-[6.75rem] relative">
        <Sidebar
          className={`bg-white w-[14.8125rem] fixed left-[2.6875rem] top-[6.75rem] bottom-[5rem] h-auto rounded-[.9375rem]`}
        />
        <div className="ml-[19.375rem] mr-[26.4375rem] h-auto">{children}</div>
      </div>
    </div>
  );
}
