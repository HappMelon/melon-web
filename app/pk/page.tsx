import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { BackIcon } from "@/components/common/backIcon";
import { PkPage } from "@/components/pk";

export default async function Page() {
  const user = await currentUser();
  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="w-full box-border pl-[1.875rem] h-full">
      <div className="bg-white rounded-[.9375rem] p-[1.875rem]">
        <BackIcon title="Trending" />
        <PkPage />
      </div>
    </div>
  );
}
