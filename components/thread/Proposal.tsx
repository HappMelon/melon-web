"use client";

import ProposalCard from "@/components/thread/ProposalCard";
import ProposalResult from "@/components/thread/ProposalResult";

export default function Proposal({ proposalId }: { proposalId: string }) {
  return (
    <div>
      <ProposalResult
        type="good"
        title="High-quality content"
        content="The content you staked validation has been assessed by the platform as compliant and of high quality; you will receive a 5% FLR reward. Please check your wallet for details."
      />

      <ProposalResult
        type="bad"
        title="Low-quality content"
        content="The content you staked validation has been assessed by the platform as compliant and of average quality;  staked tokens have been fully refunded. Please check your wallet for details."
      />

      <ProposalResult
        type="bad"
        title="Non-compliance staking"
        content="Your staked validation has been found non-compliant by the platform; corresponding staked tokens have been deducted. Please check your wallet for details."
      />

      <ProposalCard status="Unstarted" totalPrice={110} />
      <ProposalCard status="Ongoing" totalPrice={120} inputPrice={30} />
      <ProposalCard status="Finished" totalPrice={130} inputPrice={20} />

      {/* <ProposalCard content="self no stake Make a staking" /> */}

      {/* <ProposalCard content="self stake pending" /> */}

      <div>staking-user-list</div>
      <div>share-with-friend</div>
    </div>
  );
}
