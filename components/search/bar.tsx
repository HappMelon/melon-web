"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Bar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        console.log("pushing /user?q=" + search);
        router.push("/user?q=" + search);
      } else {
        console.log("pushing /user");
        router.push("/user");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-neutral-600 absolute top-3 left-2.5 z-10" />
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
