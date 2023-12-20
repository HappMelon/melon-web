"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HotCard } from "@/components/mill/hot-topics-comp/hot-card";
import { useRef } from "react";

const mockArr = [
  {
    user: {},
  },
];

export function HotTopics() {
  const ref = useRef<HTMLDivElement>(null);

  function onScroll(num: number) {
    if (!ref.current) return;
    ref.current.scrollTo({
      left: ref.current.scrollLeft + num,
      behavior: "smooth",
    });
  }

  return (
    <div className="px-12 pt-4 w-full">
      <div className="w-full">
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-2 items-center">
            <Image
              className="w-[19px] h-[24px]"
              width={76}
              height={96}
              alt="hot"
              src="/hot.png"
            ></Image>
            <div className="text-[25px] font-semibold bg-gradient-to-r from-[#FF6B00] to-[#F83600] text-transparent bg-clip-text">
              HOT!!!
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => onScroll(-300)}
              className="hover:scale-105 transition-all active:scale-100 bg-gradient-to-b from-[#F9D423] to-[#FF6B00] rounded-full m-0 p-0 w-[34px] h-[34px]"
            >
              {" "}
              <ChevronLeft size={16} />{" "}
            </Button>
            <Button
              onClick={() => onScroll(+300)}
              className="hover:scale-105 transition-all active:scale-100 bg-gradient-to-t from-[#F9D423] to-[#FF6B00] rounded-full m-0 p-0 w-[34px] h-[34px]"
            >
              {" "}
              <ChevronRight size={16} />{" "}
            </Button>
          </div>
        </div>
      </div>
      <div ref={ref} className="py-8 flex gap-6 overflow-x-auto">
        <HotCard />
        <HotCard />
        <HotCard />
        <HotCard />
        <HotCard />
      </div>
    </div>
  );
}
