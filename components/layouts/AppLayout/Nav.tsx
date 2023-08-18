"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");

  useEffect(() => {}, [value]);

  function SwitchRouter(pathname: string) {
    router.push(pathname);
    setValue(pathname);
  }

  return (
    <div className={cn("", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant={
                pathname === "/explore"
                  ? "secondary"
                  : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter("/explore")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Trending
            </Button>
            <Button
              variant={
                pathname === "/mill" ? "secondary" : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter("/mill")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Mill
            </Button>
            <Button
              variant={
                pathname === "/wallet"
                  ? "secondary"
                  : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter("/wallet")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="m16 6 4 14" />
                <path d="M12 6v14" />
                <path d="M8 8v12" />
                <path d="M4 4v16" />
              </svg>
              Wallet
            </Button>
            <Button
              variant={
                pathname === "/premium"
                  ? "secondary"
                  : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter("/premium")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Flare Premium
            </Button>
            <Button
              variant={
                pathname === "/post" ? "secondary" : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter("/post")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
