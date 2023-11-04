"use client";

import ProposalCard from "@/components/thread/ProposalCard";
import ProposalResult from "@/components/thread/ProposalResult";

export default function Proposal({
  isCurUserPost,
  proposal,
}: {
  isCurUserPost: boolean;
  proposal: {
    id: string;
    postId: string;
    status: number;
    likeRate: number;
    totalInfluence: number;
    web3ProposalId: string;
    result: number;
  };
}) {
  if (proposal.status === 3) return null;

  if (isCurUserPost && proposal.status === 0) {
    return (
      <div>
        <ProposalResult
          type="good"
          // title="High-quality content"
          content="Your submission will be reviewed within 24 hours. Thank you for your patience."
        />
      </div>
    );
  }

  return (
    <div>
      {proposal.result === 2 && (
        <ProposalResult
          type="good"
          title="High-quality content"
          content="The content you staked validation has been assessed by the platform as compliant and of high quality; you will receive a 5% FLR reward. Please check your wallet for details."
        />
      )}

      {proposal.result === 3 && (
        <ProposalResult
          type="bad"
          title="Low-quality content"
          content="The content you staked validation has been assessed by the platform as compliant and of average quality;  staked tokens have been fully refunded. Please check your wallet for details."
        />
      )}

      {proposal.result === 4 && (
        <ProposalResult
          type="bad"
          title="Non-compliance staking"
          content="Your staked validation has been found non-compliant by the platform; corresponding staked tokens have been deducted. Please check your wallet for details."
        />
      )}

      <ProposalCard
        proposalId={proposal.id}
        web3ProposalId={proposal.web3ProposalId}
      />
    </div>
  );
}
