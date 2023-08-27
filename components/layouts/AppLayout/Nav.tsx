"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string | null;
}

export function Sidebar({ className, username }: SidebarProps) {
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
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
              Post
            </Button>
            <Button
              variant={
                pathname === `/${username}`
                  ? "secondary"
                  : ("ghost" as unknown as any)
              }
              className="w-full justify-start"
              onClick={() => SwitchRouter(`/${username}`)}
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
              Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
