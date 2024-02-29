"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Countdown from "@/components/thread/Countdown";

import {
  connectWallet,
  // fetchProposalDetails,
  vote,
  fetchContractBalance,
  fetchContractUsedVotingRights,
  fetchProposalOptions,
} from "@/web3/action";
import { useToast } from "@/components/ui/use-toast";

import { use, useEffect, useState } from "react";
import { addVoteRecord, getVoteRecords } from "@/lib/actions";

export default function ProposalCard({
  isCurUserPost,
  userAddress,
  userStakeId,
  userStakeAmount,
  unLockTime,
  proposalId,
  web3ProposalId,
  proposalStatus,
  proposalResult,
  stakeOption1,
  stakeOption2,
  postId,
  userId,
}: {
  isCurUserPost: boolean;
  userAddress: string;
  userStakeId: string;
  userStakeAmount: number;
  unLockTime: string;
  proposalId: string;
  web3ProposalId: string;
  proposalStatus: number; // 0 - pending, 1 - approved, 2 - rejected
  proposalResult: number; // 0 - notstarted, 1 - onGoing  2 - good, 3 - bad
  stakeOption1: string;
  stakeOption2: string;
  postId: string;
  userId: string;
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [balance, setBalance] = useState("0");
  const [usedVote, setUsedVote] = useState("0");

  const [inputPrice, setInputPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [votePending, setVotePending] = useState(false);
  const [endTime, setEndTime] = useState(new Date(unLockTime));
  const [transactionPending, setTransactionPending] = useState(false);
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [userVoteOptionId, setUserVoteOptionId] = useState("");

  const [option1Amount, setOption1Amount] = useState(0);
  const [option2Amount, setOption2Amount] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    initConnectWallet();
  }, []);

  useEffect(() => {
    if (!signer) return;
    getProposalDetails();
    getBalance(signer, account);
    getUsedVote(signer, account);
  }, [signer]);

  useEffect(() => {
    if (!web3ProposalId || !signer || !account) return;
    getUserVoted();
  }, [web3ProposalId, signer, account]);

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

  const getProposalDetails = async () => {
    if (!web3ProposalId) return;

    const proposalDetails = await fetchProposalOptions(
      signer,
      web3ProposalId,
    ).catch((err) => {
      console.log("======err======", err);
    });

    if (!!proposalDetails) {
      let totalPrice = 0;
      let option1Amount = 0;
      let option2Amount = 0;
      proposalDetails.options.map((option) => {
        totalPrice += Number(option.voteCount);

        if (option.index === 0) {
          option1Amount += Number(option.voteCount);
        } else {
          option2Amount = Number(option.voteCount);
        }
      });

      setTotalPrice(totalPrice + userStakeAmount);
      setOption1Amount(option1Amount);
      setOption2Amount(option2Amount);
    }

    console.log("======proposalDetails======", proposalDetails);
  };

  // get balance
  // @ts-ignore
  const getBalance = (signer, account) => {
    fetchContractBalance(signer, account).then((balance) => {
      console.log("======balance======", balance);

      const formattedBalance = parseFloat(balance || "0").toString();

      // @ts-ignore
      setBalance(formattedBalance);
    });
  };

  // get used vote
  // @ts-ignore
  const getUsedVote = async (signer, account) => {
    fetchContractUsedVotingRights(signer, account).then((usedVote) => {
      console.log("======usedVote======", usedVote);
      const formattedUsedVote = parseFloat(usedVote || "0").toString();
      // @ts-ignore
      setUsedVote(formattedUsedVote);
    });
  };

  const getUserVoted = async () => {
    if (!account) return;
    const voteRecords = await getVoteRecords(web3ProposalId, account);
    console.log("======voteRecords======", web3ProposalId, account);
    console.log("======voteRecords======", voteRecords);
    if (!!voteRecords && !!voteRecords.length) {
      setInputPrice(voteRecords[0].voteAmount);
      setUserVoteOptionId(voteRecords[0].optionId);
      setHasUserVoted(true);
    } else {
      setInputPrice(0);
      setHasUserVoted(false);
    }
  };

  const onVote = async () => {
    console.log("======onVote======");

    setVotePending(true);

    if (!provider || !signer) {
      await initConnectWallet();
    }

    await vote(
      signer,
      account,
      web3ProposalId,
      userVoteOptionId,
      inputPrice.toString(),
    )
      .then(async (res) => {
        console.log("======vote res", res);

        // @ts-ignore
        if (res?.status !== "success") {
          toast({
            title: res?.message || "Stake failed",
          });
          return;
        }

        toast({
          title: "Stake Success",
        });

        setShowVoteDialog(false);
        setTotalPrice(totalPrice + inputPrice);

        if (userVoteOptionId === "0") {
          setOption1Amount(option1Amount + inputPrice);
        } else {
          setOption2Amount(option2Amount + inputPrice);
        }

        setHasUserVoted(true);

        await addVoteRecord(
          postId,
          proposalId,
          web3ProposalId,
          userId,
          // @ts-ignore
          account,
          userVoteOptionId,
          inputPrice,
          window.location.pathname,
        );
      })
      .catch((err) => {
        console.log("======err======", err);
        toast({
          title: "Stake failed",
        });
      })
      .finally(() => {
        setVotePending(false);
      });

    console.log("======Vote Done======");
  };

  return (
    <div className="w-full box-border px-[1.75rem] py-[1.5rem] bg-white border border-[#e6e6e6] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
      {!hasUserVoted && !isCurUserPost && (
        <div
          className="mb-[1.875rem] px-[1.25rem] py-[1rem] rounded-[10px] border border-[#e6e6e6] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] text-white text-sm font-bold leading-normal "
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
        >
          Add Validation Staking, you will have the opportunity to get the
          Staked Validation 5% tokens reward !
        </div>
      )}

      <div className="text-lg text-black font-bold mb-[1.25rem]">
        Validation Staking
      </div>

      <div>
        <div
          className="flex mb-[.875rem] rounded-[.625rem] p-[.5rem] items-center cursor-pointer"
          style={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
            background:
              userVoteOptionId === "0"
                ? "linear-gradient(100deg, rgba(249, 212, 35, 0.1) -12.68%, rgba(248, 54, 0, 0.2) 147.82%)"
                : "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
          }}
          onClick={() => {
            !isCurUserPost && !hasUserVoted && setUserVoteOptionId("0");
          }}
        >
          <div
            className="rounded-[.625rem] p-[.5rem] text-[#9B9B9B] text-[.625rem] font-bold shrink-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(249, 212, 35, 0.10) -12.68%, rgba(248, 54, 0, 0.10) 147.82%)",
            }}
          >
            Option1
          </div>
          <div className="grow px-[.5rem]">{stakeOption1}</div>
          <div
            className="bg-clip-text text-transparent text-lg font-bold shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
            }}
          >
            {option1Amount} FLR
          </div>
        </div>

        <div
          className="flex mb-[.875rem] rounded-[.625rem] p-[.5rem] items-center cursor-pointer"
          style={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)",
            background:
              userVoteOptionId === "1"
                ? "linear-gradient(100deg, rgba(249, 212, 35, 0.1) -12.68%, rgba(248, 54, 0, 0.2) 147.82%)"
                : "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
          }}
          onClick={() => {
            !isCurUserPost && !hasUserVoted && setUserVoteOptionId("1");
          }}
        >
          <div
            className="rounded-[.625rem] p-[.5rem] text-[#9B9B9B] text-[.625rem] font-bold shrink-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(249, 212, 35, 0.10) -12.68%, rgba(248, 54, 0, 0.10) 147.82%)",
            }}
          >
            Option2
          </div>
          <div className="grow px-[.5rem]">{stakeOption2}</div>
          <div
            className="bg-clip-text text-transparent text-lg font-bold shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
            }}
          >
            {option2Amount} FLR
          </div>
        </div>
      </div>

      <div className="mb-[1.25rem]">
        <div className="mb-[1.25rem]">
          <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-normal">
            Total Number/Price
          </div>

          <div>
            <span
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              {totalPrice} FLR
            </span>
          </div>
        </div>

        {proposalResult === 1 ? (
          <div>
            <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-normal">
              Ends in
            </div>

            <div className="flex items-center mb-[.3125rem]">
              <Countdown targetDate={new Date(endTime)} />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-normal">
              {`Ends in ${new Date(endTime)}`}
            </div>
          </div>
        )}
      </div>

      {(hasUserVoted || isCurUserPost) && (
        <div className="my-[1.25rem] text-center py-[.9375rem] border rounded-[15px] border-[#f9d423]">
          <div>
            <span
              className="mb-[.3125rem] bg-clip-text text-transparent text-sm font-bold"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              Your Validation Staking price
            </span>
          </div>
          <div className="flex items-center justify-center ">
            {!isCurUserPost && (
              <span className="text-[#9B9B9B] font-bold text-sm pr-[.5rem]">
                {userVoteOptionId === "0" ? "Option1" : "Option2"}
              </span>
            )}
            <span
              className="bg-clip-text text-transparent font-bold text-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              {isCurUserPost ? userStakeAmount : inputPrice} FLR
            </span>
          </div>
        </div>
      )}

      {!isCurUserPost && !hasUserVoted && (
        <Button
          className="w-full rounded-[40px] text-lg"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          onClick={() => {
            // onBtnClick();
            console.log("stake");
            setShowVoteDialog(true);
          }}
          disabled={votePending || !userVoteOptionId}
        >
          Vote
        </Button>
      )}

      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
              Make A Validation Stake
            </DialogTitle>
          </DialogHeader>

          <div className="px-[1.625rem] mb-[1rem] font-semibold text-xl leading-normal">
            <div className="mb-[1.25rem]">
              <div className="flex items-center px-[1.5rem] rounded-[50px] bg-[#f8f8f8]">
                <Input
                  placeholder="Price"
                  value={inputPrice}
                  type="number"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setInputPrice(value);
                  }}
                  className="flex-1 text-lg  shadow-none border-0 outline-none border-none bg-transparent focus-visible:ring-0"
                />
                <div
                  className="shrink-0 pl-[1.25rem] py-[.5625rem] border-l border-[#e6e6e6] bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                  }}
                >
                  FLR
                </div>
              </div>

              <div className="flex items-center mt-[1rem]">
                <div className="flex-1 flex items-center">
                  <div className="text-xs text-[#9b9b9b] font-medium">
                    Remaining:
                  </div>
                  <div className="ml-[.5rem] mr-[.3125rem] text-lg font-bold">
                    {`${Number(balance) - Number(usedVote)}`}
                  </div>
                  <div
                    className="bg-clip-text text-transparent text-lg font-bold"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                    }}
                  >
                    FLR
                  </div>
                </div>

                <div className="shrink-0 flex items-center font-bold text-xs">
                  <span>1</span>
                  <span
                    className="mx-[.3125rem] bg-clip-text text-transparent text-lg font-bold"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                    }}
                  >
                    FLR
                  </span>
                  <span>=</span>
                  <span className="mx-[.3125rem]">0.1</span>
                  <span>USD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-[1.625rem] mb-[1rem]">
            <Button
              className="w-full rounded-[40px] text-lg"
              style={{
                background:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
              onClick={() => {
                onVote();
              }}
              disabled={!inputPrice || votePending}
            >
              {votePending ? "Voting" : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
