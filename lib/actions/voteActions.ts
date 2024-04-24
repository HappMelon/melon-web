"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

export async function addVoteRecord(
  postId: string,
  proposalId: string,
  web3ProposalId: string,
  userId: string,
  userAddress: string,
  optionId: string,
  voteAmount: number,
  path: string,
) {
  await prisma.voteRecord.create({
    data: {
      postId: postId,
      proposalId: proposalId,
      web3ProposalId: web3ProposalId,
      userId: userId,
      userAddress: userAddress,
      optionId: optionId,
      voteAmount: voteAmount,
    },
  });

  revalidatePath(path);
}

export async function getVoteRecords(web3ProposalId: string, account: string) {
  const voteRecords = await prisma.voteRecord.findMany({
    where: {
      web3ProposalId: web3ProposalId,
      userAddress: account,
    },
  });

  return voteRecords;
}

export async function getUserVotingHistory(account: string) {
  const voteRecords = await prisma.voteRecord.findMany({
    where: {
      userAddress: account,
    },
  });
  return voteRecords;
}
