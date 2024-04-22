import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { BackIcon } from "@/components/common/backIcon";
import { PkPage } from "@/components/pk";

const TAKE_NUM = 10;

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

  const defaultPosts = await prisma.post.findMany({
    take: TAKE_NUM + 1,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: true,
      likes: true,
    },
    where: {
      parent: null,
    },
  });

  return (
    <div className="w-full box-border pl-[1.875rem] h-full">
      <div className="bg-white rounded-[.9375rem] p-[1.875rem]">
        <BackIcon title="Trending" />
        <PkPage user={user} posts={defaultPosts} />
      </div>
    </div>
  );
}
