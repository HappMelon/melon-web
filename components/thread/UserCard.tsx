"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";

import FollowButton from "@/components/profile/follow";

export default function UserCard({
  user,
}: {
  user: {
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
    onboarded: boolean;
  };
}) {
  return (
    <div className="w-full box-border px-[1.75rem] py-[1.5rem] bg-white border border-[#e6e6e6] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex">
        <div className="shrink-0 w-fit">
          <Image
            src={user.image}
            alt=""
            width={42}
            height={42}
            className="border-2 border-white/80 rounded-[1.25rem]"
          />
        </div>

        <div className="flex-1 px-[.75rem] text-left">
          <div className="text-base font-medium mb-[.1875rem]">
            {user?.name}
          </div>
          <div className="text-sm font-medium">{`@${user?.username}`}</div>
        </div>

        <div>
          <FollowButton
            id={user!.id}
            followingId={user!.id}
            name={user!.username}
            isFollowing={false}
          />
        </div>
      </div>

      <div className="mt-[1rem] pl-[3.4375rem] pr-[.875rem] text-[#9B9B9B] text-sm leading-normal">
        A web3 enthusiast. Crypto Investor. Tech Girl. Flare Premium. Invest for
        freedom. Multi-FIRE Advocate.
      </div>
    </div>
  );
}
