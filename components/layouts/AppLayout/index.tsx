import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Index({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return (
    <div className="flex h-screen">
      <Sidebar className="h-full w-auto" username={getUser!?.username} />
      <div className="flex flex-col w-full mr-[4.75rem]">
        <Header />
        <div> {children}</div>
      </div>
    </div>
  );
}
