"use client";

import { Explore } from "@/components/search/explore";
import { useGetPath } from "@/hook/useGetPath";

export default function Header() {
  const { pathname } = useGetPath();
  const blur = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <main
      className={`flex w-full h-[4.875rem] bg-white px-[2.6875rem] fixed top-0 z-10${
        blur ? "pointer-events-none filter blur-[4px]" : ""
      }`}
    >
      <div className="flex w-full justify-start items-center">
        <div className="flex justify-start items-center">
          <img src="/logo.png" alt="Logo" />
          <div className="font-bold text-2xl whitespace-nowrap">Flare Dapp</div>
        </div>
        <Explore />
      </div>
      <div className="flex gap-[1.25rem] items-center">
        {/* FIXME */}
        {/* <AccountButton /> */}
      </div>
    </main>
  );
}
