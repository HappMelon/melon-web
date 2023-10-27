"use client";

import NameLink from "@/components/thread/nameLink";
import { timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";

export default function Reply({
  data,
  comment = false,
  posts,
  noLink = false,
  parent = false,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
  comment?: boolean;
  posts?: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
  noLink?: boolean;
  parent?: boolean;
}) {
  const router = useRouter();
  const likes = data.likes.map((like) => like.userId);

  return (
    <div className="pt-[.625rem] px-[1.875rem] flex">
      <Avatar
        onClick={(e) => {
          router.push(`/profile/${data.author.id}`);
        }}
        size={50}
        className="cursor-pointer"
        src={data.author.image}
        alt={data.author.name + "'s profile image"}
      ></Avatar>
      <div className="flex flex-col pl-[15px]">
        <div className="flex">
          <NameLink id={data.author.id} username={data.author.name} />
          <div className="pl-[.5rem] font-medium text-[.75rem] text-[#9B9B9B]">
            · {timeSince(data.createdAt)} ago
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="pt-[.375rem]"
        ></div>
      </div>
    </div>
  );
}
