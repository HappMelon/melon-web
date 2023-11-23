import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Currency from "@/components/wallet/currency";
import Address from "@/components/wallet/address";
import Balance from "@/components/wallet/balance";
import TransactionList from "@/components/wallet/transactionList";

export default async function Page() {
  const user = await currentUser();

  console.log("======currentUser", user);

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  const isWeb3User = !!user?.primaryWeb3WalletId;

  return (
    <div className="flex w-full h-full box-border pl-[1.875rem]">
      <div className="w-full bg-white rounded-t-[.9375rem] p-[1.875rem]">
        <div className="flex items-center space-x-4 mb-[1rem]">
          <div className="grow text-[1.75rem] font-bold">My Wallet</div>
          <Currency />
          {isWeb3User && <Address address={user?.web3Wallets[0]?.web3Wallet} />}
        </div>

        {isWeb3User && <Balance />}

        {isWeb3User && (
          <div className="mt-[1.875rem] text-xl font-bold">
            <TransactionList />
          </div>
        )}
      </div>
    </div>
  );
}
