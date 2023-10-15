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

import ProposalCard from "@/components/thread/ProposalCard";
import ProposalResult from "@/components/thread/ProposalResult";

import { connectWallet, getContract, addProposal, vote } from "@/web3/action";

import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";

import {
  NEXT_PUBLIC_PROPOSAL_ID,
  NEXT_PUBLIC_PROPOSAL_OPTION_ID,
} from "@/web3/abi";

export default function DemoProposal({ proposalId }: { proposalId: string }) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  const [proposalStatus, setProposalStatus] = useState<
    "Unstarted" | "Ongoing" | "Finished"
  >("Unstarted");
  const [inputPrice, setInputPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [votePending, setVotePending] = useState(false);
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

  const onVote = async () => {
    console.log("======onVote======");

    setVotePending(true);

    if (!provider || !signer) {
      await initConnectWallet();
    }

    // TODO: proposalId - 13, proposalOptionId - 1
    await vote(
      signer,
      account,
      NEXT_PUBLIC_PROPOSAL_ID,
      NEXT_PUBLIC_PROPOSAL_OPTION_ID,
      inputPrice.toString(),
    )
      .then((res) => {
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
        setProposalStatus("Ongoing");
        setShowVoteDialog(false);
        setTotalPrice(totalPrice + inputPrice);
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
    <div>
      <ProposalCard
        status={proposalStatus}
        totalPrice={totalPrice}
        inputPrice={inputPrice}
        onBtnClick={() => {
          setShowVoteDialog(true);
        }}
      />

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
                    Balance:
                  </div>
                  <div className="ml-[.5rem] mr-[.3125rem] text-lg font-bold">
                    40
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

      {/* <ProposalCard status="Finished" totalPrice={130} inputPrice={20} /> */}
    </div>
  );
}
