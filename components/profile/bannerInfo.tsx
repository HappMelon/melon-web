"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { EditProfileModal } from "@/components/profile/editProfile";

export function BannerInfo({
  user,
  isCurUser,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      posts: true;
      likes: true;
      following: true;
      followedBy: true;
    };
  }>;
  isCurUser: boolean;
}) {
  return (
    <div className="w-full box-border overflow-visible flex p-[1.875rem] h-[13.5rem] text-white bg-gradient-to-r from-gray-900 from-10% via-indigo-900 via-85% to-indigo-800 to-100%">
      {user && (
        <Image
          src={user.image}
          alt=""
          width={206}
          height={206}
          className="shrink-0 border-2 border-white/20 rounded-[1.25rem] w-[12.875rem] h-[12.875rem]"
        />
      )}

      <div className="grow mx-[1.625rem]">
        <div className="my-[1.625rem]">
          <div className="text-2xl">{user?.name}</div>
          <div className="text-base">{`@${user?.username}`}</div>
        </div>
        <div className="text-sm">{user?.bio}</div>
      </div>

      <div className="flex flex-col-reverse items-end justify-between shrink-0 ">
        <div className="flex">
          <div>
            <span className="mr-[.5rem]">Posts</span>
            <span className="text-[1.75rem] font-bold">
              {user.posts?.length ?? 0}
            </span>
          </div>
          <div className="ml-[2.25rem]">
            <span className="mr-[.5rem]">Subscribers</span>
            <span className="text-[1.75rem] font-bold">
              {user.followedBy?.length ?? 0}
            </span>
          </div>
          <div className="ml-[2.25rem]">
            <span className="mr-[.5rem]">Following</span>
            <span className="text-[1.75rem] font-bold">
              {user.following?.length ?? 0}
            </span>
          </div>
        </div>

        {isCurUser && <EditProfileModal data={user} />}
      </div>
    </div>
  );
}
