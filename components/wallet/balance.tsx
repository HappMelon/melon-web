"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

import {
  connectWallet,
  fetchContractBalance,
  fetchContractAllowance,
  fetchContractUsedVotingRights,
  approveAndSubmit,
  handleDeposit,
} from "@/web3/action";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Balance() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [balance, setBalance] = useState("0");
  const [usedVote, setUsedVote] = useState("0");
  const [allowance, setAllowance] = useState("0");
  const [authorized, setAuthorized] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);

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
      // @ts-ignore
      getBalance(res.signer, res.account);
      // @ts-ignore
      getAllowance(res.signer, res.account);
      // @ts-ignore
      getUsedVote(res.signer, res.account);
    });
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

  // get account allowance on contract
  // @ts-ignore
  const getAllowance = (signer, account) => {
    fetchContractAllowance(signer, account).then((allowance) => {
      console.log("======allowance======", allowance);
      const formattedAllowance = parseFloat(allowance || "0").toString();
      // @ts-ignore
      setAllowance(formattedAllowance);

      console.log(
        "======allowance",
        allowance,
        !!allowance,
        formattedAllowance,
        !!formattedAllowance,
        parseFloat(allowance || "0") > 0,
      );

      if (parseFloat(allowance || "0") > 0) {
        setAuthorized(true);
      }
    });
  };

  const authorizeWallet = async () => {
    setTransactionPending(true);

    const allowance = await approveAndSubmit(signer, account).catch((err) => {
      console.log("======err======", err);
      toast({
        title: "Authorize Failed",
      });
    });

    console.log("======allowance======", allowance);
    toast({
      title: "Authorize Success",
    });

    setAuthorized(true);
    setTransactionPending(false);
  };

  const stakeAllowance = async () => {
    if (!allowance) {
      authorizeWallet();
      return;
    }

    setTransactionPending(true);

    const formattedAllowance = parseFloat(allowance).toString();

    await handleDeposit(signer, account, formattedAllowance)
      .then(() => {
        toast({
          title: "Stake Success",
        });
      })
      .catch((err) => {
        console.log("======err======", err);
        toast({
          title: "Stake Failed",
        });
      })
      .finally(() => {
        getBalance(signer, account);
        getAllowance(signer, account);
      });

    setTransactionPending(false);
  };

  return (
    <div className="rounded-[1.25rem] min-w-[20rem] w-fit bg-[#f8f8f8] px-[1.625rem] py-[1.5rem] space-y-6">
      <div className="text-base font-bold">
        {!!balance ? "Tokens On Chain" : "Tokens Off Chain"}
      </div>

      <div className="flex items-center">
        <Image
          className="mr-[.5rem]"
          alt="icon-coin"
          src="/icon-coin.svg"
          width={35}
          height={35}
        ></Image>

        <div className="grow text-[1.75rem] font-bold mr-[2.5rem]">
          <div>{balance} FLR</div>
          <div className="text-sm text-[#9b9b9b] font-medium">
            Used: {usedVote} FLR
          </div>
        </div>

        {!authorized ? (
          <Button
            className="min-w-[6rem] w-fit box-border rounded-[40px] text-lg"
            style={{
              background:
                "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
            }}
            onClick={() => {
              if (transactionPending) return;
              console.log("======authorize btn click======");
              authorizeWallet();
            }}
          >
            {!transactionPending ? "Authorize" : "Authorizing"}
          </Button>
        ) : (
          <Button
            className="w-[6rem] box-border rounded-[40px] text-lg"
            style={{
              background:
                "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
            }}
            onClick={() => {
              if (transactionPending) return;
              console.log("======stake btn click======");
              stakeAllowance();
            }}
          >
            {!transactionPending ? "Stake" : "Staking"}
          </Button>
        )}
      </div>
    </div>
  );
}
