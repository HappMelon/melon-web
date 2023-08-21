"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Explore() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push("/explore?q=" + search);
      } else {
        router.push("/explore");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Input
      placeholder="Search topics, news"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
