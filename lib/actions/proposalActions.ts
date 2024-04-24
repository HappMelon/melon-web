"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProposal(
  postId: string,
  likeRate: number,
  totalInfluence: number,
  stakeOption1: string,
  stakeOption2: string,
  userAddress: string,
  userStakeId: string,
  userStakeAmount: number,
  unLockTime: string,
  path: string,
  duration: number, // minute
) {
  await prisma.proposal.create({
    data: {
      postId: postId,

      likeRate: likeRate,
      totalInfluence: totalInfluence,

      option1: stakeOption1,
      option2: stakeOption2,

      userAddress: userAddress,
      userStakeId: userStakeId,
      userStakeAmount: userStakeAmount,
      unLockTime: unLockTime,

      // default values
      duration: duration, // 7 days
      web3ProposalId: "",
      status: 0,
      result: 0,
    },
  });

  revalidatePath(path);
}

export async function updateProposal(
  id: string,
  status: number,
  result: number,
  web3ProposalId: string,
  unLockTime: string,
) {
  const proposal = await prisma.proposal.update({
    where: { id },
    data: {
      status: status,
      result: result,
      web3ProposalId: web3ProposalId,
      unLockTime: unLockTime,
    },
  });

  return proposal;
}

export async function upProposal(id: string, result: number) {
  const proposal = await prisma.proposal.update({
    where: { id },
    data: {
      result: result,
    },
  });

  return proposal;
}
