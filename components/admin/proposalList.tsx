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
  sleep,
  connectWallet,
  processStakedProposal,
  listentingProposalForUserAdded,
  fetchProposalOptions,
  settleRewards,
  getProposalsDetail,
  getWinningOptionByProposal,
} from "@/web3/action";

import Link from "next/link";
import { useEffect, useState } from "react";

import { upProposal, updateProposal } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";

import {
  NEXT_PUBLIC_PROPOSAL_ID,
  NEXT_PUBLIC_PROPOSAL_OPTION_ID,
} from "@/web3/abi";
import { Checkbox } from "@/components/ui/checkbox";

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
    userAddress: string;
    userStakeId: string;
    userStakeAmount: number;
    unLockTime: string;
  }>;
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [web3ProposalId, setWeb3ProposalId] = useState("");

  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [actionPending, setActionPending] = useState(false);
  const [showJudgmentDialog, setShowJudgmentDialog] = useState(false);
  const [userVoteOptionId, setUserVoteOptionId] = useState("");
  const [option1Amount, setOption1Amount] = useState(0);
  const [option2Amount, setOption2Amount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProposalEnd, setSelectedProposalEnd] = useState(false);
  const [proposalEnd, setProposalEnd] = useState(false);
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

    setActionPending(true);
    // @ts-ignore
    await updateProposal(selectedProposal.id, 2, 0, "").finally(() => {
      setActionPending(false);
      setShowReviewDialog(false);
    });
  };

  const approveAndSubmitProposal = async () => {
    if (selectedProposal === null) return;
    setActionPending(true);

    // @ts-ignore
    await processStakedProposal(
      signer,
      // @ts-ignore
      selectedProposal.userAddress,
      // @ts-ignore
      selectedProposal.postId,
      // @ts-ignore
      selectedProposal.userStakeAmount,
      // default only one option "true"
      "yes,no",
      // @ts-ignore
      selectedProposal.userStakeId,
      // @ts-ignore
      selectedProposal.unLockTime,
    )
      .then(async (res) => {
        console.log("=======res=======", res);

        console.log("=====returnedProposalId=====", res);

        setWeb3ProposalId(res);

        await sleep(10000);

        await onProposalAdded(res.toString());
      })
      .catch((err) => {
        console.log("=====approveAndSubmitProposal err", err);
        toast({
          title: `${err}`,
        });
      });

    setActionPending(false);
  };

  const onProposalAdded = async (proposalId: string) => {
    console.log("=====onProposalAdded=====", proposalId);
    console.log("=====selectedProposal=====", selectedProposal);

    // @ts-ignore
    await updateProposal(selectedProposal.id, 1, 1, proposalId)
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

  const upProposalFunc = () => {
    // @ts-ignore
    upProposal(selectedProposal.id, 4)
      .then(() => {
        console.log("update Proposal end");
      })
      .catch((err) => {
        console.log("update Proposal end err:", err);
      });
  };

  const getProposalDetails = (wpid: number, userStakeAmount: number) => {
    fetchProposalOptions(signer, wpid)
      .then((proposalDetails) => {
        let totalPrice = 0;
        let option1Amount = 0;
        let option2Amount = 0;
        proposalDetails?.options.map((option) => {
          totalPrice += Number(option.voteCount);

          if (option.index === 0) {
            option1Amount += Number(option.voteCount);
          } else {
            option2Amount += Number(option.voteCount);
          }
        });
        // @ts-ignore
        setTotalPrice(totalPrice + userStakeAmount);
        setOption1Amount(option1Amount);
        setOption2Amount(option2Amount);
      })
      .catch((err) => {
        console.log("======err======", err);
      });
  };

  const judgmentFunc = () => {
    if (userVoteOptionId === "") {
      toast({
        title: "Please select an option",
      });
      return;
    }
    settleRewards(signer, web3ProposalId, userVoteOptionId)
      .then(() => {
        toast({
          title: "Settlement successful",
        });
        upProposalFunc();
        setShowJudgmentDialog(false);
      })
      .catch((err) => {
        console.log("======err======", err);
        toast({
          title: `Settlement failed`,
        });
      });
  };

  const getProposalsDetailFunc = (wpid: number) => {
    getProposalsDetail(signer, wpid).then(
      (res: {
        endTime: number;
        isSettled: boolean | ((prevState: boolean) => boolean);
      }) => {
        setProposalEnd(res.isSettled);
        if (!res.isSettled) return;
        getWinningOptionByProposal(signer, wpid)
          .then((winOptionId: any) => {
            setUserVoteOptionId(String(winOptionId));
          })
          .catch((err: any) => {
            console.log("======getWinningOptionByProposal======", err);
          });
      },
    );
  };

  const jJudgmentClickFunc = (proposal: any) => {
    setUserVoteOptionId("");
    // @ts-ignore
    setSelectedProposal(proposal);
    setShowJudgmentDialog(true);
  };

  useEffect(() => {
    if (selectedProposal === null) return;
    // @ts-ignore
    const ti = new Date(selectedProposal.unLockTime).getTime();
    const t = Date.now() > ti ? true : false;

    setSelectedProposalEnd(t);
    // @ts-ignore
    setWeb3ProposalId(selectedProposal.web3ProposalId);
  }, [selectedProposal]);
  // @ts-ignore
  useEffect(() => {
    if (web3ProposalId === null || selectedProposal === null) return;
    // @ts-ignore
    getProposalDetails(
      Number(selectedProposal?.web3ProposalId),
      selectedProposal.userStakeAmount,
    );
    // @ts-ignore
    getProposalsDetailFunc(selectedProposal.web3ProposalId);
  }, [web3ProposalId]);

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
                    <tr key={`${proposal.id}-${proposal.status}`}>
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
                        {proposal.result === 4 && "End"}
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <div
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                          onClick={() => jJudgmentClickFunc(proposal)}
                        >
                          Judgment
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
              disabled={actionPending}
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
              disabled={actionPending}
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showJudgmentDialog} onOpenChange={setShowJudgmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
              Proposal Result Judgment
            </DialogTitle>
          </DialogHeader>

          <div className="flex px-[1.625rem] mb-[1rem] space-y-8 flex-col">
            <div className="space-y-4">
              <div className="flex flex-row space-x-4 items-center">
                <Checkbox
                  id="Option1"
                  checked={userVoteOptionId === "0"}
                  onCheckedChange={() => setUserVoteOptionId("0")}
                  disabled={proposalEnd}
                />
                <label htmlFor="Option1" className="w-full items-center">
                  <div
                    className="flex rounded-[.625rem] p-[.5rem] items-center cursor-pointer space-x-8"
                    style={{
                      boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
                      background:
                        userVoteOptionId === "0"
                          ? "linear-gradient(100deg, rgba(249, 212, 35, 0.1) -12.68%, rgba(248, 54, 0, 0.2) 147.82%)"
                          : "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
                    }}
                    onClick={() => {
                      if (!proposalEnd) setUserVoteOptionId("0");
                    }}
                  >
                    <div
                      className="rounded-[.625rem] p-[.5rem] text-[#9B9B9B] text-sm font-bold shrink-0 pr-8"
                      style={{
                        background:
                          "linear-gradient(100deg, rgba(249, 212, 35, 0.10) -12.68%, rgba(248, 54, 0, 0.10) 147.82%)",
                      }}
                    >
                      Option 1
                    </div>
                    <div
                      className="bg-clip-text text-transparent text-lg font-bold shrink-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                      }}
                    >
                      {option1Amount} ({totalPrice} FLR)
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex flex-row space-x-4 items-center">
                <Checkbox
                  id="Option2"
                  checked={userVoteOptionId === "1"}
                  onCheckedChange={() => setUserVoteOptionId("1")}
                  disabled={proposalEnd}
                />
                <label htmlFor="Option2" className="w-full items-center">
                  <div
                    className="flex rounded-[.625rem] p-[.5rem] items-center cursor-pointer space-x-8"
                    style={{
                      boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
                      background:
                        userVoteOptionId === "1"
                          ? "linear-gradient(100deg, rgba(249, 212, 35, 0.1) -12.68%, rgba(248, 54, 0, 0.2) 147.82%)"
                          : "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
                    }}
                    onClick={() => {
                      if (!proposalEnd) setUserVoteOptionId("1");
                    }}
                  >
                    <div
                      className="rounded-[.625rem] p-[.5rem] text-[#9B9B9B] text-sm font-bold shrink-0  pr-8"
                      style={{
                        background:
                          "linear-gradient(100deg, rgba(249, 212, 35, 0.10) -12.68%, rgba(248, 54, 0, 0.10) 147.82%)",
                      }}
                    >
                      Option 2
                    </div>
                    <div
                      className="bg-clip-text text-transparent text-lg font-bold shrink-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                      }}
                    >
                      {option2Amount} ({totalPrice} FLR)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <Button
              className={"w-full rounded-[40px] text-lg mt-16"}
              style={{
                background:
                  !selectedProposalEnd || proposalEnd
                    ? "bg-[#9B9B9B]"
                    : "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
              onClick={() => {
                judgmentFunc();
              }}
              disabled={!selectedProposalEnd || proposalEnd}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
