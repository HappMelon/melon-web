"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function recordVote(
  postId: string,
  proposalId: string,
  web3ProposalId: string,
  userId: string,
  path: string,
) {
  await prisma.voteRecord.create({
    data: {
      postId: postId,
      proposalId: proposalId,
      web3ProposalId: web3ProposalId,
      userId: userId,
    },
  });

  revalidatePath(path);
}
