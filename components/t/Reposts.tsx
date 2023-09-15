"use client";

import ShareButton from "@/components/thread/controls/share";
import { reposts } from "@/lib/actions";
import { Prisma } from "@prisma/client";

export default function Reposts({
  data,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
          children: true;
          parent: true;
          likes: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
}) {
  return (
    <div className="flex items-center gap-[6px] cursor-pointer">
      <ShareButton post={data.id} name={data.author.name} />
      <div>{data.reposts}</div>
    </div>
  );
}
