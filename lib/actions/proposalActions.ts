"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProposal(
  postId: string,
  likeRate: number,
  totalInfluence: number,
  path: string,
) {
  await prisma.proposal.create({
    data: {
      postId: postId,

      likeRate: likeRate,
      totalInfluence: totalInfluence,
      // default values
      duration: 604800, // 7 days
      web3ProposalId: "",
      status: 0,
      result: 0,
    },
  });

  revalidatePath(path);
}
