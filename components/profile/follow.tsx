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
}: {
  isFollowing: boolean;
  name: string;
  id: string;
  followingId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

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
      className="cursor-pointer flex rounded-[2.5rem] px-[.875rem] py-[.5rem] text-white"
      style={{
        background: "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
      }}
    >
      <img src="/🦆 icon _plus_.svg" alt="" className="pr-[.375rem]" />
      <div>
        {isPending ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : isFollowing ? (
          "Following"
        ) : (
          "Follow"
        )}
      </div>
    </div>
  );
}
