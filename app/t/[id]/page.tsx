import Reply from "@/components/t/Reply";
import Item from "@/components/thread";
import MainItem from "@/components/thread/main";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import UserCard from "@/components/thread/UserCard";
import BetCard from "@/components/thread/BetCard";
import BetResult from "@/components/thread/BetResult";

export const revalidate = 0;

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
      },
      parent: {
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: {
            include: {
              author: true,
            },
          },
          likes: true,
        },
      },
      likes: true,
    },
  });

  if (!post) {
    return <div className="text-center text-neutral-600">Post not found.</div>;
  }

  return (
    <>
      {post.parent && post.parent.parent ? (
        <Link href={"/t/" + post.parent.parentId}>
          <Button
            size="sm"
            variant="ghost"
            className="flex pl-2 text-neutral-600"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            <div className="overflow-hidden rounded-full h-4 w-4 mr-2 bg-neutral-600">
              <Image
                src={post.parent.parent.author.image}
                alt={post.parent.parent.author.name + "'s avatar"}
                width={42}
                height={42}
              />
            </div>
            See earlier reply
          </Button>
        </Link>
      ) : null}
      {post.parent ? (
        <Item key={post.parent.id} parent data={post.parent} />
      ) : null}
      <div className="flex">
        <div className="flex-1">
          <MainItem key={post.id} data={post} />
          {/* commit */}
          <div className="pb-[23px]">
            {post.children.map((child) => (
              <Reply key={child.id} data={child} />
            ))}
          </div>
        </div>

        <div className="shrink-0 w-[22.9375rem] box-content px-[1.875rem] pb-[1.875rem] border-l border-[#e6e6e6] space-y-[1.875rem]">
          <UserCard user={post.author} />

          <BetResult
            type="good"
            title="High-quality content"
            content="The content you betted  Prediction has been assessed by the platform as compliant and of high quality; you will receive a 5% FLR reward. Please check your wallet for details."
          />

          <BetResult
            type="bad"
            title="Low-quality content"
            content="The content you betted prediction has been assessed by the platform as compliant and of average quality;  staked tokens have been fully refunded. Please check your wallet for details."
          />

          <BetResult
            type="bad"
            title="Non-compliance betting"
            content="Your betted prediction has been found non-compliant by the platform; corresponding staked tokens have been deducted. Please check your wallet for details."
          />

          <BetCard content="other no bet" />
          <BetCard content="other bet pending" />
          <BetCard content="other bet ends" />

          <BetCard content="self no bet Make a betting" />

          <BetCard content="self bet pending" />

          <div>betting-user-list</div>
          <div>share-with-friend</div>
        </div>
      </div>
    </>
  );
}
