"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  connectWallet,
  addProposal,
  addOption,
  setVotingDurationForProposal,
} from "@/web3/action";

import Link from "next/link";
import { useEffect, useState } from "react";

import { updateProposal } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";

import {
  NEXT_PUBLIC_PROPOSAL_ID,
  NEXT_PUBLIC_PROPOSAL_OPTION_ID,
} from "@/web3/abi";

export default function ProposalList({
  proposalList,
}: {
  proposalList: Array<{
    id: string;
    postId: string;
    status: number;
    likeRate: number;
    totalInfluence: number;
    web3ProposalId: string;
    result: number;
    createdAt: Date;
    duration: number;
  }>;
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [web3ProposalId, setWeb3ProposalId] = useState("");

  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [actionPending, setActionPending] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    initConnectWallet();
  }, []);

  const initConnectWallet = async () => {
    await connectWallet().then((res) => {
      console.log("======res======", res);
      // @ts-ignore
      setProvider(res.provider);
      // @ts-ignore
      setAccount(res.account);
      // @ts-ignore
      setSigner(res.signer);
    });
  };

  const declineProposal = async () => {
    if (selectedProposal === null) return;

    // @ts-ignore
    await updateProposal(selectedProposal.id, 2, 0, "");
    setActionPending(false);
    setShowReviewDialog(false);
  };

  const approveAndSubmitProposal = async () => {
    if (selectedProposal === null) return;

    // @ts-ignore
    const web3Proposal = await addProposal(
      signer,
      selectedProposal.postId,
    ).catch((err) => {
      toast({
        title: `${err}`,
      });
    });

    await addOption(signer, web3Proposal.id, "True").catch((err) => {
      toast({
        title: `${err}`,
      });
    });

    // @ts-ignore
    await setVotingDurationForProposal(
      signer,
      web3Proposal.id,
      selectedProposal.duration,
    ).catch((err) => {
      toast({
        title: `${err}`,
      });
    });

    // @ts-ignore
    await updateProposal(selectedProposal.id, 1, 1, web3Proposal.id.toString())
      .then(() => {
        toast({
          title: "Proposal approved",
        });
      })
      .catch((err) => {
        toast({
          title: `${err}`,
        });
      })
      .finally(() => {
        setActionPending(false);
        setShowReviewDialog(false);
      });
  };

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Proposals
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the proposals.
            </p>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add proposal
              </button>
            </div> */}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PostLink
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rules
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CreateAt
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Review</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {proposalList.map((proposal) => (
                    <tr key={proposal.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {proposal.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 underline">
                        <Link href={`/t/${proposal.postId}`} target="_blank">
                          {proposal.postId}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <p>{`likes + comments + shares >= ${proposal.totalInfluence}`}</p>
                        <p>{`likes/views ratio >= ${proposal.likeRate}`}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(proposal.createdAt).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {proposal.status === 0 && "Pending"}
                        {proposal.status === 1 && "Approved"}
                        {proposal.status === 2 && "Declined"}
                        {proposal.status === 3 && "Non-compliant"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {proposal.result === 0 && "Not Started"}
                        {proposal.result === 1 && "On Going"}
                        {proposal.result === 2 && "Good"}
                        {proposal.result === 3 && "Bad"}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <div
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            if (showReviewDialog) return;

                            // @ts-ignore
                            setSelectedProposal(proposal);
                            setShowReviewDialog(true);
                          }}
                        >
                          Review
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
              Make A Proposal
            </DialogTitle>
          </DialogHeader>

          <div className="flex px-[1.625rem] mb-[1rem] space-x-5 ">
            <Button
              className="w-full rounded-[40px] text-lg"
              onClick={() => {
                // onBtnClick();
                if (actionPending) return;
                console.log("reject");
                declineProposal();
              }}
            >
              Decline
            </Button>

            <Button
              className="w-full rounded-[40px] text-lg"
              style={{
                background:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
              onClick={() => {
                // onBtnClick();
                if (actionPending) return;
                console.log("approved");
                approveAndSubmitProposal();
              }}
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
