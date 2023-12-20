"use client";

import {
  followMill,
  followUser,
  unFollowMill,
  unfollowUser,
} from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

export function MillFollowButton({
  isFollowing,
  millId,
}: {
  isFollowing: boolean;
  millId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (!user) {
          return;
        }
        startTransition(async () => {
          if (isFollowing) {
            await unFollowMill(user.id, millId, pathname);
          } else {
            await followMill(user.id, millId, pathname);
          }
        });
      }}
    >
      {!isFollowing ? (
        <div
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          className={`cursor-pointer flex rounded-[2.5rem] justify-center py-[.5rem] text-white m-[2px] w-[70px] 2xl:w-[95px] text-sm 2xl:text-md`}
        >
          {isPending ? (
            <Loader2 className="animate-spin w-[67.5px] h-[19px]" />
          ) : (
            <>
              <img src="/plus.svg" alt="" className="pr-[.375rem]" />
              <div>Follow</div>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          className="cursor-pointer flex rounded-[2.5rem] bg-white"
        >
          <div
            className={`m-[2px] text-center py-[.5rem] rounded-[2.5rem] bg-white w-[70px] 2xl:w-[95px] text-sm 2xl:text-md`}
          >
            {isPending ? (
              <Loader2 className="animate-spin w-[67.5px] h-[19px]" />
            ) : (
              <>
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#F9D423] to-[#F83600]">
                  Following
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
