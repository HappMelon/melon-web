"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");

  useEffect(() => {}, [value]);

  function SwitchRouter(pathname: string) {
    router.push(pathname);
    setValue(pathname);
  }

  return (
    <div className={cn("", className)}>
      <div className="flex flex-col text-[1.25rem] font-bold pt-[2.4375rem] pl-[2.9375rem]">
        <div className="flex">
          <img
            src="/🦆 icon _fire_.svg"
            alt=""
            className="w-[1.1912rem] h-[1.5883rem]"
          />
          <div className="pl-[1.125rem]">Trending</div>
        </div>
        <div className="flex pt-[2.625rem]">
          <img
            src="/🦆 icon _purchase tag_.svg"
            alt=""
            className="w-[1.1912rem] h-[1.5883rem]"
          />
          <div className="pl-[1.125rem]">Mill</div>
        </div>
        <div className="flex pt-[2.625rem]">
          <img
            src="/🦆 icon _Wallet_.svg"
            alt=""
            className="w-[1.1912rem] h-[1.5883rem]"
          />
          <div className="pl-[1.125rem]">Wallet</div>
        </div>
      </div>
      <div
        className="flex py-[.5rem] px-[1.375rem] mt-[2.25rem] ml-[36px] w-[8.875rem] rounded-[2.5rem]"
        style={{
          background:
            "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
        }}
      >
        <img
          src="/🦆 icon _dashboard customize_.svg"
          alt=""
          className="w-[1.1912rem] h-[1.5883rem]"
        />
        <div className="text-xl font-[550] text-white ml-[1rem]">Post</div>
      </div>
    </div>
  );
}
