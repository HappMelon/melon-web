"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { connectWallet, getContract, addProposal } from "@/web3/action";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";

export default function MakeProposal({
  isWeb3User,
  postId,
}: {
  isWeb3User: boolean;
  postId: string;
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [accountValue, setAccountValue] = useState(); // 当前账户在合约的余额
  const [minAmount, setMinAmount] = useState("0.01");
  const [balance, setBalance] = useState();
  const [allowance, setAllowance] = useState();
  const [depositAmount, setDepositAmount] = useState("0"); // 初始化为字符串 "0"
  const [withdrawAmount, setWithdrawAmount] = useState("0"); // 初始化为字符串 "0"
  const [contractBalance, setContractBalance] = useState("0");
  const [MintAmount, setMintAmount] = useState("0");
  const [proposalId, setProposalId] = useState(); // 设置提案的id
  const [duration, setDuration] = useState("3600"); // 设置提案的持续时间

  const [inputPrice, setInputPrice] = useState("");
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    initConnectWallet();
  }, []);

  const { signOut } = useAuth();

  const onConfirm = async () => {
    console.log("======onConfirm======");
    if (!isWeb3User) {
      setShowUpgradeDialog(true);
      return;
    }

    if (!provider) {
      await initConnectWallet();
    }

    await addProposal(signer, postId)
      .then((proposal) => {
        console.log("======proposal.id======", proposal.id);
        console.log("======proposal.name======", proposal.name);

        toast({
          title: "Stake Success",
        });
      })
      .catch((err) => {
        console.log("======err======", err);
        toast({
          title: "Stake failed",
        });
      });
  };

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

  return (
    <div className="w-full box-border px-[1.75rem] py-[1.5rem] bg-white border border-[#e6e6e6] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
      <div
        className="mb-[1.875rem] px-[1.25rem] py-[1rem] rounded-[10px] border border-[#e6e6e6] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] text-white text-sm font-bold leading-normal "
        style={{
          background:
            "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
        }}
      >
        Add Validation Staking, you will have the opportunity to get the Staked
        Exposure 5% tokens reward !
      </div>

      <div className="text-lg text-black font-bold mb-[1.25rem]">
        Exposure Staking
      </div>

      <div className="mb-[1.25rem]">
        <div className="flex items-center px-[1.5rem] rounded-[50px] bg-[#f8f8f8]">
          <Input
            placeholder="Price"
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
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
            <div className="text-xs text-[#9b9b9b] font-medium">Balance:</div>
            <div className="ml-[.5rem] mr-[.3125rem] text-lg font-bold">40</div>
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

      <Button
        className="w-full rounded-[40px] text-lg"
        style={{
          background:
            "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
        }}
        disabled={!inputPrice}
        onClick={onConfirm}
      >
        Confirm
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
    </div>
  );
}
