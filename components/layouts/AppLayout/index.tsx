import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default function Index({
  children,
  image,
}: {
  children: React.ReactNode;
  image?: string;
}) {
  return (
    <div className="w-auto h-full">
      <Header image={image} />
      <div className="pt-[6.75rem] relative h-[100vh]">
        <Sidebar
          className={`bg-white w-[14.8125rem] fixed left-[2.6875rem] top-[6.75rem] bottom-[5rem] h-auto rounded-[.9375rem]`}
        />
        <div className="pl-[17.5rem] pr-[2.6875rem] h-full">{children}</div>
      </div>
    </div>
  );
}
