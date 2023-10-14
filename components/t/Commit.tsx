"use client";

import Like from "@/components/thread/controls/like";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { replyToThread } from "@/lib/actions";
import { currentUser, useUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import Reposts from "./Reposts";

export default function Commit({
  data,
  avatar,
}: {
  avatar?: string;
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
  const likes = data.likes.map((like) => like.userId);
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);
  const [comment, setComment] = useState("");
  const { isSignedIn, isLoaded, user } = useUser();
  const pathname = usePathname();
  return (
    <div className="mb-[1.4375rem]">
      <div className="flex justify-end mt-[15.5px] mb-[14.5px]">
        <div className="flex items-center gap-[1.25rem]">
          <div className="flex items-center gap-[6px]">
            <img src="/views.svg" alt="" />
            <div>{data.views}</div>
          </div>
          <div className="flex items-center gap-[6px]">
            <Like likes={likes} post={data.id} />
            <div>
              {data.likes.length > 0 ? <div>{data.likes.length}</div> : 0}
            </div>
          </div>
          <div className="flex items-center gap-[6px] cursor-pointer">
            <img src="/commit.svg" alt="" />
            <div>{data.children.length}</div>
          </div>
          <Reposts data={data} />
        </div>
      </div>
      <div className="flex items-center relative">
        <Image
          src={avatar || ""}
          height={50}
          width={50}
          className="rounded-full"
          alt={data.author.name + "'s profile image"}
        />
        <Input
          value={comment}
          onChange={(e) => {
            if (e.target.value.length > 200) return;
            setComment(e.target.value);
          }}
          className="ml-[1rem] rounded-[1.5625rem] py-[1.5625rem] pl-[1.625rem]"
        />
        <Button
          className="absolute right-[.5rem] rounded-[1.875rem] my-[7px]"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          onClick={() => {
            if (!comment.trim()) {
              return;
            }
            startTransition(async () => {
              await replyToThread(comment, user!.id, data.id, pathname);
              setComment("");
            });
            setClicked(true);
          }}
        >
          Respond
        </Button>
      </div>
    </div>
  );
}
