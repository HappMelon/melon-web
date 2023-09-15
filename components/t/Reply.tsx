"use client";

import NameLink from "@/components/thread/nameLink";
import { timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
      <Image
        src={data.author.image}
        height={50}
        width={50}
        className="rounded-full"
        alt={data.author.name + "'s profile image"}
      />
      <div className="flex flex-col pl-[15px]">
        <div className="flex">
          <div className="flex">
            <div>@</div>
            <NameLink username={data.author.name} name={data.author.username} />
          </div>
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
