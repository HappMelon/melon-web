import { Explore } from "@/components/search/explore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/modeToggle";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  return (
    <main className="flex flex-row w-full h-[10rem] justify-between items-center mt-[4rem] box-border">
      <div className="flex gap-[1.5rem] items-center w-full mr-[10rem]">
        {/* 搜索 */}
        <Explore />
        <Button>Search</Button>
      </div>
      <div className="flex gap-[1.25rem] items-center">
        <ModeToggle></ModeToggle>
        <UserButton></UserButton>
      </div>
    </main>
  );
}
