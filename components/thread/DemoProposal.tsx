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

import { connectWallet, getContract, addProposal } from "@/web3/action";

import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";

export default function DemoProposal({ proposalId }: { proposalId: string }) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  const [proposalStatus, setProposalStatus] = useState<
    "Unstarted" | "Ongoing" | "Finished"
  >("Unstarted");
  const [inputPrice, setInputPrice] = useState("");
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

  return (
    <div>
      <ProposalCard status={proposalStatus} totalPrice={120} inputPrice={30} />

      {/* <ProposalCard status="Finished" totalPrice={130} inputPrice={20} /> */}
    </div>
  );
}
