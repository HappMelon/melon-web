import React from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";

export default async function Index({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await currentUser();

  // const getUser = await prisma.user.findUnique({
  //   where: {
  //     id: user?.id,
  //   },
  // });

  return (
    <div className="flex h-full">
      <Sidebar className="h-full bg-white rounded-[15px] border-#eaeaea ml-[2.6875rem] mt-[2.5rem]" />
      <div className="flex flex-col w-full mr-[4.75rem]">
        <Header />
        <div> {children}</div>
      </div>
    </div>
  );
}
