"use client";

import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";
import { useGetPath } from "@/hook/useGetPath";

export default function TopicsAndAuthors() {
  const { pathname } = useGetPath();
  const blur = pathname === "/sign-in" || pathname === "/sign-up";
  return (
    <div
      className={`w-[21.875rem] fixed top-[6.75rem] right-[2.6875rem] ${
        blur ? "pointer-events-none filter blur-[4px]" : ""
      }`}
    >
      <HotTopics />
      <PopularAuthors />
    </div>
  );
}
