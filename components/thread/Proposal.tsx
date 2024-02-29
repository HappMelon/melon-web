"use client";

import ProposalCard from "@/components/thread/ProposalCard";
import ProposalResult from "@/components/thread/ProposalResult";

export default function Proposal({
  isCurUserPost,
  userId,
  proposal,
}: {
  isCurUserPost: boolean;
  userId: string;
  proposal: {
    id: string;
    postId: string;
    status: number;
    likeRate: number;
    totalInfluence: number;
    web3ProposalId: string;
    result: number;
    userAddress: string;
    userStakeId: string;
    userStakeAmount: number;
    unLockTime: string;
    stakeOption1: string;
    stakeOption2: string;
  };
}) {
  // case1: user proposaled and waiting for review
  if (proposal.status === 0) {
    if (isCurUserPost) {
      return (
        <ProposalResult
          type="good"
          // title="High-quality content"
          content="Your submission will be reviewed within 24 hours. Thank you for your patience."
        />
      );
    }

    return null;
  }

  // case2: proposal.status === 1  ongoing or finished
  return (
    <div>
      {/* case2: get good result */}
      {proposal.result === 2 && (
        <ProposalResult
          type="good"
          title="High-quality content"
          content="The content you staked validation has been assessed by the platform as compliant and of high quality; you will receive a 5% FLR reward. Please check your wallet for details."
        />
      )}

      {/* case3: get bad result */}
      {proposal.result === 3 && (
        <ProposalResult
          type="bad"
          title="Low-quality content"
          content="The content you staked validation has been assessed by the platform as compliant and of average quality;  staked tokens have been fully refunded. Please check your wallet for details."
        />
      )}

      {/* case4: get bad result */}
      {proposal.result === 4 && (
        <ProposalResult
          type="bad"
          title="Non-compliance staking"
          content="Your staked validation has been found non-compliant by the platform; corresponding staked tokens have been deducted. Please check your wallet for details."
        />
      )}

      {/* case5: proposal onGoing */}
      <ProposalCard
        isCurUserPost={isCurUserPost}
        userAddress={proposal.userAddress}
        userStakeId={proposal.userStakeId}
        userStakeAmount={proposal.userStakeAmount}
        unLockTime={proposal.unLockTime}
        proposalId={proposal.id}
        web3ProposalId={proposal.web3ProposalId}
        proposalStatus={proposal.status}
        proposalResult={proposal.result}
        stakeOption1={proposal.stakeOption1}
        stakeOption2={proposal.stakeOption2}
        postId={proposal.postId}
        userId={userId}
      />
    </div>
  );
}
