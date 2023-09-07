import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";
import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default async function Index({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-auto h-full">
      <Header />
      <div className="mt-[6.75rem] relative">
        <Sidebar className="bg-white w-[14.8125rem] fixed left-[2.6875rem] top-[6.75rem] bottom-[5rem] h-auto rounded-[.9375rem]" />
        <div className="ml-[19.375rem] mr-[26.4375rem] h-auto">{children}</div>
        <div className="w-[21.875rem] fixed top-[6.75rem] right-[2.6875rem]">
          <HotTopics />
          <PopularAuthors />
        </div>
      </div>
    </div>
  );
}
