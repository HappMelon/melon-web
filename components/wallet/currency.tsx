"use client";

import Image from "next/image";

export default function Currency() {
  return (
    <div className="flex items-center rounded-[3.125rem] bg-[#f8f8f8] px-[2.25rem] py-[.625rem]">
      <Image
        className="mr-[.5rem]"
        alt="icon-coin"
        src="/icon-coin.svg"
        width={32}
        height={32}
      ></Image>

      <span className="text-lg font-bold mr-[.4rem]">1</span>
      <span
        className="text-lg font-bold mx-[.4rem] bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
        }}
      >
        FLR
      </span>
      <span className="text-lg font-medium mx-[.4rem]">=</span>
      <span className="text-lg font-bold">0.1</span>
      <span className="text-lg font-bold ml-[.4rem]">USD</span>
    </div>
  );
}
