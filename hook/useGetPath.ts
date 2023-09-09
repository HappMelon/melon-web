"use client";

import { usePathname } from "next/navigation";

export const useGetPath = () => {
  const pathname = usePathname();
  return { pathname };
};
