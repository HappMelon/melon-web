"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ethers } from "ethers";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { createProposal } from "@/lib/actions";

import {
  sleep,
  connectWallet,
  handleStakeTokensForProposal,
  listentingStakeAdded,
} from "@/web3/action";

import {
  NEXT_PUBLIC_PROPOSAL_ID,
  NEXT_PUBLIC_PROPOSAL_OPTION_ID,
  NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  spenderContractAbi,
} from "@/web3/abi";

export default function MakeStake({
  isWeb3User,
  postId,
  type,
}: {
  isWeb3User: boolean;
  postId: string;
  type: "Init" | "Retry";
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  const [inputTotalInfluence, setInputTotalInfluence] = useState(100);
  const [inputLikeRate, setInputLikeRate] = useState(0.2);
  const [userStakeId, setUserStakeId] = useState(""); // 设置提案的id
  const [userStakeAmount, setUserStakeAmount] = useState(0); // 设置提案的amount
  const [unLockTime, setUnLockTime] = useState(0); // 设置质押的解锁时间
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showStakeDialog, setShowStakeDialog] = useState(false);

  const { toast } = useToast();
  const pathname = usePathname();

  const { signOut } = useAuth();

  useEffect(() => {
    initConnectWallet();
  }, []);

  const initConnectWallet = async () => {
    await connectWallet().then((res) => {
      // @ts-ignore
      setProvider(res.provider);
      // @ts-ignore
      setAccount(res.account);
      // @ts-ignore
      setSigner(res.signer);
      // @ts-ignore
      listentingStakeAdded(
        res?.signer,
        res?.account,
        // @ts-ignore
        (stakeIndex, stakeAmount, unLockTime) => {
          createProposalToDB(stakeIndex, stakeAmount, unLockTime);
        },
      );
    });
  };

  const onMakeStake = async () => {
    console.log("=====onMakeStake ======");
    console.log("=====isWeb3User ======", isWeb3User);
    if (!isWeb3User) {
      setShowUpgradeDialog(true);
      return;
    } else {
      setShowStakeDialog(true);
    }
  };

  const onMakeStakeConfirm = async () => {
    console.log("======onMakeStakeConfirm======");

    await handleStakeTokensForProposal(
      signer,
      account,
      userStakeAmount.toString(),
    );

    await sleep(10000);
  };

  // @ts-ignore
  const createProposalToDB = async (stakeIndex, stakeAmount, unLockTime) => {
    console.log(
      "===========",
      inputLikeRate,
      inputTotalInfluence,
      stakeIndex,
      stakeAmount,
      unLockTime,
    );
    createProposal(
      postId,
      inputLikeRate,
      inputTotalInfluence,
      stakeIndex,
      // @ts-ignore
      parseFloat(stakeAmount),
      unLockTime.toString(),
      pathname,
    );
  };

  return (
    <div
      className="w-full box-border px-[1.75rem] py-[1.5rem] border border-[#f9d423] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
      style={{
        background:
          "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
      }}
    >
      <div className="flex mb-[.5rem]">
        <div className="mr-[1.25rem]">
          <div
            className="p-[.5625rem] rounded-[5px] "
            style={{ backgroundColor: "rgba(249, 212, 35, 0.10)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
            >
              <path
                d="M9.55647 2.7733C9.55647 4.18415 8.28597 5.32687 6.71847 5.32687C5.15097 5.32687 3.87909 4.18415 3.87909 2.7733C3.87909 1.36373 5.14959 0.219727 6.71847 0.219727C8.28597 0.219727 9.55647 1.36373 9.55647 2.7733ZM22.3893 2.7733C22.3893 4.18415 21.1188 5.32687 19.5513 5.32687C17.9838 5.32687 16.712 4.18415 16.712 2.7733C16.712 1.36373 17.9838 0.219727 19.5513 0.219727C21.1188 0.219727 22.3893 1.36373 22.3893 2.7733ZM13.4271 7.0301C14.1564 7.0301 14.8559 6.76107 15.3716 6.28218C15.8874 5.80329 16.1771 5.15378 16.1771 4.47653C16.1771 3.79928 15.8874 3.14977 15.3716 2.67088C14.8559 2.192 14.1564 1.92296 13.4271 1.92296C12.6977 1.92296 11.9983 2.192 11.4825 2.67088C10.9668 3.14977 10.6771 3.79928 10.6771 4.47653C10.6771 5.15378 10.9668 5.80329 11.4825 6.28218C11.9983 6.76107 12.6977 7.0301 13.4271 7.0301ZM1.08372 15.5412C1.59109 15.5412 2.00084 15.9229 2.00084 16.3928V19.798C2.00084 20.2678 2.41059 20.6483 2.91797 20.6483H23.0837C23.3267 20.6483 23.5598 20.5588 23.7317 20.3993C23.9037 20.2399 24.0005 20.0236 24.0008 19.798V16.3928C24.01 16.1728 24.1106 15.9646 24.2815 15.812C24.4523 15.6594 24.6802 15.5741 24.9173 15.5741C25.1544 15.5741 25.3822 15.6594 25.5531 15.812C25.724 15.9646 25.8245 16.1728 25.8337 16.3928V19.798C25.8337 20.4752 25.544 21.1247 25.0283 21.6036C24.5125 22.0825 23.8131 22.3515 23.0837 22.3515H2.91797C2.18862 22.3515 1.48915 22.0825 0.973426 21.6036C0.457701 21.1247 0.167969 20.4752 0.167969 19.798V16.3928C0.167969 15.9229 0.577719 15.5412 1.08372 15.5412ZM1.95959 12.1372C1.41922 12.1372 0.991594 11.7031 1.10159 11.2103C1.75334 8.31199 3.96159 6.17849 6.58372 6.17849C8.13472 6.17849 9.53997 6.92285 10.563 8.13197C9.41347 8.86101 8.50047 10.0088 7.93672 11.3546C7.82672 11.6201 7.77584 11.8832 7.77584 12.1372H1.95959ZM18.9133 11.3546C18.263 9.79562 17.1396 8.50224 15.7233 7.8166C16.7175 6.79517 18.0058 6.17849 19.4166 6.17849C22.0401 6.17849 24.2483 8.31072 24.9001 11.2103C25.0101 11.7019 24.5838 12.1372 24.0421 12.1372H19.077C19.077 11.8819 19.0247 11.6201 18.9147 11.3546H18.9133Z"
                fill="url(#paint0_linear_1809_11026)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1809_11026"
                  x1="0.167969"
                  y1="-18.4714"
                  x2="46.6879"
                  y2="-8.93838"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9D423" />
                  <stop offset="1" stop-color="#F83600" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div>
          {type === "Init" ? (
            <div className="text-sm font-medium leading-normal text-[#9b9b9b]">
              Paid Content Setting, you will have the opportunity to get the
              Betted Prediction 5% tokens reward !
              <p className="underline">Learn more</p>
            </div>
          ) : (
            <div className="text-sm font-medium leading-normal text-[#9b9b9b]">
              Your submission has been declined. Please check and resubmit.
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full rounded-[40px] text-lg"
        style={{
          background:
            "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
        }}
        onClick={onMakeStake}
      >
        Make A Stake
      </Button>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
              Upgrade Account
            </DialogTitle>
          </DialogHeader>

          <div className="px-[1.625rem] mb-[1rem] font-semibold text-xl leading-normal">
            {`Email account can't  mint because a wallet is reguired to keep your assets`}
          </div>

          <div className="px-[1.625rem] mb-[1rem]">
            <Button
              className="w-full rounded-[40px] text-lg"
              style={{
                background:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
              onClick={() => {
                signOut();
                redirect("/sign-in");
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showStakeDialog} onOpenChange={setShowStakeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
              Make A Stake
            </DialogTitle>
          </DialogHeader>

          <div className="px-[1.625rem] mb-[1rem] font-semibold text-xl leading-normal">
            <div className="flex">
              <span className="text-lg font-bold mr-[1rem]">Time</span>
              <span className="text-[#bcbcbc] text-lg font-medium">
                7 days from the date of publication
              </span>
            </div>
            <div className="mt-[2rem] text-sm font-medium">
              <span className=" text-base font-bold">*Results judgment</span>
              (both of the following need to be met)
            </div>

            <div className="mt-[.875rem]">
              <div className="text-sm font-medium mb-[.25rem]">
                Stake Amount
              </div>
              <Input
                placeholder=""
                value={userStakeAmount}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setUserStakeAmount(value);
                }}
                className="text-lg outline-none bg-[#f8f8f8] rounded-[3.125rem] focus-visible:ring-0"
              />
            </div>

            <div className="mt-[.875rem]">
              <div className="text-sm font-medium mb-[.25rem]">
                Total number of Likes + Comments + Shares
              </div>
              <Input
                placeholder=""
                value={inputTotalInfluence}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInputTotalInfluence(value);
                }}
                className="text-lg outline-none bg-[#f8f8f8] rounded-[3.125rem] focus-visible:ring-0"
              />
            </div>

            <div className="mt-[.875rem]">
              <div className="text-sm font-medium mb-[.25rem]">
                Like Rate (Likes/Views)
              </div>
              <Input
                placeholder=""
                value={inputLikeRate}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setInputLikeRate(value);
                }}
                className="text-lg outline-none bg-[#f8f8f8] rounded-[3.125rem] focus-visible:ring-0"
              />
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
                onMakeStakeConfirm();
              }}
              disabled={!inputTotalInfluence || !inputLikeRate}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}