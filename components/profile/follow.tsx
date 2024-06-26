"use client";

import { followUser, unfollowUser } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "../ui/use-toast";

export default function FollowButton({
  isFollowing,
  name,
  id,
  followingId,
  enableScaleSize,
}: {
  isFollowing: boolean;
  enableScaleSize?: boolean;
  name: string;
  id: string;
  followingId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();
  const BtnSizeStyle = enableScaleSize
    ? "w-[70px] 2xl:w-[95px] text-sm 2xl:text-md"
    : "w-[95px]";

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        toast({
          title: isFollowing ? "Unfollowed " + name : "Followed " + name,
        });
        startTransition(() => {
          if (isFollowing) {
            unfollowUser(id, followingId, pathname);
          } else {
            followUser(id, followingId, pathname);
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
          className={`cursor-pointer flex rounded-[2.5rem] justify-center py-[.5rem] text-white m-[2px] ${BtnSizeStyle}`}
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
            className={`m-[2px] text-center py-[.5rem] rounded-[2.5rem] bg-white ${BtnSizeStyle}`}
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
