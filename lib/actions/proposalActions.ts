"use server";

import prisma from "@/lib/prisma";
import { cleanup } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createProposal(postId: string) {
  await prisma.proposal.create({
    data: {
      postId: postId,
    },
  });
}

export async function updateProposal(web3ProposalId: string, postId: string) {
  await prisma.proposal.update({
    where: {
      web3ProposalId: web3ProposalId,
    },
    data: {
      postId: postId,
    },
  });
}
