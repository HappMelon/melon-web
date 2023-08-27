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
  }, [search, router]);

  return (
    <div className="w-full flex items-center p-1">
      <img src="/Search.svg" alt="" className="mr-[-24px] z-10" />
      <Input
        placeholder="Search posts、users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none pl-[24px]"
      />
    </div>
  );
}
