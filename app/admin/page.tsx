import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ProposalList from "@/components/admin/proposalList";

export default async function Page() {
  const user = await currentUser();

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  const userAddress = user?.web3Wallets[0]?.web3Wallet;

  console.log("======userAddress", userAddress);

  // TODO: HARD CODE for addmin address
  if (
    userAddress?.toLocaleLowerCase() !==
    "0xc0ee714715108b1a6795391f7e05a044d795ba70"
  ) {
    return (
      <div className="flex w-full h-full box-border pl-[1.875rem]">
        <div className="w-full bg-white rounded-t-[.9375rem] p-[1.875rem] font-bold text-xl text-center ">
          No Permission
        </div>
      </div>
    );
  }

  const proposalList = await prisma.proposal.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // const parsedProposalList = proposalList.map((proposal) => {
  //   return {
  //     id: proposal.id,
  //     postId: proposal.postId,
  //     status: proposal.status,
  //     likeRate: proposal.likeRate,
  //     totalInfluence: proposal.totalInfluence,
  //     web3ProposalId: proposal.web3ProposalId,
  //     result: proposal.result,
  //     createdAt: proposal.createdAt,
  //   };
  // });

  return (
    <div className="flex w-full h-full box-border pl-[1.875rem]">
      <div className="w-full bg-white rounded-t-[.9375rem] p-[1.875rem]">
        {/* <ProposalList proposalList={parsedProposalList} /> */}
        <ProposalList proposalList={proposalList} />
      </div>
    </div>
  );
}
