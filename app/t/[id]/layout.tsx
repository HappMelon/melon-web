import BackButton from "@/components/thread/backButton";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ThreadPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="bg-white w-auto h-auto ml-[1.875rem] rounded-[15px]">
      <div className="flex items-center pt-[2.125rem] pb-[1.4375rem]">
        <BackButton />
        <div className="pl-[1.375rem] text-[1.75rem] font-[750]">Post</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
