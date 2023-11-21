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
      {transactionHistory.length > 0 && (
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
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Relate
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount (Value)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionHistory.map((transaction) => (
                    // @ts-ignore
                    <tr key={transaction.proposalId}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Make A Stake
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        pending
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* @ts-ignore */}
                        {transaction.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        --
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {transactionHistory.length === 0 && (
        <div className="text-center mt-3 font-normal">No Record</div>
      )}
    </div>
  );
}
