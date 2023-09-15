"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="pl-[1.875rem]">
      <img src="/back.svg" alt="" />
    </button>
  );
}
