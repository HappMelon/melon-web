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
    <Input
      placeholder="Search topics, news"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
