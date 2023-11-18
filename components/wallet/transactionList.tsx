"use client";

import { useEffect, useState } from "react";
import { connectWallet, getAccountVotingHistory } from "@/web3/action";

import { useToast } from "@/components/ui/use-toast";

export default function TransactionList() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [transactionHistory, setTransactionHistory] = useState([]);

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
      getTransactionHistory(res.signer, res.account);
    });
  };

  // get transaction history
  // @ts-ignore
  const getTransactionHistory = (signer, account) => {
    getAccountVotingHistory(signer, account).then((transactionHistory) => {
      console.log("======transactionList======", transactionHistory);

      // @ts-ignore
      setTransactionHistory(transactionHistory);
    });
  };

  return (
    <div>
      Transaction List
      {transactionHistory.length > 0 &&
        transactionHistory.map((item) => {
          return (
            // @ts-ignore
            <div key={item.proposalId}>{item.proposalId}</div>
          );
        })}
      {transactionHistory.length === 0 && (
        <div className="text-center mt-3 font-normal">No Record</div>
      )}
    </div>
  );
}
