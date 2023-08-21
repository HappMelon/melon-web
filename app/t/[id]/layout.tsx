import Index from "@/components/layouts/AppLayout";
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

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <Index>
      <div className="px-3 relative mt-8 mb-6">
        <BackButton />
        <div className="text-2xl font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Thread
        </div>
      </div>
      {children}
    </Index>
  );
}
