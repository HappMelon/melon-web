"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Explore() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");

  //query after 0.3s of no input
  useEffect(() => {
    if (pathname === "/explore") {
      if (search) {
        const delayDebounceFn = setTimeout(() => {
          router.push("/explore?q=" + search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
      } else {
        router.push("/explore");
      }
    }
  }, [search, router, pathname]);

  return (
    <div className="w-full flex items-center p-1 ml-[5.5rem] mr-[31.25rem]">
      <img src="/Search.svg" alt="" className="mr-[-2.25rem] z-10 pl-[22px]" />
      <Input
        placeholder="Search posts、users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none pl-10 rounded-full bg-[rgb(135,135,135,0.14)] color-[#9B9B9B]"
      />
    </div>
  );
}
