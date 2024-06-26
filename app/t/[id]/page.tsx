import Reply from "@/components/t/Reply";
import Item from "@/components/thread";
import MainItem from "@/components/thread/main";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/thread/UserCard";
import Proposal from "@/components/thread/Proposal";

import MakeStake from "@/components/thread/MakeStake";

export const revalidate = 0;

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await currentUser();

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  const isWeb3User = !!user?.primaryWeb3WalletId;

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
      proposals: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    return <div className="text-center text-neutral-600">Post not found.</div>;
  }

  const isCurUserPost = post?.author.id === user?.id;

  console.log("======= isCurUserPost", isCurUserPost);

  const proposals = post?.proposals;
  console.log("=======proposal", proposals);
  const activeProposal = !!proposals.length ? proposals[0] : null;
  // const

  console.log("=======activeProposal", activeProposal);

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
          <MainItem avatar={getUser.image} key={post.id} data={post} />
          {/* commit */}
          <div className="pb-[23px]">
            {post.children.map((child) => (
              <Reply key={child.id} data={child} />
            ))}
          </div>
        </div>

        <div className="shrink-0 w-[22.9375rem] box-content px-[1.875rem] pb-[1.875rem] border-l border-[#e6e6e6] space-y-[1.875rem]">
          <UserCard user={post.author} />

          {isCurUserPost && !post?.proposals?.length && (
            <MakeStake isWeb3User={isWeb3User} postId={post.id} type="Init" />
          )}

          {isCurUserPost && !!activeProposal && activeProposal.status > 1 && (
            <MakeStake isWeb3User={isWeb3User} postId={post.id} type="Retry" />
          )}

          {!!activeProposal && activeProposal.status <= 1 && (
            <Proposal
              isCurUserPost={isCurUserPost}
              userId={user?.id || ""}
              proposal={{
                id: activeProposal.id,
                postId: activeProposal.postId,
                status: activeProposal.status,
                likeRate: activeProposal.likeRate,
                totalInfluence: activeProposal.totalInfluence,
                web3ProposalId: activeProposal.web3ProposalId,
                result: activeProposal.result,
                userAddress: activeProposal.userAddress,
                userStakeId: activeProposal.userStakeId,
                userStakeAmount: activeProposal.userStakeAmount,
                unLockTime: activeProposal.unLockTime,
                stakeOption1: activeProposal.option1,
                stakeOption2: activeProposal.option2,
              }}
            />
          )}

          {/* TODO: hardcode for demo */}
          {/* {isWeb3User && <DemoProposal proposalId={"1"} />} */}
        </div>
      </div>
    </>
  );
}
