"use client";

import { Explore } from "@/components/search/explore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetPath } from "@/hook/useGetPath";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  const { pathname } = useGetPath();
  const blur = pathname === "/sign-in" || pathname === "/sign-up";
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <main
      className={`flex w-full h-[4.875rem] bg-white px-[2.6875rem] fixed top-0 z-10${
        blur ? "pointer-events-none filter blur-[2px]" : ""
      }`}
    >
      <div className="flex w-full justify-start items-center">
        <div className="flex justify-start items-center">
          <img src="/logo.png" alt="Logo" />
          <div className="font-bold text-2xl whitespace-nowrap">Flare Dapp</div>
        </div>
        <Explore />
      </div>
      <div className="flex items-center">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user.imageUrl}
                alt=""
                width={61}
                height={61}
                className="rounded-[3.125rem]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              className="px-[1.75rem] pt-[23px] pb-[21px]"
            >
              <DropdownMenuItem className="gap-[11px]">
                <img src="/profile.svg" alt="" />
                <div className="text-[1.125rem] font-bold">View profile</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-[14px]">
                <img src="/reset.svg" alt="" />
                <div className="text-[1.125rem] font-bold">Reset password</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-[15px]">
                <img src="/logout.svg" alt="" />
                <div className="text-[1.125rem] font-bold">
                  <SignOutButton>Log out</SignOutButton>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className="rounded-[2.5rem] px-[3.125rem] py-[.85rem] text-white cursor-pointer whitespace-nowrap"
            style={{
              background:
                "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
            }}
            onClick={() => {
              window.location.href = "/sign-in";
            }}
          >
            Log In
          </div>
        )}
      </div>
    </main>
  );
}
